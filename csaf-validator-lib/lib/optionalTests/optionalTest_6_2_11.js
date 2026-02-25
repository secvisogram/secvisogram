import Ajv from 'ajv/dist/jtd.js'
import { isCanonicalUrl } from '../shared/urlHelper.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        references: {
          elements: {
            additionalProperties: true,
            properties: {},
          },
        },

        tracking: {
          additionalProperties: true,
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_11(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  function warn() {
    ctx.warnings.push({
      message: 'missing canonical url',
      instancePath: '/document/references',
    })
  }

  if (!validate(doc)) {
    warn()
    return ctx
  }

  const hasCanonicalURL = doc.document.references.some((reference) =>
    isCanonicalUrl(reference, doc.document.tracking.id)
  )

  if (!hasCanonicalURL) {
    warn()
  }

  return ctx
}
