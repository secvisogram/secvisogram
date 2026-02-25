import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from 'i18next'
import React from 'react'
import Hotkeys from 'react-hot-keys'
import * as semver from 'semver'
import BackendUnavailableError from '../shared/BackendUnavailableError.js'
import AppConfigContext from '../shared/context/AppConfigContext.js'
import AppErrorContext from '../shared/context/AppErrorContext.js'
import UserInfoContext from '../shared/context/UserInfoContext.js'
import externalJsonToFile from '../shared/externalJsonToFile.js'
import { canCreateDocuments } from '../shared/permissions.js'
import pruneEmpty from '../shared/pruneEmpty.js'
import isPropertyRelevant from './shared/isPropertyRelevant.js'
import AboutDialog from './View/AboutDialog.js'
import CsafTab from './View/CsafTab.js'
import ExportDocumentDialog from './View/ExportDocumentDialog.js'
import schema from './View/FormEditor/schema.js'
import RelevanceLevelContext from './View/FormEditor/shared/context/RelevanceLevelContext.js'
import {
  useUniqueGroupId,
  useUniqueProductId,
} from './View/FormEditor/shared/fillFieldFunctions.js'
import FormEditor from './View/FormEditorTab.js'
import JsonEditorTab from './View/JsonEditorTab.js'
import LoadingIndicator from './View/LoadingIndicator.js'
import NewDocumentDialog from './View/NewDocumentDialog.js'
import PreviewTab from './View/PreviewTab.js'
import Reducer from './View/Reducer.js'
import Alert from './View/shared/Alert.js'
import SelectedPathContext from './View/shared/context/SelectedPathContext.js'
import SideBarContext from './View/shared/context/SideBarContext.js'
import DocumentEditorContext from './View/shared/DocumentEditorContext.js'
import useDebounce from './View/shared/useDebounce.js'
import SideBar from './View/SideBar/SideBar.js'
import VersionSummaryDialog from './View/VersionSummaryDialog.js'

/**
 * Holds the editor-state and defines the main layout of the application.
 *
 * @param {import('./View/types.js').Props} props
 */
function View({
  activeTab,
  isTabLocked,
  data,
  defaultAdvisoryState = null,
  stripResult,
  previewResult,
  DocumentsTab,
  generatorEngineData,
  onPrepareDocumentForTemplate,
  onLoadAdvisory,
  onUpdateAdvisory,
  onDownload,
  onOpen,
  onChangeTab,
  onValidate,
  onGetDocMin,
  onGetDocMax,
  onCreateAdvisory,
  onStrip,
  onPreview,
  onExportCSAF,
  onExportHTML,
  onLockTab,
  onUnlockTab,
  onCollectProductIds,
  onCollectGroupIds,
  onServiceValidate,
  onGetTemplates,
  onGetTemplateContent,
  onGetBackendInfo,
  ...props
}) {
  const appConfig = React.useContext(AppConfigContext)
  const { applicationError, handleError } = React.useContext(AppErrorContext)
  const userInfo = React.useContext(UserInfoContext)
  /** @type {React.MutableRefObject<HTMLButtonElement | null>} */
  const sortButtonRef = React.useRef(null)

  const [newDocumentDialog, setNewDocumentDialog] = React.useState(
    /** @type {JSX.Element | null} */ (null),
  )
  const newDocumentDialogRef = React.useRef(
    /** @type {HTMLDialogElement | null} */ (null),
  )
  const { resetProductIdCounter } = useUniqueProductId()
  const { resetGroupIdCounter } = useUniqueGroupId()

  React.useEffect(() => {
    if (newDocumentDialog) {
      const modal = /** @type {any} */ (newDocumentDialogRef.current)
      modal?.showModal()
    }
  }, [newDocumentDialog])

  const [newExportDocumentDialog, setNewExportDocumentDialog] = React.useState(
    /** @type {JSX.Element | null} */ (null),
  )

  const [versionSummaryDialog, setVersionSummaryDialog] = React.useState(
    /** @type {JSX.Element | null} */ (null),
  )
  const versionSummaryDialogRef = React.useRef(
    /** @type {HTMLDialogElement | null} */ (null),
  )
  React.useEffect(() => {
    if (versionSummaryDialog) {
      const modal = /** @type {any} */ (versionSummaryDialogRef.current)
      modal?.showModal()
    }
  }, [versionSummaryDialog])

  const [aboutDialog, setAboutDialog] = React.useState(
    /** @type {JSX.Element | null} */ (null),
  )

  const [advisoryState, setAdvisoryState] = React.useState(
    /** @type {import('./shared/types.js').AdvisoryState | null} */ (
      defaultAdvisoryState ?? {
        type: 'NEW_ADVISORY',
        csaf: /** @type {{}} */ (data?.doc),
      }
    ),
  )
  React.useEffect(() => {
    setAdvisoryState((state) =>
      data
        ? { type: 'NEW_ADVISORY', csaf: /** @type {{}} */ (data.doc) }
        : state,
    )
  }, [data])

  const [isLoading, setLoading] = React.useState(props.isLoading)
  React.useEffect(() => {
    setLoading(props.isLoading)
  }, [props.isLoading])

  const [isSaving, setSaving] = React.useState(false)

  const [errors, setErrors] = React.useState(
    /** @type {Array<import('./shared/types').TypedValidationError>} */ (
      props.errors.map((e) => ({ ...e, type: 'error' }))
    ),
  )
  React.useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const [alert, setAlert] = React.useState(
    /** @type {JSX.Element | null} */ (
      props.alert ? <Alert {...props.alert} /> : null
    ),
  )
  React.useEffect(() => {
    setAlert(props.alert ? <Alert {...props.alert} /> : null)
  }, [props.alert])

  /**
   * Initial values for the editors. Can be used to detect changes of the
   * document.
   */
  const originalValues = React.useMemo(
    () => ({
      doc:
        advisoryState?.type === 'NEW_ADVISORY'
          ? advisoryState.csaf
          : advisoryState?.type === 'ADVISORY'
            ? advisoryState.advisory.csaf
            : {},
    }),
    [advisoryState],
  )

  /**
   * Editor state.
   */
  const [state, dispatch] = React.useReducer(Reducer, {
    formValues: originalValues,
  })
  const formValues = /** @type {import('./shared/types').FormValues} */ (
    state.formValues
  )

  /**
   * Enables debounced validation.
   */
  const debouncedChangedDoc = useDebounce(formValues.doc, 300)

  const [toast, setToast] = React.useState(applicationError)

  const backendNotAvailableTryAgain = React.useMemo(
    () => t('alert.backendNotAvailableTryAgain'),
    [],
  )
  React.useEffect(() => {
    if (applicationError instanceof BackendUnavailableError) {
      setToast({
        message: backendNotAvailableTryAgain,
      })
    } else {
      setToast(applicationError)
    }
  }, [applicationError, backendNotAvailableTryAgain])
  React.useEffect(() => {
    /** @type {ReturnType<typeof setTimeout> | null} */
    let timeout = null
    if (toast) {
      timeout = setTimeout(() => {
        setToast(null)
      }, 5000)
    }
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [toast])

  async function doValidate() {
    setLoading(true)
    onServiceValidate({
      validatorUrl: appConfig.validatorUrl,
      csaf: formValues.doc,
    })
      .then((json) => {
        if (json.isValid) {
          setToast({
            message: t('alert.theDocumentIsValid'),
            color: 'green',
          })
        } else {
          setToast({
            message: t('alert.theDocumentIsInvalid'),
          })
          const errors =
            /** @type {Array<import('./shared/types').TypedValidationError>} */ (
              json.tests.flatMap((t) =>
                t.errors
                  .map((e) => ({ ...e, type: 'error' }))
                  .concat(
                    t.warnings.map((w) => ({
                      ...w,
                      type: 'warning',
                    })),
                  )
                  .concat(
                    t.infos.map((i) => ({
                      ...i,
                      type: 'info',
                    })),
                  ),
              )
            )
          setErrors(errors)
        }
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false)
      })
  }

  const onSaveHandler = () => {
    if (advisoryState?.type === 'NEW_ADVISORY') {
      setVersionSummaryDialog(
        <VersionSummaryDialog
          ref={versionSummaryDialogRef}
          onSubmit={({ summary, legacyVersion }) => {
            setSaving(true)
            onCreateAdvisory({
              csaf: formValues.doc,
              summary,
              legacyVersion,
            })
              .then(({ id }) =>
                onLoadAdvisory({ advisoryId: id }).then((advisory) => {
                  setAdvisoryState({
                    type: 'ADVISORY',
                    advisory,
                  })
                }),
              )
              .catch(handleError)
              .finally(() => {
                setSaving(false)
              })
          }}
          prefilledData={{ summary: '', legacyVersion: '' }}
          onClose={() => setVersionSummaryDialog(null)}
        />,
      )
    } else if (advisoryState?.type === 'ADVISORY') {
      setVersionSummaryDialog(
        <VersionSummaryDialog
          ref={versionSummaryDialogRef}
          onSubmit={({ summary, legacyVersion }) => {
            setSaving(true)
            onUpdateAdvisory({
              advisoryId: advisoryState.advisory.advisoryId,
              revision: advisoryState.advisory.revision,
              csaf: formValues.doc,
              summary,
              legacyVersion,
            })
              .then(() =>
                onLoadAdvisory({
                  advisoryId: advisoryState.advisory.advisoryId,
                }).then((advisory) => {
                  setAdvisoryState({
                    type: 'ADVISORY',
                    advisory,
                  })
                }),
              )
              .catch(handleError)
              .finally(() => {
                setSaving(false)
              })
          }}
          prefilledData={getSummaryAndLegacyVersion()}
          onClose={() => setVersionSummaryDialog(null)}
        />,
      )
    }
  }

  const onNewHandler = () => {
    if (!appConfig.loginAvailable || (appConfig.loginAvailable && !userInfo)) {
      onGetDocMin().then((minimalTemplate) =>
        onGetDocMax().then((allFieldsTemplate) => {
          const templates = new Map([
            [
              'MINIMAL',
              {
                templateContent: minimalTemplate,
                templateDescription: 'Minimal',
              },
            ],
            [
              'ALL_FIELDS',
              {
                templateContent: allFieldsTemplate,
                templateDescription: 'All Fields',
              },
            ],
          ])
          setNewDocumentDialog(
            <NewDocumentDialog
              ref={newDocumentDialogRef}
              data={{
                templates: Array.from(templates.entries()).map((e) => ({
                  ...e[1],
                  templateId: e[0],
                })),
              }}
              onSubmit={(params) => {
                confirmDocumentReplacement(() => {
                  switch (params.source) {
                    case 'TEMPLATE':
                      setAdvisoryState({
                        type: 'NEW_ADVISORY',
                        csaf:
                          templates.get(params.templateId)?.templateContent ??
                          {},
                      })
                      break
                    case 'FILESYSTEM':
                      onOpen(params.file)
                      break
                    case 'URL':
                      externalJsonToFile(params.url)
                        .then(onOpen)
                        .catch((err) =>
                          handleError({
                            message:
                              err.name == 'SyntaxError'
                                ? t('error.invalidJSON')
                                : t('error.failedToLoadFromURL'),
                          }),
                        )
                      break
                  }
                })
              }}
              onClose={() => setNewDocumentDialog(null)}
            />,
          )
        }),
      )
    } else {
      setLoading(true)
      onGetTemplates()
        .then((templates) => {
          setNewDocumentDialog(
            <NewDocumentDialog
              ref={newDocumentDialogRef}
              data={{ templates }}
              onSubmit={(params) => {
                confirmDocumentReplacement(() => {
                  switch (params.source) {
                    case 'TEMPLATE':
                      setLoading(true)
                      onGetTemplateContent({
                        templateId: params.templateId,
                      })
                        .then((templateContent) => {
                          setAdvisoryState({
                            type: 'NEW_ADVISORY',
                            csaf: templateContent,
                          })
                        })
                        .catch(handleError)
                        .finally(() => {
                          setLoading(false)
                        })
                      break
                    case 'FILESYSTEM':
                      onOpen(params.file)
                      break
                    case 'URL':
                      externalJsonToFile(params.url)
                        .then(onOpen)
                        .catch((err) =>
                          handleError({
                            message:
                              err.name == 'SyntaxError'
                                ? t('error.invalidJSON')
                                : t('error.failedToLoadFromURL'),
                          }),
                        )
                      break
                  }
                })
              }}
              onClose={() => setNewDocumentDialog(null)}
            />,
          )
        })
        .catch(handleError)
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const onExportHandler = () => {
    openExportDialogPreselected('CSAFJSON')
  }

  const openExportDialogPreselected = (
    /** @type {'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'} */ preselected,
  ) => {
    setNewExportDocumentDialog(
      <ExportDocumentDialog
        defaultSource={preselected}
        originalValues={originalValues}
        advisoryState={advisoryState}
        formValues={formValues}
        documentIsValid={!errors.length}
        onPrepareDocumentForTemplate={onPrepareDocumentForTemplate}
        onDownload={onDownload}
        onExportCSAF={onExportCSAF}
        onExportHTML={onExportHTML}
        onClose={() => {
          setNewExportDocumentDialog(null)
        }}
      />,
    )
  }

  /**
   * Callback to update the document. Dispatches an update-action to the
   * reducer.
   *
   * @see {Reducer}
   */
  const onUpdateDoc = React.useCallback(
    (/** @type {string[]} */ instancePath, /** @type {any?} */ update) => {
      dispatch({
        type: 'CHANGE_FORM_DOC',
        timestamp: new Date(),
        generatorEngineData: generatorEngineData,
        update: update,
        instancePath: '/' + instancePath.join('/'),
      })
    },
    [generatorEngineData],
  )

  /**
   * Is used to replace the complete document in the json editor.
   *
   * @see {JsonEditorTab}
   */
  const onReplaceDoc = React.useCallback(
    (/** @type {unknown} */ newSerializedDoc) => {
      dispatch({ type: 'RESET_FORM_DOC', doc: newSerializedDoc })
    },
    [],
  )

  const onStripCallback = React.useCallback(() => {
    onStrip(formValues.doc)
  }, [formValues.doc, onStrip])

  const onPreviewCallback = React.useCallback(() => {
    onPreview(formValues.doc)
  }, [formValues.doc, onPreview])

  /**
   * @param {() => void} callback
   */
  const confirmDocumentReplacement = (callback) => {
    if (formValues !== originalValues) {
      setAlert(
        <Alert
          description={t('alert.createNewDocumentSure')}
          confirmLabel={t('alert.yesCreate')}
          cancelLabel={t('alert.noResume')}
          onCancel={() => {
            setAlert(null)
          }}
          onConfirm={() => {
            setAlert(null)
            resetProductIdCounter()
            resetGroupIdCounter()
            callback()
          }}
        />,
      )
    } else {
      callback()
    }
  }

  /**
   * Resets the editor state if a new document is created.
   */
  React.useEffect(() => {
    dispatch({ type: 'RESET_FORM', values: originalValues })
  }, [originalValues])

  /**
   * Prevents accidental loss of changes of the editor state
   * (e.g. browser refresh).
   */
  React.useEffect(() => {
    /**
     * @param {BeforeUnloadEvent} e
     */
    const handler = (e) => {
      if (originalValues !== formValues) e.preventDefault()
    }

    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [originalValues, formValues])

  /**
   * Triggers debounced validation.
   */
  React.useEffect(() => {
    onValidate(debouncedChangedDoc)
  }, [debouncedChangedDoc, onValidate])

  const tabButtonProps = React.useCallback(
    (/** @type {typeof activeTab} */ tab) => {
      return {
        type: /** @type {'button'} */ ('button'),
        disabled: Boolean(activeTab !== tab && isTabLocked),
        'data-testid': `tab_button-${tab}`,
        className: [
          'text-sm font-bold p-4 h-auto',
          activeTab === tab
            ? 'bg-slate-900 text-white'
            : isTabLocked
              ? 'text-gray-500'
              : 'hover:bg-slate-800 hover:text-white text-gray-300',
        ].join(' '),
        onClick() {
          onReplaceDoc(pruneEmpty(formValues.doc))
          onChangeTab(tab, formValues.doc)
        },
      }
    },
    [activeTab, onReplaceDoc, onChangeTab, formValues.doc, isTabLocked],
  )

  const getSummaryAndLegacyVersion = () => {
    const tracking = formValues.doc.document.tracking
    let prefilledSummary = ''
    let prefilledLegacyVersion = ''

    if (tracking?.version && tracking.revision_history?.length) {
      const semverVersion = semver.valid(tracking.version)
      const initialPublicationVersion = new semver.SemVer('1.0.0')

      // prefill only if Integer versioning OR Semantic version is greater than 1.0.0 (after initial Publication)
      if (
        !semverVersion ||
        (semverVersion && semver.gt(semverVersion, initialPublicationVersion))
      ) {
        const revisionHistoryCopy = [...tracking.revision_history]
        const latestRevisionHistoryItem = revisionHistoryCopy.sort(
          (/** @type {{date: string}} */ a, /** @type {{date: string}} */ z) =>
            new Date(z.date).getTime() - new Date(a.date).getTime(),
        )[0]
        prefilledSummary = latestRevisionHistoryItem.summary
        prefilledLegacyVersion = latestRevisionHistoryItem.legacy_version
      }
    }

    return { summary: prefilledSummary, legacyVersion: prefilledLegacyVersion }
  }

  /**
   * handles the key down event
   *
   * @param {any} keyName
   * @param {any} event
   */
  const keyDownHandler = (keyName, event) => {
    event.preventDefault()

    if (Object.values(appConfig.keyBindings).indexOf(keyName) > -1) {
      onReplaceDoc(pruneEmpty(formValues.doc))
    }

    if (keyName === appConfig.keyBindings.keySave) {
      onSaveHandler()
    } else if (keyName === appConfig.keyBindings.keyValidate) {
      doValidate()
    } else if (keyName === appConfig.keyBindings.keyExport) {
      // onDownload(formValues.doc)
      onExportHandler()
    } else if (keyName === appConfig.keyBindings.keyNew) {
      // ctrl+N could not be overwritten
      //https://stackoverflow.com/questions/38838302/any-way-to-override-ctrln-to-open-a-new-window-in-chrome
      onNewHandler()
    } else if (keyName === appConfig.keyBindings.keyExportStripped) {
      openExportDialogPreselected('CSAFJSONSTRIPPED')
    } else if (keyName === appConfig.keyBindings.keyExportNotStripped) {
      openExportDialogPreselected('CSAFJSON')
    } else if (keyName === appConfig.keyBindings.keyExportHtml) {
      openExportDialogPreselected('HTMLDOCUMENT')
    } else if (keyName === appConfig.keyBindings.keyExportPdf) {
      openExportDialogPreselected('PDFDOCUMENT')
    } else if (keyName === appConfig.keyBindings.keyFormEditorTab) {
      onChangeTab('EDITOR', formValues.doc)
    } else if (keyName === appConfig.keyBindings.keyJsonEditorTab) {
      onChangeTab('SOURCE', formValues.doc)
    } else if (keyName === appConfig.keyBindings.keyPreviewTab) {
      onChangeTab('PREVIEW', formValues.doc)
    } else if (keyName === appConfig.keyBindings.keyCsafDocumentTab) {
      onChangeTab('CSAF-JSON', formValues.doc)
    } else if (activeTab === 'EDITOR') {
      for (const [levelIdx, configKeyName] of [
        appConfig.keyBindings.keyRelevanceLevelMandatory,
        appConfig.keyBindings.keyRelevanceLevelBestPractice,
        appConfig.keyBindings.keyRelevanceLevelWantToHave,
        appConfig.keyBindings.keyRelevanceLevelNiceToKnow,
        appConfig.keyBindings.keyRelevanceLevelOptional,
      ].entries()) {
        if (keyName === configKeyName) {
          setSelectedRelevanceLevel(relevanceLevels[levelIdx])
        }
      }
    }
    if (keyName === appConfig.keyBindings.keyNextError) {
      goToNextError()
    }
  }

  /**
   * Move on to the next error based on currently selected path
   * Opens the sidebar with the error panel if not already open
   */
  function goToNextError() {
    if (errors.length) {
      const selectedPathAsString = '/' + selectedPath.join('/')
      const currentlySelectedErrorsIndex = errors.findIndex(
        (e) => e.instancePath === '/' + selectedPath.join('/'),
      )
      const numErrorsForPath = errors.filter(
        (e) => e.instancePath === selectedPathAsString,
      ).length
      let indexOfNextError = currentlySelectedErrorsIndex + numErrorsForPath
      if (
        currentlySelectedErrorsIndex < 0 ||
        indexOfNextError >= errors.length
      ) {
        indexOfNextError = 0
      }
      const nextSelectedPath = errors[indexOfNextError].instancePath
        .split('/')
        .slice(1)
      setSelectedPath(nextSelectedPath)
      setSideBarIsOpen(true)
      setSideBarContent('ERRORS')
    }
  }

  /**
   * Get all possible key bindings concatenated with ','
   */
  function getAllKeybindings() {
    return appConfig?.keyBindings
      ? Object.values(appConfig.keyBindings).join(',')
      : ''
  }

  const documentEditor = React.useMemo(
    /**
     * @returns {React.ContextType<typeof DocumentEditorContext>}
     */
    () => ({
      doc: formValues.doc,
      updateDoc: onUpdateDoc,
      replaceDoc: onReplaceDoc,
      collectIds: {
        productIds: () => onCollectProductIds(formValues.doc),
        groupIds: () => onCollectGroupIds(formValues.doc),
      },
      errors,
    }),
    [
      formValues.doc,
      errors,
      onUpdateDoc,
      onReplaceDoc,
      onCollectProductIds,
      onCollectGroupIds,
    ],
  )

  const [sideBarIsOpen, setSideBarIsOpen] = React.useState(
    /** @type {boolean} */ false,
  )
  const [sideBarSelectedPath, setSideBarSelectedPath] = React.useState(
    /** @type {string[]} */ ([]),
  )
  const [sideBarContent, setSideBarContent] = React.useState('ERRORS')
  const sideBarData = {
    sideBarIsOpen,
    setSideBarIsOpen,
    sideBarSelectedPath,
    setSideBarSelectedPath,
    sideBarContent,
    setSideBarContent,
  }

  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([]),
  )

  /** @type {string[]} */
  const relevanceLevels = [
    'mandatory',
    'best_practice',
    'want_to_have',
    'nice_to_know',
    'optional',
    'excluded',
  ]

  const [selectedRelevanceLevel, _setSelectedRelevanceLevel] = React.useState(
    relevanceLevels[2],
  )
  const setSelectedRelevanceLevel = (/** @type {string} */ level) => {
    selectClosestRelevantPath(level)
    _setSelectedRelevanceLevel(level)
  }

  const [backendVersion, setBackendVersion] = React.useState('')

  React.useEffect(() => {
    if (appConfig.loginAvailable && userInfo) {
      onGetBackendInfo()
        .then((info) => setBackendVersion(info.version))
        .catch((err) => {
          console.log('Error fetching backend info:', err)
          setBackendVersion('unknown')
        })
    }
  }, [onGetBackendInfo, appConfig.loginAvailable, userInfo])

  return (
    <DocumentEditorContext.Provider value={documentEditor}>
      <SelectedPathContext.Provider value={{ selectedPath, setSelectedPath }}>
        <RelevanceLevelContext.Provider
          value={{
            selectedRelevanceLevel,
            relevanceLevels,
          }}
        >
          <SideBarContext.Provider value={sideBarData}>
            {alert}
            {newDocumentDialog}
            {newExportDocumentDialog}
            {versionSummaryDialog}
            {aboutDialog}
            <Hotkeys
              keyName={getAllKeybindings()}
              onKeyDown={keyDownHandler}
              filter={() => {
                return true
              }}
            >
              <div
                className="mx-auto w-full h-screen grid grid-cols-[1fr_auto] grid-rows-[53px_36px_minmax(0,1fr)]"
                tabIndex={0}
              >
                <div className="col-span-2 flex justify-between bg-slate-700">
                  <div className="flex pl-5">
                    <button {...tabButtonProps('EDITOR')}>
                      {t('menu.formEditor')}
                    </button>
                    <button {...tabButtonProps('SOURCE')}>
                      {t('menu.jsonEditor')}
                    </button>
                    <button {...tabButtonProps('PREVIEW')}>
                      {t('menu.preview')}
                    </button>
                    <button {...tabButtonProps('CSAF-JSON')}>
                      {t('menu.csafDocument')}
                    </button>
                    <button
                      className="text-sm font-bold p-4 h-auto text-gray-300 hover:text-white"
                      onClick={() => {
                        setAboutDialog(
                          <AboutDialog
                            onClose={() => {
                              setAboutDialog(null)
                            }}
                            backendVersion={backendVersion}
                          />,
                        )
                      }}
                    >
                      {t('menu.about')}
                    </button>
                  </div>
                  {advisoryState?.type === 'ADVISORY' && (
                    <div className="text-gray-400 p-4">
                      Document:{' '}
                      <span data-testid="document_tracking_id">
                        {advisoryState.advisory.csaf.document?.title ||
                          '<document without tracking-id>'}
                      </span>
                      <span data-testid="advisory_id" className="hidden">
                        {advisoryState.advisory.advisoryId}
                      </span>
                      <span data-testid="advisory_revision" className="hidden">
                        {advisoryState.advisory.revision}
                      </span>
                    </div>
                  )}
                  {appConfig.loginAvailable &&
                    (userInfo ? (
                      <div className="pr-5 flex text-white">
                        <button {...tabButtonProps('DOCUMENTS')}>
                          {t('menu.csafDocuments')}
                        </button>
                        <div
                          data-testid="user_info"
                          className="dropdown relative hover:bg-slate-800 hover:text-white text-gray-300"
                        >
                          <div className="text-sm font-bold p-4 h-auto flex items-center">
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
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div className="ml-4">
                              {userInfo.preferredUsername}
                            </div>
                          </div>
                          <div
                            className="dropdown-content absolute bottom-0 right-0 z-10 bg-white text-black p-4 rounded-b shadow"
                            style={{
                              height: 133,
                              marginBottom: -133,
                            }}
                          >
                            <span className="w-full whitespace-nowrap text-ellipsis">
                              <span className="text-sm font-bold">
                                {t('menu.eMail')}
                              </span>
                              {': '}
                              <span className="text-sm">{userInfo.email}</span>
                            </span>
                            <br />
                            <span className="w-full whitespace-nowrap text-ellipsis">
                              <span className="text-sm font-bold">
                                {t('menu.groups')}
                              </span>
                              {': '}
                              <span className="text-sm">
                                {userInfo.groups?.join(', ')}
                              </span>
                            </span>
                            <hr className="my-2" />
                            <div className="text-right">
                              <button
                                className="text-sm font-bold p-2 w-full h-auto bg-blue-400 hover:bg-blue-500 text-white"
                                onClick={() => {
                                  window.location.href = appConfig.logoutUrl
                                }}
                              >
                                {t('menu.logout')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="pr-5 flex items-center text-white">
                        <button
                          className="text-sm font-bold p-4 h-auto bg-blue-400 hover:bg-blue-500 text-white"
                          onClick={() => {
                            window.location.href = appConfig.loginUrl
                          }}
                        >
                          {t('menu.login')}
                        </button>
                      </div>
                    ))}
                </div>
                <div
                  data-testid="number_of_validation_errors"
                  className="hidden"
                >
                  {errors.length}
                </div>
                {activeTab !== 'DOCUMENTS' && (
                  <div className="col-span-2 bg-slate-600 flex items-center justify-between">
                    <div className="pl-5">
                      {(appConfig.loginAvailable &&
                        userInfo?.groups &&
                        canCreateDocuments(userInfo.groups)) ||
                      (appConfig.loginAvailable && !userInfo) ||
                      !appConfig.loginAvailable ? (
                        <button
                          data-testid="new_document_button"
                          className="text-gray-300 hover:bg-slate-700 hover:text-white text-sm font-bold p-2 h-auto"
                          onClick={onNewHandler}
                        >
                          {t('menu.new')}
                        </button>
                      ) : null}
                      {userInfo &&
                      ((advisoryState?.type === 'ADVISORY' &&
                        advisoryState.advisory.changeable) ||
                        (advisoryState?.type === 'NEW_ADVISORY' &&
                          userInfo.groups &&
                          canCreateDocuments(userInfo.groups))) ? (
                        <button
                          data-testid="save_button"
                          type="button"
                          className="text-gray-300 hover:bg-slate-700 hover:text-white text-sm font-bold p-2 h-auto"
                          onClick={onSaveHandler}
                        >
                          {t('menu.save')}
                        </button>
                      ) : null}
                      <button
                        data-testid="new_export_document_button"
                        className="text-gray-300 hover:bg-slate-700 hover:text-white text-sm font-bold p-2 h-auto"
                        onClick={onExportHandler}
                      >
                        {t('menu.export')}
                      </button>
                      {activeTab === 'SOURCE' && (
                        <button
                          ref={sortButtonRef}
                          data-testid="sort_document_button"
                          type="button"
                          className="text-gray-300 hover:bg-slate-700 hover:text-white text-sm font-bold p-2 h-auto"
                        >
                          {t('menu.sortDocument')}
                        </button>
                      )}
                      {appConfig.loginAvailable && userInfo && (
                        <button
                          data-testid="validate_button"
                          type="button"
                          className="text-gray-300 hover:bg-slate-700 hover:text-white text-sm font-bold p-2 h-auto"
                          onClick={async () => {
                            doValidate()
                          }}
                        >
                          {t('menu.validate')}
                        </button>
                      )}
                    </div>
                    {activeTab === 'EDITOR' ? (
                      <div className="text-gray-300 font-bold text-sm h-9">
                        <span className="mr-1 h-full">
                          {t('menu.activeRelevanceLevels')}
                        </span>
                        {relevanceLevels
                          .slice(0, 5) // do not show button for `excluded`
                          .map((relevanceLevel, idx) => {
                            return (
                              <button
                                key={`button-${relevanceLevel}`}
                                data-testid={`layer-button-${relevanceLevel}`}
                                type="button"
                                title={relevanceLevel.replaceAll('_', ' ')}
                                className={
                                  'px-3 mx-1 h-full hover:bg-slate-700 hover:text-white' +
                                  (idx <=
                                  relevanceLevels.indexOf(
                                    selectedRelevanceLevel,
                                  )
                                    ? ' bg-slate-800 hover:bg-slate-800'
                                    : '')
                                }
                                onClick={() =>
                                  setSelectedRelevanceLevel(relevanceLevel)
                                }
                              >
                                {idx + 1}
                              </button>
                            )
                          })}
                      </div>
                    ) : null}
                    {activeTab === 'EDITOR' || activeTab === 'SOURCE' ? (
                      <button
                        data-testid="show_all_errors_button"
                        type="button"
                        className="text-gray-300 hover:bg-slate-700 hover:text-white text-sm font-bold p-2 mr-5 h-auto"
                        onClick={async () => {
                          sideBarData.setSideBarIsOpen(true)
                          sideBarData.setSideBarSelectedPath([])
                          sideBarData.setSideBarContent('ERRORS')
                        }}
                      >
                        {`${t('menu.documentIs')} ${
                          errors.filter((e) => e.type === 'error').length === 0
                            ? t('menu.valid') + ':'
                            : t('menu.invalid') + ':'
                        }`}
                        {[
                          {
                            type: 'error',
                            color: 'text-red-600',
                          },
                          {
                            type: 'warning',
                            color: 'text-yellow-600',
                          },
                          {
                            type: 'info',
                            color: 'text-blue-600',
                          },
                        ].map(({ type, color }) => {
                          const count = errors.filter(
                            (e) => e.type === type,
                          ).length

                          return (
                            <span key={'errors-' + type} className="px-1">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className={color}
                                size="xs"
                              />
                              {` ${count} ${type}${count > 1 ? 's' : ''} `}
                            </span>
                          )
                        })}
                      </button>
                    ) : null}
                  </div>
                )}
                <div
                  className="row-span-2 overflow-auto relative h-full bg-white"
                  key={activeTab}
                >
                  {activeTab === 'EDITOR' ? (
                    <FormEditor />
                  ) : activeTab === 'SOURCE' ? (
                    <JsonEditorTab
                      originalValues={originalValues}
                      formValues={formValues}
                      validationErrors={errors}
                      sortButtonRef={sortButtonRef}
                      onChange={onReplaceDoc}
                      onLockTab={onLockTab}
                      onUnlockTab={onUnlockTab}
                    />
                  ) : activeTab === 'PREVIEW' ? (
                    <PreviewTab
                      previewResult={previewResult}
                      onPreview={onPreviewCallback}
                    />
                  ) : activeTab === 'CSAF-JSON' ? (
                    <CsafTab
                      stripResult={stripResult}
                      onStrip={onStripCallback}
                    />
                  ) : activeTab === 'DOCUMENTS' ? (
                    <DocumentsTab
                      onOpenAdvisory={({ advisoryId }, callback) => {
                        setLoading(true)
                        return onLoadAdvisory({ advisoryId })
                          .then((advisory) => {
                            setAdvisoryState({ type: 'ADVISORY', advisory })
                            callback()
                          })
                          .catch(handleError)
                          .finally(() => {
                            setLoading(false)
                          })
                      }}
                    />
                  ) : null}
                </div>
                {activeTab === 'EDITOR' || activeTab === 'SOURCE' ? (
                  <SideBar />
                ) : null}
              </div>
            </Hotkeys>
            {toast ? (
              <div className="fixed right-0 top-0 p-2 w-full max-w-md">
                <div
                  role="status"
                  className={
                    (toast.color === 'green' ? 'bg-green-500' : 'bg-red-500') +
                    ' p-4  text-white rounded shadow flex items-center gap-2'
                  }
                >
                  <div className="grow" data-testid="error_toast_message">
                    {toast.message}
                  </div>
                  <button
                    className="w-6"
                    type="button"
                    onClick={() => {
                      setToast(null)
                    }}
                  >
                    <svg
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
                </div>
              </div>
            ) : null}
            {isLoading ? (
              <LoadingIndicator label={t('menu.loadingData')} />
            ) : isSaving ? (
              <LoadingIndicator label={t('menu.savingData')} />
            ) : null}
          </SideBarContext.Provider>
        </RelevanceLevelContext.Provider>
      </SelectedPathContext.Provider>
    </DocumentEditorContext.Provider>
  )

  /**
   * This searches the tree up from the current selected path for a relevant
   * path based on the given level and selects it.
   *
   * @param {string} level
   */
  function selectClosestRelevantPath(level) {
    const documentCategory = formValues.doc.document.category
    const path = selectedPath

    let property =
      /** @type {import('./shared/types.js').Property | undefined} */ (schema)

    /** @type {string[]} */
    let pathToSet = []
    for (let i = 0; i < path.length; ++i) {
      const pathSegment = path[i]
      property =
        property?.type === 'ARRAY'
          ? property?.metaInfo.arrayType
          : property?.metaInfo.propertyList?.find((p) => p.key === pathSegment)
      if (
        property &&
        isPropertyRelevant({
          relevanceLevels,
          category: documentCategory,
          property,
          selectedRelevanceLevel: level,
        })
      ) {
        pathToSet = path.slice(0, i + 1)
      } else {
        break
      }
    }
    setSelectedPath(pathToSet)
  }
}

export default View
