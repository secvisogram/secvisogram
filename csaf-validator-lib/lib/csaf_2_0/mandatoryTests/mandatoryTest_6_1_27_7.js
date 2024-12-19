/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_27_7(doc) {
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
      if (!vulnerability.product_status) {
        isValid = false
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}`,
          message: 'needs a `product_status` attribute',
        })
        return
      }
      const neededArrays = [
        'fixed',
        'known_affected',
        'known_not_affected',
        'under_investigation',
      ]
      if (
        !neededArrays.some((p) =>
          Array.isArray(vulnerability.product_status[p])
        )
      ) {
        isValid = false
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status`,
          message:
            'needs at least one the following attributes: `fixed`, `known_affected`, `known_not_affected`, `under_investigation`',
        })
      }
    })
  }

  return { errors, isValid }
}
