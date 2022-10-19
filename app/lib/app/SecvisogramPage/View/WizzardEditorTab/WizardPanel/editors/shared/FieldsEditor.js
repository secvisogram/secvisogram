import React from 'react'
import { GenericEditor } from '../../editors.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property[]} props.fieldProperties
 * @param {string[]} props.instancePath
 */
export default function FieldsEditor({ fieldProperties, instancePath }) {
  return (
    <div className="border flex flex-col gap-1 p-2">
      {fieldProperties?.map((property) => (
        <GenericEditor
          key={property.key}
          property={property}
          instancePath={instancePath.concat([property.key])}
        />
      ))}
    </div>
  )
}
