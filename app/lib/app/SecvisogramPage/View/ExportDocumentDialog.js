import { t } from 'i18next'
import React from 'react'
import createFileName from '../../../shared/createFileName.js'
import * as api from '../../shared/api.js'
import AppErrorContext from '../../shared/context/AppErrorContext.js'
import HTMLTemplate from './shared/HTMLTemplate.js'
import { parseMarkdown } from './PreviewTab/markdownParser.js'

export default /**
 * @param {import('./ExportDocumentDialog/types.js').Props} props
 */
({
  defaultSource = 'CSAFJSON',
  advisoryState,
  documentIsValid,
  formValues,
  originalValues,
  onPrepareDocumentForTemplate,
  onExportCSAF,
  onExportHTML,
  onDownload,
  onClose,
}) => {
  const { handleError } = React.useContext(AppErrorContext)

  /** @type {React.MutableRefObject<HTMLDialogElement | null>} */
  const ref = React.useRef(null)
  React.useEffect(() => {
    ref.current?.showModal()
  }, [])

  /** @type {React.MutableRefObject<HTMLIFrameElement | null>} */
  const iframeRef = React.useRef(null)

  const exportText =
    advisoryState?.type === 'NEW_ADVISORY'
      ? t('exportModal.unsavedFileExportOnlyLocal')
      : formValues !== originalValues
      ? t('exportModal.unsavedChangesSelectExportLocation')
      : ''
  const isSelectorVisible =
    advisoryState?.type === 'ADVISORY' && formValues !== originalValues

  const [source, setSource] = React.useState(
    /** @type {'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'} */
    (defaultSource)
  )
  const [isLocal, setIsLocal] = React.useState(
    advisoryState?.type === 'NEW_ADVISORY'
      ? true
      : formValues !== originalValues
      ? true
      : false
  )

  const exportButtonProps = {
    'data-testid': 'export_document-export_document_button',
    className:
      'mt-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white',
  }

  return (
    <dialog
      className="rounded p-0 w-full max-w-lg shadow"
      ref={ref}
      data-testid="export_document_dialog"
      onClose={() => {
        onClose()
      }}
    >
      <>
        <header className="w-full flex items-center justify-between border-b p-2">
          <h2 className="text-lg">{t('exportModal.title')}</h2>
          <button
            type="submit"
            name="cancel"
            onClick={() => {
              ref.current?.close()
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        {isSelectorVisible || exportText ? (
          <div className="border border-t-0 px-4 pb-4 pt-2">
            {exportText ? (
              <div className="content-center pt-2">
                <p className="block text-red-400 text-center">{exportText}</p>
              </div>
            ) : null}
            {isSelectorVisible ? (
              <div className="flex flex-col gap-2 pt-2">
                <select
                  className="block border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                  value={isLocal ? 'local' : 'server'}
                  onChange={(e) => {
                    if (e.target.value === 'server') {
                      setIsLocal(false)
                    } else {
                      setIsLocal(true)
                    }
                  }}
                >
                  <option value={'local'}>local</option>
                  <option value={'server'}>server</option>
                </select>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="p-4 flex flex-col gap-2">
          <div>
            <label
              className={`block p-4 border cursor-pointer${
                source === 'CSAFJSON'
                  ? ' border-blue-400 rounded'
                  : ' rounded hover:shadow'
              }`}
              htmlFor="CSAFJSON"
            >
              <input
                data-testid="export_document-csaf-json_selector_button"
                id="CSAFJSON"
                type="radio"
                name="exportDialogRadio"
                value="CSAFJSON"
                required
                checked={source === 'CSAFJSON'}
                onChange={() => setSource('CSAFJSON')}
              />

              <span className="inline-block ml-3">
                {t('exportModal.exportOptionJson')}
              </span>
            </label>
          </div>
          <div>
            <label
              className={`block p-4 border cursor-pointer${
                source === 'CSAFJSONSTRIPPED'
                  ? ' border-blue-400 rounded'
                  : ' rounded hover:shadow'
              }`}
              htmlFor="CSAFJSONSTRIPPED"
            >
              <input
                data-testid="export_document-csaf-json-stripped_selector_button"
                id="CSAFJSONSTRIPPED"
                type="radio"
                name="exportDialogRadio"
                value="CSAFJSONSTRIPPED"
                required
                checked={source === 'CSAFJSONSTRIPPED'}
                onChange={() => setSource('CSAFJSONSTRIPPED')}
              />
              <span className="inline-block ml-3">
                {t('exportModal.exportOptionJsonStripped')}
              </span>
            </label>
          </div>
          <div>
            <label
              className={`block p-4 border cursor-pointer${
                source === 'HTMLDOCUMENT'
                  ? ' border-blue-400 rounded'
                  : ' rounded hover:shadow'
              }`}
              htmlFor="HTMLDOCUMENT"
            >
              <input
                data-testid="export_document-html_selector_button"
                id="HTMLDOCUMENT"
                type="radio"
                name="exportDialogRadio"
                value="HTMLDOCUMENT"
                required
                checked={source === 'HTMLDOCUMENT'}
                onChange={() => setSource('HTMLDOCUMENT')}
              />
              <span className="inline-block ml-3">
                {t('exportModal.exportOptionHtml')}
              </span>
            </label>
          </div>
          <div>
            <label
              className={`block p-4 border cursor-pointer${
                source === 'PDFDOCUMENT'
                  ? ' border-blue-400 rounded'
                  : ' rounded hover:shadow'
              }`}
              htmlFor="PDFDOCUMENT"
            >
              <input
                data-testid="export_document-pdf_selector_button"
                id="PDFDOCUMENT"
                type="radio"
                name="exportDialogRadio"
                value="PDFDOCUMENT"
                required
                checked={source === 'PDFDOCUMENT'}
                onChange={() => setSource('PDFDOCUMENT')}
              />
              <span className="inline-block ml-3">
                {t('exportModal.exportOptionPdf')}
              </span>
            </label>
          </div>
          {!isLocal ? (
            <div>
              <label
                className={`block p-4 border cursor-pointer${
                  source === 'MARKDOWN'
                    ? ' border-blue-400 rounded'
                    : ' rounded hover:shadow'
                }`}
                htmlFor="MARKDOWN"
              >
                <input
                  data-testid="export_document-markdown_selector_button"
                  id="MARKDOWN"
                  type="radio"
                  name="exportDialogRadio"
                  value="MARKDOWN"
                  required
                  checked={source === 'MARKDOWN'}
                  onChange={() => setSource('MARKDOWN')}
                />
                <span className="inline-block ml-3">
                  {t('exportModal.exportOptionMarkdown')}
                </span>
              </label>
            </div>
          ) : null}
          {source === 'PDFDOCUMENT' && isLocal && (
            <iframe data-testid="pdf_document_iframe" hidden ref={iframeRef} />
          )}
        </div>
        <footer className="p-2 border-t flex justify-between items-center">
          <button
            data-testid="export_document-cancel_button"
            className="mt-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
            type="button"
            onClick={() => {
              ref.current?.close()
            }}
          >
            {t('menu.cancel')}
          </button>
          {isLocal ? (
            <button
              {...exportButtonProps}
              type="button"
              onClick={() => {
                if (source !== 'PDFDOCUMENT') {
                  ref.current?.close()
                }

                switch (source) {
                  case 'CSAFJSON':
                    onDownload(formValues.doc)
                    break
                  case 'CSAFJSONSTRIPPED':
                    onExportCSAF(formValues.doc)
                    break
                  case 'HTMLDOCUMENT':
                    onPrepareDocumentForTemplate(formValues.doc)
                      .then(({ document: doc }) => {
                        const markdownParsedDoc = parseMarkdown(doc)
                        const html = HTMLTemplate({
                          document: markdownParsedDoc,
                        })
                        onExportHTML(html, formValues.doc)
                      })
                      .catch(handleError)
                    break
                  case 'PDFDOCUMENT':
                    onPrepareDocumentForTemplate(formValues.doc)
                      .then(({ document: doc }) => {
                        if (
                          !iframeRef.current?.contentWindow ||
                          !iframeRef.current.contentDocument
                        ) {
                          return
                        }
                        const html = HTMLTemplate({ document: doc })
                        const iframeWindow = iframeRef.current.contentWindow
                        iframeRef.current.contentDocument.open()
                        iframeRef.current.contentDocument.write(html)
                        iframeRef.current.contentDocument.close()

                        iframeRef.current.focus()
                        iframeWindow.print()
                      })
                      .catch(handleError)
                    break
                }
              }}
            >
              {t('exportModal.export')}
            </button>
          ) : advisoryState?.type === 'ADVISORY' ? (
            source === 'CSAFJSONSTRIPPED' ? (
              <button
                {...exportButtonProps}
                type="button"
                onClick={() => {
                  ref.current?.close()
                  api.exportService
                    .exportJson(advisoryState.advisory.advisoryId)
                    .then((response) => {
                      onExportCSAF(response)
                    })
                    .catch(handleError)
                }}
              >
                {t('exportModal.export')}
              </button>
            ) : (
              <a
                {...exportButtonProps}
                href={api.exportService.getExportUrl(
                  advisoryState.advisory.advisoryId,
                  source === 'CSAFJSON'
                    ? 'JSON'
                    : source === 'HTMLDOCUMENT'
                    ? 'HTML'
                    : source === 'MARKDOWN'
                    ? 'Markdown'
                    : 'PDF'
                )}
                download={createFileName(
                  advisoryState.advisory.csaf,
                  documentIsValid,
                  source === 'CSAFJSON'
                    ? 'json'
                    : source === 'HTMLDOCUMENT'
                    ? 'html'
                    : source === 'MARKDOWN'
                    ? 'md'
                    : 'pdf'
                )}
                onClick={() => {
                  ref.current?.close()
                }}
              >
                {t('exportModal.export')}
              </a>
            )
          ) : null}
        </footer>
      </>
    </dialog>
  )
}
