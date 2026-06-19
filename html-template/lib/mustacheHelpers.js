/**
 * Returns a Mustache lambda that removes the last trailing comma from rendered text.
 *
 * @returns {(text: string, render: (text: string) => string) => string}
 */
export function removeTrailingComma() {
  return function (/** @type {string} */ text, /** @type {function} */ render) {
    var textWithTrailingComma = /** @type {string} */ (render(text))
    const lastIndex = textWithTrailingComma.lastIndexOf(',')
    return lastIndex > 0
      ? textWithTrailingComma.substring(0, lastIndex)
      : textWithTrailingComma
  }
}

/**
 * Returns a Mustache lambda that capitalises the first character of rendered text.
 *
 * @returns {(text: string, render: (text: string) => string) => string}
 */
export function upperCase() {
  return function (/** @type {string} */ text, /** @type {function} */ render) {
    var renderedText = /** @type {string} */ (render(text))
    return renderedText.charAt(0).toUpperCase() + renderedText.slice(1)
  }
}

/**
 * Returns a Mustache lambda that replaces all underscores with spaces in rendered text.
 *
 * @returns {(text: string, render: (text: string) => string) => string}
 */
export function replaceUnderscores() {
  return function (/** @type {string} */ text, /** @type {function} */ render) {
    var renderedText = /** @type {string} */ (render(text))
    return renderedText.replaceAll('_', ' ')
  }
}

/**
 * Returns a Mustache lambda that emits a safe `href="…"` attribute for the rendered URL,
 * or an empty string when the URL scheme is not on the allow-list.
 *
 * @returns {(text: string, render: (text: string) => string) => string}
 */
export function secureHref() {
  return function (/** @type {string} */ text, /** @type {function} */ render) {
    const href = render(text)
    let isValid = false

    const validStarts = ['#', 'mailto', 'tel', 'http', 'ftp']
    const validMimeTypes = [
      'image/png;base64,',
      'image/jpeg;base64,',
      'image/gif;base64,',
    ].map((x) => x.replaceAll('/', '&#x2F;'))
    validStarts.forEach((x) => (isValid = isValid || href.startsWith(x)))
    const isBase64 = (/** @type {string} */ value) =>
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
        value,
      )
    validMimeTypes.forEach((mimeType) => {
      const isValidDataHref =
        href.startsWith(`data:${mimeType}`) &&
        isBase64(href.split(',')[1]?.replaceAll('&#x3D;', '='))
      isValid = isValid || isValidDataHref
    })

    return isValid ? `href="${href}"` : ''
  }
}
