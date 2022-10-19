import {
  faCheckCircle,
  faExclamationTriangle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as jsonMap from 'json-source-map'
import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import sortObjectKeys from '../../shared/sortObjectKeys.js'
import editorSchema from './JsonEditorTab/editorSchema.js'
import useDebounce from './shared/useDebounce.js'

/**
 * @param {{
 *  originalValues: import('../shared/types').FormValues
 *  formValues: import('../shared/types').FormValues
 *  validationErrors: import('../shared/types').TypedValidationError[]
 *  sortButtonRef: React.MutableRefObject<HTMLButtonElement | null>
 *  onChange(doc: {} | null): void
 *  onLockTab(): void
 *  onUnlockTab(): void
 * }} props
 */
export default function JsonEditorTab({
  originalValues,
  formValues,
  validationErrors: errors,
  sortButtonRef,
  onChange,
  onLockTab,
  onUnlockTab,
}) {
  const { doc } = formValues

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
   * The initial value of the state used to prevent a re-render of the ace editor
   * when the document changes from outside.
   */
  const initialValue = React.useMemo(
    () => JSON.stringify(originalValues.doc, null, 2),
    [originalValues.doc]
  )
  /**
   * Updates the editor value if the document was changed outside (e.g. created from template)
   */
  React.useEffect(() => {
    if (!initialMountRef.current && editor) {
      editor.getModel()?.setValue(initialValue)
    }
  }, [initialValue, editor])

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

  const toggleShowErrors = () => {
    setShowErrors(!showErrors)
  }

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

  const setCursor = (/** @type {string} */ jsonPath) => {
    if (editor) {
      let result
      try {
        result = jsonMap.parse(debouncedValue)
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
  }

  const editorDidMount = (
    /** @type {any } */ editor,
    /** @type {any} */ monaco
  ) => {
    /** @type {any} */
    const win = window
    if (win.Cypress) {
      win.MONACO_EDITOR = editor
    }
    setEditor(editor)
    setMonaco(monaco)

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: true,
      schemas: [
        {
          uri: '',
          fileMatch: ['*'],
          schema: editorSchema,
        },
      ],
    })
  }

  const onChangeMonaco = (/** @type {any} */ newValue) => {
    setState((state) => ({
      ...state,
      value: newValue,
    }))
  }

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  }
  return (
    <>
      <div className="json-editor flex h-full mr-3 bg-white">
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
              <div className="mx-2 flex-grow overflow-auto h-full">
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
        <div className="pl-3 pr-6 py-6 w-72 flex flex-col justify-between">
          <div className="flex flex-col" />
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
              <>
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
                  onClick={toggleShowErrors}
                >
                  {showErrors ? 'Hide errors' : 'Show errors'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
