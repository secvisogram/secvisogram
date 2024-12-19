import validate from './validate.js'
import { getAllTests } from './tests.js'

/** @type {import('./shared/types.js').DocumentTest[] | undefined} */
let validTests

/**
 * This function validates the given document against the given tests. It throws
 * an error if an unknown test function was passed.
 *
 * @param {Array<import('./shared/types.js').DocumentTest>} tests
 * @param {string} csafVersion
 * @param {any} doc
 */
export default async function (tests, csafVersion, doc) {
  if (validTests === undefined) {
    validTests = await getAllTests(csafVersion)
  }

  for (const test of tests) {
    if (!validTests?.includes(test)) {
      throw new Error(
        'Execution of test functions not defined in the library is prohibited. See https://github.com/secvisogram/csaf-validator-lib#strict-mode for more details.'
      )
    }
  }

  return validate(tests, doc)
}
