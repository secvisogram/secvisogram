import { faClock } from '@fortawesome/free-solid-svg-icons'
import { t } from 'i18next'
import React from 'react'
import AppConfigContext from '../../../../shared/context/AppConfigContext.js'
import AppErrorContext from '../../../../shared/context/AppErrorContext.js'
import UserInfoContext from '../../../../shared/context/UserInfoContext.js'
import DocumentEditorContext from '../../shared/DocumentEditorContext.js'
import {
  getBranchName,
  getCurrentDateRounded,
  getCurrentReleaseDate,
  getInitialReleaseDate,
  getRelationshipName,
  useUniqueProductId,
} from '../shared/fillFieldFunctions.js'
import ArrayEditor from './GenericEditor/ArrayEditor.js'
import CVSSV2Attribute from './GenericEditor/Attributes/CVSS2Attribute.js'
import CVSSV3Attribute from './GenericEditor/Attributes/CVSS3Attribute.js'
import CweAttribute from './GenericEditor/Attributes/CweAttribute.js'
import DateAttribute from './GenericEditor/Attributes/DateAttribute.js'
import DropdownAttribute from './GenericEditor/Attributes/DropdownAttribute.js'
import IdAttribute from './GenericEditor/Attributes/IdAttribute.js'
import Attribute from './GenericEditor/Attributes/shared/Attribute.js'
import TextAreaAttribute from './GenericEditor/Attributes/TextAreaAttribute.js'
import TextAttribute from './GenericEditor/Attributes/TextAttribute.js'
import ObjectEditor from './GenericEditor/ObjectEditor.js'

/**
 * utility function to get the color of circles identifying errors
 *
 * @param {Array<{ instancePath: string; message?: string; type?: string}>} errors
 * @returns {string}
 */
export function getErrorTextColor(errors) {
  const errorTypes = errors.map((e) => e.type)
  return errorTypes.includes('error')
    ? 'text-red-600'
    : errorTypes.includes('warning')
    ? 'text-yellow-600'
    : errorTypes.includes('info')
    ? 'text-blue-600'
    : errors.length
    ? 'text-red-600' // fall back to red if there are errors but their type is not known
    : 'text-green-600'
}

/**
 * @param {object} props
 * @param {import('../shared/types').Property | null} props.parentProperty
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 * @param {boolean} props.enable_last_rev_hist_item
 */
export default function Editor({
  parentProperty,
  property,
  instancePath,
  enable_last_rev_hist_item,
}) {
  const { loginAvailable } = React.useContext(AppConfigContext)
  const userInfo = React.useContext(UserInfoContext)

  const { doc, updateDoc, collectIds } = React.useContext(DocumentEditorContext)
  const { uniqueProductId } = useUniqueProductId()

  const { handleError } = React.useContext(AppErrorContext)

  const uiType = property.metaData?.uiType
  const enableLast = uiType === 'ARRAY_REVISION_HISTORY'
  const attributeName = React.useMemo(
    () => instancePath.slice().pop() ?? '',
    [instancePath]
  )
  /** @type {boolean} */ let disabled
  if (
    enable_last_rev_hist_item &&
    ['legacy_version', 'summary'].includes(attributeName)
  ) {
    disabled = false
  } else {
    disabled =
      loginAvailable && userInfo
        ? property.metaData?.disable?.ifServerMode || false
        : property.metaData?.disable?.ifStandaloneMode || false
  }
  const label = t([`csaf.${property.metaData?.i18n?.title}`, 'missing title'])
  const description = t([
    `csaf.${property.metaData?.i18n?.description}`,
    'missing description',
  ])

  /** @type {unknown} */
  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))

  /**
   * helper function to wrap singleton input fields in a div with layout information
   * @param {() => JSX.Element} componentFn
   */
  function wrapIfSingleton(componentFn) {
    return parentProperty?.type === 'ARRAY' ? (
      <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px] max-w-[400px]">
        {componentFn()}
      </div>
    ) : (
      componentFn()
    )
  }

  const fillFunction =
    uiType === 'STRING_GENERATE_PRODUCT_ID'
      ? () => updateDoc(instancePath, uniqueProductId())
      : uiType === 'STRING_BRANCH_FULL_PRODUCT_NAME'
      ? () => {
          // update the field but remove the field itself from the instancePath otherwise the old value will be appended
          updateDoc(instancePath, getBranchName(doc, instancePath.slice(0, -1)))
        }
      : uiType === 'STRING_RELATIONSHIP_FULL_PRODUCT_NAME'
      ? () =>
          getRelationshipName(doc, instancePath, collectIds['productIds']).then(
            (r) => updateDoc(instancePath, r),
            handleError
          )
      : property.key === 'date'
      ? () => updateDoc(instancePath, getCurrentDateRounded())
      : property.key === 'current_release_date'
      ? () => {
          const currentReleaseDate = getCurrentReleaseDate(doc)
          updateDoc(instancePath, currentReleaseDate?.date)
          const versionInstancePath = instancePath
            .slice(0, -1)
            .concat('version')
          updateDoc(versionInstancePath, currentReleaseDate?.number)
        }
      : property.key === 'initial_release_date'
      ? () => updateDoc(instancePath, getInitialReleaseDate(doc))
      : undefined

  const fillDefaultFunction = () => {
    if (property.default) updateDoc(instancePath, property.default)
  }

  const fillFunctionIcon = property.key === 'date' ? faClock : undefined

  if (property.type === 'ARRAY') {
    return (
      <ArrayEditor
        property={property}
        instancePath={instancePath}
        enableLast={enableLast}
      />
    )
  } else if (property.type === 'OBJECT') {
    if (uiType === 'OBJECT_CWE') {
      return (
        <CweAttribute
          property={property}
          instancePath={instancePath}
          disabled={disabled}
        />
      )
    } else if (uiType === 'OBJECT_CVSS_2') {
      return (
        <CVSSV2Attribute
          instancePath={instancePath}
          value={/** @type {{[key: string]: string | number }} */ (value)}
          property={property}
          disabled={disabled}
        />
      )
    } else if (uiType === 'OBJECT_CVSS_3') {
      return (
        <CVSSV3Attribute
          instancePath={instancePath}
          value={/** @type {{[key: string]: string | number }} */ (value)}
          property={property}
          disabled={disabled}
        />
      )
    }
    return (
      <ObjectEditor
        parentProperty={parentProperty}
        property={property}
        instancePath={instancePath}
        enable_last_rev_hist_item={enable_last_rev_hist_item}
      />
    )
  } else if (property.type === 'STRING') {
    if (uiType === 'STRING_DATETIME') {
      return wrapIfSingleton(() => (
        <DateAttribute
          label={label}
          description={description}
          instancePath={instancePath}
          value={value || ''}
          property={property}
          disabled={disabled}
          fillFunction={fillFunction}
          fillFunctionIcon={fillFunctionIcon}
        />
      ))
    } else if (uiType === 'STRING_ENUM') {
      return wrapIfSingleton(() => (
        <DropdownAttribute
          label={label}
          description={description}
          options={/** @type {string[]} */ (property.enum || [])}
          isEnum={false}
          instancePath={instancePath}
          value={value || ''}
          property={property}
          disabled={disabled}
          disableClearable={false}
          fillDefaultFunction={fillDefaultFunction}
        />
      ))
    } else if (uiType === 'STRING_WITH_OPTIONS') {
      return wrapIfSingleton(() => (
        <DropdownAttribute
          label={label}
          description={description}
          options={/** @type {string[]} */ (property.metaData?.options || [])}
          isEnum={false}
          instancePath={instancePath}
          value={value || ''}
          property={property}
          disabled={disabled}
          disableClearable={false}
        />
      ))
    } else if (uiType === 'STRING_MULTI_LINE') {
      return wrapIfSingleton(() => (
        <TextAreaAttribute
          label={label}
          description={description}
          minLength={property.minLength || 0}
          instancePath={instancePath}
          value={value || ''}
          property={property}
          disabled={disabled}
        />
      ))
    } else if (uiType === 'STRING_PRODUCT_ID') {
      return wrapIfSingleton(() => (
        <IdAttribute
          label={property.title || ''}
          description={description}
          instancePath={instancePath}
          value={value || ''}
          onCollectIds={collectIds['productIds']}
          property={property}
          disabled={disabled}
        />
      ))
    } else if (uiType === 'STRING_GROUP_ID') {
      return wrapIfSingleton(() => (
        <IdAttribute
          label={property.title || ''}
          description={description}
          instancePath={instancePath}
          value={value || ''}
          onCollectIds={collectIds['groupIds']}
          property={property}
          disabled={disabled}
        />
      ))
    } else if (uiType === 'STRING_URI') {
      return wrapIfSingleton(() => (
        <TextAttribute
          label={label}
          description={description}
          minLength={property.minLength || 0}
          type={'url'}
          pattern={property.pattern}
          placeholder={property.default}
          instancePath={instancePath}
          value={value || ''}
          property={property}
          disabled={disabled}
          fillDefaultFunction={fillDefaultFunction}
        />
      ))
    } else {
      return wrapIfSingleton(() => (
        <TextAttribute
          label={label}
          description={description}
          minLength={property.minLength || 0}
          pattern={property.pattern}
          placeholder={property.default}
          instancePath={instancePath}
          value={value || ''}
          property={property}
          disabled={disabled}
          fillFunction={fillFunction}
          fillDefaultFunction={fillDefaultFunction}
        />
      ))
    }
  } else if (property.type === 'NUMBER') {
    return wrapIfSingleton(() => (
      <Attribute
        description={description}
        instancePath={instancePath}
        label={label}
        property={property}
        disabled={false}
      >
        {typeof value === 'number' ? String(value) : ''}
      </Attribute>
    ))
  } else if (property.type === 'RECURSION') {
    // type is handled in ArrayEditor
    return null
  } else {
    console.log(`unknown type '${property.type}' for ${property.title}`)
    return null
  }
}
