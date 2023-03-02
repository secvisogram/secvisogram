import { readFile } from 'fs/promises'
import * as informative from '../informativeTests.js'
import * as optional from '../optionalTests.js'
import * as mandatory from '../mandatoryTests.js'
import { expect } from 'chai'
import { readFileSync } from 'fs'

/** @typedef {import('../lib/shared/types').DocumentTest} DocumentTest */

/** @typedef {Map<string, DocumentTest>} TestMap */

/**
 * @typedef {object} TestCases
 * @property {TestCase[]} tests
 */

/**
 * @typedef {object} TestCase
 * @property {string} id
 * @property {string} group
 * @property {TestSpec[]} [failures]
 * @property {TestSpec[]} [valid]
 */

/**
 * @typedef {object} TestSpec
 * @property {string} name
 * @property {boolean} valid
 */

const tests = new Map([
  [
    'informative',
    /** @type {TestMap} */ (new Map(Object.entries(informative))),
  ],
  ['optional', /** @type {TestMap} */ (new Map(Object.entries(optional)))],
  ['mandatory', /** @type {TestMap} */ (new Map(Object.entries(mandatory)))],
])

const testDataBaseUrl = new URL(
  '../csaf/csaf_2.0/test/validator/data/',
  import.meta.url
)

const testCases = /** @type {TestCases} */ (
  JSON.parse(
    await readFile(new URL('testcases.json', testDataBaseUrl), 'utf-8')
  )
)

const testMap = parseTestCases()

describe('oasis', function () {
  for (const [group, t] of testMap) {
    describe(group, function () {
      for (const [testId, u] of t) {
        describe(testId, function () {
          for (const [type, testSpecs] of u) {
            describe(type, function () {
              for (const testSpec of testSpecs) {
                it(testSpec.name, async function () {
                  const test = tests
                    .get(group)
                    ?.get(`${group}Test_${testId.replace(/\./g, '_')}`)

                  if (!test)
                    throw new Error(
                      `no matching test found for group=${group}, ${testId}`
                    )

                  const doc = JSON.parse(
                    readFileSync(
                      new URL(testSpec.name, testDataBaseUrl),
                      'utf-8'
                    )
                  )

                  const result = await test(doc)

                  if (group === 'mandatory') {
                    expect(result.isValid).to.equal(testSpec.valid)
                    expect(
                      Boolean(result.errors?.length),
                      type === 'failures'
                        ? 'should have errors'
                        : `should not have errors, but had ${result.errors?.length}`
                    ).to.equal(type === 'failures')
                  } else {
                    expect(result.isValid === undefined).to.equal(
                      testSpec.valid
                    )

                    if (group === 'optional') {
                      expect(
                        Boolean(result.warnings?.length),
                        type === 'failures'
                          ? 'should have warnings'
                          : `should not have warnings, but had ${result.warnings?.length}`
                      ).to.equal(type === 'failures')
                    } else if (group === 'informative') {
                      if (result.infos?.length && type === 'valid') {
                        console.log(testId, result.infos)
                      }
                      expect(
                        Boolean(result.infos?.length),
                        type === 'failures'
                          ? 'should have infos'
                          : `should not have infos, but had ${result.infos?.length}`
                      ).to.equal(type === 'failures')
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})

function parseTestCases() {
  /** @type {Map<string, Map<string, Map<'valid' | 'failures', TestSpec[]>>>} */
  const testData = new Map()
  for (const test of testCases.tests) {
    const valids = testData.get(test.group)?.get(test.id)?.get('valid') ?? []
    const failures =
      testData.get(test.group)?.get(test.id)?.get('failures') ?? []

    for (const valid of test.valid ?? []) {
      valids.push(valid)
    }
    for (const failure of test.failures ?? []) {
      failures.push(failure)
    }

    testData.set(
      test.group,
      new Map(testData.get(test.group)).set(
        test.id,
        new Map(testData.get(test.group)?.get(test.id))
          .set('valid', valids)
          .set('failures', failures)
      )
    )
  }

  return testData
}
