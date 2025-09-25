import {
  faCircle,
  faEllipsisVertical,
  faInfoCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from 'i18next'
import React from 'react'
import AppConfigContext from '../../../../../shared/context/AppConfigContext.js'
import UserInfoContext from '../../../../../shared/context/UserInfoContext.js'
import isPropertyRelevant from '../../../../shared/isPropertyRelevant.js'
import SelectedPathContext from '../../../shared/context/SelectedPathContext.js'
import SideBarContext from '../../../shared/context/SideBarContext.js'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import { GenericEditor } from '../../editors.js'
import RelevanceLevelContext from '../../shared/context/RelevanceLevelContext.js'
import { getErrorTextColor } from '../GenericEditor.js'
import useChildItem from './shared/getChildItem.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property | null} props.parentProperty
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 * @param {boolean} props.enable_last_rev_hist_item
 */
export default function ObjectEditor({
  parentProperty,
  property,
  instancePath,
  enable_last_rev_hist_item,
}) {
  const { selectedPath, setSelectedPath } =
    React.useContext(SelectedPathContext)
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)
  const { selectedRelevanceLevel, relevanceLevels } = React.useContext(
    RelevanceLevelContext
  )
  const { getChildItem } = useChildItem()

  const { loginAvailable } = React.useContext(AppConfigContext)
  const userInfo = React.useContext(UserInfoContext)

  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )
  const complexProperties = property.metaInfo.propertyList?.filter((p) =>
    ['OBJECT', 'ARRAY'].includes(p.type)
  )
  const menuNodes = getObjectMenuNodes(property)
  const selectedSubPath = getObjectMenuPaths(property)
    .slice()
    .map((p) => p.instancePath)
    .sort((a, z) => z.length - a.length)
    .find((menuPath) =>
      menuPath.every(
        (seg, i) => seg === selectedPath.slice(instancePath.length)[i]
      )
    )
  const sideBarData = React.useContext(SideBarContext)

  const fieldsErrors = errors.filter(
    (e) =>
      e.instancePath.startsWith('/' + instancePath.join('/')) &&
      e.instancePath.split('/').length === instancePath.length + 2
  )

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = value ?? {}

  const selectedMenuPath = selectedPath.slice(instancePath.length)

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

  const selectedProperty =
    selectedSubPath && resolveSubProperty(selectedSubPath)

  const renderComplexEditor = () => {
    if (!selectedSubPath) return null
    if (!selectedProperty) return null
    return (
      <GenericEditor
        key={instancePath.concat(selectedSubPath).join('.')}
        instancePath={instancePath.concat(selectedSubPath)}
        parentProperty={resolveSubProperty(selectedSubPath.slice(0, -1))}
        property={selectedProperty}
        enable_last_rev_hist_item={enable_last_rev_hist_item}
      />
    )
  }

  const renderFieldsEditor = () => {
    return (
      <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px]">
        {fieldProperties?.map((property) => (
          <GenericEditor
            key={property.key}
            property={property}
            parentProperty={resolveSubProperty(selectedSubPath ?? [])}
            instancePath={instancePath
              .concat(selectedSubPath ?? [])
              .concat([property.key])}
            enable_last_rev_hist_item={enable_last_rev_hist_item}
          />
        ))}
      </div>
    )
  }

  const category = doc.document?.category

  /**
   * @param {MenuNode[]} menuNodes
   * @param {number} [level]
   * @returns
   */
  const renderMenuNodes = (menuNodes, level = 0) => {
    return (
      <ul>
        {level === 0 &&
        fieldProperties?.length &&
        fieldProperties?.some((p) =>
          isPropertyRelevant({
            relevanceLevels,
            property: p,
            category,
            selectedRelevanceLevel,
          })
        ) ? (
          <li
            className={
              (!selectedMenuPath.length ? 'font-bold' : '') +
              ' bg-gray-200 flex w-full'
            }
          >
            <div className="grid place-items-center px-2">
              <FontAwesomeIcon
                icon={faCircle}
                className={getErrorTextColor(fieldsErrors)}
                size="xs"
              />
            </div>
            <button
              className="italic text-left w-full px-2 h-9 hover:underline"
              data-testid={`${instancePath.join('/')}-fieldButton`}
              onClick={() => {
                setSelectedPath(instancePath)
              }}
            >
              Fields
            </button>
          </li>
        ) : null}
        {menuNodes.map((menuItem, menuItemIndex) => {
          if (
            !isPropertyRelevant({
              relevanceLevels,
              property: menuItem.property,
              category,
              selectedRelevanceLevel,
            })
          ) {
            return null
          }
          const childErrors = errors.filter((e) =>
            e.instancePath.startsWith(
              '/' + [...instancePath, ...menuItem.instancePath].join('/')
            )
          )
          const isSelected =
            selectedSubPath &&
            menuItem.instancePath.every((p, i) => selectedSubPath[i] === p)

          const canAdd = !(
            loginAvailable &&
            userInfo &&
            menuItem.property.metaData?.uiType === 'ARRAY_REVISION_HISTORY'
          )

          return (
            <React.Fragment key={menuItem.instancePath.join('.')}>
              <li
                className={`bg-gray-200 ${
                  instancePath.length === 0 &&
                  menuItem.instancePath.length === 1 &&
                  menuItemIndex > 0
                    ? 'mt-4'
                    : ''
                }`}
                style={{}}
              >
                <div
                  className={
                    `${isSelected ? 'font-bold' : ''}` + ' flex w-full'
                  }
                >
                  <div
                    className="grid place-items-center px-2"
                    data-testid={`error_indicator-object/${instancePath
                      .concat(menuItem.instancePath)
                      .join('/')}`}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={getErrorTextColor(childErrors)}
                      size="xs"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-2 w-full text-left hover:underline whitespace-nowrap align-middle"
                    data-testid={`menu_entry-/${instancePath
                      .concat(menuItem.instancePath)
                      .join('/')}`}
                    onClick={() => {
                      setSelectedPath([
                        ...instancePath,
                        ...menuItem.instancePath,
                      ])
                    }}
                  >
                    {t([
                      `csaf.${menuItem.property.metaData?.i18n?.title}`,
                      'missing title',
                    ])}
                  </button>
                  {menuItem.property.type === 'ARRAY' && canAdd ? (
                    <div>
                      <button
                        className="w-9 h-9 peer text-slate-400 hover:text-slate-800"
                        data-testid={`menu_entry-/${[
                          ...instancePath,
                          ...menuItem.instancePath,
                        ].join('/')}-hover_menu_button`}
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>

                      <div className="hidden peer-hover:flex hover:flex flex-col bg-white drop-shadow-md z-10 absolute">
                        <button
                          className="px-2 h-9 text-slate-400 hover:text-slate-800 whitespace-nowrap align-middle"
                          data-testid={`menu_entry-/${[
                            ...instancePath,
                            ...menuItem.instancePath,
                          ].join('/')}-add_item_button`}
                          onClick={() => {
                            const menuItemValue = menuItem.instancePath.reduce(
                              (value, pathSegment) => {
                                return (value ?? {})[pathSegment]
                              },
                              /** @type {Record<string, any> | null} */ (
                                sanitizedValue
                              )
                            )
                            const sanitizedMenuItemValue = Array.isArray(
                              menuItemValue
                            )
                              ? menuItemValue
                              : []
                            const childType =
                              menuItem.property.metaInfo.arrayType?.type || ''
                            const newItem = getChildItem(
                              menuItem.property,
                              childType
                            )
                            if (newItem !== null) {
                              updateDoc(
                                [...instancePath, ...menuItem.instancePath],
                                sanitizedMenuItemValue.concat([newItem])
                              )
                              setSelectedPath([
                                ...instancePath,
                                ...menuItem.instancePath,
                                String(sanitizedMenuItemValue.length),
                              ])
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} className="pr-2" />
                          {t('menu.addListItem')}
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <button
                    data-testid={
                      [...instancePath, ...menuItem.instancePath].join('-') +
                      '-infoButton'
                    }
                    type="button"
                    className="w-9 h-9 flex-none text-slate-400 hover:text-slate-800"
                    onClick={() => {
                      sideBarData.setSideBarIsOpen(true)
                      sideBarData.setSideBarSelectedPath([
                        ...instancePath,
                        ...menuItem.instancePath,
                      ])
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </div>
                {renderMenuNodes(menuItem.children, level + 1)}
              </li>
            </React.Fragment>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      {!complexProperties?.length ? (
        renderFieldsEditor()
      ) : (
        <>
          {parentProperty?.addMenuItemsForChildObjects ? null : (
            <div className="treeview flex bg-gray-50 border-r border-l border-solid border-gray-400 menu-shadow mr-2">
              {renderMenuNodes(menuNodes)}
            </div>
          )}
          {selectedSubPath ? renderComplexEditor() : renderFieldsEditor()}
        </>
      )}
    </>
  )
}

/**
 * @param {import('../../shared/types').Property} property
 * @param {string[]} [instancePath]
 * @return {Array<{ instancePath: string[] }>}
 */
export function getObjectMenuPaths(property, instancePath = []) {
  const menuProperties =
    property.metaInfo.propertyList?.filter(
      (p) => p.type === 'OBJECT' || p.type === 'ARRAY'
    ) ?? []
  return (
    menuProperties.flatMap((childProperty) => {
      return [
        ...(childProperty.type === 'OBJECT' || childProperty.type === 'ARRAY'
          ? [
              {
                instancePath: [...instancePath, childProperty.key],
              },
            ]
          : []),
        ...(childProperty.type === 'OBJECT' &&
        property.addMenuItemsForChildObjects
          ? getObjectMenuPaths(childProperty, [
              ...instancePath,
              childProperty.key,
            ])
          : []),
      ]
    }) ?? []
  )
}

/**
 * @typedef {object} MenuNode
 * @property {string[]} instancePath
 * @property {import('../../shared/types').Property} property
 * @property {MenuNode[]} children
 */

/**
 * @param {import('../../shared/types').Property} property
 * @param {string[]} [instancePath]
 * @return {Array<MenuNode>}
 */
function getObjectMenuNodes(property, instancePath = []) {
  const menuProperties =
    property.metaInfo.propertyList?.filter(
      (p) => p.type === 'OBJECT' || p.type === 'ARRAY'
    ) ?? []

  return (
    menuProperties.map((childProperty) => {
      return {
        instancePath: [...instancePath, childProperty.key],
        property: childProperty,
        children: property.addMenuItemsForChildObjects
          ? getObjectMenuNodes(childProperty, [
              ...instancePath,
              childProperty.key,
            ])
          : [],
      }
    }) ?? []
  )
}
