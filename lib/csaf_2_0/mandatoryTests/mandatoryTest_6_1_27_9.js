/**
 * @typedef {object} VulnerabilityProductStatus
 * @property {unknown} known_not_affected
 */

/**
 * @typedef {object} Vulnerability
 * @property {unknown} flags
 * @property {VulnerabilityProductStatus} [product_status]
 * @property {unknown} threats
 */

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_27_9(doc) {
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
        !Array.isArray(productStatus.known_not_affected)
      )
        return

      productStatus.known_not_affected.forEach((productId, productIdIndex) => {
        /**
         * @typedef {object} Threat
         * @property {unknown} category
         * @property {unknown} group_ids
         * @property {unknown} product_ids
         */

        /** @type {(Threat | null)[]} */
        const threats = Array.isArray(vulnerability.threats)
          ? vulnerability.threats
          : []
        const hasMatchingThreat = threats.some((threat) => {
          if (!threat || threat.category !== 'impact') return false

          const threatHasMatchingProduct =
            Array.isArray(threat.product_ids) &&
            threat.product_ids.includes(productId)
          if (threatHasMatchingProduct) return true

          const productGroups = doc.product_tree?.product_groups
          const threatHasMatchingProductGroup =
            Array.isArray(threat.group_ids) &&
            Array.isArray(productGroups) &&
            threat.group_ids.some((groupId) => {
              /** @type {{ product_ids: unknown } | undefined} */
              const group = productGroups.find((g) => g.group_id === groupId)
              return (
                group &&
                Array.isArray(group.product_ids) &&
                group.product_ids.includes(productId)
              )
            })

          if (threatHasMatchingProductGroup) return true
          return false
        })

        /**
         * @typedef {object} Flag
         * @property {unknown} label
         * @property {unknown} group_ids
         * @property {unknown} product_ids
         */

        /** @type {(Flag | null)[]} */
        const flags = Array.isArray(vulnerability.flags)
          ? vulnerability.flags
          : []
        const hasMatchingFlag = flags.some((flag) => {
          if (!flag) return false

          const flagHasMatchingProduct =
            Array.isArray(flag.product_ids) &&
            flag.product_ids.includes(productId)
          if (flagHasMatchingProduct) return true

          const productGroups = doc.product_tree?.product_groups
          const flagHasMatchingProductGroup =
            Array.isArray(flag.group_ids) &&
            Array.isArray(productGroups) &&
            flag.group_ids.some((groupId) => {
              /** @type {{ product_ids: unknown } | undefined} */
              const group = productGroups.find((g) => g.group_id === groupId)
              return (
                group &&
                Array.isArray(group.product_ids) &&
                group.product_ids.includes(productId)
              )
            })

          if (flagHasMatchingProductGroup) return true
          return false
        })

        if (!hasMatchingThreat && !hasMatchingFlag) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status/known_not_affected/${productIdIndex}`,
            message: 'no suitable impact statement found',
          })
        }
      })
    }
  )

  return { errors, isValid }
}
