import {
  faInfoCircle,
  faLightbulb,
  faMagic,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from 'i18next'
import { compile } from 'json-pointer'
import React from 'react'
import isPropertyRelevant from '../../../../../../shared/isPropertyRelevant.js'
import SideBarContext from '../../../../../shared/context/SideBarContext.js'
import DocumentEditorContext from '../../../../../shared/DocumentEditorContext.js'
import RelevanceLevelContext from '../../../../shared/context/RelevanceLevelContext.js'
import AttributeErrors from './AttributeErrors.js'

/**
 * Abstracts the base functionality for all input fields in the editor.
 * It uses the data path to filter the associated validation errors.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.description
 * @param {string[]} props.instancePath
 * @param {React.ReactNode} [props.children]
 * @param {import('../../../../shared/types').Property} props.property
 * @param {boolean} props.disabled
 * @param {() => void} [props.fillFunction]
 * @param {() => void} [props.fillDefaultFunction]
 * @param {import('@fortawesome/fontawesome-svg-core').IconProp} [props.fillFunctionIcon]
 * @param {number} [props.maxErrorWidth]
 */
export default function Attribute({
  label,
  description,
  instancePath,
  children,
  property,
  disabled,
  fillFunction,
  fillDefaultFunction,
  fillFunctionIcon,
  maxErrorWidth,
}) {
  const { errors, doc } = React.useContext(DocumentEditorContext)
  const { selectedRelevanceLevel, relevanceLevels } = React.useContext(
    RelevanceLevelContext
  )

  const { setSideBarIsOpen, setSideBarSelectedPath } =
    React.useContext(SideBarContext)

  const jsonInstancePath = compile(instancePath)

  const localValidationErrors = errors.filter(
    (e) => e.instancePath === jsonInstancePath
  )
  const attributeName = React.useMemo(
    () => instancePath.slice().pop() ?? '',
    [instancePath]
  )

  let showAttribute = true

  const category = doc.document?.category

  if (
    !isPropertyRelevant({
      relevanceLevels,
      category,
      selectedRelevanceLevel,
      property,
    })
  ) {
    showAttribute = false
  }

  return showAttribute ? (
    <section
      className={'mb-2' + (disabled ? ' opacity-50' : '')}
      data-testid={`attribute-${instancePath.join('-')}`}
    >
      <div className="mb-0.5 text-xs font-bold" id={jsonInstancePath}>
        <label
          title={
            attributeName +
            ': ' +
            description +
            (property.examples
              ? '\n\n' +
                t('menu.examples') +
                ':\n' +
                property.examples.join(', ')
              : '')
          }
        >
          {label}
        </label>
        <button
          title="show field info"
          data-testid={instancePath.join('-') + '-infoButton'}
          type="button"
          className="w-6 h-6 flex-none text-slate-400 hover:text-slate-800 m-1"
          onClick={() => {
            setSideBarIsOpen(true)
            setSideBarSelectedPath(instancePath)
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>
        {property.default ? (
          <button
            title="use default value"
            data-testid={instancePath.join('-') + '-defaultButton'}
            type="button"
            className="w-6 h-6 flex-none text-slate-400 hover:text-slate-800 m-1"
            onClick={fillDefaultFunction}
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
        ) : null}
        {fillFunction ? (
          <button
            title="generate value"
            data-testid={instancePath.join('-') + '-generateButton'}
            type="button"
            className="w-6 h-6 flex-none text-slate-400 hover:text-slate-800 m-1"
            onClick={fillFunction}
          >
            <FontAwesomeIcon icon={fillFunctionIcon ?? faMagic} />
          </button>
        ) : null}
      </div>
      {children}
      <AttributeErrors
        validationErrors={localValidationErrors}
        maxWidth={maxErrorWidth}
      />
    </section>
  ) : null
}
