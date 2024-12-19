import { expect } from 'chai'
import mandatoryTest_6_1_8 from '../../lib/csaf_2_0/mandatoryTests/mandatoryTest_6_1_8.js'
import readExampleFiles from '../shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('mandatoryTest_6_1_8/failing', import.meta.url)
)

describe('Mandatory test 6.1.8', function () {
  describe('failing examples', function () {
    for (const [title, failingExample] of failingExamples) {
      it(title, async function () {
        const result = mandatoryTest_6_1_8(failingExample)

        expect(result.isValid).to.be.false
        expect(result.errors).to.have.length.greaterThan(0)
      })
    }
  })
})
