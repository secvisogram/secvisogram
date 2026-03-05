import { updateDocHelper } from '#lib/updateDocHelper.js'
import { Autocomplete, TextField } from '@mui/material'
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
  const persistedValue = /** @type {string} */ (value ?? '')
  const [inputValue, setInputValue] = React.useState(persistedValue)

  React.useEffect(() => {
    setInputValue(persistedValue)
  }, [persistedValue])

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
                /** @type {string} */ (newValue ?? ''),
              )
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue ?? '')
            }}
            onBlur={() => {
              let committedValue = persistedValue
              let newDoc = doc

              if (isEnum) {
                committedValue = inputValue

                // If we're in enum mode and the value from the input matches an
                // option exactly (which means it is an allowed input) and we
                // don't have this value in the model yet we apply it to the
                // model ...
                if (options.includes(inputValue)) {
                  if (inputValue !== persistedValue) {
                    newDoc = updateDocHelper(
                      newDoc,
                      props.instancePath,
                      inputValue,
                    )
                  }
                } else {
                  // ... Otherwise if this is a value that is not allowed by the
                  // given options we reset the input to the previous value.
                  setInputValue(persistedValue)
                }
              } else {
                committedValue = inputValue

                // In free form mode every input is allowed and we pass it
                // straight through to the model.
                newDoc = updateDocHelper(newDoc, props.instancePath, inputValue)
              }

              // There is this special that if a user inputs an empty string, we
              // purge the input from the document and remove objects that
              // became empty because of this. This keeps the document clean.
              if (!committedValue) {
                replaceDoc(pruneEmpty(newDoc))
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
