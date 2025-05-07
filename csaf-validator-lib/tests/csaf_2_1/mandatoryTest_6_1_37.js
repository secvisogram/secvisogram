import assert from 'node:assert/strict'
import {
  isValidDate,
  mandatoryTest_6_1_37,
} from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_37.js'

describe('mandatoryTest_6_1_37', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_37({ document: 'mydoc' }).isValid, true)
  })

  describe('isValidDate', function () {
    /*
      A list of test cases to validate against the function. The `string` is the
      date to check and the `boolean` marks if the date is expected to be valid or
      invalid.
      
      - `true` means the date is expected to be VALID
      - `false` means the date is expected to be INVALID
    */
    const testCases = /** @type {Array<[string, boolean]>} */ ([
      ['2024-01-01T00:00:00Z', true],
      ['2024-01-01T00:00:00.000Z', true],
      ['2024-01-01T00:00:00.0Z', true],
      ['2024-01-01T00:00:00.11111111Z', true],
      ['2024-01-01T00:00:00+01:00', true],
      ['2024-01-01T00:00:00.111111+01:00', true],
      ['2024-01-01T:00:00+01:00', false],
      ['2024-01-01T25:00:00+01:00', false],
      ['2024-01-01T00:00:00.111111+01:00', true],
      ['2024-02-29T00:00:00.987564+01:00', true],
      ['2015-06-30T10:29:60-13:30', true],
      ['2015-06-30T23:59:60+00:00', true],
      ['2015-07-01T06:59:60+07:00', true],
      ['2016-12-31T00:00:60-23:59', true],
      ['2016-12-31T23:59:60+00:00', true],
      ['2017-01-01T02:59:60+03:00', true],
      ['2017-01-01T02:59:60+04:00', false],
      ['2024-02-30T00:00:00+01:00', false],
      ['2024-04-31T00:00:00+01:00', false],
      ['2024-13-31T00:00:00+01:00', false],
      ['2024-01-24 10:00:00.000Z', false],
    ])

    testCases.forEach((testCase) => {
      it(`${testCase[0]} -> ${testCase[1]}`, () => {
        assert.equal(isValidDate(testCase[0]).isValid, testCase[1])
      })
    })
  })
})
