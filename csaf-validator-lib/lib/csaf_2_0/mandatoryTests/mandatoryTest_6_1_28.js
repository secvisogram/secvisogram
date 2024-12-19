/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_28(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (
    typeof doc.document?.source_lang === 'string' &&
    typeof doc.document?.lang === 'string' &&
    doc.document.source_lang === doc.document.lang
  ) {
    isValid = false
    errors.push(
      {
        instancePath: `/document/lang`,
        message: 'is the same as `/document/source_lang`',
      },
      {
        instancePath: `/document/source_lang`,
        message: 'is the same as `/document/lang`',
      }
    )
  }

  return { isValid, errors }
}
