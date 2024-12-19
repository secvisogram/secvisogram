import semver from 'semver'
import * as docUtils from './shared/docUtils.js'

const { valid, major, prerelease } = semver
const { hasTrackingVersionField, hasTrackingStatusField } = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_17(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    doc.document.tracking.status !== 'draft' &&
    (doc.document.tracking.version === '0' ||
      (valid(doc.document.tracking.version) &&
        (major(doc.document.tracking.version) === 0 ||
          prerelease(doc.document.tracking.version))))
  ) {
    isValid = false
    errors.push({
      message: 'the status is not compatible with the version',
      instancePath: '/document/tracking/status',
    })
  }

  return { errors, isValid }
}
