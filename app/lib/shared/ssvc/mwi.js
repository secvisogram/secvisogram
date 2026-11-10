import { getDecisionPoint } from './registry.js'

export const MP_ID = 'cisa:MP:1.0.0'
export const PWI_ID = 'ssvc:PWI:1.1.0'
export const MWI_ID = 'ssvc:MWI:1.0.0'

/**
 * Mission and Well-Being Impact from Mission Prevalence (rows) and Public
 * Well-Being Impact (columns).
 *
 * The definitions of `ssvc:MWI:1.0.0` are:
 * - Low: Mission Prevalence Minimal AND Public Well-Being Impact Minimal
 * - Medium: Mission Prevalence Support AND Public Well-Being Impact Minimal or Material
 * - High: Mission Prevalence Essential OR Public Well-Being Impact Irreversible
 *
 * Mission Prevalence Minimal with Public Well-Being Impact Material is not
 * covered by these definitions. It is mapped to Medium, because the values
 * are ordered and the result may not drop below the neighbouring cells.
 * That cell is the only part of this rule that is not taken from upstream.
 *
 * @type {Record<string, Record<string, string>>}
 */
const MWI_GRID = {
  M: { M: 'L', MA: 'M', I: 'H' },
  S: { M: 'M', MA: 'M', I: 'H' },
  E: { M: 'H', MA: 'H', I: 'H' },
}

/**
 * @param {string} missionPrevalence value key of `cisa:MP:1.0.0`
 * @param {string} publicWellBeingImpact value key of `ssvc:PWI:1.1.0`
 * @returns {string | undefined} value key of `ssvc:MWI:1.0.0`
 */
export function mwi(missionPrevalence, publicWellBeingImpact) {
  return MWI_GRID[missionPrevalence]?.[publicWellBeingImpact]
}

/** @returns {import('./types.js').Derivation} */
export function mwiDerivation() {
  const rows = getDecisionPoint(MP_ID).values.flatMap((mp) =>
    getDecisionPoint(PWI_ID).values.map((pwi) => ({
      [MP_ID]: mp.key,
      [PWI_ID]: pwi.key,
      [MWI_ID]: /** @type {string} */ (mwi(mp.key, pwi.key)),
    })),
  )
  return {
    id: MWI_ID,
    inputs: [MP_ID, PWI_ID],
    rows,
    source: 'rule:MWI',
  }
}
