import { t } from 'i18next'
import React from 'react'
import {
  changeWorkflowState,
  createNewVersion,
  getAdvisoryDetail,
} from '../shared/api/backend.js'
import { deleteAdvisory, getData, getMoreData } from './DocumentsTab/service.js'
import DocumentsTabView from './DocumentsTab/View.js'

/** @typedef {React.ComponentProps<typeof DocumentsTabView>} ViewProps */

const messageForStatus = (/** @type { number } */ status) => {
  switch (status) {
    case 422:
      return t('error.documentInvalidCantPublish')
    case 503:
      return t('error.errorReachingValidationService')
    default:
      return t('error.encounteredErrorWithCode') + status
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
      onGetMoreData={getMoreData}
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
