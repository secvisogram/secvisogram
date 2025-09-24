import Ajv from 'ajv/dist/jtd.js'

/**
 * The max uuid to check the sharing_group.id for.
 */
const MAX_UUID = 'ffffffff-ffff-ffff-ffff-ffffffffffff'

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
        distribution: {
          additionalProperties: true,
          properties: {
            sharing_group: {
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                },
              },
            },
          },
          optionalProperties: {
            tlp: {
              additionalProperties: true,
              optionalProperties: {
                label: { type: 'string' },
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
 * This implements the mandatory test 6.1.38 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_38(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test ran and is
    finally returned by the function.
   */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) return ctx

  if (
    doc.document.distribution.sharing_group.id === MAX_UUID &&
    doc.document.distribution.tlp?.label !== 'CLEAR'
  ) {
    ctx.isValid = false
    ctx.errors.push({
      instancePath: '/document/distribution/tlp/label',
      message: `the sharing group uses the Max UUID but the CSAF document is not labeled as TLP:CLEAR`,
    })
  }

  return ctx
}
