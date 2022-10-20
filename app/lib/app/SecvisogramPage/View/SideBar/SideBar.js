import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faExclamationTriangle, faQuestionCircle, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import ErrorPanel from "./ErrorPanel.js";
import InfoPanel from "./InfoPanel.js";
import CommentPanel from "./CommentPanel.js";
import React from "react";
import SideBarContext from "../../../shared/context/SideBarContext.js";

export default function SideBar() {

  const sideBarData = React.useContext(SideBarContext)

  return <>
    {sideBarData.sideBarIsOpen ? (
      <div className="p-3 relative w-1/5 bg-gray-200 border border-l-4">
        <div className="p-3 absolute right-0 top-0">
          <button onClick={() => sideBarData.setSideBarIsOpen(false)}>
            <FontAwesomeIcon className="fa-1x" icon={faWindowClose} />
          </button>
        </div>
        {sideBarData.sideBarContent === 'errors' ? (
          <ErrorPanel selectedPath={'/' + sideBarData.sideBarSelectedPath.join('/')} />
        ) : sideBarData.sideBarContent === 'documentation' ? (
          <InfoPanel selectedPath={sideBarData.sideBarSelectedPath.join('.')} />
        ) : sideBarData.sideBarContent === 'comments' ? (
          <CommentPanel selectedPath={sideBarData.sideBarSelectedPath.join('.')} />
        ) : null}
      </div>
    ) : null}
    <div className="flex flex-col bg-gray-300">
      {[
        { targetString: 'errors', icon: faExclamationTriangle },
        { targetString: 'documentation', icon: faQuestionCircle },
        { targetString: 'comments', icon: faComment },
      ].map((tup) => (
        <>
          <button
            className={
              'p-3 ' +
              (sideBarData.sideBarContent === tup.targetString ? 'bg-gray-200' : '')
            }
            onClick={() => {
              sideBarData.setSideBarContent(tup.targetString)
            }}
          >
            <FontAwesomeIcon className="fa-2x" icon={tup.icon} />
          </button>
        </>
      ))}
    </div>
  </>
}