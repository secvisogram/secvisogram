import content_schema from './csaf_2_1/content_schema.js'
import csaf_meta from './csaf_2_1/csaf_meta.js'
import cvss_v4_0_0 from './csaf_2_1/cvss-v4.0.0.js'
import cvss_meta from './csaf_2_1/cvss_meta.js'
import draft_07_schema from './csaf_2_1/draft-07-schema.js'
import extension_content from './csaf_2_1/extension-content.js'
import meta_format_assertion from './csaf_2_1/meta-format-assertion.js'
import selectionList_2_0_0Schema from './csaf_2_1/SelectionList_2_0_0.schema.js'
import cvss_v2_0 from './cvss-v2.0.js'
import cvss_v3_0 from './cvss-v3.0.js'
import cvss_v3_1 from './cvss-v3.1.js'

export { default as content } from './csaf_2_1/content.js'
export { default as jsonSchema } from './csaf_2_1/jsonSchema.js'
export { default as metaData } from './csaf_2_1/metaData.js'

/**
 * @type {import('./types.js').SubJsonSchema[]}
 */
export const subJsonSchemas = [
  { content: draft_07_schema, ref: 'http://json-schema.org/draft-07/schema#' },
  { content: cvss_v2_0, ref: 'https://www.first.org/cvss/cvss-v2.0.json' },
  { content: cvss_v3_0, ref: 'https://www.first.org/cvss/cvss-v3.0.json' },
  { content: cvss_v3_1, ref: 'https://www.first.org/cvss/cvss-v3.1.json' },
  { content: cvss_meta, ref: 'https://www.first.org/cvss/meta.json' },
  {
    content: content_schema,
    ref: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/extension-metaschema.json',
  },
  {
    content: content_schema.$defs.content_schema_t,
    ref: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/extension-metaschema.json#/$defs/content_schema_t',
  },
  {
    content: meta_format_assertion,
    ref: 'https://json-schema.org/draft/2020-12/meta/format-assertion',
  },
  {
    content: csaf_meta,
    ref: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/meta.json',
  },
  { content: cvss_v4_0_0, ref: 'https://www.first.org/cvss/cvss-v4.0.json' },
  {
    content: extension_content,
    ref: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/extension-content.json',
  },
  {
    content: selectionList_2_0_0Schema,
    ref: 'https://certcc.github.io/SSVC/data/schema/v2/SelectionList_2_0_0.schema.json',
  },
]
