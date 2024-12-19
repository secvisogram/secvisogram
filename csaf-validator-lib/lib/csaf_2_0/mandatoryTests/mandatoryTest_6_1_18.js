import semver from 'semver'
import * as docUtils from './shared/docUtils.js'

const { valid, major } = semver
const {
  hasTrackingVersionField,
  hasTrackingStatusField,
  hasTrackingRevisionHistory,
} = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_18(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    hasTrackingRevisionHistory(doc) &&
    (doc.document.tracking.status === 'final' ||
      doc.document.tracking.status === 'interim') &&
    doc.document.tracking.revision_history.some(
      (h) => h.number === '0' || (valid(h.number) && major(h.number) === 0)
    )
  ) {
    isValid = false
    errors.push({
      message:
        'some revision-history entries are not compatible with the status',
      instancePath: '/document/tracking/status',
    })
  }

  return { errors, isValid }
}
