import React from 'react'
import DatePicker from './DateAttribute/DatePicker.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  required?: boolean
 *  instancePath: string[]
 *  value: unknown
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function DateAttribute({
  required = true,
  value,
  disabled,
  ...props
}) {
  const { updateDoc, pruneEmpty } = React.useContext(DocumentEditorContext)
  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex items-center justify-center">
        <div className="w-full">
          <DatePicker
            value={/** @type {string} */ (value)}
            required={required}
            onChange={(/** @type {string} */ newValue) =>
              updateDoc(props.instancePath, newValue)
            }
            onBlur={(e) => {
              if (!e.target.value) {
                pruneEmpty()
              }
            }}
            readOnly={disabled}
          />
        </div>
      </div>
    </Attribute>
  )
}