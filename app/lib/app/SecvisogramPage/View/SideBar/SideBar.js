import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from 'i18next'
import React from 'react'
import SideBarContext from '../shared/context/SideBarContext.js'
import ErrorPanel from './ErrorPanel.js'
import InfoPanel from './InfoPanel.js'

/**
 * @param {object} props
 * @param {import('#lib/uiSchemas.js').UiSchemaVersion} props.uiSchemaVersion
 */
export default function SideBar({ uiSchemaVersion }) {
  const sideBarData = React.useContext(SideBarContext)

  return (
    <>
      <div className="flex h-full bg-gray-200 border-l border-gray-400 menu-shadow">
        {sideBarData.sideBarIsOpen ? (
          <div className="w-72 bg-gray-200 overflow-auto border-r border-gray-300">
            {sideBarData.sideBarContent === 'ERRORS' ? (
              <ErrorPanel
                sideBarSelectedPath={sideBarData.sideBarSelectedPath}
              />
            ) : sideBarData.sideBarContent === 'DOCUMENTATION' ? (
              <InfoPanel
                selectedPath={sideBarData.sideBarSelectedPath}
                uiSchemaVersion={uiSchemaVersion}
              />
            ) : null}
          </div>
        ) : null}
        <div className="flex-col">
          {[
            { targetString: 'ERRORS', icon: faExclamationTriangle },
            { targetString: 'DOCUMENTATION', icon: faFileLines },
          ].map(({ targetString, icon }) => (
            <div key={targetString}>
              <button
                data-testid={`sideBar-${targetString}-button`}
                className={
                  'p-3 w-full hover:bg-gray-300 ' +
                  (sideBarData.sideBarIsOpen &&
                  sideBarData.sideBarContent === targetString
                    ? 'bg-gray-300'
                    : '')
                }
                onClick={() => {
                  sideBarData.setSideBarContent(targetString)
                  sideBarData.setSideBarIsOpen(true)
                }}
              >
                <FontAwesomeIcon className="fa-2x" icon={icon} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-auto h-12 w-full col-start-2 col-end-2 border-l border-gray-400 menu-shadow"
        onClick={() => sideBarData.setSideBarIsOpen(!sideBarData.sideBarIsOpen)}
      >
        <button className="w-full h-full bg-gray-200 hover:bg-gray-300">
          {sideBarData.sideBarIsOpen ? (
            <>
              <FontAwesomeIcon className="fa-xs" icon={faAngleDoubleRight} />{' '}
              {t('sidebar.collapseSidebar')}
            </>
          ) : (
            <FontAwesomeIcon className="fa-xs" icon={faAngleDoubleLeft} />
          )}
        </button>
      </div>
    </>
  )
}
