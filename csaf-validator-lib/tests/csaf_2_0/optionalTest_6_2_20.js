import { expect } from 'chai'
import optionalTest_6_2_20 from '../../lib/csaf_2_0/optionalTests/optionalTest_6_2_20.js'
import readExampleFiles from '../shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('optionalTest_6_2_20/failing', import.meta.url)
)

describe('Optional test 6.2.20', function () {
  describe('failing examples', function () {
    for (const [title, failingExample] of failingExamples) {
      it(title, function () {
        const result = optionalTest_6_2_20(failingExample)

        expect(result.warnings.length).to.be.greaterThan(0)
      })
    }
  })
})
