import assert from 'node:assert/strict'
import { mandatoryTest_6_1_27_18 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_27_18.js'

describe('mandatoryTest_6_1_27_18', function () {
  it('only runs on documents matching the input schema', function () {
    assert.equal(
      mandatoryTest_6_1_27_18({
        document: 'invalid json',
      }).isValid,
      true
    )
  })

  it('only runs on csaf_superseded documents', function () {
    assert.equal(
      mandatoryTest_6_1_27_18({
        document: {
          category: 'unknown category',
          notes: [],
        },
      }).isValid,
      true
    )
  })
})
