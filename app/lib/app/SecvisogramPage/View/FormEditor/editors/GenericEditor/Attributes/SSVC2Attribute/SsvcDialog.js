import { t } from 'i18next'
import React from 'react'
import {
  buildSelectionList,
  formatTimestamp,
  isNewerThanRevisionHistory,
  mergeIntoExisting,
  targetIdsOf,
} from '#lib/shared/ssvc/selectionList.js'
import DocumentEditorContext from '../../../../../shared/DocumentEditorContext.js'
import copyToClipboard from './copyToClipboard.js'
import DecisionStep from './DecisionStep.js'
import LiveStatusPanel from './LiveStatusPanel.js'
import RoleStep from './RoleStep.js'
import useSsvcState from './useSsvcState.js'

/**
 * @param {{
 *  instancePath: string[]
 *  value: unknown
 *  vulnerability: any
 *  onClose: () => void
 * }} props
 */
export default function SsvcDialog({
  instancePath,
  value,
  vulnerability,
  onClose,
}) {
  const { doc, updateDoc } = React.useContext(DocumentEditorContext)
  /** @type {React.MutableRefObject<HTMLDialogElement | null>} */
  const ref = React.useRef(null)
  const { state, model, resolution, existing, setRole, setAnswer } =
    useSsvcState(value)
  const [copyMessage, setCopyMessage] = React.useState(
    /** @type {{ ok: boolean } | null} */ (null),
  )

  React.useEffect(() => {
    ref.current?.showModal()
  }, [])

  const targetIds = targetIdsOf(vulnerability)
  const build = () =>
    buildSelectionList({
      roleId: state.roleId,
      answers: state.answers,
      now: new Date(),
      targetIds,
    })

  const [openedAt] = React.useState(() => formatTimestamp(new Date()))
  const timestampWarning = isNewerThanRevisionHistory(doc, openedAt)

  return (
    <dialog
      className="rounded p-0 w-full max-w-4xl shadow"
      ref={ref}
      data-testid="ssvc_dialog"
      aria-labelledby="ssvc_dialog_title"
      onClose={onClose}
    >
      <header className="w-full flex items-center justify-between border-b p-3">
        <div>
          <h2 id="ssvc_dialog_title" className="text-lg">
            {t('ssvcDialog.title')}
          </h2>
          <div className="text-sm text-gray-700" data-testid="ssvc_cve">
            {t('ssvcDialog.vulnerability')}:{' '}
            {vulnerability?.cve || t('ssvcDialog.noCve')}
          </div>
        </div>
        <button
          type="button"
          aria-label={t('ssvcDialog.close')}
          onClick={() => ref.current?.close()}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
      <div className="flex flex-col md:flex-row gap-6 p-4 max-h-[70vh] overflow-auto">
        <div className="flex flex-col gap-4 md:w-3/5">
          <RoleStep roleId={state.roleId} onChange={setRole} />
          <DecisionStep
            model={model}
            answers={state.answers}
            derived={resolution.derived}
            onAnswer={setAnswer}
          />
        </div>
        <div className="md:w-2/5">
          <LiveStatusPanel
            model={model}
            answers={state.answers}
            resolution={resolution}
            timestampWarning={timestampWarning}
            foreignCount={existing.foreign.length}
            outdated={existing.outdated}
            hasExisting={
              Array.isArray(/** @type {any} */ (value)?.selections) &&
              /** @type {any} */ (value).selections.length > 0
            }
          />
        </div>
      </div>
      <footer className="flex items-center justify-end gap-2 border-t p-3">
        {copyMessage ? (
          <span
            className="mr-auto text-sm"
            role="status"
            data-testid="ssvc_copy_message"
          >
            {copyMessage.ok
              ? t('ssvcDialog.copied')
              : t('ssvcDialog.copyFailed')}
          </span>
        ) : null}
        <button
          type="button"
          className="border rounded px-3 py-1 hover:bg-gray-100"
          data-testid="ssvc_cancel"
          onClick={() => ref.current?.close()}
        >
          {t('ssvcDialog.cancel')}
        </button>
        <button
          type="button"
          className="border rounded px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
          data-testid="ssvc_copy"
          disabled={!resolution.complete}
          onClick={async () => {
            const ok = await copyToClipboard(JSON.stringify(build(), null, 2))
            setCopyMessage({ ok })
          }}
        >
          {t('ssvcDialog.copy')}
        </button>
        <button
          type="button"
          className="border rounded px-3 py-1 bg-blue-700 border-blue-700 text-white hover:bg-blue-800 disabled:opacity-50"
          data-testid="ssvc_apply"
          disabled={!resolution.complete}
          onClick={() => {
            updateDoc(instancePath, mergeIntoExisting(value, build()))
            ref.current?.close()
          }}
        >
          {t('ssvcDialog.apply')}
        </button>
      </footer>
    </dialog>
  )
}
