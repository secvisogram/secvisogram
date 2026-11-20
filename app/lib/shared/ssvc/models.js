import { mwiDerivation } from './mwi.js'
import { getDecisionTable } from './registry.js'

/**
 * @param {string} tableId
 * @returns {import('./types.js').Derivation}
 */
function fromTable(tableId) {
  const table = getDecisionTable(tableId)
  return {
    id: table.outcome,
    inputs: Object.keys(table.decision_points).filter(
      (id) => id !== table.outcome,
    ),
    rows: table.mapping,
    source: tableId,
  }
}

/** @type {import('./types.js').RoleModel} */
const coordinator = {
  id: 'coordinator',
  upstreamName: 'Coordinator',
  inputs: [
    'ssvc:E:1.1.0',
    'ssvc:A:2.0.0',
    'ssvc:TI:1.0.0',
    'cisa:MP:1.0.0',
    'ssvc:PWI:1.1.0',
  ],
  derived: [mwiDerivation()],
  root: fromTable('cisa:DT_CO:2.0.3'),
}

/** @type {import('./types.js').RoleModel} */
const patchApplier = {
  id: 'patchApplier',
  upstreamName: 'Deployer',
  inputs: [
    'ssvc:E:1.1.0',
    'ssvc:EXP:1.0.1',
    'ssvc:A:2.0.0',
    'ssvc:SI:2.0.1',
    'ssvc:MI:2.0.0',
  ],
  derived: [fromTable('ssvc:DT_HI:1.0.0')],
  root: fromTable('ssvc:DT_DP:1.0.0'),
}

/** @type {import('./types.js').RoleModel} */
const developer = {
  id: 'developer',
  upstreamName: 'Supplier',
  inputs: [
    'ssvc:E:1.1.0',
    'ssvc:A:2.0.0',
    'ssvc:VD:1.0.0',
    'ssvc:TI:1.0.0',
    'ssvc:SI:2.0.1',
  ],
  derived: [fromTable('ssvc:DT_U:1.0.0'), fromTable('ssvc:DT_PSI:1.0.0')],
  root: fromTable('ssvc:DT_SP:1.0.0'),
}

/** @type {import('./types.js').RoleModel[]} */
export const roleModels = [coordinator, patchApplier, developer]

/**
 * @param {string} roleId
 * @returns {import('./types.js').RoleModel}
 */
export function getRoleModel(roleId) {
  const model = roleModels.find((m) => m.id === roleId)
  if (!model) throw new Error(`Unknown SSVC role ${roleId}`)
  return model
}

/**
 * All decision point ids of a model in output order:
 * answers, derived values, outcome.
 *
 * @param {import('./types.js').RoleModel} model
 */
export function decisionPointIds(model) {
  return [...model.inputs, ...model.derived.map((d) => d.id), model.root.id]
}
