import { t } from 'i18next'
import React from 'react'
import DefaultButton from '../../../../shared/DefaultButton.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import CVSSVector from './CVSS3Attribute/CVSSVector.js'
import TextAttribute from './TextAttribute.js'
import Collapsible from './shared/Collapsible.js'
import CvssScore from './shared/cvssScore.js'
import { cvssDropdown } from './shared/cvssUtils.js'

/**
 * @param {{
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types.js').Property
 *  disabled: boolean
 * }} props
 */
export default function CVSSV4Attribute({
  instancePath,
  value,
  property,
  disabled,
}) {
  const { doc, updateDoc, ...outerDocumentEditor } = React.useContext(
    DocumentEditorContext
  )

  const cvssVector = React.useMemo(
    () => new CVSSVector(/** @type {{}} */ (value) || {}),
    [value]
  )
  const canBeUpgraded = cvssVector.canBeUpgraded

  /** @type {React.ContextType<typeof DocumentEditorContext>} */
  const documentEditor = React.useMemo(
    () => ({
      ...outerDocumentEditor,
      doc,
      updateDoc(updatedInstancePath, updatedValue) {
        const field = updatedInstancePath.at(-1)

        const updatedVector =
          field === 'vectorString' && typeof updatedValue === 'string'
            ? cvssVector.updateFromVectorString(updatedValue).data
            : field
            ? cvssVector.set(field, /** @type string */ (updatedValue)).data
            : {}

        updateDoc(instancePath, updatedVector)
      },
    }),
    [outerDocumentEditor, updateDoc, instancePath, doc, cvssVector]
  )

  /** @type {(childName: string, options: string[], disableClearable?: boolean) => any} */
  function dropdownFor(childName, options, disableClearable = false) {
    const childValue = /** @type {string} */ ((value || {})[childName]) || ''
    return cvssDropdown(
      instancePath,
      childName,
      childValue,
      options,
      property,
      disabled,
      disableClearable
    )
  }

  return (
    <DocumentEditorContext.Provider value={documentEditor}>
      <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px]">
        {dropdownFor('version', ['4.0'], true)}
        <TextAttribute
          label="VectorString"
          description=""
          pattern="^CVSS:4.[01]/((AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
          minLength={1}
          instancePath={instancePath.concat(['vectorString'])}
          value={value?.vectorString || ''}
          property={property}
          disabled={disabled}
          required={true}
        />
        {canBeUpgraded ? (
          <div className="mb-2">
            <DefaultButton
              onClick={() => {
                const updatedCVSSMetrics = cvssVector.set('version', '4.1')
                updateDoc(instancePath, updatedCVSSMetrics.data)
              }}
            >
              Upgrade to CVSS 4.1
            </DefaultButton>
          </div>
        ) : null}

        <CvssScore
          score={value?.baseScore}
          severity={value?.baseSeverity}
        ></CvssScore>
        <Collapsible startCollapsed={true} title={t('cvssEditor.baseInputs')}>
          {dropdownFor('attackVector', [
            'NETWORK',
            'ADJACENT_NETWORK',
            'LOCAL',
            'PHYSICAL',
          ])}
          {dropdownFor('attackComplexity', ['HIGH', 'LOW'])}
          {dropdownFor('privilegesRequired', ['NONE', 'HIGH', 'LOW'])}
          {dropdownFor('userInteraction', ['NONE', 'REQUIRED'])}
          {dropdownFor('scope', ['UNCHANGED', 'CHANGED'])}
          {dropdownFor('confidentialityImpact', ['NONE', 'HIGH', 'LOW'])}
          {dropdownFor('integrityImpact', ['NONE', 'HIGH', 'LOW'])}
          {dropdownFor('availabilityImpact', ['NONE', 'HIGH', 'LOW'])}
        </Collapsible>

        <CvssScore
          score={value?.temporalScore}
          severity={value?.temporalSeverity}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.temporalInputs')}
        >
          {dropdownFor(
            'exploitCodeMaturity',
            [
              'UNPROVEN',
              'PROOF_OF_CONCEPT',
              'FUNCTIONAL',
              'HIGH',
              'NOT_DEFINED',
            ],
            false
          )}
          {dropdownFor(
            'remediationLevel',
            [
              'OFFICIAL_FIX',
              'TEMPORARY_FIX',
              'WORKAROUND',
              'UNAVAILABLE',
              'NOT_DEFINED',
            ],
            false
          )}
          {dropdownFor(
            'reportConfidence',
            ['UNKNOWN', 'REASONABLE', 'CONFIRMED', 'NOT_DEFINED'],
            false
          )}
        </Collapsible>

        <CvssScore
          score={value?.environmentalScore}
          severity={value?.environmentalSeverity}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.environmentalInputs')}
        >
          {dropdownFor(
            'confidentialityRequirement',
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'integrityRequirement',
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'availabilityRequirement',
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedAttackVector',
            ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedAttackComplexity',
            ['HIGH', 'LOW', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedPrivilegesRequired',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedUserInteraction',
            ['NONE', 'REQUIRED', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedScope',
            ['UNCHANGED', 'CHANGED', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedConfidentialityImpact',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedIntegrityImpact',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedAvailabilityImpact',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
        </Collapsible>
      </div>
    </DocumentEditorContext.Provider>
  )
}
