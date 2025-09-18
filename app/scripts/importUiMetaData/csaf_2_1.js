import { uiSchemas } from '#lib/uiSchemas.js'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import prettier from 'prettier'

const { metaData, jsonSchema } = uiSchemas['v2.1']

/** @typedef {import('./cvss-v2.0.json')} CVSS2JSONSchema */
/** @typedef {import('./csaf_2_1/cvss-v4.0.json')} CVSS4JSONSchema */

/** @type {CVSS2JSONSchema} */
const cvss2Schema = JSON.parse(
  await readFile(new URL('cvss-v2.0.json', import.meta.url), 'utf-8')
)

const defs = /** @type {import('./csaf_2_1/types.js').Defs} */ (
  jsonSchema.$defs
)

const metaDataMap = new Map(Object.entries(metaData))

const outputFile = fileURLToPath(
  new URL('../../lib/uiSchemas/csaf_2_1/content.js', import.meta.url)
)
const prettierString = prettier.format(
  `/** @type {import('#lib/app/SecvisogramPage/shared/types.js').Property} */
export default (${JSON.stringify(
    convertSchema(
      /** @type {import('./csaf_2_1/types.js').Schema} */ (jsonSchema),
      defs,
      []
    )
  )})`,
  {
    ...(await prettier.resolveConfig(outputFile)),
    filepath: outputFile,
  }
)
await writeFile(outputFile, prettierString, 'utf8')

/**
 * @param {import('./csaf_2_1/types.js').Schema} subschema
 * @param {import('./csaf_2_1/types.js').Defs} defs
 * @param {string[]} path
 * @returns {import('./csaf_2_1/types.js').UiSchema}
 */
function convertSchema(subschema, defs, path) {
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
  const metaData = metaDataMap.get(metaDataPath)

  /** @type {import('./csaf_2_1/types.js').CommonUiSchemaFields} */
  const commonUiSchemaFields = {
    key,
    fullName,
    title: subschema.title,
    description: subschema.description,
    addMenuItemsForChildObjects:
      metaData && 'addMenuItemsForChildObjects' in metaData
        ? metaData?.addMenuItemsForChildObjects
        : undefined,
    metaData: metaData && {
      ...Object.fromEntries(
        Object.entries(metaData).filter(([key]) => key !== 'propertyOrder')
      ),
      i18n:
        'i18n' in metaData
          ? {
              ...metaData.i18n,
              title: 'v2_1.' + metaData.i18n.title,
              description: 'v2_1.' + metaData.i18n.description,
            }
          : undefined,
    },
  }

  if (
    strPath ===
      'properties.vulnerabilities.items.properties.metrics.items.properties.content.properties.cvss_v3' ||
    strPath ===
      'properties.vulnerabilities.items.properties.metrics.items.properties.content.properties.cvss_v4' ||
    strPath ===
      'properties.vulnerabilities.items.properties.metrics.items.properties.content.properties.ssvc_v2'
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
      /** @type {import('./csaf_2_1/types.js').ObjectUiSchema} */ (
        convertSchema({ ...subschema.items, properties }, defs, [
          ...path,
          'items',
        ])
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
    /** @type {import('./csaf_2_1/types.js').UiSchema} */
    let resolvedSchema
    if (subschema.$ref === 'https://www.first.org/cvss/cvss-v2.0.json') {
      resolvedSchema = convertSchema(
        /** @type {import('./csaf_2_1/types.js').Schema} */ (cvss2Schema),
        /** @type {import('./csaf_2_1/types.js').Defs} */ (cvss2Schema.$defs),
        path
      )
    } else {
      const refName = subschema.$ref
        .replace(new RegExp('#/\\$defs/'), '')
        .replace(new RegExp('#/definitions/'), '')
      const ref = defs[refName]
      if (!ref) {
        throw new Error(
          'Ref with name `' + refName + '` not found (`' + strPath + '`)'
        )
      }
      resolvedSchema = convertSchema(ref, defs, path)
    }
    return {
      ...resolvedSchema,
      title: subschema.title ?? resolvedSchema.title,
      description: subschema.description ?? resolvedSchema.description,
    }
  }

  if (subschema.type === 'object') {
    let propertyList = Object.entries(subschema.properties)
    if (metaData && 'propertyOrder' in metaData) {
      const propertyOrder = metaData.propertyOrder
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
          return convertSchema(value, defs, [...path, 'properties', key])
        }),
      },
    }
  }

  if (subschema.type === 'array') {
    const convertedSchema = convertSchema(subschema.items, defs, [
      ...path,
      'items',
    ])
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
