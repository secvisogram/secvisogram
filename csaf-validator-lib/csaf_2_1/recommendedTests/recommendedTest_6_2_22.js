import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        title: { type: 'string' },
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
export function recommendedTest_6_2_22(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  const trackingId = doc.document.tracking.id
  const documentTitle = doc.document.title
  if (documentTitle.includes(trackingId)) {
    context.warnings.push({
      message: `document title contains the tracking id ${trackingId}`,
      instancePath: `/document/title`,
    })
  }

  return context
}
