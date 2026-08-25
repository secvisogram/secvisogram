import React from 'react'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/**
 * @typedef {object} Props
 * @property {boolean} [required]
 * @property {boolean} [readOnly]
 * @property {boolean} value
 * @property {boolean} disabled
 */

/** @typedef {import('react').ComponentProps<typeof Attribute>} AttributeProps */

/**
 * @param {Props & AttributeProps} props
 */
export default function CheckboxAttribute({
  required = false,
  readOnly = false,
  value,
  disabled,
  ...props
}) {
  const { updateDoc } = React.useContext(DocumentEditorContext)
  return (
    <Attribute disabled={disabled} {...props}>
      <input
        className="w-[30px] h-[30px] border border-gray-400 py-1 px-2 shadow-inner rounded"
        checked={value}
        type={'checkbox'}
        required={required}
        readOnly={readOnly}
        onChange={() => {
          updateDoc(props.instancePath, !value)
        }}
        disabled={disabled}
      />
    </Attribute>
  )
}
