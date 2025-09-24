import Ajv from 'ajv/dist/jtd.js'
import { MAX_UUID, NIL_UUID } from '../sharingGroup.js'

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
          optionalProperties: {
            sharing_group: {
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                },
              },
            },
            tlp: {
              additionalProperties: true,
              optionalProperties: {
                label: { type: 'string' },
              },
            },
          },
        },
      },
      optionalProperties: {
        tracking: {
          additionalProperties: true,
          optionalProperties: {
            status: { type: 'string' },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.39 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_39(doc) {
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

  const sharingGroupId = doc.document.distribution.sharing_group?.id

  if (
    /*
      It MUST be tested that a CSAF document with the TLP label CLEAR use the Max UUID as sharing
      group ID if any. The test SHALL pass if no sharing group is present or the Nil UUID is used
      and the document status is draft.
     */
    doc.document.distribution.tlp?.label === 'CLEAR' &&
    typeof sharingGroupId === 'string' &&
    sharingGroupId !== MAX_UUID &&
    !(sharingGroupId === NIL_UUID && doc.document.tracking?.status === 'draft')
  ) {
    ctx.isValid = false
    ctx.errors.push({
      instancePath: '/document/distribution/sharing_group/id',
      message: `the sharing group is present for the TLP:CLEAR document but it differs from the Max UUID`,
    })
  }

  return ctx
}
