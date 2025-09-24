import assert from 'node:assert/strict'
import { mandatoryTest_6_1_27_15 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_27_15.js'

describe('mandatoryTest_6_1_27_15', function () {
  it('only runs on documents matching the input schema', function () {
    assert.equal(
      mandatoryTest_6_1_27_15({
        document: 'invalid json',
      }).isValid,
      true
    )
  })

  it('only runs on csaf_withdrawn and csaf_superseded documents', function () {
    assert.equal(
      mandatoryTest_6_1_27_15({
        document: {
          category: 'unknown category',
        },
      }).isValid,
      true
    )
  })
})
