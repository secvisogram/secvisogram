import React from 'react'

export default function useHistory() {
  const [history, setHistory] = React.useState({
    location: window.location,
    state: window.history.state,
    pushState: /** @type {History['pushState']} */ (
      (...args) => {
        window.history.pushState(...args)
        setHistory((state) => ({
          ...state,
          state: window.history.state,
          location: window.location,
        }))
      }
    ),
    replaceState: /** @type {History['replaceState']} */ (
      (...args) => {
        window.history.replaceState(...args)
        setHistory((state) => ({
          ...state,
          state: window.history.state,
          location: window.location,
        }))
      }
    ),
  })

  React.useEffect(() => {
    /**
     * @param {PopStateEvent} e
     */
    function handler(e) {
      setHistory((state) => ({
        ...state,
        location: window.location,
        state: e.state,
      }))
    }

    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
    }
  })

  return history
}
