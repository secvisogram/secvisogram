import Ajv from 'ajv/dist/jtd.js'
import { compareZonedDateTimes } from '../../lib/shared/dateHelper.js'

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
              elements: {
                additionalProperties: true,
                optionalProperties: {
                  date: { type: 'string' },
                  number: { type: 'string' },
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
 * @param {any} doc
 */
export function recommendedTest_6_2_21(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  const revisionHistory = doc.document.tracking.revision_history
  for (let i = 0; i < revisionHistory.length - 1; i++) {
    if (revisionHistory[i].date) {
      for (let j = i + 1; j < revisionHistory.length; j++) {
        if (revisionHistory[j].date) {
          if (
            compareZonedDateTimes(
              /**@type {string} */ (revisionHistory[i].date),
              /**@type {string} */ (revisionHistory[j].date)
            ) === 0
          ) {
            warnings.push({
              instancePath: `/document/tracking/revision_history/${j}/date`,
              message:
                `the timestamps of the revision history items with version number ` +
                `${revisionHistory[i].number} ` +
                `and ${revisionHistory[j].number} are equal`,
            })
          }
        }
      }
    }
  }
  return context
}
