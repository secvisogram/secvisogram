import { expect } from 'chai'
import informativeTest_6_3_8 from '../lib/informativeTests/informativeTest_6_3_8.js'
import minimalDoc from './shared/shared/minimalDoc.js'
import csaf_2_0 from '../lib/schemaTests/csaf_2_0.js'

const validMarker = 'Mocked as Valid'

const documentValidBase = {
  document: {
    ...minimalDoc.document,
    notes: [
      {
        category: 'summary',
        text: validMarker,
      },
    ],
    publisher: {
      category: 'other',
      name: 'Example PUB ' + validMarker,
      namespace: 'https://example.com',
    },
    references: [
      {
        category: 'self',
        summary: 'A non-canonical URL. ' + validMarker,
        url: 'https://example.com/security/data/csaf/2021/my-thing-_10.json',
      },
    ],
    title: 'Title ' + validMarker,
    tracking: {
      ...minimalDoc.document.tracking,
      revision_history: [
        {
          number: '1',
          date: '2021-01-14T00:00:00.000Z',
          summary: 'Summary ' + validMarker,
        },
      ],
    },
  },
}

/**
 * @param {object} params
 * @param {string} params.input
 * @returns
 */
async function runHunspellMock({ input }) {
  if (input.includes(validMarker)) {
    return 'Hunspell vMOCK\n\n*'
  } else {
    return 'Hunspell vMOCK\n\n# wrongword 1'
  }
}

describe('Informative test 6.3.8', function () {
  const csafWithInvalidTitle = {
    document: {
      ...documentValidBase.document,
      title: 'Mock as invalid',
    },
  }

  const csafWithInvalidProductName = {
    document: {
      ...documentValidBase.document,
    },
    product_tree: {
      branches: [
        {
          branches: [
            {
              branches: [
                {
                  category: 'product_name',
                  name: 'Mocked as Invalid',
                  product: {
                    name: validMarker,
                    product_id: '7Client-7.6',
                    product_identification_helper: {
                      cpe: 'cpe:/o:redhat:enterprise_linux:7::client',
                    },
                  },
                },
              ],
              category: 'product_family',
              name: validMarker,
            },
          ],
          category: 'vendor',
          name: validMarker,
        },
      ],
    },
  }

  describe('failing examples', function () {
    it('test invalid title', async function () {
      expect(csaf_2_0(csafWithInvalidTitle).isValid).to.true
      const result = await informativeTest_6_3_8(csafWithInvalidTitle, {
        hunspell: runHunspellMock,
      })
      expect(result.infos.length).to.equal(1)
      expect(result.infos[0].instancePath).to.equal('/document/title')
    })

    it('test invalid product name in  branch', async function () {
      expect(csaf_2_0(csafWithInvalidProductName).isValid).to.true
      const result = await informativeTest_6_3_8(csafWithInvalidProductName, {
        hunspell: runHunspellMock,
      })
      expect(result.infos.length).to.equal(1)
      expect(result.infos[0].instancePath).to.equal(
        '/product_tree/branches/0/branches/0/branches/0/name'
      )
    })
  })

  describe('valid examples', function () {
    it('test valid csaf', async function () {
      expect(csaf_2_0(documentValidBase).isValid).to.true
      const result = await informativeTest_6_3_8(documentValidBase, {
        hunspell: runHunspellMock,
      })
      expect(result.infos.length).to.equal(0)
    })
  })
})
