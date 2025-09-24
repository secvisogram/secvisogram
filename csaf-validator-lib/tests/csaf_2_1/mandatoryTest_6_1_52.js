import assert from 'node:assert/strict'
import { mandatoryTest_6_1_52 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_52.js'

describe('mandatoryTest_6_1_52', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_52({ document: 'mydoc' }).isValid, true)
  })

  it('skips status draft', function () {
    assert.equal(
      mandatoryTest_6_1_52({
        document: {
          tracking: {
            revision_history: [],
            status: 'draft',
          },
        },
        vulnerabilities: [],
      }).isValid,
      true
    )
  })

  it('skips empty revision_history object', function () {
    assert.equal(
      mandatoryTest_6_1_52({
        document: {
          tracking: {
            revision_history: [
              {}, // should be ignored
              { date: '2024-01-24T10:00:00.000Z' },
            ],
            status: 'final',
          },
        },
        vulnerabilities: [
          {
            first_known_exploitation_dates: [
              {
                date: '2024-01-24T13:00:00.000Z',
                exploitation_date: '2024-01-24T12:34:56.789Z',
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })

  it('skips empty vulnerability object', function () {
    assert.equal(
      mandatoryTest_6_1_52({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [
          {}, // should be ignored
          {
            first_known_exploitation_dates: [
              {
                date: '2024-01-24T13:00:00.000Z',
                exploitation_date: '2024-01-24T12:34:56.789Z',
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })

  it('skips empty first_known_exploitation_date object', function () {
    assert.equal(
      mandatoryTest_6_1_52({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [
          {
            first_known_exploitation_dates: [
              {}, // should be ignored
              {
                date: '2024-01-24T13:00:00.000Z',
                exploitation_date: '2024-01-24T12:34:56.789Z',
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })
})
