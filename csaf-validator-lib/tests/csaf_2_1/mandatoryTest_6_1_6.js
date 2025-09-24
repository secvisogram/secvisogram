import assert from 'node:assert/strict'
import { mandatoryTest_6_1_6 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_6.js'

describe('mandatoryTest_6_1_6', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_6({ document: 'mydoc' }).isValid, true)
  })

  it('skip the check if there is no product status', function () {
    assert.equal(
      mandatoryTest_6_1_6({
        vulnerabilities: [{}],
      }).isValid,
      true
    )
  })
})
