import {
  enrichDocumentV2_0,
  enrichDocumentV2_1,
  HTMLTemplate2_0,
  HTMLTemplate2_1,
  renderMarkdown,
} from '@secvisogram/html-template'

/**
 * Names the HTML templates output without escaping (`{{{name}}}`). Only the
 * values `renderMarkdown` produces at the expected paths are safe there.
 */
const UNESCAPED_TEMPLATE_FIELDS = [
  'details',
  'issuing_authority',
  'name',
  'summary',
  'text',
]

/**
 * Mustache looks a name up in the enclosing objects when the current object
 * does not have it. An object without e.g. `text` would therefore print a
 * `text` property of an ancestor, which `renderMarkdown` never processed,
 * unescaped. Declaring the missing fields on every object ends the lookup
 * there and renders them empty, as if they were missing.
 *
 * @param {unknown} value
 * @param {WeakSet<object>} [visited]
 */
function declareUnescapedFields(value, visited = new WeakSet()) {
  if (value === null || typeof value !== 'object' || visited.has(value)) return
  visited.add(value)
  if (Array.isArray(value)) {
    value.forEach((item) => declareUnescapedFields(item, visited))
    return
  }
  const record = /** @type {Record<string, unknown>} */ (value)
  for (const field of UNESCAPED_TEMPLATE_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(record, field)) {
      record[field] = undefined
    }
  }
  Object.values(record).forEach((item) => declareUnescapedFields(item, visited))
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
  declareUnescapedFields(parsedDoc)
  return schemaVersion === 'v2.1'
    ? HTMLTemplate2_1({ document: parsedDoc })
    : HTMLTemplate2_0({ document: parsedDoc })
}
