#!/usr/bin/env node

/**
 * @file Script to validate JSON files against given tests
 *
 * Usage: node <script-path>.js -f <json-file-path> -t <test-name> [-c <csaf-version>]
 *
 *    -f <json-file-path>
 *      Specifies the path to the csaf json file to validate the given test against.
 *
 *    -t <test-name>
 *      Specifies the test(s) to run. The values that you can pass here depend on the value
 *      of the `-c` option which specifies the used csaf version. If you use 2.0 here you
 *      can insert any test name from `mandatoryTests.js`, `optionalTests.js`,
 *      `informativeTests.js` and `schemaTests.js`.
 *      If you use 2.1 here you can insert any test name from `csaf_2_1/mandatoryTests.js`,
 *      `csaf_2_1/recommendedTests.js`, `csaf_2_1/informativeTests.js` and `csaf_2_1/schemaTests.js`.
 *      Some presets are also allowed such as `mandatory`, `optional` (only CSAF 2.0), recommended (only CSAF 2.1),
 *      `informative`, `schema` and `base`.
 *
 *    -c <csaf-version> (default: 2.0)
 *      Specifies the csaf version to use. The currently allowed versions are `2.0` (the default)
 *      and `2.1`.
 */

import { readFile } from 'fs/promises'
import validate from '../validate.js'
import { parseArgs } from 'node:util'
import assert from 'node:assert'

/**
 * Types a function that can lazily load a set of tests. This is used to speed up the script
 * by avoiding to load unused test sets.
 *
 * @typedef {() => Promise<Record<string, import('../lib/shared/types.js').DocumentTest>>} DocumentTestLoader
 */

/**
 * This is the main function that reads the file, executes the resolved test
 * and logs the result.
 *
 * @param {object} ctx
 * @param {DocumentTestLoader} ctx.schemaTests
 * @param {DocumentTestLoader} ctx.mandatoryTests
 * @param {DocumentTestLoader} ctx.optionalTests
 * @param {DocumentTestLoader} ctx.recommendedTests
 * @param {DocumentTestLoader} ctx.informativeTests
 * @param {object} params
 * @param {string} params.testName
 * @param {string} params.filePath
 */
const main = async (
  {
    informativeTests,
    mandatoryTests,
    optionalTests,
    recommendedTests,
    schemaTests,
  },
  { testName, filePath }
) => {
  const json = JSON.parse(await readFile(filePath, { encoding: 'utf-8' }))

  const matchingTests =
    testName === 'mandatory'
      ? Object.values(await mandatoryTests())
      : testName === 'optional'
      ? Object.values(await optionalTests())
      : testName === 'recommended'
      ? Object.values(await recommendedTests())
      : testName === 'informative'
      ? Object.values(await informativeTests())
      : testName === 'schema'
      ? Object.values(await schemaTests())
      : testName === 'base'
      ? Object.values(await schemaTests()).concat(
          Object.values(await mandatoryTests())
        )
      : Object.values(await mandatoryTests())
          .concat(Object.values(await optionalTests()))
          .concat(Object.values(await recommendedTests()))
          .concat(Object.values(await informativeTests()))
          .concat(Object.values(await schemaTests()))
          .filter((t) => t.name === testName)

  if (!matchingTests.length)
    throw new Error(`No test matching "${testName}" found`)
  const result = await validate(matchingTests, json)
  process.exitCode = result.isValid ? 0 : 1
  console.log(JSON.stringify(result, null, 2))
}

const { values: cliOptions } = parseArgs({
  options: {
    file: {
      type: 'string',
      short: 'f',
    },
    'csaf-version': {
      type: 'string',
      short: 'c',
      default: '2.0',
    },
    test: {
      type: 'string',
      short: 't',
    },
  },
})

const filePath = cliOptions.file
const testName = cliOptions.test
assert(filePath)
assert(testName)

if (cliOptions['csaf-version'] === '2.0') {
  await main(
    {
      mandatoryTests: () => import('../mandatoryTests.js'),
      informativeTests: () => import('../informativeTests.js'),
      optionalTests: () => import('../optionalTests.js'),
      recommendedTests: async () => ({}),
      schemaTests: () => import('../schemaTests.js'),
    },
    { filePath, testName }
  )
} else if (cliOptions['csaf-version'] === '2.1') {
  await main(
    {
      mandatoryTests: () => import('../csaf_2_1/mandatoryTests.js'),
      informativeTests: () => import('../csaf_2_1/informativeTests.js'),
      optionalTests: async () => ({}),
      recommendedTests: () => import('../csaf_2_1/recommendedTests.js'),
      schemaTests: () => import('../csaf_2_1/schemaTests.js'),
    },
    { filePath, testName }
  )
} else {
  throw new Error('Unknown CSAF version')
}
