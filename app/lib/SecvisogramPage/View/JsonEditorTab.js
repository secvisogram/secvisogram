import {
  faCheckCircle,
  faCog,
  faExclamationTriangle,
  faFile,
  faFolderOpen,
  faSave,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAlert } from './shared/Alert.js'
import useDebounce from './shared/useDebounce.js'

/**
 * Embeds the ace editor.
 * @see https://ace.c9.io/
 *
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  validationErrors: import('../../shared/validationTypes').ValidationError[]
 *  strict: boolean
 *  onSetStrict(strict: boolean): void
 *  onChange(doc: {} | null): void
 *  onOpen(file: File): Promise<void | {}>
 *  onDownload(doc: {}): void
 *  onNewDocMin(): Promise<void | {}>
 *  onLockTab(): void
 *  onUnlockTab(): void
 * }} props
 */
export default function JsonEditorTab({
  formValues,
  validationErrors: errors,
  strict,
  onSetStrict,
  onChange,
  onOpen,
  onDownload,
  onNewDocMin,
  onLockTab,
  onUnlockTab,
}) {
  const { doc } = formValues

  /**
   * Holds the reference to the container element of the ace editor.
   */
  const ref = React.useRef(/** @type {HTMLDivElement | null} */ (null))

  /**
   * Holds the instance of the ace editor.
   */
  const editorRef =
    /** @type {React.MutableRefObject<import('../../../vendor/ace-builds/ace').Ace.Editor | undefined>} */ (
      React.useRef()
    )

  const stringifiedDoc = React.useMemo(
    () => JSON.stringify(doc, null, 2),
    [doc]
  )

  /**
   * The initial value of the state used to prevent a re-render of the ace editor
   * when the document changes from outside.
   */
  const [initialValue] = React.useState(stringifiedDoc)

  /**
   * Holds the value and potential parse errors of the ace editor input.
   */
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
      editorRef.current?.setValue(JSON.stringify(newDoc, null, 2))
    })
    hideMin()
  }

  const handleOpen = (/** @type {File} */ file) => {
    onOpen(file).then((openedDoc) => {
      editorRef.current?.setValue(JSON.stringify(openedDoc, null, 2))
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
   * Initializes the ace editor.
   */
  React.useEffect(() => {
    const editorEl = /** @type {HTMLDivElement} */ (ref.current)
    if (!editorRef.current) {
      editorRef.current = ace.edit(editorEl)
    }
    const changeHandler = () => {
      setState((state) => ({
        ...state,
        value: editorRef.current?.getValue() ?? '',
      }))
    }
    editorEl.style.fontSize = '14px'

    editorRef.current.session.setMode('ace/mode/json')
    editorRef.current.setTheme('ace/theme/eclipse')
    editorRef.current.setOptions({
      foldStyle: 'markbeginend',
      fadeFoldWidgets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    })
    editorRef.current.on('change', changeHandler)
    editorRef.current.setValue(initialValue)

    return () => {
      editorRef.current?.off('change', changeHandler)
      editorRef.current?.destroy()
    }
  }, [initialValue])

  /**
   * Parses the ace editor input and replaces the document.
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

  return (
    <>
      <MinAlert />
      <div className="json-editor flex h-full mr-3 bg-white">
        <div className="p-3 w-full">
          <div className={'relative ' + (showErrors ? 'h-4/5' : 'h-full')}>
            <div
              ref={ref}
              className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white"
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
                    <b>{error.instancePath}</b>: {error.message}
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
                if (e.target.files[0].size > 1 * 1024 * 1024) {
                  window.alert('File too large!')
                  return
                }
                handleOpen(e.target.files[0])
              }}
            />
            <button
              type="button"
              className="mb-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
              onClick={() => {
                onDownload(doc)
              }}
            >
              <FontAwesomeIcon className="mr-1" icon={faSave} />
              Save
            </button>
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
