/**
 * @param {string} content
 * @param {string} fileName
 * @param {string} type
 */
export default function downloadFile(
  content,
  fileName,
  type = 'application/json'
) {
  try {
    const string = btoa(unescape(encodeURIComponent(content)))
    const dataURI = `data:${type};base64,${string}`
    const element = window.document.createElement('a')
    element.download = fileName
    element.href = dataURI
    element.click()
  } catch (/** @type {any} */ e) {
    alert('An error occurred while serializing the download:\n\n' + e.message)
  }
}
