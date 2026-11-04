/**
 * Extracts the CSAF test ID (e.g. `6.1.27.11`) from the name of a test
 * function (e.g. `mandatoryTest_6_1_27_11`).
 *
 * @param {string | undefined} name
 * @returns {string | undefined} `undefined` if the name contains no test ID
 */
export function testIdFromName(name) {
  const match = name?.match(/_(6(?:_\d+)+)$/)
  return match ? match[1].replaceAll('_', '.') : undefined
}
