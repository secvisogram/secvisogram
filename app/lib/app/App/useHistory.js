import React from 'react'

/**
 * @param {object} params
 * @param {boolean} [params.embedded] Specifies if the editor is in embedded or standalone mode
 *
 *    **Embedded mode**: The editor does not register on location changes and does not
 *      modify the browser history.
 *
 *    **Standalone mode**: The editor reads the url and changes it when the history
 *      changes.
 * @returns
 */
export default function useHistory({ embedded = false }) {
  const defaultLocation = new URL(window.location.href)

  if (embedded) {
    // In embedded mode no search param is derived.
    defaultLocation.search = ''
  }

  const [history, setHistory] = React.useState(
    /** @satisfies {import('../shared/context/HistoryContext').HistoryContext} */ ({
      location: defaultLocation,
      state: window.history.state,
      pushState: (url) => {
        const newUrl = new URL(url, window.location.href)
        if (!embedded) {
          window.history.pushState(null, '', newUrl)
        }
        setHistory((state) => ({
          ...state,
          state: window.history.state,
          location: newUrl,
        }))
      },
      replaceState: (url) => {
        const newUrl = new URL(url, window.location.href)
        if (!embedded) {
          window.history.replaceState(null, '', newUrl)
        }
        setHistory((state) => ({
          ...state,
          state: window.history.state,
          location: newUrl,
        }))
      },
    }),
  )

  React.useEffect(() => {
    if (embedded) return

    /**
     * @param {PopStateEvent} event
     */
    function handler(event) {
      setHistory((state) => ({
        ...state,
        location: new URL(window.location.href),
        state: event.state,
      }))
    }

    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [embedded])

  return history
}
