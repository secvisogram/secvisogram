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
        distribution: {
          additionalProperties: true,
          properties: {
            tlp: {
              additionalProperties: true,
              properties: {
                label: { type: 'string' },
              },
            },
          },
        },
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
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          disclosure_date: { type: 'string' },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.45 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_45(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }
  if (!validate(doc)) {
    return ctx
  }
  const status = doc.document.tracking.status
  const tlpLabel = doc.document.distribution.tlp.label
  if (!(tlpLabel === 'CLEAR' && (status === 'final' || status === 'interim'))) {
    return ctx
  }

  const revisionHistory = doc.document.tracking?.revision_history
  // sort the revision history (descending) and save the newest entry
  const newestRevisionHistoryItem = revisionHistory
    .filter((item) => item.date !== undefined)
    .sort((a, b) =>
      compareZonedDateTimes(
        /** @type {string} */ (b.date),
        /** @type {string} */ (a.date)
      )
    )[0]

  doc.vulnerabilities?.forEach((vulnerability, vulnerabilityIndex) => {
    const disclosureDate = vulnerability.disclosure_date
    // compare the disclosure date with the date of the newest item in the revision history
    if (
      disclosureDate &&
      compareZonedDateTimes(
        disclosureDate,
        /** @type {string} */ (newestRevisionHistoryItem.date)
      ) > 0
    ) {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `/vulnerabilities/${vulnerabilityIndex}/disclosure_date`,
        message: `the "status" is ${status}, but the "disclosure date" is newer than the date of the newest item of the revision_history`,
      })
    }
  })

  return ctx
}
