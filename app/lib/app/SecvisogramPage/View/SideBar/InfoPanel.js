import React, { useEffect } from 'react'

import ReactMarkdown from 'react-markdown'
import metadata from '../../../../../scripts/importUiMetaData/metaData.js'

/**
 * Defines the content of the SideBar displaying documentation of a selected path
 *
 * @param {{
 *   selectedPath: string[]
 * }} props
 */
export default function InfoPanel({ selectedPath }) {
  const [mdText, setMdText] = React.useState('')

  const updateMarkdownText = (/** @type string */ mdPath) => {
    if (mdPath) {
      fetch(mdPath)
        .then((resp) => resp.text())
        .then((mdText) => {
          setMdText(mdText)
        })
    }
  }

  useEffect(() => {
    if (!selectedPath.length) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setMdText('')
    }

    const jsonPath = `$.${selectedPath.join('.')}`.replaceAll(/\.\d+/g, '')
    if (jsonPath in metadata) {
      // @ts-ignore
      const meta = metadata[jsonPath]
      updateMarkdownText(meta.userDocumentation.usage)
    }
  }, [selectedPath])

  return (
    <article className="prose p-3" data-testid="infoPanel-content">
      <ReactMarkdown
        components={{
          h1: 'strong',
          h2: 'strong',
          h3: 'strong',
          h4: 'strong',
          h5: 'strong',
          h6: 'strong',
          a: ({ href, children }) => {
            const linkText = children[0]
            if (href?.startsWith('http')) {
              return (
                <a href={href} target="_blank" rel="noreferrer">
                  {linkText}
                </a>
              )
            }
            return (
              <a
                className="cursor-pointer"
                onClick={() => updateMarkdownText('/docs/user/' + href)}
              >
                {linkText}
              </a>
            )
          },
        }}
      >
        {mdText}
      </ReactMarkdown>
    </article>
  )
}
