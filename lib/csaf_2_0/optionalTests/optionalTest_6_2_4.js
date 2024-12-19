import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,

  properties: {
    document: {
      additionalProperties: true,
      properties: {
        tracking: {
          additionalProperties: true,
          properties: {
            revision_history: {
              elements: { additionalProperties: true, properties: {} },
            },
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
export default function optionalTest_6_2_4(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  doc.document.tracking.revision_history?.forEach(
    (revisionHistoryItem, revisionHistoryItemIndex) => {
      const { number } = revisionHistoryItem
      if (typeof number === 'string' && number.includes('+')) {
        warnings.push({
          message: 'build metadata in revision history',
          instancePath: `/document/tracking/revision_history/${revisionHistoryItemIndex}/number`,
        })
      }
    }
  )

  return context
}
