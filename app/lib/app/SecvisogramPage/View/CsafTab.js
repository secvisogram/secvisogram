import {
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

/**
 * @typedef {Array<{ instancePath: string; message: string; error: boolean }>} StrippedPathArray
 */

/**
 * Defines the layout of the csaf tab.
 *
 * @param {{
 *  stripResult: {
 *    strippedPaths: Array<{ instancePath: string; message: string; error: boolean }>
 *    doc: {}
 *  } | null
 *  onStrip(): void
 *   onExport(): void
 * }} props
 */
export default function CsafTab({ stripResult, onStrip }) {
  /**
   * Strips the document initially.
   */
  React.useEffect(() => {
    onStrip()
  }, [onStrip])

  let hasErrors = stripResult && stripResult.strippedPaths.length > 0

  return (
    <div className="csaf-document flex h-full mr-3 bg-white">
      <div className="p-3 w-full">
        <div className={'relative ' + (hasErrors ? 'h-4/5' : 'h-full')}>
          <section className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white flex flex-col">
            {stripResult === null ? (
              <div>Loading data ...</div>
            ) : (
              <div className="h-full border overflow-auto">
                <pre className="text-sm whitespace-pre-wrap p-3">
                  {JSON.stringify(stripResult.doc, null, 2)}
                </pre>
              </div>
            )}
          </section>
        </div>
        <div
          className={
            'overflow-auto p-3 border border-red-600 bg-red-200 ' +
            (hasErrors ? 'h-1/5' : 'hidden')
          }
        >
          <div className="flex justify-between items-start h-full">
            <div className="pr-4">
              <h2 className="text-xl font-bold">
                Empty or invalid <br /> elements removed:
              </h2>
            </div>
            <div className="mx-2 flex-grow overflow-auto h-full">
              {stripResult?.strippedPaths.map((strippedPath, i) => (
                <div key={i}>
                  <b>{strippedPath.instancePath}</b>: {strippedPath.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pl-3 pr-6 py-6 w-72 flex flex-col justify-between">
        <div className="flex flex-col"></div>
        <div className="flex flex-col">
          <h2 className="mb-4 text-xl font-bold">Validation Status</h2>
          {hasErrors ? (
            <div>
              <div className="mb-4 flex justify-between">
                <span className="text-6xl text-red-500 font-bold">
                  {stripResult?.strippedPaths.length}
                </span>
                <FontAwesomeIcon
                  className="text-6xl text-red-500"
                  icon={faExclamationTriangle}
                />
              </div>
              <div className="h-9 text-gray-500">
                <span>validation issues</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <FontAwesomeIcon
                  className="text-6xl text-green-500"
                  icon={faCheckCircle}
                />
              </div>
              <div className="h-9" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
