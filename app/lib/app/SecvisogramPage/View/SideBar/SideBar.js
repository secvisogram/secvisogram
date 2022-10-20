import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faComment,
  faExclamationTriangle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import ErrorPanel from "./ErrorPanel.js";
import InfoPanel from "./InfoPanel.js";
import CommentPanel from "./CommentPanel.js";
import React from "react";
import SideBarContext from "../../../shared/context/SideBarContext.js";

export default function SideBar() {

  const sideBarData = React.useContext(SideBarContext)

  return <>
    <div className="flex justify-center items-center w-3 bg-gray-300 border-l border-black">
        <button onClick={() => sideBarData.setSideBarIsOpen(!sideBarData.sideBarIsOpen)}>
          <FontAwesomeIcon className="fa-xs" icon={sideBarData.sideBarIsOpen ? faAngleDoubleRight : faAngleDoubleLeft} />
        </button>
    </div>
    {sideBarData.sideBarIsOpen ?
      (<div className="w-96 bg-gray-300 p-1.5">
        <div className="flex justify-evenly bg-gray-300">
          {[
            { targetString: 'ERRORS', icon: faExclamationTriangle },
            { targetString: 'COMMENTS', icon: faComment },
            { targetString: 'INFO', icon: faInfoCircle },
          ].map((tup) => (
            <div key={tup.targetString}>
              <button
                className={'p-3 ' + (sideBarData.sideBarContent === tup.targetString ? 'bg-gray-200 rounded-t-lg' : '')}
                onClick={() => {sideBarData.setSideBarContent(tup.targetString)}}
              >
                <FontAwesomeIcon className="fa-2x" icon={tup.icon} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-3 relative w-full bg-gray-200 rounded-lg">
          {sideBarData.sideBarContent === 'ERRORS' ? (
            <ErrorPanel selectedPath={sideBarData.sideBarSelectedPath} />
          ) : sideBarData.sideBarContent === 'COMMENTS' ? (
            <CommentPanel selectedPath={sideBarData.sideBarSelectedPath} />
          ) : sideBarData.sideBarContent === 'INFO' ? (
            <InfoPanel selectedPath={sideBarData.sideBarSelectedPath} />
          ) : null}
        </div>
      </div>) :
      null
    }
  </>
}
