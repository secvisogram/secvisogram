import assert from 'node:assert'
import { recommendedTest_6_2_41 } from '../../csaf_2_1/recommendedTests.js'

describe('recommendedTest_6_2_41', function () {
  it('only runs on relevant documents', function () {
    assert.equal(
      recommendedTest_6_2_41({ vulnerabilities: 'mydoc' }).warnings.length,
      0
    )
  })

  it('skips status draft', function () {
    assert.equal(
      recommendedTest_6_2_41({
        document: {
          tracking: {
            revision_history: [],
            status: 'draft',
          },
        },
        vulnerabilities: [],
      }).warnings.length,
      0
    )
  })

  it('skips empty revision_history object', function () {
    assert.equal(
      recommendedTest_6_2_41({
        document: {
          tracking: {
            revision_history: [
              {}, // should be ignored
            ],
            status: 'final',
          },
        },
        vulnerabilities: [],
      }).warnings.length,
      0
    )
  })

  it('Skips vulnerabilities without metrics object', function () {
    assert.equal(
      recommendedTest_6_2_41({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [{}],
      }).warnings.length,
      0
    )
  })

  it('skips empty epss object', function () {
    assert.equal(
      recommendedTest_6_2_41({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [
          {
            metrics: [
              {
                content: {
                  epss: {}, // should be ignored
                },
              },
              {
                content: {
                  epss: {
                    timestamp: '2024-01-01T10:00:00.000Z',
                  },
                },
              },
            ],
          },
        ],
      }).warnings.length,
      1
    )
  })
})
