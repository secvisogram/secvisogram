import {
  enrichDocumentV2_0,
  enrichDocumentV2_1,
  HTMLTemplate2_0,
  HTMLTemplate2_1,
  renderMarkdown,
} from '@secvisogram/html-template'

/**
 * Content-Security-Policy of the generated advisory HTML. The document needs
 * no scripts, so none are allowed: markup from the CSAF document that reaches
 * the output unescaped cannot run, neither in the preview nor in the exported
 * HTML file wherever it is published. Inline styles (the template's own CSS)
 * and images (markdown in the document) stay allowed.
 */
export const ADVISORY_HTML_CSP = [
  "default-src 'none'",
  "style-src 'unsafe-inline'",
  'img-src http: https: data:',
  "base-uri 'none'",
  "form-action 'none'",
].join('; ')

/**
 * Inserts the Content-Security-Policy as the first element of `<head>`. The
 * head comes from the template itself and precedes all document data, so the
 * policy applies to everything taken from the document.
 *
 * @param {string} html
 */
function addContentSecurityPolicy(html) {
  return html.replace(
    '<head>',
    `<head>\n  <meta http-equiv="Content-Security-Policy" content="${ADVISORY_HTML_CSP}" />`,
  )
}

/**
 * Renders the HTML representation of a CSAF document used by the preview and
 * the HTML/PDF export.
 *
 * @param {{}} doc
 * @param {import('#lib/uiSchemas.js').UiSchemaVersion} schemaVersion
 * @returns {string}
 */
export default function renderAdvisoryHtml(doc, schemaVersion) {
  const { document: enrichedDoc } =
    schemaVersion === 'v2.1' ? enrichDocumentV2_1(doc) : enrichDocumentV2_0(doc)
  const parsedDoc = renderMarkdown(enrichedDoc)
  const html =
    schemaVersion === 'v2.1'
      ? HTMLTemplate2_1({ document: parsedDoc })
      : HTMLTemplate2_0({ document: parsedDoc })
  return addContentSecurityPolicy(html)
}
