import React from 'react'
import FieldsEditor from './shared/FieldsEditor.js'

/**
 * @param {object} props
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function ObjectFieldsEditor({ property, instancePath }) {
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )

  return (
    <FieldsEditor
      fieldProperties={fieldProperties ?? []}
      instancePath={instancePath}
    />
  )
}
