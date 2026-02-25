import React from 'react'
import { parseMarkdown } from './PreviewTab/markdownParser.js'
import HTMLTemplate from './shared/HTMLTemplate.js'

/**
 * Defines the layout of the preview tab.
 *
 * @param {{
 *  onPreview(): void
 *  previewResult: {
 *    doc: {}
 *  } | null
 * }} props
 */
export default function PreviewTab({ onPreview, previewResult }) {
  /**
   * Extend the document initially.
   */
  React.useEffect(() => {
    onPreview()
  }, [onPreview])

  /** @type {React.MutableRefObject<HTMLIFrameElement | null>} */
  const iframeRef = React.useRef(null)
  const [showRendered, setShowRendered] = React.useState(true)
  const html = React.useMemo(() => {
    const markdownParsedDoc = parseMarkdown(previewResult?.doc ?? {})
    return HTMLTemplate({ document: markdownParsedDoc })
  }, [previewResult?.doc])

  /**
   * Updates the content of the preview iframe.
   */
  React.useEffect(() => {
    if (!iframeRef.current?.contentDocument) return
    iframeRef.current.contentDocument.open()
    iframeRef.current.contentDocument.write(html)
    iframeRef.current.contentDocument.addEventListener('focus', () => {
      iframeRef.current?.blur()
    })
    iframeRef.current.contentDocument.close()
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
