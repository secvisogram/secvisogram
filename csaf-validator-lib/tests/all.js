import Ajv from 'ajv'
import chai from 'chai'
import { getGlobalDispatcher, setGlobalDispatcher } from 'undici'
import * as informativeTests from '../informativeTests.js'
import * as mandatoryTests from '../mandatoryTests.js'
import * as schemaTests from '../schemaTests.js'
import strip from '../strip.js'
import validate from '../validate.js'
import * as optionalTests from '../optionalTests.js'
import documentTests from './all/documentTests.js'
import informativeTestTests from './all/informativeTests.js'
import optionalTestTests from './all/optionalTests.js'
import schemaTestTests from './all/schemaTests.js'

const { csaf_2_0_strict, csaf_2_0 } = schemaTests
const { expect } = chai

describe('Core', () => {
  describe('test naming', function () {
    ;[
      { name: 'Mandatory', prefix: 'mandatoryTest_', tests: mandatoryTests },
      { name: 'Optional', prefix: 'optionalTest_', tests: optionalTests },
      {
        name: 'Informative',
        prefix: 'informativeTest_',
        tests: informativeTests,
      },
    ].forEach(({ name, prefix, tests }) => {
      Object.entries(tests).forEach(([keyName, test], i, array) => {
        it(`${name} test #${
          i + 1
        } (${keyName}) is named correctly`, function () {
          expect(
            array.findIndex(([, e]) => e.name === test.name) === i,
            'has unique name'
          ).to.be.true
          expect(keyName === test.name, 'is named like its key').to.be.true
          expect(keyName.startsWith(prefix), 'has a correct prefix').to.be.true
        })
      })
    })
  })

  describe('mandatoryTests', () => {
    documentTests.forEach((documentTest, i) => {
      const testTitle =
        'title' in documentTest && typeof documentTest.title === 'string'
          ? documentTest.title
          : `Mandatory Test #${i + 1}`

      it(testTitle, async () => {
        const result = await validate(
          [csaf_2_0, csaf_2_0_strict, ...Object.values(mandatoryTests)],
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
            csaf_2_0_strict,
            ...Object.values(mandatoryTests),
            ...Object.values(optionalTests),
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
      it(informativeTest.title ?? `Optional Test #${i + 1}`, async () => {
        if ('mockAgent' in informativeTest) {
          setGlobalDispatcher(informativeTest.mockAgent())
        }
        const result = await validate(
          [
            csaf_2_0_strict,
            ...Object.values(mandatoryTests),
            ...Object.values(optionalTests),
            ...Object.values(informativeTests).filter(
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
        const schemaTest = schemaTestTests[i]

        it(`Test #${i + 1}`, async function () {
          const result = await validate(
            [
              csaf_2_0,
              ...Object.values(mandatoryTests),
              ...Object.values(optionalTests),
            ],
            schemaTest.content
          )
          expect(result.isValid).to.equal(schemaTest.valid)
          const errors = result.tests.flatMap((t) => t.errors)
          if (schemaTest.valid) {
            expect(errors).to.have.lengthOf(0)
          } else {
            expect(errors).have.length.greaterThan(0)
          }
        })
      }
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

      for (let i = 0; i < schemaTestTests.length; ++i) {
        const schemaTest = schemaTestTests[i]
        if (schemaTest.strippedVersion === undefined) continue

        it(`Test #${i + 1}`, async function () {
          const result = await strip(
            [csaf_2_0_strict, ...Object.values(mandatoryTests)],
            schemaTest.content
          )

          expect(result.document).to.deep.equal(schemaTest.strippedVersion)
        })
      }
    })
  })
})
