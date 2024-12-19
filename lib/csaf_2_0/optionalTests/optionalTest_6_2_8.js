import checkForUnsafeHashAlgorithms from './shared/checkForUnsafeHashAlgorithms.js'

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_8(doc) {
  return checkForUnsafeHashAlgorithms(doc, 'md5')
}
