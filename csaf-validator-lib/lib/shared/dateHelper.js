import { Duration, ZonedDateTime } from '@js-joda/core'

/**
 * compare ZonedDateTimes from js-joda
 * returns a negative number if a is less than b, positive if a is greater than b, and zero if they are equal.
 * This function also returns 0 if one of the given values could not be parsed.
 *
 * @param {ZonedDateTime | string} a
 * @param {ZonedDateTime | string} b
 * @returns {0|1|-1}
 *
 */
export const compareZonedDateTimes = (a, b) => {
  // catch js-joda exception if a or b can't be parsed
  try {
    const date1 = a instanceof ZonedDateTime ? a : ZonedDateTime.parse(a)
    const date2 = b instanceof ZonedDateTime ? b : ZonedDateTime.parse(b)
    const duration = Duration.between(date1, date2)

    // return number based on js sort function
    // > negative if a is less than b, positive if a is greater than b, and zero if they are equal.
    // [Sort Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn)
    if (duration.isZero()) {
      return 0
    } else if (duration.isNegative()) {
      return 1
    } else {
      return -1
    }
  } catch (e) {
    return 0
  }
}
