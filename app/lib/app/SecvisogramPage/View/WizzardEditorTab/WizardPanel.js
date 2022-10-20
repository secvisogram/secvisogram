import React from 'react'
import { GenericEditor } from './WizardPanel/editors.js'
import schema from './WizardPanel/schema.js'
import WizardContext from './WizardPanel/shared/WizardContext.js'

export default function WizardPanel() {
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )

  return (
    <WizardContext.Provider value={{ selectedPath, setSelectedPath }}>
      <GenericEditor
        parentProperty={null}
        property={
          /** @type {import('./WizardPanel/schema').Property} */ (schema)
        }
        instancePath={[]}
      />
    </WizardContext.Provider>
  )
}
