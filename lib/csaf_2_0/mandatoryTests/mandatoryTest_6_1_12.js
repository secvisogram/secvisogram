import bcpLanguageTagChecker from '../../shared/bcpLanguageTagChecker.js'

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_12(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (hasLangField(doc) && !bcpLanguageTagChecker(doc.document.lang)) {
    isValid = false
    errors.push({
      message: 'is not a valid language-tag',
      instancePath: '/document/lang',
    })
  }

  if (hasSourceLangField(doc)) {
    if (!bcpLanguageTagChecker(doc.document.source_lang)) {
      isValid = false
      errors.push({
        message: 'is not a valid language-tag',
        instancePath: '/document/source_lang',
      })
    }
  }

  return { errors, isValid }
}

/**
 * @param {any} doc
 * @returns {doc is { document: { lang: string } }}
 */
const hasLangField = (doc) =>
  doc && doc.document && typeof doc.document.lang === 'string' ? true : false

/**
 * @param {any} doc
 * @returns {doc is { document: { source_lang: string } }}
 */
const hasSourceLangField = (doc) =>
  doc && doc.document && typeof doc.document.source_lang === 'string'
    ? true
    : false
