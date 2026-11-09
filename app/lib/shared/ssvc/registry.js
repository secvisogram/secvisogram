import cisa_CISA from './data/decision_points/cisa_CISA_1.1.0.json'
import cisa_MP from './data/decision_points/cisa_MP_1.0.0.json'
import ssvc_A from './data/decision_points/ssvc_A_2.0.0.json'
import ssvc_DSOI from './data/decision_points/ssvc_DSOI_1.0.0.json'
import ssvc_E from './data/decision_points/ssvc_E_1.1.0.json'
import ssvc_EXP from './data/decision_points/ssvc_EXP_1.0.1.json'
import ssvc_HI from './data/decision_points/ssvc_HI_2.0.2.json'
import ssvc_MI from './data/decision_points/ssvc_MI_2.0.0.json'
import ssvc_MWI from './data/decision_points/ssvc_MWI_1.0.0.json'
import ssvc_PSI from './data/decision_points/ssvc_PSI_2.0.1.json'
import ssvc_PWI from './data/decision_points/ssvc_PWI_1.1.0.json'
import ssvc_SI from './data/decision_points/ssvc_SI_2.0.1.json'
import ssvc_TI from './data/decision_points/ssvc_TI_1.0.0.json'
import ssvc_U from './data/decision_points/ssvc_U_1.0.1.json'
import ssvc_VD from './data/decision_points/ssvc_VD_1.0.0.json'
import DT_CO from './data/decision_tables/cisa_coordinator_2_0_3.json'
import DT_DP from './data/decision_tables/deployer_patch_application_priority_1_0_0.json'
import DT_HI from './data/decision_tables/human_impact_1_0_0.json'
import DT_PSI from './data/decision_tables/public_safety_impact_1_0_0.json'
import DT_SP from './data/decision_tables/supplier_patch_development_priority_1_0_0.json'
import DT_U from './data/decision_tables/utility_1_0_0.json'

/**
 * @param {{ namespace: string, key: string, version: string }} object
 */
export const idOf = (object) =>
  `${object.namespace}:${object.key}:${object.version}`

/** @type {import('./types.js').DecisionPoint[]} */
const decisionPointList = [
  cisa_CISA,
  cisa_MP,
  ssvc_A,
  ssvc_DSOI,
  ssvc_E,
  ssvc_EXP,
  ssvc_HI,
  ssvc_MI,
  ssvc_MWI,
  ssvc_PSI,
  ssvc_PWI,
  ssvc_SI,
  ssvc_TI,
  ssvc_U,
  ssvc_VD,
]

/** @type {import('./types.js').DecisionTable[]} */
const decisionTableList = [DT_CO, DT_DP, DT_HI, DT_PSI, DT_SP, DT_U]

/** All vendored decision points by id (`namespace:key:version`) */
export const decisionPoints = new Map(
  decisionPointList.map((dp) => [idOf(dp), dp]),
)

/** All vendored decision tables by id (`namespace:key:version`) */
export const decisionTables = new Map(
  decisionTableList.map((table) => [idOf(table), table]),
)

/**
 * @param {string} version
 * @returns {number[]}
 */
const versionParts = (version) => version.split('.').map(Number)

/**
 * @param {string} a
 * @param {string} b
 */
const compareVersions = (a, b) => {
  const pa = versionParts(a)
  const pb = versionParts(b)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

/**
 * Latest vendored version per `namespace:key`.
 * Test 6.3.13 and 6.3.25 flag decision points that are not the latest version.
 */
export const latestVersions = new Map(
  decisionPointList.reduce((latest, dp) => {
    const name = `${dp.namespace}:${dp.key}`
    const known = latest.get(name)
    if (known === undefined || compareVersions(dp.version, known) > 0) {
      latest.set(name, dp.version)
    }
    return latest
  }, /** @type {Map<string, string>} */ (new Map())),
)

/**
 * @param {string} id decision point id
 * @returns {import('./types.js').DecisionPoint}
 */
export function getDecisionPoint(id) {
  const dp = decisionPoints.get(id)
  if (!dp) throw new Error(`Unknown SSVC decision point ${id}`)
  return dp
}

/**
 * @param {string} id decision table id
 * @returns {import('./types.js').DecisionTable}
 */
export function getDecisionTable(id) {
  const table = decisionTables.get(id)
  if (!table) throw new Error(`Unknown SSVC decision table ${id}`)
  return table
}
