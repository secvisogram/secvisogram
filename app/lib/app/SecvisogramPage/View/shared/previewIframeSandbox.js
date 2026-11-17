/**
 * Sandbox for the iframes the advisory HTML is written into (preview and PDF
 * export). Without it, the `about:blank` iframe shares the editor's origin
 * (or, in embedded mode, the host page's origin), so any script that makes it
 * into the generated HTML could act on the parent page.
 *
 * - no `allow-scripts`: nothing in the generated document is executed
 * - `allow-same-origin`: the editor itself still writes the document and
 *   attaches listeners from the outside
 * - `allow-modals`: the editor can open the print dialog for the PDF export
 * - `allow-popups*`: links in the advisory can still be opened in a new tab
 */
export const PREVIEW_IFRAME_SANDBOX =
  'allow-same-origin allow-modals allow-popups allow-popups-to-escape-sandbox'
