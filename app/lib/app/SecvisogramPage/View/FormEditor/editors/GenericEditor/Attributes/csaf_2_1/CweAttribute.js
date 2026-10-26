import pruneEmpty from '#lib/app/shared/pruneEmpty.js'
import { Autocomplete, TextField } from '@mui/material'
import { cwecMap } from '@secvisogram/csaf-validator-lib/lib/cwec.js'
import { isEmpty } from 'lodash/fp.js'
import { matchSorter } from 'match-sorter'
import React, { useEffect, useMemo, useState } from 'react'
import DocumentEditorContext from '../../../../../shared/DocumentEditorContext.js'
import useDebounce from '../../../../../shared/useDebounce.js'
import Attribute from '../shared/Attribute.js'

/** @typedef {Array<{ id: string; name: string }>} Cwec */

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
  /** @type import('../../../../shared/types').Property */ property,
  /** @type string */ childKey,
) => property.metaInfo.propertyList?.find((p) => p.key === childKey)

/**
 * Creates an onKeyDown handler that selects the first entry of the given
 * (already filtered/sorted) results list when the user presses Enter.
 *
 * MUI's Autocomplete no longer selects the auto-highlighted (first) option
 * on Enter when freeSolo is set, since it can't tell that apart from the
 * user wanting to commit their typed text as-is. This restores the
 * previous behavior of always selecting the first matching suggestion on
 * Enter.
 *
 * @param {() => Cwec | null} getResults
 * @param {(weakness: {id: string, name: string}) => void} onSelect
 */
function createEnterKeyDownHandler(getResults, onSelect) {
  return (/** @type {React.KeyboardEvent<HTMLDivElement>} */ event) => {
    const results = getResults()
    if (event.key === 'Enter' && results && results.length > 0) {
      // `defaultMuiPrevented` is a MUI-specific extension to KeyboardEvent
      // (not part of the standard DOM/React types) that tells MUI's
      // Autocomplete to skip its own Enter-key handling.
      ;/** @type {any} */ (event).defaultMuiPrevented = true
      onSelect(results[0])
    }
  }
}

/**
 * Custom attribute for CWE.
 *
 * @param {{
 *  instancePath: string[]
 *  disabled: boolean
 *  property: import('../../../../shared/types').Property
 * }} props
 */
export default function CweAttribute({ property, instancePath, disabled }) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)

  const idProperties = getChildProps(property, 'id')
  const nameProperties = getChildProps(property, 'name')
  const versionProperties = getChildProps(property, 'version')

  const [idPath, idValue] = getChildPathAndValue(instancePath, doc, 'id')
  const [versionPath, versionValue] = getChildPathAndValue(
    instancePath,
    doc,
    'version',
  )
  const [namePath, nameValue] = getChildPathAndValue(instancePath, doc, 'name')

  const [versionTerm, setVersionTerm] = useState('')
  // Keeps the term in sync whenever the underlying value changes from the
  // outside (e.g. undo/redo, loading a different document).
  const [prevVersionValue, setPrevVersionValue] = useState(versionValue)
  if (versionValue !== prevVersionValue) {
    setPrevVersionValue(versionValue)
    setVersionTerm(String(versionValue))
  }

  const [cwec, setCwec] = useState(/** @type {Cwec | null} */ (null))

  const cweVersion = useMemo(
    () => versionTerm || Array.from(cwecMap.keys().take(1)).at(0),
    [versionTerm],
  )

  useEffect(() => {
    let isUnmounted = false
    if (cweVersion) {
      const p = cwecMap.get(cweVersion)
      if (p) {
        p()
          .then((c) => {
            if (!isUnmounted) {
              setCwec(c.default.weaknesses)
            }
          })
          .catch((e) => {
            setCwec(null)
            console.error('Failed to load cwec catalogue: ' + cweVersion)
            console.error(e)
          })
      }
    }
    return () => {
      isUnmounted = true
    }
  }, [cweVersion])

  const onChange = (/** @type {{id: string, name: string}} */ newCwe) => {
    updateDoc(instancePath, { ...newCwe, version: cweVersion })
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
        cwec={cwec}
        value={idValue}
        onChange={onChange}
        property={property}
        disabled={disabled}
      />
      <CwecName
        label={nameProperties?.title || ''}
        description={nameProperties?.description || ''}
        instancePath={/** @type string[] */ (namePath)}
        cwec={cwec}
        value={nameValue}
        onChange={onChange}
        property={property}
        disabled={disabled}
      />
      <CwecVersion
        label={versionProperties?.title || ''}
        description={versionProperties?.description || ''}
        instancePath={/** @type string[] */ (versionPath)}
        value={versionTerm}
        onChange={(s) => {
          setVersionTerm(s)
        }}
        property={property}
        disabled={disabled}
      />
    </div>
  )
}

/**
 * @param {string} term
 * @param {Cwec | null} cwec
 * @returns {any[] | null}
 */
function useCwecMatch(term, cwec) {
  const throttledTerm = useDebounce(term, 100)
  return React.useMemo(
    () =>
      throttledTerm.trim() === ''
        ? null
        : matchSorter(cwec ?? [], throttledTerm, {
            keys: [(item) => `${item.id}, ${item.name}`],
          }),
    [throttledTerm, cwec],
  )
}

/**
 * @param {{
 *  label: string
 *  description: string
 *  instancePath: string[]
 *  value: unknown
 *  onChange(version: string): void
 *  property: import('../../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
function CwecVersion({
  label,
  description,
  instancePath,
  value,
  onChange,
  property,
  disabled,
}) {
  const [inputValue, setInputValue] = React.useState(
    /** @type string */ (value),
  )
  const [term, setTerm] = React.useState(/** @type string */ (value))
  const results = useCwecVersionMatch(term)
  /** @param {string} value  */
  const handleChange = (value) => {
    setInputValue(value)
    setTerm(value)
    onChange(value)
  }

  /** @param {string} id  */
  const handleSelect = (id) => {
    setTerm('')
    onChange(id)
  }

  // Keeps the displayed text (and dropdown search term) in sync whenever the
  // underlying value changes from the outside (e.g. undo/redo, loading a
  // different document).
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    setInputValue(/** @type string */ (value))
    if (value !== term) {
      setTerm('')
    }
  }

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
          <Autocomplete
            className="autocomplete"
            value={inputValue}
            disablePortal
            disableClearable
            autoHighlight
            freeSolo
            forcePopupIcon={false}
            options={results ?? []}
            renderOption={({ key: _key, ...props }, option) => (
              <li key={option} {...props}>
                {option}
              </li>
            )}
            noOptionsText={'No results found'}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="^[1-9]\d*\.([0-9]|([1-9]\d+))(\.\d+)?$"
                size="small"
                slotProps={{
                  ...params.slotProps,
                  htmlInput: {
                    ...params.slotProps.htmlInput,
                    pattern: '^[1-9]\\d*\\.([0-9]|([1-9]\\d+))(\\.\\d+)?$',
                  },
                }}
              />
            )}
            onInputChange={(_event, newInputValue) => {
              handleChange(newInputValue)
            }}
            onChange={(_event, id) => {
              handleSelect(id)
            }}
          />
        </div>
      </div>
    </Attribute>
  )
}

/**
 * @param {string} term
 * @returns {string[] | null}
 */
function useCwecVersionMatch(term) {
  const throttledTerm = useDebounce(term, 100)
  return React.useMemo(
    () =>
      throttledTerm.trim() === ''
        ? null
        : matchSorter(Array.from(cwecMap.keys()), throttledTerm, {
            keys: [(item) => item],
          }),
    [throttledTerm],
  )
}

/**
 * @param {{
 *  label: string
 *  description: string
 *  instancePath: string[]
 *  value: unknown
 *  onChange({}): void
 *  property: import('../../../../shared/types').Property
 *  cwec: Cwec | null
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
  cwec,
}) {
  const [inputValue, setInputValue] = React.useState(
    /** @type string */ (value),
  )
  const [term, setTerm] = React.useState(/** @type string */ (value))
  const results = useCwecMatch(term, cwec)
  /** @param {string} value */
  const handleChange = (value) => {
    setInputValue(value)
    setTerm(value)
  }

  const displayIdAndName = (/** @type {string} */ id) => {
    if (!id) return ''
    const name = cwec?.find((w) => w.id === id)?.name
    return `${id}, ${name}`
  }

  /** @param {string} id  */
  const handleSelect = (id) => {
    setTerm('')
    const name = cwec?.find((w) => w.id === id)?.name
    onChange({ id: id, name: name })
  }

  // Keeps the displayed text (and dropdown search term) in sync whenever the
  // underlying value changes from the outside (e.g. undo/redo, loading a
  // different document).
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    setInputValue(/** @type {string} */ (value))
    setTerm('')
  }

  const handleKeyDown = createEnterKeyDownHandler(
    () => results,
    (weakness) => handleSelect(weakness.id),
  )

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
          <Autocomplete
            className="autocomplete"
            value={inputValue}
            disablePortal
            disableClearable
            autoHighlight
            freeSolo
            forcePopupIcon={false}
            options={results?.map((cwe) => cwe.id) ?? []}
            renderOption={({ key: _key, ...props }, option) => (
              <li key={option} {...props}>
                {displayIdAndName(option)}
              </li>
            )}
            noOptionsText={'No results found'}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="^CWE-[1-9]\d{0,5}$"
                size="small"
                slotProps={{
                  ...params.slotProps,
                  htmlInput: {
                    ...params.slotProps.htmlInput,
                    pattern: '^CWE-[1-9]\\d{0,5}$',
                  },
                }}
              />
            )}
            onInputChange={(_event, newInputValue) => {
              handleChange(newInputValue)
            }}
            onChange={(_event, id) => {
              handleSelect(id)
            }}
            onKeyDown={handleKeyDown}
          />
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
 *  property: import('../../../../shared/types').Property
 *  disabled: boolean
 *  cwec: Cwec | null
 * }} props
 */
function CwecName({
  label,
  description,
  instancePath,
  value,
  cwec,
  onChange,
  property,
  disabled,
}) {
  const [inputValue, setInputValue] = React.useState(
    /** @type string */ (value),
  )
  const [term, setTerm] = React.useState(/** @type string */ (value))
  const results = useCwecMatch(term, cwec)

  /** @param {string} value  */
  const handleChange = (value) => {
    setInputValue(value)
    setTerm(value)
  }

  /** @param {string} name  */
  const handleSelect = (name) => {
    setTerm('')
    const id = cwec?.find((w) => w.name === name)?.id
    onChange({ id: id, name: name })
  }

  // Keeps the displayed text (and dropdown search term) in sync whenever the
  // underlying value changes from the outside (e.g. undo/redo, loading a
  // different document).
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    setInputValue(/** @type string */ (value))
    setTerm('')
  }

  const handleKeyDown = createEnterKeyDownHandler(
    () => results,
    (weakness) => handleSelect(weakness.name),
  )

  const displayIdAndName = (/** @type {string} */ name) => {
    if (!name) return ''
    const id = cwec?.find((w) => w.name === name)?.id
    return `${id}, ${name}`
  }

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
          <Autocomplete
            className="autocomplete"
            value={inputValue}
            disablePortal
            disableClearable
            autoHighlight
            forcePopupIcon={false}
            options={results?.map((cwe) => cwe.name) ?? []}
            renderOption={({ key: _key, ...props }, option) => (
              <li key={option} {...props}>
                {displayIdAndName(option)}
              </li>
            )}
            noOptionsText={'No results found'}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') ..."
                size="small"
              />
            )}
            onInputChange={(_event, newInputValue) => {
              handleChange(newInputValue)
            }}
            onChange={(_event, name) => {
              handleSelect(name)
            }}
            onKeyDown={handleKeyDown}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ''
            }
          />
        </div>
      </div>
    </Attribute>
  )
}
