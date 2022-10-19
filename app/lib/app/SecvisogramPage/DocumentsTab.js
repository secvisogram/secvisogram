import React from 'react'
import {
  changeWorkflowState,
  createNewVersion,
  getAdvisoryDetail,
} from '../shared/api/backend.js'
import { deleteAdvisory, getData } from './DocumentsTab/service.js'
import DocumentsTabView from './DocumentsTab/View.js'

/** @typedef {React.ComponentProps<typeof DocumentsTabView>} ViewProps */

const messageForStatus = (/** @type { number } */ status) => {
  switch (status) {
    case 422:
      return 'The document is not valid and can therefore not be published.'
    case 503:
      return 'There was an error reaching the validation service. Please try again later.'
    default:
      return 'Encountered an error with status code: ' + status
  }
}

/**
 * @param {Pick<ViewProps, 'onOpenAdvisory'>} props
 * @returns
 */
export default function DocumentsTab(props) {
  return (
    <DocumentsTabView
      {...props}
      onGetData={getData}
      onDeleteAdvisory={deleteAdvisory}
      onChangeWorkflowState={async ({
        advisoryId,
        workflowState,
        documentTrackingStatus,
        proposedTime,
      }) => {
        const { revision } = await getAdvisoryDetail({ advisoryId })
        await changeWorkflowState({
          advisoryId,
          revision,
          workflowState,
          documentTrackingStatus,
          proposedTime,
        }).catch((err) => {
          const message = messageForStatus(err.status)
          throw new Error(message)
        })
      }}
      onCreateNewVersion={async ({ advisoryId }) => {
        const advisoryDetail = await getAdvisoryDetail({
          advisoryId: advisoryId,
        })
        await createNewVersion({
          advisoryId,
          revision: advisoryDetail.revision,
        })
      }}
    />
  )
}
