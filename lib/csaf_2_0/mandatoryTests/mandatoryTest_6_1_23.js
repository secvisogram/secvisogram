/**
 * @param {unknown} doc
 */
export default function mandatoryTest_6_1_23(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  // 6.1.23 Multiple Use of Same CVE
  if (preconditionFor_6_1_23_Matches(doc)) {
    /** @type {Set<string>} */
    const cveStrings = new Set()

    doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (vulnerability.cve === undefined) return
      if (cveStrings.has(vulnerability.cve)) {
        isValid = false
        errors.push({
          message: `CVE identifier was already used`,
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/cve`,
        })
      }
      cveStrings.add(vulnerability.cve)
    })
  }

  return { errors, isValid }
}

/**
 * @param {unknown} rawDoc
 * @returns {rawDoc is {
 *    vulnerabilities: Array<{
 *      cve?: string
 *    }>
 *  }}
 */
const preconditionFor_6_1_23_Matches = (rawDoc) => {
  if (typeof rawDoc !== 'object' || !rawDoc) return false
  /** @type {{ vulnerabilities?: unknown }} */
  const doc = rawDoc
  return (
    Array.isArray(doc.vulnerabilities) &&
    doc.vulnerabilities.every(
      (vulnerability) =>
        typeof vulnerability.cve === 'string' || vulnerability.cve === undefined
    )
  )
}
