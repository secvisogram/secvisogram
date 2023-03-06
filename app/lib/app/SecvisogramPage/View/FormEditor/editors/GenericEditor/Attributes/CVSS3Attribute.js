import React from 'react'
import Collapsible from './shared/Collapsible.js'
import CvssScore from './shared/cvssScore.js'
import TextAttribute from './TextAttribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import DefaultButton from '../../../../shared/DefaultButton.js'
import CVSSVector from './CVSS3Attribute/CVSSVector.js'
import { cvssDropdown } from './shared/cvssUtils.js'
import { t } from 'i18next'

/**
 * @param {{
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function CVSSV3Attribute({
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

  const getChildValue = (/** @type {string} */ childName) =>
    /** @type {string} */ ((value || {})[childName]) || ''

  return (
    <DocumentEditorContext.Provider value={documentEditor}>
      <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px]">
        {cvssDropdown(
          instancePath,
          'version',
          getChildValue('version'),
          ['3.0', '3.1'],
          property,
          disabled,
          true
        )}
        <TextAttribute
          label="VectorString"
          description=""
          pattern="^CVSS:3.[01]/((AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
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
                const updatedCVSSMetrics = cvssVector.set('version', '3.1')
                updateDoc(instancePath, updatedCVSSMetrics.data)
              }}
            >
              Upgrade to CVSS 3.1
            </DefaultButton>
          </div>
        ) : null}

        <CvssScore
          score={value?.baseScore}
          severity={value?.baseSeverity}
        ></CvssScore>
        <Collapsible startCollapsed={true} title={t('cvssEditor.baseInputs')}>
          {cvssDropdown(
            instancePath,
            'attackVector',
            getChildValue('attackVector'),
            ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'attackComplexity',
            getChildValue('attackComplexity'),
            ['HIGH', 'LOW'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'privilegesRequired',
            getChildValue('privilegesRequired'),
            ['NONE', 'HIGH', 'LOW'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'userInteraction',
            getChildValue('userInteraction'),
            ['NONE', 'REQUIRED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'scope',
            getChildValue('scope'),
            ['UNCHANGED', 'CHANGED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'confidentialityImpact',
            getChildValue('confidentialityImpact'),
            ['NONE', 'HIGH', 'LOW'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'integrityImpact',
            getChildValue('integrityImpact'),
            ['NONE', 'HIGH', 'LOW'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'availabilityImpact',
            getChildValue('availabilityImpact'),
            ['NONE', 'HIGH', 'LOW'],
            property,
            disabled
          )}
        </Collapsible>

        <CvssScore
          score={value?.temporalScore}
          severity={value?.temporalSeverity}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.temporalInputs')}
        >
          {cvssDropdown(
            instancePath,
            'exploitCodeMaturity',
            getChildValue('exploitCodeMaturity'),
            [
              'UNPROVEN',
              'PROOF_OF_CONCEPT',
              'FUNCTIONAL',
              'HIGH',
              'NOT_DEFINED',
            ],
            property,
            disabled
          )}

          {cvssDropdown(
            instancePath,
            'remediationLevel',
            getChildValue('remediationLevel'),
            [
              'OFFICIAL_FIX',
              'TEMPORARY_FIX',
              'WORKAROUND',
              'UNAVAILABLE',
              'NOT_DEFINED',
            ],
            property,
            disabled
          )}

          {cvssDropdown(
            instancePath,
            'reportConfidence',
            getChildValue('reportConfidence'),
            ['UNKNOWN', 'REASONABLE', 'CONFIRMED', 'NOT_DEFINED'],
            property,
            disabled
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
          {cvssDropdown(
            instancePath,
            'confidentialityRequirement',
            getChildValue('confidentialityRequirement'),
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}

          {cvssDropdown(
            instancePath,
            'integrityRequirement',
            getChildValue('integrityRequirement'),
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}

          {cvssDropdown(
            instancePath,
            'availabilityRequirement',
            getChildValue('availabilityRequirement'),
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}

          {cvssDropdown(
            instancePath,
            'modifiedAttackVector',
            getChildValue('modifiedAttackVector'),
            ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedAttackComplexity',
            getChildValue('modifiedAttackComplexity'),
            ['HIGH', 'LOW', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedPrivilegesRequired',
            getChildValue('modifiedPrivilegesRequired'),
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedUserInteraction',
            getChildValue('modifiedUserInteraction'),
            ['NONE', 'REQUIRED', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedScope',
            getChildValue('modifiedScope'),
            ['UNCHANGED', 'CHANGED', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedConfidentialityImpact',
            getChildValue('modifiedConfidentialityImpact'),
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedIntegrityImpact',
            getChildValue('modifiedIntegrityImpact'),
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'modifiedAvailabilityImpact',
            getChildValue('modifiedAvailabilityImpact'),
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}
        </Collapsible>
      </div>
    </DocumentEditorContext.Provider>
  )
}
