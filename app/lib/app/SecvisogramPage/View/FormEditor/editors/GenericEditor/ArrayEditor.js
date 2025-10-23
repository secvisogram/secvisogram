import {
  faCircle,
  faEllipsisVertical,
  faInfoCircle,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SideBarContext from '../../../shared/context/SideBarContext.js'
import SelectedPathContext from '../../../shared/context/SelectedPathContext.js'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import { GenericEditor } from '../../editors.js'
import { getErrorTextColor } from '../GenericEditor.js'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import AppConfigContext from '../../../../../shared/context/AppConfigContext.js'
import UserInfoContext from '../../../../../shared/context/UserInfoContext.js'
import { set } from 'lodash/fp.js'
import pruneEmpty from '../../../../../shared/pruneEmpty.js'
import useChildItem from './shared/getChildItem.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 * @param {boolean} props.enableLast
 */
export default function ArrayEditor({ property, instancePath, enableLast }) {
  const { doc } = React.useContext(DocumentEditorContext)
  const { selectedPath } = React.useContext(SelectedPathContext)

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = Array.isArray(value) ? value : []
  const childProperty =
    /** @type {NonNullable<typeof property.metaInfo.arrayType>} */ (
      property.metaInfo.arrayType
    )
  const recursionProperty =
    property.metaInfo.arrayType?.metaInfo.propertyList?.find(
      (p) => p.type === 'RECURSION'
    )
  const menuStructure = getArrayMenuStructure(
    property,
    recursionProperty ?? null,
    sanitizedValue
  )
  const selectedSubPath = menuStructure
    .slice()
    .sort((a, z) => z.length - a.length)
    .find((menuPath) =>
      menuPath.every(
        (seg, i) => seg === selectedPath.slice(instancePath.length)[i]
      )
    )

  const enable_last_rev_hist_item =
    selectedSubPath?.[0] === String(value?.length - 1) && enableLast

  return (
    <>
      <div className="treeview border-l border-r border-solid bg-gray-50 border-gray-400 menu-shadow mr-2 min-w-[210px]">
        <Menu
          value={sanitizedValue}
          instancePath={instancePath}
          property={property}
        />
      </div>
      {selectedSubPath ? (
        <GenericEditor
          key={selectedPath.join('.')}
          parentProperty={property}
          property={childProperty}
          instancePath={[...instancePath, ...selectedSubPath]}
          enable_last_rev_hist_item={enable_last_rev_hist_item}
        />
      ) : null}
    </>
  )
}

/**
 * @param {import('../../shared/types').Property} property
 * @param {import('../../shared/types').Property | null} recursionProperty
 * @param {any[]} value
 * @param {string[]} instancePath
 * @returns {string[][]}
 */
function getArrayMenuStructure(
  property,
  recursionProperty,
  value,
  instancePath = []
) {
  return Array.isArray(value)
    ? value.flatMap((item, i) => {
        const itemInstancePath = [...instancePath, String(i)]
        return [
          itemInstancePath,
          ...(recursionProperty
            ? getArrayMenuStructure(
                property,
                recursionProperty,
                item[recursionProperty.key],
                [...itemInstancePath, recursionProperty.key]
              )
            : []),
        ]
      })
    : []
}

/**
 * @param {object} props
 * @param {Array<unknown>} props.value
 * @param {string[]} props.instancePath
 * @param {import('../../shared/types').Property} props.property
 * @param {number} [props.level]
 * @returns
 */
function Menu({ instancePath, level = 1, ...props }) {
  const { property } = props

  const { selectedPath, setSelectedPath } =
    React.useContext(SelectedPathContext)
  const { setSideBarIsOpen, setSideBarSelectedPath } =
    React.useContext(SideBarContext)
  const { doc, errors, updateDoc, replaceDoc } = React.useContext(
    DocumentEditorContext
  )
  const { getChildItem } = useChildItem()

  const { loginAvailable } = React.useContext(AppConfigContext)
  const userInfo = React.useContext(UserInfoContext)

  const { t } = useTranslation()

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = Array.isArray(value) ? value : []
  const recursionProperty =
    property.metaInfo.arrayType?.metaInfo.propertyList?.find(
      (p) => p.type === 'RECURSION'
    )
  const isPartOfTheSelection = instancePath.every(
    (pathSegment, i) => pathSegment === selectedPath[i]
  )
  const selectedPathSegment = isPartOfTheSelection
    ? selectedPath.slice(instancePath.length).at(0)
    : undefined
  const selectedIndex = selectedPathSegment ? Number(selectedPathSegment) : null
  const childProperty =
    /** @type {NonNullable<typeof property.metaInfo.arrayType>} */ (
      property.metaInfo.arrayType
    )

  /**
   * @param {number} index
   */
  const setSelectedIndex = (index) => {
    setSelectedPath(instancePath.concat([String(index)]))
  }

  const deletable = !(
    loginAvailable &&
    userInfo &&
    property.metaData?.uiType === 'ARRAY_REVISION_HISTORY'
  )

  return (
    <ul>
      {sanitizedValue.map((childValue, i) => {
        const indexErrors = errors.filter((e) =>
          e.instancePath.startsWith('/' + [...instancePath, i].join('/'))
        )
        let itemName = `${t('arrays.defaultItemName')} ${i + 1}`
        const itemNameTranslationKey =
          childProperty?.metaData?.itemName?.itemNameTranslationKey
        const itemNameField = childProperty?.metaData?.itemName?.itemNameField
        if (itemNameTranslationKey) {
          itemName = `${t(itemNameTranslationKey)} ${i + 1}`
        }
        if (
          itemNameField &&
          itemNameField in childValue &&
          childValue[itemNameField]
        ) {
          itemName = childValue[itemNameField]
        }
        if (itemName.length > 20) {
          itemName = itemName.slice(0, 17) + '...'
        }
        return (
          <li
            key={instancePath.concat([String(i)]).join('.')}
            className="bg-gray-200"
          >
            <div
              data-testid={
                recursionProperty
                  ? `menu_entry-/${[
                      ...instancePath,
                      String(i),
                      recursionProperty.key,
                    ].join('/')}`
                  : `menu_entry-/${[...instancePath, String(i)].join('/')}`
              }
              className={
                (selectedIndex === i ? 'menu_entry-selected font-bold' : '') +
                ' flex w-full'
              }
            >
              <div className="grid place-items-center px-2 h-9">
                <FontAwesomeIcon
                  icon={faCircle}
                  className={getErrorTextColor(indexErrors)}
                  size="xs"
                />
              </div>
              <button
                type="button"
                className={
                  'px-2 h-9 w-full text-left hover:underline whitespace-nowrap'
                }
                onClick={() => {
                  setSelectedIndex(i)
                }}
              >
                {itemName}
              </button>

              {recursionProperty || deletable ? (
                <div>
                  <button className="w-9 h-9 peer text-slate-400 hover:text-slate-800">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>

                  <div className="hidden peer-hover:flex hover:flex flex-col bg-white drop-shadow-md z-10 absolute">
                    {recursionProperty ? (
                      <button
                        className="px-2 h-9 text-left text-slate-400 hover:text-slate-800 whitespace-nowrap align-middle"
                        data-testid={`menu_entry-/${[
                          ...instancePath,
                          String(i),
                          recursionProperty.key,
                        ].join('/')}-add_item_button`}
                        onClick={() => {
                          const subArray = childValue?.[recursionProperty.key]
                          const sanitizedChildValue = Array.isArray(subArray)
                            ? subArray
                            : []
                          const value = getChildItem(
                            property,
                            childProperty.type
                          )
                          if (value !== null) {
                            updateDoc(
                              [
                                ...instancePath,
                                String(i),
                                recursionProperty.key,
                              ],
                              sanitizedChildValue.concat([value])
                            )
                            setSelectedPath([
                              ...instancePath,
                              String(i),
                              recursionProperty.key,
                              String(sanitizedChildValue.length),
                            ])
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} className="pr-2" />
                        {t('menu.addSubItem')}
                      </button>
                    ) : null}
                    {deletable ? (
                      <button
                        data-testid={
                          [...instancePath, i].join('-') + '-deleteButton'
                        }
                        type="button"
                        className="px-2 h-9 text-left text-slate-400 hover:text-slate-800 whitespace-nowrap align-middle"
                        onClick={() => {
                          if (value !== null) {
                            const arrayWithoutItem = _.get(
                              doc,
                              instancePath
                            ).filter(
                              (
                                /** @type {any} */ item,
                                /** @type {number} */ index
                              ) => index !== i
                            )
                            replaceDoc(
                              pruneEmpty(
                                set(instancePath, arrayWithoutItem, doc)
                              )
                            )
                            setSelectedPath(instancePath)
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="pr-2" />{' '}
                        {t('menu.delete')}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <button
                data-testid={[...instancePath, i].join('-') + '-infoButton'}
                type="button"
                className="w-9 h-9 flex-none text-slate-400 hover:text-slate-800"
                onClick={() => {
                  setSideBarIsOpen(true)
                  setSideBarSelectedPath(instancePath.concat(i.toString()))
                }}
              >
                <FontAwesomeIcon icon={faInfoCircle} size="xs" />
              </button>
            </div>
            {recursionProperty ? (
              <Menu
                {...props}
                instancePath={instancePath.concat([
                  String(i),
                  recursionProperty.key,
                ])}
                level={level + 1}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
