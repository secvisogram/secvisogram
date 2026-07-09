import React from 'react'
import HistoryContext from '../shared/context/HistoryContext.js'
import sitemap from '../shared/sitemap.js'

/**
 * Lets an advisory be opened directly via `/?advisoryId=<id>`, so external
 * systems (e.g. a CMS) can link straight to it. On load, it fetches the
 * advisory (if we're backend-connected) or just no-ops (if standalone), and
 * then redirects to the normal `?tab=EDITOR` URL.
 *
 * @param {object} params
 * @param {{ configLoaded: boolean, loginAvailable: boolean }} params.appConfig
 * @param {(args: { advisoryId: string }) => Promise<import('./shared/types.js').Advisory>} params.onLoadAdvisory
 * @param {(loading: boolean) => void} params.setLoading
 * @param {(advisoryState: import('./shared/types.js').AdvisoryState) => void} params.setAdvisoryState
 * @param {(error: { message: string, color?: string } | null) => void} params.handleError
 */
export default function useDirectAdvisoryLinkRedirect({
  appConfig,
  onLoadAdvisory,
  setLoading,
  setAdvisoryState,
  handleError,
}) {
  const { location, replaceState } = React.useContext(HistoryContext)

  const handledRef = React.useRef(false)
  React.useEffect(() => {
    if (!appConfig.configLoaded || handledRef.current) return
    const advisoryId = new URL(location.href).searchParams.get('advisoryId')
    handledRef.current = true
    if (!advisoryId) return
    if (appConfig.loginAvailable) {
      setLoading(true)
      onLoadAdvisory({ advisoryId })
        .then((advisory) => {
          setAdvisoryState({ type: 'ADVISORY', advisory })
        })
        .catch(handleError)
        .finally(() => {
          setLoading(false)
          replaceState(null, '', sitemap.home.href([['tab', 'EDITOR']]))
        })
    } else {
      replaceState(null, '', sitemap.home.href([['tab', 'EDITOR']]))
    }
  }, [
    appConfig.configLoaded,
    appConfig.loginAvailable,
    location,
    onLoadAdvisory,
    handleError,
    replaceState,
    setLoading,
    setAdvisoryState,
  ])
}
