import checkForUnsafeHashAlgorithms from './shared/checkForUnsafeHashAlgorithms.js'

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_9(doc) {
  return checkForUnsafeHashAlgorithms(doc, 'sha1')
}
