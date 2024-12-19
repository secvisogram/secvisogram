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
export default function mandatoryTest_6_1_2(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const productIds = collectProductIds({ document: doc })
  const duplicateProductIds = findDuplicateEntries(productIds)
  if (duplicateProductIds.length > 0) {
    isValid = false
    duplicateProductIds.forEach((duplicateProductId) => {
      errors.push({
        message: 'duplicate definition product id',
        instancePath: duplicateProductId.instancePath,
      })
    })
  }

  return { isValid, errors }
}

/**
 * This method collects definitions of product ids and corresponding names and instancePaths in the given document and returns a result object.
 * @param {any} document
 * @returns {{id: string, name: string, instancePath: string}[]}
 */
function collectProductIds({ document }) {
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
