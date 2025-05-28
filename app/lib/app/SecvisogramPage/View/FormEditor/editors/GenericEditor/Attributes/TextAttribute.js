import React from 'react'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/**
 * @typedef {object} Props
 * @property {string} [placeholder]
 * @property {string} [pattern]
 * @property {number} minLength
 * @property {boolean} [readOnly]
 * @property {boolean} [required]
 * @property {unknown} value
 */

/** @typedef {import('react').ComponentProps<typeof Attribute>} AttributeProps */

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'type'> & Props & AttributeProps} props
 */
export default function TextAttribute({
  type = 'text',
  placeholder,
  pattern,
  minLength,
  required = false,
  readOnly = false,
  value,
  disabled,
  ...props
}) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)
  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <input
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            value={/** @type {string} */ (value)}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            minLength={minLength}
            required={required}
            readOnly={readOnly}
            onChange={(e) => updateDoc(props.instancePath, e.target.value)}
            onBlur={(e) => {
              if (!e.target.value) {
                replaceDoc(pruneEmpty(doc))
              }
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </Attribute>
  )
}
