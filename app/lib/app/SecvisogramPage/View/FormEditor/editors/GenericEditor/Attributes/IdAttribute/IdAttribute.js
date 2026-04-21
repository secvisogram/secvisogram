import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
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
  /** @typedef {{ id: string; name: string }} Value */

  const [entries, setEntries] = React.useState(
    /** @type {Value[]} */ (new Array()),
  )

  useEffect(() => {
    if (onCollectIds) {
      onCollectIds().then((entries) => {
        if (entries) {
          setEntries(entries)
        }
      })
    }
  }, [onCollectIds])

  return (
    <DropdownAttribute
      {...props}
      className="autocomplete"
      noOptionsText={'No results found'}
      options={entries}
      isEnum={true}
      disabled={false}
      disableClearable={true}
      forcePopupIcon={false}
      getOptionValue={(option) => /** @type {Value} */ (option).id}
      // The option label function is used here to determine the value for the
      // input field once an option was selected.
      getOptionLabel={(option) => {
        const o = /** @type {string | Value} */ (option)
        return typeof o === 'string' ? o : o.id
      }}
      isOptionEqualToValue={(option, value) => {
        const left = /** @type {Value} */ (option)
        const right = /** @type {string | Value} */ (value)
        return left.id === (typeof right === 'string' ? right : right.id)
      }}
      filterOptions={(options, { inputValue: q }) => {
        const typedOptions = /** @type {Value[]} */ (options)
        const lower = q.toLowerCase()
        return typedOptions.filter(
          (o) =>
            o.id.toLowerCase().includes(lower) ||
            (o.name ?? '').toLowerCase().includes(lower),
        )
      }}
      renderInput={(params) => (
        <TextField {...params} label="" placeholder="" size="small" />
      )}
      renderOption={(props, option) => {
        const o = /** @type {Value} */ (option)
        return (
          <li {...props} key={o.id}>
            {o.id} - {o.name}
          </li>
        )
      }}
    />
  )
}
