/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_27_8(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const checkedDocumentCategories = new Set(['csaf_vex'])

  if (!checkedDocumentCategories.has(doc.document?.category))
    return { errors, isValid }

  /** @type {unknown} */
  const vulnerabilities = doc.vulnerabilities
  if (Array.isArray(vulnerabilities)) {
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (['ids', 'cve'].every((p) => vulnerability[p] === undefined)) {
        isValid = false
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}`,
          message: 'needs at least one the following attributes: `ids`, `cve`',
        })
      }
    })
  }

  return { errors, isValid }
}
