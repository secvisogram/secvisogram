import Ajv from 'ajv/dist/jtd.js'
import bcp47 from 'bcp47'

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
        category: {
          type: 'string',
        },
      },
      optionalProperties: {
        lang: { type: 'string' },
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

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.27.18 of the CSAF 2.1 standard.
 *
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_27_18(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test ran and is
    finally returned by the function.
   */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (
    !validate(doc) ||
    doc.document.category !== 'csaf_superseded' ||
    //
    // The spec says that this test is activated only for documents with the language
    // english. Or if the language is unspecified.
    (doc.document.lang &&
      bcp47.parse(doc.document.lang)?.langtag.language.language !== 'en')
  )
    return ctx

  const reasonTitle = 'Reasoning for Supersession'

  const supersessionNotes =
    // Here we filter and map the document notes in one step using `flatMap`
    // to avoid double looping through the note array. The category is
    // not yet included in the filtering since it is checked below for each note
    // individually to improve the error messages.
    doc.document.notes?.flatMap((n, i) =>
      n.title === reasonTitle ? { note: n, index: i } : []
    ) ?? []

  if (supersessionNotes.length !== 1) {
    ctx.isValid = false
    ctx.errors.push({
      instancePath: `/document/notes`,
      message: `needs exactly one entry with the title "${reasonTitle}"`,
    })
  }

  for (const { note, index } of supersessionNotes) {
    if (note.category !== 'description') {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `/document/notes/${index}`,
        message: `the category of the "${reasonTitle}" note must be "description"`,
      })
    }
  }

  return ctx
}
