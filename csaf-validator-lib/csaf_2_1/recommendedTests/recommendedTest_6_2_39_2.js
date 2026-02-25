import Ajv from 'ajv/dist/jtd.js'
import {
  containsOneNoteWithTitleAndCategory,
  getTranslationInDocumentLang,
  isLangSpecifiedAndNotEnglish,
} from '../../lib/shared/languageSpecificTranslation.js'

const ajv = new Ajv()

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        category: { type: 'string' },
      },
      optionalProperties: {
        lang: {
          type: 'string',
        },
        notes: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              category: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
})

const validateSchema = ajv.compile(inputSchema)

/**
 * If the document language is specified but not English, it MUST be tested that exactly one item in document
 * notes exists that has the language specific translation of the term Reasoning for Withdrawal as title.
 * The category of this item MUST be description. If no language-specific translation has been recorded,
 * the test MUST be skipped and output an information to the user that no such translation is known.
 *
 * @param {unknown} doc
 */
export function recommendedTest_6_2_39_2(doc) {
  /*
      The `ctx` variable holds the state that is accumulated during the test run and is
      finally returned by the function.
     */
  /** @type { {warnings: Array<{ message: string; instancePath: string }>;
   * infos: Array<{ message: string; instancePath: string }>}} */
  const ctx = {
    warnings: [],
    infos: [],
  }

  const noteCategory = 'description'

  if (!validateSchema(doc) || doc.document.category !== 'csaf_withdrawn') {
    return ctx
  }

  const withdrawalInDocLang = getTranslationInDocumentLang(
    doc,
    'reasoning_for_withdrawal'
  )
  if (!withdrawalInDocLang) {
    ctx.infos.push({
      instancePath: '/document/notes',
      message:
        'no language specific translation for "Reasoning for Withdrawal" has been recorded',
    })
    return ctx
  }

  if (isLangSpecifiedAndNotEnglish(doc.document.lang)) {
    const notes = doc.document.notes
    if (
      !notes ||
      !containsOneNoteWithTitleAndCategory(
        notes,
        withdrawalInDocLang,
        noteCategory
      )
    ) {
      ctx.warnings.push({
        instancePath: '/document/notes',
        message:
          `for document category "csaf_withdrawn" exactly one note must exist ` +
          `with note category "${noteCategory}" and title "${withdrawalInDocLang}"`,
      })
    }
  }

  return ctx
}
