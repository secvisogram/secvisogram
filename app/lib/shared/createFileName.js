import { get } from 'lodash'

/**
 * @param {{}} doc
 * @param {boolean} isValid
 * @param {string} extension
 */
export default function (doc, isValid, extension) {
  let trackingId = `${get(doc, 'document.tracking.id', '')}`
  if (trackingId.trim().length === 0) {
    trackingId = 'csaf_2_0'
  } else {
    trackingId = trackingId.toLowerCase().replace(/([^+\-a-z0-9]+)/gi, '_')
  }
  const fileName = `${trackingId}${isValid ? '' : '_invalid'}.${extension}`
  return fileName
}
