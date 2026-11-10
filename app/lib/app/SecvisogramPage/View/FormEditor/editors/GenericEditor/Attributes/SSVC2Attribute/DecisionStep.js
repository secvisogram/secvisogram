import { t } from 'i18next'
import React from 'react'
import { getDecisionPoint } from '#lib/shared/ssvc/registry.js'
import RadioGroup from './RadioGroup.js'

/**
 * One decision point as a group of radio-like buttons with its definitions.
 *
 * @param {{
 *  id: string
 *  value: string | undefined
 *  onChange: (value: string) => void
 * }} props
 */
function Question({ id, value, onChange }) {
  const dp = getDecisionPoint(id)
  const selected = dp.values.find((v) => v.key === value)
  const labelId = React.useId()
  return (
    <div data-testid={`ssvc_dp-${dp.key}`}>
      <div id={labelId} className="font-semibold">
        {dp.name}
      </div>
      <div className="text-sm text-gray-700">{dp.definition}</div>
      <RadioGroup
        labelledBy={labelId}
        className="flex flex-wrap gap-2 mt-1"
        value={value}
        onChange={onChange}
        options={dp.values.map((v) => ({
          key: v.key,
          testId: `ssvc_dp-${dp.key}-${v.key}`,
          className: `border rounded px-3 py-1 ${
            v.key === value
              ? 'bg-blue-700 border-blue-700 text-white'
              : 'bg-white border-gray-400 hover:bg-gray-100'
          }`,
          content: v.name,
        }))}
      />
      <details className="text-sm mt-1">
        <summary className="cursor-pointer">
          {t('ssvcDialog.showDefinitions')}
        </summary>
        <dl className="mt-1">
          {dp.values.map((v) => (
            <div key={v.key} className={v === selected ? 'font-semibold' : ''}>
              <dt className="inline">{v.name}: </dt>
              <dd className="inline">{v.definition}</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  )
}

/**
 * @param {{
 *  model: import('#lib/shared/ssvc/types.js').RoleModel
 *  answers: import('#lib/shared/ssvc/types.js').Answers
 *  derived: import('#lib/shared/ssvc/types.js').Answers
 *  onAnswer: (id: string, value: string) => void
 * }} props
 */
export default function DecisionStep({ model, answers, derived, onAnswer }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">{t('ssvcDialog.questions')}</h3>
      {model.inputs.map((id) => (
        <Question
          key={id}
          id={id}
          value={answers[id]}
          onChange={(value) => onAnswer(id, value)}
        />
      ))}
      <h3 className="font-semibold">{t('ssvcDialog.derived')}</h3>
      {model.derived.map((derivation) => {
        const dp = getDecisionPoint(derivation.id)
        const value = dp.values.find((v) => v.key === derived[derivation.id])
        return (
          <div
            key={derivation.id}
            className="border rounded p-2 bg-gray-50"
            data-testid={`ssvc_derived-${dp.key}`}
          >
            <div className="font-semibold">
              {dp.name}:{' '}
              <span data-testid={`ssvc_derived-${dp.key}-value`}>
                {value ? value.name : t('ssvcDialog.notAnswered')}
              </span>
            </div>
            <div className="text-sm text-gray-700">
              {value ? value.definition : t('ssvcDialog.derivedNotYet')}
            </div>
          </div>
        )
      })}
    </div>
  )
}
