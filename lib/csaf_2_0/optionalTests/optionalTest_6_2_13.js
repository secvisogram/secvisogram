/**
 * @param {any} doc
 */
export default function optionalTest_6_2_13(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  /**
   * @param {Intl.Collator} collator
   * @param {string} prefix
   * @param {unknown} obj
   * @returns {unknown}
   */
  const checkObjectKeysSorting = (collator, prefix, obj) => {
    if (typeof obj !== 'object' || obj == null) return
    if (Array.isArray(obj)) {
      // check sorting for elements inside the array but not the array itself
      obj.forEach((e, i) => {
        checkObjectKeysSorting(collator, prefix + '/' + i, e)
      })
      return
    }

    const keys = /** @type {Array<keyof obj>} */ (Object.keys(obj))
    const expectedKeys = keys.slice().sort((a, z) => collator.compare(a, z))
    if (JSON.stringify(keys) !== JSON.stringify(expectedKeys)) {
      ctx.warnings.push({
        instancePath: prefix,
        message: 'not sorted alphabetically',
      })
    }
    for (const key of keys) {
      checkObjectKeysSorting(collator, prefix + '/' + key, obj[key])
    }
  }

  checkObjectKeysSorting(new Intl.Collator(), '', doc)

  return ctx
}
