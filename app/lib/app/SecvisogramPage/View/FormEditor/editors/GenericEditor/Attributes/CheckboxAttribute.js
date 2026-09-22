import React from 'react'
import { Checkbox, SvgIcon } from '@mui/material'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/**
 * @typedef {object} Props
 * @property {boolean} [required]
 * @property {boolean} value
 * @property {boolean} disabled
 */

/** @typedef {import('react').ComponentProps<typeof Attribute>} AttributeProps */

/**
 * Unchecked icon with a thinner border than the MUI default
 *
 * @param {import('@mui/material').SvgIconProps} props
 */
function ThinCheckboxOutlineIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </SvgIcon>
  )
}

/**
 * Checked icon with a thinner border than the MUI default
 *
 * @param {import('@mui/material').SvgIconProps} props
 */
function ThinCheckboxIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M7.5 12.5l3 3 6.5-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

/**
 * @param {Props & AttributeProps} props
 */
export default function CheckboxAttribute({
  required = false,
  value,
  disabled,
  ...props
}) {
  const { updateDoc } = React.useContext(DocumentEditorContext)
  return (
    <Attribute disabled={disabled} {...props}>
      <Checkbox
        sx={{
          // Unchecked color
          color: '#000000',
          '&.Mui-checked': {
            color: '#000000',
          },
        }}
        icon={<ThinCheckboxOutlineIcon />}
        checkedIcon={<ThinCheckboxIcon />}
        checked={value}
        required={required}
        onChange={() => {
          updateDoc(props.instancePath, !value)
        }}
        disabled={disabled}
      />
    </Attribute>
  )
}
