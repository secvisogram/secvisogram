import React, { useEffect, useState } from 'react'
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
    <div
      className="helpContent"
      dangerouslySetInnerHTML={{ __html: marked(mdText) }}
    />
  )
}
