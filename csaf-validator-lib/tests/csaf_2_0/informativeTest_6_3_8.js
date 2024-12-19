import { expect } from 'chai'
import informativeTest_6_3_8 from '../../lib/csaf_2_0/informativeTests/informativeTest_6_3_8.js'
import readExampleFiles from '../shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('informativeTest_6_3_8/failing', import.meta.url)
)

describe('Informative test 6.3.8', function () {
  describe('failing examples', function () {
    for (const [title, failingExample] of failingExamples) {
      it(title, async function () {
        const result = await informativeTest_6_3_8(failingExample, {
          async hunspell() {
            return 'Hunspell vMOCK\n\n# wrongword 1'
          },
        })

        expect(result.infos).to.have.length.greaterThan(0)
      })
    }
  })
})
