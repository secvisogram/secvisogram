import * as docUtils from './shared/docUtils.js'

const { collectProductIds } = docUtils

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
export default function mandatoryTest_6_1_1(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const productIds = collectProductIds({ document: doc })
  const productIdRefs = collectProductIdRefs({ document: doc })
  const missingProductDefinitions = findMissingDefinitions(
    productIds,
    productIdRefs
  )
  if (missingProductDefinitions.length > 0) {
    isValid = false
    missingProductDefinitions.forEach((missingProductDefinition) => {
      errors.push({
        message: 'definition of product id missing',
        instancePath: missingProductDefinition.instancePath,
      })
    })
  }
  return { isValid, errors }
}

/**
 * This method collects references to product ids and corresponding instancePaths in the given document and returns a result object.
 * @param {any} document
 * @returns {{id: string, instancePath: string}[]}
 */
function collectProductIdRefs({ document }) {
  const entries = /** @type {{id: string, instancePath: string}[]} */ ([])

  const productGroups = document.product_tree?.product_groups
  if (productGroups) {
    for (let i = 0; i < productGroups.length; ++i) {
      const productGroup = productGroups[i]
      const productIds = productGroup.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `/product_tree/product_groups/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }

  const relationshipGroups = document.product_tree?.relationships
  if (relationshipGroups) {
    for (let i = 0; i < relationshipGroups.length; ++i) {
      const relationshipGroup = relationshipGroups[i]
      const productRef = relationshipGroup.product_reference
      if (productRef) {
        entries.push({
          id: productRef,
          instancePath: `/product_tree/relationships/${i}/product_reference`,
        })
      }
      const relToProductRef = relationshipGroup.relates_to_product_reference
      if (relToProductRef) {
        entries.push({
          id: relToProductRef,
          instancePath: `/product_tree/relationships/${i}/relates_to_product_reference`,
        })
      }
    }
  }

  const vulnerabilities = document.vulnerabilities
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      collectRefsInProductStatus(
        `/vulnerabilities/${i}/product_status`,
        vulnerability,
        entries
      )
      collectProductRefsInRemediations(
        `/vulnerabilities/${i}/remediations`,
        vulnerability,
        entries
      )
      collectRefsInScores(
        `/vulnerabilities/${i}/scores`,
        vulnerability,
        entries
      )
      collectProductRefsInThreats(
        `/vulnerabilities/${i}/threats`,
        vulnerability,
        entries
      )
    }
  }

  return entries
}

/**
 * @param {string} instancePath
 * @param {{product_status: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInProductStatus = (instancePath, vulnerability, entries) => {
  findRefsInProductStatus(
    vulnerability.product_status?.first_affected,
    `${instancePath}/first_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.first_fixed,
    `${instancePath}/first_fixed`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.fixed,
    `${instancePath}/fixed`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_affected,
    `${instancePath}/known_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_not_affected,
    `${instancePath}/known_not_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.last_affected,
    `${instancePath}/last_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.recommended,
    `${instancePath}/recommended`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.under_investigation,
    `${instancePath}/under_investigation`,
    entries
  )
}

/**
 * @param {string[]} refs
 * @param {string} instancePath
 * @param {{id: string, instancePath: string}[]} entries
 */
const findRefsInProductStatus = (refs, instancePath, entries) => {
  if (refs) {
    for (let i = 0; i < refs.length; ++i) {
      const ref = refs[i]
      if (ref) {
        entries.push({
          id: ref,
          instancePath: `${instancePath}/${i}`,
        })
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInThreats = (instancePath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const productIds = threat.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `${instancePath}/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{scores: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInScores = (instancePath, vulnerability, entries) => {
  const scores = vulnerability.scores
  if (scores) {
    for (let i = 0; i < scores.length; ++i) {
      const score = scores[i]
      const products = score.products
      if (products) {
        for (let j = 0; j < products.length; ++j) {
          const productId = products[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `${instancePath}/${i}/products/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInRemediations = (
  instancePath,
  vulnerability,
  entries
) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const productIds = remediation.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              instancePath: `${instancePath}/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {{id: string}[]} entries
 * @param {{id: string, instancePath: string}[]} refs
 */
const findMissingDefinitions = (entries, refs) => {
  return refs.filter(
    (ref) => entries.find((e) => e.id === ref.id) === undefined
  )
}
