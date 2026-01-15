import { Autocomplete, TextField } from '@mui/material'
import { isEmpty } from 'lodash/fp.js'
import React from 'react'
import cwec from '../../../../../../../../../csaf-validator-lib/lib/shared/cwec.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

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
  const handleSelect = (
    /** @type {React.SyntheticEvent<Element, Event>} */ event,
    /** @type string */ id
  ) => {
    const name = cwec.weaknesses.find((w) => w.id === id)?.name
    onChange({ id: id, name: name })
  }
  const displayIdAndName = (/** @type string */ id) => {
    if (!id) return ''
    const name = cwec.weaknesses.find((w) => w.id === id)?.name
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
            value={typeof value === 'string' ? value : ''}
            disablePortal
            disableClearable
            autoHighlight
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
                inputProps={{
                  ...params.inputProps,
                  pattern: '^CWE-[1-9]\\d{0,5}$',
                }}
              />
            )}
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
  const handleSelect = (
    /** @type {React.SyntheticEvent<Element, Event>} */ event,
    /** @type string */ name
  ) => {
    const id = cwec.weaknesses.find((w) => w.name === name)?.id
    onChange({ id: id, name: name })
  }

  const displayIdAndName = (/** @type string */ name) => {
    if (!name) return ''
    const id = cwec.weaknesses.find((w) => w.name === name)?.id
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
            value={typeof value === 'string' ? value : ''}
            disablePortal
            disableClearable
            autoHighlight
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
              />
            )}
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
