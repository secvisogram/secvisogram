import assert from 'node:assert'
import { mandatoryTest_6_1_9 } from '../../csaf_2_1/mandatoryTests.js'

describe('mandatoryTest_6_1_9', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_9({ document: 'mydoc' }).isValid, true)
  })

  it('test safelyParseCVSSV2Vector with invalid vector string format', function () {
    const doc = {
      document: 'mydoc',
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          metrics: [
            {
              content: {
                cvss_v2: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:INVALID',
                  baseScore: 10.0,
                },
                cvss_v3: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:INVALID',
                  baseScore: 10,
                  baseSeverity: 'CRITICAL',
                },
              },
              products: ['CSAFPID-9080700'],
            },
          ],
        },
      ],
    }
    assert.equal(mandatoryTest_6_1_9(doc).isValid, true)
  })
})
