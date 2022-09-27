import React, {useState} from 'react'
import schema from './WizardPanel/schema.js'
import {
  GenericEditor,
  ObjectFieldsEditor,
} from './WizardPanel/shared/shared/editors.js'
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HelpPanel from "./WizardPanel/HelpPanel.js";

export default function WizardPanel() {
  const level = 0
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )
  const selectedProperty = selectedPath.reduce((property, pathSegment) => {
    return (
      property?.metaInfo.propertyList?.find((p) => p.key === pathSegment) ??
      null
    )
  }, /** @type {import('./WizardPanel/shared/types').Property | null} */ (schema))
  // const [documentEditor, setDocumentEditor] = React.useState(
  //   /** @type {React.ContextType<typeof DocumentEditorContext>} */ ({
  //     doc: {
  //       document: {
  //         title: 'My document',
  //         acknowledgments: [{}, {}],
  //       },
  //     },
  //     updateDoc(instancePath, value) {
  //       setDocumentEditor((documentEditor) => ({
  //         ...documentEditor,
  //         doc: set(instancePath, value, documentEditor.doc),
  //       }))
  //     },
  //   })
  // )

  const [helpPanelOpen, setHelpPanelOpen] = useState(false)

  return (
    <>
      <div className={"p-3 " + (helpPanelOpen ? "w-4/5" : "w-full")}>
        <div className="flex">
          <ul>
            {schema.metaInfo.propertyList.map((_property) => {
              const property =
                /** @type {import('./WizardPanel/shared/types').Property} */ (
                _property
              )
              return (
                <React.Fragment key={property.fullName.join('.')}>
                  <li>
                    <button
                      type="button"
                      className={
                        selectedPath[level] === property.fullName[level]
                          ? 'underline'
                          : ''
                      }
                      onClick={() => {
                        setSelectedPath(property.fullName)
                      }}
                    >
                      {property.title}
                    </button>
                    {schema.addMenuItemsForChildObjects &&
                    property.type === 'OBJECT' ? (
                      <ul className="ml-2">
                        {property.metaInfo.propertyList
                          ?.filter((p) => ['OBJECT', 'ARRAY'].includes(p.type))
                          .map((childProperty) => {
                            const childLevel = level + 1
                            return (
                              <li key={childProperty.fullName.join('.')}>
                                <button
                                  type="button"
                                  className={
                                    selectedPath[childLevel] ===
                                    childProperty.fullName[childLevel]
                                      ? 'underline'
                                      : ''
                                  }
                                  onClick={() => {
                                    setSelectedPath(childProperty.fullName)
                                  }}
                                >
                                  {childProperty.title}
                                </button>
                              </li>
                            )
                          })}
                      </ul>
                    ) : null}
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
          {selectedPath.length && selectedProperty ? (
            selectedPath.length === 1 && selectedProperty.type === 'OBJECT' ? (
              <ObjectFieldsEditor
                property={selectedProperty}
                instancePath={selectedProperty.fullName}
              />
            ) : (
              <GenericEditor
                property={selectedProperty}
                instancePath={selectedProperty.fullName}
              />
            )
          ) : null}
        </div>
        {
          helpPanelOpen ? null :
            (
              <div className="p-3 absolute inset-y-0 right-0">
                <button
                  onClick={() => {
                    setHelpPanelOpen(true)
                  }}
                >
                  <FontAwesomeIcon className="fa-2x" icon={faInfoCircle}/>
                </button>
              </div>
            )
        }
      </div>
      {helpPanelOpen ?
        <HelpPanel
          selectedPath={selectedProperty.fullName.join(".")}
          closeHandler={() => setHelpPanelOpen(false)}
        />
        : null
      }
    </>
  )
}
