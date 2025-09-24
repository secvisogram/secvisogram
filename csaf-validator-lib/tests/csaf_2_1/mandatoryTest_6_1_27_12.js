import assert from 'node:assert/strict'
import { mandatoryTest_6_1_27_12 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_27_12.js'

describe('mandatoryTest_6_1_27_12', function () {
  it('only runs on documents matching the input schema', function () {
    assert.equal(
      mandatoryTest_6_1_27_12({
        document: 'invalid json',
        vulnerabilities: [
          {
            product_status: {
              under_investigation: ['CSAFPID-9080700'],
            },
          },
        ],
      }).isValid,
      true
    )
  })

  it('only runs on csaf_security_advisory documents', function () {
    assert.equal(
      mandatoryTest_6_1_27_12({
        document: {
          category: 'unknown category',
        },
        vulnerabilities: [
          {
            product_status: {
              under_investigation: ['CSAFPID-9080700'],
            },
          },
        ],
      }).isValid,
      true
    )
  })
})
