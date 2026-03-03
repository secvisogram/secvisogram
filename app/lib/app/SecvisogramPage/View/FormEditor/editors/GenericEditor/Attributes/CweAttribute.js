import { Autocomplete, TextField } from '@mui/material'
import { parse } from 'json-pointer'
import { isEmpty, set } from 'lodash/fp.js'
import React from 'react'
import cwec from '../../../../../../../../../csaf-validator-lib/lib/shared/cwec.js'
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

  const handleChange = (
    /** @type {React.SyntheticEvent<Element, Event>} */ _event,
    /** @type {string} */ newValue,
  ) => {
    setInputValue(newValue)
  }

  const handleSelect = (
    /** @type {React.SyntheticEvent<Element, Event>} */ _event,
    /** @type {string} */ id,
  ) => {
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

  const displayIdAndName = (/** @type {string} */ id) => {
    if (!id) return ''
    const name = cweById.get(id)?.name
    return `${id}, ${name}`
  }

  React.useEffect(() => {
    setInputValue(/** @type {string} */ (value))
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
            options={cwec.weaknesses.map((cwe) => cwe.id)}
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
                onBlur={handleBlur}
                inputProps={{
                  ...params.inputProps,
                  pattern: '^CWE-[1-9]\\d{0,5}$',
                }}
              />
            )}
            onInputChange={(event, newInputValue) => {
              handleChange(event, newInputValue)
            }}
            onChange={(event, id) => {
              handleSelect(event, id)
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

  const handleChange = (
    /** @type {React.SyntheticEvent<Element, Event>} */ _event,
    /** @type {string} */ newValue,
  ) => {
    setInputValue(newValue)
  }

  const handleSelect = (
    /** @type {React.SyntheticEvent<Element, Event>} */ _event,
    /** @type {string} */ name,
  ) => {
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

  const displayIdAndName = (/** @type string */ name) => {
    if (!name) return ''
    const id = cweByName.get(name)?.id
    return `${id}, ${name}`
  }

  React.useEffect(() => {
    setInputValue(/** @type string */ (value))
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
            options={cwec.weaknesses.map((cwe) => cwe.name)}
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
                onBlur={handleBlur}
              />
            )}
            onInputChange={(event, newInputValue) => {
              handleChange(event, newInputValue)
            }}
            onChange={(event, name) => {
              handleSelect(event, name)
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
