import {readFile} from 'node:fs/promises'

/** @typedef {import('./importUiMetaData/cvss-v2.0.json')} CVSS2JSONSchema */

/** @type {CVSS2JSONSchema} */
const cvss2Schema = JSON.parse(
  await readFile(
    new URL('importUiMetaData/cvss-v2.0.json', import.meta.url),
    'utf-8'
  )
)


/**
 * @param {import('./importUiMetaData/types').Schema} subschema
 * @param {import('./importUiMetaData/types').Defs} defs
 * @param {string[]} path
 * @param {Record<String, { addMenuItemsForChildObjects?: boolean; propertyOrder?: string[] } | undefined>}  metaDataRecord
 * @returns {import('./importUiMetaData/types').UiSchema}
 */
export function convertSchema(subschema, defs, path, metaDataRecord) {
  const strPath = path.join('.')

  let key = path.at(-1) ?? ''
  key = key === 'items' ? '' : key

  const fullName = path.filter((s) => s !== 'properties' && s !== 'items')
  const metaDataPath = strPath
    .replace(/^$/, '$')
    .replace(/^properties\./, '$.')
    .replaceAll('.properties.', '.')
    .replace(/\.items$/, '[]')
    .replaceAll('.items.', '.')
  const metaData = metaDataRecord[metaDataPath]

  const commonUiSchemaFields = {
    key,
    fullName,
    title: subschema.title,
    description: subschema.description,
    addMenuItemsForChildObjects:
    metaDataRecord[metaDataPath]?.addMenuItemsForChildObjects,
    metaData:
      metaData &&
      Object.fromEntries(
        Object.entries(metaData).filter(([key]) => key !== 'propertyOrder')
      ),
  }

  if (
    (strPath ===
      'properties.vulnerabilities.items.properties.scores.items.properties.cvss_v3') ||
    (strPath ===
      'properties.vulnerabilities.items.properties.metrics.items.properties.content.properties.cvss_v3') ||
    (strPath ===
      'properties.vulnerabilities.items.properties.metrics.items.properties.content.properties.cvss_v4') ||
    (strPath ===
      'properties.vulnerabilities.items.properties.metrics.items.properties.content.properties.ssvc_v1')
  ) {
    return {
      ...commonUiSchemaFields,
      type: 'OBJECT',
      metaInfo: {
        propertyList: [],
      },
    }
  }

  if (
    'type' in subschema &&
    subschema.type === 'array' &&
    'type' in subschema.items &&
    subschema.items.type === 'object' &&
    strPath === 'properties.product_tree.properties.branches'
  ) {
    const properties = Object.fromEntries(
      Object.entries(subschema.items.properties).filter(
        ([key]) => key !== 'branches'
      )
    )
    const arrayType =
      /** @type {import('./importUiMetaData/types').ObjectUiSchema} */ (
      convertSchema({...subschema.items, properties}, defs, [
        ...path,
        'items',
      ], metaDataRecord)
    )
    arrayType.metaInfo.propertyList.unshift({
      ...commonUiSchemaFields,
      key: 'branches',
      metaInfo: {},
      type: 'RECURSION',
    })
    return {
      ...commonUiSchemaFields,
      type: 'ARRAY',
      metaInfo: {
        arrayType,
      },
    }
  }

  if ('$ref' in subschema) {
    /** @type {import('./importUiMetaData/types').UiSchema} */
    let resolvedSchema
    if (subschema.$ref === 'https://www.first.org/cvss/cvss-v2.0.json') {
      resolvedSchema = convertSchema(
        /** @type {import('./importUiMetaData/types').Schema} */ (cvss2Schema),
        /** @type {import('./importUiMetaData/types').Defs} */ (
          cvss2Schema.$defs
        ),
        path, metaDataRecord
      )
    } else {
      const refName = subschema.$ref.replace(new RegExp('\\#/\\$defs/'), '')
      const ref = defs[refName]
      if (!ref) {
        throw new Error(
          'Ref with name `' + refName + '` not found (`' + strPath + '`)'
        )
      }
      resolvedSchema = convertSchema(ref, defs, path, metaDataRecord)
    }
    return {
      ...resolvedSchema,
      title: subschema.title ?? resolvedSchema.title,
      description: subschema.description ?? resolvedSchema.description,
    }
  }

  if (subschema.type === 'object') {
    let propertyList = Object.entries(subschema.properties)
    const propertyOrder = metaData?.propertyOrder
    if (propertyOrder) {
      propertyList = propertyList
        .filter((p) => propertyOrder.includes(p[0]))
        .sort(([a], [b]) => {
          return propertyOrder.indexOf(a) - propertyOrder.indexOf(b)
        })
        .concat(propertyList.filter((p) => !propertyOrder.includes(p[0])))
    }
    return {
      ...commonUiSchemaFields,
      type: 'OBJECT',
      metaInfo: {
        propertyList: propertyList.map(([key, value]) => {
          return convertSchema(value, defs, [...path, 'properties', key], metaDataRecord)
        }),
      },
    }
  }

  if (subschema.type === 'array') {
    const convertedSchema = convertSchema(subschema.items, defs, [
      ...path,
      'items',
    ], metaDataRecord)
    return {
      ...commonUiSchemaFields,
      type: 'ARRAY',
      metaInfo: {
        arrayType: {
          ...convertedSchema,
          metaData: {
            ...convertedSchema.metaData,
            relevanceLevels: commonUiSchemaFields.metaData?.relevanceLevels,
          },
        },
      },
    }
  }

  if (subschema.type === 'string') {
    return {
      ...commonUiSchemaFields,
      ...{
        minLength: subschema.minLength,
        examples: subschema.examples,
        pattern: subschema.pattern,
        default: subschema.default,
        uniqueItems: subschema.uniqueItems,
        enum: subschema.enum,
      },
      metaInfo: {},
      metaData: {
        uiType:
          subschema.format === 'date-time'
            ? 'STRING_DATETIME'
            : subschema.format === 'uri'
              ? 'STRING_URI'
              : subschema.enum !== undefined
                ? 'STRING_ENUM'
                : undefined,
        ...commonUiSchemaFields.metaData,
      },
      type: 'STRING',
    }
  }

  if (subschema.type === 'number') {
    return {
      ...commonUiSchemaFields,
      metaInfo: {},
      type: 'NUMBER',
    }
  }

  throw new Error('Unknown field encountered: ' + strPath)
}