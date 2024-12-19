import { expect } from 'chai'
import validateStrict from '../lib/validateStrict.js'

describe('validateStrict', function () {
  it('throws if an unknown test function is passed and strict mode is used', async function () {
    try {
      await validateStrict(
        [
          function () {
            return {}
          },
        ],
        '2.0',
        {}
      )
      expect.fail()
    } catch (/** @type {any} */ e) {
      expect(e.message).to.contain(
        'Execution of test functions not defined in the library is prohibited.'
      )
    }
  })
})
