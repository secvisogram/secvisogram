import '@reach/combobox/styles.css'
import React from 'react'
import ObjectContainer from '../shared/ObjectContainer.js'
import TextAttribute from '../shared/TextAttribute.js'
import validationErrorShallowEqual from '../shared/validationErrorShallowEqual.js'

export default React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  value: unknown
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Publisher(props) {
    return (
      <ObjectContainer
        {...props}
        label="Security Bulletin Publisher"
        description="Provides information about the publisher of the bulletin."
        defaultValue={() => ({
          category: '',
          name: '',
        })}
      >
        {(publisherProps) => (
          <>
            <TextAttribute
              {...publisherProps('contact_details')}
              label="Contact details"
              description="Information on how to contact the publisher, typically their IBM email address."
              placeholder="Publisher can be reached at foo@ibm.com"
              deletable
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
