import prettier from 'prettier'

/** @typedef {import('./importUiMetaData/csaf_json_schema.json')} CSAFJSONSchema */
/** @typedef {import('./importUiMetaData/cvss-v2.0.json')} CVSS2JSONSchema */
import {readFile, writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import metaData from './importUiMetaData/metaData.js'
import {convertSchema} from "./convertSchema.js";

/** @type {CSAFJSONSchema} */
const schema = JSON.parse(
  await readFile(
    new URL('importUiMetaData/csaf_json_schema.json', import.meta.url),
    'utf-8'
  )
)

const defs = /** @type {import('./importUiMetaData/types').Defs} */ (
  schema.$defs
)

const metaDataRecord =
  /** @type {Record<String, { addMenuItemsForChildObjects?: boolean; propertyOrder?: string[] } | undefined>} */ (
  metaData
)


const outputFile = fileURLToPath(
  new URL(
    '../lib/app/SecvisogramPage/View/FormEditor/schemaCsaf2.0.js',
    import.meta.url
  )
)
const prettierString = prettier.format(
  "/** @typedef {import('./shared/types').Property} Property */\n" +
  `export default /** @type {const} */ (${JSON.stringify(
    convertSchema(
      /** @type {import('./importUiMetaData/types').Schema} */ (schema),
      defs,
      [], metaDataRecord
    )
  )})`,
  {
    ...(await prettier.resolveConfig(outputFile)),
    filepath: outputFile,
  }
)
await writeFile(outputFile, prettierString, 'utf8')
