/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_27_11(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const checkedDocumentCategories = new Set([
    'csaf_security_advisory',
    'csaf_vex',
  ])

  if (!checkedDocumentCategories.has(doc.document?.category))
    return { errors, isValid }

  isValid = Boolean(doc.vulnerabilities)

  if (!isValid) {
    errors.push({
      instancePath: '/',
      message: 'needs vulnerabilities',
    })
  }
  return { errors, isValid }
}
