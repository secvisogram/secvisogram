import React from 'react'
import DocumentEditorContext from '../shared/DocumentEditorContext.js'
import WizardContext from '../WizzardEditorTab/WizardPanel/shared/WizardContext.js'

/**
 * Defines the content of the side bar displaying errors for a selected path
 *
 * @param {{
 *   selectedPath: string[]
 * }} props
 */
export default function ErrorPanel({ selectedPath }) {
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)
  const { setSelectedPath } = React.useContext(WizardContext)

  const errorsUnderPath = errors.filter((error) =>
    error.instancePath.startsWith(selectedPath.join("/"))
  )

  return (
    <div>
      <h1 className='mb-4 text-xl font-bold'>
        {errorsUnderPath.length} errors for {selectedPath.join('/')}
      </h1>
      {errorsUnderPath.map((err, i) => {
        const color =
          err.type === 'error'
            ? 'red'
            : err.type === 'warning'
            ? 'yellow'
            : 'blue'
        const colorCls = 'border-' + color + '-600 bg-' + color + '-400'
        const targetPath = err.instancePath.split('/').slice(1)
        return (
          <div
            key={i}
            className={'p-2 m-1 rounded border cursor-pointer ' + colorCls}
            onClick={() => setSelectedPath(targetPath)}
          >
            <b>{err.instancePath}</b>: {err.message}
          </div>
        )
      })}
    </div>
  )
}
