import { backend } from '../shared/api.js'

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @returns
 */
export async function loadAdvisory({ advisoryId }) {
  const advisoryDetail = await backend.getAdvisoryDetail({ advisoryId })
  return {
    ...advisoryDetail,
  }
}
