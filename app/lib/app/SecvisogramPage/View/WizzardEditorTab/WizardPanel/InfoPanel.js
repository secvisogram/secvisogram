import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { marked } from 'marked'

import metadata from '../../../../../../../data/metaData2.json'

/**
 * Defines the content of the side bar displaying documentation of a selected path
 *
 * @param {{
 *   selectedPath: string
 * }} props
 */
export default function InfoPanel({ selectedPath }) {
  const [mdText, setMdText] = useState('')

  const getRenderedMarkdown = () => {
    if (selectedPath) {
      const meta = metadata[`$.${selectedPath}`]
      const usage_path = meta.user_documentation.usage.generic
      fetch(usage_path)
        .then((resp) => resp.text())
        .then(
          (mdText) => setMdText(mdText)
        )
    }
  }

  useEffect(getRenderedMarkdown, [selectedPath])

  return (
    <>
      <button
        type="button"
        onClick={() =>
          document.getElementById('iframe').contentWindow.history.back()
        }
      >
        <FontAwesomeIcon className="fa-1x" icon={faArrowLeft} /> Back
      </button>
      ||
      <button
        type="button"
        onClick={() =>
          document.getElementById('iframe').contentWindow.history.forward()
        }
      >
        Forward <FontAwesomeIcon className="fa-1x" icon={faArrowRight} />
      </button>
      <iframe id="iframe" className="w-full h-full" srcDoc={mdText} />
    </>
  )
}
