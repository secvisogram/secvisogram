import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {marked} from "marked";

import metadata from "../../../../../../../data/metaData2.json"

/**
 * Defines the collapsible help panel of the wizzard view
 *
 * @param {{
 *   selectedPath: string,
 *   closeHandler: () => void
 * }} props
 */
export default function HelpPanel({selectedPath, closeHandler}) {

  const [mdText, setMdText] = useState("")

  const getRenderedMarkdown = () => {
    if (selectedPath) {
      const meta = metadata[`$.${selectedPath}`]
      const usage_path = meta.user_documentation.usage.generic
      fetch(usage_path).then(
        resp => resp.text()).then(mdText => setMdText(mdText)
      )
    }
  }

  useEffect(getRenderedMarkdown, [selectedPath])

  return (
    (
      <div className="p-3 w-1/5 bg-white border border-l-4">
        <div className="helpContent" dangerouslySetInnerHTML={{ __html: marked(mdText) }}/>
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
