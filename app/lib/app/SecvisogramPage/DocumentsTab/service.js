import { backend } from '../../shared/api.js'

export async function getData() {
  const advisories = await backend.getAdvisories()
  return { advisories }
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 */
export async function deleteAdvisory({ advisoryId }) {
  const advisoryDetail = await backend.getAdvisoryDetail({ advisoryId })
  await backend.deleteAdvisory({
    advisoryId,
    revision: advisoryDetail.revision,
  })
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.workflowState
 * @param {string | null} params.documentTrackingStatus
 * @param {Date | null} params.proposedTime
 */
export async function changeWorkflowState({
  advisoryId,
  workflowState,
  documentTrackingStatus,
  proposedTime,
}) {
  const { revision } = await backend.getAdvisoryDetail({ advisoryId })
  await backend.changeWorkflowState({
    advisoryId,
    revision,
    workflowState,
    documentTrackingStatus,
    proposedTime,
  })
}
