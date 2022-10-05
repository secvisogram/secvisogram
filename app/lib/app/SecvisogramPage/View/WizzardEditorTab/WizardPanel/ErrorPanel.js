import React from "react";
import DocumentEditorContext from "../../shared/DocumentEditorContext.js";

/**
 * Defines the content of the side bar displaying errors for a selected path
 *
 * @param {{
 *   selectedPath: string
 * }} props
 */
export default function ErrorPanel({selectedPath}) {

  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)

  const errorsForPath = errors.filter((error) => error.instancePath === selectedPath)

  return (
    <>
      {errorsForPath.map((error, i) => (
        <div key={i}>
          <b>{error.instancePath}</b>: {error.message}
        </div>
      ))}
    </>
  )
}