import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import createFileName from '../shared/createFileName.js'
import DocumentsTab from './SecvisogramPage/DocumentsTab.js'
import { loadAdvisory } from './SecvisogramPage/service.js'
import View from './SecvisogramPage/View.js'
import { backend, validationService } from './shared/api.js'
import ApiRequest from './shared/ApiRequest.js'
import AppErrorContext from './shared/context/AppErrorContext.js'
import HistoryContext from './shared/context/HistoryContext.js'
import createCore from './shared/Core.js'
import downloadFile from './shared/download.js'
import sitemap from './shared/sitemap.js'

/**
 * @typedef {import('./SecvisogramPage/shared/types').ValidationError} ValidationError
 */

const core = createCore()

const doc = core.document.newDocMin()

/**
 * Holds the application-state and provides memoized callbacks for the view
 * to communicate with the core.
 */
const SecvisogramPage = () => {
  const { pushState, location } = React.useContext(HistoryContext)
  const { t } = useTranslation()
  const searchParams = new URL(location.href).searchParams
  const [
    { isLoading, isTabLocked, data, errors, alert, stripResult, previewResult },
    setState,
  ] = React.useState({
    isLoading: false,
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
  const { handleError } = React.useContext(AppErrorContext)

  const alertSaveInvalidTranslationStrings = useMemo(() => {
    return {
      label: t('alert.saveInvalidTitle'),
      description: t('alert.saveInvalidDescription'),
      cancelLabel: t('alert.saveInvalidCancel'),
      confirmLabel: t('alert.saveInvalidConfirm'),
    }
  }, [t])

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
      alert={alert}
      DocumentsTab={DocumentsTab}
      generatorEngineData={core.document.getGeneratorEngineData()}
      onLoadAdvisory={loadAdvisory}
      onUpdateAdvisory={({
        advisoryId,
        csaf,
        revision,
        summary,
        legacyVersion,
      }) => {
        return backend.updateAdvisory({
          advisoryId,
          csaf,
          revision,
          summary,
          legacyVersion,
        })
      }}
      onLockTab={React.useCallback(() => {
        setState((state) => ({ ...state, isTabLocked: true }))
      }, [])}
      onUnlockTab={React.useCallback(() => {
        setState((state) => ({ ...state, isTabLocked: false }))
      }, [])}
      onDownload={(doc) => {
        core.document
          .validate({ document: doc })
          .then(({ isValid }) => {
            const fileName = createFileName(doc, isValid, 'json')
            if (!isValid) {
              setState((state) => ({
                ...state,
                alert: {
                  ...alertSaveInvalidTranslationStrings,
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
          .validate({ document })
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
            .validate({ document: doc })
            .then((result) => {
              setState((state) => ({
                ...state,
                errors: /** @type {ValidationError[]} */ (result.errors),
              }))
            })
            .catch(handleError)
        },
        [handleError]
      )}
      onCollectProductIds={React.useCallback(
        async (document) => {
          try {
            const ids = await core.document.collectProductIds({ document })
            return ids
          } catch (/** @type {any} */ error) {
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
          } catch (/** @type {any} */ error) {
            return handleError(error)
          }
        },
        [handleError]
      )}
      onGetDocMin={async () => {
        return core.document.newDocMin()
      }}
      onGetDocMax={async () => {
        return core.document.newDocMax()
      }}
      onCreateAdvisory={({ csaf, summary, legacyVersion }) => {
        return backend.createAdvisory({ csaf, summary, legacyVersion })
      }}
      onStrip={React.useCallback(
        (document) => {
          core.document
            .strip({ document })
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
        [handleError]
      )}
      onPreview={React.useCallback(
        (document) => {
          core.document
            .preview({ document })
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
        [handleError]
      )}
      onPrepareDocumentForTemplate={React.useCallback(
        (document) => core.document.preview({ document }),
        []
      )}
      onExportCSAF={React.useCallback(
        (document) => {
          core.document
            .validate({ document: document })
            .then(({ isValid }) => {
              const fileName = createFileName(document, isValid, 'json')
              if (!isValid) {
                setState((state) => ({
                  ...state,
                  alert: {
                    ...alertSaveInvalidTranslationStrings,
                    onConfirm() {
                      core.document
                        .strip({ document })
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
                  .strip({ document })
                  .then(({ document: doc }) => {
                    downloadFile(JSON.stringify(doc, null, 2), fileName)
                  })
                  .catch(handleError)
              }
            })
            .catch(handleError)
        },
        [handleError, alertSaveInvalidTranslationStrings]
      )}
      onExportHTML={React.useCallback(
        (html, doc) => {
          core.document.validate({ document: doc }).then(({ isValid }) => {
            const fileName = createFileName(doc, isValid, 'html')
            if (!isValid) {
              setState((state) => ({
                ...state,
                alert: {
                  ...alertSaveInvalidTranslationStrings,
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
        [alertSaveInvalidTranslationStrings]
      )}
      onServiceValidate={({ validatorUrl, csaf }) => {
        return validationService
          .validateCSAF(validatorUrl, { csaf })
          .catch((error) => {
            throw {
              message:
                t('error.errorReachingValidationServiceWithCode') +
                error.status,
            }
          })
      }}
      onGetTemplates={() => {
        return new ApiRequest(new Request('/api/v1/advisories/templates'))
          .setContentType('application/json')
          .send()
          .then((res) => res.json())
      }}
      onGetTemplateContent={({ templateId }) => {
        return new ApiRequest(
          new Request(`/api/v1/advisories/templates/${templateId}`)
        )
          .setContentType('application/json')
          .send()
          .then((templateContentRes) => templateContentRes.json())
      }}
      onGetBackendInfo={backend.getAboutInfo}
    />
  )
}

export default SecvisogramPage
