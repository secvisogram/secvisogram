import { uiSchemas } from '#lib/uiSchemas.js'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as jsonMap from 'json-source-map'
import React, { useCallback, useEffect } from 'react'
import MonacoEditor from 'react-monaco-editor'
import sortObjectKeys from '../../shared/sortObjectKeys.js'
import SelectedPathContext from './shared/context/SelectedPathContext.js'
import SideBarContext from './shared/context/SideBarContext.js'
import useDebounce from './shared/useDebounce.js'

/**
 * @param {object} props
 * @param {import('../shared/types').FormValues} props.originalValues
 * @param {import('../shared/types').FormValues} props.formValues
 * @param {import('../shared/types').TypedValidationError[]} props.validationErrors
 * @param {React.MutableRefObject<HTMLButtonElement | null>} props.sortButtonRef
 * @param {import('#lib/uiSchemas.js').UiSchemaVersion} props.uiSchemaVersion
 * @param {(doc: {} | null) => void} props.onChange
 * @param {() => void} props.onLockTab
 * @param {() => void} props.onUnlockTab
 */
export default function JsonEditorTab({
  originalValues,
  formValues,
  validationErrors: errors,
  sortButtonRef,
  uiSchemaVersion,
  onChange,
  onLockTab,
  onUnlockTab,
}) {
  const { doc } = formValues
  const sideBarData = React.useContext(SideBarContext)
  const editorSchema = uiSchemas[uiSchemaVersion].jsonSchema

  const [editor, setEditor] = React.useState(
    /** @type {import ("react-monaco-editor").monaco.editor.IStandaloneCodeEditor | null} */ (
      null
    )
  )
  const [monaco, setMonaco] = React.useState(
    /** @type {import ("react-monaco-editor").monaco | null} */ (null)
  )

  const stringifiedDoc = React.useMemo(
    () => JSON.stringify(doc, null, 2),
    [doc]
  )

  const initialMountRef = React.useRef(true)

  React.useEffect(() => {
    const saveButton = sortButtonRef.current
    if (!saveButton) return

    saveButton.addEventListener('click', clickHandler)

    function clickHandler() {
      editor
        ?.getModel()
        ?.setValue(
          JSON.stringify(
            sortObjectKeys(
              new Intl.Collator(),
              JSON.parse(editor.getModel()?.getValue() ?? '{}')
            ),
            null,
            2
          )
        )
    }

    return () => {
      saveButton.removeEventListener('click', clickHandler)
    }
  }, [sortButtonRef, editor])

  /**
   * Updates the editor value if the document was changed outside (e.g. created from template)
   */
  React.useEffect(() => {
    if (!initialMountRef.current && editor) {
      editor.getModel()?.setValue(JSON.stringify(originalValues.doc, null, 2))
    }
  }, [originalValues.doc, editor])

  const [{ value, parseError }, setState] = React.useState(() => ({
    value: JSON.stringify(doc, null, 2),
    parseError: null,
  }))
  React.useEffect(() => {
    if (initialMountRef.current && editor) {
      initialMountRef.current = false
      editor.getModel()?.setValue(value)
    }
  }, [value, editor])

  const [showErrors, setShowErrors] = React.useState(false)
  const debouncedValue = useDebounce(value)

  /**
   * Locks the tab navigation if there are any parse errors.
   */
  React.useEffect(() => {
    if (parseError) onLockTab()
    else onUnlockTab()
  }, [parseError, onLockTab, onUnlockTab])

  /**
   * Parses the editor input and replaces the document.
   */
  React.useEffect(() => {
    /** @type {{} | null} */
    let result = null
    try {
      result = JSON.parse(debouncedValue)
      setState((state) => ({ ...state, parseError: null }))
    } catch (/** @type {any} */ e) {
      setState((state) => ({ ...state, parseError: e }))
      return
    }
    onChange(result)
  }, [debouncedValue, onChange])

  React.useEffect(() => {
    if (errors.length === 0) {
      setShowErrors(false)
    }
  }, [errors])

  React.useEffect(() => {
    if (monaco && editor && debouncedValue) {
      /** @type {jsonMap.ParseResult} */
      let result
      try {
        result = jsonMap.parse(debouncedValue)
      } catch (e) {
        return
      }

      const errorList = errors
        .map((error) => ({
          error,
          positionData: result.pointers[error.instancePath],
        }))
        .filter((e) => e.positionData)
        .map(({ error, positionData }) => ({
          startLineNumber: positionData.value.line + 1,
          startColumn: positionData.value.column + 1,
          endLineNumber: positionData.valueEnd.line + 1,
          endColumn: positionData.valueEnd.column + 1,
          message: error.message,
          severity:
            error.type === 'error'
              ? monaco.MarkerSeverity.Error
              : error.type === 'warning'
              ? monaco.MarkerSeverity.Warning
              : monaco.MarkerSeverity.Info,
        }))

      const model = editor.getModel()
      if (model) {
        monaco.editor.setModelMarkers(model, 'setMarkers', errorList)
      }
    }
  }, [errors, monaco, editor, debouncedValue])

  const setCursor = React.useCallback(
    (/** @type {string} */ jsonPath) => {
      if (editor) {
        let result
        try {
          result = jsonMap.parse(editor.getModel()?.getValue() || '')
        } catch (/** @type {any} */ e) {
          return
        }

        let positionData = result.pointers[jsonPath]
        if (positionData) {
          editor.setPosition({
            lineNumber: positionData.value.line + 1,
            column: positionData.value.column + 2,
          })
          editor.revealLine(positionData.value.line + 1)
          editor.focus()
        }
      }
    },
    [editor]
  )

  const { selectedPath } = React.useContext(SelectedPathContext)

  React.useEffect(
    () => setCursor('/' + selectedPath.join('/')),
    [setCursor, selectedPath]
  )

  const updateEditorSettings = useCallback(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: editorSchema.$id,
          fileMatch: ['*'],
          schema: editorSchema,
        },
      ],
    })
  }, [monaco, editorSchema])

  const editorDidMount = (
    /** @type {any } */ editor,
    /** @type {any} */ monaco
  ) => {
    editor.addAction({
      id: 'set-sidebar-context',
      label: 'Set Sidebar Context',
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: function (/** @type {any} */ ed) {
        const currentCursorPosition = ed.getPosition()
        let docMap
        try {
          docMap = jsonMap.parse(ed.getModel().getValue())
        } catch (/** @type {any} */ e) {
          return
        }

        const relevantPath = Object.entries(docMap.pointers).find((entry) => {
          return (
            currentCursorPosition.lineNumber - 1 === entry[1].key?.line &&
            currentCursorPosition.column - 1 >= entry[1].key.column &&
            currentCursorPosition.column - 1 <= entry[1].keyEnd.column
          )
        })

        if (!relevantPath) return

        const pathSegments = relevantPath[0].split('/')
        const pathSegmentsWithoutIndex = pathSegments
          .filter((partOfPath) => Number.isNaN(Number.parseInt(partOfPath)))
          .filter((partOfPath) => Boolean(partOfPath)) // remove empty strings

        sideBarData.setSideBarSelectedPath(pathSegmentsWithoutIndex)
        sideBarData.setSideBarIsOpen(true)
      },
    })

    /** @type {any} */
    const win = window
    if (win.Cypress) {
      win.MONACO_EDITOR = editor
    }
    setEditor(editor)
    setMonaco(monaco)

    updateEditorSettings()
  }

  useEffect(() => {
    updateEditorSettings()
  }, [updateEditorSettings])

  const onChangeMonaco = (/** @type {any} */ newValue) => {
    setState((state) => ({
      ...state,
      value: newValue,
    }))
  }

  /** @type {import ("react-monaco-editor").monaco.editor.IStandaloneEditorConstructionOptions} */
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fixedOverflowWidgets: true,
  }
  return (
    <>
      <div className="json-editor flex h-full bg-white">
        <div className=" w-full">
          <div className={'relative ' + (showErrors ? 'h-4/5' : 'h-full')}>
            <MonacoEditor
              width="100%"
              height="100%"
              language="json"
              theme="vs-white"
              options={options}
              defaultValue={stringifiedDoc}
              onChange={onChangeMonaco}
              editorDidMount={editorDidMount}
            />
          </div>
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
              <div className="mx-2 grow overflow-auto h-full">
                {errors.map((error, i) => (
                  <div key={i}>
                    <a
                      href={'#' + error.instancePath}
                      className={`validation_error${
                        error.type === 'warning'
                          ? ' validation_error-warning text-yellow-600'
                          : error.type === 'error'
                          ? ' validation_error-error'
                          : error.type === 'info'
                          ? ' validation_error-info text-blue-500'
                          : ''
                      } underline`}
                      onClick={() => {
                        setCursor(error.instancePath)
                      }}
                    >
                      <b>{error.instancePath}</b>:{' '}
                      <span className="validation_error-message">
                        {error.message}
                      </span>
                    </a>
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
      </div>
    </>
  )
}
