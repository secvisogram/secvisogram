import prettier from 'prettier'

/** @typedef {import('./importUiMetaData/csaf_json_schema.json')} CSAFJSONSchema */
/** @typedef {import('./importUiMetaData/cvss-v2.0.json')} CVSS2JSONSchema */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import metaData from './importUiMetaData/metaData.js'

/** @type {CSAFJSONSchema} */
const schema = JSON.parse(
  await readFile(
    new URL('importUiMetaData/csaf_json_schema.json', import.meta.url),
    'utf-8',
  ),
)

/** @type {CVSS2JSONSchema} */
const cvss2Schema = JSON.parse(
  await readFile(
    new URL('importUiMetaData/cvss-v2.0.json', import.meta.url),
    'utf-8',
  ),
)

const defs = /** @type {import('./importUiMetaData/types').Defs} */ (
  schema.$defs
)

const metaDataRecord =
  /** @type {Record<String, { addMenuItemsForChildObjects?: boolean; propertyOrder?: string[] } | undefined>} */ (
    metaData
  )

/**
 * @param {import('./importUiMetaData/types').Schema} subschema
 * @param {import('./importUiMetaData/types').Defs} defs
 * @param {string[]} path
 * @returns {import('./importUiMetaData/types').UiSchema}
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
        Object.entries(metaData).filter(([key]) => key !== 'propertyOrder'),
      ),
  }

  if (
    strPath ===
    'properties.vulnerabilities.items.properties.scores.items.properties.cvss_v3'
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
        ([key]) => key !== 'branches',
      ),
    )
    const arrayType =
      /** @type {import('./importUiMetaData/types').ObjectUiSchema} */ (
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
    /** @type {import('./importUiMetaData/types').UiSchema} */
    let resolvedSchema
    if (subschema.$ref === 'https://www.first.org/cvss/cvss-v2.0.json') {
      resolvedSchema = convertSchema(
        /** @type {import('./importUiMetaData/types').Schema} */ (cvss2Schema),
        /** @type {import('./importUiMetaData/types').Defs} */ (
          cvss2Schema.$defs
        ),
        path,
      )
    } else {
      const refName = subschema.$ref.replace(new RegExp('\\#/\\$defs/'), '')
      const ref = defs[refName]
      if (!ref) {
        throw new Error(
          'Ref with name `' + refName + '` not found (`' + strPath + '`)',
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

const outputFile = fileURLToPath(
  new URL(
    '../lib/app/SecvisogramPage/View/FormEditor/schema.js',
    import.meta.url,
  ),
)
const prettierString = prettier.format(
  "/** @typedef {import('./shared/types').Property} Property */\n" +
    `export default /** @type {const} */ (${JSON.stringify(
      convertSchema(
        /** @type {import('./importUiMetaData/types').Schema} */ (schema),
        defs,
        [],
      ),
    )})`,
  {
    ...(await prettier.resolveConfig(outputFile)),
    filepath: outputFile,
  },
)
await writeFile(outputFile, prettierString, 'utf8')
