import React from 'react'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import { Autocomplete, TextField } from '@mui/material'

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

  /** @param {string} id  */
  const handleSelect = (
    /** @type {React.SyntheticEvent<Element, Event>} */ event,
    /** @type string */ id,
  ) => {
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

  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (
    /** @type {React.SyntheticEvent<Element, Event>} */ event,
    /** @type string */ newValue,
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
            value={value}
            disablePortal
            disableClearable
            autoHighlight
            forcePopupIcon={false}
            options={entries.map((entry) => entry.id)}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {displayIdAndName(option)}
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
            onChange={(event, id) => {
              handleSelect(event, id)
            }}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ''
            }
          />
        </div>
      </div>
    </Attribute>
  )
}
