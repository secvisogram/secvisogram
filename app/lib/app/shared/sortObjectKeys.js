/**
 * @param {Intl.Collator} collator
 * @param {unknown} obj
 * @returns {unknown}
 */
export default function sortObjectKeys(collator, obj) {
  if (typeof obj !== 'object' || obj == null) return obj
  if (Array.isArray(obj)) return obj.map((e) => sortObjectKeys(collator, e))
  return Object.fromEntries(
    Object.entries(obj)
      .sort((a, z) => collator.compare(a[0], z[0]))
      .map(([key, obj]) => [key, sortObjectKeys(collator, obj)])
  )
}
