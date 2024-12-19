/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_26(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (typeof doc.document?.category === 'string') {
    /** @type {string} */
    const category = doc.document.category
    const profileValues = [
      'csaf_base',
      'csaf_security_incident_response',
      'csaf_informational_advisory',
      'csaf_security_advisory',
      'csaf_vex',
    ]
    const otherProfileValues = [
      'securityincidentresponse',
      'informationaladvisory',
      'securityadvisory',
      'vex',
    ]

    // Skip test if profile is not "CSAF Base" but one of the other profiles or matches exactly "csaf_base"
    if (profileValues.includes(category)) return { errors, isValid }

    // Fail on reserved prefix
    if (category.toLowerCase().startsWith('csaf_')) {
      isValid = false
      errors.push({
        instancePath: `/document/category`,
        message: `reserved prefix used`,
      })

      return { errors, isValid }
    }

    // Fail on name similarity
    if (
      otherProfileValues.includes(
        category.replace(/[_-\s]+/g, '').toLowerCase()
      )
    ) {
      isValid = false
      errors.push({
        instancePath: `/document/category`,
        message: `value prohibited`,
      })
    }
  }

  return { errors, isValid }
}
