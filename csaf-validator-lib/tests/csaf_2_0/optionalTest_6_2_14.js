import { expect } from 'chai'
import { optionalTest_6_2_14 } from '../../lib/csaf_2_0/optionalTests.js'
import readExampleFiles from '../shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('optionalTest_6_2_14/failing', import.meta.url)
)

const validExamples = await readExampleFiles(
  new URL('optionalTest_6_2_14/valid', import.meta.url)
)

describe('Optional test 6.2.14', function () {
  describe('failing examples', function () {
    for (const [title, failingExample] of failingExamples) {
      it(title, async function () {
        const result = await optionalTest_6_2_14(failingExample)

        expect(result.warnings).to.have.length.greaterThan(0)
      })
    }
  })

  describe('valid examples', function () {
    for (const [title, validExample] of validExamples) {
      it(title, async function () {
        const result = await optionalTest_6_2_14(validExample)

        expect(result.warnings).to.haveOwnProperty('length', 0)
      })
    }
  })
})
