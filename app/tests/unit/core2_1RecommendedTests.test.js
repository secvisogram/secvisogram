import { describe, expect, it, vi } from 'vitest'
import * as core from '../../lib/core/v2_1.js'

const MINIMAL_DOC = {
  $schema: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json',
  document: {
    category: 'Test Report',
    csaf_version: '2.1',
    title: 'Minimal valid',
    lang: 'en',
    distribution: {
      tlp: {
        label: 'AMBER',
      },
    },
    publisher: {
      category: 'other',
      name: 'Secvisogram Automated Tester',
      namespace: 'https://github.com/secvisogram/secvisogram',
    },
    references: [
      {
        category: 'self',
        summary: 'A non-canonical URL.',
        url: 'https://example.com/security/data/csaf/2021/my-thing-_10.json',
      },
    ],
    tracking: {
      current_release_date: '2021-01-14T00:00:00.000Z',
      id: 'My-Thing-.10',
      initial_release_date: '2021-01-14T00:00:00.000Z',
      revision_history: [
        {
          number: '1',
          date: '2021-01-14T00:00:00.000Z',
          summary: 'Summary',
        },
      ],
      status: 'draft',
      version: '1',
    },
  },
}

describe('v2_1 recommended tests selection', () => {
  it('does not execute recommendedTest_6_2_55 (no network call for public_openpgp_key_url)', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.reject(new Error('should not fetch')))

    const document = {
      ...MINIMAL_DOC,
      document: {
        ...MINIMAL_DOC.document,
        publisher: {
          ...MINIMAL_DOC.document.publisher,
          contact: {
            public_openpgp_key_url: 'https://example.com/key.asc',
          },
        },
      },
    }

    await core.validate({ document })

    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('still executes other recommended tests (e.g. recommendedTest_6_2_1)', async () => {
    const document = {
      ...MINIMAL_DOC,
      product_tree: {
        full_product_names: [
          {
            name: 'Some unreferenced product',
            product_id: 'CSAFPID-0001',
          },
        ],
      },
    }

    const result = await core.validate({ document })

    expect(
      result.errors.some(
        (e) =>
          e.instancePath === '/product_tree/full_product_names/0/product_id' &&
          e.message === 'is not referenced',
      ),
    ).to.equal(true)
  })
})
