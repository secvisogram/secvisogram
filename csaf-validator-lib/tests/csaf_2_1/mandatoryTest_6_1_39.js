import assert from 'node:assert/strict'
import { mandatoryTest_6_1_39 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_39.js'

describe('mandatoryTest_6_1_39', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_39({ document: 'mydoc' }).isValid, true)
  })
})
