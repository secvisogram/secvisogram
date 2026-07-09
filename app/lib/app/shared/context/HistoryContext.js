import React from 'react'

/**
 * @typedef {object} HistoryContext
 * @property {Location} location
 * @property {any} state
 * @property {History['pushState']} pushState
 * @property {History['replaceState']} replaceState
 */

/** @type {HistoryContext} */
const defaultValue = {
  location: window.location,
  state: null,
  pushState: window.history.pushState.bind(window.history),
  replaceState: window.history.replaceState.bind(window.history),
}

export default React.createContext(defaultValue)
