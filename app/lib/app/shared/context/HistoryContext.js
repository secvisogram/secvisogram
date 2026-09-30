import React from 'react'

/**
 * @typedef {object} HistoryContext
 * @property {URL} location
 * @property {any} state
 * @property {(url: string | URL) => void} pushState
 * @property {(url: string | URL) => void} replaceState
 */

/** @type {HistoryContext} */
const defaultValue = {
  location: new URL(window.location.href),
  state: null,
  pushState: (url) => window.history.pushState(null, '', url),
  replaceState: (url) => window.history.replaceState(null, '', url),
}

export default React.createContext(defaultValue)
