import semver from 'semver'
import * as docUtils from './shared/docUtils.js'

const { valid, prerelease } = semver
const { hasTrackingVersionField, hasTrackingStatusField } = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_20(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    (doc.document.tracking.status === 'final' ||
      doc.document.tracking.status === 'interim') &&
    valid(doc.document.tracking.version) &&
    prerelease(doc.document.tracking.version)
  ) {
    isValid = false
    errors.push({
      message: 'pre-release part is not allowed for status',
      instancePath: `/document/tracking/version`,
    })
  }

  return { errors, isValid }
}
