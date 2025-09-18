import ssvcV2 from './csaf_2_1/Decision_Point_Value_Selection-2-0-0.schema.js'
import cvssV20 from './cvss-v2.0.js'
import cvssV30 from './cvss-v3.0.js'
import cvssV31 from './cvss-v3.1.js'
import cvssV401 from './cvss-v4.0.1.js'

export { default as content } from './csaf_2_1/content.js'
export { default as jsonSchema } from './csaf_2_1/jsonSchema.js'
export { default as metaData } from './csaf_2_1/metaData.js'

/**
 * @type {import('./types.js').SubJsonSchema[]}
 */
export const subJsonSchemas = [
  { ref: 'https://www.first.org/cvss/cvss-v2.0.json', content: cvssV20 },
  { ref: 'https://www.first.org/cvss/cvss-v3.0.json', content: cvssV30 },
  { ref: 'https://www.first.org/cvss/cvss-v3.1.json', content: cvssV31 },
  { ref: 'https://www.first.org/cvss/cvss-v4.0.json', content: cvssV401 },
  {
    ref: 'https://certcc.github.io/SSVC/data/schema/v2/Decision_Point_Value_Selection-2-0-0.schema.json',
    content: ssvcV2,
  },
]
