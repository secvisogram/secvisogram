import React from 'react'
import { GenericEditor } from './FormEditor/editors.js'
import * as schemas from './FormEditor/editors/schemas/all.js'
import DocumentEditorContext from './shared/DocumentEditorContext.js'

export default function FormEditorTab() {
  //TODO: This is a workaround to get the schema for the current version
  const { doc } = React.useContext(DocumentEditorContext)
  const version = doc.document?.csaf_version ?? '2.0'
  const index = /** @type {keyof typeof import('../shared/types').Property} */ `csaf_${version.replaceAll(
    '.',
    '_'
  )}`

  const property = schemas[index]

  return (
    <div className="flex h-full w-full grow">
      <GenericEditor
        parentProperty={null}
        property={property}
        instancePath={[]}
        enable_last_rev_hist_item={false}
      />
    </div>
  )
}
