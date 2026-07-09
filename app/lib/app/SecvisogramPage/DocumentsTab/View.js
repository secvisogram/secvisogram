import { t } from 'i18next'
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
  onGetMoreData,
  onDeleteAdvisory,
  onChangeWorkflowState,
  onCreateNewVersion,
}) {
  const history = React.useContext(HistoryContext)
  const { handleError } = React.useContext(AppErrorContext)

  const [alert, setAlert] = React.useState(
    /** @type {React.ComponentProps<typeof Alert> | null} */ (null),
  )
  const [data, setData] = React.useState(defaultData)
  const [isLoading, setLoading] = React.useState(!defaultData)
  // Tracks only the in-flight "Load more" page so already-rendered rows stay
  // visible while the next page loads.
  const [isLoadingMore, setLoadingMore] = React.useState(false)

  /**
   * Loads the next page and appends its rows to the currently
   * rendered list, keeping the already-loaded rows visible.
   */
  const onLoadMore = () => {
    if (!data?.hasMore) return
    setLoadingMore(true)
    onGetMoreData({ bookmark: data.bookmark })
      .then((nextPage) => {
        setData((current) =>
          current
            ? {
                advisories: [...current.advisories, ...nextPage.advisories],
                bookmark: nextPage.bookmark,
                hasMore: nextPage.hasMore,
              }
            : nextPage,
        )
      })
      .catch(handleError)
      .finally(() => {
        setLoadingMore(false)
      })
  }

  const [editWorkflowStateDialogProps, setEditWorkflowStateDialogProps] =
    React.useState(
      /** @type {React.ComponentProps<typeof EditWorkflowStateDialog> | null} */ (
        null
      ),
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          <LoadingIndicator label={t('menu.loading')} />
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
                                  currentReleaseDate:
                                    advisory.currentReleaseDate,
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
                            aria-label={t('documentsTab.copyPermalink')}
                            title={t('documentsTab.copyPermalink')}
                            onClick={() => {
                              const url = new URL('/', window.location.href)
                              url.searchParams.set(
                                'advisoryId',
                                advisory.advisoryId,
                              )
                              navigator.clipboard
                                .writeText(url.href)
                                .then(() => {
                                  handleError({
                                    color: 'green',
                                    message: t(
                                      'documentsTab.permalinkCopiedMessage',
                                    ),
                                  })
                                })
                                .catch((e) => {
                                  console.error(e)
                                  handleError({
                                    message: t(
                                      'documentsTab.failedToCopyPermalinkMessage',
                                    ),
                                  })
                                })
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                              />
                            </svg>
                          </button>
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
                                  description: t('menu.reallyDeleteAdvisory'),
                                  cancelLabel: t('menu.cancel'),
                                  confirmLabel: t('menu.delete'),
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
              {data?.hasMore && (
                <div className="flex justify-center py-4">
                  <button
                    className="underline disabled:opacity-50"
                    type="button"
                    data-testid="advisory-list-load_more_button"
                    disabled={isLoadingMore}
                    onClick={onLoadMore}
                  >
                    {isLoadingMore ? t('menu.loading') : t('menu.loadMore')}
                  </button>
                </div>
              )}
            </div>
            {isLoading && <LoadingIndicator label="Loading ..." />}
          </>
        )}
        {alert && <Alert {...alert} />}
      </div>
    </>
  )
}
