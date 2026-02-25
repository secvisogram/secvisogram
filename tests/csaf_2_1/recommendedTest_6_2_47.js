import assert from 'node:assert'
import { recommendedTest_6_2_47 } from '../../csaf_2_1/recommendedTests.js'

describe('recommendedTest_6_2_47', function () {
  it('only runs on relevant documents', function () {
    assert.equal(
      recommendedTest_6_2_47({ vulnerabilities: 'mydoc' }).warnings.length,
      0
    )
  })

  it('runs on references with empty category in reference', function () {
    assert.equal(
      recommendedTest_6_2_47({
        document: {
          references: [
            {
              category: 'self',
              summary: 'The canonical URL for the CSAF document.',
              url: 'https://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-02.json',
            },
            { url: 'https://some.other.url' },
          ],
          tracking: {
            id: 'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-11',
          },
        },
        vulnerabilities: [
          {
            metrics: [
              {
                content: {
                  qualitative_severity_rating: 'low',
                },
                products: ['CSAFPID-9080700'],
              },
            ],
          },
        ],
      }).warnings.length,
      1
    )
  })

  it('runs on references with empty qualitative_severity_rating (considered as not existing)', function () {
    assert.equal(
      recommendedTest_6_2_47({
        document: {
          references: [
            {
              category: 'self',
              summary: 'The canonical URL for the CSAF document.',
              url: 'https://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-02.json',
            },
            { url: 'https://some.other.url' },
          ],
          tracking: {
            id: 'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-11',
          },
        },
        vulnerabilities: [
          {
            metrics: [
              {
                content: {
                  qualitative_severity_rating: '',
                },
                products: ['CSAFPID-9080700'],
              },
            ],
          },
        ],
      }).warnings.length,
      0
    )
  })

  it('runs on empty metric', function () {
    assert.equal(
      recommendedTest_6_2_47({
        document: {
          references: [
            {
              category: 'self',
              summary: 'The canonical URL for the CSAF document.',
              url: 'https://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-02.json',
            },
            { url: 'https://some.other.url' },
          ],
          tracking: {
            id: 'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-11',
          },
        },
        vulnerabilities: [],
      }).warnings.length,
      0
    )
  })
})
