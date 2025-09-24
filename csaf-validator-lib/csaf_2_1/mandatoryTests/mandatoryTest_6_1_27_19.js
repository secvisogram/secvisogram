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
        references: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              category: {
                type: 'string',
              },
              summary: {
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
 * This implements the mandatory test 6.1.27.19 of the CSAF 2.1 standard.
 *
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_27_19(doc) {
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

  const summaryTitle = 'Superseding Document'

  const supersessionReferences =
    // Here we filter and map the document references in one step using `flatMap`
    // to avoid double looping through the note array. The category is
    // not yet included in the filtering since it is checked below for each note
    // individually to improve the error messages.
    doc.document.references?.flatMap((r, i) =>
      r.summary?.startsWith(summaryTitle) ? { reference: r, index: i } : []
    ) ?? []

  if (!supersessionReferences.length) {
    ctx.isValid = false
    ctx.errors.push({
      instancePath: `/document/references`,
      message: `needs at least one entry that has a summary starting with "${summaryTitle}"`,
    })
  }

  for (const { reference, index } of supersessionReferences) {
    if (reference.category !== 'external') {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `/document/references/${index}`,
        message: `the category of a "${summaryTitle}" reference must be "external"`,
      })
    }
  }

  return ctx
}
