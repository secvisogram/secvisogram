import React from 'react'
import Collapsible from './shared/Collapsible.js'
import CvssScore from './shared/cvssScore.js'
import TextAttribute from './TextAttribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import { cvssDropdown } from './shared/cvssUtils.js'
import {
  vectorUpdateBaseScore,
  vectorUpdateEnvironmentalScore,
  vectorUpdateFromVectorString,
  vectorUpdateTemporalScore,
  vectorUpdateVectorString,
} from '../../../../../../../shared/cvss2Tools.js'
import { set } from 'lodash/fp.js'
import { t } from 'i18next'

/**
 * @param {{
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function CVSSV2Attribute({
  instancePath,
  value,
  property,
  disabled,
}) {
  const { doc, updateDoc, ...outerDocumentEditor } = React.useContext(
    DocumentEditorContext
  )

  /** @type {React.ContextType<typeof DocumentEditorContext>} */
  const documentEditor = React.useMemo(
    () => ({
      ...outerDocumentEditor,
      doc,
      updateDoc(updatedInstancePath, updatedValue) {
        const field = updatedInstancePath.at(-1)
        let updatedVector = set(
          updatedInstancePath.slice(instancePath.length),
          updatedValue
        )(value)
        updatedVector.version = '2.0'

        updatedVector =
          field === 'vectorString' && typeof updatedValue === 'string'
            ? vectorUpdateFromVectorString(updatedVector)
            : vectorUpdateVectorString(updatedVector)

        updatedVector = vectorUpdateBaseScore(updatedVector)
        updatedVector = vectorUpdateTemporalScore(updatedVector)
        updatedVector = vectorUpdateEnvironmentalScore(updatedVector)
        updateDoc(instancePath, updatedVector)
      },
    }),
    [outerDocumentEditor, updateDoc, instancePath, value, doc]
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
          ['2.0'],
          property,
          disabled,
          true
        )}
        <TextAttribute
          label="VectorString"
          description=""
          pattern="^((AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))/)*(AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))$"
          minLength={1}
          instancePath={instancePath.concat(['vectorString'])}
          value={value?.vectorString || ''}
          property={property}
          disabled={disabled}
          required={true}
        />
        <CvssScore score={value?.baseScore} severity={undefined}></CvssScore>
        <Collapsible startCollapsed={true} title={t('cvssEditor.baseInputs')}>
          {cvssDropdown(
            instancePath,
            'accessVector',
            getChildValue('accessVector'),
            ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'accessComplexity',
            getChildValue('accessComplexity'),
            ['HIGH', 'MEDIUM', 'LOW'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'authentication',
            getChildValue('authentication'),
            ['MULTIPLE', 'SINGLE', 'NONE'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'confidentialityImpact',
            getChildValue('confidentialityImpact'),
            ['NONE', 'PARTIAL', 'COMPLETE'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'integrityImpact',
            getChildValue('integrityImpact'),
            ['NONE', 'PARTIAL', 'COMPLETE'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'availabilityImpact',
            getChildValue('availabilityImpact'),
            ['NONE', 'PARTIAL', 'COMPLETE'],
            property,
            disabled
          )}
        </Collapsible>

        <CvssScore
          score={value?.temporalScore}
          severity={undefined}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.temporalInputs')}
        >
          {cvssDropdown(
            instancePath,
            'exploitability',
            getChildValue('exploitability'),
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
            ['UNCONFIRMED', 'UNCORROBORATED', 'CONFIRMED', 'NOT_DEFINED'],
            property,
            disabled
          )}
        </Collapsible>

        <CvssScore
          score={value?.environmentalScore}
          severity={undefined}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.environmentalInputs')}
        >
          {cvssDropdown(
            instancePath,
            'collateralDamagePotential',
            getChildValue('collateralDamagePotential'),
            ['NONE', 'LOW', 'LOW_MEDIUM', 'MEDIUM_HIGH', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}
          {cvssDropdown(
            instancePath,
            'targetDistribution',
            getChildValue('targetDistribution'),
            ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            property,
            disabled
          )}
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
        </Collapsible>
      </div>
    </DocumentEditorContext.Provider>
  )
}
