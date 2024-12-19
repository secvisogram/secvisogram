import { expect } from 'chai'
import mandatoryTest_6_1_3 from '../../lib/csaf_2_0/mandatoryTests/mandatoryTest_6_1_3.js'
import readExampleFiles from '../shared/readExampleFiles.js'

const validExamples = await readExampleFiles(
  new URL('mandatoryTest_6_1_3/valid', import.meta.url)
)

describe('Mandatory test 6.1.3', function () {
  describe('valid examples', function () {
    for (const [title, validExample] of validExamples) {
      it(title, function () {
        const result = mandatoryTest_6_1_3(validExample)

        expect(result.errors.length).to.equal(0)
      })
    }
  })
})
