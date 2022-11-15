import React from 'react'
import DocumentEditorContext from '../shared/DocumentEditorContext.js'

/**
 * Defines the content of the sideBar displaying errors for a selected path
 *
 * @param {{
 *   selectedPath: string[]
 * }} props
 */
export default function ErrorPanel({ selectedPath }) {
  const { errors } = React.useContext(DocumentEditorContext)

  const errorsUnderPath = errors.filter((error) =>
    error.instancePath.startsWith('/' + selectedPath.join('/'))
  )

  return (
    <>
      {errorsUnderPath.map((err, i) => {
        const color =
          err.type === 'error'
            ? 'border-red-600 bg-red-400'
            : err.type === 'warning'
            ? 'border-yellow-600 bg-yellow-400'
            : err.type === 'info'
            ? 'border-blue-600 bg-blue-400'
            : ''
        return (
          <div key={i} className={'p-2 m-1 rounded border ' + color}>
            <b>{err.instancePath}</b>: {err.message}
          </div>
        )
      })}
    </>
  )
}