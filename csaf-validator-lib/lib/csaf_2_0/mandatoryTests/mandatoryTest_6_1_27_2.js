/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_27_2(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const checkedDocumentCategories = new Set([
    'csaf_security_incident_response',
    'csaf_informational_advisory',
  ])

  if (!checkedDocumentCategories.has(doc.document?.category))
    return { errors, isValid }

  /**
   * @typedef {object} Reference
   * @property {unknown} category
   */

  const mandatoryReferenceCategories = new Set(['external'])

  isValid =
    Array.isArray(doc.document?.references) &&
    /** @type {Reference[]} */ (doc.document.references).some((r) =>
      mandatoryReferenceCategories.has(/** @type {string} */ (r.category))
    )

  if (!isValid) {
    errors.push({
      instancePath: '/document/references',
      message:
        'need at least one document reference with the category "external"',
    })
  }
  return { errors, isValid }
}
