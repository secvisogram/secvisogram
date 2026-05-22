import { TextField } from '@mui/material'
import React from 'react'
import DropdownAttribute from '../DropdownAttribute.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  instancePath: string[]
 *  value: unknown
 *  onCollectIds?(): Promise<void | {id: string, name: string}[]>
 *  property: import('../../../../shared/types.js').Property
 *  disabled: boolean
 * }} props
 */
export default function IdAttribute({ onCollectIds, ...props }) {
  const [entries, setEntries] = React.useState(new Array())

  const displayIdAndName = (/** @type {string} */ id) => {
    if (!id) return ''
    const name = entries.find((w) => w.id === id)?.name
    return `${id} - ${name}`
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

  return (
    <DropdownAttribute
      {...props}
      className="autocomplete"
      noOptionsText={'No results found'}
      options={entries.map((entry) => entry.id)}
      isEnum={true}
      disabled={false}
      disableClearable={true}
      forcePopupIcon={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          placeholder=""
          size="small"
          onFocus={handleFocus}
        />
      )}
      renderOption={(props, option) => {
        const o = /** @type {string} */ (option)
        return (
          <li {...props} key={o}>
            {displayIdAndName(o)}
          </li>
        )
      }}
    />
  )
}
