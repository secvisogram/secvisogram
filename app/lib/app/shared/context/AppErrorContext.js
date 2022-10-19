import React from 'react'

export default React.createContext({
  applicationError: /** @type {{ message: string, color?: string } | null} */ (null),
  handleError(/** @type {{ message: string, color?: string } | null} */ error) {
    throw error
  },
})
