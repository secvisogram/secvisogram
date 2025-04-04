import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import { matchSorter } from 'match-sorter'
import React from 'react'
import cwec from '../../../../../../../../../csaf-validator-lib/lib/shared/cwec.js'
import useDebounce from '../../../../shared/useDebounce.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import { isEmpty } from 'lodash/fp.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'

/**
 * helper function getting path and value for a child
 * @param {string[]} instancePath
 * @param {Record<string, any> | null} doc
 * @param {string } childKey
 */
function getChildPathAndValue(instancePath, doc, childKey) {
  const path = instancePath.concat([childKey])
  const value =
    path.reduce((value, pathSegment) => {
      return (value ?? {})[pathSegment]
    }, doc) || ''
  return [path, value]
}

const getChildProps = (
  /** @type import('../../../shared/types').Property */ property,
  /** @type string */ childKey
) => property.metaInfo.propertyList?.find((p) => p.key === childKey)

/**
 * Custom attribute for CWE.
 *
 * @param {{
 *  instancePath: string[]
 *  disabled: boolean
 *  property: import('../../../shared/types').Property
 * }} props
 */
export default function CweAttribute({ property, instancePath, disabled }) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)

  const idProperties = getChildProps(property, 'id')
  const nameProperties = getChildProps(property, 'name')

  const [idPath, idValue] = getChildPathAndValue(instancePath, doc, 'id')
  const [namePath, nameValue] = getChildPathAndValue(instancePath, doc, 'name')

  const onChange = (/** @type {{id: string, name: string}} */ newCwe) => {
    updateDoc(instancePath, newCwe)
    if (isEmpty(newCwe)) {
      replaceDoc(pruneEmpty(doc))
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px] max-w-[400px]">
      <CwecId
        label={idProperties?.title || ''}
        description={idProperties?.description || ''}
        instancePath={/** @type string[] */ (idPath)}
        value={idValue}
        onChange={onChange}
        property={property}
        disabled={disabled}
      />
      <CwecName
        label={nameProperties?.title || ''}
        description={nameProperties?.description || ''}
        instancePath={/** @type string[] */ (namePath)}
        value={nameValue}
        onChange={onChange}
        property={property}
        disabled={disabled}
      />
    </div>
  )
}

/**
 * @param {string} term
 * @returns {any[] | null}
 */
function useCwecMatch(term) {
  const throttledTerm = useDebounce(term, 100)
  return React.useMemo(
    () =>
      throttledTerm.trim() === ''
        ? null
        : matchSorter(cwec.weaknesses, throttledTerm, {
            keys: [(item) => `${item.id}, ${item.name}`],
          }),
    [throttledTerm]
  )
}

/**
 * @param {{
 *  label: string
 *  description: string
 *  instancePath: string[]
 *  value: unknown
 *  onChange({}): void
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
function CwecId({
  label,
  description,
  instancePath,
  value,
  onChange,
  property,
  disabled,
}) {
  const [inputValue, setInputValue] = React.useState(
    /** @type string */ (value)
  )
  const [term, setTerm] = React.useState(/** @type string */ (value))
  const results = useCwecMatch(term)
  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => {
    setInputValue(event.target.value)
    setTerm(event.target.value)
  }

  /** @param {string} id  */
  const handleSelect = (id) => {
    setTerm('')
    const name = cwec.weaknesses.find((w) => w.id === id)?.name
    onChange({ id: id, name: name })
  }

  React.useEffect(() => {
    setInputValue(/** @type string */ (value))
    setTerm('')
  }, [value])

  return (
    <Attribute
      label={label}
      description={description}
      instancePath={instancePath}
      property={property}
      disabled={disabled}
    >
      <div className="max-w-md flex">
        <div className="w-full">
          <Combobox className="w-full" onSelect={handleSelect}>
            <ComboboxInput
              value={inputValue}
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              pattern="^CWE-[1-9]\d{0,5}$"
              placeholder="^CWE-[1-9]\d{0,5}$"
              onChange={handleChange}
              disabled={disabled}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                results &&
                results?.length > 0 &&
                onChange(results?.[0])
              }
            />
            {results && (
              <ComboboxPopover className="shadow-popup">
                {results.length > 0 ? (
                  <ComboboxList>
                    {results.slice(0, 10).map((result, index) => (
                      <ComboboxOption key={index} value={result.id}>
                        {`${result.id}, ${result.name}`}
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

/**
 * @param {{
 *  label: string
 *  description: string
 *  instancePath: string[]
 *  value: unknown
 *  onChange({}): void
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
function CwecName({
  label,
  description,
  instancePath,
  value,
  onChange,
  property,
  disabled,
}) {
  const [inputValue, setInputValue] = React.useState(
    /** @type string */ (value)
  )
  const [term, setTerm] = React.useState(/** @type string */ (value))
  const results = useCwecMatch(term)

  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => {
    setInputValue(event.target.value)
    setTerm(event.target.value)
  }

  /** @param {string} name  */
  const handleSelect = (name) => {
    setTerm('')
    const id = cwec.weaknesses.find((w) => w.name === name)?.id
    onChange({ id: id, name: name })
  }

  React.useEffect(() => {
    setInputValue(/** @type string */ (value))
    setTerm('')
  }, [value])

  return (
    <Attribute
      label={label}
      description={description}
      instancePath={instancePath}
      property={property}
      disabled={disabled}
    >
      <div className="max-w-md flex">
        <div className="w-full">
          <Combobox className="w-full" onSelect={handleSelect}>
            <ComboboxInput
              value={inputValue}
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              placeholder="Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') ..."
              onChange={handleChange}
              disabled={disabled}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                results &&
                results?.length > 0 &&
                onChange(results?.[0])
              }
            />
            {results && (
              <ComboboxPopover className="shadow-popup">
                {results.length > 0 ? (
                  <ComboboxList>
                    {results.slice(0, 10).map((result, index) => (
                      <ComboboxOption key={index} value={result.name}>
                        {`${result.id}, ${result.name}`}
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
