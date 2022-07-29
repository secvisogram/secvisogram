import { get } from 'lodash'
import React from 'react'
import { useErrorHandler } from 'react-error-boundary'
import DocumentsTab from './SecvisogramPage/DocumentsTab.js'
import { loadAdvisory } from './SecvisogramPage/service.js'
import View from './SecvisogramPage/View.js'
import { backend, validationService } from './shared/api.js'
import APIRequest from './shared/APIRequest.js'
import HistoryContext from './shared/context/HistoryContext.js'
import createCore from './shared/Core.js'
import sitemap from './shared/sitemap.js'

/**
 * @typedef {import('./SecvisogramPage/shared/types').ValidationError} ValidationError
 */

const alertSaveInvalid = {
  label: 'Validation',
  description:
    'Open validation issues: Your document is yet not CSAF 2.0 compliant!',
  cancelLabel: 'Resume editing (Recommended)',
  confirmLabel: 'Save invalid document',
}

const core = createCore()

const doc = core.document.newDocMin()

/**
 * Holds the application-state and provides memoized callbacks for the view
 * to communicate with the core.
 */
const SecvisogramPage = () => {
  const { pushState, location } = React.useContext(HistoryContext)
  const searchParams = new URL(location.href).searchParams
  const [
    {
      isLoading,
      isTabLocked,
      data,
      errors,
      alert,
      stripResult,
      previewResult,
      strict,
    },
    setState,
  ] = React.useState({
    isLoading: false,
    strict: true,
    alert: /**
     * @type {{
     *   confirmLabel: string
     *   cancelLabel: string
     *   label: string
     *   description: string
     *   onConfirm(): void
     *   onCancel(): void
     * } | null}
     */ (null),
    errors: /** @type {ValidationError[]} */ ([]),
    stripResult: /**
     * @type {{
     *    strippedPaths: Array<{ instancePath: string; message: string; error: boolean }>
     *    doc: {}
     * } | null}
     */ (null),
    previewResult: /**
     * @type {{
     *    doc: {}
     * } | null}
     */ (null),
    data: {
      doc,
    },
    activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ (
      'EDITOR'
    ),
    isTabLocked: false,
  })
  const handleError = useErrorHandler()

  return (
    <View
      activeTab={
        searchParams.get('tab') === 'DOCUMENTS'
          ? 'DOCUMENTS'
          : searchParams.get('tab') === 'EDITOR'
          ? 'EDITOR'
          : searchParams.get('tab') === 'SOURCE'
          ? 'SOURCE'
          : searchParams.get('tab') === 'PREVIEW'
          ? 'PREVIEW'
          : searchParams.get('tab') === 'CSAF-JSON'
          ? 'CSAF-JSON'
          : 'EDITOR'
      }
      isTabLocked={isTabLocked}
      isLoading={isLoading}
      errors={errors}
      stripResult={stripResult}
      previewResult={previewResult}
      data={data}
      generatorEngineData={core.document.getGeneratorEngineData()}
      alert={alert}
      strict={strict}
      DocumentsTab={DocumentsTab}
      onLoadAdvisory={(params, callback) => {
        loadAdvisory(params).then(callback).catch(handleError)
      }}
      onUpdateAdvisory={(
        { advisoryId, csaf, revision, summary, legacyVersion },
        callback
      ) => {
        backend
          .updateAdvisory({
            advisoryId,
            csaf,
            revision,
            summary,
            legacyVersion,
          })
          .then(callback)
          .catch(handleError)
      }}
      onLockTab={React.useCallback(() => {
        setState((state) => ({ ...state, isTabLocked: true }))
      }, [])}
      onUnlockTab={React.useCallback(() => {
        setState((state) => ({ ...state, isTabLocked: false }))
      }, [])}
      onSetStrict={(value) => {
        setState((state) => ({
          ...state,
          strict: value,
        }))
      }}
      onDownload={(doc) => {
        core.document
          .validate({ document: doc, strict: strict })
          .then(({ isValid }) => {
            const fileName = createFileName(doc, isValid, 'json')
            if (!isValid) {
              setState((state) => ({
                ...state,
                alert: {
                  ...alertSaveInvalid,
                  onConfirm() {
                    downloadFile(JSON.stringify(doc, null, 2), fileName)
                    setState({ ...state, alert: null })
                  },
                  onCancel() {
                    setState({ ...state, alert: null })
                  },
                },
              }))
            } else {
              downloadFile(JSON.stringify(doc, null, 2), fileName)
            }
          })
          .catch(handleError)
      }}
      onOpen={(file) => {
        setState((state) => ({ ...state, isLoading: true }))
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.onerror = reject
          fileReader.onload = (e) => {
            try {
              const parsedDoc = JSON.parse(
                /** @type {string | undefined} */ (e.target?.result) ?? ''
              )
              setState((state) => ({
                ...state,
                isLoading: false,
                data: {
                  ...state.data,
                  doc: parsedDoc,
                },
              }))
              resolve(parsedDoc)
            } catch (err) {
              reject(err)
            }
          }
          fileReader.readAsText(file)
        }).catch(handleError)
      }}
      onChangeTab={(tab, document) => {
        if (isTabLocked) return
        setState((state) => ({ ...state, isLoading: true }))
        core.document
          .validate({ document, strict: strict })
          .then((result) => {
            setState((state) => ({
              ...state,
              isLoading: false,
              errors: /** @type {ValidationError[]} */ (result.errors),
            }))
            pushState(null, '', sitemap.home.href([['tab', tab]]))
          })
          .catch(handleError)
      }}
      onValidate={React.useCallback(
        (doc) => {
          core.document
            .validate({ document: doc, strict: strict })
            .then((result) => {
              setState((state) => ({
                ...state,
                errors: /** @type {ValidationError[]} */ (result.errors),
              }))
            })
            .catch(handleError)
        },
        [handleError, strict]
      )}
      onCollectProductIds={React.useCallback(
        async (document) => {
          try {
            const ids = await core.document.collectProductIds({ document })
            return ids
          } catch (error) {
            return handleError(error)
          }
        },
        [handleError]
      )}
      onCollectGroupIds={React.useCallback(
        async (document) => {
          try {
            const ids = await core.document.collectGroupIds({ document })
            return ids
          } catch (error) {
            return handleError(error)
          }
        },
        [handleError]
      )}
      onGetDocMin={(callback) => {
        callback(core.document.newDocMin())
      }}
      onGetDocMax={(callback) => {
        core.document
          .newDocMax()
          .then((doc) => {
            callback(doc)
          })
          .catch(handleError)
      }}
      onCreateAdvisory={({ csaf, summary, legacyVersion }, callback) => {
        backend
          .createAdvisory({ csaf, summary, legacyVersion })
          .then(callback)
          .catch(handleError)
      }}
      onStrip={React.useCallback(
        (document) => {
          core.document
            .strip({ document, strict: strict })
            .then(({ document: doc, strippedPaths }) => {
              setState((state) => ({
                ...state,
                stripResult: {
                  strippedPaths,
                  doc,
                },
              }))
            })
            .catch(handleError)
        },
        [handleError, strict]
      )}
      onPreview={React.useCallback(
        (document) => {
          core.document
            .preview({ document, strict: strict })
            .then(({ document: doc }) => {
              setState((state) => ({
                ...state,
                previewResult: {
                  doc,
                },
              }))
            })
            .catch(handleError)
        },
        [handleError, strict]
      )}
      onExportCSAF={React.useCallback(
        (document) => {
          core.document
            .validate({ document: document, strict: strict })
            .then(({ isValid }) => {
              const fileName = createFileName(document, isValid, 'json')
              if (!isValid) {
                setState((state) => ({
                  ...state,
                  alert: {
                    ...alertSaveInvalid,
                    onConfirm() {
                      core.document
                        .strip({ document, strict: strict })
                        .then(({ document: doc }) => {
                          setState({ ...state, alert: null })
                          downloadFile(JSON.stringify(doc, null, 2), fileName)
                        })
                        .catch(handleError)
                    },
                    onCancel() {
                      setState({ ...state, alert: null })
                    },
                  },
                }))
              } else {
                core.document
                  .strip({ document, strict: strict })
                  .then(({ document: doc }) => {
                    downloadFile(JSON.stringify(doc, null, 2), fileName)
                  })
                  .catch(handleError)
              }
            })
            .catch(handleError)
        },
        [handleError, strict]
      )}
      onExportHTML={React.useCallback(
        (html, doc) => {
          core.document
            .validate({ document: doc, strict: strict })
            .then(({ isValid }) => {
              const fileName = createFileName(doc, isValid, 'html')
              if (!isValid) {
                setState((state) => ({
                  ...state,
                  alert: {
                    ...alertSaveInvalid,
                    onConfirm() {
                      downloadFile(html, fileName, 'text/html')
                      setState({ ...state, alert: null })
                    },
                    onCancel() {
                      setState({ ...state, alert: null })
                    },
                  },
                }))
              } else {
                downloadFile(html, fileName, 'text/html')
              }
            })
        },
        [strict]
      )}
      onServiceValidate={({ validatorUrl, csaf }, callback) => {
        validationService
          .validateCSAF(validatorUrl, { csaf })
          .then(callback)
          .catch(handleError)
      }}
      onGetTemplates={(callback) => {
        new APIRequest(new Request('/api/v1/advisories/templates'))
          .produces('application/json')
          .send()
          .then((res) => res.json())
          .then(callback)
          .catch(handleError)
      }}
      onGetTemplateContent={({ templateId }, callback) => {
        new APIRequest(
          new Request(`/api/v1/advisories/templates/${templateId}`)
        )
          .produces('application/json')
          .send()
          .then((templateContentRes) => templateContentRes.json())
          .then(callback)
          .catch(handleError)
      }}
    />
  )
}

export default SecvisogramPage

/**
 * @param {string} content
 * @param {string} fileName
 * @param {string} type
 */
function downloadFile(content, fileName, type = 'application/json') {
  try {
    const string = btoa(unescape(encodeURIComponent(content)))
    const dataURI = `data:${type};base64,${string}`
    const element = window.document.createElement('a')
    element.download = fileName
    element.href = dataURI
    element.click()
  } catch (/** @type {any} */ e) {
    alert('An error occurred while serializing the download:\n\n' + e.message)
  }
}

/**
 * @param {{}} doc
 * @param {boolean} isValid
 * @param {string} extension
 */
function createFileName(doc, isValid, extension) {
  let trackingId = `${get(doc, 'document.tracking.id', '')}`
  if (trackingId.trim().length === 0) {
    trackingId = 'csaf_2_0'
  } else {
    trackingId = trackingId.toLowerCase().replace(/([^+\-a-z0-9]+)/gi, '_')
  }
  const fileName = `${trackingId}${isValid ? '' : '_invalid'}.${extension}`
  return fileName
}
