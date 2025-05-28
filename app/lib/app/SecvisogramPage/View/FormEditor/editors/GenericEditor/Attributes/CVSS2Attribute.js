import { t } from 'i18next'
import { set } from 'lodash/fp.js'
import React from 'react'
import {
  vectorUpdateBaseScore,
  vectorUpdateEnvironmentalScore,
  vectorUpdateFromVectorString,
  vectorUpdateTemporalScore,
  vectorUpdateVectorString,
} from '../../../../../../../shared/cvss2Tools.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import TextAttribute from './TextAttribute.js'
import Collapsible from './shared/Collapsible.js'
import CvssScore from './shared/cvssScore.js'
import { cvssDropdown } from './shared/cvssUtils.js'

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
        {dropdownFor('version', ['2.0'], true)}
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
          maxErrorWidth={400}
        />
        <CvssScore score={value?.baseScore} severity={undefined}></CvssScore>
        <Collapsible startCollapsed={true} title={t('cvssEditor.baseInputs')}>
          {dropdownFor('accessVector', [
            'NETWORK',
            'ADJACENT_NETWORK',
            'LOCAL',
          ])}
          {dropdownFor('accessComplexity', ['HIGH', 'MEDIUM', 'LOW'])}
          {dropdownFor('authentication', ['MULTIPLE', 'SINGLE', 'NONE'])}
          {dropdownFor('confidentialityImpact', [
            'NONE',
            'PARTIAL',
            'COMPLETE',
          ])}
          {dropdownFor('integrityImpact', ['NONE', 'PARTIAL', 'COMPLETE'])}
          {dropdownFor('availabilityImpact', ['NONE', 'PARTIAL', 'COMPLETE'])}
        </Collapsible>

        <CvssScore
          score={value?.temporalScore}
          severity={undefined}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.temporalInputs')}
        >
          {dropdownFor('exploitability', [
            'UNPROVEN',
            'PROOF_OF_CONCEPT',
            'FUNCTIONAL',
            'HIGH',
            'NOT_DEFINED',
          ])}
          {dropdownFor('remediationLevel', [
            'OFFICIAL_FIX',
            'TEMPORARY_FIX',
            'WORKAROUND',
            'UNAVAILABLE',
            'NOT_DEFINED',
          ])}
          {dropdownFor('reportConfidence', [
            'UNCONFIRMED',
            'UNCORROBORATED',
            'CONFIRMED',
            'NOT_DEFINED',
          ])}
        </Collapsible>

        <CvssScore
          score={value?.environmentalScore}
          severity={undefined}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.environmentalInputs')}
        >
          {dropdownFor(
            'collateralDamagePotential',
            ['NONE', 'LOW', 'LOW_MEDIUM', 'MEDIUM_HIGH', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'targetDistribution',
            ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
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
        </Collapsible>
      </div>
    </DocumentEditorContext.Provider>
  )
}
