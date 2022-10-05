import React from 'react'
import ArrayContainer from '../ArrayContainer.js'
import EnumAttribute from '../EnumAttribute.js'
import ObjectContainer from '../ObjectContainer.js'
import TextAreaAttribute from '../TextAreaAttribute.js'
import TextAttribute from '../TextAttribute.js'
import validationErrorShallowEqual from '../validationErrorShallowEqual.js'

export default React.memo(
  /**
   * @param {{
   *  label?: string
   *  description?: string
   *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  value: unknown
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Notes({
    label = 'List of notes',
    description = 'Contains notes which are specific to the current context.',
    ...props
  }) {
    return (
      <ArrayContainer
        {...props}
        label={label}
        description={description}
        defaultItemValue={() => ({
          category: '',
          text: '',
        })}
        section={props.section}
      >
        {(itemProps) => <Note {...itemProps} />}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)

const Note = React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  value: unknown
   *  defaultValue?(): {}
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Note({ ...props }) {
    return (
      <ObjectContainer
        {...props}
        label="Note"
        description="Is a place to put all manner of text blobs related to the current context."
      >
        {(noteProps) => (
          <>
            <TextAttribute
              {...noteProps('title')}
              label="Title of note"
              description="Provides a concise description of what is contained in the text of the note."
              placeholder="Details"
              deletable
              canBeAdded={false}
            />
            <TextAreaAttribute
              {...noteProps('text')}
              label="Summary"
              description="The contents of the note. Content varies depending on type."              
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
