/**
 * This function validates the given document against the given tests.
 *
 * @param {Array<import('./shared/types').DocumentTest>} tests
 * @param {any} doc
 */
export default async function (tests, doc) {
  let isValid = true
  const testResults =
    /** @type {({ name: string } & import('./shared/types').Result)[]} */ ([])

  for (const test of tests) {
    const result = await test(doc)
    const testIsValid =
      typeof result.isValid === 'boolean' ? result.isValid : true
    testResults.push({
      isValid: testIsValid,
      errors: result.errors ?? [],
      warnings: result.warnings ?? [],
      infos: result.infos ?? [],
      name: test.name,
    })
    isValid = isValid && testIsValid
  }

  return { tests: testResults, isValid }
}
