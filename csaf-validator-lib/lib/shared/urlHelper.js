import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const referenceSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    category: { type: 'string' },
    url: { type: 'string' },
  },
})
const validateReference = ajv.compile(referenceSchema)

/**
 * Convert the tracking id to apply the csaf filename conventions
 * - The value trackingId is converted into lower case
 * - Any character sequence which is not part of one of the following groups MUST be replaced by a single underscore (_)
 *   Lower case ASCII letters (0x61 - 0x7A)
 *   digits (0x30 - 0x39)
 *   special characters: + (0x2B), - (0x2D)
 * @param  {string} trackingId
 * @return {string}
 */
export function convertTrackingIdToFilename(trackingId) {
  return trackingId.toLowerCase().replace(/[^+\-a-z0-9]+/g, '_')
}

/**
 * Checks whether a reference contains a canonical URL
 * It works for CSAF 2.0 and CSAF 2.1
 * A canonical URL fulfills all the following:
 * - It has the category self
 * - The url starts with https://
 * - The url ends with the valid filename for the CSAF document
 * A filename must apply the following rules
 * - The value trackingId is converted into lower case
 * - Any character sequence which is not part of one of the following groups MUST be replaced by a single underscore (_)
 *   Lower case ASCII letters (0x61 - 0x7A)
 *   digits (0x30 - 0x39)
 *   special characters: + (0x2B), - (0x2D)
 * - The file extension .json MUST be appended.
 * @param {{url?: string, category?: string}} reference
 * @param {string} trackingId
 * @return {boolean}
 */
export function isCanonicalUrl(reference, trackingId) {
  return (
    validateReference(reference) &&
    reference.category === 'self' &&
    reference.url !== undefined &&
    reference.url.startsWith('https://') &&
    reference.url.endsWith(convertTrackingIdToFilename(trackingId) + '.json')
  )
}
