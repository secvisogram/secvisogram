import { isPrivateLanguage } from '../../shared/bcpLanguageTagChecker.js'

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_14(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (
    typeof doc.document?.lang === 'string' &&
    isPrivateLanguage(doc.document.lang)
  ) {
    ctx.warnings.push({
      instancePath: '/document/lang',
      message: 'use of private language',
    })
  }

  if (
    typeof doc.document?.source_lang === 'string' &&
    isPrivateLanguage(doc.document.source_lang)
  ) {
    ctx.warnings.push({
      instancePath: '/document/source_lang',
      message: 'use of private language',
    })
  }

  return ctx
}
