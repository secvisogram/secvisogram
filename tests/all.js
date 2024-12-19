import Ajv from 'ajv'
import assert from 'assert'
import chai from 'chai'
import { getGlobalDispatcher, setGlobalDispatcher } from 'undici'
import strip from '../lib/strip.js'
import { getInformativeTests, getMandatoryTests, getOptionalTests, getSchemaTestByVersion, getSupportedCSAFVersions } from '../lib/tests.js'
import validate from '../lib/validate.js'
import documentTests from './all/documentTests.js'
import informativeTestTests from './all/informativeTests.js'
import optionalTestTests from './all/optionalTests.js'
import schemaTestTests from './all/schemaTests.js'

const { expect } = chai

describe('Core', () => {
  describe('test naming', async function () {
    const versions = getSupportedCSAFVersions().reverse()
    for (let ri = 0; ri < versions.length; ri++) {
      const csafVersion = versions[ri]
      const importFileNames = ri === 0
        ? ['informativeTests', 'mandatoryTests', 'optionalTests']
        : ['exclusiveInformativeTests', 'exlusiveMandatoryTests', 'exclusiveOptionalTests']

      for (let importFileName of importFileNames) {
        let importData
        try { importData = await import(`../lib/csaf_${csafVersion.replace('.', '_')}/${importFileName}.js`) } catch (_) { }
        if (importData) {
          Object.entries(importData).forEach(([testName, test]) => {
            it(`CSAF version ${csafVersion}, ${importFileName}, Test "${testName}" is named correctly`, () => {
              expect(testName === test.name).to.be.true
            })
          })
        }
      }
    }
  })

  getSupportedCSAFVersions().forEach((csafVersion) => {
    describe(`CSAF_${csafVersion}`, async function () {

      const mandatoryTests = await getMandatoryTests(csafVersion) ?? []
      const optionalTests = await getOptionalTests(csafVersion) ?? []
      const informativeTests = await getInformativeTests(csafVersion) ?? []

      const schemaTest = await getSchemaTestByVersion(csafVersion, false)
      const schemaTestStrict = await getSchemaTestByVersion(csafVersion, true)
      assert(schemaTest !== undefined, `Schema test for CSAF version ${csafVersion} is undefined`)
      assert(schemaTestStrict !== undefined, `Strict Schema test for CSAF version ${csafVersion} is undefined`)

      // Not possible with current implementation
      // describe('test naming', function () {
      //   ;[
      //     { name: 'Mandatory', prefix: 'mandatoryTest_', tests: mandatoryTests },
      //     { name: 'Optional', prefix: 'optionalTest_', tests: optionalTests },
      //     {
      //       name: 'Informative',
      //       prefix: 'informativeTest_',
      //       tests: informativeTests,
      //     },
      //   ].forEach(({ name, prefix, tests }) => {
      //     Object.entries(tests).forEach(([keyName, test], i, array) => {
      //       it(`${name} test #${i + 1
      //         } (${keyName}) is named correctly`, function () {
      //           expect(
      //             array.findIndex(([, e]) => e.name === test.name) === i,
      //             'has unique name'
      //           ).to.be.true
      //           expect(keyName === test.name, 'is named like its key').to.be.true
      //           expect(keyName.startsWith(prefix), 'has a correct prefix').to.be.true
      //         })
      //     })
      //   })
      // })

      describe('mandatoryTests', () => {
        documentTests.forEach((documentTest, i) => {
          const testTitle =
            'title' in documentTest && typeof documentTest.title === 'string'
              ? documentTest.title
              : `Mandatory Test #${i + 1}`

          it(testTitle, async () => {
            const result = await validate(
              [schemaTest, schemaTestStrict, ...mandatoryTests],
              documentTest.content
            )
            expect(result.isValid).to.equal(documentTest.valid)
            const errors = result.tests.flatMap((t) => t.errors)
            if ('expectedNumberOfErrors' in documentTest) {
              expect(
                errors.length,
                'Document has the correct number of errors'
              ).to.equal(documentTest.expectedNumberOfErrors)
            }
            if (documentTest.valid) {
              expect(errors).to.have.lengthOf(0)
            } else {
              expect(errors).have.length.greaterThan(0)
            }
          })
        })
      })

      describe('optionalTests', () => {
        optionalTestTests.forEach((documentTest, i) => {
          it(documentTest.title ?? `Optional Test #${i + 1}`, async () => {
            const result = await validate(
              [
                schemaTestStrict,
                ...mandatoryTests,
                ...optionalTests,
              ],
              documentTest.content
            )
            expect(result.isValid).to.be.true
            const errors = result.tests.flatMap((t) => t.errors)
            const warnings = result.tests.flatMap((t) => t.warnings)
            expect(errors).to.have.lengthOf(0)
            expect(
              warnings.length,
              'Document has the correct number of warnings'
            ).to.equal(documentTest.expectedNumberOfWarnings)
          })
        })
      })

      describe('informativeTests', () => {
        const globalDispatcher = getGlobalDispatcher()

        after(function () {
          setGlobalDispatcher(globalDispatcher)
        })

        informativeTestTests.forEach((informativeTest, i) => {
          it(informativeTest.title ?? `Informative Test #${i + 1}`, async () => {
            if ('mockAgent' in informativeTest) {
              setGlobalDispatcher(informativeTest.mockAgent())
            }
            const result = await validate(
              [
                schemaTestStrict,
                ...mandatoryTests,
                ...optionalTests,
                ...informativeTests.filter(
                  (t) => t.name !== 'informativeTest_6_3_8'
                ),
              ],
              informativeTest.content
            )
            expect(result.isValid).to.be.true
            const errors = result.tests.flatMap((t) => t.errors)
            const warnings = result.tests.flatMap((t) => t.warnings)
            const infos = result.tests.flatMap((t) => t.infos)
            expect(errors).to.have.lengthOf(0)
            expect(warnings).to.have.lengthOf(0)
            expect(
              infos.length,
              'Document has the correct number of infos'
            ).to.equal(informativeTest.expectedNumberOfInfos)
          })
        })
      })

      describe('schema', () => {
        describe('validate', function () {
          for (let i = 0; i < schemaTestTests.length; ++i) {
            const schemaTestTest = schemaTestTests[i]

            it(`Test #${i + 1}`, async function () {
              const result = await validate(
                [
                  schemaTest,
                  ...mandatoryTests,
                  ...optionalTests,
                ],
                schemaTestTest.content
              )
              expect(result.isValid).to.equal(schemaTestTest.valid)
              const errors = result.tests.flatMap((t) => t.errors)
              if (schemaTestTest.valid) {
                expect(errors).to.have.lengthOf(0)
              } else {
                expect(errors).have.length.greaterThan(0)
              }
            })
          }
        })

        describe('schema test tests are stripped', function () {
          for (let i = 0; i < schemaTestTests.length; ++i) {
            const schemaTestTest = schemaTestTests[i]
            if (schemaTestTest.strippedVersion === undefined) continue

            it(`Test #${i + 1}`, async function () {
              const result = await strip(
                [schemaTestStrict, ...mandatoryTests],
                schemaTestTest.content
              )

              expect(result.document).to.deep.equal(schemaTestTest.strippedVersion)
            })
          }
        })
      })
    })

    describe('strip', function () {
      it('When stripping a json document properties with errors are removed', async () => {
        const schemaValidator = new Ajv({ allErrors: true }).compile({
          type: 'object',
          properties: { title: { type: 'string' } },
          required: ['title'],
        })

        const result = await strip(
          [
            (doc) => {
              const isValid = schemaValidator(doc)
              return {
                isValid,
                errors:
                  /** @type {{ message: string; instancePath: string; }[]} */ (
                    schemaValidator.errors ?? []
                  ),
              }
            },
          ],
          { title: 4 }
        )

        expect(result.document).to.deep.equal({})
        expect(result.strippedPaths).to.deep.equal([
          { instancePath: '/title', error: true, message: 'must be string' },
        ])
      })

      it('When stripping a json document empty properties are removed', async () => {
        const schemaValidator = new Ajv({ allErrors: true }).compile({
          type: 'object',
          properties: { title: { type: 'string' } },
        })

        const result = await strip(
          [
            (doc) => {
              const isValid = schemaValidator(doc)
              return {
                isValid,
                errors:
                  /** @type {{ message: string; instancePath: string; }[]} */ (
                    schemaValidator.errors ?? []
                  ),
              }
            },
          ],
          { title: '' }
        )

        expect(result.document).to.deep.equal({})
        expect(result.strippedPaths).to.deep.equal([
          { instancePath: '/title', error: false, message: 'value was empty' },
        ])
      })
    })
  })
})
