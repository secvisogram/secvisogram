import { updateDocHelper } from '#lib/updateDocHelper.js'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.description
 * @param {any[]} props.options
 * @param {boolean} props.isEnum
 * @param {string[]} props.instancePath
 * @param {unknown} props.value
 * @param {import('../../../shared/types').Property} props.property
 * @param {boolean} props.disabled
 * @param {boolean} props.disableClearable
 * @param {(option: any) => string} [props.getOptionValue]
 * @param {React.ComponentProps<typeof Autocomplete>['renderOption']} [props.renderOption]
 * @param {React.ComponentProps<typeof Autocomplete>['filterOptions']} [props.filterOptions]
 *    A function that determines the filtered options to be rendered on search.
 * @param {React.ComponentProps<typeof Autocomplete>['getOptionLabel']} [props.getOptionLabel]
 *    Used to determine the string value for a given option. It's used to fill
 *    the input (and the list box options if `renderOption` is not provided). If
 *    used non-enum mode, it must accept both the type of the options and a
 *    string.
 * @param {React.ComponentProps<typeof Autocomplete>['isOptionEqualToValue']} [props.isOptionEqualToValue]
 *    Used to determine if the option represents the given value. Uses strict
 *    equality by default. ⚠️ Both arguments need to be handled, an option can
 *    only match with one value.
 * @param {React.ComponentProps<typeof Autocomplete<string>>['forcePopupIcon']} [props.forcePopupIcon]
 * @param {React.ComponentProps<typeof Autocomplete<string>>['noOptionsText']} [props.noOptionsText]
 * @param {React.ComponentProps<typeof Autocomplete<string>>['renderInput']} [props.renderInput]
 * @param {React.ComponentProps<typeof Autocomplete<string>>['className']} [props.className]
 * @param {() => void} [props.fillDefaultFunction]
 */
export default function DropdownAttribute({
  options,
  isEnum,
  value,
  disabled,
  disableClearable = true,
  renderOption,
  forcePopupIcon,
  noOptionsText,
  className,
  getOptionValue = (o) => o,
  filterOptions,
  getOptionLabel,
  isOptionEqualToValue,
  renderInput = (params) => (
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
  ),
  ...props
}) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)
  const persistedValue = /** @type {string} */ (value ?? '')
  const [inputValue, setInputValue] = React.useState(persistedValue)
  const autocompleteValue = isEnum
    ? !persistedValue
      ? null
      : (options.find((option) => getOptionValue(option) === persistedValue) ??
        null)
    : value

  React.useEffect(() => {
    setInputValue(persistedValue)
  }, [persistedValue])

  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Autocomplete
            className={className}
            autoHighlight={true}
            disableClearable={disableClearable}
            options={options}
            freeSolo={!isEnum}
            value={autocompleteValue}
            onChange={(_, newValue) => {
              updateDoc(
                props.instancePath,
                newValue == null ? '' : getOptionValue(newValue),
              )
            }}
            inputValue={inputValue}
            forcePopupIcon={forcePopupIcon}
            renderOption={renderOption}
            filterOptions={filterOptions}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            noOptionsText={noOptionsText}
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
                const matchedOption = options.find(
                  (o) => getOptionValue(o) === inputValue,
                )
                if (matchedOption !== undefined) {
                  const resolvedValue = getOptionValue(matchedOption)
                  if (resolvedValue !== persistedValue) {
                    newDoc = updateDocHelper(
                      newDoc,
                      props.instancePath,
                      resolvedValue,
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
                newDoc = pruneEmpty(newDoc)
              }

              replaceDoc(newDoc)
            }}
            renderInput={renderInput}
          />
        </div>
      </div>
    </Attribute>
  )
}
