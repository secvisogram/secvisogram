import { describe, expect, it } from 'vitest'
import renderAdvisoryHtml from '../../../lib/app/SecvisogramPage/View/shared/renderAdvisoryHtml.js'

const MARKER = '<b data-test-marker>marker</b>'

const baseDocument = () => ({
  document: {
    category: 'csaf_base',
    csaf_version: '2.0',
    title: 'Test',
    publisher: {
      category: 'vendor',
      name: 'Publisher',
      namespace: 'https://example.com',
    },
    distribution: { tlp: { label: 'WHITE' } },
    notes: [{ category: 'summary', title: 'Note without text' }],
    references: [{ url: 'https://example.com/ref' }],
    tracking: {
      id: 'TEST-1',
      status: 'final',
      version: '1',
      initial_release_date: '2024-01-01T00:00:00.000Z',
      current_release_date: '2024-01-01T00:00:00.000Z',
      revision_history: [{ date: '2024-01-01T00:00:00.000Z', number: '1' }],
    },
  },
  vulnerabilities: [
    {
      notes: [{ category: 'description', title: 'Note without text' }],
      remediations: [{ category: 'vendor_fix', product_ids: [] }],
    },
  ],
})

describe('renderAdvisoryHtml', () => {
  for (const schemaVersion of /** @type {const} */ (['v2.0', 'v2.1'])) {
    it(`does not output ancestor values in unescaped fields (${schemaVersion})`, () => {
      const doc = /** @type {any} */ (baseDocument())
      // Values outside of the paths `renderMarkdown` processes. A field missing
      // on the object being rendered must not be looked up here.
      for (const field of ['text', 'summary', 'details', 'issuing_authority']) {
        doc[field] = MARKER
        doc.vulnerabilities[0][field] = MARKER
      }

      const html = renderAdvisoryHtml(doc, schemaVersion)

      expect(html).not.toContain('data-test-marker')
    })

    it(`still escapes HTML in markdown fields (${schemaVersion})`, () => {
      const doc = /** @type {any} */ (baseDocument())
      doc.document.notes[0].text = MARKER

      const html = renderAdvisoryHtml(doc, schemaVersion)

      expect(html).not.toContain('<b data-test-marker>')
      expect(html).toContain('&lt;b data-test-marker&gt;')
    })

    it(`still renders markdown fields (${schemaVersion})`, () => {
      const doc = /** @type {any} */ (baseDocument())
      doc.document.notes[0].text = 'Some **bold** text'

      const html = renderAdvisoryHtml(doc, schemaVersion)

      expect(html).toContain('<strong>bold</strong>')
    })
  }
})
