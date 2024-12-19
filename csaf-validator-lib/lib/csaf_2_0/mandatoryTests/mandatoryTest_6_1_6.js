/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_6(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (Array.isArray(doc.vulnerabilities)) {
    /** @type {Array<any>} */
    const vulnerabilities = doc.vulnerabilities
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      const productStatus = vulnerability.product_status
      if (!productStatus) return
      const groups = [
        new Set(
          []
            .concat(
              Array.isArray(productStatus.first_affected)
                ? productStatus.first_affected
                : []
            )
            .concat(
              Array.isArray(productStatus.known_affected)
                ? productStatus.known_affected
                : []
            )
            .concat(
              Array.isArray(productStatus.last_affected)
                ? productStatus.last_affected
                : []
            )
        ),
        new Set(
          Array.isArray(productStatus.known_not_affected)
            ? productStatus.known_not_affected
            : []
        ),
        new Set(
          []
            .concat(
              Array.isArray(productStatus.first_fixed)
                ? productStatus.first_fixed
                : []
            )
            .concat(
              Array.isArray(productStatus.fixed) ? productStatus.fixed : []
            )
        ),
        new Set(
          Array.isArray(productStatus.under_investigation)
            ? productStatus.under_investigation
            : []
        ),
      ]

      groups.forEach((group, index) => {
        const remainingGroups = groups.slice(index + 1)
        group.forEach((productID) => {
          if (remainingGroups.some((g) => g.has(productID))) {
            isValid = false
            errors.push({
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status`,
              message: `product id "${productID}" is mentioned in contradicting product status groups`,
            })
          }
        })
      })
    })
  }

  return { isValid, errors }
}
