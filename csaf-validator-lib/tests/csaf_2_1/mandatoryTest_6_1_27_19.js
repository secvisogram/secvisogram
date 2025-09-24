import assert from 'node:assert/strict'
import { mandatoryTest_6_1_27_19 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_27_19.js'

describe('mandatoryTest_6_1_27_19', function () {
  it('only runs on documents matching the input schema', function () {
    assert.equal(
      mandatoryTest_6_1_27_19({
        document: 'invalid json',
        notes: [],
      }).isValid,
      true
    )
  })

  it('only runs on csaf_superseded documents', function () {
    assert.equal(
      mandatoryTest_6_1_27_19({
        document: {
          category: 'unknown category',
        },
        notes: [],
      }).isValid,
      true
    )
  })
})
