import React from 'react'

/**
 * @typedef {object} SideBarContext
 * @property {boolean} sideBarIsOpen
 * @property {(value: boolean) => void} setSideBarIsOpen
 * @property {string[]} sideBarSelectedPath
 * @property {(selectedPath: string[]) => void} setSideBarSelectedPath
 * @property {'ERRORS' | 'COMMENTS' | 'INFO'} sideBarContent
 * @property {(content: 'ERRORS' | 'COMMENTS' | 'INFO') => void} setSideBarContent
 */

/** @type {SideBarContext} */
const defaultValue = {
  sideBarIsOpen: false,
  setSideBarIsOpen: (() => {}),
  sideBarSelectedPath: ([]),
  setSideBarSelectedPath: (() => {}),
  sideBarContent: 'ERRORS',
  setSideBarContent: (() => {}),
}

export default React.createContext(defaultValue)
