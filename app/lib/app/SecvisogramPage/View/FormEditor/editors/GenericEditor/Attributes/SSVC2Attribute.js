import { t } from 'i18next'
import React from 'react'
import { getRoleModel } from '#lib/shared/ssvc/models.js'
import { getDecisionPoint } from '#lib/shared/ssvc/registry.js'
import { inferRole } from '#lib/shared/ssvc/selectionList.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'
import SsvcDialog from './SSVC2Attribute/SsvcDialog.js'

/**
 * @param {any} value
 * @returns {string}
 */
function summaryOf(value) {
  const selections = Array.isArray(value?.selections) ? value.selections : []
  const roleId = inferRole(value)
  const timestamp = value?.timestamp ?? ''
  if (roleId === undefined) {
    return t('ssvcDialog.summaryUnknownRole', {
      count: selections.length,
      timestamp,
    })
  }
  const outcomeId = getRoleModel(roleId).root.id
  const selection = selections.find(
    (/** @type {any} */ s) =>
      s && `${s.namespace}:${s.key}:${s.version}` === outcomeId,
  )
  const key = selection?.values?.[0]?.key
  const name = getDecisionPoint(outcomeId).values.find(
    (v) => v.key === key,
  )?.name
  return t('ssvcDialog.summary', {
    role: t(`ssvcDialog.roles.${roleId}`),
    outcome: name ?? key ?? '-',
    count: selections.length,
    timestamp,
  })
}

/**
 * @param {{
 *  instancePath: string[]
 *  value: unknown
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function SSVC2Attribute({
  instancePath,
  value,
  property,
  disabled,
}) {
  const { doc } = React.useContext(DocumentEditorContext)
  const [open, setOpen] = React.useState(false)
  const hasValue =
    typeof value === 'object' && value !== null && Object.keys(value).length > 0

  // .../vulnerabilities/<i>/metrics/<j>/content/ssvc_v2
  const vulnerability = /** @type {any} */ (doc)?.vulnerabilities?.[
    Number(instancePath[instancePath.indexOf('vulnerabilities') + 1])
  ]

  return (
    <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px]">
      <Attribute
        label={t([`csaf.${property.metaData?.i18n?.title}`, 'missing title'])}
        description={t([
          `csaf.${property.metaData?.i18n?.description}`,
          'missing description',
        ])}
        instancePath={instancePath}
        property={property}
        disabled={disabled}
      >
        <div className="flex flex-col gap-2">
          <div className="text-sm" data-testid="ssvc_summary">
            {hasValue ? summaryOf(value) : t('ssvcDialog.emptyHint')}
          </div>
          <div>
            <button
              type="button"
              className="border rounded px-3 py-1 bg-white hover:bg-gray-100 disabled:opacity-50"
              data-testid="ssvc_open"
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              {hasValue ? t('ssvcDialog.edit') : t('ssvcDialog.calculate')}
            </button>
          </div>
        </div>
      </Attribute>
      {open ? (
        <SsvcDialog
          instancePath={instancePath}
          value={value}
          vulnerability={vulnerability}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  )
}
