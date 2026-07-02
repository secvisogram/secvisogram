import { backend } from '../../shared/api.js'

const DEFAULT_PAGE_SIZE = 50

/**
 * @typedef {object} AdvisoryPage
 * @property {Array<any>} advisories
 * @property {string | null} bookmark
 * @property {boolean} hasMore
 */

/**
 * Fetches the first page of advisories.
 *
 * @param {object} [params]
 * @param {number} [params.limit] Page size; defaults to 50.
 * @returns {Promise<AdvisoryPage>}
 */
export async function getData({ limit = DEFAULT_PAGE_SIZE } = {}) {
  const page = await backend.getAdvisories({ limit })
  return normalizePage(page)
}

/**
 * Fetches a subsequent page of advisories, resuming from the given bookmark.
 *
 * @param {object} params
 * @param {string | null} params.bookmark Opaque cursor from the previous page.
 * @param {number} [params.limit] Page size; defaults to 50.
 * @returns {Promise<AdvisoryPage>}
 */
export async function getMoreData({ bookmark, limit = DEFAULT_PAGE_SIZE }) {
  const page = await backend.getAdvisories({ limit, bookmark })
  return normalizePage(page)
}

/**
 * Normalises the paginated envelope into the shape the Documents tab consumes.
 * The per-row shape is passed through unchanged. Always called for a paginated
 * request (a `limit` is always sent), so the response is always the envelope.
 *
 * @param {Array<any> | { advisories?: Array<any>, bookmark?: string | null, hasMore?: boolean }} response
 * @returns {AdvisoryPage}
 */
function normalizePage(response) {
  const page =
    /** @type {{ advisories?: Array<any>, bookmark?: string | null, hasMore?: boolean }} */ (
      response
    )
  return {
    advisories: page.advisories ?? [],
    bookmark: page.bookmark ?? null,
    hasMore: page.hasMore ?? false,
  }
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
