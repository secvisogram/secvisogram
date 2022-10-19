import { expect } from 'chai'
import { mandatoryTest_6_1_16 } from '../mandatoryTests.js'
import readExampleFiles from './shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('mandatoryTest_6_1_16/failing', import.meta.url)
)

const validExamples = await readExampleFiles(
  new URL('mandatoryTest_6_1_16/valid', import.meta.url)
)

describe('Mandatory test 6.1.16', function () {
  describe('failing examples', function () {
    for (const [title, failingExample] of failingExamples) {
      it(title, async function () {
        const result = await mandatoryTest_6_1_16(failingExample)

        expect(result.errors).to.have.length.greaterThan(0)
      })
    }
  })

  describe('valid examples', function () {
    for (const [title, validExample] of validExamples) {
      it(title, async function () {
        const result = await mandatoryTest_6_1_16(validExample)

        expect(result.errors).to.haveOwnProperty('length', 0)
      })
    }
  })
})
