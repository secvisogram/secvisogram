import bcp47 from 'bcp47'
import translations from '../../lib/language_specific_translation/translations.js'

const csafTranslationMaps = new Map(
  Object.entries(translations.translation).map(([key, value]) => [
    key,
    new Map(Object.entries(value)),
  ])
)

/**
 * Checks if the document language is specified and not English
 *
 * @param {string | undefined} language - The language expression to check
 * @returns {boolean} False if language is English, true if the language is valid, false otherwise
 */
export function isLangSpecifiedAndNotEnglish(language) {
  return (
    !!language && !(bcp47.parse(language)?.langtag.language.language === 'en')
  )
}

/**
 *  test whether exactly one item in document notes exists that has the given title.
 *  and the given category.
 * @param {Array<{ category?: string | undefined; title?: string | undefined; }>} notes
 * @param {string} titleToFind
 * @param {string} category
 * @returns {boolean} True if the language is valid, false otherwise
 */
export function containsOneNoteWithTitleAndCategory(
  notes,
  titleToFind,
  category
) {
  return (
    notes.filter(
      (note) => note.category === category && note.title === titleToFind
    ).length === 1
  )
}

/**
 * Get the language specific translation of the given i18nKey
 * @param {{ document: { lang?: string; }; }} doc
 * @param {string} i18nKey
 */
export function getTranslationInDocumentLang(doc, i18nKey) {
  return doc.document.lang
    ? getTranslationInMap(doc.document.lang, i18nKey, csafTranslationMaps)
    : undefined
}

/**
 * Get the language specific translation of the given i18nKey in translationMaps
 * @param {string} langToTranslate
 * @param {string} i18nKey
 * @param {Map<string,Map<string,string>>} translationMaps
 */
export function getTranslationInMap(langToTranslate, i18nKey, translationMaps) {
  const langtag = bcp47.parse(langToTranslate)?.langtag
  const languageCode = langtag?.language.language
  let transMapForLanguage
  if (langtag && languageCode) {
    if (langtag.region) {
      if (langtag.script) {
        transMapForLanguage = translationMaps.get(
          `${languageCode}-${langtag.script}-${langtag.region}`
        )
      }
      transMapForLanguage =
        transMapForLanguage ??
        translationMaps.get(`${languageCode}-${langtag.region}`)
    }
    transMapForLanguage =
      transMapForLanguage ?? translationMaps.get(languageCode)
  }
  return transMapForLanguage?.get(i18nKey)
}
