import { describe, expect, it } from 'vitest'
import renderAdvisoryHtml, {
  ADVISORY_HTML_CSP,
} from '../../../lib/app/SecvisogramPage/View/shared/renderAdvisoryHtml.js'

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
    tracking: {
      id: 'TEST-1',
      status: 'final',
      version: '1',
      initial_release_date: '2024-01-01T00:00:00.000Z',
      current_release_date: '2024-01-01T00:00:00.000Z',
      revision_history: [{ date: '2024-01-01T00:00:00.000Z', number: '1' }],
    },
  },
  vulnerabilities: [{ notes: [{ category: 'description', title: 'Note' }] }],
})

const CSP_META = `<meta http-equiv="Content-Security-Policy" content="${ADVISORY_HTML_CSP}" />`

describe('renderAdvisoryHtml', () => {
  it('allows no scripts in the generated HTML', () => {
    const directives = ADVISORY_HTML_CSP.split(';').map((d) => d.trim())
    expect(directives).toContain("default-src 'none'")
    expect(ADVISORY_HTML_CSP).not.toMatch(/script-src/)
  })

  for (const schemaVersion of /** @type {const} */ (['v2.0', 'v2.1'])) {
    it(`puts the Content-Security-Policy before any document data (${schemaVersion})`, () => {
      const doc = /** @type {any} */ (baseDocument())
      // Values the templates output unescaped through Mustache's lookup in
      // enclosing objects.
      doc.text = MARKER
      doc.summary = MARKER
      doc.document.title = '<head>'

      const html = renderAdvisoryHtml(doc, schemaVersion)

      const headStart = html.indexOf('<head>')
      expect(html.indexOf(CSP_META)).toBe(headStart + '<head>\n  '.length)
      expect(html.split(CSP_META)).toHaveLength(2)
      expect(html.indexOf(CSP_META)).toBeLessThan(html.indexOf('<body>'))
      expect(html.indexOf(CSP_META)).toBeLessThan(
        html.indexOf('data-test-marker'),
      )
    })

    it(`still renders markdown fields (${schemaVersion})`, () => {
      const doc = /** @type {any} */ (baseDocument())
      doc.document.notes[0].text = 'Some **bold** text'

      const html = renderAdvisoryHtml(doc, schemaVersion)

      expect(html).toContain('<strong>bold</strong>')
    })
  }
})
