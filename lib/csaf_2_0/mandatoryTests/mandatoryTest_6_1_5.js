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
export default function mandatoryTest_6_1_5(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const groupIds = collectGroupIds({ document: doc })
  const duplicateGroupIds = findDuplicateEntries(groupIds)
  if (duplicateGroupIds.length > 0) {
    isValid = false
    duplicateGroupIds.forEach((duplicateEntry) => {
      errors.push({
        message: 'duplicate definition product group id',
        instancePath: duplicateEntry.instancePath,
      })
    })
  }

  return { isValid, errors }
}

/**
 * This method collects group ids and corresponding instancePaths in the given document and returns a result object.
 *
 * @param {any} document
 * @returns {{id: string, name: string, instancePath: string}[]}
 */
function collectGroupIds({ document }) {
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
 * @param {{id: string, name: string, instancePath: string}[]} entries
 */
const findDuplicateEntries = (entries) => {
  const lookup = entries.reduce((/** @type {any} */ a, entry) => {
    a[entry.id] = ++a[entry.id] || 0
    return a
  }, {})

  return entries.filter((entry) => lookup[entry.id])
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
