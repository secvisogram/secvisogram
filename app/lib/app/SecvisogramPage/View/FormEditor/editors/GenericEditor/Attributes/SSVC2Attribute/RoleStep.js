import { t } from 'i18next'
import React from 'react'
import { roleModels } from '#lib/shared/ssvc/models.js'
import RadioGroup from './RadioGroup.js'

/**
 * @param {{ roleId: string, onChange: (roleId: string) => void }} props
 */
export default function RoleStep({ roleId, onChange }) {
  const labelId = React.useId()
  return (
    <div>
      <h3 id={labelId} className="font-semibold">
        {t('ssvcDialog.role')}
      </h3>
      <p className="text-sm text-gray-700">{t('ssvcDialog.roleHint')}</p>
      <RadioGroup
        labelledBy={labelId}
        className="flex flex-wrap gap-2 mt-1"
        value={roleId}
        onChange={onChange}
        options={roleModels.map((model) => ({
          key: model.id,
          testId: `ssvc_role-${model.id}`,
          className: `border rounded px-3 py-1 text-left ${
            model.id === roleId
              ? 'bg-blue-700 border-blue-700 text-white'
              : 'bg-white border-gray-400 hover:bg-gray-100'
          }`,
          content: (
            <>
              <div>{t(`ssvcDialog.roles.${model.id}`)}</div>
              <div className="text-xs">
                {t('ssvcDialog.upstreamRole', { name: model.upstreamName })}
              </div>
            </>
          ),
        }))}
      />
    </div>
  )
}
