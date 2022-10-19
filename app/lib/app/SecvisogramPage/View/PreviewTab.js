import {
  faCheckCircle,
  faExclamationTriangle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import HTMLTemplate from './shared/HTMLTemplate.js'

/**
 * Defines the layout of the preview tab.
 *
 * @param {{
 *  formValues: import('../shared/types').FormValues
 *  validationErrors: import('../shared/types').ValidationError[]
 *  onExport(html: string, doc: {}): void
 *  onPreview(): void
 *  previewResult: {
 *    doc: {}
 *  } | null
 * }} props
 */
export default function PreviewTab({
  validationErrors: errors,
  onPreview,
  previewResult,
}) {
  /**
   * Extend the document initially.
   */
  React.useEffect(() => {
    onPreview()
  }, [onPreview])

  /** @type {React.MutableRefObject<HTMLIFrameElement | null>} */
  const iframeRef = React.useRef(null)
  const [showErrors, setShowErrors] = React.useState(false)
  const [showRendered, setShowRendered] = React.useState(true)
  const html = React.useMemo(() => {
    return HTMLTemplate({ document: previewResult?.doc ?? {} })
  }, [previewResult?.doc])

  /**
   * Updates the content of the preview iframe.
   */
  React.useEffect(() => {
    if (!iframeRef.current?.contentDocument) return
    iframeRef.current.contentDocument.open()
    iframeRef.current.contentDocument.write(html)
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
          <iframe
            id="preview"
            className={
              'advisory w-full border ' + (showErrors ? 'h-4/5' : 'h-full')
            }
            ref={iframeRef}
          />
        ) : (
          <div className={'relative ' + (showErrors ? 'h-4/5' : 'h-full')}>
            <section className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white flex flex-col">
              <div className="h-full border overflow-auto">
                <pre className="text-sm whitespace-pre-wrap p-3 break-all">
                  {html}
                </pre>
              </div>
            </section>
          </div>
        )}
        <div
          className={
            'overflow-auto p-3 border border-red-600 bg-red-200 ' +
            (showErrors ? 'h-1/5' : 'hidden')
          }
        >
          <div className="flex justify-between items-start h-full">
            <div className="pr-4">
              <h2 className="text-xl font-bold">
                Validation <br /> Errors:
              </h2>
            </div>
            <div className="mx-2 flex-grow overflow-auto h-full">
              {errors.map((error, i) => (
                <div key={i}>
                  <b>{error.instancePath}</b>: {error.message}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="text-xl text-red-400"
              onClick={() => setShowErrors(false)}
            >
              <FontAwesomeIcon className="mr-1" icon={faWindowClose} />
            </button>
          </div>
        </div>
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
        <div>
          <h2 className="mb-4 text-xl font-bold">Validation Status</h2>
          {errors.length === 0 ? (
            <>
              <div className="mb-4 flex justify-end">
                <FontAwesomeIcon
                  className="text-6xl text-green-500"
                  icon={faCheckCircle}
                />
              </div>
              <div className="h-9" />
            </>
          ) : (
            <div>
              <div className="mb-4 flex justify-between">
                <span className="text-6xl text-red-500 font-bold">
                  {errors.length}
                </span>
                <FontAwesomeIcon
                  className="text-6xl text-red-500"
                  icon={faExclamationTriangle}
                />
              </div>
              <button
                type="button"
                className="py-1 px-3 h-9 underline text-gray-500"
                onClick={() => setShowErrors(!showErrors)}
              >
                {showErrors ? 'Hide errors' : 'Show errors'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
