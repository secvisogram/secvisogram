import cvssV20 from './cvss-v2.0.js'
import cvssV30 from './cvss-v3.0.js'
import cvssV31 from './cvss-v3.1.js'
import cvssV40 from './cvss-v4.0.js'

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
  { ref: 'https://www.first.org/cvss/cvss-v4.0.json', content: cvssV40 },
]
