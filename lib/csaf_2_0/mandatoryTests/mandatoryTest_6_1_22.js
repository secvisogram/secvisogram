import * as docUtils from './shared/docUtils.js'

const {
  hasTrackingVersionField,
  hasTrackingStatusField,
  hasTrackingRevisionHistory,
} = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_22(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    hasTrackingRevisionHistory(doc)
  ) {
    /** @type {Record<string, number[]>} */
    let dupes = {}
    doc.document.tracking.revision_history.forEach((item, index) => {
      dupes[item.number] = dupes[item.number] ?? []
      dupes[item.number].push(index)
      if (dupes[item.number].length > 1) {
        isValid = false
        errors.push({
          message: 'version was already used',
          instancePath: `/document/tracking/revision_history/${index}/number`,
        })
      }
    })
  }

  return { errors, isValid }
}
