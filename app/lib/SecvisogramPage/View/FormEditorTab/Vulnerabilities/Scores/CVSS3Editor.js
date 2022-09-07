import React from 'react'
import DefaultButton from '../../../shared/DefaultButton.js'
import EnumAttribute from '../../shared/EnumAttribute.js'
import NumberAttribute from '../../shared/NumberAttribute.js'
import ObjectContainer from '../../shared/ObjectContainer.js'
import TextAttribute from '../../shared/TextAttribute.js'
import CVSSVector from './CVSS3Editor/CVSSVector.js'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  instancePath: string
 *  onUpdate: (instancePath: string, update: {}) => void
 * }} props
 */
export default function CVSSV3Editor(props) {
  const cvssVector = new CVSSVector(/** @type {{}} */ (props.value) || {})
  const canBeUpgraded = cvssVector.canBeUpgraded

  return (
    <ObjectContainer
      {...props}
      label="JSON Schema for Common Vulnerability Scoring System version 3.1"
      description=""
      defaultValue={() => ({
        version: '3.1',
        vectorString: '',
        baseScore: 0,
        baseSeverity: '',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        confidentialityImpact: '',
        integrityImpact: '',
        availabilityImpact: '',
      })}
    >
      {(objectProps) => {
        const cvssV3Props = (/** @type {string} */ key) => {
          return {
            ...objectProps(key),
            onChange(/** @type {string} */ v) {
              if (key === 'vectorString') return
              const updatedCVSSMetrics = cvssVector.set(key, v)
              props.onUpdate(props.instancePath, {
                $merge: { ...updatedCVSSMetrics.data },
              })
            },
            onDelete() {
              if (key === 'vectorString') return
              const updatedCVSSMetrics = cvssVector.remove(key)
              props.onUpdate(props.instancePath, {
                $merge: { ...updatedCVSSMetrics.data },
              })
            },
          }
        }
        return (
          <>
            <EnumAttribute
              {...cvssV3Props('version')}
              label="CVSS Version"
              description="CVSS Version"
              options={['3.1', '3.0']}
              defaultValue={() => '3.1'}
            />
            <div>
              <TextAttribute
                {...cvssV3Props('vectorString')}
                label="VectorString"
                description=""
                pattern="^CVSS:3.[01]/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
                onBlur={(e) => {
                  const updatedCVSSMetrics = cvssVector.updateFromVectorString(
                    e.target.value
                  )
                  const metrics = updatedCVSSMetrics
                  props.onUpdate(props.instancePath, {
                    $merge: { ...metrics.data },
                  })
                }}
              />
              <div className="mb-2">
                {canBeUpgraded ? (
                  <DefaultButton
                    onClick={() => {
                      props.onUpdate(props.instancePath, {
                        $merge: { ...cvssVector.updateVectorStringTo31().data },
                      })
                    }}
                  >
                    Upgrade to CVSS 3.1
                  </DefaultButton>
                ) : null}
              </div>
            </div>
            <EnumAttribute
              {...cvssV3Props('attackVector')}
              label="AttackVector"
              description=""
              options={['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL']}
            />
            <EnumAttribute
              {...cvssV3Props('attackComplexity')}
              label="AttackComplexity"
              description=""
              options={['HIGH', 'LOW']}
            />
            <EnumAttribute
              {...cvssV3Props('privilegesRequired')}
              label="PrivilegesRequired"
              description=""
              options={['HIGH', 'LOW', 'NONE']}
            />
            <EnumAttribute
              {...cvssV3Props('userInteraction')}
              label="UserInteraction"
              description=""
              options={['NONE', 'REQUIRED']}
            />
            <EnumAttribute
              {...cvssV3Props('scope')}
              label="Scope"
              description=""
              options={['UNCHANGED', 'CHANGED']}
            />
            <EnumAttribute
              {...cvssV3Props('confidentialityImpact')}
              label="ConfidentialityImpact"
              description=""
              options={['NONE', 'LOW', 'HIGH']}
            />
            <EnumAttribute
              {...cvssV3Props('integrityImpact')}
              label="IntegrityImpact"
              description=""
              options={['NONE', 'LOW', 'HIGH']}
            />
            <EnumAttribute
              {...cvssV3Props('availabilityImpact')}
              label="AvailabilityImpact"
              description=""
              options={['NONE', 'LOW', 'HIGH']}
            />
            <NumberAttribute
              {...cvssV3Props('baseScore')}
              label="BaseScore"
              description=""
              step="0.01"
              readOnly
            />
            <TextAttribute
              {...cvssV3Props('baseSeverity')}
              label="BaseSeverity"
              description=""
              readOnly
            />
          </>
        )
      }}
    </ObjectContainer>
  )
}
