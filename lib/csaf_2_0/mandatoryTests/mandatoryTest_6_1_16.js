import { compareZonedDateTimes } from '../../shared/dateHelper.js'
import * as docUtils from './shared/docUtils.js'

const {
  hasTrackingRevisionHistory,
  hasTrackingVersionField,
  hasTrackingStatusField,
} = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_16(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingRevisionHistory(doc) &&
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    doc.document.tracking.revision_history.length > 0
  ) {
    /**
     * @param {string} version
     * @returns
     */
    const normalizeVersion = (version) =>
      doc.document.tracking.status == 'draft'
        ? version.split(/[+-]/)[0]
        : version.split('+')[0]

    if (
      normalizeVersion(
        doc.document.tracking.revision_history
          .slice()
          .sort(
            (a, z) =>
              compareZonedDateTimes(
                /** @type {string} */(z.date),
                /** @type {string} */(a.date)
              ) || docUtils.compareVersions(a.number, z.number)
          )[0].number
      ) !== normalizeVersion(doc.document.tracking.version)
    ) {
      isValid = false
      errors.push({
        message: 'version does not match latest revision',
        instancePath: '/document/tracking/version',
      })
    }
  }

  return { errors, isValid }
}
