import { t } from 'i18next'
import React from 'react'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import TextAttribute from './TextAttribute.js'
import Collapsible from './shared/Collapsible.js'
import CvssScore from './shared/cvssScore.js'
import { cvssDropdown } from './shared/cvssUtils.js'
import {
  Cvss4JsonWrapper,
  flatMetrics,
  metricGroupsFormMetricTypeId,
} from './CVSS4Attribute/cvss4.js'

/**
 * @param {{
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types').Property
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
  console.log('initial value ')
  console.log(value)
  const cvss40 = React.useMemo(() => new Cvss4JsonWrapper(value || {}), [value])

  /** @type {React.ContextType<typeof DocumentEditorContext>} */
  const documentEditor = React.useMemo(
    () => ({
      ...outerDocumentEditor,
      doc,
      updateDoc(updatedInstancePath, updatedValue) {
        const field = updatedInstancePath.at(-1)

        console.log(field)
        console.log(updatedValue)
        if (field === 'vectorString' && typeof updatedValue === 'string') {
          cvss40.updateFromVectorString(updatedValue)
        } else if (typeof field === 'string') {
          cvss40.set(field, /** @type string */ (updatedValue))
        }

        updateDoc(instancePath, cvss40.data)
      },
    }),
    [outerDocumentEditor, updateDoc, instancePath, doc, cvss40]
  )

  /** @type {(metricTypeId: string) => any} */
  function dropdownGroupsFor(metricTypeId) {
    return (
      <div>
        {metricGroupsFormMetricTypeId(metricTypeId).map((group) =>
          cvssDropdownGroup(metricTypeId, group)
        )}
      </div>
    )
  }

  /**
   * @param {string} metricTypeId
   * @param {string} groupName
   */
  function cvssDropdownGroup(metricTypeId, groupName) {
    return (
      <div>
        {groupName}
        {flatMetrics
          .filter(
            (metric) =>
              metric.metricTypeId === metricTypeId &&
              metric.metricGroup === groupName
          )
          .map((metric) =>
            dropdownFor(
              metric.jsonName,
              metric.options.map((option) => option.optionValue)
            )
          )}
      </div>
    )
  }

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
          pattern="^CVSS:4[.]0/AV:[NALP]/AC:[LH]/AT:[NP]/PR:[NLH]/UI:[NPA]/VC:[HLN]/VI:[HLN]/VA:[HLN]/SC:[HLN]/SI:[HLN]/SA:[HLN](/E:[XAPU])?(/CR:[XHML])?(/IR:[XHML])?(/AR:[XHML])?(/MAV:[XNALP])?(/MAC:[XLH])?(/MAT:[XNP])?(/MPR:[XNLH])?(/MUI:[XNPA])?(/MVC:[XNLH])?(/MVI:[XNLH])?(/MVA:[XNLH])?(/MSC:[XNLH])?(/MSI:[XNLHS])?(/MSA:[XNLHS])?(/S:[XNP])?(/AU:[XNY])?(/R:[XAUI])?(/V:[XDC])?(/RE:[XLMH])?(/U:(X|Clear|Green|Amber|Red))?$"
          minLength={1}
          instancePath={instancePath.concat(['vectorString'])}
          value={value?.vectorString || ''}
          property={property}
          disabled={disabled}
          required={true}
        />
        <CvssScore
          score={value?.baseScore}
          severity={value?.baseSeverity}
        ></CvssScore>
        <Collapsible startCollapsed={true} title={t('cvssEditor.baseInputs')}>
          {dropdownGroupsFor('BASE')}
        </Collapsible>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.supplementalInputs')}
        >
          {dropdownGroupsFor('SUPPLEMENTAL')}
        </Collapsible>

        <CvssScore
          score={value?.environmentalScore}
          severity={value?.environmentalSeverity}
        ></CvssScore>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.environmentalInputs')}
        >
          {dropdownGroupsFor('ENVIRONMENTAL')}
        </Collapsible>

        <CvssScore
          score={value?.threatScore}
          severity={value?.threatScore}
        ></CvssScore>
        <Collapsible startCollapsed={true} title={t('cvssEditor.threatInputs')}>
          {dropdownGroupsFor('THREAT')}
        </Collapsible>
      </div>
    </DocumentEditorContext.Provider>
  )
}
