import { resolve } from './engine.js'
import { decisionPointIds, getRoleModel, roleModels } from './models.js'
import { getDecisionPoint, idOf } from './registry.js'

/** Decision points that identify a role in an existing selection list */
const ROLE_MARKERS = {
  coordinator: ['ssvc:MWI', 'cisa:CISA'],
  patchApplier: ['ssvc:EXP', 'ssvc:HI'],
  developer: ['ssvc:U', 'ssvc:PSI'],
}

/** `namespace:key` of every decision point that any role model writes */
const ownedNames = new Set(
  roleModels.flatMap((model) =>
    decisionPointIds(model).map((id) => id.split(':').slice(0, 2).join(':')),
  ),
)

/**
 * @param {{ namespace: string, key: string }} selection
 */
const nameOf = (selection) => `${selection.namespace}:${selection.key}`

/**
 * RFC 3339 UTC timestamp with second precision, e.g. `2026-11-06T10:15:30Z`.
 *
 * @param {Date} date
 */
export function formatTimestamp(date) {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z')
}

/**
 * Identifiers of a vulnerability that are valid `target_ids` (test 6.1.47):
 * the CVE if there is one, else the `ids[].text` values.
 *
 * @param {any} vulnerability
 * @returns {string[] | undefined}
 */
export function targetIdsOf(vulnerability) {
  if (typeof vulnerability?.cve === 'string' && vulnerability.cve) {
    return [vulnerability.cve]
  }
  const ids = Array.isArray(vulnerability?.ids)
    ? vulnerability.ids
        .map((/** @type {any} */ id) => id?.text)
        .filter(
          (/** @type {unknown} */ text) => typeof text === 'string' && text,
        )
    : []
  return ids.length > 0 ? ids : undefined
}

/**
 * Builds the `ssvc_v2` object for a completely answered role model.
 * It contains the answers, the derived values and the outcome.
 *
 * @param {{
 *  roleId: string
 *  answers: import('./types.js').Answers
 *  now: Date
 *  targetIds?: string[]
 * }} options
 * @returns {import('./types.js').SelectionList}
 */
export function buildSelectionList({ roleId, answers, now, targetIds }) {
  const model = getRoleModel(roleId)
  const resolution = resolve(model, answers)
  if (!resolution.complete || resolution.outcome === undefined) {
    throw new Error('The SSVC decision is not complete')
  }
  /** @type {import('./types.js').Answers} */
  const all = {
    ...answers,
    ...resolution.derived,
    [model.root.id]: resolution.outcome,
  }

  const selections = decisionPointIds(model).map((id) => {
    const dp = getDecisionPoint(id)
    const value = dp.values.find((v) => v.key === all[id])
    if (!value) throw new Error(`No value for ${id}`)
    return {
      namespace: dp.namespace,
      key: dp.key,
      version: dp.version,
      name: dp.name,
      values: [{ key: value.key, name: value.name }],
    }
  })

  return {
    timestamp: formatTimestamp(now),
    schemaVersion: '2.0.0',
    ...(targetIds && targetIds.length > 0 ? { target_ids: targetIds } : {}),
    selections,
  }
}

/**
 * Finds the role of an existing selection list by its characteristic
 * decision points. `ssvc:DSOI` is shared and therefore not a marker.
 *
 * @param {any} value
 * @returns {string | undefined} role id, undefined if absent or ambiguous
 */
export function inferRole(value) {
  const names = new Set(
    selectionsOf(value).map((selection) => nameOf(selection)),
  )
  const roles = Object.entries(ROLE_MARKERS)
    .filter(([, markers]) => markers.some((marker) => names.has(marker)))
    .map(([roleId]) => roleId)
  return roles.length === 1 ? roles[0] : undefined
}

/**
 * @param {any} value
 * @returns {import('./types.js').Selection[]}
 */
function selectionsOf(value) {
  return Array.isArray(value?.selections)
    ? value.selections.filter(
        (/** @type {any} */ s) =>
          s &&
          typeof s.namespace === 'string' &&
          typeof s.key === 'string' &&
          typeof s.version === 'string',
      )
    : []
}

/**
 * Reads the answers of a role from an existing selection list.
 * Only selections of exactly the decision point version the model uses and
 * with exactly one value are used.
 *
 * @param {any} value
 * @param {string} roleId
 * @returns {{
 *  answers: import('./types.js').Answers
 *  outdated: string[]
 *  foreign: import('./types.js').Selection[]
 * }}
 */
export function parseSelectionList(value, roleId) {
  const model = getRoleModel(roleId)
  /** @type {import('./types.js').Answers} */
  const answers = {}
  /** @type {string[]} */
  const outdated = []
  /** @type {import('./types.js').Selection[]} */
  const foreign = []

  for (const selection of selectionsOf(value)) {
    if (!ownedNames.has(nameOf(selection))) {
      foreign.push(selection)
    } else if (model.inputs.includes(idOf(selection))) {
      const key = selection.values?.[0]?.key
      if (selection.values?.length === 1 && typeof key === 'string') {
        answers[idOf(selection)] = key
      }
    } else if (!(idOf(selection) in getKnownIds())) {
      outdated.push(idOf(selection))
    }
  }
  return { answers, outdated, foreign }
}

/** @returns {Record<string, true>} */
function getKnownIds() {
  return Object.fromEntries(
    roleModels.flatMap((model) =>
      decisionPointIds(model).map((id) => [id, /** @type {const} */ (true)]),
    ),
  )
}

/**
 * Puts a freshly built selection list into an existing `ssvc_v2` value.
 * Selections of the known role models are replaced, so that results of two
 * roles never mix. Everything else is kept: other selections, resources,
 * references and unknown properties.
 *
 * @param {any} existing
 * @param {import('./types.js').SelectionList} built
 * @returns {import('./types.js').SelectionList}
 */
export function mergeIntoExisting(existing, built) {
  if (!existing || typeof existing !== 'object') return built

  const old = Array.isArray(existing.selections) ? existing.selections : []
  const firstOwned = old.findIndex(
    (/** @type {any} */ s) => s && ownedNames.has(nameOf(s)),
  )
  const foreign = old.filter(
    (/** @type {any} */ s) => !(s && ownedNames.has(nameOf(s))),
  )
  const insertAt =
    firstOwned < 0
      ? foreign.length
      : old
          .slice(0, firstOwned)
          .filter((/** @type {any} */ s) => !(s && ownedNames.has(nameOf(s))))
          .length

  return {
    ...existing,
    ...built,
    target_ids: built.target_ids ?? existing.target_ids,
    selections: [
      ...foreign.slice(0, insertAt),
      ...built.selections,
      ...foreign.slice(insertAt),
    ],
  }
}

/**
 * Test 6.1.49: in `final` and `interim` documents the SSVC timestamp must not
 * be newer than the newest revision history entry.
 *
 * @param {any} doc
 * @param {string} timestamp
 * @returns {boolean} true if the timestamp would violate the test
 */
export function isNewerThanRevisionHistory(doc, timestamp) {
  const tracking = doc?.document?.tracking
  if (tracking?.status !== 'final' && tracking?.status !== 'interim') {
    return false
  }
  const dates = (
    Array.isArray(tracking.revision_history) ? tracking.revision_history : []
  )
    .map((/** @type {any} */ entry) => Date.parse(entry?.date))
    .filter((/** @type {number} */ time) => !Number.isNaN(time))
  if (dates.length === 0) return false
  return Date.parse(timestamp) > Math.max(...dates)
}
