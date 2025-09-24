import assert from 'node:assert'
import { informativeTest_6_3_12 } from '../../csaf_2_1/informativeTests.js'
import { expect } from 'chai'

const failingTestWithNotConsideredObject = {
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
        {},
        {
          content: {
            cvss_v3: {
              version: '3.1',
              vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
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

describe('informativeTest_6_3_12', function () {
  it('only runs on relevant documents', function () {
    assert.equal(informativeTest_6_3_12({ document: 'mydoc' }).infos.length, 0)
  })

  it('test input schema with not considered json object in vulnerabilities', async function () {
    const result = informativeTest_6_3_12(failingTestWithNotConsideredObject)
    expect(result.infos.length).to.eq(2)
  })
})
