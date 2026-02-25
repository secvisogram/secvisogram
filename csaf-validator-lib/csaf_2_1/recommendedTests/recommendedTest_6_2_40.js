import Ajv from 'ajv/dist/jtd.js'
import translations from '../../lib/language_specific_translation/translations.js'
import bcp47 from 'bcp47'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      optionalProperties: {
        lang: { type: 'string' },
        notes: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              category: { type: 'string' },
              title: { type: 'string' },
              group_ids: { elements: { type: 'string' } },
              product_ids: { elements: { type: 'string' } },
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * Checks if the document language is English or unspecified
 *
 * @param {string | undefined} language The language expression to check
 * @returns {boolean} True if the language is English or unspecified, false otherwise
 */
export function isLangEnglishOrUnspecified(language) {
  return !language || bcp47.parse(language)?.langtag.language.language === 'en'
}

/**
 * Get the language specific translation of the given i18nKey
 * @param {string } lang
 * @param {string} i18nKey
 * @returns {string | undefined} - The language specific translation of the `i18nKey`
 *                               - or undefined if the provided language could not be parsed as a BCP 47 tag
 *                               - or undefined if no translation of the `i18nKey` could be found
 */
export function getTranslationInDocumentLang(lang, i18nKey) {
  const language = bcp47.parse(lang)?.langtag.language.language

  /** @type {Record<string, Record <string,string>>}*/
  const translationByLang = translations.translation

  if (!language || !translationByLang[language]) {
    return undefined
  } else {
    return translationByLang[language][i18nKey]
  }
}

/**
 * Check if the given note item contains at least one of `group_ids` or `product_ids`
 * @param {{ group_ids?: string[]; product_ids?: string[]}} note
 * @return {boolean}
 */
export function containsNoteGroupIdOrProductId(note) {
  return !!(note.group_ids || note.product_ids)
}

/**
 * This implements the recommended test 6.2.40 of the CSAF 2.1 standard.
 *
 /**
 * @param {any} doc
 */
export function recommendedTest_6_2_40(doc) {
  /** @type { {warnings: Array<{ message: string; instancePath: string }>;
   * infos: Array<{ message: string; instancePath: string }>}} */
  const context = {
    warnings: [],
    infos: [],
  }

  if (!validate(doc)) {
    return context
  }
  const documentLanguage = doc.document.lang
  doc.document.notes?.forEach((note, noteIndex) => {
    if (note.category === 'description') {
      if (isLangEnglishOrUnspecified(documentLanguage)) {
        if (note.title?.startsWith('Product Description')) {
          if (!containsNoteGroupIdOrProductId(note)) {
            context.warnings.push({
              instancePath: `/document/notes/${noteIndex}`,
              message:
                'The given note item describes a product. Therefore, it must include one of the elements "group_id" or "product_id"',
            })
          }
        }
      } else {
        const translation = getTranslationInDocumentLang(
          /** @type {string} */ (
            documentLanguage
          ) /* This cast is allowed since the else statement is just called
           id documentLanguage is not undefined. Without the cast one must check here too
           if documentLanguage is not undefined, which would be a code fragment that is never used*/,
          'product_description'
        )
        if (!translation) {
          context.infos.push({
            instancePath: `/document/notes/${noteIndex}`,
            message:
              'no language specific translation for "product description" has been recorded',
          })
          return context
        }
        if (note.title?.startsWith(translation)) {
          if (!containsNoteGroupIdOrProductId(note)) {
            context.warnings.push({
              instancePath: `/document/notes/${noteIndex}`,
              message:
                'The given note item describes a product. Therefore, it must include one of the elements "group_id" or "product_id"',
            })
          }
        }
      }
    }
  })
  return context
}
