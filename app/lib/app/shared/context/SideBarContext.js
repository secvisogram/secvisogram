import React from 'react'

/**
 * @typedef {object} SideBarContext
 * @property {boolean} sideBarIsOpen
 * @property {(value: boolean) => void} setSideBarIsOpen
 * @property {string[]} sideBarSelectedPath
 * @property {(selectedPath: string[]) => void} setSideBarSelectedPath
 * @property {'errors' | 'comments' | 'documentation'} sideBarContent
 * @property {(content: 'errors' | 'comments' | 'documentation') => void} setSideBarContent
 */

/** @type {SideBarContext} */
const defaultValue = {
  sideBarIsOpen: false,
  setSideBarIsOpen: (() => {}),
  sideBarSelectedPath: ([]),
  setSideBarSelectedPath: (() => {}),
  sideBarContent: 'errors',
  setSideBarContent: (() => {}),
}

export default React.createContext(defaultValue)
