import { t } from 'i18next'
import React from 'react'

export default React.forwardRef(
  /**
   * @param {{
   *   onConfirm(): void
   *   onClose(): void
   *   context?: 'manual' | 'file-open'
   * }} props
   */
  ({ onConfirm, onClose, context = 'manual' }, ref) => {
    return (
      <dialog
        className="rounded p-0 w-full max-w-lg shadow"
        ref={ref}
        data-testid="beta_version_dialog"
        onClose={onClose}
      >
        <form method="dialog" id="beta_version-close_form" />
        <header className="w-full flex items-center justify-between border-b p-2">
          <h2 className="text-lg">{t('betaVersionModal.title')}</h2>
          <button type="submit" name="cancel" form="beta_version-close_form">
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
        <div className="p-4">
          <p>
            {context === 'file-open'
              ? t('betaVersionModal.warningTextFileOpen')
              : t('betaVersionModal.warningText')}
          </p>
        </div>
        <footer className="p-2 border-t flex justify-between items-center">
          <button
            data-testid="beta_version-cancel_button"
            className="mt-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
            type="submit"
            form="beta_version-close_form"
          >
            {t('menu.cancel')}
          </button>
          <button
            data-testid="beta_version-confirm_button"
            className="mt-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
            type="button"
            onClick={onConfirm}
          >
            {t('betaVersionModal.proceed')}
          </button>
        </footer>
      </dialog>
    )
  },
)
