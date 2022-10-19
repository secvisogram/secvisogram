export const mapping = /** @type {const} */ ([
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
])
