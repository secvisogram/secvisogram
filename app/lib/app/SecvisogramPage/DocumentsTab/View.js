import React from 'react'
import AppErrorContext from '../../shared/context/AppErrorContext.js'
import HistoryContext from '../../shared/context/HistoryContext.js'
import sitemap from '../../shared/sitemap.js'
import LoadingIndicator from '../View/LoadingIndicator.js'
import Alert from '../View/shared/Alert.js'
import EditWorkflowStateDialog from './View/EditWorkflowStateDialog.js'

/**
 * @param {import('./View/types.js').Props} props
 * @returns
 */
export default function DocumentsTabView({
  defaultData = null,
  onOpenAdvisory,
  onGetData,
  onDeleteAdvisory,
  onChangeWorkflowState,
  onCreateNewVersion,
}) {
  const history = React.useContext(HistoryContext)
  const { handleError } = React.useContext(AppErrorContext)

  const [alert, setAlert] = React.useState(
    /** @type {React.ComponentProps<typeof Alert> | null} */ (null)
  )
  const [data, setData] = React.useState(defaultData)
  const [isLoading, setLoading] = React.useState(!defaultData)

  const [editWorkflowStateDialogProps, setEditWorkflowStateDialogProps] =
    React.useState(
      /** @type {React.ComponentProps<typeof EditWorkflowStateDialog> | null} */ (
        null
      )
    )
  /** @type {React.MutableRefObject<any>} */
  const editWorkflowStateDialogRef = React.useRef()
  React.useEffect(() => {
    if (editWorkflowStateDialogProps) {
      editWorkflowStateDialogRef.current.showModal()
    }
  }, [editWorkflowStateDialogProps])

  React.useEffect(() => {
    let active = true

    setLoading(true)
    onGetData()
      .then((data) => {
        if (!active) return
        setData(data)
      })
      .catch(handleError)
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [onGetData, handleError])

  /**
   * @param {object} params
   * @param {string} params.advisoryId
   */
  const onEditAdvisory = ({ advisoryId }) => {
    onOpenAdvisory({ advisoryId }, () => {
      history.pushState(null, '', sitemap.home.href([['tab', 'EDITOR']]))
    })
  }

  return (
    <>
      {editWorkflowStateDialogProps && (
        <EditWorkflowStateDialog
          {...editWorkflowStateDialogProps}
          ref={editWorkflowStateDialogRef}
        />
      )}
      <div className="bg-white h-full">
        {isLoading ? (
          <LoadingIndicator label="Loading ..." />
        ) : (
          <>
            <div className="pt-4 mx-auto w-full max-w-4xl">
              <table className="border w-full">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Document</th>
                    <th className="p-2">Workflow State</th>
                    <th className="p-2">Change Workflow State</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.advisories.map((advisory) => (
                    <tr
                      key={advisory.advisoryId}
                      data-testid={`advisory-${advisory.advisoryId}-list_entry`}
                    >
                      <td className="p-2">
                        <button
                          className="underline"
                          data-testid={`advisory-${advisory.advisoryId}-list_entry-open_button`}
                          type="button"
                          onClick={() => {
                            onEditAdvisory({ advisoryId: advisory.advisoryId })
                          }}
                        >
                          {advisory.title}
                        </button>
                      </td>
                      <td className="p-2">
                        <span
                          className="block"
                          data-testid={`advisory-${advisory.advisoryId}-list_entry-workflow_state`}
                        >
                          {advisory.workflowState}
                        </span>
                      </td>
                      <td className="p-2">
                        {advisory.canCreateVersion ? (
                          <button
                            className="underline"
                            type="button"
                            data-testid={`advisory-${advisory.advisoryId}-list_entry-create_new_version_button`}
                            onClick={() => {
                              setLoading(true)
                              onCreateNewVersion({
                                advisoryId: advisory.advisoryId,
                              })
                                .then(async () => {
                                  setData(await onGetData())
                                })
                                .catch(handleError)
                                .finally(() => {
                                  setLoading(false)
                                })
                            }}
                          >
                            Create new version
                          </button>
                        ) : advisory.allowedStateChanges.length ? (
                          <button
                            className="underline"
                            type="button"
                            data-testid={`advisory-${advisory.advisoryId}-list_entry-edit_workflow_state_button`}
                            onClick={() => {
                              setEditWorkflowStateDialogProps({
                                data: {
                                  advisoryId: advisory.advisoryId,
                                  allowedStateChanges:
                                    advisory.allowedStateChanges,
                                },
                                onSubmit({
                                  workflowState,
                                  documentTrackingStatus,
                                  proposedTime,
                                }) {
                                  setLoading(true)
                                  onChangeWorkflowState({
                                    advisoryId: advisory.advisoryId,
                                    workflowState,
                                    documentTrackingStatus,
                                    proposedTime,
                                  })
                                    .then(async () => {
                                      setData(await onGetData())
                                    })
                                    .catch(handleError)
                                    .finally(() => {
                                      setLoading(false)
                                    })
                                },
                                onClose: () =>
                                  setEditWorkflowStateDialogProps(null),
                              })
                            }}
                          >
                            Edit
                          </button>
                        ) : null}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              onEditAdvisory({
                                advisoryId: advisory.advisoryId,
                              })
                            }}
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          {advisory.deletable && (
                            <button
                              data-testid={`advisory-${advisory.advisoryId}-list_entry-delete_button`}
                              onClick={() => {
                                setAlert({
                                  description:
                                    'Really delete this advisory? This action cannot be undone.',
                                  cancelLabel: 'Cancel',
                                  confirmLabel: 'Delete',
                                  onCancel() {
                                    setAlert(null)
                                  },
                                  onConfirm() {
                                    setAlert(null)
                                    setLoading(true)
                                    onDeleteAdvisory({
                                      advisoryId: advisory.advisoryId,
                                    })
                                      .then(async () => {
                                        setData(await onGetData())
                                      })
                                      .catch(handleError)
                                      .finally(() => {
                                        setLoading(false)
                                      })
                                  },
                                })
                              }}
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isLoading && <LoadingIndicator label="Loading ..." />}
          </>
        )}
        {alert && <Alert {...alert} />}
      </div>
    </>
  )
}
