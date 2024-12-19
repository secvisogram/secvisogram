/**
 * @typedef {object} VulnerabilityProductStatus
 * @property {unknown} known_affected
 */

/**
 * @typedef {object} Vulnerability
 * @property {VulnerabilityProductStatus} [product_status]
 * @property {unknown} remediations
 */

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_27_10(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  /** @type {unknown} */
  const vulnerabilities = doc.vulnerabilities
  if (doc.document?.category !== 'csaf_vex' || !Array.isArray(vulnerabilities))
    return { errors, isValid }

  vulnerabilities.forEach(
    (
      /**
       * @type {Vulnerability | null} vulnerability
       */
      vulnerability,
      vulnerabilityIndex
    ) => {
      const productStatus = vulnerability?.product_status
      if (
        !vulnerability ||
        !productStatus ||
        !Array.isArray(productStatus.known_affected)
      )
        return

      productStatus.known_affected.forEach((productId, productIdIndex) => {
        /**
         * @typedef {object} Remediation
         * @property {unknown} category
         * @property {unknown} group_ids
         * @property {unknown} product_ids
         */

        /** @type {(Remediation | null | undefined)[]} */
        const remediations = Array.isArray(vulnerability.remediations)
          ? vulnerability.remediations
          : []
        const hasMatchingRemediation = remediations.some((remediation) => {
          if (!remediation) return false

          const remediationHasMatchingProduct =
            Array.isArray(remediation.product_ids) &&
            remediation.product_ids.includes(productId)
          if (remediationHasMatchingProduct) return true

          const productGroups = doc.product_tree?.product_groups
          const remediationHasMatchingProductGroup =
            Array.isArray(remediation.group_ids) &&
            Array.isArray(productGroups) &&
            remediation.group_ids.some((groupId) => {
              /** @type {{ product_ids: unknown } | undefined} */
              const group = productGroups.find((g) => g.group_id === groupId)
              return (
                group &&
                Array.isArray(group.product_ids) &&
                group.product_ids.includes(productId)
              )
            })

          if (remediationHasMatchingProductGroup) return true
          return false
        })

        if (!hasMatchingRemediation) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status/known_affected/${productIdIndex}`,
            message: 'no suitable action statement found',
          })
        }
      })
    }
  )

  return { errors, isValid }
}
