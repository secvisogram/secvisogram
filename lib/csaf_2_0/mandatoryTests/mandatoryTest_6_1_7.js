/**
 *
 * @param {unknown} doc
 */
export default function mandatoryTest_6_1_7(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  // 6.1.7 Multiple Scores with same Version per Product
  if (preconditionFor_6_1_7_Matches(doc)) {
    doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      /** @type {Map<string, Set<string>>} */
      const cvssVersionsByProductName = new Map()

      vulnerability.scores?.forEach((score, scoreIndex) => {
        score.products?.forEach((product, productIndex) => {
          const versionSet = cvssVersionsByProductName.get(product) ?? new Set()
          cvssVersionsByProductName.set(product, versionSet)

          if (
            (score.cvss_v2?.version !== undefined &&
              versionSet.has(score.cvss_v2.version)) ||
            (score.cvss_v3?.version !== undefined &&
              versionSet.has(score.cvss_v3.version))
          ) {
            isValid = false
            errors.push({
              message: `product is already included in these cvss-versions: ${Array.from(
                versionSet.keys()
              ).join(', ')}`,
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/products/${productIndex}`,
            })
          }
          if (score.cvss_v2?.version !== undefined) {
            versionSet.add(score.cvss_v2.version)
          }
          if (score.cvss_v3?.version !== undefined) {
            versionSet.add(score.cvss_v3.version)
          }
        })
      })
    })
  }

  return { errors, isValid }
}

/**
 * @param {unknown} rawDoc
 * @returns {rawDoc is {
 *    vulnerabilities: Array<{
 *      scores?: Array<{
 *        products?: string[]
 *        cvss_v3?: { version?: string }
 *        cvss_v2?: { version?: string }
 *      }>
 *    }>
 *  }}
 */
const preconditionFor_6_1_7_Matches = (rawDoc) => {
  if (typeof rawDoc !== 'object' || !rawDoc) return false
  /** @type {{ vulnerabilities?: unknown }} */
  const doc = rawDoc
  return (
    Array.isArray(doc.vulnerabilities) &&
    doc.vulnerabilities.every(
      (vulnerability) =>
        (Array.isArray(vulnerability.scores) &&
          vulnerability.scores.every(
            (
              /** @type {{ products?: unknown; cvss_v2?: any; cvss_v3?: any }} */ score
            ) =>
              Array.isArray(score.products) &&
              score.products.every((product) => typeof product === 'string') &&
              ((score.cvss_v2 &&
                (typeof score.cvss_v2.version === 'string' ||
                  score.cvss_v2.version === undefined)) ||
                score.cvss_v2 === undefined) &&
              ((score.cvss_v3 &&
                (typeof score.cvss_v3.version === 'string' ||
                  score.cvss_v3.version === undefined)) ||
                score.cvss_v3 === undefined)
          )) ||
        vulnerability.scores === undefined
    )
  )
}
