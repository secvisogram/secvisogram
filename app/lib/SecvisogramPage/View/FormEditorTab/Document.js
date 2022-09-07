import '@reach/combobox/styles.css'
import React from 'react'
import Publisher from './Document/Publisher.js'
import Tracking from './Document/Tracking.js'
import { Notes, References } from './shared/definitions.js'
import ObjectContainer from './shared/ObjectContainer.js'
import TextAttribute from './shared/TextAttribute.js'
import validationErrorShallowEqual from './shared/validationErrorShallowEqual.js'

export default React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Document(props) {
    return (
      <ObjectContainer
        {...props}
        label="Document level meta-data"
        description="Captures the meta-data about this document describing a particular set of security advisories."
        defaultValue={() => ({
          category: '',
          csaf_version: '2.0',
          publisher: {
            category: '',
            name: '',
            namespace: '',
          },
          title: '',
          tracking: {
            current_release_date: '',
            id: '',
            initial_release_date: '',
            revision_history: [
              {
                date: '',
                number: '',
                summary: '',
              },
            ],
            status: '',
            version: '',
          },
        })}
      >
        {(documentLevelMetaDataProps) => (
          <>
            <TextAttribute
              {...documentLevelMetaDataProps('title')}
              label="Security Bulletin Title"
              description="This SHOULD be a canonical name for the Security Bulletin, and sufficiently unique to distinguish it from similar documents."
              placeholder="Example Security Bulletin: IBM WebSphere Application Server is vulnerable to Cross-site Scripting (CVE-2022-22477)"
            />
            <Notes
              {...documentLevelMetaDataProps('notes')}
              label="Security Bulletin Summary"
              description="Holds the summary associated with the Security Bulletin."
            />
            <References
              {...documentLevelMetaDataProps('references')}
              label="Document references"
              description="Holds a list of references associated with the whole document."
            />
            <Tracking {...documentLevelMetaDataProps('tracking')} />
            <Publisher {...documentLevelMetaDataProps('publisher')} />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
