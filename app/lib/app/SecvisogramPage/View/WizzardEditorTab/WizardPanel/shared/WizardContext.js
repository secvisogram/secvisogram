import React from 'react'

export default React.createContext({
  selectedPath: /** @type {string[]} */ ([]),
  setSelectedPath: /** @type {(selectedPath: string[]) => void} */ (() => {}),
})
