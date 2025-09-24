import assert from 'node:assert/strict'

import {
  mandatoryTest_6_1_43,
  containMultipleUnescapedStars,
} from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_43.js'

describe('mandatoryTest_6_1_43', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_43({ product_tree: 'mydoc' }).isValid, true)
  })

  describe('containMultipleUnescapedStars', function () {
    const testCases = /** @type {Array<[string, boolean]>} */ ([
      // Valid cases - single or no unescaped stars
      ['PA*', false],
      ['P?A*', false],
      ['P??A*', false],
      ['P???A*', false],
      ['P????A*', false],
      ['*PA', false],
      ['PA', false],
      ['*P\\*\\*?\\*', false],
      ['\\*PA*', false],
      ['PA\\*', false],
      ['PA\\**', false],
      ['*\\*', false],
      ['\\**', false],
      ['\\*\\*', false],
      ['\\**\\*', false],
      // Invalid cases - multiple unescaped stars
      ['P*A*', true],
      ['*P*A', true],
      ['*P*\\*?*', true],
      ['**', true],
      ['***', true],
      ['*\\**', true],
      ['*P*', true],
      ['P*A*B', true],
      ['P*A*B*', true],
      ['*P*\\*?*', true],
    ])

    testCases.forEach((testCase) => {
      it(`${testCase[0]} -> ${testCase[1]}`, () => {
        assert.equal(containMultipleUnescapedStars(testCase[0]), testCase[1])
      })
    })
  })
})
