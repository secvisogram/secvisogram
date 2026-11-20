/**
 * Copies text to the clipboard. Falls back to a temporary textarea where the
 * async clipboard API is not available, e.g. in an insecure context.
 *
 * @param {string} text
 * @returns {Promise<boolean>} true if the text was copied
 */
export default async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // try the fallback
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}
