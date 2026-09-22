import { t } from 'i18next'
import { getSeverityColors } from './cvssUtils.js'

/**
 *
 *
 * @param {{
 *  score: any
 *  severity: any
 * }} props
 */
export default function CvssScore({ score, severity }) {
  return (
    <div
      className={`p-2 rounded border ${
        score ? 'w-32' : 'w-80'
      } ${getSeverityColors(/** @type {number} */ (score))}`}
    >
      {typeof score === 'number' ? (
        <>
          <p className="text-center text-2xl">
            <b>{score?.toFixed(1)}</b>
          </p>
          {severity ? <p className="text-center">({severity})</p> : null}
        </>
      ) : (
        <p className="text-center">
          {t('cvssEditor.selectValuesToGenerateScore')}
        </p>
      )}
    </div>
  )
}
