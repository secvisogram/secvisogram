import { parse } from 'json-pointer'
import { set } from 'lodash/fp.js'

/**
 * @param {{}} doc
 * @param {string[]} instancePath
 * @param {unknown} value
 * @returns
 */
export const updateDocHelper = (doc, instancePath, value) =>
  set(parse('/' + instancePath.join('/')), value, doc)
