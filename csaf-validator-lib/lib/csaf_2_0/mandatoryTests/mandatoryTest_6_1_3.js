/**
 * @typedef {object} FullProductName
 * @property {unknown} product_id
 */

/**
 * @typedef {object} Relationship
 * @property {unknown} relates_to_product_reference
 * @property {unknown} product_reference
 * @property {FullProductName | null} [full_product_name]
 */

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_3(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (!Array.isArray(doc.product_tree?.relationships)) {
    return { isValid, errors }
  }

  /** @type {Array<Relationship>} */
  const relationships = doc.product_tree.relationships

  relationships.forEach((_, index) => {
    /** @type {Set<string>} */
    const erroredAttributeSet = new Set()
    search([], relationships, index, null, ({ key }) => {
      if (typeof key === 'string' && !erroredAttributeSet.has(key)) {
        erroredAttributeSet.add(key)
        isValid = false
        errors.push({
          instancePath: `/product_tree/relationships/${index}/${key}`,
          message: 'circular reference',
        })
      }
    })
  })

  return { isValid, errors }
}

/**
 * @param {number[]} path
 * @param {Relationship[]} relationships
 * @param {number} index
 * @param {string | null} key
 * @param {(params: { key: string | null }) => void} onCycle
 * @returns
 */
function search(path, relationships, index, key, onCycle) {
  const relationship = relationships[index]
  if (
    typeof relationship.full_product_name?.product_id === 'string' &&
    path.includes(index)
  ) {
    return onCycle({ key })
  }

  if (typeof relationship.product_reference === 'string') {
    const productRelationshipIndex = relationships.findIndex(
      (r) => r.full_product_name?.product_id === relationship.product_reference
    )
    if (productRelationshipIndex !== -1) {
      search(
        [...path, index],
        relationships,
        productRelationshipIndex,
        key ?? 'product_reference',
        onCycle
      )
    }
  }

  if (typeof relationship.relates_to_product_reference === 'string') {
    const relatesToProductRelationshipIndex = relationships.findIndex(
      (r) =>
        r.full_product_name?.product_id ===
        relationship.relates_to_product_reference
    )
    if (relatesToProductRelationshipIndex !== -1) {
      search(
        [...path, index],
        relationships,
        relatesToProductRelationshipIndex,
        key ?? 'relates_to_product_reference',
        onCycle
      )
    }
  }
}
