import { CVSS40 } from './cvss40First.js'

// list of all metrics in cvss40 mainly from  https://github.com/RedHatProductSecurity/cvss-v4-calculator/blob/main/metrics.json
export const flatMetrics = [
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'attackVector',
    metric: 'Attack Vector (AV)',
    metricShort: 'AV',
    options: [
      {
        optionName: 'Network (N)',
        optionValue: 'NETWORK',
        optionKey: 'N',
      },
      {
        optionName: 'Adjacent (A)',
        optionValue: 'ADJACENT',
        optionKey: 'A',
      },
      {
        optionName: 'Local (L)',
        optionValue: 'LOCAL',
        optionKey: 'L',
      },
      {
        optionName: 'Physical (P)',
        optionValue: 'PHYSICAL',
        optionKey: 'P',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'attackComplexity',
    metric: 'Attack Complexity (AC)',
    metricShort: 'AC',
    options: [
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
    ],
    initialOption: 'L',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'attackRequirements',
    metric: 'Attack Requirements (AT)',
    metricShort: 'AT',
    options: [
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
      {
        optionName: 'Present (P)',
        optionValue: 'PRESENT',
        optionKey: 'P',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'privilegesRequired',
    metric: 'Privileges Required (PR)',
    metricShort: 'PR',
    options: [
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'userInteraction',
    metric: 'User Interaction (UI)',
    metricShort: 'UI',
    options: [
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
      {
        optionName: 'Passive (P)',
        optionValue: 'PASSIVE',
        optionKey: 'P',
      },
      {
        optionName: 'Active (A)',
        optionValue: 'ACTIVE',
        optionKey: 'A',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Vulnerable System Impact Metrics',
    jsonName: 'vulnConfidentialityImpact',
    metric: 'Confidentiality (VC)',
    metricShort: 'VC',
    options: [
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Vulnerable System Impact Metrics',
    jsonName: 'vulnIntegrityImpact',
    metric: 'Integrity (VI)',
    metricShort: 'VI',
    options: [
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Vulnerable System Impact Metrics',
    jsonName: 'vulnAvailabilityImpact',
    metric: 'Availability (VA)',
    metricShort: 'VA',
    options: [
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Subsequent System Impact Metrics',
    jsonName: 'subConfidentialityImpact',
    metric: 'Confidentiality (SC)',
    metricShort: 'SC',
    options: [
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Subsequent System Impact Metrics',
    jsonName: 'subIntegrityImpact',
    metric: 'Integrity (SI)',
    metricShort: 'SI',
    options: [
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Base Metrics',
    metricTypeId: 'BASE',
    metricGroup: 'Subsequent System Impact Metrics',
    jsonName: 'subAvailabilityImpact',
    metric: 'Availability (SA)',
    metricShort: 'SA',
    options: [
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'N',
  },
  {
    metricType: 'Supplemental Metrics',
    metricTypeId: 'SUPPLEMENTAL',
    metricGroup: '',
    jsonName: 'Safety',
    metric: 'Safety (S)',
    metricShort: 'S',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Negligible (N)',
        optionValue: 'NEGLIGIBLE',
        optionKey: 'N',
      },
      {
        optionName: 'Present (P)',
        optionValue: 'PRESENT',
        optionKey: 'P',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Supplemental Metrics',
    metricTypeId: 'SUPPLEMENTAL',
    metricGroup: '',
    jsonName: 'Automatable',
    metric: 'Automatable (AU)',
    metricShort: 'AU',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'No (N)',
        optionValue: 'NO',
        optionKey: 'N',
      },
      {
        optionName: 'Yes (Y)',
        optionValue: 'YES',
        optionKey: 'Y',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Supplemental Metrics',
    metricTypeId: 'SUPPLEMENTAL',
    metricGroup: '',
    jsonName: 'Recovery',
    metric: 'Recovery (R)',
    metricShort: 'R',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Automatic (A)',
        optionValue: 'AUTOMATIC',
        optionKey: 'A',
      },
      {
        optionName: 'User (U)',
        optionValue: 'USER',
        optionKey: 'U',
      },
      {
        optionName: 'Irrecoverable (I)',
        optionValue: 'IRRECOVERABLE',
        optionKey: 'I',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Supplemental Metrics',
    metricTypeId: 'SUPPLEMENTAL',
    metricGroup: '',
    jsonName: 'valueDensity',
    metric: 'Value Density (V)',
    metricShort: 'V',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Diffuse (D)',
        optionValue: 'DIFFUSE',
        optionKey: 'D',
      },
      {
        optionName: 'Concentrated (C)',
        optionValue: 'CONCENTRATED',
        optionKey: 'C',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Supplemental Metrics',
    metricTypeId: 'SUPPLEMENTAL',
    metricGroup: '',
    jsonName: 'vulnerabilityResponseEffort',
    metric: 'Vulnerability Response Effort (RE)',
    metricShort: 'RE',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'Moderate (M)',
        optionValue: 'MODERATE',
        optionKey: 'M',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Supplemental Metrics',
    metricTypeId: 'SUPPLEMENTAL',
    metricGroup: '',
    jsonName: 'providerUrgency',
    metric: 'Provider Urgency (U)',
    metricShort: 'U',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Clear',
        optionValue: 'CLEAR',
        optionKey: 'Clear',
      },
      {
        optionName: 'Green',
        optionValue: 'GREEN',
        optionKey: 'Green',
      },
      {
        optionName: 'Amber',
        optionValue: 'AMBER',
        optionKey: 'Amber',
      },
      {
        optionName: 'Red',
        optionValue: 'RED',
        optionKey: 'Red',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'modifiedAttackVector',
    metric: 'Attack Vector (MAV)',
    metricShort: 'MAV',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Network (N)',
        optionValue: 'NETWORK',
        optionKey: 'N',
      },
      {
        optionName: 'Adjacent (A)',
        optionValue: 'ADJACENT',
        optionKey: 'A',
      },
      {
        optionName: 'Local (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'Physical (P)',
        optionValue: 'PHYSICAL',
        optionKey: 'P',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'modifiedAttackComplexity',
    metric: 'Attack Complexity (MAC)',
    metricShort: 'MAC',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'modifiedAttackRequirements',
    metric: 'Attack Requirements (MAT)',
    metricShort: 'MAT',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
      {
        optionName: 'Present (P)',
        optionValue: 'PRESENT',
        optionKey: 'P',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'modifiedPrivilegesRequired',
    metric: 'Privileges Required (MPR)',
    metricShort: 'MPR',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Exploitability Metrics',
    jsonName: 'modifiedUserInteraction',
    metric: 'User Interaction (MUI)',
    metricShort: 'MUI',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
      {
        optionName: 'Passive (P)',
        optionValue: 'PASSIVE',
        optionKey: 'P',
      },
      {
        optionName: 'Active (A)',
        optionValue: 'ACTIVE',
        optionKey: 'A',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Vulnerable System Impact Metrics',
    jsonName: 'modifiedVulnConfidentialityImpact',
    metric: 'Confidentiality (MVC)',
    metricShort: 'MVC',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Vulnerable System Impact Metrics',
    jsonName: 'modifiedVulnIntegrityImpact',
    metric: 'Integrity (MVI)',
    metricShort: 'MVI',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONEN',
        optionKey: 'N',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Vulnerable System Impact Metrics',
    jsonName: 'modifiedVulnAvailabilityImpact',
    metric: 'Availability (MVA)',
    metricShort: 'MVA',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'None (N)',
        optionValue: 'NONE',
        optionKey: 'N',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Subsequent System Impact Metrics',
    jsonName: 'modifiedSubConfidentialityImpact',
    metric: 'Confidentiality (MSC)',
    metricShort: 'MSC',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'Negligible (N)',
        optionValue: 'NEGLIGIBLE',
        optionKey: 'N',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Subsequent System Impact Metrics',
    jsonName: 'integrityRequirement',
    metric: 'Integrity (MSI)',
    metricShort: 'MSI',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Safety (S)',
        optionValue: 'SAFETY',
        optionKey: 'S',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'Negligible (N)',
        optionValue: '',
        optionKey: 'N',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Modified Base Metrics)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: 'Subsequent System Impact Metrics',
    jsonName: 'modifiedVulnAvailabilityImpact',
    metric: 'Availability (MSA)',
    metricShort: 'MSA',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Safety (S)',
        optionValue: 'SAFETY',
        optionKey: 'S',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
      {
        optionName: 'Negligible (N)',
        optionValue: 'NEGLIGIBLE',
        optionKey: 'N',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Security Requirements)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: '',
    jsonName: 'confidentialityRequirement',
    metric: 'Confidentiality Requirements (CR)',
    metricShort: 'CR',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Medium (M)',
        optionValue: 'MEDIUM',
        optionKey: 'M',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Security Requirements)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: '',
    jsonName: 'integrityRequirement',
    metric: 'Integrity Requirements (IR)',
    metricShort: 'IR',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Medium (M)',
        optionValue: 'MEDIUM',
        optionKey: 'M',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Environmental (Security Requirements)',
    metricTypeId: 'ENVIRONMENTAL',
    metricGroup: '',
    jsonName: 'availabilityRequirement',
    metric: 'Availability Requirements (AR)',
    metricShort: 'AR',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'High (H)',
        optionValue: 'HIGH',
        optionKey: 'H',
      },
      {
        optionName: 'Medium (M)',
        optionValue: 'MEDIUM',
        optionKey: 'M',
      },
      {
        optionName: 'Low (L)',
        optionValue: 'LOW',
        optionKey: 'L',
      },
    ],
    initialOption: 'X',
  },
  {
    metricType: 'Threat Metrics',
    metricTypeId: 'THREAT',
    metricGroup: '',
    jsonName: 'exploitMaturity',
    metric: 'Exploit Maturity (E)',
    metricShort: 'E',
    options: [
      {
        optionName: 'Not Defined (X)',
        optionValue: 'NOT_DEFINED',
        optionKey: 'X',
      },
      {
        optionName: 'Attacked (A)',
        optionValue: 'ATTACKED',
        optionKey: 'A',
      },
      {
        optionName: 'POC (P)',
        optionValue: 'PROOF_OF_CONCEPT',
        optionKey: 'P',
      },
      {
        optionName: 'Unreported (U)',
        optionValue: 'UNREPORTED',
        optionKey: 'U',
      },
    ],
    initialOption: 'X',
  },
]

/**
 * @type {{[key: string]: {scoreJsonName: string, severityJsonName: string}}}
 */
const cvss4Scores = {
  BASE: {
    scoreJsonName: 'baseScore',
    severityJsonName: 'baseSeverity',
  },
  THREAT: {
    scoreJsonName: 'threatScore',
    severityJsonName: 'threatSeverity',
  },
  ENVIRONMENTAL: {
    scoreJsonName: 'environmentalScore',
    severityJsonName: 'environmentalSeverity',
  },
}

const name2Metric = calculateName2MetricMap()

function calculateName2MetricMap() {
  const name2Metric = new Map()
  flatMetrics.forEach((metric) => {
    name2Metric.set(metric.jsonName, {
      metricShort: metric.metricShort,
      optionsByValue: convertOptionsArrayToObjectByValue(metric.options),
      optionsByKey: convertOptionsArrayToObjectByKey(metric.options),
    })
  })
  return name2Metric
}

/**
 * @param {{optionName: string, optionValue: string, optionKey: string}[]} optionsArray
 * @return {any}
 */
export function convertOptionsArrayToObjectByValue(optionsArray) {
  /** @type {any} */
  const result = {}
  optionsArray.forEach((option) => {
    result[option.optionValue] = option.optionKey
  })
  return result
}

/**
 * @param {{optionName: string, optionValue: string, optionKey: string}[]} optionsArray
 * @return {any}
 */
function convertOptionsArrayToObjectByKey(optionsArray) {
  /** @type {any} */
  const result = {}
  optionsArray.forEach((option) => {
    result[option.optionKey] = option.optionValue
  })
  return result
}

/**
 * calculate the score and severity for the given metricTypeId
 * @param {CVSS40} cvss40
 * @param {string} metricTypeId
 * @return {{score: number, severity: string, metricTypeId: string, scoreJsonName: string, severityJsonName: string }}
 */
function calculateScoreObject(cvss40, metricTypeId) {
  const calculator = new CVSS40(cvss40.vector.raw)
  // set all metrics,that don't belong to the given metric type  to the initial value
  flatMetrics
    .filter(
      (metric) =>
        metric.metricTypeId !== metricTypeId && metric.metricTypeId !== 'BASE'
    )
    .forEach((metric) => {
      calculator.vector.updateMetric(metric.metricShort, metric.initialOption)
    })
  const score = cvss4Scores[metricTypeId]
  return {
    score: calculator.calculateScore(),
    severity: calculator.calculateSeverityRating(calculator.calculateScore()),
    metricTypeId: metricTypeId,
    scoreJsonName: score.scoreJsonName,
    severityJsonName: score.severityJsonName,
  }
}

/**
 * @param {string} vectorString
 * @return [{{score: number, severity: string, metricTypeId: string }}]
 */
export function calculateCvss4_0_Score(vectorString) {
  return [
    calculateScoreObject(new CVSS40(vectorString), 'BASE'),
    calculateScoreObject(new CVSS40(vectorString), 'THREAT'),
    calculateScoreObject(new CVSS40(vectorString), 'ENVIRONMENTAL'),
  ]
}

export class Cvss4JsonWrapper {
  /**
   * @param {{ [key: string]: string | number }} data
   */
  constructor(data) {
    /** @private */
    this._data = data
    this._data['version'] = '4.0'
  }

  /**
   * @param {string} property
   * @param {string} value
   */
  set(property, value) {
    this._data[property] = value
    const calculation = this._createCvssCalculationValuesFromDate()
    this._data.vectorString = calculation.vector.raw
    return this
  }

  /**
   * @param {string} property
   */
  remove(property) {
    delete this._data[property]
    return this
  }

  /**
   * calculate the scores and the severity for base, environmental und threat  and set them in _data
   * @private
   */
  _calculateScores() {
    // set values from json data
    const calculation = this._createCvssCalculationValuesFromDate()

    for (const key of Object.keys(cvss4Scores)) {
      const score = calculateScoreObject(calculation, key)
      this._data[score.scoreJsonName] = score.score
      this._data[score.severityJsonName] = score.severity
    }
  }

  /**
   * create a CVSS40 object form the existing _data
   * @returns {CVSS40}
   * @private
   */
  _createCvssCalculationValuesFromDate() {
    const calculation = new CVSS40('CVSS:4.0')
    for (const [key, value] of Object.entries(this._data)) {
      const metric = name2Metric.get(key)
      if (metric && value) {
        const metricOptionValue = metric.optionsByValue[value]
        calculation.vector.updateMetric(metric.metricShort, metricOptionValue)
      }
    }
    return calculation
  }

  get data() {
    this._calculateScores()
    return this._data
  }

  /**
   * set the values in _data from a given cvss 4.0 vector string
   * @param {string} vectorString
   */
  updateFromVectorString(vectorString) {
    try {
      this._data.vectorString = vectorString
      const calculator = new CVSS40(vectorString)
      flatMetrics.forEach((metric) => {
        const optionsKey = calculator.vector.getEffectiveMetricValue(
          metric.metricShort
        )
        const metricOptions = name2Metric.get(metric.jsonName)
        this._data[metric.jsonName] = metricOptions.optionsByKey[optionsKey]
      })
    } catch (error) {
      flatMetrics.forEach((metric) => {
        this._data[metric.jsonName] = ''
      })
    }
  }
}
