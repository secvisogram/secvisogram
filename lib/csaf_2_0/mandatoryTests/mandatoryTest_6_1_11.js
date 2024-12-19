import cwec from '../../shared/cwec.js'

/**
 * @typedef {Object} FullProductName
 * @property {string} name
 * @property {string} product_id
 */

/**
 * @typedef {Object} Branch
 * @property {Array<Branch>} branches
 * @property {FullProductName} product
 */

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_11(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (hasVulnerabilities(doc)) {
    for (let i = 0; i < doc.vulnerabilities.length; ++i) {
      const vulnerability = doc.vulnerabilities[i]
      if (vulnerabilityHasCWEFields(vulnerability)) {
        const entry = cwec.weaknesses.find((w) => w.id === vulnerability.cwe.id)
        if (!entry) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${i}/cwe/id`,
            message: 'no weakness with this id is recognized',
          })
          continue
        }
        if (entry.name !== vulnerability.cwe.name) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${i}/cwe/name`,
            message: 'the name does not match the weakness with the given id',
          })
          continue
        }
      }
    }
  }

  return { isValid, errors }
}

/**
 * @param {any} doc
 * @returns {doc is { vulnerabilities: Array<unknown> }}
 */
const hasVulnerabilities = (doc) =>
  doc && Array.isArray(doc.vulnerabilities) ? true : false

/**
 * @param {any} vulnerability
 * @returns {vulnerability is { cwe: { id: string; name: string } }}
 */
const vulnerabilityHasCWEFields = (vulnerability) =>
  vulnerability &&
    vulnerability.cwe &&
    typeof vulnerability.cwe.id === 'string' &&
    typeof vulnerability.cwe.name === 'string'
    ? true
    : false
