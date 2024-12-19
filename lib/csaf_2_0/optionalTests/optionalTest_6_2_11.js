import Ajv from 'ajv/dist/jtd.js'

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

const referenceSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    category: { type: 'string' },
    url: { type: 'string' },
  },
})

const validate = ajv.compile(inputSchema)
const validateReference = ajv.compile(referenceSchema)

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

  const hasCanonicalURL = doc.document.references.some(
    (r) =>
      validateReference(r) &&
      r.category === 'self' &&
      r.url.startsWith('https://') &&
      r.url.endsWith(
        doc.document.tracking.id.toLowerCase().replace(/[^+\-a-z0-9]+/g, '_') +
          '.json'
      )
  )

  if (!hasCanonicalURL) {
    warn()
  }

  return ctx
}
