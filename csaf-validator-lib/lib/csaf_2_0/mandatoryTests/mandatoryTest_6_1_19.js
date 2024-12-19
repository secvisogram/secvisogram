import semver from 'semver'
import * as docUtils from './shared/docUtils.js'

const { valid, prerelease } = semver
const {
  hasTrackingVersionField,
  hasTrackingStatusField,
  hasTrackingRevisionHistory,
} = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_19(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    hasTrackingRevisionHistory(doc)
  ) {
    for (let i = 0; i < doc.document.tracking.revision_history.length; ++i) {
      const entry = doc.document.tracking.revision_history[i]
      if (valid(entry.number) && prerelease(entry.number)) {
        isValid = false
        errors.push({
          message: 'contains prerelease part',
          instancePath: `/document/tracking/revision_history/${i}/number`,
        })
      }
    }
  }

  return { errors, isValid }
}
