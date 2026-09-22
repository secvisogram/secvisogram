import { uiSchemas } from '#lib/uiSchemas.js'
import { t } from 'i18next'
import React, { useEffect } from 'react'

import ReactMarkdown from 'react-markdown'

/**
 * @param {string} mdPath
 * @returns {Promise<string>}
 */
function fetchMarkdown(mdPath) {
  return fetch(mdPath).then((resp) => {
    if (!resp.ok) {
      throw new Error(`Failed to load markdown file: ${mdPath}`)
    }
    return resp.text()
  })
}

/**
 * Defines the content of the SideBar displaying documentation of a selected path
 *
 * @param {object} props
 * @param {string[]} props.selectedPath
 * @param {import('#lib/uiSchemas').UiSchemaVersion} props.uiSchemaVersion
 */
export default function InfoPanel({ selectedPath, uiSchemaVersion }) {
  const { metaData } = uiSchemas[uiSchemaVersion]

  /**
   * The markdown file to load documentation from for the currently selected
   * path -- `null` if nothing is selected, `''` if something is selected but
   * has no authored usage documentation.
   */
  const usagePath = React.useMemo(() => {
    if (!selectedPath.length) return null
    const jsonPath = `$.${selectedPath.join('.')}`.replaceAll(/\.\d+/g, '')
    const meta = /** @type {typeof metaData[keyof metaData] | undefined} */ (
      Reflect.get(metaData, jsonPath)
    )
    return meta && 'userDocumentation' in meta && meta.userDocumentation.usage
      ? meta.userDocumentation.usage
      : ''
  }, [selectedPath, metaData])
  const noDocumentationAvailable = t('sidebar.noDocumentationAvailable')

  /**
   * Text shown while nothing is loading: either nothing (no path selected)
   * or the fallback message (a path is selected but has no authored usage
   * documentation).
   */
  const defaultMdText = usagePath === null ? '' : noDocumentationAvailable

  /**
   * Markdown text loaded either automatically for `usagePath` (below) or
   * manually by following a link inside the currently shown markdown (see
   * `updateMarkdownText`).
   */
  const [loadedMdText, setLoadedMdText] = React.useState(
    /** @type {string | null} */ (null),
  )
  // Discard any previously loaded markdown once the selected path's usage
  // documentation changes, so we don't show stale content from a previously
  // selected path while the new one loads.
  const [prevUsagePath, setPrevUsagePath] = React.useState(usagePath)
  if (usagePath !== prevUsagePath) {
    setPrevUsagePath(usagePath)
    setLoadedMdText(null)
  }
  const mdText = loadedMdText ?? defaultMdText

  const updateMarkdownText = (/** @type string */ mdPath) => {
    if (mdPath) {
      fetchMarkdown(mdPath)
        .then((mdText) => {
          setLoadedMdText(mdText)
        })
        .catch(() => {
          setLoadedMdText(noDocumentationAvailable)
        })
    }
  }

  useEffect(() => {
    if (!usagePath) return
    let active = true
    fetchMarkdown(usagePath)
      .then((mdText) => {
        if (active) setLoadedMdText(mdText)
      })
      .catch(() => {
        if (active) setLoadedMdText(noDocumentationAvailable)
      })
    return () => {
      active = false
    }
  }, [usagePath, noDocumentationAvailable])

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
            if (href?.startsWith('http')) {
              return (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              )
            }
            return (
              <a
                className="cursor-pointer"
                onClick={() => updateMarkdownText('/docs/user/' + href)}
              >
                {children}
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
