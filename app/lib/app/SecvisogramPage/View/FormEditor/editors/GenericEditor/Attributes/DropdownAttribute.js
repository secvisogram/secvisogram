import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'
import React from 'react'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  isEnum: boolean
 *  instancePath: string[]
 *  value: unknown
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 *  disableClearable: boolean
 *  fillDefaultFunction?: () => void
 * }} props
 */
export default function DropdownAttribute({
  options,
  isEnum,
  value,
  disabled,
  disableClearable = true,
  ...props
}) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)
  const [inputValue, setInputValue] = React.useState(value)
  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Autocomplete
            autoHighlight={true}
            disableClearable={disableClearable}
            options={options}
            freeSolo={!isEnum}
            value={value}
            onChange={(_, newValue) => {
              updateDoc(
                props.instancePath,
                /** @type {string} */ (newValue ?? '')
              )
            }}
            inputValue={/** @type {string} */ (inputValue)}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue ?? '')
            }}
            onBlur={() => {
              if (!isEnum)
                updateDoc(
                  props.instancePath,
                  /** @type {string} */ (inputValue)
                )
              if (!inputValue) {
                replaceDoc(pruneEmpty(doc))
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="font-sans"
                margin="dense"
                variant="outlined"
                sx={{
                  '.MuiInputBase-root': {
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                  },

                  '.MuiInputBase-input.MuiAutocomplete-input': {
                    paddingLeft: '8px',
                  },
                }}
              />
            )}
          />
        </div>
      </div>
    </Attribute>
  )
}
