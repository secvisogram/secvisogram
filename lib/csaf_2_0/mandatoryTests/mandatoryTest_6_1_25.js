/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_25(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  // 6.1.25 Multiple Use of Same Hash Algorithm
  if (Array.isArray(doc.product_tree?.full_product_names)) {
    doc.product_tree?.full_product_names.forEach(
      (
        /** @type {any} */ fullProductName,
        /** @type {number} */ fullProductNameIndex
      ) => {
        if (
          Array.isArray(fullProductName.product_identification_helper?.hashes)
        ) {
          fullProductName.product_identification_helper.hashes.forEach(
            (/** @type {any} */ hash, /** @type {number} */ hashIndex) => {
              checkDuplicateHashAlgorithms(
                hash,
                ({ fileHash, fileHashIndex }) => {
                  isValid = false
                  errors.push({
                    instancePath: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/hashes/${hashIndex}/file_hashes/${fileHashIndex}`,
                    message: `there is already a hash with the algorithm ${fileHash.algorithm}`,
                  })
                }
              )
            }
          )
        }
      }
    )
  }

  if (Array.isArray(doc.product_tree?.relationships)) {
    doc.product_tree.relationships.forEach(
      (
        /** @type {any} */ relationship,
        /** @type {number} */ relationshipIndex
      ) => {
        if (
          Array.isArray(
            relationship.full_product_name?.product_identification_helper
              ?.hashes
          )
        ) {
          relationship.full_product_name.product_identification_helper.hashes.forEach(
            (/** @type {any} */ hash, /** @type {number} */ hashIndex) => {
              checkDuplicateHashAlgorithms(
                hash,
                ({ fileHash, fileHashIndex }) => {
                  isValid = false
                  errors.push({
                    instancePath: `/product_tree/relationships/${relationshipIndex}/full_product_name/product_identification_helper/hashes/${hashIndex}/file_hashes/${fileHashIndex}`,
                    message: `there is already a hash with the algorithm ${fileHash.algorithm}`,
                  })
                }
              )
            }
          )
        }
      }
    )
  }

  if (doc.product_tree) {
    checkBranchesForDuplicateHashAlgorithms(
      doc.product_tree,
      ({ branchIndexes, hashIndex, fileHashIndex, fileHash }) => {
        isValid = false
        const branchPathPart = branchIndexes.reduce(
          (str, index) => `${str}/branches/${index}`,
          '/product_tree'
        )
        errors.push({
          instancePath: `${branchPathPart}/product/product_identification_helper/hashes/${hashIndex}/file_hashes/${fileHashIndex}`,
          message: `there is already a hash with the algorithm ${fileHash.algorithm}`,
        })
      }
    )
  }

  return { errors, isValid }
}

/**
 *
 * @param {any} parent
 * @param {(error: { branchIndexes: number[]; hashIndex: number; fileHash: { algorithm: string }, fileHashIndex: number }) => void} onError
 * @param {number[]} [branchIndexes]
 */
const checkBranchesForDuplicateHashAlgorithms = (
  parent,
  onError,
  branchIndexes = []
) => {
  if (Array.isArray(parent.branches)) {
    parent.branches.forEach(
      (/** @type {any} */ branch, /** @type {number} */ branchIndex) => {
        const currentBranchIndexes = branchIndexes.concat([branchIndex])
        if (
          Array.isArray(branch.product?.product_identification_helper?.hashes)
        ) {
          branch.product.product_identification_helper.hashes.forEach(
            (/** @type {any} */ hash, /** @type {number} */ hashIndex) => {
              checkDuplicateHashAlgorithms(
                hash,
                ({ fileHash, fileHashIndex }) => {
                  onError({
                    branchIndexes: currentBranchIndexes,
                    hashIndex,
                    fileHash,
                    fileHashIndex,
                  })
                }
              )
            }
          )
        }
        checkBranchesForDuplicateHashAlgorithms(
          branch,
          onError,
          currentBranchIndexes
        )
      }
    )
  }
}

/**
 * @param {any} hash
 * @param {(error: { fileHash: { algorithm: string }, fileHashIndex: number }) => void} onError
 * @returns
 */
const checkDuplicateHashAlgorithms = (hash, onError) => {
  if (!Array.isArray(hash.file_hashes)) return
  /** @type {Set<string>} */
  const algorithmSet = new Set()
  hash.file_hashes.forEach(
    (/** @type {any} */ fileHash, /** @type {number} */ fileHashIndex) => {
      if (fileHash.algorithm == null) return
      if (algorithmSet.has(fileHash.algorithm)) {
        onError({
          fileHash,
          fileHashIndex,
        })
      }
      algorithmSet.add(fileHash.algorithm)
    }
  )
}
