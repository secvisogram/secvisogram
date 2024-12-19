import * as docUtils from './shared/docUtils.js'

const { findMissingDefinitions, collectGroupIds } = docUtils

/**
 * @typedef {Object} FullProductName
 * @property {string} name
 * @property {string} product_id
 */

/**
 * @typedef {Object} Branch
 * @property {Array<Branch>} branches
 * @property {FullProductName} product
 */

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_4(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const groupIds = collectGroupIds({ document: doc })
  const groupIdRefs = collectGroupIdRefs({ document: doc })
  const missingGroupDefinitions = findMissingDefinitions(groupIds, groupIdRefs)
  if (missingGroupDefinitions.length > 0) {
    isValid = false
    missingGroupDefinitions.forEach((missingGroupDefinition) => {
      errors.push({
        message: 'definition of group id missing',
        instancePath: missingGroupDefinition.instancePath,
      })
    })
  }

  return { isValid, errors }
}

/**
 * This method collects references to group ids and corresponding instancePaths in the given document and returns a result object.
 * @param {any} document
 * @returns {{id: string, instancePath: string}[]}
 */
function collectGroupIdRefs({ document }) {
  const entries = /** @type {{id: string, instancePath: string}[]} */ ([])

  const vulnerabilities = document.vulnerabilities
  if (vulnerabilities) {
    for (let i = 0; i < vulnerabilities.length; ++i) {
      const vulnerability = vulnerabilities[i]
      collectGroupRefsInRemediations(
        `/vulnerabilities/${i}/remediations`,
        vulnerability,
        entries
      )
      collectGroupRefsInThreats(
        `/vulnerabilities/${i}/threats`,
        vulnerability,
        entries
      )
    }
  }

  return entries
}

/**
 * @param {string} instancePath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInRemediations = (
  instancePath,
  vulnerability,
  entries
) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const groupIds = remediation.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              instancePath: `${instancePath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} instancePath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInThreats = (instancePath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const groupIds = threat.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              instancePath: `${instancePath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}
