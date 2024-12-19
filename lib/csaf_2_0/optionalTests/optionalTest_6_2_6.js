import Ajv from 'ajv/dist/jtd.js'
import { compareZonedDateTimes } from '../../shared/dateHelper.js'

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
            current_release_date: { type: 'timestamp' },
            revision_history: {
              elements: {
                additionalProperties: true,
                properties: { date: { type: 'timestamp' } },
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
 * @param {any} doc
 */
export default function optionalTest_6_2_6(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  const newestRevisionHistoryItem = doc.document.tracking.revision_history
    .slice()
    .sort((a, z) =>
      compareZonedDateTimes(
        /** @type {string} */ (z.date),
        /** @type {string} */ (a.date)
      )
    )[0]
  if (
    newestRevisionHistoryItem &&
    compareZonedDateTimes(
      /** @type {string} */ (doc.document.tracking.current_release_date),
      /** @type {string} */ (newestRevisionHistoryItem.date)
    ) < 0
  ) {
    warnings.push({
      message: 'older current release date than revision history',
      instancePath: `/document/tracking/current_release_date`,
    })
  }

  return context
}
