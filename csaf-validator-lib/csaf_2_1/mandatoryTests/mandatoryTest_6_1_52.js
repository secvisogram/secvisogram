import Ajv from 'ajv/dist/jtd.js'
import { compareZonedDateTimes } from '../../lib/shared/dateHelper.js'

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
          first_known_exploitation_dates: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                date: { type: 'string' },
                exploitation_date: { type: 'string' },
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
 * This implements the mandatory test 6.1.52 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_52(doc) {
  /*
      The `ctx` variable holds the state that is accumulated during the test ran and is
      finally returned by the function.
      */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }
  const status = doc.document.tracking.status
  if (status !== 'final' && status !== 'interim') {
    return ctx
  }

  const newestRevisionHistoryItem = doc.document.tracking.revision_history
    .filter((item) => item.date != null)
    .sort((a, z) =>
      compareZonedDateTimes(
        /** @type {string} */ (z.date),
        /** @type {string} */ (a.date)
      )
    )[0]

  doc.vulnerabilities?.forEach((vulnerability, vulnerabilityIndex) => {
    const exploitDate = vulnerability.first_known_exploitation_dates || []
    exploitDate.forEach((exploit, exploitIdx) => {
      const date = exploit.date
      const exploitationDate = exploit.exploitation_date
      if (
        newestRevisionHistoryItem &&
        compareZonedDateTimes(
          /** @type {string} */ (newestRevisionHistoryItem.date),
          /** @type {string} */ (date)
        ) < 0
      ) {
        ctx.isValid = false
        ctx.errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/first_known_exploitation_dates/${exploitIdx}/date`,
          message: `the status is ${status}, but the "date" of the First Known Exploitation Dates is newer than the newest revision history date`,
        })
      }
      if (
        newestRevisionHistoryItem &&
        compareZonedDateTimes(
          /** @type {string} */ (newestRevisionHistoryItem.date),
          /** @type {string} */ (exploitationDate)
        ) < 0
      ) {
        ctx.isValid = false
        ctx.errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/first_known_exploitation_dates/${exploitIdx}/exploitation_date`,
          message: `the status is ${status}, but the "exploitation_date" of the First Known Exploitation Dates is newer than the newest revision history date`,
        })
      }
    })
  })

  return ctx
}
