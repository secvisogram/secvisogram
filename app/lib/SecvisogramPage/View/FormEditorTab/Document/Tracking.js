import '@reach/combobox/styles.css'
import React from 'react'
import DateAttribute from '../shared/DateAttribute.js'
import { Version } from '../shared/definitions.js'
import EnumAttribute from '../shared/EnumAttribute.js'
import ObjectContainer from '../shared/ObjectContainer.js'
import TextAttribute from '../shared/TextAttribute.js'
import validationErrorShallowEqual from '../shared/validationErrorShallowEqual.js'
import RevisionHistory from './Tracking/RevisionHistory.js'

export default React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  value: unknown
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Tracking(props) {
    return (
      <ObjectContainer
        {...props}
        label="Tracking"
        description="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole."
        defaultValue={() => ({
          current_release_date: '',
          id: '',
          initial_release_date: '',
          status: '',
          version: '',
        })}
      >
        {(trackingProps) => (
          <>
            <TextAttribute
              {...trackingProps('id')}
              label="Security Bulletin ID"
              description="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority."
              pattern="^[\S](.*[\S])?$"
              placeholder="Example Bulletin ID - 5201395"
            />
            <DateAttribute
              {...trackingProps('current_release_date')}
              label="Current release date"
              description="The date when the current revision of this document was released"
            />
            <DateAttribute
              {...trackingProps('initial_release_date')}
              label="Initial release date"
              description="The date when this document was first published."
            />
            <RevisionHistory {...trackingProps('revision_history')} />
            <EnumAttribute
              {...trackingProps('status')}
              label="Document status"
              description="Defines the draft status of the document."
              options={['draft', 'final', 'interim']}
            />
            <Version {...trackingProps('version')} />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
