import React from 'react'

export default React.forwardRef(
  /**
   * @param {import('./EditWorkflowStateDialog/types.js').Props} props
   */
  ({ data, onSubmit, onClose }, ref) => {
    const [newWorkflowState, setNewWorkflowState] = React.useState('')

    return (
      <dialog
        className="rounded p-0 w-full max-w-lg shadow"
        ref={ref}
        data-testid="edit_workflow_state_dialog"
        onClose={onClose}
      >
        {data ? (
          <>
            <form
              method="dialog"
              id={`advisory-${data.advisoryId}-edit_workflow_state_dialog-close_form`}
            />
            <header className="w-full flex items-center justify-between border-b p-2">
              <h2 className="text-lg">Change workflow state</h2>
              <button
                type="submit"
                name="cancel"
                form={`advisory-${data.advisoryId}-edit_workflow_state_dialog-close_form`}
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
              id={`advisory-${data.advisoryId}-edit_workflow_state_dialog-form`}
              method="dialog"
              onSubmit={(e) => {
                const formData = new FormData(/** @type {any} */ (e.target))
                const newWorkflowState = /** @type {string} */ (
                  formData.get('new_workflow_state')
                )
                const trackingStatus = /** @type {string | null} */ (
                  formData.get('tracking_status')
                )
                const proposedTimeRaw = /** @type {string | null} */ (
                  formData.get('proposed_time_input')
                )
                const proposedTime = proposedTimeRaw
                  ? new Date(proposedTimeRaw)
                  : null
                onSubmit({
                  workflowState: newWorkflowState,
                  documentTrackingStatus: trackingStatus,
                  proposedTime,
                })
              }}
            >
              <div className="p-4">
                <div>
                  <label
                    className="block"
                    htmlFor={`advisory-${data.advisoryId}-list_entry-workflow_state_select`}
                  >
                    New Workflow State
                  </label>
                  <select
                    className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded max-w-xs"
                    data-testid={`advisory-${data.advisoryId}-list_entry-workflow_state_select`}
                    id={`advisory-${data.advisoryId}-list_entry-workflow_state_select`}
                    name="new_workflow_state"
                    value={newWorkflowState}
                    onChange={(e) => {
                      setNewWorkflowState(e.target.value)
                    }}
                    required
                  >
                    <option value="">-- Choose --</option>
                    {data.allowedStateChanges.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                </div>
                {newWorkflowState === 'Published' && (
                  <div className="mt-3">
                    <label
                      className="block"
                      htmlFor={`advisory-${data.advisoryId}-edit_workflow_state_dialog-tracking_status_select`}
                    >
                      Document Tracking Status
                    </label>
                    <select
                      className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded max-w-xs"
                      id={`advisory-${data.advisoryId}-edit_workflow_state_dialog-tracking_status_select`}
                      data-testid={`advisory-${data.advisoryId}-edit_workflow_state_dialog-tracking_status_select`}
                      name="tracking_status"
                      required
                    >
                      <option value="">-- Choose --</option>
                      {['Interim', 'Final'].map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {(newWorkflowState === 'Published' ||
                  newWorkflowState === 'RfPublication') && (
                  <div className="mt-3">
                    <label
                      className="block"
                      htmlFor={`advisory-${data.advisoryId}-edit_workflow_state_dialog-proposed_time_input`}
                    >
                      Proposed Time
                    </label>
                    <input
                      className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded max-w-xs"
                      type="datetime-local"
                      id={`advisory-${data.advisoryId}-edit_workflow_state_dialog-proposed_time_input`}
                      data-testid={`advisory-${data.advisoryId}-edit_workflow_state_dialog-proposed_time_input`}
                      name="proposed_time_input"
                    />
                  </div>
                )}
              </div>
            </form>
            <footer className="p-2 border-t flex justify-between items-center">
              <div />
              <button
                className="py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
                type="submit"
                form={`advisory-${data.advisoryId}-edit_workflow_state_dialog-form`}
              >
                Change
              </button>
            </footer>
          </>
        ) : null}
      </dialog>
    )
  }
)
