import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import * as api from './shared/api.js'
import AppConfigContext from './shared/context/AppConfigContext.js'
import AppErrorContext from './shared/context/AppErrorContext.js'
import HistoryContext from './shared/context/HistoryContext.js'
import UserInfoContext from './shared/context/UserInfoContext.js'
import SideBarContext from './shared/context/SideBarContext.js'

/**
 * @param {object} props
 * @param {JSX.Element} props.secvisogramPage
 * @returns
 */
export default function App({ secvisogramPage }) {
  const history = useHistory()

  const defaultAppConfig = React.useContext(AppConfigContext)
  const [appConfig, setAppConfig] = useState(defaultAppConfig)

  useEffect(() => {
    api.appConfig.getAppConfig().then((response) => setAppConfig(response))
  }, [])

  const defaultUserInfo = React.useContext(UserInfoContext)
  const [userInfo, setUserInfo] = useState(defaultUserInfo)

  const [applicationError, setApplicationError] = React.useState(
    /** @type {React.ContextType<typeof AppErrorContext>} */ ({
      applicationError: null,
      handleError(error) {
        setApplicationError((state) => ({ ...state, applicationError: error }))
      },
    })
  )

  const [sideBarIsOpen, setSideBarIsOpen] = React.useState(
    /** @type {boolean} */ false
  )
  const [sideBarSelectedPath, setSideBarSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )
  const [sideBarContent, setSideBarContent] = React.useState(
    /** @type {'errors' | 'comments' | 'documentation'} */ ('errors')
  )
  const sideBarData = {
    sideBarIsOpen,
    setSideBarIsOpen,
    sideBarSelectedPath,
    setSideBarSelectedPath,
    sideBarContent,
    setSideBarContent,
  }

  useEffect(() => {
    if (appConfig.loginAvailable) {
      api.auth
        .getUserInfo(appConfig.userInfoUrl)
        .then(
          (result) => {
            setUserInfo(result)
          },
          (error) => {
            if (401 !== error.status) throw error
            setUserInfo(null)
          }
        )
        .catch(applicationError.handleError)
    } else {
      setUserInfo(null)
    }
  }, [
    applicationError.handleError,
    appConfig.loginAvailable,
    appConfig.userInfoUrl,
  ])

  return (
    <SideBarContext.Provider value={sideBarData}>
      <AppErrorContext.Provider value={applicationError}>
        <AppConfigContext.Provider value={appConfig}>
          <UserInfoContext.Provider value={userInfo}>
            <HistoryContext.Provider value={history}>
              <ErrorBoundary FallbackComponent={ErrorScreen}>
                {secvisogramPage}
              </ErrorBoundary>
            </HistoryContext.Provider>
          </UserInfoContext.Provider>
        </AppConfigContext.Provider>
      </AppErrorContext.Provider>
    </SideBarContext.Provider>
  )
}
