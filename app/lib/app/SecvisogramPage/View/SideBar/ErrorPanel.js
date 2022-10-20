import React from 'react'
import DocumentEditorContext from '../shared/DocumentEditorContext.js'

/**
 * Defines the content of the side bar displaying errors for a selected path
 *
 * @param {{
 *   selectedPath: string
 * }} props
 */
export default function ErrorPanel({ selectedPath }) {
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)

  const errorsUnderPath = errors.filter((error) =>
    error.instancePath.startsWith(selectedPath)
  )

  return (
    <div>
      <h1
        className={
          'mb-4 text-xl font-bold ' +
          (errorsUnderPath.length === 0 ? 'text-green-500' : 'text-red-500')
        }
      >
        {errorsUnderPath.length} errors for {selectedPath}
      </h1>
      {errorsUnderPath.map((error, i) => (
        <div key={i}>
          <b>{error.instancePath}</b>: {error.message}
        </div>
      ))}
    </div>
  )
}
