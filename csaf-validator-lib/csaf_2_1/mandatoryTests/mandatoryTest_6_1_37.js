import Ajv from 'ajv/dist/jtd.js'
import csafAjv from '../csafAjv.js'

const ajv = new Ajv()

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    document: {
      additionalProperties: true,
      optionalProperties: {
        tracking: {
          additionalProperties: true,
          optionalProperties: {
            generator: {
              additionalProperties: true,
              optionalProperties: {
                date: { type: 'string' },
              },
            },
            initial_release_date: { type: 'string' },
            current_release_date: { type: 'string' },
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
          discovery_date: { type: 'string' },
          flags: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                date: { type: 'string' },
              },
            },
          },
          involvements: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                date: { type: 'string' },
              },
            },
          },
          remediations: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                date: { type: 'string' },
              },
            },
          },
          threats: {
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
})

const validate = ajv.compile(inputSchema)

/**
 * This regex validates a date against RFC 3339 section 5.6.
 * See: https://datatracker.ietf.org/doc/html/rfc3339#section-5.6
 */
export const dateRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

/**
 * A json schema date validation function.
 *
 * @type {import('ajv').ValidateFunction<string>}
 */
const dateFn = csafAjv.compile({ type: 'string', format: 'date-time' })

/**
 * Validates the given date against RFC 3339 section 5.6.
 *
 * @param {string} date The date to validate
 */
export const isValidDate = (date) => {
  /*
    Here we first match against the date regex to catch format errors that
    ajv-formats does not catch (yet). Particularly if the 'T' separator is missing
    between the date and the time ajv does not recognize that.
   */
  if (!dateRegex.exec(date)) {
    return {
      isValid: /** @type {const} */ (false),
      error: /** @type {const} */ ('INVALID_FORMAT'),
    }
  }

  /*
    After the format check ajv is utilized to check the date semantically
    (including leap seconds).
   */
  if (!dateFn(date)) {
    return {
      isValid: /** @type {const} */ (false),
      error: /** @type {const} */ ('INVALID_DATE'),
    }
  }

  return { isValid: /** @type {const} */ (true), error: null }
}

/**
 * This implements the mandatory test 6.1.37 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_37(doc) {
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

  /**
   * This function validates the given date and generates and error on
   * `ctx` if it is not valid.
   *
   * @param {string | undefined} date The date to validate
   * @param {string} path The json path to the date
   */
  const validateDate = (date, path) => {
    if (date === undefined) return

    const result = isValidDate(date)
    if (!result.isValid) {
      ctx.errors.push({
        instancePath: path,
        message:
          result.error === 'INVALID_FORMAT'
            ? `invalid date format`
            : `invalid date`,
      })
      ctx.isValid = false
    }
  }

  validateDate(
    doc.document?.tracking?.generator?.date,
    '/document/tracking/generator/date'
  )
  validateDate(
    doc.document?.tracking?.initial_release_date,
    '/document/tracking/initial_release_date'
  )
  validateDate(
    doc.document?.tracking?.current_release_date,
    '/document/tracking/current_release_date'
  )

  doc.document?.tracking?.revision_history?.forEach((history, index) => {
    validateDate(
      history.date,
      `/document/tracking/revision_history/${index}/date`
    )
  })

  doc.vulnerabilities?.forEach((vulnerabiltiy, vulnerabilityIndex) => {
    const prefix = `/vulnerabilities/${vulnerabilityIndex}`

    validateDate(vulnerabiltiy.disclosure_date, `${prefix}/disclosure_date`)
    validateDate(vulnerabiltiy.discovery_date, `${prefix}/discovery_date`)

    vulnerabiltiy.flags?.forEach((flag, index) => {
      validateDate(flag.date, `${prefix}/flags/${index}/date`)
    })

    vulnerabiltiy.involvements?.forEach((involvement, index) => {
      validateDate(involvement.date, `${prefix}/involvements/${index}/date`)
    })

    vulnerabiltiy.remediations?.forEach((remediation, index) => {
      validateDate(remediation.date, `${prefix}/remediations/${index}/date`)
    })

    vulnerabiltiy.threats?.forEach((threat, index) => {
      validateDate(threat.date, `${prefix}/threats/${index}/date`)
    })
  })

  return ctx
}
