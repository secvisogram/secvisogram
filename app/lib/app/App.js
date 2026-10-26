import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import * as api from './shared/api.js'
import AppConfigContext from './shared/context/AppConfigContext.js'
import AppErrorContext from './shared/context/AppErrorContext.js'
import HistoryContext from './shared/context/HistoryContext.js'
import UserInfoContext from './shared/context/UserInfoContext.js'

/**
 * @param {object} props
 * @param {React.JSX.Element} props.secvisogramPage
 * @param {boolean} [props.embedded] Embedded editors neither fetch an app
 *   configuration nor talk to the CMS backend.
 * @param {string} [props.validatorUrl] Only used if `embedded`.
 * @returns
 */
export default function App({ secvisogramPage, embedded, validatorUrl }) {
  const defaultAppConfig = React.useContext(AppConfigContext)
  const [fetchedAppConfig, setAppConfig] = useState(defaultAppConfig)
  const embeddedAppConfig = React.useMemo(
    () => ({
      ...defaultAppConfig,
      validatorUrl: validatorUrl ?? '',
      configLoaded: true,
    }),
    [defaultAppConfig, validatorUrl],
  )
  const appConfig = embedded ? embeddedAppConfig : fetchedAppConfig
  const history = useHistory({ embedded })

  useEffect(() => {
    if (embedded) return
    api.appConfig.getAppConfig().then((response) => {
      const mergedConfig = {
        ...defaultAppConfig,
        ...response,
        configLoaded: true,
      }
      setAppConfig(mergedConfig)
    })
  }, [defaultAppConfig, embedded])

  const defaultUserInfo = React.useContext(UserInfoContext)
  const [userInfo, setUserInfo] = useState(defaultUserInfo)

  const [applicationError, setApplicationError] = React.useState(
    /** @type {React.ContextType<typeof AppErrorContext>} */ ({
      applicationError: null,
      handleError(error) {
        setApplicationError((state) => ({ ...state, applicationError: error }))
      },
    }),
  )

  useEffect(() => {
    if (!appConfig.loginAvailable) return
    api.auth
      .getUserInfo(appConfig.userInfoUrl)
      .then(
        (result) => {
          setUserInfo(result)
        },
        (error) => {
          if (401 !== error.status) throw error
          setUserInfo(null)
        },
      )
      .catch(applicationError.handleError)
  }, [
    applicationError.handleError,
    appConfig.loginAvailable,
    appConfig.userInfoUrl,
  ])

  /**
   * There is no user when login is not available, regardless of what the
   * last fetch (if any) resolved to.
   */
  const effectiveUserInfo = appConfig.loginAvailable ? userInfo : null

  return (
    <AppErrorContext.Provider value={applicationError}>
      <AppConfigContext.Provider value={appConfig}>
        <UserInfoContext.Provider value={effectiveUserInfo}>
          <HistoryContext.Provider value={history}>
            <ErrorBoundary FallbackComponent={ErrorScreen}>
              {secvisogramPage}
            </ErrorBoundary>
          </HistoryContext.Provider>
        </UserInfoContext.Provider>
      </AppConfigContext.Provider>
    </AppErrorContext.Provider>
  )
}
