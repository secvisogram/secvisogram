import React from 'react'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import { Autocomplete, TextField, createFilterOptions } from '@mui/material'

/**
 * @param {{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  instancePath: string[]
 *  value: unknown
 *  onCollectIds?(): Promise<void | {id: string, name: string}[]>
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function IdAttribute({ onCollectIds, disabled, ...props }) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)

  const [value, setValue] = React.useState(/** @type string */ (props.value))
  const [entries, setEntries] = React.useState(new Array())

  /** @param {{id: string, name: string} | null} entry  */
  const handleSelect = (
    /** @type {React.SyntheticEvent<Element, Event>} */ event,
    /** @type {{id: string, name: string} | null} */ entry
  ) => {
    const id = entry?.id || ''
    updateDoc(props.instancePath, id)
    if (!id) {
      replaceDoc(pruneEmpty(doc))
    }
  }

  const handleFocus = () => {
    if (onCollectIds) {
      onCollectIds().then((entries) => {
        if (entries) {
          setEntries(entries)
        }
      })
    }
  }

  const displayIdAndName = (/** @type string */ id) => {
    if (!id) return ''
    const name = entries.find((w) => w.id === id)?.name
    return `${id} - ${name}`
  }

  // Custom filter function to search by both ID and name
  const filterOptions = createFilterOptions({
    stringify: (option) => `${option.id} ${option.name || ''}`,
  })

  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (
    /** @type {React.SyntheticEvent<Element, Event>} */ event,
    /** @type string */ newValue
  ) => {
    setValue(newValue)
  }

  React.useEffect(() => {
    setValue(/** @type string */ (props.value))
  }, [props.value])

  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Autocomplete
            className="autocomplete"
            value={entries.find((entry) => entry.id === value) || null}
            disablePortal
            disableClearable
            autoHighlight
            forcePopupIcon={false}
            options={entries}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option?.id || ''}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {displayIdAndName(option.id)}
              </li>
            )}
            noOptionsText={'No results found'}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder=""
                size="small"
                onFocus={handleFocus}
              />
            )}
            onInputChange={(event, newInputValue) => {
              handleChange(event, newInputValue)
            }}
            onChange={(event, entry) => {
              handleSelect(event, entry)
            }}
            isOptionEqualToValue={(option, value) =>
              option?.id === value?.id || (!option && !value)
            }
          />
        </div>
      </div>
    </Attribute>
  )
}
