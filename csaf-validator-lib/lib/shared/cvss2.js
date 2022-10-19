/**
 * @param {string | {}} vectorString
 */
export function getEnvironmentalScoreFromVectorString(vectorString) {
  const vector = new Map(
    typeof vectorString === 'string'
      ? vectorString.split('/').map((k) => {
          const [key, value] = k.split(':')
          return [key, /** @type {string | null} */ (value ?? null)]
        })
      : Object.entries(vectorString)
  )

  const impactScore =
    10.41 *
    mkflt(
      mkint(1.0) -
        mkint(
          mkflt(mkint(1.0) - mkint(getMetricScoreFloat(vector, 'C'))) *
            mkflt(mkint(1.0) - mkint(getMetricScoreFloat(vector, 'I'))) *
            mkflt(mkint(1.0) - mkint(getMetricScoreFloat(vector, 'A')))
        )
    )
  const exploitabilitySubScore =
    20.0 *
    getMetricScoreFloat(vector, 'AC') *
    getMetricScoreFloat(vector, 'Au') *
    getMetricScoreFloat(vector, 'AV')

  const baseScore = quickRound(
    mkflt(
      mkint(0.6 * impactScore) +
        mkint(0.4 * exploitabilitySubScore) -
        mkint(1.5)
    ) * fImpact(impactScore)
  )

  let environmentalScore = baseScore

  if (
    vector.has('CDP') ||
    vector.has('TD') ||
    vector.has('CR') ||
    vector.has('IR') ||
    vector.has('AR')
  ) {
    const adjustedImpactScore = Math.min(
      10,
      10.41 *
        mkflt(
          mkint(1.0) -
            mkint(
              mkflt(
                mkint(1.0) -
                  mkint(
                    getMetricScoreFloat(vector, 'C') *
                      getMetricScoreFloat(vector, 'CR')
                  )
              ) *
                (mkflt(
                  mkint(1.0) -
                    mkint(
                      getMetricScoreFloat(vector, 'I') *
                        getMetricScoreFloat(vector, 'IR')
                    )
                ) *
                  mkflt(
                    mkint(1.0) -
                      mkint(
                        getMetricScoreFloat(vector, 'A') *
                          getMetricScoreFloat(vector, 'AR')
                      )
                  ))
            )
        )
    )

    const adjustedBaseScore = quickRound(
      mkflt(
        mkint(0.6 * adjustedImpactScore) +
          mkint(0.4 * exploitabilitySubScore) -
          mkint(1.5)
      ) * fImpact(impactScore)
    )

    const adjustedTemporal = quickRound(
      adjustedBaseScore *
        getMetricScoreFloat(vector, 'E') *
        getMetricScoreFloat(vector, 'RL') *
        getMetricScoreFloat(vector, 'RC')
    )

    environmentalScore = quickRound(
      mkflt(
        mkint(adjustedTemporal) +
          mkint(
            mkflt(mkint(10) - mkint(adjustedTemporal)) *
              getMetricScoreFloat(vector, 'CDP')
          )
      ) * getMetricScoreFloat(vector, 'TD')
    )
  }

  return environmentalScore
}

const intFact = 1000

/**
 * @param {Map<string, string | null>} vector
 * @param {CVSSField} field
 */
function getMetricScoreFloat(vector, field) {
  const metric = cvssScores.get(field)
  if (!metric) throw new Error('Metric not found')
  let value = vector.get(field) ?? null
  if (value === null) {
    if (metric.category === 'environmental' || metric.category === 'temporal') {
      value = 'ND'
    } else {
      throw new Error('Missing fields to calculate base score')
    }
  }

  return metric.scores.get(value) ?? 0
}

/**
 * @param {number} original
 * @returns
 */
function quickRound(original) {
  return Math.round(original * 10) / 10
}

/**
 * @param {number} original
 * @returns
 */
function mkflt(original) {
  return original / intFact
}

/**
 * @param {number} original
 * @returns
 */
function mkint(original) {
  return Math.round(original * intFact)
}

/**
 * @param {number} value
 * @returns
 */
function fImpact(value) {
  if (value > 0) {
    return 1.176
  } else {
    return 0
  }
}

/** @typedef {(typeof mapping)[number][1]} CVSSField */

export const mapping = /** @type {const} */ ([
  // BASE SCORE
  [
    'accessVector',
    'AV',
    {
      NETWORK: { id: 'N', score: 1 },
      ADJACENT_NETWORK: { id: 'A', score: 0.646 },
      LOCAL: { id: 'L', score: 0.395 },
    },
    'base',
  ],
  [
    'accessComplexity',
    'AC',
    {
      HIGH: { id: 'H', score: 0.35 },
      MEDIUM: { id: 'M', score: 0.61 },
      LOW: { id: 'L', score: 0.71 },
    },
    'base',
  ],
  [
    'authentication',
    'Au',
    {
      MULTIPLE: { id: 'M', score: 0.45 },
      SINGLE: { id: 'S', score: 0.56 },
      NONE: { id: 'N', score: 0.704 },
    },
    'base',
  ],
  [
    'confidentialityImpact',
    'C',
    {
      NONE: { id: 'N', score: 0 },
      PARTIAL: { id: 'P', score: 0.275 },
      COMPLETE: { id: 'C', score: 0.66 },
    },
    'base',
  ],
  [
    'integrityImpact',
    'I',
    {
      NONE: { id: 'N', score: 0 },
      PARTIAL: { id: 'P', score: 0.275 },
      COMPLETE: { id: 'C', score: 0.66 },
    },
    'base',
  ],
  [
    'availabilityImpact',
    'A',
    {
      NONE: { id: 'N', score: 0 },
      PARTIAL: { id: 'P', score: 0.275 },
      COMPLETE: { id: 'C', score: 0.66 },
    },
    'base',
  ],

  // TEMPORAL SCORE
  [
    'exploitability',
    'E',
    {
      UNPROVEN: { id: 'U', score: 0.85 },
      PROOF_OF_CONCEPT: { id: 'POC', score: 0.9 },
      FUNCTIONAL: { id: 'F', score: 0.95 },
      HIGH: { id: 'H', score: 1.0 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'temporal',
  ],
  [
    'remediationLevel',
    'RL',
    {
      OFFICIAL_FIX: { id: 'OF', score: 0.87 },
      TEMPORARY_FIX: { id: 'TF', score: 0.9 },
      WORKAROUND: { id: 'W', score: 0.95 },
      UNAVAILABLE: { id: 'U', score: 1.0 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'temporal',
  ],

  [
    'reportConfidence',
    'RC',
    {
      UNCONFIRMED: { id: 'UC', score: 0.9 },
      UNCORROBORATED: { id: 'UR', score: 0.95 },
      CONFIRMED: { id: 'C', score: 1.0 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'temporal',
  ],

  // ENVIRONMENTAL SCORE
  [
    'collateralDamagePotential',
    'CDP',
    {
      NONE: { id: 'N', score: 0 },
      LOW: { id: 'L', score: 0.1 },
      LOW_MEDIUM: { id: 'LM', score: 0.3 },
      MEDIUM_HIGH: { id: 'MH', score: 0.4 },
      HIGH: { id: 'H', score: 0.5 },
      NOT_DEFINED: { id: 'ND', score: 0 },
    },
    'environmental',
  ],
  [
    'targetDistribution',
    'TD',
    {
      NONE: { id: 'N', score: 0 },
      LOW: { id: 'L', score: 0.25 },
      MEDIUM: { id: 'M', score: 0.75 },
      HIGH: { id: 'H', score: 1.0 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'environmental',
  ],
  [
    'confidentialityRequirement',
    'CR',
    {
      LOW: { id: 'L', score: 0.5 },
      MEDIUM: { id: 'M', score: 1.0 },
      HIGH: { id: 'H', score: 1.51 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'environmental',
  ],
  [
    'integrityRequirement',
    'IR',
    {
      LOW: { id: 'L', score: 0.5 },
      MEDIUM: { id: 'M', score: 1.0 },
      HIGH: { id: 'H', score: 1.51 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'environmental',
  ],
  [
    'availabilityRequirement',
    'AR',
    {
      LOW: { id: 'L', score: 0.5 },
      MEDIUM: { id: 'M', score: 1.0 },
      HIGH: { id: 'H', score: 1.51 },
      NOT_DEFINED: { id: 'ND', score: 1.0 },
    },
    'environmental',
  ],
])

const cvssScores = new Map(
  mapping.map(([, field, values, category]) => [
    field,
    {
      category,
      scores: new Map(
        Object.values(values).map((v) => [
          /** @type {string} */ (v.id),
          /** @type {number} */ (v.score),
        ])
      ),
    },
  ])
)
