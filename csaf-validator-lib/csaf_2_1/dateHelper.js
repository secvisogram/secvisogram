import { Temporal } from 'temporal-polyfill'

/**
 * compare iso timestamps
 * returns a negative number if a is less than b, positive if a is greater than b, and zero if they are equal.
 * This function also returns 0 if one of the given values could not be parsed.
 *
 * @param {string} a
 * @param {string} b
 */
export const compareZonedDateTimes = (a, b) => {
  try {
    const duration = Temporal.Instant.from(b).until(Temporal.Instant.from(a))
    return duration.sign
  } catch (e) {
    return 0
  }
}

/**
 * This regex validates a date against RFC 3339 section 5.6.
 * See: https://datatracker.ietf.org/doc/html/rfc3339#section-5.6
 */
export const timestampRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

/**
 * Checks if the given string is a semantically correct timestamp (RFC 3339). With one
 * exception: It does not allow leap seconds.
 *
 * @param {string} v
 * @returns
 */
export const validateTimestamp = (v) => {
  try {
    // Temporal.Instant.from() throws an error if the date is invalid. But they
    // normalize the date if e.g. there are 60 seconds (leap second) ...
    Temporal.Instant.from(v)

    // ... To handle that case we additionally use the date constructor which
    // does not allow more than 59 seconds at all.
    if (Number.isNaN(new Date(v).getTime())) return false
    return true
  } catch (e) {
    return false
  }
}
