import assert from 'node:assert'
import { recommendedTest_6_2_21 } from '../../csaf_2_1/recommendedTests.js'

describe('recommendedTest_6_2_21', function () {
  it('only runs on relevant documents', function () {
    assert.equal(
      recommendedTest_6_2_21({ vulnerabilities: 'mydoc' }).warnings.length,
      0
    )
  })
  it('skips empty objects', function () {
    assert.equal(
      recommendedTest_6_2_21({
        document: {
          tracking: {
            revision_history: [
              {
                date: '2024-01-22T10:00:00.000Z',
                number: '1',
                summary: 'Initial version.',
              },
              {
                date: '2024-01-22T10:00:00.000Z',
                number: '2',
                summary: 'Second version.',
              },
              {}, // should be ignored
            ],
          },
        },
      }).warnings.length,
      1
    )
  })
  /**
   * Tests if in the warnings message the right revision_history items are referenced even the revision_history
   * contains items where the "date" property is undefined
   * */
  it('warnings message references right revision history items in case of undefined dates', function () {
    assert.deepEqual(
      recommendedTest_6_2_21({
        document: {
          tracking: {
            revision_history: [
              {
                number: '4.0.0',
                summary: 'Fourth version.',
              },
              {
                date: '2024-01-21T10:00:00.000Z',
                number: '2.0.0',
                summary: 'Second version.',
              },
              {
                date: '2025-02-28T14:23:59.000Z',
                number: '3.0.0',
                summary: 'Third version.',
              },
              {},
              {},
              {
                date: '2024-01-21T10:00:00.000Z',
                number: '1.0.0',
                summary: 'Initial version.',
              },
            ],
          },
        },
      }).warnings,
      [
        {
          instancePath: '/document/tracking/revision_history/5/date',
          message:
            'the timestamps of the revision history items with version number 2.0.0 and 1.0.0 are equal',
        },
      ]
    )
  })
})
