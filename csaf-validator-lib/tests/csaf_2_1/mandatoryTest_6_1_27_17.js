import assert from 'node:assert/strict'
import { mandatoryTest_6_1_27_17 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_27_17.js'

describe('mandatoryTest_6_1_27_17', function () {
  it('only runs on documents matching the input schema', function () {
    assert.equal(
      mandatoryTest_6_1_27_17({
        document: 'invalid json',
      }).isValid,
      true
    )
  })

  it('only runs on csaf_withdrawn documents', function () {
    assert.equal(
      mandatoryTest_6_1_27_17({
        document: {
          category: 'unknown category',
          notes: [],
        },
      }).isValid,
      true
    )
  })
})
