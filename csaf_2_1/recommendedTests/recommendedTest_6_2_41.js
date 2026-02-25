import Ajv from 'ajv/dist/jtd.js'
import { compareZonedDateTimes } from '../dateHelper.js'

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
                },
              },
            },
            status: { type: 'string' },
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          metrics: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                content: {
                  additionalProperties: true,
                  optionalProperties: {
                    epss: {
                      additionalProperties: true,
                      optionalProperties: {
                        timestamp: { type: 'string' },
                      },
                    },
                  },
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
 * This implements the recommended test 6.2.41 of the CSAF 2.1 standard.
 *
 /**
 * @param {any} doc
 */
export function recommendedTest_6_2_41(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  const status = doc.document.tracking.status
  if (status !== 'final' && status !== 'interim') {
    return context
  }

  const newestRevisionHistoryItem = doc.document.tracking.revision_history
    .filter((item) => item.date != null)
    .sort((a, z) =>
      compareZonedDateTimes(
        /** @type {string} */ (z.date),
        /** @type {string} */ (a.date)
      )
    )[0]

  if (!newestRevisionHistoryItem || !newestRevisionHistoryItem.date) {
    return context
  }

  doc.vulnerabilities?.forEach((vulnerability, vulnerabilityIndex) => {
    /** @type {Array<{ content?: {epss?: {timestamp?: string}}}>} */
    const metrics = vulnerability.metrics || []
    const newestEpss = metrics
      .map((metric) => metric.content?.epss)
      .filter(
        /**
         * @returns {epss is { timestamp: string }}
         */
        (epss) => epss?.timestamp != null
      )
      .sort((a, z) => {
        return compareZonedDateTimes(z.timestamp, a.timestamp)
      })[0]

    if (
      !newestEpss ||
      !newestEpss.timestamp ||
      !newestRevisionHistoryItem ||
      !newestRevisionHistoryItem.date
    ) {
      return context
    }

    const revisionDateObj = new Date(newestRevisionHistoryItem.date)
    const epssDateObj = new Date(newestEpss.timestamp)

    // difference in milliseconds
    const diffInMs = revisionDateObj.getTime() - epssDateObj.getTime()
    // 15 days in milliseconds
    const fifteenDaysMs = 15 * 24 * 60 * 60 * 1000

    if (diffInMs > fifteenDaysMs) {
      context.warnings.push({
        instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/content/epss/timestamp`,
        message:
          `the status is ${status}, but the EPSS "timestamp:" ${newestEpss.timestamp} is more than 15 days ` +
          `older than the newest "revision history date:" ${newestRevisionHistoryItem.date}`,
      })
    }
  })

  return context
}
