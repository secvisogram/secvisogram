import Ajv from 'ajv/dist/jtd.js'
import {
  MAX_UUID,
  NIL_UUID,
  NO_SHARING_ALLOWED,
  PUBLIC,
} from '../sharingGroup.js'

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
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.41 of the CSAF 2.1 standard.
 *
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_41(doc) {
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
  const sharingGroupName = doc.document.distribution.sharing_group?.name

  if (sharingGroupId === MAX_UUID && sharingGroupName !== PUBLIC) {
    ctx.isValid = false

    if (typeof sharingGroupName === 'string') {
      ctx.errors.push({
        instancePath: '/document/distribution/sharing_group/id',
        message: `the Max UUID is used but the sharing group name does not equal "${PUBLIC}"`,
      })
    } else {
      ctx.errors.push({
        instancePath: '/document/distribution/sharing_group/id',
        message: `the Max UUID is used but the sharing group name does not exist`,
      })
    }
  } else if (
    sharingGroupId === NIL_UUID &&
    sharingGroupName !== NO_SHARING_ALLOWED
  ) {
    ctx.isValid = false

    if (typeof sharingGroupName === 'string') {
      ctx.errors.push({
        instancePath: '/document/distribution/sharing_group/id',
        message: `the Nil UUID is used but the sharing group name does not equal "${NO_SHARING_ALLOWED}"`,
      })
    } else {
      ctx.errors.push({
        instancePath: '/document/distribution/sharing_group/id',
        message: `the Nil UUID is used but the sharing group name does not exist`,
      })
    }
  }

  return ctx
}
