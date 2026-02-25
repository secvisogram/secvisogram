/** @type {Array<[string, string, { [key: string]: string }]>} */
const vectorStringMapping = [
  // BASE SCORE
  [
    'attackVector',
    'AV',
    {
      NETWORK: 'N',
      ADJACENT_NETWORK: 'A',
      LOCAL: 'L',
      PHYSICAL: 'P',
    },
  ],
  [
    'attackComplexity',
    'AC',
    {
      HIGH: 'H',
      LOW: 'L',
    },
  ],
  [
    'privilegesRequired',
    'PR',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],
  [
    'userInteraction',
    'UI',
    {
      NONE: 'N',
      REQUIRED: 'R',
    },
  ],
  [
    'scope',
    'S',
    {
      UNCHANGED: 'U',
      CHANGED: 'C',
    },
  ],
  [
    'confidentialityImpact',
    'C',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],
  [
    'integrityImpact',
    'I',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],
  [
    'availabilityImpact',
    'A',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],

  // TEMPORAL SCORE
  [
    'exploitCodeMaturity',
    'E',
    {
      UNPROVEN: 'U',
      PROOF_OF_CONCEPT: 'P',
      FUNCTIONAL: 'F',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'remediationLevel',
    'RL',
    {
      OFFICIAL_FIX: 'O',
      TEMPORARY_FIX: 'T',
      WORKAROUND: 'W',
      UNAVAILABLE: 'U',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'reportConfidence',
    'RC',
    {
      UNKNOWN: 'U',
      REASONABLE: 'R',
      CONFIRMED: 'C',
      NOT_DEFINED: 'X',
    },
  ],

  // ENVIRONMENTAL SCORE
  [
    'confidentialityRequirement',
    'CR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'integrityRequirement',
    'IR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'availabilityRequirement',
    'AR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedAttackVector',
    'MAV',
    {
      NETWORK: 'N',
      ADJACENT_NETWORK: 'A',
      LOCAL: 'L',
      PHYSICAL: 'P',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedAttackComplexity',
    'MAC',
    {
      HIGH: 'H',
      LOW: 'L',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedPrivilegesRequired',
    'MPR',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedUserInteraction',
    'MUI',
    {
      NONE: 'N',
      REQUIRED: 'R',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedScope',
    'MS',
    {
      UNCHANGED: 'U',
      CHANGED: 'C',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedConfidentialityImpact',
    'MC',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedIntegrityImpact',
    'MI',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedAvailabilityImpact',
    'MA',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
]

export default class CVSSVector {
  /**
   * @param {{ [key: string]: string }} data
   */
  constructor(data) {
    /** @private */
    this._data = data
  }

  /**
   * @param {string} property
   * @param {string} key
   */
  set(property, key) {
    return new CVSSVector({ ...this._data, [property]: key })
  }

  /**
   * @param {string} property
   */
  remove(property) {
    const data = { ...this._data }
    delete data[property]
    return new CVSSVector(data)
  }

  get data() {
    const result = this.calculateCVSSMetrics()
    return {
      ...this._data,
      version: this._data.version,
      vectorString:
        (result.success ? result.vectorString : this._data.vectorString) ?? '',
      baseScore: result.success ? Number(result.baseMetricScore) : undefined,
      baseSeverity: result.success
        ? /** @type {string} */ (result.baseSeverity).toUpperCase()
        : '',
      temporalScore: result.success
        ? Number(result.temporalMetricScore)
        : undefined,
      temporalSeverity: result.success
        ? /** @type {string} */ (result.temporalSeverity).toUpperCase()
        : '',
      environmentalScore: result.success
        ? Number(result.environmentalMetricScore)
        : undefined,
      environmentalSeverity: result.success
        ? /** @type {string} */ (result.environmentalSeverity).toUpperCase()
        : '',
    }
  }

  get canBeUpgraded() {
    return this.isValid && this.data.version === '3.0'
  }

  get isValid() {
    const result = this.calculateCVSSMetrics()
    return result.success
  }

  /**
   * @private
   */
  calculateCVSSMetrics() {
    const args = /**
     * @type {[
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     *   string,
     * ]}
     */ (vectorStringMapping.map((e) => e[2][this._data[e[0]]]))
    if (this._data.version === '3.0')
      return CVSS.calculateCVSSFromMetrics(...args)
    return CVSS31.calculateCVSSFromMetrics(...args)
  }

  /**
   * @param {string} vectorString
   */
  updateFromVectorString(vectorString) {
    const valid =
      CVSS31.calculateCVSSFromVector(vectorString).success ||
      CVSS.calculateCVSSFromVector(vectorString).success
    const data = Object.fromEntries(
      valid
        ? vectorString
            .split('/')
            .slice(1)
            .map((entry) => entry.split(':'))
            .map(([key, value]) => {
              const mapping = vectorStringMapping.find((m) => m[1] === key)
              if (!mapping) return null
              const valueMapping = Object.entries(mapping[2]).find(
                (m) => m[1] === value,
              )
              if (!valueMapping) return null
              return [mapping[0], valueMapping[0]]
            })
            .filter(/** @returns {e is [string, string]} */ (e) => Boolean(e))
        : Object.entries(this._data).map((e) => [e[0], '']),
    )
    return new CVSSVector({
      ...this._data,
      ...data,
      version: valid ? vectorString.split(/[:/]/)[1] : '',
      vectorString,
    })
  }

  updateVectorStringTo31() {
    const vectorString = this.data.vectorString.replace(/^(CVSS:3).0/, '$1.1')
    return new CVSSVector({ ...this._data, vectorString, version: '3.1' })
  }
}
