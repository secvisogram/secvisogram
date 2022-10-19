declare global {
  const SECVISOGRAM_VERSION: string
}

declare global {
  declare type CVSSObject = {
    success: boolean

    baseMetricScore: string
    baseSeverity: string

    temporalMetricScore: string
    temporalSeverity: string

    environmentalMetricScore: string
    environmentalSeverity: string

    vectorString: vectorString
  }

  const CVSS31: {
    calculateCVSSFromMetrics(
      AttackVector: string,
      AttackComplexity: string,
      PrivilegesRequired: string,
      UserInteraction: string,
      Scope: string,
      Confidentiality: string,
      Integrity: string,
      Availability,
      ExploitCodeMaturity: string,
      RemediationLevel: string,
      ReportConfidence,
      ConfidentialityRequirement: string,
      IntegrityRequirement: string,
      AvailabilityRequirement,
      ModifiedAttackVector: string,
      ModifiedAttackComplexity: string,
      ModifiedPrivilegesRequire: string,
      ModifiedUserInteraction: string,
      ModifiedScope,
      ModifiedConfidentiality: string,
      ModifiedIntegrity: string,
      ModifiedAvailability: string
    ): CVSSObject

    calculateCVSSFromVector(vectorString): CVSSObject
  }

  const CVSS: {
    calculateCVSSFromMetrics(
      AttackVector: string,
      AttackComplexity: string,
      PrivilegesRequired: string,
      UserInteraction: string,
      Scope: string,
      Confidentiality: string,
      Integrity: string,
      Availability,
      ExploitCodeMaturity: string,
      RemediationLevel: string,
      ReportConfidence,
      ConfidentialityRequirement: string,
      IntegrityRequirement: string,
      AvailabilityRequirement,
      ModifiedAttackVector: string,
      ModifiedAttackComplexity: string,
      ModifiedPrivilegesRequire: string,
      ModifiedUserInteraction: string,
      ModifiedScope,
      ModifiedConfidentiality: string,
      ModifiedIntegrity: string,
      ModifiedAvailability: string
    ): CVSSObject

    calculateCVSSFromVector(vectorString): CVSSObject
  }
}

export {}
