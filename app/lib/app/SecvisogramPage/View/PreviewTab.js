import React from 'react'
import {
  enrichDocumentV2_0,
  enrichDocumentV2_1,
  HTMLTemplate2_0,
  HTMLTemplate2_1,
  renderMarkdown,
} from '@secvisogram/html-template'

/**
 * Defines the layout of the preview tab.
 *
 * @param {{
 *  doc: {}
 *  schemaVersion: import('#lib/uiSchemas.js').UiSchemaVersion
 * }} props
 */
export default function PreviewTab({ doc, schemaVersion }) {
  /** @type {React.MutableRefObject<HTMLIFrameElement | null>} */
  const iframeRef = React.useRef(null)
  const [showRendered, setShowRendered] = React.useState(true)
  const html = React.useMemo(() => {
    const { document: enrichedDoc } =
      schemaVersion === 'v2.1'
        ? enrichDocumentV2_1(doc)
        : enrichDocumentV2_0(doc)
    const parsedDoc = renderMarkdown(enrichedDoc)
    return schemaVersion === 'v2.1'
      ? HTMLTemplate2_1({ document: parsedDoc })
      : HTMLTemplate2_0({ document: parsedDoc })
  }, [doc, schemaVersion])

  /**
   * Updates the content of the preview iframe.
   */
  React.useEffect(() => {
    const contentDocument = iframeRef.current?.contentDocument
    if (!contentDocument) return

    const blurIframe = () => {
      iframeRef.current?.blur()
    }

    contentDocument.open()
    contentDocument.write(html)
    contentDocument.addEventListener('focus', blurIframe)
    contentDocument.close()

    return () => {
      contentDocument.removeEventListener('focus', blurIframe)
    }
  }, [html, showRendered])

  /**
   * Switches between html and rendered preview.
   */
  const toggleShowRendered = () => {
    setShowRendered(!showRendered)
  }

  return (
    <div className="preview-html flex h-full mr-3 bg-white">
      <div className="p-3 w-full">
        {showRendered ? (
          <div className="relative h-full">
            <iframe
              id="preview"
              className="advisory w-full border h-full"
              ref={iframeRef}
            />
          </div>
        ) : (
          <div className="relative h-full">
            <section className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white flex flex-col">
              <div className="h-full border overflow-auto">
                <pre className="text-sm whitespace-pre-wrap p-3 break-all">
                  {html}
                </pre>
              </div>
            </section>
          </div>
        )}
      </div>
      <div className="pl-3 pr-6 py-6 w-72 flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="mb-4 text-l font-bold">Preview Mode</h2>
          <div className="mb-6">
            <label
              htmlFor="toggleShowRendered"
              className="text-xs text-gray-500 mr-2"
            >
              HTML Source
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggleShowRendered"
                checked={showRendered}
                onChange={toggleShowRendered}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggleShowRendered"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              />
            </div>
            <label
              htmlFor="toggleShowRendered"
              className="text-xs text-gray-500"
            >
              Rendered
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
