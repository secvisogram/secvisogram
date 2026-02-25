import { isEmpty } from 'lodash/fp.js'

/**
 * utility function to prune object by identifying empty values
 * there's special treatment of arrays containing empty items
 * in case of an empty object inside an array it should be kept
 * @param obj object to prune
 * @type {({}) => {}}
 */
export default function pruneEmpty(obj) {
  if (typeof obj === 'string' || typeof obj === 'number' || obj === undefined)
    return obj
  if (Array.isArray(obj)) return obj.map((item) => pruneEmpty(item))
  return {
    ...Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => [key, pruneEmpty(value)])
        .filter(([, v]) => {
          return typeof v === 'number' || !isEmpty(v)
        }),
    ),
  }
}
