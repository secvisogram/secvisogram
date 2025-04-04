import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import { matchSorter } from 'match-sorter'
import React from 'react'
import useDebounce from '../../../../shared/useDebounce.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'

/**
 * @param {string} term
 * @param {[{id: string, name: string}]} entries
 * @returns {any[] | null}
 */
function useMatch(term, entries) {
  const throttledTerm = useDebounce(term, 100)
  return React.useMemo(() => {
    return throttledTerm.trim() === ''
      ? null
      : matchSorter(entries, throttledTerm, {
          keys: [(item) => `${item.id} - ${item.name}`],
        })
  }, [throttledTerm, entries])
}

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
export default function IdAttribute({
  placeholder,
  onCollectIds,
  disabled,
  ...props
}) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)

  const [value, setValue] = React.useState(/** @type string */ (props.value))
  const [term, setTerm] = React.useState(/** @type string */ (props.value))
  const [entries, setEntries] = React.useState(new Array())

  const results = useMatch(
    term,
    /** @type {[{id: string, name: string}]} */ (entries)
  )

  /** @param {string} id  */
  const handleSelect = (id) => {
    setTerm('')
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

  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => {
    setValue(event.target.value)
    setTerm(event.target.value)
  }

  React.useEffect(() => {
    setValue(/** @type string */ (props.value))
    setTerm('')
  }, [props.value])

  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Combobox className="w-full" onSelect={handleSelect}>
            <ComboboxInput
              value={value}
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              disabled={disabled}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                results &&
                results?.length > 0 &&
                handleSelect(results?.[0].id)
              }
            />
            {results && (
              <ComboboxPopover className="shadow-popup">
                {results.length > 0 ? (
                  <ComboboxList>
                    {results.slice(0, 10).map((result, index) => (
                      <ComboboxOption key={index} value={result.id}>
                        {`${result.id} - ${result.name}`}
                      </ComboboxOption>
                    ))}
                  </ComboboxList>
                ) : (
                  <span style={{ display: 'block', margin: 8 }}>
                    No results found
                  </span>
                )}
              </ComboboxPopover>
            )}
          </Combobox>
        </div>
      </div>
    </Attribute>
  )
}
