import { coreRecord } from '#lib/core.js'
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
import downloadFile from './shared/download.js'
import sitemap from './shared/sitemap.js'

/**
 * @typedef {import('./SecvisogramPage/shared/types').ValidationError} ValidationError
 */

/**
 * Holds the application-state and provides memoized callbacks for the view
 * to communicate with the core.
 */
const SecvisogramPage = () => {
  const { pushState, location } = React.useContext(HistoryContext)
  const { t } = useTranslation()
  const searchParams = new URL(location.href).searchParams
  const [
    {
      isLoading,
      isTabLocked,
      errors,
      alert,
      stripResult,
      previewResult,
      uiSchemaVersion,
    },
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
    activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ (
      'EDITOR'
    ),
    isTabLocked: false,
    /** @type {import('../uiSchemas.js').UiSchemaVersion} */
    uiSchemaVersion: 'v2.1',
  })
  const core = coreRecord[uiSchemaVersion]
  const [doc, setDoc] = React.useState(core.newDocMin())
  const data = React.useMemo(() => ({ doc }), [doc])

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
      uiSchemaVersion={uiSchemaVersion}
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
      generatorEngineData={core.getGeneratorEngineData()}
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
        core
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

              /** @type {import('../uiSchemas.js').UiSchemaVersion} */
              let csaf_version = 'v2.0'
              if (parsedDoc?.document?.csaf_version === '2.1') {
                csaf_version = 'v2.1'
              }

              setState((state) => ({
                ...state,
                uiSchemaVersion: csaf_version,
                isLoading: false,
              }))
              setDoc(parsedDoc)
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
        core
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
          core
            .validate({ document: doc })
            .then((result) => {
              setState((state) => ({
                ...state,
                errors: /** @type {ValidationError[]} */ (result.errors),
              }))
            })
            .catch(handleError)
        },
        [handleError, core]
      )}
      onCollectProductIds={React.useCallback(
        async (document) => {
          try {
            const ids = await core.collectProductIds({ document })
            return ids
          } catch (/** @type {any} */ error) {
            return handleError(error)
          }
        },
        [handleError, core]
      )}
      onCollectGroupIds={React.useCallback(
        async (document) => {
          try {
            const ids = await core.collectGroupIds({ document })
            return ids
          } catch (/** @type {any} */ error) {
            return handleError(error)
          }
        },
        [handleError, core]
      )}
      onGetDocMin={async () => {
        return core.newDocMin()
      }}
      onGetDocMax={async () => {
        return core.newDocMax()
      }}
      onCreateAdvisory={({ csaf, summary, legacyVersion }) => {
        return backend.createAdvisory({ csaf, summary, legacyVersion })
      }}
      onStrip={React.useCallback(
        (document) => {
          core
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
        [handleError, core]
      )}
      onPreview={React.useCallback(
        (document) => {
          core
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
        [handleError, core]
      )}
      onPrepareDocumentForTemplate={React.useCallback(
        (document) => core.preview({ document }),
        [core]
      )}
      onExportCSAF={React.useCallback(
        (document) => {
          core
            .validate({ document: document })
            .then(({ isValid }) => {
              const fileName = createFileName(document, isValid, 'json')
              if (!isValid) {
                setState((state) => ({
                  ...state,
                  alert: {
                    ...alertSaveInvalidTranslationStrings,
                    onConfirm() {
                      core
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
                core
                  .strip({ document })
                  .then(({ document: doc }) => {
                    downloadFile(JSON.stringify(doc, null, 2), fileName)
                  })
                  .catch(handleError)
              }
            })
            .catch(handleError)
        },
        [handleError, alertSaveInvalidTranslationStrings, core]
      )}
      onExportHTML={React.useCallback(
        (html, doc) => {
          core.validate({ document: doc }).then(({ isValid }) => {
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
        [alertSaveInvalidTranslationStrings, core]
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
      onSetUiVersion={(uiSchemaVersion) => {
        setState((state) => ({ ...state, uiSchemaVersion }))
      }}
    />
  )
}

export default SecvisogramPage
