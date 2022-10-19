import React from 'react'

const VersionSummaryDialog = React.forwardRef(
  /**
   * @param {import('./VersionSummaryDialog/types.js').Props} props
   */
  ({ prefilledData, onSubmit, onClose }, ref) =>
  {
    return (
    <dialog
      className="rounded p-0 w-full max-w-4xl shadow"
      ref={ref}
      data-testid="submit_version"
      onClose={onClose}
    >
      <form method="dialog" id={`submit_version-close_form`} />
      <header className="w-full flex items-center justify-between border-b p-2">
        <h2 className="text-lg">Save Document on Server</h2>
        <button type="submit" name="cancel" form={`submit_version-close_form`}>
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
      <p className="p-4">Please provide a summary of your changes and an optional legacy version.</p>
      <form
        method="dialog"
        id="submit_version-form"
        onSubmit={(e) => {
          const formData = new FormData(
            /** @type {HTMLFormElement} */ (e.target)
          )
          const summary = /** @type {string} */ (formData.get('summary'))
          const legacyVersion = /** @type {string} */ (
            formData.get('legacy_version')
          )
          onSubmit({
            summary,
            legacyVersion,
          })
        }}
      >
        <div className="p-4">
          <label className="block" htmlFor="submit_version-summary-textarea">
            Summary
          </label>
          <textarea
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            data-testid="submit_version-summary-textarea"
            id="submit_version-summary-textarea"
            name="summary"
            required
            rows={8}
            defaultValue={prefilledData.summary}
          ></textarea>
          <label
            className="block"
            htmlFor="submit_version-legacy_version-input"
          >
            Legacy Version
          </label>
          <input
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            data-testid="submit_version-legacy_version-input"
            id="submit_version-legacy_version-input"
            name="legacy_version"
            defaultValue={prefilledData.legacyVersion}
          ></input>
        </div>
      </form>
      <footer className="p-2 border-t flex justify-between items-center">
        <div />
        <button
          className="py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
          type="submit"
          form="submit_version-form"
          data-testid="submit_version-submit"
        >
          Submit
        </button>
      </footer>
    </dialog>
  )}
)

export default VersionSummaryDialog
