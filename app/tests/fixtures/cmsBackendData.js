import templates from './cmsBackendData/templates.js'
import testsSample from './samples/cmsBackendData/tests.js'

const users = [
  {
    user: 'editor',
    preferredUsername: 'editor',
    email: '',
    groups: ['editor', 'author'],
  },
  {
    user: 'reviewer',
    preferredUsername: 'reviewer',
    email: '',
    groups: ['reviewer'],
  },
]

/**
 * @param {string} userName
 * @returns
 */
export function canChangeDocument(userName) {
  return users.find((u) => u.user === userName)?.groups.includes('editor')
}

/**
 * @param {object} params
 * @param {string} params.userName
 * @param {string} params.workflowState
 */
export function canCreateVersion({ userName, workflowState }) {
  const user = users.find((u) => u.user === userName)
  return user?.groups.includes('editor') && workflowState === 'Published'
}

/**
 * @param {string} userName
 * @returns
 */
export function canDeleteDocument(userName) {
  return users.find((u) => u.user === userName)?.groups.includes('editor')
}

/**
 * @param {string} [userName]
 * @returns
 */
export function getGetAdvisoriesResponse(userName) {
  return getAdvisories().map((advisory) => ({
    advisoryId: advisory.advisoryId,
    workflowState: advisory.workflowState,
    documentTrackingId: advisory.documentTrackingId,
    title: advisory.title,
    owner: advisory.owner,
    changeable:
      typeof userName === 'string' ? canChangeDocument(userName) : true,
    deletable:
      typeof userName === 'string' ? canDeleteDocument(userName) : true,
    canCreateVersion:
      typeof userName === 'string'
        ? canCreateVersion({ userName, workflowState: advisory.workflowState })
        : false,
    allowedStateChanges: advisory.allowedStateChanges,
  }))
}

export function getAdvisories() {
  return testsSample.advisories
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @returns
 */
export function getAdvisory({ advisoryId }) {
  const advisory = testsSample.advisories.find(
    (a) => a.advisoryId === advisoryId,
  )
  if (!advisory) throw new Error('Advisory not found')
  return advisory
}

export function getCreateAdvisoryResponse() {
  return {
    id: '9690e3a3-614f-44be-8709-3aa8d58b6cb5',
    revision: '2-efaa5db9409b2d4300535c70aaf6a66b',
  }
}

export function getTemplates() {
  return templates
}

export function getGetTemplatesResponse() {
  return templates.map((t) => ({
    templateId: t.templateId,
    templateDescription: t.templateDescription,
  }))
}

/**
 * @param {object} params
 * @param {{ templateContent: {} }} params.template
 */
export function getGetTemplateContentResponse({ template }) {
  return template.templateContent
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} [params.userName]
 */
export function getGetAdvisoryDetailResponse({ advisoryId, userName }) {
  const res = testsSample.advisories.find((a) => a.advisoryId === advisoryId)
  if (!res) throw new Error('Advisory not found')
  return {
    ...res,
    changeable: userName ? canChangeDocument(userName) : res.changeable,
  }
}

/**
 * @param {(typeof users)[number]} user
 */
export function getUserInfo(user) {
  return user
}

export function getUsers() {
  return users
}
