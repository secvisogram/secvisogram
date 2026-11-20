import {
  faCheckCircle,
  faCircleExclamation,
  faCircleInfo,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from 'i18next'
import { getDecisionPoint } from '#lib/shared/ssvc/registry.js'

const OUTCOME_COLORS = [
  'bg-green-100 border-green-600 text-green-900',
  'bg-lime-100 border-lime-600 text-lime-900',
  'bg-orange-100 border-orange-600 text-orange-900',
  'bg-red-100 border-red-600 text-red-900',
]

/**
 * @param {string} outcomeId
 * @param {string} key
 */
function outcomeColor(outcomeId, key) {
  const values = getDecisionPoint(outcomeId).values
  return OUTCOME_COLORS[
    Math.min(
      values.findIndex((v) => v.key === key),
      OUTCOME_COLORS.length - 1,
    )
  ]
}

/**
 * @param {{
 *  model: import('#lib/shared/ssvc/types.js').RoleModel
 *  answers: import('#lib/shared/ssvc/types.js').Answers
 *  resolution: import('#lib/shared/ssvc/types.js').Resolution
 *  timestampWarning: boolean
 *  foreignCount: number
 *  outdated: string[]
 *  hasExisting: boolean
 * }} props
 */
export default function LiveStatusPanel({
  model,
  answers,
  resolution,
  timestampWarning,
  foreignCount,
  outdated,
  hasExisting,
}) {
  const outcomeId = model.root.id
  const outcomeDp = getDecisionPoint(outcomeId)
  const all = { ...answers, ...resolution.derived }
  const path = [...model.inputs, ...model.derived.map((d) => d.id)]
    .map((id) => {
      const dp = getDecisionPoint(id)
      const value = dp.values.find((v) => v.key === all[id])
      return value ? `${dp.name}: ${value.name}` : undefined
    })
    .filter(Boolean)
  const outcome = outcomeDp.values.find((v) => v.key === resolution.outcome)
  const reachable = outcomeDp.values.filter((v) =>
    resolution.reachable.includes(v.key),
  )

  return (
    <div className="flex flex-col gap-3" data-testid="ssvc_status">
      <h3 className="font-semibold">{t('ssvcDialog.status')}</h3>
      <div
        className={`border-2 rounded p-3 ${
          outcome && resolution.outcome
            ? outcomeColor(outcomeId, resolution.outcome)
            : 'bg-gray-50 border-gray-400 text-gray-800'
        }`}
        aria-live="polite"
        data-testid="ssvc_outcome"
      >
        <div className="text-sm">
          {outcomeDp.name} ({model.root.source})
        </div>
        {outcome ? (
          <div className="text-xl font-bold" data-testid="ssvc_outcome_value">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {outcome.name}
          </div>
        ) : (
          <div>
            <div className="font-semibold">
              <FontAwesomeIcon icon={faHourglassHalf} className="mr-2" />
              {t('ssvcDialog.incomplete')}
            </div>
            <div className="text-sm" data-testid="ssvc_reachable">
              {t('ssvcDialog.stillPossible')}:{' '}
              {reachable.map((v) => v.name).join(', ')}
            </div>
          </div>
        )}
        {outcome ? (
          <div className="text-sm mt-1">{outcome.definition}</div>
        ) : null}
      </div>

      <div>
        <h4 className="text-sm font-semibold">{t('ssvcDialog.path')}</h4>
        <p className="text-sm" data-testid="ssvc_path">
          {path.length > 0 ? path.join(' → ') : t('ssvcDialog.pathEmpty')}
        </p>
      </div>

      {timestampWarning ? (
        <p
          className="text-sm border border-yellow-600 bg-yellow-50 text-yellow-900 rounded p-2"
          role="alert"
          data-testid="ssvc_timestamp_warning"
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="mr-2" />
          {t('ssvcDialog.warningTimestamp')}
        </p>
      ) : null}
      {hasExisting ? (
        <p className="text-sm text-blue-900" data-testid="ssvc_info_replaced">
          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
          {t('ssvcDialog.infoReplaced')}
        </p>
      ) : null}
      {foreignCount > 0 ? (
        <p className="text-sm text-blue-900" data-testid="ssvc_info_foreign">
          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
          {t('ssvcDialog.infoForeign', { count: foreignCount })}
        </p>
      ) : null}
      {outdated.length > 0 ? (
        <p className="text-sm text-blue-900" data-testid="ssvc_info_outdated">
          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
          {t('ssvcDialog.infoOutdated', { ids: outdated.join(', ') })}
        </p>
      ) : null}
    </div>
  )
}
