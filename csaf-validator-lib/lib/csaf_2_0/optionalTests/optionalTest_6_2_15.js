/**
 * @param {any} doc
 */
export default function optionalTest_6_2_15(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  const defaultLanguage = 'i-default'

  if (doc.document?.lang === defaultLanguage) {
    ctx.warnings.push({
      instancePath: '/document/lang',
      message: 'use of default language',
    })
  }

  if (doc.document?.source_lang === defaultLanguage) {
    ctx.warnings.push({
      instancePath: '/document/source_lang',
      message: 'use of default language',
    })
  }

  return ctx
}
