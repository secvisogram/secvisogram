/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_15(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    doc.document?.publisher?.category === 'translator' &&
    !doc.document.source_lang
  ) {
    isValid = false
    errors.push({
      instancePath: '/document/publisher/category',
      message: 'source language attribute is missing',
    })
  }

  return { isValid, errors }
}
