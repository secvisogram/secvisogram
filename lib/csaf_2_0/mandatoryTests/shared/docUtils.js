import semver from 'semver'

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
 * @returns {doc is { document: { tracking: { version: string } } }}
 */
export const hasTrackingVersionField = (doc) =>
  typeof doc?.document?.tracking?.version === 'string'

/**
 * @param {any} doc
 * @returns {doc is { document: { tracking: { status: string } } }}
 */
export const hasTrackingStatusField = (doc) =>
  typeof doc?.document?.tracking?.status === 'string'

/**
 * @param {any} doc
 * @returns {doc is { document: { tracking: { revision_history: Array<{ number: string; date: string }> } } }}
 */
export const hasTrackingRevisionHistory = (doc) =>
  Array.isArray(doc?.document?.tracking?.revision_history) &&
  doc?.document?.tracking?.revision_history.every(
    (/** @type {any} */ r) =>
      typeof r.number === 'string' && typeof r.date === 'string'
  )

/**
 * This method collects definitions of product ids and corresponding names and instancePaths in the given document and returns a result object.
 * @param {any} document
 * @returns {{id: string, name: string, instancePath: string}[]}
 */
export const collectProductIds = ({ document }) => {
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
 * This method collects group ids and corresponding instancePaths in the given document and returns a result object.
 *
 * @param {any} document
 * @returns {{id: string, name: string, instancePath: string}[]}
 */
export const collectGroupIds = ({ document }) => {
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
 * @param {{id: string}[]} entries
 * @param {{id: string, instancePath: string}[]} refs
 */
export const findMissingDefinitions = (entries, refs) => {
  return refs.filter(
    (ref) => entries.find((e) => e.id === ref.id) === undefined
  )
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
        `${branchInstancePath}/branches`
      )
  }
}

/**
 * Return positive number if v2 is gte v1 and negative number otherwise
 * @param {string} v1
 * @param {string} v2
 * @returns {number}
 */
export const compareVersions = (v1, v2) => {
  if (semver.valid(v1) && semver.valid(v2)) {
    return semver.gte(v2, v1) ? 1 : -1
  } else {
    return parseInt(v2) - parseInt(v1)
  }
}
