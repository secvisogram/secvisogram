import ApiRequest from '../ApiRequest.js'
import CsrfApiRequest from '../CsrfApiRequest.js'

/**
 * @param {object} params
 * @param {{}} params.csaf
 * @param {string} params.summary
 * @param {string} params.legacyVersion
 */
export async function createAdvisory({ csaf, summary, legacyVersion }) {
  const res = await new CsrfApiRequest(
    new Request('/api/v1/advisories', { method: 'POST' }),
  )
    .setJsonRequestBody({ csaf, summary, legacyVersion })
    .send()

  return await res.json()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 * @param {{}} params.csaf
 * @param {string} params.summary
 * @param {string} params.legacyVersion
 */
export async function updateAdvisory({
  advisoryId,
  revision,
  csaf,
  summary,
  legacyVersion,
}) {
  const apiURL = new URL(
    `/api/v1/advisories/${advisoryId}`,
    window.location.href,
  )
  apiURL.searchParams.set('revision', revision)
  await new CsrfApiRequest(
    new Request(apiURL.toString(), {
      method: 'PATCH',
    }),
  )
    .setJsonRequestBody({ csaf, summary, legacyVersion })
    .send()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 */
export async function getAdvisoryDetail({ advisoryId }) {
  return (
    await new CsrfApiRequest(
      new Request(`/api/v1/advisories/${advisoryId}`),
    ).send()
  ).json()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 * @param {string} params.workflowState
 * @param {string | null} params.documentTrackingStatus
 * @param {Date | null} params.proposedTime
 */
export async function changeWorkflowState({
  advisoryId,
  revision,
  workflowState,
  documentTrackingStatus,
  proposedTime,
}) {
  const newWorkflowState = workflowState
  const changeWorkflowStateURL = new URL(
    `/api/v1/advisories/${advisoryId}/workflowstate/${newWorkflowState}`,
    window.location.href,
  )
  changeWorkflowStateURL.searchParams.set('revision', revision)
  if (typeof documentTrackingStatus === 'string') {
    changeWorkflowStateURL.searchParams.set(
      'documentTrackingStatus',
      documentTrackingStatus,
    )
  }
  if (proposedTime !== null) {
    changeWorkflowStateURL.searchParams.set(
      'proposedTime',
      proposedTime.toISOString(),
    )
  }
  return new CsrfApiRequest(
    new Request(changeWorkflowStateURL.toString(), {
      method: 'PATCH',
    }),
  ).send()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 */
export async function createNewVersion({ advisoryId, revision }) {
  const createNewVersionAPIURL = new URL(
    `/api/v1/advisories/${advisoryId}/createNewVersion`,
    window.location.href,
  )
  createNewVersionAPIURL.searchParams.set('revision', revision)
  await new CsrfApiRequest(
    new Request(createNewVersionAPIURL.href, {
      method: 'PATCH',
    }),
  ).send()
}

export async function getTemplates() {
  return new CsrfApiRequest(new Request('/api/v1/advisories/templates'))
    .setContentType('application/json')
    .send()
    .then((res) => res.json())
}

/**
 * @param {object} params
 * @param {string} params.templateId
 * @returns
 */
export async function getTemplateContent({ templateId }) {
  return new CsrfApiRequest(
    new Request(`/api/v1/advisories/templates/${templateId}`),
  )
    .setContentType('application/json')
    .send()
    .then((templateContentRes) => templateContentRes.json())
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 */
export async function deleteAdvisory({ advisoryId, revision }) {
  const deleteURL = new URL(
    `/api/v1/advisories/${advisoryId}`,
    window.location.href,
  )
  deleteURL.searchParams.set('revision', revision)
  await new CsrfApiRequest(
    new Request(deleteURL.toString(), { method: 'DELETE' }),
  ).send()
}

/**
 * Fetches advisories from the CMS backend.
 *
 * Backward-compatible by design: called with no arguments (or
 * without a `limit`) it preserves the legacy behaviour and resolves to the
 * bare `AdvisoryDocumentInformation[]` array. When a `limit` is provided it
 * opts into the paginated wire contract and resolves to the page envelope
 * `{ advisories, bookmark, hasMore }`; pass the previous page's `bookmark`
 * (opaque, echoed back verbatim) to fetch the next page.
 *
 * @param {object} [options]
 * @param {number} [options.limit] Max visible rows per page (1–1000).
 *   When omitted, the legacy bare-array response is returned.
 * @param {string | null} [options.bookmark] Opaque cursor from the previous
 *   page. Ignored unless `limit` is provided.
 * @returns {Promise<
 *   | Array<object>
 *   | { advisories: Array<object>, bookmark: string | null, hasMore: boolean }
 * >}
 */
export async function getAdvisories(options) {
  let requestUrl = '/api/v1/advisories'
  if (options && typeof options.limit === 'number') {
    const apiURL = new URL('/api/v1/advisories', window.location.href)
    apiURL.searchParams.set('limit', String(options.limit))
    if (typeof options.bookmark === 'string') {
      apiURL.searchParams.set('bookmark', options.bookmark)
    }
    requestUrl = apiURL.toString()
  }
  const res = await new CsrfApiRequest(new Request(requestUrl))
    .setContentType('application/json')
    .send()
  return await res.json()
}

export async function callAboutInfo() {
  return await new ApiRequest(new Request('/api/v1/about'))
    .setContentType('application/json')
    .send()
}

export async function getAboutInfo() {
  return callAboutInfo().then((r) => r.json())
}
