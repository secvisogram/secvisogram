import { useTranslation } from 'react-i18next'

/**
 * This component represents the general fallback error-screen if an error
 * wasn't handled otherwise.
 *
 * @param {{
 *   error: unknown
 *   resetErrorBoundary(): void
 * }} props
 */
export default function ErrorScreen({ error, resetErrorBoundary }) {
  const { t } = useTranslation()

  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="mt-4 py-2 px-3 mx-auto w-full max-w-lg border border-red-600 bg-red-200">
      <h1 className="text-lg font-bold text-red-600">
        {t('errorScreen.anErrorOccurred')}
      </h1>
      <h2 className="pt-1 text-md font-bold">
        {t('errorScreen.details')}
        {': '}
      </h2>
      <p className="font-mono">{message}</p>
      <button
        type="button"
        className="px-2 py-1 mt-2 mb-1 bg-red-600 text-white rounded shadow border border-red-600 hover:border-black hover:text-black hover:bg-red-200"
        onClick={() => {
          resetErrorBoundary()
        }}
      >
        {t('errorScreen.close')}
      </button>
    </div>
  )
}
