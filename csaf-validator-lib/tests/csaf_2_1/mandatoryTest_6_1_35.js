import assert from 'node:assert'
import { mandatoryTest_6_1_35 } from '../../csaf_2_1/mandatoryTests.js'

describe('mandatoryTest_6_1_37', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_35({ document: 'mydoc' }).isValid, true)
  })

  it('skips remediations without valid category', function () {
    assert.equal(
      mandatoryTest_6_1_35({
        vulnerabilities: [{ remediations: [{}] }],
      }).isValid,
      true
    )
  })

  it('skips remediation group checks without declared group', function () {
    assert.equal(
      mandatoryTest_6_1_35({
        vulnerabilities: [
          {
            remediations: [
              {
                category: 'some_category',
                group_ids: ['my_not_existing_group'],
              },
            ],
          },
        ],
      }).isValid,
      true
    )
  })
})
