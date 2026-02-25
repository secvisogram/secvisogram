import { t } from 'i18next'
import React from 'react'
import DocumentEditorContext from '../shared/DocumentEditorContext.js'
import SelectedPathContext from '../shared/context/SelectedPathContext.js'

/**
 * Defines the content of the sideBar displaying errors for a selected path
 *
 * @param {{
 *   sideBarSelectedPath: string[]
 * }} props
 */
export default function ErrorPanel({ sideBarSelectedPath }) {
  const { errors } = React.useContext(DocumentEditorContext)
  const { selectedPath, setSelectedPath } =
    React.useContext(SelectedPathContext)

  const selectedPathAsString = '/' + selectedPath.join('/')
  const sideBarSelectedPathAsString = '/' + sideBarSelectedPath.join('/')
  const errorsUnderPath = sideBarSelectedPath.length
    ? errors.filter((error) => {
        return (
          error.instancePath === sideBarSelectedPathAsString ||
          (error.instancePath.startsWith(sideBarSelectedPathAsString) &&
            error.instancePath
              .slice(sideBarSelectedPathAsString.length)
              .includes('/'))
        )
      })
    : errors

  return (
    <>
      <div className="w-full px-4 pt-2">
        {sideBarSelectedPath.length
          ? t('sidebar.contextSpecificErrors') +
            ` (${sideBarSelectedPathAsString}):`
          : t('sidebar.allErrors')}
      </div>
      <div className="p-3" data-testid="error-cards">
        {errorsUnderPath.map((err, i) => {
          const color =
            err.type === 'error'
              ? 'border-red-800 bg-red-600/75'
              : err.type === 'warning'
                ? 'border-yellow-800 bg-yellow-600/75'
                : err.type === 'info'
                  ? 'border-blue-800 bg-blue-600/75'
                  : ''
          const highlight =
            selectedPathAsString === err.instancePath
              ? ' border-black border-2'
              : ''
          return (
            <div
              key={i}
              className={
                'p-2 m-1 rounded border hover:cursor-pointer ' +
                color +
                highlight
              }
              data-testid={`error_card-${err.instancePath}-${i}`}
              onClick={() =>
                setSelectedPath(err.instancePath.split('/').slice(1))
              }
            >
              <b>{err.instancePath}</b>: {err.message}
            </div>
          )
        })}
      </div>
    </>
  )
}
