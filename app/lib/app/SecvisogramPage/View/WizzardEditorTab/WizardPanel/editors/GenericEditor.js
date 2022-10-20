import React from 'react'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import WizardContext from '../shared/WizardContext.js'
import FieldsEditor from './shared/FieldsEditor.js'
import SideBarContext from '../../../../../shared/context/SideBarContext.js'

/**
 * @param {object} props
 * @param {import('../shared/types').Property | null} props.parentProperty
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function Editor({ parentProperty, property, instancePath }) {
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)

  const fieldErrors = errors.filter(
    (e) => e.instancePath === '/' + instancePath.join('/')
  )

  if (property.type === 'ARRAY') {
    return <ArrayEditor property={property} instancePath={instancePath} />
  } else if (property.type === 'OBJECT') {
    return (
      <ComplexObjectEditor
        parentProperty={parentProperty}
        property={property}
        instancePath={instancePath}
      />
    )
  } else if (property.type === 'STRING') {
    const value = instancePath.reduce((value, pathSegment) => {
      return (value ?? {})[pathSegment]
    }, /** @type {Record<string, any> | null} */ (doc))
    const sanitizedValue = typeof value === 'string' ? value : ''

    return (
      <div>
        <label className="block">{property.title}</label>
        <input
          className="border px-2 py-1"
          type="text"
          value={sanitizedValue}
          onChange={(e) => {
            updateDoc(instancePath, e.target.value)
          }}
        />
        <ul className="block list-disc list-inside">
          {fieldErrors.map((e, i) => (
            <li key={`${i}-${e.message}`}>{e.message}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <div>{property.fullName.join('.')}</div>
        <div>{}</div>
      </div>
    )
  }
}

/**
 * @param {object} props
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
function ArrayEditor({ property, instancePath }) {
  const { doc, updateDoc } = React.useContext(DocumentEditorContext)
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const selectedPathSegment = selectedPath.slice(instancePath.length).at(0)
  const selectedIndex = selectedPathSegment ? Number(selectedPathSegment) : null

  /**
   * @param {number} index
   */
  const setSelectedIndex = (index) => {
    setSelectedPath(instancePath.concat([String(index)]))
  }

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = Array.isArray(value) ? value : []
  const childProperty =
    /** @type {NonNullable<typeof property.metaInfo.arrayType>} */ (
      property.metaInfo.arrayType
    )

  return (
    <>
      <div className="border">
        <ul>
          {sanitizedValue.map((_, i) => (
            <li key={instancePath.concat([String(i)]).join('.')}>
              <button
                type="button"
                className={selectedIndex === i ? 'underline' : ''}
                onClick={() => {
                  setSelectedIndex(i)
                }}
              >
                Item {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            const value =
              childProperty.type === 'OBJECT'
                ? {}
                : childProperty.type === 'ARRAY'
                ? []
                : ['STRING', 'DATETIME', 'URI'].includes(childProperty.type)
                ? ''
                : null
            if (value !== null) {
              updateDoc(instancePath, sanitizedValue.concat([value]))
            }
          }}
        >
          Add item
        </button>
      </div>
      {typeof selectedIndex === 'number' ? (
        <Editor
          key={instancePath.concat([String(selectedIndex)]).join('.')}
          parentProperty={property}
          property={childProperty}
          instancePath={instancePath.concat([String(selectedIndex)])}
        />
      ) : null}
    </>
  )
}

/**
 * @param {object} props
 * @param {import('../shared/types').Property | null} props.parentProperty
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
function ComplexObjectEditor({ parentProperty, property, instancePath }) {
  const { selectedPath } = React.useContext(WizardContext)
  const selectedSubPath = selectedPath.slice(instancePath.length)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )
  const complexProperties = property.metaInfo.propertyList?.filter((p) =>
    ['OBJECT', 'ARRAY'].includes(p.type)
  )

  /**
   * @param {string[]} path
   * @returns
   */
  const resolveSubProperty = (path) =>
    path.reduce((property, pathSegment) => {
      return (
        property?.metaInfo.propertyList?.find((p) => p.key === pathSegment) ??
        null
      )
    }, /** @type {typeof property | null} */ (property))

  const level = property.addMenuItemsForChildObjects ? 2 : 1
  const selectedProperty = resolveSubProperty(selectedSubPath.slice(0, level))

  const renderComplexEditor = () => {
    if (!selectedSubPath.length) return null
    if (!selectedProperty) return null
    return (
      <Editor
        key={instancePath.concat(selectedSubPath.slice(0, level)).join('.')}
        instancePath={instancePath.concat(selectedSubPath.slice(0, level))}
        parentProperty={resolveSubProperty(selectedSubPath.slice(0, -1))}
        property={selectedProperty}
      />
    )
  }

  return (
    <>
      {!complexProperties?.length ? (
        <FieldsEditor
          fieldProperties={fieldProperties ?? []}
          instancePath={instancePath}
        />
      ) : (
        <>
          {parentProperty?.addMenuItemsForChildObjects ? null : (
            <div className="border">
              <Menu instancePath={instancePath} property={property} />
            </div>
          )}
          {selectedSubPath.length ? (
            renderComplexEditor()
          ) : (
            <FieldsEditor
              fieldProperties={fieldProperties ?? []}
              instancePath={instancePath}
            />
          )}
        </>
      )}
    </>
  )
}

/**
 * @param {object} props
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 * @param {number} [props.level]
 */
function Menu({ level = 0, property, instancePath }) {
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const sideBarData = React.useContext(SideBarContext)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )

  const selectedMenuPath = selectedPath.slice(instancePath.length)
  const { addMenuItemsForChildObjects } = property

  return (
    <ul style={{ marginLeft: level * 10 }}>
      {property.type === 'OBJECT' && fieldProperties?.length && level === 0 ? (
        <li className="italic">
          <button
            className={`italic ${!selectedMenuPath.length ? 'underline' : ''}`}
            onClick={() => {
              setSelectedPath(instancePath)
              sideBarData.setSideBarSelectedPath(instancePath)
            }}
          >
            Fields
          </button>
        </li>
      ) : null}
      {property.metaInfo.propertyList
        ?.filter((p) => ['OBJECT', 'ARRAY'].includes(p.type))
        .map((_property) => {
          const childProperty =
            /** @type {import('../shared/types').Property} */ (_property)
          return (
            <React.Fragment key={childProperty.key}>
              <li>
                <button
                  type="button"
                  className={
                    selectedMenuPath[0] === childProperty.key ? 'underline' : ''
                  }
                  onClick={() => {
                    setSelectedPath([...instancePath, childProperty.key])
                    sideBarData.setSideBarSelectedPath([...instancePath, childProperty.key])
                  }}
                >
                  {childProperty.title}
                </button>
                {addMenuItemsForChildObjects ? (
                  <Menu
                    level={level + 1}
                    property={childProperty}
                    instancePath={[...instancePath, childProperty.key]}
                  />
                ) : null}
              </li>
            </React.Fragment>
          )
        })}
    </ul>
  )
}
