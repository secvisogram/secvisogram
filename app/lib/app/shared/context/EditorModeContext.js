import React from 'react'

/**
 * @typedef {object} EditorModeContext
 * @property {boolean} embedded Whether the editor is embedded in a host page
 *   that owns the document lifecycle.
 */

export default React.createContext(
  /** @type {EditorModeContext} */ ({ embedded: false }),
)
