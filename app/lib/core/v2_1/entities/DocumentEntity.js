import { enrichDocumentV2_1 } from '@secvisogram/html-template'

/**
 * This class abstracts central logic regarding the json-document used
 * multiple times within the `Core`.
 */
export default class DocumentEntity {
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
   * This method collects definitions of product ids and corresponding names and instancePaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, name: string, instancePath: string}[]}
   */
  collectProductIds({ document }) {
    const entries =
      /** @type {{id: string, name: string, instancePath: string}[]} */ ([])

    const fullProductNames = document.product_tree?.full_product_names
    if (fullProductNames) {
      for (let i = 0; i < fullProductNames.length; ++i) {
        const fullProductName = fullProductNames[i]
        if (fullProductName.product_id) {
          entries.push({
            id: fullProductName.product_id,
            name: fullProductName.name ?? '',
            instancePath: `/product_tree/full_product_names/${i}/product_id`,
          })
        }
      }
    }

    const relationships = document.product_tree?.relationships
    if (relationships) {
      for (let i = 0; i < relationships.length; ++i) {
        const relationship = relationships[i]
        const fullProductName = relationship.full_product_name
        if (fullProductName) {
          if (fullProductName.product_id) {
            entries.push({
              id: fullProductName.product_id,
              name: fullProductName.name ?? '',
              instancePath: `/product_tree/relationships/${i}/full_product_name/product_id`,
            })
          }
        }
      }
    }

    const branches = document.product_tree?.branches
    if (branches) {
      traverseBranches(branches, entries, '/product_tree/branches')
    }

    return entries
  }

  /**
   * This method collects references to product ids and corresponding instancePaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, instancePath: string}[]}
   */
  collectProductIdRefs({ document }) {
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
          entries,
        )
        collectProductRefsInRemediations(
          `/vulnerabilities/${i}/remediations`,
          vulnerability,
          entries,
        )
        collectRefsInMetrics(
          `/vulnerabilities/${i}/metrics`,
          vulnerability,
          entries,
        )
        collectProductRefsInThreats(
          `/vulnerabilities/${i}/threats`,
          vulnerability,
          entries,
        )
      }
    }

    return entries
  }

  /**
   * This method collects group ids and corresponding instancePaths in the given document and returns a result object.
   *
   * @param {any} document
   * @returns {{id: string, name: string, instancePath: string}[]}
   */
  collectGroupIds({ document }) {
    const entries =
      /** @type {{id: string, name: string, instancePath: string}[]} */ ([])

    const productGroups = document.product_tree?.product_groups
    if (productGroups) {
      for (let i = 0; i < productGroups.length; ++i) {
        const productGroup = productGroups[i]
        if (productGroup.group_id) {
          entries.push({
            id: productGroup.group_id,
            name: productGroup.summary ?? '',
            instancePath: `/product_tree/product_groups/${i}/group_id`,
          })
        }
      }
    }

    return entries
  }

  /**
   * This method collects references to group ids and corresponding instancePaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, instancePath: string}[]}
   */
  collectGroupIdRefs({ document }) {
    const entries = /** @type {{id: string, instancePath: string}[]} */ ([])

    const vulnerabilities = document.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        collectGroupRefsInRemediations(
          `/vulnerabilities/${i}/remediations`,
          vulnerability,
          entries,
        )
        collectGroupRefsInThreats(
          `/vulnerabilities/${i}/threats`,
          vulnerability,
          entries,
        )
      }
    }

    return entries
  }

  /**
   * This method extends a copy of the current document with data required for the preview and returns the copy.
   *
   * @param {{ document: any }} params
   */
  preview({ document }) {
    return enrichDocumentV2_1(document)
  }
}

/**
 * @param {Array<Branch>} branches
 * @param {{id: string, name: string, instancePath: string}[]} entries
 * @param {string} instancePath
 */
const traverseBranches = (branches, entries, instancePath) => {
  for (let i = 0; i < branches.length; ++i) {
    const branch = branches[i]
    const branchInstancePath = `${instancePath}/${i}`
    const fullProductName = branch.product
    if (fullProductName) {
      if (fullProductName.product_id) {
        entries.push({
          id: fullProductName.product_id,
          name: fullProductName.name ?? '',
          instancePath: `${branchInstancePath}/product/product_id`,
        })
      }
    }
    if (branch.branches)
      traverseBranches(
        branch.branches,
        entries,
        `${branchInstancePath}/branches`,
      )
  }
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
 * @param {{product_status: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInProductStatus = (instancePath, vulnerability, entries) => {
  findRefsInProductStatus(
    vulnerability.product_status?.first_affected,
    `${instancePath}/first_affected`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.first_fixed,
    `${instancePath}/first_fixed`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.fixed,
    `${instancePath}/fixed`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_affected,
    `${instancePath}/known_affected`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_not_affected,
    `${instancePath}/known_not_affected`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.last_affected,
    `${instancePath}/last_affected`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.recommended,
    `${instancePath}/recommended`,
    entries,
  )
  findRefsInProductStatus(
    vulnerability.product_status?.under_investigation,
    `${instancePath}/under_investigation`,
    entries,
  )
}

/**
 * @param {string} instancePath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInRemediations = (
  instancePath,
  vulnerability,
  entries,
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
 * @param {string} instancePath
 * @param {{metrics: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInMetrics = (instancePath, vulnerability, entries) => {
  const metrics = vulnerability.metrics
  if (vulnerability.metrics) {
    for (let i = 0; i < metrics.length; ++i) {
      const metric = metrics[i]
      const products = metric.products
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
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInRemediations = (
  instancePath,
  vulnerability,
  entries,
) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const groupIds = remediation.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              instancePath: `${instancePath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInThreats = (instancePath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const groupIds = threat.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              instancePath: `${instancePath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}
