import pruneEmpty from '#lib/app/shared/pruneEmpty.js'
import { Autocomplete, TextField } from '@mui/material'
import { isEmpty } from 'lodash/fp.js'
import { matchSorter } from 'match-sorter'
import React, { useEffect, useMemo, useState } from 'react'
import { cwecMap } from '../../../../../../../../../../csaf-validator-lib/lib/cwec.js'
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
  /** @type string */ childKey
) => property.metaInfo.propertyList?.find((p) => p.key === childKey)

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
    'version'
  )
  const [namePath, nameValue] = getChildPathAndValue(instancePath, doc, 'name')

  const [versionTerm, setVersionTerm] = useState('')

  const [cwec, setCwec] = useState(/** @type {Cwec | null} */ (null))

  const cweVersion = useMemo(
    () => versionTerm || Array.from(cwecMap.keys().take(1)).at(0),
    [versionTerm]
  )

  useEffect(() => {
    setVersionTerm(String(versionValue))
  }, [versionValue])

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
    [throttledTerm, cwec]
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
    /** @type string */ (value)
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

  React.useEffect(() => {
    setInputValue(/** @type string */ (value))
    if (value !== term) {
      setTerm('')
    }
  }, [value, term])

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
            renderOption={(props, option) => (
              <li {...props} key={option}>
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
                inputProps={{
                  ...params.inputProps,
                  pattern: '^[1-9]\\d*\\.([0-9]|([1-9]\\d+))(\\.\\d+)?$',
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
    /** @type string */ (value)
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

  React.useEffect(() => {
    setInputValue(/** @type {string} */ (value))
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
          <Autocomplete
            className="autocomplete"
            value={inputValue}
            disablePortal
            disableClearable
            autoHighlight
            freeSolo
            forcePopupIcon={false}
            options={results?.map((cwe) => cwe.id) ?? []}
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
                placeholder="^CWE-[1-9]\d{0,5}$"
                size="small"
                inputProps={{
                  ...params.inputProps,
                  pattern: '^CWE-[1-9]\\d{0,5}$',
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
    /** @type string */ (value)
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

  React.useEffect(() => {
    setInputValue(/** @type string */ (value))
    setTerm('')
  }, [value])

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
            isOptionEqualToValue={(option, value) =>
              option === value || value === ''
            }
          />
        </div>
      </div>
    </Attribute>
  )
}
