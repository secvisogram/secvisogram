import React from 'react'
import { uiSchemas } from '../../../uiSchemas.js'
import { GenericEditor } from './FormEditor/editors.js'

/**
 * @typedef {object} Props
 * @property {import('#lib/uiSchemas.js').UiSchemaVersion} schemaVersion
 */

/**
 * @type {React.FC<Props>}
 */
export const FormEditorTab = ({ schemaVersion }) => {
  const property = uiSchemas[schemaVersion].content

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
