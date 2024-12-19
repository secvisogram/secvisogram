import { expect } from 'chai'
import informativeTest_6_3_9 from '../../lib/csaf_2_0/informativeTests/informativeTest_6_3_9.js'
import readExampleFiles from '../shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('informativeTest_6_3_9/failing', import.meta.url)
)
const validExamples = await readExampleFiles(
  new URL('informativeTest_6_3_9/valid', import.meta.url)
)

describe('Informative test 6.3.9', function () {
  describe('failing examples', function () {
    const expectedErrorCounts = new Map([
      ['oasis_csaf_tc-csaf_2_0-2021-6-3-09-01.json', 1],
      ['oasis_csaf_tc-csaf_2_0-2021-6-3-09-02.json', 2],
      ['oasis_csaf_tc-csaf_2_0-2021-6-3-09-03.json', 4],
      ['oasis_csaf_tc-csaf_2_0-2021-6-3-09-04.json', 2],
      ['oasis_csaf_tc-csaf_2_0-2021-6-3-09-05.json', 2],
      ['oasis_csaf_tc-csaf_2_0-2021-6-3-09-06.json', 6],
    ])

    for (const [title, failingExample] of failingExamples) {
      it(title, function () {
        const result = informativeTest_6_3_9(failingExample)

        expect(result.infos.length).to.be.greaterThan(0)

        if (expectedErrorCounts.has(title)) {
          expect(result.infos.length).to.equal(expectedErrorCounts.get(title))
        }
      })
    }
  })

  describe('valid examples', function () {
    for (const [title, validExample] of validExamples) {
      it(title, function () {
        const result = informativeTest_6_3_9(validExample)

        expect(result.infos.length).to.equal(0)
      })
    }
  })
})
