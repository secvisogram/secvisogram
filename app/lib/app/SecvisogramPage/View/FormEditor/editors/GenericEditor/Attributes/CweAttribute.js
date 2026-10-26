import { Autocomplete, TextField } from '@mui/material'
import cwec from '@secvisogram/csaf-validator-lib/lib/shared/cwec.js'
import { parse } from 'json-pointer'
import { isEmpty, set } from 'lodash/fp.js'
import React from 'react'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/** @type {Map<string, {id: string, name: string}>} */
const cweById = new Map(
  cwec.weaknesses.map((weakness) => [weakness.id, weakness]),
)
/** @type {Map<string, {id: string, name: string}>} */
const cweByName = new Map(
  cwec.weaknesses.map((weakness) => [weakness.name, weakness]),
)

/**
 * helper function getting path and value for a child
 * @param {string[]} instancePath
 * @param {Record<string, any> | null} doc
 * @param {string } childKey
 * @returns {[string[], string]}
 */
function getChildPathAndValue(instancePath, doc, childKey) {
  const path = instancePath.concat([childKey])
  const value = path.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, doc)
  return [path, typeof value === 'string' ? value : '']
}

const getChildProps = (
  /** @type {import('../../../shared/types').Property} */ property,
  /** @type {string} */ childKey,
) => property.metaInfo.propertyList?.find((p) => p.key === childKey)

/**
 * Creates an onKeyDown handler that selects the first option matching the
 * current input value when the user presses Enter.
 *
 * MUI's Autocomplete no longer selects the auto-highlighted (first) option
 * on Enter when freeSolo is set, since it can't tell that apart from the
 * user wanting to commit their typed text as-is. This restores the
 * previous behavior of always selecting the first matching suggestion on
 * Enter.
 *
 * @param {() => string} getInputValue
 * @param {(value: string) => void} onSelect
 * @param {(typedValue: string) => string | undefined} findFirstMatch
 */
function createEnterKeyDownHandler(getInputValue, onSelect, findFirstMatch) {
  return (/** @type {React.KeyboardEvent<HTMLDivElement>} */ event) => {
    if (event.key !== 'Enter') {
      return
    }
    const typedValue = getInputValue().trim().toLowerCase()
    if (!typedValue) {
      return
    }
    const firstMatch = findFirstMatch(typedValue)
    if (firstMatch) {
      // `defaultMuiPrevented` is a MUI-specific extension to KeyboardEvent
      // (not part of the standard DOM/React types) that tells MUI's
      // Autocomplete to skip its own Enter-key handling.
      ;/** @type {any} */ (event).defaultMuiPrevented = true
      onSelect(firstMatch)
    }
  }
}

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
  const { doc, replaceDoc } = React.useContext(DocumentEditorContext)

  const idProperties = getChildProps(property, 'id')
  const nameProperties = getChildProps(property, 'name')

  const [idPath, idValue] = getChildPathAndValue(instancePath, doc, 'id')
  const [namePath, nameValue] = getChildPathAndValue(instancePath, doc, 'name')

  const onChange = (
    /** @type {{ id: string, name: string } | {}} */ newCwe,
  ) => {
    const newDoc = set(parse('/' + instancePath.join('/')), newCwe, doc)
    if (isEmpty(newCwe)) {
      replaceDoc(pruneEmpty(newDoc))
    } else {
      replaceDoc(newDoc)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px] max-w-[400px]">
      <CwecId
        label={idProperties?.title || ''}
        description={idProperties?.description || ''}
        instancePath={idPath}
        value={idValue}
        onChange={onChange}
        property={property}
        disabled={disabled}
      />
      <CwecName
        label={nameProperties?.title || ''}
        description={nameProperties?.description || ''}
        instancePath={namePath}
        value={nameValue}
        onChange={onChange}
        property={property}
        disabled={disabled}
      />
    </div>
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
    /** @type {string} */ (value),
  )
  // Keeps the displayed text in sync whenever the underlying value changes
  // from the outside (e.g. undo/redo, loading a different document).
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    setInputValue(/** @type {string} */ (value))
  }

  const handleChange = (
    /** @type {React.SyntheticEvent<Element, Event>} */ _event,
    /** @type {string} */ newValue,
  ) => {
    setInputValue(newValue)
  }

  const handleSelect = (/** @type {string} */ id) => {
    const weakness = cweById.get(id)
    if (!weakness) {
      // This case should not occur in practice since the dropdown only provides
      // existing values.
      onChange({})
    } else {
      onChange({ id: weakness.id, name: weakness.name })
    }
  }

  // On blur we either clear out the cwe if the user clears the input or update
  // the cwe with a matching entry if the input matches one. Otherwise we reset
  // the input value to the previous "correct" value.
  const handleBlur = () => {
    const typedId = inputValue.trim()

    if (!typedId) {
      onChange({})
      return
    }

    const weakness = cweById.get(typedId)
    if (!weakness) {
      setInputValue(/** @type {string} */ (value))
      return
    }

    setInputValue(weakness.id)
    onChange({ id: weakness.id, name: weakness.name })
  }

  const handleKeyDown = createEnterKeyDownHandler(
    () => inputValue,
    handleSelect,
    (typedId) =>
      cwec.weaknesses.find((weakness) =>
        weakness.id.toLowerCase().includes(typedId),
      )?.id,
  )

  const displayIdAndName = (/** @type {string} */ id) => {
    if (!id) return ''
    const name = cweById.get(id)?.name
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
            freeSolo
            forcePopupIcon={false}
            options={cwec.weaknesses.map((cwe) => cwe.id)}
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
                onBlur={handleBlur}
                slotProps={{
                  ...params.slotProps,
                  htmlInput: {
                    ...params.slotProps.htmlInput,
                    pattern: '^CWE-[1-9]\\d{0,5}$',
                  },
                }}
              />
            )}
            onInputChange={(event, newInputValue) => {
              handleChange(event, newInputValue)
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
    /** @type {string} */ (value),
  )
  // Keeps the displayed text in sync whenever the underlying value changes
  // from the outside (e.g. undo/redo, loading a different document).
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    setInputValue(/** @type {string} */ (value))
  }

  const handleChange = (
    /** @type {React.SyntheticEvent<Element, Event>} */ _event,
    /** @type {string} */ newValue,
  ) => {
    setInputValue(newValue)
  }

  const handleSelect = (/** @type {string} */ name) => {
    const weakness = cweByName.get(name)
    if (!weakness) {
      // This case should not occur in practice since the dropdown only provides
      // existing values.
      onChange({})
    } else {
      onChange({ id: weakness.id, name: weakness.name })
    }
  }

  // On blur we either clear out the cwe if the user clears the input or update
  // the cwe with a matching entry if the input matches one. Otherwise we reset
  // the input value to the previous "correct" value.
  const handleBlur = () => {
    const typedName = inputValue.trim()

    if (!typedName) {
      onChange({})
      return
    }

    const weakness = cweByName.get(typedName)
    if (!weakness) {
      setInputValue(/** @type {string} */ (value))
      return
    }

    setInputValue(weakness.name)
    onChange({ id: weakness.id, name: weakness.name })
  }

  const handleKeyDown = createEnterKeyDownHandler(
    () => inputValue,
    handleSelect,
    (typedName) =>
      cwec.weaknesses.find((weakness) =>
        weakness.name.toLowerCase().includes(typedName),
      )?.name,
  )

  const displayIdAndName = (/** @type string */ name) => {
    if (!name) return ''
    const id = cweByName.get(name)?.id
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
            freeSolo
            forcePopupIcon={false}
            options={cwec.weaknesses.map((cwe) => cwe.name)}
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
                onBlur={handleBlur}
              />
            )}
            onInputChange={(event, newInputValue) => {
              handleChange(event, newInputValue)
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
