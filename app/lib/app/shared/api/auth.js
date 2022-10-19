import ApiRequest from '../ApiRequest.js'

/**
 * @typedef {object} UserInfo
 * @property {string} user
 * @property {string} email
 * @property {string} preferredUsername
 * @property {string[]} groups
 */

/**
 *
 * @param {string} userInfoUrl
 * @returns {Promise<UserInfo>}
 */
export async function getUserInfo(userInfoUrl) {
  const response = await new ApiRequest(new Request(userInfoUrl))
    .setContentType('application/json')
    .send()

  return await response.json()
}
