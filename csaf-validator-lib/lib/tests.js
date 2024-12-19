import csafAjv from './shared/csafAjv.js'

/** @typedef {import('../lib/shared/types').DocumentTest} DocumentTest */

const DEFAULT_VERSION = '2.0'

// TODO:
// export const getSupportedCSAFVersions = () => ['2.0', '2.1']
export const getSupportedCSAFVersions = () => ['2.0']

/**
 * Returns all mandatory tests for a specific csaf version
 * Returns `undefined` if no tests were found
 */
export const getMandatoryTests = (csafVersion = DEFAULT_VERSION) => getTestsByVersion(csafVersion, 'mandatory')

/**
 * Returns all informative tests for a specific csaf version
 * Returns `undefined` if no tests were found
 */
export const getInformativeTests = (csafVersion = DEFAULT_VERSION) => getTestsByVersion(csafVersion, 'informative')

/**
 * Returns all optional tests for a specific csaf version
 * Returns `undefined` if no tests were found
 */
export const getOptionalTests = (csafVersion = DEFAULT_VERSION) => getTestsByVersion(csafVersion, 'optional')

/**
 * Returns all schema tests for a specific csaf version
 * Returns `undefined` if no tests were found
 * @returns {Promise<DocumentTest[]>}
 */
export const getSchemaTests = async (csafVersion = DEFAULT_VERSION) =>
/** @type {DocumentTest[]} */
([
  await getSchemaTestByVersion(csafVersion, true),
  await getSchemaTestByVersion(csafVersion, false)
].filter((test) => test !== undefined))

/**
 * Returns all schema and mandatory tests for a specific csaf version
 * Returns `undefined` if either of the test groups returns `undefined`
 */
export const getBasicTests = async (csafVersion = DEFAULT_VERSION) => {
  const schemaTest = await getSchemaTestByVersion(csafVersion, true)
  // exclude mandatory test 6.1.8 since included in schema tests
  const mandatotyTests = await getTestsByVersion(csafVersion, 'mandatory', ['mandatoryTest_6_1_8'])
  if (schemaTest === undefined || mandatotyTests === undefined) {
    return undefined
  }
  return [...([schemaTest] ?? []), ...(mandatotyTests ?? [])]
}

/**
 * Returns strict schema, mandatory and optional tests for a specific csaf version
 * Returns `undefined` if either of the test groups returns `undefined`
 */
export const getExtendedTests = async (csafVersion = DEFAULT_VERSION) => {
  const basicTests = await getBasicTests(csafVersion)
  const optionalTests = await getOptionalTests(csafVersion)
  if (basicTests === undefined || optionalTests === undefined) {
    return undefined
  }
  return [...(basicTests ?? []), ...(optionalTests ?? [])]
}

/**
 * Returns strict schema, mandatory, optional and informative tests for a specific csaf version
 * Returns `undefined` if either of the test groups returns `undefined`
 */
export const getFullTests = async (csafVersion = DEFAULT_VERSION) => {
  const extendedTests = await getExtendedTests(csafVersion)
  const informativeTests = await getInformativeTests(csafVersion)
  if (extendedTests === undefined || informativeTests === undefined) {
    return undefined
  }
  return [...(extendedTests ?? []), ...(informativeTests ?? [])]
}

/**
 * Returns all schema, mandatory, optional and informative tests for a specific csaf version
 * Returns `undefined` if all of the test groups return `undefined`
 */
export const getAllTests = async (csafVersion = DEFAULT_VERSION) => {
  const extendedTests = await getExtendedTests(csafVersion)
  const informativeTests = await getInformativeTests(csafVersion)
  const schemaTest = await getSchemaTestByVersion(csafVersion, false)

  let tests = [...(extendedTests ?? []), ...(informativeTests ?? [])]
  if (schemaTest) {
    tests.push(schemaTest)
  }
  return tests.length > 0 ? tests : undefined
}

/**
 * Returns all tests for a specific csaf version and test type
 * Returns `undefined` if no tests were found
 *
 * @param {string} csafVersion
 * @param {'mandatory' | 'informative' | 'optional'} testType
 * @param {string[]} exclude
 * @returns {Promise<DocumentTest[] | undefined>}
 */
async function getTestsByVersion(csafVersion, testType, exclude = []) {
  const versionString = csafVersion.replace('.', '_')
  let tests = /** @type {DocumentTest[]} */ ([])

  const filterTests = (/** @type {object} */ tests) =>
    Object.values(
      Object.fromEntries(
        Object.entries(tests).filter(([testName, _]) => !exclude.includes(testName))
      )
    )

  // add base tests
  try {
    const base_tests = filterTests(await import(`./csaf_${versionString}/${testType}Tests.js`))

    tests = tests.concat(base_tests)
  } catch (_) { }

  // add version exclusive tests
  try {
    const exclusiveTestsFileName = 'exclusive' + testType.charAt(0).toUpperCase() + testType.slice(1)
    const exclusive_tests = filterTests(await import(`./csaf_${versionString}/${exclusiveTestsFileName}.js`))
    tests = tests.concat(exclusive_tests)
  } catch (_) { }

  return tests.length > 0 ? tests : undefined
}

/**
 * Returns schema test for a specific csaf version
 * Returns `undefined` if no schema was found
 *
 * @param {string} csafVersion
 * @param {boolean} strict
 */
export async function getSchemaTestByVersion(csafVersion, strict = false) {
  const schemaName = `${csafVersion.replace('.', '_')}${strict ? '_strict' : ''}`
  let schema;
  try {
    schema = (await import(`./schemas/schema_${schemaName}.js`)).default
  } catch (_) { }

  if (schema === undefined) {
    return undefined
  }

  const validate = csafAjv.compile(schema)

  const funcName = `csaf_${schemaName}`
  const { [funcName]: schemaTestFunction } = {
    [funcName]: (/** @type {any} */doc) => {
      let isValid = validate(doc)
      /**
      *
      * @type {Array<{
      *    message?: string
      *    instancePath: string
      *  }>}
      */
      const errors = validate.errors ?? []
      return {
        isValid,
        errors: errors.map((e) => ({
          ...e,
          message: e.message ?? 'unexpected empty error message',
        })),
      }
    }
  }
  return schemaTestFunction
}
