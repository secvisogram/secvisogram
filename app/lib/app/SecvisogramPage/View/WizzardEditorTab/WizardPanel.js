import {
  faComment,
  faExclamationTriangle,
  faQuestionCircle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import CommentPanel from './WizardPanel/CommentPanel.js'
import { GenericEditor } from './WizardPanel/editors.js'
import ErrorPanel from './WizardPanel/ErrorPanel.js'
import InfoPanel from './WizardPanel/InfoPanel.js'
import schema from './WizardPanel/schema.js'
import WizardContext from './WizardPanel/shared/WizardContext.js'

export default function WizardPanel() {
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )

  const [sidePanelContent, setSidePanelContent] = React.useState('')

  return (
    <WizardContext.Provider value={{ selectedPath, setSelectedPath }}>
      <GenericEditor
        parentProperty={null}
        property={
          /** @type {import('./WizardPanel/schema').Property} */ (schema)
        }
        instancePath={[]}
      />
      {sidePanelContent ? (
        <div className="p-3 relative w-1/5 bg-gray-200 border border-l-4">
          <div className="p-3 absolute right-0 top-0">
            <button onClick={() => setSidePanelContent('')}>
              <FontAwesomeIcon className="fa-1x" icon={faWindowClose} />
            </button>
          </div>
          {sidePanelContent === 'ERRORS' ? (
            <ErrorPanel selectedPath={'/' + selectedPath.join('/')} />
          ) : sidePanelContent === 'INFO' ? (
            <InfoPanel selectedPath={selectedPath.join('.')} />
          ) : sidePanelContent === 'COMMENTS' ? (
            <CommentPanel selectedPath={selectedPath.join('.')} />
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col bg-gray-300">
        {[
          { targetString: 'ERRORS', icon: faExclamationTriangle },
          { targetString: 'INFO', icon: faQuestionCircle },
          { targetString: 'COMMENTS', icon: faComment },
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
    </WizardContext.Provider>
  )
}
