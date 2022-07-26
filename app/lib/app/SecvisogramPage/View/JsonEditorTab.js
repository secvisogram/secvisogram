import {
  faCheckCircle,
  faCog,
  faExclamationTriangle,
  faFile,
  faFileAlt,
  faFolderOpen,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAlert } from './shared/Alert.js'
import useDebounce from './shared/useDebounce.js'
import MonacoEditor from 'react-monaco-editor'
import myJson from './JsonEditorTab/Monaco_editor_schema.json'
import * as jsonMap from 'json-source-map'

/**
 * @param {{
    formValues: import('../shared/types').FormValues;
    validationErrors: import('../shared/types').ValidationError[];
    strict: boolean;
    onSetStrict(strict: boolean): void;
    onChange(doc: {} | null): void;
    onOpen(file: File): Promise<void | {}>;
    onDownload(doc: {}): void;
    onNewDocMin(): Promise<void | {}>;
    onNewDocMax(): Promise<void | {}>;
    onLockTab(): void;
    onUnlockTab(): void;
}} props
 * @this {any}
 */
export default function JsonEditorTab({
  formValues,
  validationErrors: errors,
  strict,
  onSetStrict,
  onChange,
  onOpen,
  onNewDocMin,
  onNewDocMax,
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

  const [{ value, parseError }, setState] = React.useState({
    value: stringifiedDoc,
    parseError: null,
  })
  const [showExpertSettings, setShowExpertSettings] = React.useState(!strict)
  const [showErrors, setShowErrors] = React.useState(false)
  const debouncedValue = useDebounce(value)

  /**
   * Toggles between strict and lenient validation.
   */
  const toggleStrict = () => {
    onSetStrict(!strict)
  }

  const toggleExpertSettings = () => {
    setShowExpertSettings(!showExpertSettings)
  }

  const toggleShowErrors = () => {
    setShowErrors(!showErrors)
  }

  const confirmMin = () => {
    onNewDocMin().then((newDoc) => {
      editor?.getModel()?.setValue(JSON.stringify(newDoc, null, 2))
    })
    hideMin()
  }

  const confirmMax = () => {
    onNewDocMax().then((newDoc) => {
      editor?.getModel()?.setValue(JSON.stringify(newDoc, null, 2))
    })
    hideMax()
  }

  const handleOpen = (/** @type {File} */ file) => {
    onOpen(file).then((openedDoc) => {
      editor?.getModel()?.setValue(JSON.stringify(openedDoc, null, 2))
    })
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
      let result
      try {
        result = jsonMap.parse(debouncedValue)
      } catch (/** @type {any} */ e) {
        console.log('Catch!')
        return
      }

      let errorList = []
      let isDocMatchingErrors = true

      for (const e of errors) {
        let path = e.instancePath
        let positionData = result.pointers[path]
        if (!positionData) {
          isDocMatchingErrors = false
          break
        }

        errorList.push({
          startLineNumber: positionData.value.line + 1,
          startColumn: positionData.value.column + 1,
          endLineNumber: positionData.valueEnd.line + 1,
          endColumn: positionData.valueEnd.column + 1,
          message: e.message,
          severity: monaco.MarkerSeverity.Error,
        })
      }

      const model = editor.getModel()
      if (model && isDocMatchingErrors) {
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
        console.log('Catch!')
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

  const {
    show: showMin,
    hide: hideMin,
    Alert: MinAlert,
  } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirmMin,
  })

  const {
    show: showMax,
    hide: hideMax,
    Alert: MaxAlert,
  } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirmMax,
  })

  const editorDidMount = (
    /** @type {any } */ editor,
    /** @type {any} */ monaco
  ) => {
    console.log('editorDidMount', editor)
    setEditor(editor)
    setMonaco(monaco)

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: true,
      schemas: [
        {
          uri: '',
          fileMatch: ['*'],
          schema: myJson,
        },
      ],
    })
  }

  const editorWillMount = () => {}

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
      <MinAlert />
      <MaxAlert />

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
              editorWillMount={editorWillMount}
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
                      onClick={() => {
                        setCursor(error.instancePath)
                      }}
                      className="underline"
                    >
                      <b>{error.instancePath}</b>: {error.message}
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
          <div className="flex flex-col">
            <button
              type="button"
              className="mb-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
              onClick={showMin}
            >
              <FontAwesomeIcon className="mr-1" icon={faFile} />
              New (minimal fields)
            </button>
            <button
              type="button"
              className="mb-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
              onClick={showMax}
            >
              <FontAwesomeIcon className="mr-1" icon={faFileAlt} />
              New (all fields)
            </button>
            <label
              htmlFor="openFile"
              className="mb-2 py-1 px-3 text-center rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
            >
              <FontAwesomeIcon className="mr-1" icon={faFolderOpen} />
              Open
            </label>
            <input
              id="openFile"
              title="open file"
              type="file"
              className="hidden"
              accept="application/json"
              onChange={(e) => {
                if (!e.target.files || !e.target.files[0]) return
                if (e.target.files[0].size > 1024 * 1024) {
                  window.alert('File too large!')
                  return
                }
                handleOpen(e.target.files[0])
              }}
            />
          </div>
          <div>
            {showExpertSettings ? (
              <div className="mb-6">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    checked={strict}
                    type="checkbox"
                    name="toggle"
                    id="toggleExpertSettings"
                    onChange={toggleStrict}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggleExpertSettings"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  />
                </div>
                <label
                  htmlFor="toggleExpertSettings"
                  className="text-xs text-gray-500"
                >
                  Disallow non-standard properties
                </label>
              </div>
            ) : (
              <button
                type="button"
                className="py-1 px-3 mb-6 h-9 underline text-gray-500"
                onClick={toggleExpertSettings}
              >
                <FontAwesomeIcon className="mr-1" icon={faCog} />
                Show expert settings
              </button>
            )}

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
