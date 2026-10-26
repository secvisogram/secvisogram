import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

/**
 *
 *
 * @param {{
 *  startCollapsed: boolean
 *  title: string
 *  children: string | React.JSX.Element | React.JSX.Element[]
 * }} props
 */
export default function Collapsible({ startCollapsed, title, children }) {
  const [isCollapsed, setIsCollapsed] = React.useState(startCollapsed)

  return (
    <div>
      <button
        className="border border-gray-400 py-1 px-2 bg-gray-50 hover:bg-gray-200 rounded w-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex justify-between ...">
          <div>{title}</div>
          <div>
            {isCollapsed ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <FontAwesomeIcon icon={faMinus} />
            )}
          </div>
        </div>
      </button>
      {!isCollapsed ? (
        <div className="flex flex-col border-x border-b border-gray-400 rounded-b p-4 -mt-1 w-full">
          {children}
        </div>
      ) : null}
    </div>
  )
}
