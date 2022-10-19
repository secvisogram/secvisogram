import React from 'react'

export default React.forwardRef(
  /**
   * @param {import('./NewDocumentDialog/types.js').Props} props
   */
  ({ defaultSource = 'TEMPLATE', data, onSubmit, onClose }, ref) => {
    const [source, setSource] = React.useState(defaultSource)

    return (
      <dialog
        className="rounded p-0 w-full max-w-lg shadow"
        ref={ref}
        data-testid="new_document_dialog"
        onClose={onClose}
      >
        {data ? (
          <>
            <form method="dialog" id={`new_document-close_form`} />
            <header className="w-full flex items-center justify-between border-b p-2">
              <h2 className="text-lg">Create new document</h2>
              <button
                type="submit"
                name="cancel"
                form={`new_document-close_form`}
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>
            <form
              id="new_document-form"
              method="dialog"
              onSubmit={(e) => {
                const formData = new FormData(
                  /** @type {HTMLFormElement} */ (e.target)
                )
                const templateId = /** @type {string} */ (
                  formData.get('templateId')
                )
                const file = /** @type {File} */ (formData.get('file'))
                onSubmit(
                  source === 'FILESYSTEM'
                    ? { source: 'FILESYSTEM', file }
                    : { source: 'TEMPLATE', templateId }
                )
              }}
            >
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <label
                    className={`block p-4 border cursor-pointer${
                      source === 'FILESYSTEM'
                        ? ' border-blue-400 border-b-0 rounded-t'
                        : ' rounded hover:shadow'
                    }`}
                  >
                    <input
                      data-testid="new_document-file_selector_button"
                      type="radio"
                      name="source"
                      value="FILESYSTEM"
                      checked={source === 'FILESYSTEM'}
                      onChange={() => {
                        setSource('FILESYSTEM')
                      }}
                    />
                    <span className="inline-block ml-3">
                      Upload from filesystem
                    </span>
                  </label>
                  {source === 'FILESYSTEM' ? (
                    <div className="border border-t-0 border-blue-400 rounded-b px-4 pb-4">
                      <input
                        data-testid="new_document-file_input"
                        className="text-sm"
                        name="file"
                        type="file"
                        accept="application/json"
                        required
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    className={`block p-4 border cursor-pointer${
                      source === 'TEMPLATE'
                        ? ' border-blue-400 border-b-0 rounded-t'
                        : ' rounded hover:shadow'
                    }`}
                  >
                    <input
                      data-testid="new_document-template_button"
                      type="radio"
                      name="source"
                      value="TEMPLATE"
                      checked={source === 'TEMPLATE'}
                      onChange={() => {
                        setSource('TEMPLATE')
                      }}
                    />
                    <span className="inline-block ml-3">Use a template</span>
                  </label>
                  {source === 'TEMPLATE' ? (
                    <div className="border border-t-0 border-blue-400 rounded-b px-4 pb-4">
                      <select
                        className="block border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                        data-testid="new_document-templates-select"
                        name="templateId"
                        required={source === 'TEMPLATE'}
                      >
                        <option value="">-- Choose a template --</option>
                        {data.templates.map((template) => (
                          <option
                            key={template.templateId}
                            value={template.templateId}
                          >
                            {template.templateDescription}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
            <footer className="p-2 border-t flex justify-between items-center">
              <button
                data-testid="new_document-cancel_button"
                className="mt-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
                type="submit"
                form={`new_document-close_form`}
              >
                Cancel
              </button>
              <button
                data-testid="new_document-create_document_button"
                className="mt-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
                type="submit"
                form={`new_document-form`}
              >
                Create
              </button>
            </footer>
          </>
        ) : null}
      </dialog>
    )
  }
)
