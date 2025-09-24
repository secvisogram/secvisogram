import assert from 'node:assert/strict'
import { mandatoryTest_6_1_40 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_40.js'

describe('mandatoryTest_6_1_40', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_40({ document: 'mydoc' }).isValid, true)
  })
})
