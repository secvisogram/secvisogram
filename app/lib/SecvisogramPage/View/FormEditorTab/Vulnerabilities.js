import '@reach/combobox/styles.css'
import React from 'react'
import ArrayContainer from './shared/ArrayContainer.js'
import DateAttribute from './shared/DateAttribute.js'
import {
  Notes,
  ProductGroups,
  Products,
  References,
} from './shared/definitions.js'
import EnumAttribute from './shared/EnumAttribute.js'
import ObjectContainer from './shared/ObjectContainer.js'
import TextAreaAttribute from './shared/TextAreaAttribute.js'
import TextAttribute from './shared/TextAttribute.js'
import validationErrorShallowEqual from './shared/validationErrorShallowEqual.js'
import Scores from './Vulnerabilities/Scores.js'

export default React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function Vulnerabilities({
    onCollectProductIds,
    onCollectGroupIds,
    ...props
  }) {
    return (
      <ArrayContainer
        {...props}
        label="Vulnerabilities"
        description="Represents a list of all relevant vulnerability information items."
        defaultItemValue={() => ({})}
      >
        {(itemProps) => (
          <Vulnerability
            {...itemProps}
            onCollectProductIds={onCollectProductIds}
            onCollectGroupIds={onCollectGroupIds}
          />
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)

const Vulnerability = React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  defaultValue?(): {}
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function Vulnerability({ onCollectProductIds, onCollectGroupIds, ...props }) {
    return (
      <ObjectContainer
        {...props}
        label="Vulnerability"
        description="Is a container for the aggregation of all fields that are related to a single vulnerability in the document."
      >
        {(vulnerabilityProps) => (
          <>
            <TextAttribute
              {...vulnerabilityProps('cve')}
              label="CVE"
              description="Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability."
              pattern="^CVE-[0-9]{4}-[0-9]{4,}$"
              deletable
            />
            <DateAttribute
              {...vulnerabilityProps('discovery_date')}
              label="Discovery date"
              description="Holds the date and time the vulnerability was originally discovered."
              deletable
            />
            <Notes
              {...vulnerabilityProps('notes')}
              label="Vulnerability notes"
              description="Holds notes associated with this vulnerability item."
            />
            <ObjectContainer
              {...vulnerabilityProps('product_status')}
              label="Product status"
              description="Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability."
              defaultValue={() => ({})}
            >
              {(productStatusProps) => (
                <>
                  <Products
                    {...productStatusProps('fixed')}
                    label="Fixed"
                    description="These versions contain a fix for the vulnerability but may not be the recommended fixed versions."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('known_affected')}
                    label="Known affected"
                    description="These versions are known to be affected by the vulnerability."
                    onCollectProductIds={onCollectProductIds}
                  />
                </>
              )}
            </ObjectContainer>
            <References
              {...vulnerabilityProps('references')}
              label="Vulnerability references"
              description="Holds a list of references associated with this vulnerability item."
            />
            <ArrayContainer
              {...vulnerabilityProps('remediations')}
              label="List of remediations"
              description="Contains a list of remediations."
              defaultItemValue={() => ({
                category: '',
                details: '',
              })}
            >
              {(remediationItemProps) => (
                <ObjectContainer
                  {...remediationItemProps}
                  label="Remediation"
                  description="Specifies details on how to handle (and presumably, fix) a vulnerability."
                >
                  {(remediationProps) => (
                    <>
                      <EnumAttribute
                        {...remediationProps('category')}
                        label="Category of the remediation"
                        description="Specifies the category which this remediation belongs to."
                        options={[
                          'workaround',
                          'mitigation',
                          'vendor_fix',
                          'none_available',
                          'no_fix_planned',
                        ]}
                      />
                      <DateAttribute
                        {...remediationProps('date')}
                        label="Date of the remediation"
                        description="Contains the date from which the remediation is available."
                        deletable
                      />
                      <TextAreaAttribute
                        {...remediationProps('details')}
                        label="Details of the remediation"
                        description="Contains a thorough human-readable discussion of the remediation."
                      />
                      <Products
                        {...remediationProps('product_ids')}
                        onCollectProductIds={onCollectProductIds}
                      />
                      <TextAttribute
                        {...remediationProps('url')}
                        label="URL to the remediation"
                        description="Contains the URL where to obtain the remediation."
                        type="url"
                        deletable
                      />
                    </>
                  )}
                </ObjectContainer>
              )}
            </ArrayContainer>
            <Scores
              {...vulnerabilityProps('scores')}
              onCollectProductIds={onCollectProductIds}
            />
            <ArrayContainer
              {...vulnerabilityProps('threats')}
              label="List of threats"
              description="Contains information about a vulnerability that can change with time."
              defaultItemValue={() => ({
                category: '',
                details: '',
              })}
            >
              {(threatItemProps) => (
                <ObjectContainer
                  {...threatItemProps}
                  label="Threat"
                  description="Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available."
                >
                  {(threatProps) => (
                    <>
                      <EnumAttribute
                        {...threatProps('category')}
                        label="Category of the threat"
                        description="Categorizes the threat according to the rules of the specification."
                        options={['impact', 'exploit_status', 'target_set']}
                      />
                      <DateAttribute
                        {...threatProps('date')}
                        label="Date of the threat"
                        description="Contains the date when the assessment was done or the threat appeared."
                        deletable
                      />
                      <TextAreaAttribute
                        {...threatProps('details')}
                        label="Details of the threat"
                        description="Represents a thorough human-readable discussion of the threat."
                      />
                      <ProductGroups
                        {...threatProps('group_ids')}
                        onCollectGroupIds={onCollectGroupIds}
                      />
                      <Products
                        {...threatProps('product_ids')}
                        onCollectProductIds={onCollectProductIds}
                      />
                    </>
                  )}
                </ObjectContainer>
              )}
            </ArrayContainer>
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
