import APIRequest from '../ApiRequest.js'

/**
 * @param {string} advisoryId
 * @returns {Promise<{}>}
 */
export async function exportJson(advisoryId) {
  const exportUrl = getExportUrl(advisoryId, 'JSON')
  const response = await new APIRequest(new Request(exportUrl)).send()
  return await response.json()
}

/**
 * @param {string} advisoryId
 * @param {string} format
 */
export function getExportUrl(advisoryId, format) {
  return `/api/v1/advisories/${advisoryId}/csaf?format=${format}`
}
