import React, { useState } from 'react'
import schema from './WizardPanel/schema.js'
import {
  GenericEditor,
  ObjectFieldsEditor,
} from './WizardPanel/shared/shared/editors.js'
import {
  faComment,
  faExclamationTriangle,
  faQuestionCircle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfoPanel from './WizardPanel/InfoPanel.js'
import CommentPanel from './WizardPanel/CommentPanel.js'
import ErrorPanel from './WizardPanel/ErrorPanel.js'

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

  const [sidePanelContent, setSidePanelContent] = useState('')

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex w-full">
          <div className={'p-3 ' + (sidePanelContent ? 'w-4/5' : 'w-full')}>
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
                              ?.filter((p) =>
                                ['OBJECT', 'ARRAY'].includes(p.type)
                              )
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
                selectedPath.length === 1 &&
                selectedProperty.type === 'OBJECT' ? (
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
          </div>
          {sidePanelContent ? (
            <div className="p-3 relative w-1/5 bg-gray-200 border border-l-4">
              <div className="p-3 absolute right-0 top-0">
                <button onClick={() => setSidePanelContent('')}>
                  <FontAwesomeIcon className="fa-1x" icon={faWindowClose} />
                </button>
              </div>
              {sidePanelContent === 'INFO' ? (
                <InfoPanel selectedPath={selectedProperty.fullName.join('.')} />
              ) : sidePanelContent === 'COMMENTS' ? (
                <CommentPanel
                  selectedPath={selectedProperty.fullName.join('.')}
                />
              ) : sidePanelContent === 'ERRORS' ? (
                <ErrorPanel
                  selectedPath={'/' + selectedProperty.fullName.join('/')}
                />
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col bg-gray-300">
          {[
            { targetString: 'INFO', icon: faQuestionCircle },
            { targetString: 'COMMENTS', icon: faComment },
            { targetString: 'ERRORS', icon: faExclamationTriangle },
          ].map((tup) => (
            <>
              <button
                className={
                  'p-3 ' +
                  (sidePanelContent === tup.targetString ? 'bg-gray-200' : '')
                }
                onClick={() => {
                  setSidePanelContent(tup.targetString)
                }}
              >
                <FontAwesomeIcon className="fa-2x" icon={tup.icon} />
              </button>
            </>
          ))}
        </div>
      </div>
    </>
  )
}
