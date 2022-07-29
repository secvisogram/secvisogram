import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import AppConfigContext from '../shared/context/AppConfigContext.js'
import UserInfoContext from '../shared/context/UserInfoContext.js'
import { canCreateDocuments } from '../shared/permissions.js'
import CsafTab from './View/CsafTab.js'
import FormEditorTab from './View/FormEditorTab.js'
import {
  uniqueGroupId,
  uniqueProductId,
} from './View/FormEditorTab/shared/unique-id.js'
import JsonEditorTab from './View/JsonEditorTab.js'
import LoadingIndicator from './View/LoadingIndicator.js'
import NewDocumentDialog from './View/NewDocumentDialog.js'
import PreviewTab from './View/PreviewTab.js'
import Reducer from './View/Reducer.js'
import Alert from './View/shared/Alert.js'
import useDebounce from './View/shared/useDebounce.js'
import VersionSummaryDialog from './View/VersionSummaryDialog.js'

const secvisogramVersion = SECVISOGRAM_VERSION // eslint-disable-line

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
  strict,
  generatorEngineData,
  DocumentsTab,
  onLoadAdvisory,
  onUpdateAdvisory,
  onSetStrict,
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
  ...props
}) {
  const appConfig = React.useContext(AppConfigContext)
  const userInfo = React.useContext(UserInfoContext)

  const [newDocumentDialog, setNewDocumentDialog] = React.useState(
    /** @type {JSX.Element | null} */ (null)
  )
  const newDocumentDialogRef = React.useRef(
    /** @type {HTMLDialogElement | null} */ (null)
  )
  React.useEffect(() => {
    if (newDocumentDialog) {
      const modal = /** @type {any} */ (newDocumentDialogRef.current)
      modal?.showModal()
    }
  }, [newDocumentDialog])

  const [versionSummaryDialog, setVersionSummaryDialog] = React.useState(
    /** @type {JSX.Element | null} */ (null)
  )
  const versionSummaryDialogRef = React.useRef(
    /** @type {HTMLDialogElement | null} */ (null)
  )
  React.useEffect(() => {
    if (versionSummaryDialog) {
      const modal = /** @type {any} */ (versionSummaryDialogRef.current)
      modal?.showModal()
    }
  }, [versionSummaryDialog])

  const [advisoryState, setAdvisoryState] = React.useState(
    /** @type {import('./View/types.js').AdvisoryState | null} */ (
      defaultAdvisoryState ?? {
        type: 'NEW_ADVISORY',
        csaf: /** @type {{}} */ (data?.doc),
      }
    )
  )
  React.useEffect(() => {
    setAdvisoryState((state) =>
      data
        ? { type: 'NEW_ADVISORY', csaf: /** @type {{}} */ (data.doc) }
        : state
    )
  }, [data])
  React.useEffect(() => {
    uniqueGroupId(true)
    uniqueProductId(true)
  }, [advisoryState])

  const [isLoading, setLoading] = React.useState(props.isLoading)
  React.useEffect(() => {
    setLoading(props.isLoading)
  }, [props.isLoading])

  const [isSaving, setSaving] = React.useState(false)

  const [errors, setErrors] = React.useState(
    /** @type {Array<import('./shared/types').TypedValidationError>} */ (
      props.errors.map((e) => ({ ...e, type: 'error' }))
    )
  )
  React.useEffect(() => {
    setErrors(props.errors.map((e) => ({ ...e, type: 'error' })))
  }, [props.errors])

  const [alert, setAlert] = React.useState(
    /** @type {JSX.Element | null} */ (
      props.alert ? <Alert {...props.alert} /> : null
    )
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
    [advisoryState]
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

  /**
   * Callback to update the document. Dispatches an update-action to the
   * reducer.
   *
   * @see {Reducer}
   */
  const onUpdate =
    /** @type {((update: {}) => void) & ((instancePath: string, update: {}) => void)} */ (
      React.useCallback(
        (/** @type {any} */ newValue, /** @type {any?} */ update) => {
          if (typeof newValue === 'string') {
            dispatch({
              type: 'CHANGE_FORM_DOC',
              instancePath: newValue,
              timestamp: new Date(),
              update: update,
              generatorEngineData,
            })
          } else {
            dispatch({
              type: 'CHANGE_FORM_DOC',
              timestamp: new Date(),
              update: newValue,
              generatorEngineData,
            })
          }
        },
        [generatorEngineData]
      )
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
    []
  )

  const onStripCallback = React.useCallback(() => {
    onStrip(formValues.doc)
  }, [formValues.doc, onStrip])

  const onPreviewCallback = React.useCallback(() => {
    onPreview(formValues.doc)
  }, [formValues.doc, onPreview])

  const onExportCSAFCallback = React.useCallback(() => {
    onExportCSAF(formValues.doc)
  }, [formValues.doc, onExportCSAF])

  const onCollectProductIdsCallback = React.useCallback(() => {
    return onCollectProductIds(formValues.doc)
  }, [formValues.doc, onCollectProductIds])

  const onCollectGroupIdsCallback = React.useCallback(() => {
    return onCollectGroupIds(formValues.doc)
  }, [formValues.doc, onCollectGroupIds])

  /**
   * @param {() => void} callback
   */
  const confirmDocumentReplacement = (callback) => {
    if (formValues !== originalValues) {
      setAlert(
        <Alert
          description="This will create a new CSAF document. All current content will be lost. Are you sure?"
          confirmLabel="Yes, create new document"
          cancelLabel="No, resume editing"
          onCancel={() => {
            setAlert(null)
          }}
          onConfirm={() => {
            setAlert(null)
            callback()
          }}
        />
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
        className:
          'text-sm font-bold p-4 h-auto ' +
          (activeTab === tab
            ? 'bg-gray-900 text-white'
            : 'hover:bg-gray-800 hover:text-white text-gray-300'),
        onClick() {
          onChangeTab(tab, formValues.doc)
        },
      }
    },
    [activeTab, onChangeTab, formValues.doc, isTabLocked]
  )

  return (
    <>
      {alert}
      {newDocumentDialog}
      {versionSummaryDialog}
      <div className="mx-auto w-full h-screen flex flex-col">
        <div>
          <div className="flex justify-between bg-gray-700">
            <div className="flex pl-5">
              <button className="text-sm font-bold p-4 h-auto hover:bg-gray-800 hover:text-white text-gray-300">
                Wizard
              </button>
              <button {...tabButtonProps('EDITOR')}>Form Editor</button>
              <button {...tabButtonProps('SOURCE')}>JSON Editor</button>
              <button {...tabButtonProps('PREVIEW')}>Preview</button>
              <button {...tabButtonProps('CSAF-JSON')}>CSAF Document</button>
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
                    CSAF Documents
                  </button>
                  <div
                    data-testid="user_info"
                    className="dropdown relative hover:bg-gray-800 hover:text-white text-gray-300"
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
                      <div className="ml-4">{userInfo.preferredUsername}</div>
                    </div>
                    <div
                      className="dropdown-content absolute bottom-0 right-0 z-10 bg-white text-black p-4 rounded-b shadow"
                      style={{
                        height: 133,
                        marginBottom: -133,
                      }}
                    >
                      <span className="w-full whitespace-nowrap overflow-ellipsis">
                        <span className="text-sm font-bold">E-Mail:</span>{' '}
                        <span className="text-sm">{userInfo.email}</span>
                      </span>
                      <br />
                      <span className="w-full whitespace-nowrap overflow-ellipsis">
                        <span className="text-sm font-bold">Groups:</span>{' '}
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
                          Logout
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
                    Login
                  </button>
                </div>
              ))}
          </div>
          <div data-testid="number_of_validation_errors" className="hidden">
            {errors.length}
          </div>
          {activeTab !== 'DOCUMENTS' && (
            <div className="bg-gray-400 flex items-center justify-between">
              <div className="pl-5">
                {(appConfig.loginAvailable &&
                  userInfo?.groups &&
                  canCreateDocuments(userInfo.groups)) ||
                (appConfig.loginAvailable && !userInfo) ||
                !appConfig.loginAvailable ? (
                  <button
                    data-testid="new_document_button"
                    className="text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                    onClick={() => {
                      if (
                        !appConfig.loginAvailable ||
                        (appConfig.loginAvailable && !userInfo)
                      ) {
                        onGetDocMin((minimalTemplate) => {
                          onGetDocMax((allFieldsTemplate) => {
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
                                  templates: Array.from(
                                    templates.entries()
                                  ).map((e) => ({ ...e[1], templateId: e[0] })),
                                }}
                                onSubmit={(params) => {
                                  confirmDocumentReplacement(() => {
                                    if (params.source === 'TEMPLATE') {
                                      setAdvisoryState({
                                        type: 'NEW_ADVISORY',
                                        csaf:
                                          templates.get(params.templateId)
                                            ?.templateContent ?? {},
                                      })
                                    } else {
                                      onOpen(params.file)
                                    }
                                  })
                                }}
                              />
                            )
                          })
                        })
                      } else {
                        setLoading(true)
                        onGetTemplates((templates) => {
                          setLoading(false)
                          setNewDocumentDialog(
                            <NewDocumentDialog
                              ref={newDocumentDialogRef}
                              data={{ templates }}
                              onSubmit={(params) => {
                                confirmDocumentReplacement(() => {
                                  if (params.source === 'TEMPLATE') {
                                    setLoading(true)
                                    onGetTemplateContent(
                                      { templateId: params.templateId },
                                      (templateContent) => {
                                        setAdvisoryState({
                                          type: 'NEW_ADVISORY',
                                          csaf: templateContent,
                                        })
                                        setLoading(false)
                                      }
                                    )
                                  } else {
                                    onOpen(params.file)
                                  }
                                })
                              }}
                            />
                          )
                        })
                      }
                    }}
                  >
                    New
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
                    className="text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                    onClick={() => {
                      if (advisoryState.type === 'NEW_ADVISORY') {
                        setVersionSummaryDialog(
                          <VersionSummaryDialog
                            ref={versionSummaryDialogRef}
                            onSubmit={({ summary, legacyVersion }) => {
                              setSaving(true)
                              onCreateAdvisory(
                                {
                                  csaf: formValues.doc,
                                  summary,
                                  legacyVersion,
                                },
                                ({ id }) => {
                                  onLoadAdvisory(
                                    { advisoryId: id },
                                    (advisory) => {
                                      setAdvisoryState({
                                        type: 'ADVISORY',
                                        advisory,
                                      })
                                      setSaving(false)
                                    }
                                  )
                                }
                              )
                            }}
                          />
                        )
                      } else if (advisoryState.type === 'ADVISORY') {
                        setVersionSummaryDialog(
                          <VersionSummaryDialog
                            ref={versionSummaryDialogRef}
                            onSubmit={({ summary, legacyVersion }) => {
                              setSaving(true)
                              onUpdateAdvisory(
                                {
                                  advisoryId: advisoryState.advisory.advisoryId,
                                  revision: advisoryState.advisory.revision,
                                  csaf: formValues.doc,
                                  summary,
                                  legacyVersion,
                                },
                                () => {
                                  onLoadAdvisory(
                                    {
                                      advisoryId:
                                        advisoryState.advisory.advisoryId,
                                    },
                                    (advisory) => {
                                      setAdvisoryState({
                                        type: 'ADVISORY',
                                        advisory,
                                      })
                                      setSaving(false)
                                    }
                                  )
                                }
                              )
                            }}
                          />
                        )
                      }
                    }}
                  >
                    Save
                  </button>
                ) : null}
                <button
                  data-testid="download_button"
                  className="text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                  onClick={() => {
                    onDownload(formValues.doc)
                  }}
                >
                  Download
                </button>
                {appConfig.loginAvailable &&
                  userInfo &&
                  advisoryState?.type === 'ADVISORY' && (
                    <>
                      <div className="inline-block relative">
                        <label
                          htmlFor="export_button"
                          data-testid="export_button"
                          className="cursor-pointer block text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                        >
                          Export
                        </label>
                        <input
                          id="export_button"
                          type="checkbox"
                          className="dropdown hidden"
                        />
                        <div
                          className="dropdown-content absolute z-10 left-0 bottom-0 shadow p-2 pr-4 bg-white"
                          style={{ height: 125, marginBottom: -125 }}
                        >
                          <div className="flex flex-col gap-1">
                            <a
                              data-testid="export_button-markdown"
                              className="block"
                              href={`/api/v1/advisories/${advisoryState.advisory.advisoryId}/csaf?format=Markdown`}
                              download={
                                advisoryState.advisory.advisoryId + '.markdown'
                              }
                            >
                              Markdown
                            </a>
                            <a
                              data-testid="export_button-json"
                              className="block"
                              href={`/api/v1/advisories/${advisoryState.advisory.advisoryId}/csaf?format=JSON`}
                              download={
                                advisoryState.advisory.advisoryId + '.json'
                              }
                            >
                              JSON
                            </a>
                            <a
                              data-testid="export_button-html"
                              className="block"
                              href={`/api/v1/advisories/${advisoryState.advisory.advisoryId}/csaf?format=HTML`}
                              download={
                                advisoryState.advisory.advisoryId + '.html'
                              }
                            >
                              HTML
                            </a>
                            <a
                              data-testid="export_button-pdf"
                              className="block"
                              href={`/api/v1/advisories/${advisoryState.advisory.advisoryId}/csaf?format=PDF`}
                              download={
                                advisoryState.advisory.advisoryId + '.pdf'
                              }
                            >
                              PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                {appConfig.loginAvailable && userInfo && (
                  <button
                    data-testid="validate_button"
                    type="button"
                    className="text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                    onClick={async () => {
                      setLoading(true)
                      onServiceValidate(
                        {
                          validatorUrl: appConfig.validatorUrl,
                          csaf: formValues.doc,
                        },
                        (json) => {
                          const errors =
                            /** @type {Array<import('./shared/types').TypedValidationError>} */ (
                              json.tests.flatMap((t) =>
                                t.errors
                                  .map((e) => ({ ...e, type: 'error' }))
                                  .concat(
                                    t.warnings.map((w) => ({
                                      ...w,
                                      type: 'warning',
                                    }))
                                  )
                                  .concat(
                                    t.infos.map((i) => ({ ...i, type: 'info' }))
                                  )
                              )
                            )
                          setErrors(errors)
                          setLoading(false)
                        }
                      )
                    }}
                  >
                    Validate
                  </button>
                )}
              </div>
              <div className="pr-5 text-gray-300">
                <a
                  className="text-xs"
                  href="https://github.com/secvisogram/secvisogram"
                >
                  <FontAwesomeIcon className="mx-1" icon={faCodeBranch} />
                  <span>{secvisogramVersion}</span>
                </a>
                ,{' '}
                <a
                  className="text-xs"
                  href="https://github.com/secvisogram/secvisogram/blob/main/LICENSE.md"
                >
                  License: MIT
                </a>
              </div>
            </div>
          )}
        </div>
        <div
          className="relative overflow-auto h-full bg-gray-500"
          key={activeTab}
        >
          <>
            {activeTab === 'EDITOR' ? (
              <FormEditorTab
                formValues={formValues}
                validationErrors={errors}
                onUpdate={onUpdate}
                onDownload={onDownload}
                onCollectProductIds={onCollectProductIdsCallback}
                onCollectGroupIds={onCollectGroupIdsCallback}
              />
            ) : activeTab === 'SOURCE' ? (
              <JsonEditorTab
                originalValues={originalValues}
                formValues={formValues}
                validationErrors={errors}
                strict={strict}
                onSetStrict={onSetStrict}
                onChange={onReplaceDoc}
                onDownload={onDownload}
                onLockTab={onLockTab}
                onUnlockTab={onUnlockTab}
              />
            ) : activeTab === 'PREVIEW' ? (
              <PreviewTab
                previewResult={previewResult}
                onPreview={onPreviewCallback}
                formValues={formValues}
                validationErrors={errors}
                onExport={onExportHTML}
              />
            ) : activeTab === 'CSAF-JSON' ? (
              <CsafTab
                stripResult={stripResult}
                onStrip={onStripCallback}
                onExport={onExportCSAFCallback}
              />
            ) : activeTab === 'DOCUMENTS' ? (
              <DocumentsTab
                onOpenAdvisory={({ advisoryId }, callback) => {
                  setLoading(true)
                  onLoadAdvisory({ advisoryId }, (advisory) => {
                    setAdvisoryState({ type: 'ADVISORY', advisory })
                    callback()
                    setLoading(false)
                  })
                }}
              />
            ) : null}
          </>
        </div>
      </div>
      {isLoading ? (
        <LoadingIndicator label="Loading data ..." />
      ) : isSaving ? (
        <LoadingIndicator label="Saving data ..." />
      ) : null}
    </>
  )
}

export default View
