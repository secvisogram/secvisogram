import React from 'react'
import DatePicker from './DateAttribute/DatePicker.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  required?: boolean
 *  instancePath: string[]
 *  value: unknown
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 *  fillFunction?: () => void
 *  fillDefaultFunction?: () => void
 *  fillFunctionIcon?: import('@fortawesome/fontawesome-svg-core').IconProp
 * }} props
 */
export default function DateAttribute({
  required = false,
  value,
  disabled,
  ...props
}) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)
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
                replaceDoc(pruneEmpty(doc))
              }
            }}
            readOnly={disabled}
          />
        </div>
      </div>
    </Attribute>
  )
}
