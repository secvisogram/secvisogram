import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import renderedMarkdown from "../../../../../../../docs/user/vulnerabilities/vulnerability-spec.en.md"

/**
 * Defines the collapsible help panel of the wizzard view
 *
 * @param {{
 *   selectedPath: string,
 *   closeHandler: () => void
 * }} props
 */
export default function HelpPanel({selectedPath, closeHandler}) {
  return (
    (
      <div className="p-3 w-1/5 bg-white border border-l-4">
        <div className="helpContent" dangerouslySetInnerHTML={{ __html: renderedMarkdown }}/>
        <div className="p-3 absolute inset-y-0 right-0">
          <button
            onClick={closeHandler}
          >
            <FontAwesomeIcon className="fa-2x" icon={faWindowClose}/>
          </button>
        </div>
      </div>)
  )
}
