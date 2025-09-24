import assert from 'node:assert'
import { recommendedTest_6_2_23 } from '../../csaf_2_1/recommendedTests.js'

describe('recommendedTest_6_2_23', function () {
  it('only runs on relevant documents', async function () {
    assert.equal(
      (await recommendedTest_6_2_23({ vulnerabilities: 'mydoc' })).warnings
        .length,
      0
    )
  })
  it('skips empty objects', async function () {
    assert.equal(
      (
        await recommendedTest_6_2_23({
          vulnerabilities: [
            {
              cwes: [
                {
                  id: 'CWE-596',
                  name: 'DEPRECATED: Incorrect Semantic Object Comparison',
                  version: '4.13',
                },
              ],
            },
            {}, // should be ignored
          ],
        })
      ).warnings.length,
      1
    )
  })
})
