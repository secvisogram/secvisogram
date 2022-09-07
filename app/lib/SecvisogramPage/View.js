import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import CsafTab from './View/CsafTab.js'
import FormEditorTab from './View/FormEditorTab.js'
import JsonEditorTab from './View/JsonEditorTab.js'
import LoadingIndicator from './View/LoadingIndicator.js'
import PreviewTab from './View/PreviewTab.js'
import Reducer from './View/Reducer.js'
import Alert from './View/shared/Alert.js'
import useDebounce from './View/shared/useDebounce.js'

const secvisogramVersion = SECVISOGRAM_VERSION // eslint-disable-line

/**
 * Holds the editor-state and defines the main layout of the application.
 *
 * @param {{
 *  isLoading: boolean
 *  isSaving: boolean
 *  isTabLocked: boolean
 *  errors: import('../shared/validationTypes').ValidationError[]
 *  data: {
 *    doc: unknown
 *  } | null
 *  generatorEngineData: {
 *    name: string
 *    version: string
 *  }
 *  activeTab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON'
 *  alert?: {
 *    confirmLabel: string
 *    cancelLabel: string
 *    label: string
 *    description: string
 *    onConfirm(): void
 *    onCancel(): void
 *  } | null
 *  stripResult: React.ComponentProps<typeof CsafTab>['stripResult']
 *  previewResult: React.ComponentProps<typeof PreviewTab>['previewResult']
 *  strict: boolean
 *  onSetStrict(strict: boolean): void
 *  onDownload(doc: {}): void
 *  onOpen(file: File): Promise<void | {}>
 *  onChangeTab(tab: 'EDITOR' | 'SOURCE' | 'CSAF-JSON', document: {}): void
 *  onValidate(document: {}): void
 *  onNewDoc(): Promise<void | {}>
 *  onStrip(document: {}): void
 *  onPreview(document: {}): void
 *  onExportCSAF(doc: {}): void
 *  onExportHTML(html: string, doc: {}): void
 *  onLockTab(): void
 *  onUnlockTab(): void
 *  onCollectProductIds(document: {}): Promise<void | {id: string, name: string}[]>
 *  onCollectGroupIds(document: {}): Promise<void | {id: string, name: string}[]>
 * }} props
 */
function View({
  activeTab,
  isLoading,
  isSaving,
  isTabLocked,
  errors,
  data,
  alert,
  stripResult,
  previewResult,
  strict,
  generatorEngineData,
  onSetStrict,
  onDownload,
  onOpen,
  onChangeTab,
  onValidate,
  onNewDoc: onNewDoc,
  onStrip,
  onPreview,
  onExportCSAF,
  onExportHTML,
  onLockTab,
  onUnlockTab,
  onCollectProductIds,
  onCollectGroupIds,
}) {
  /**
   * Initial values for the editors. Can be used to detect changes of the
   * document.
   */
  const originalValues = React.useMemo(
    () => ({ doc: data?.doc ?? null }),
    [data]
  )

  /**
   * Editor state.
   */
  const [state, dispatch] = React.useReducer(Reducer, {
    formValues: originalValues,
  })
  const formValues = /** @type {import('./shared/FormValues').default} */ (
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
        className:
          'ml-3 px-2 pb-2 pt-1 ' +
          (activeTab === tab
            ? 'bg-white text-blue-400'
            : isTabLocked
            ? 'bg-blue-100 text-white'
            : 'bg-blue-400 text-white hover:bg-white hover:text-blue-400'),
        onClick() {
          onChangeTab(tab, formValues.doc)
        },
      }
    },
    [activeTab, onChangeTab, formValues.doc, isTabLocked]
  )

  return (
    <>
      {alert ? <Alert {...alert} /> : null}
      <div className="mx-auto w-full h-screen flex flex-col">
        <div className="bg-gray-500 flex justify-between items-baseline pt-2">
          <div>
            <button {...tabButtonProps('EDITOR')}>Form Editor</button>
            <button {...tabButtonProps('SOURCE')}>JSON Editor</button>
            {/* Inaccessible for WebSphere fork, unless we implement HTML rendering
            <button {...tabButtonProps('PREVIEW')}>Preview</button> */}
            <button {...tabButtonProps('CSAF-JSON')}>CSAF Document</button>
          </div>
          <div className="mr-4">
            <div className="text-xs float-left text-gray-400 mr-4 mt-2">
              <a
                href="https://github.com/secvisogram/secvisogram/"
                className="mr-3"
              >
                <FontAwesomeIcon className="mx-1" icon={faCodeBranch} />
                <span>{secvisogramVersion}</span>
              </a>
              <a href="https://github.com/secvisogram/secvisogram/blob/main/LICENSE.md">
                License: MIT
              </a>
            </div>
            <h1 className="text-2xl text-blue-200 font-mono float-right">
              Secvisogram
            </h1>
          </div>
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
                onOpen={onOpen}
                onDownload={onDownload}
                onNewDoc={onNewDoc}
                onCollectProductIds={onCollectProductIdsCallback}
                onCollectGroupIds={onCollectGroupIdsCallback}
              />
            ) : activeTab === 'SOURCE' ? (
              <JsonEditorTab
                formValues={formValues}
                validationErrors={errors}
                strict={strict}
                onSetStrict={onSetStrict}
                onChange={onReplaceDoc}
                onOpen={onOpen}
                onDownload={onDownload}
                onNewDoc={onNewDoc}
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
