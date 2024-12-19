export default {
  license: [
    'Copyright (c) 2023, FIRST.ORG, INC.',
    'All rights reserved.',
    '',
    'Redistribution and use in source and binary forms, with or without modification, are permitted provided that the ',
    'following conditions are met:',
    '1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following ',
    '   disclaimer.',
    '2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the ',
    '   following disclaimer in the documentation and/or other materials provided with the distribution.',
    '3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote ',
    '   products derived from this software without specific prior written permission.',
    '',
    "THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, ",
    'INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE ',
    'DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, ',
    'SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR ',
    'SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, ',
    'WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE ',
    'OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.'
  ],
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'JSON Schema for Common Vulnerability Scoring System version 4.0',
  $id: 'https://www.first.org/cvss/cvss-v4.0.json?20240216',
  type: 'object',
  $defs: {
    attackVectorType: {
      type: 'string',
      enum: [
        'NETWORK',
        'ADJACENT',
        'LOCAL',
        'PHYSICAL'
      ]
    },
    modifiedAttackVectorType: {
      type: 'string',
      enum: [
        'NETWORK',
        'ADJACENT',
        'LOCAL',
        'PHYSICAL',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    attackComplexityType: {
      type: 'string',
      enum: [
        'HIGH',
        'LOW'
      ]
    },
    modifiedAttackComplexityType: {
      type: 'string',
      enum: [
        'HIGH',
        'LOW',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    attackRequirementsType: {
      type: 'string',
      enum: [
        'NONE',
        'PRESENT'
      ]
    },
    modifiedAttackRequirementsType: {
      type: 'string',
      enum: [
        'NONE',
        'PRESENT',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    privilegesRequiredType: {
      type: 'string',
      enum: [
        'HIGH',
        'LOW',
        'NONE'
      ]
    },
    modifiedPrivilegesRequiredType: {
      type: 'string',
      enum: [
        'HIGH',
        'LOW',
        'NONE',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    userInteractionType: {
      type: 'string',
      enum: [
        'NONE',
        'PASSIVE',
        'ACTIVE'
      ]
    },
    modifiedUserInteractionType: {
      type: 'string',
      enum: [
        'NONE',
        'PASSIVE',
        'ACTIVE',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    vulnCiaType: {
      type: 'string',
      enum: [
        'NONE',
        'LOW',
        'HIGH'
      ]
    },
    modifiedVulnCiaType: {
      type: 'string',
      enum: [
        'NONE',
        'LOW',
        'HIGH',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    subCiaType: {
      type: 'string',
      enum: [
        'NONE',
        'LOW',
        'HIGH'
      ]
    },
    modifiedSubCType: {
      type: 'string',
      enum: [
        'NEGLIGIBLE',
        'LOW',
        'HIGH',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    modifiedSubIaType: {
      type: 'string',
      enum: [
        'NEGLIGIBLE',
        'LOW',
        'HIGH',
        'SAFETY',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    exploitMaturityType: {
      type: 'string',
      enum: [
        'UNREPORTED',
        'PROOF_OF_CONCEPT',
        'ATTACKED',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    ciaRequirementType: {
      type: 'string',
      enum: [
        'LOW',
        'MEDIUM',
        'HIGH',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    safetyType: {
      type: 'string',
      enum: [
        'NEGLIGIBLE',
        'PRESENT',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    automatableType: {
      type: 'string',
      enum: [
        'NO',
        'YES',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    recoveryType: {
      type: 'string',
      enum: [
        'AUTOMATIC',
        'USER',
        'IRRECOVERABLE',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    valueDensityType: {
      type: 'string',
      enum: [
        'DIFFUSE',
        'CONCENTRATED',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    vulnerabilityResponseEffortType: {
      type: 'string',
      enum: [
        'LOW',
        'MODERATE',
        'HIGH',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    providerUrgencyType: {
      type: 'string',
      enum: [
        'CLEAR',
        'GREEN',
        'AMBER',
        'RED',
        'NOT_DEFINED'
      ],
      default: 'NOT_DEFINED'
    },
    noneScoreType: {
      type: 'number',
      minimum: 0,
      maximum: 0
    },
    lowScoreType: {
      type: 'number',
      minimum: 0.1,
      maximum: 3.9,
      multipleOf: 0.1
    },
    mediumScoreType: {
      type: 'number',
      minimum: 4,
      maximum: 6.9,
      multipleOf: 0.1
    },
    highScoreType: {
      type: 'number',
      minimum: 7,
      maximum: 8.9,
      multipleOf: 0.1
    },
    criticalScoreType: {
      type: 'number',
      minimum: 9,
      maximum: 10,
      multipleOf: 0.1
    },
    noneSeverityType: {
      const: 'NONE'
    },
    lowSeverityType: {
      const: 'LOW'
    },
    mediumSeverityType: {
      const: 'MEDIUM'
    },
    highSeverityType: {
      const: 'HIGH'
    },
    criticalSeverityType: {
      const: 'CRITICAL'
    }
  },
  properties: {
    version: {
      description: 'CVSS Version',
      type: 'string',
      enum: [
        '4.0'
      ]
    },
    vectorString: {
      type: 'string',
      pattern: '^CVSS:4[.]0/AV:[NALP]/AC:[LH]/AT:[NP]/PR:[NLH]/UI:[NPA]/VC:[HLN]/VI:[HLN]/VA:[HLN]/SC:[HLN]/SI:[HLN]/SA:[HLN](/E:[XAPU])?(/CR:[XHML])?(/IR:[XHML])?(/AR:[XHML])?(/MAV:[XNALP])?(/MAC:[XLH])?(/MAT:[XNP])?(/MPR:[XNLH])?(/MUI:[XNPA])?(/MVC:[XNLH])?(/MVI:[XNLH])?(/MVA:[XNLH])?(/MSC:[XNLH])?(/MSI:[XNLHS])?(/MSA:[XNLHS])?(/S:[XNP])?(/AU:[XNY])?(/R:[XAUI])?(/V:[XDC])?(/RE:[XLMH])?(/U:(X|Clear|Green|Amber|Red))?$'
    },
    attackVector: {
      $ref: '#/$defs/attackVectorType'
    },
    attackComplexity: {
      $ref: '#/$defs/attackComplexityType'
    },
    attackRequirements: {
      $ref: '#/$defs/attackRequirementsType'
    },
    privilegesRequired: {
      $ref: '#/$defs/privilegesRequiredType'
    },
    userInteraction: {
      $ref: '#/$defs/userInteractionType'
    },
    vulnConfidentialityImpact: {
      $ref: '#/$defs/vulnCiaType'
    },
    vulnIntegrityImpact: {
      $ref: '#/$defs/vulnCiaType'
    },
    vulnAvailabilityImpact: {
      $ref: '#/$defs/vulnCiaType'
    },
    subConfidentialityImpact: {
      $ref: '#/$defs/subCiaType'
    },
    subIntegrityImpact: {
      $ref: '#/$defs/subCiaType'
    },
    subAvailabilityImpact: {
      $ref: '#/$defs/subCiaType'
    },
    exploitMaturity: {
      $ref: '#/$defs/exploitMaturityType'
    },
    confidentialityRequirement: {
      $ref: '#/$defs/ciaRequirementType'
    },
    integrityRequirement: {
      $ref: '#/$defs/ciaRequirementType'
    },
    availabilityRequirement: {
      $ref: '#/$defs/ciaRequirementType'
    },
    modifiedAttackVector: {
      $ref: '#/$defs/modifiedAttackVectorType'
    },
    modifiedAttackComplexity: {
      $ref: '#/$defs/modifiedAttackComplexityType'
    },
    modifiedAttackRequirements: {
      $ref: '#/$defs/modifiedAttackRequirementsType'
    },
    modifiedPrivilegesRequired: {
      $ref: '#/$defs/modifiedPrivilegesRequiredType'
    },
    modifiedUserInteraction: {
      $ref: '#/$defs/modifiedUserInteractionType'
    },
    modifiedVulnConfidentialityImpact: {
      $ref: '#/$defs/modifiedVulnCiaType'
    },
    modifiedVulnIntegrityImpact: {
      $ref: '#/$defs/modifiedVulnCiaType'
    },
    modifiedVulnAvailabilityImpact: {
      $ref: '#/$defs/modifiedVulnCiaType'
    },
    modifiedSubConfidentialityImpact: {
      $ref: '#/$defs/modifiedSubCType'
    },
    modifiedSubIntegrityImpact: {
      $ref: '#/$defs/modifiedSubIaType'
    },
    modifiedSubAvailabilityImpact: {
      $ref: '#/$defs/modifiedSubIaType'
    },
    Safety: {
      $ref: '#/$defs/safetyType'
    },
    Automatable: {
      $ref: '#/$defs/automatableType'
    },
    Recovery: {
      $ref: '#/$defs/recoveryType'
    },
    valueDensity: {
      $ref: '#/$defs/valueDensityType'
    },
    vulnerabilityResponseEffort: {
      $ref: '#/$defs/vulnerabilityResponseEffortType'
    },
    providerUrgency: {
      $ref: '#/$defs/providerUrgencyType'
    }
  },
  allOf: [
    {
      anyOf: [
        {
          properties: {
            baseScore: {
              $ref: '#/$defs/noneScoreType'
            },
            baseSeverity: {
              $ref: '#/$defs/noneSeverityType'
            }
          }
        },
        {
          properties: {
            baseScore: {
              $ref: '#/$defs/lowScoreType'
            },
            baseSeverity: {
              $ref: '#/$defs/lowSeverityType'
            }
          }
        },
        {
          properties: {
            baseScore: {
              $ref: '#/$defs/mediumScoreType'
            },
            baseSeverity: {
              $ref: '#/$defs/mediumSeverityType'
            }
          }
        },
        {
          properties: {
            baseScore: {
              $ref: '#/$defs/highScoreType'
            },
            baseSeverity: {
              $ref: '#/$defs/highSeverityType'
            }
          }
        },
        {
          properties: {
            baseScore: {
              $ref: '#/$defs/criticalScoreType'
            },
            baseSeverity: {
              $ref: '#/$defs/criticalSeverityType'
            }
          }
        }
      ]
    },
    {
      anyOf: [
        {
          properties: {
            threatScore: {
              $ref: '#/$defs/noneScoreType'
            },
            threatSeverity: {
              $ref: '#/$defs/noneSeverityType'
            }
          }
        },
        {
          properties: {
            threatScore: {
              $ref: '#/$defs/lowScoreType'
            },
            threatSeverity: {
              $ref: '#/$defs/lowSeverityType'
            }
          }
        },
        {
          properties: {
            threatScore: {
              $ref: '#/$defs/mediumScoreType'
            },
            threatSeverity: {
              $ref: '#/$defs/mediumSeverityType'
            }
          }
        },
        {
          properties: {
            threatScore: {
              $ref: '#/$defs/highScoreType'
            },
            threatSeverity: {
              $ref: '#/$defs/highSeverityType'
            }
          }
        },
        {
          properties: {
            threatScore: {
              $ref: '#/$defs/criticalScoreType'
            },
            threatSeverity: {
              $ref: '#/$defs/criticalSeverityType'
            }
          }
        }
      ]
    },
    {
      anyOf: [
        {
          properties: {
            environmentalScore: {
              $ref: '#/$defs/noneScoreType'
            },
            environmentalSeverity: {
              $ref: '#/$defs/noneSeverityType'
            }
          }
        },
        {
          properties: {
            environmentalScore: {
              $ref: '#/$defs/lowScoreType'
            },
            environmentalSeverity: {
              $ref: '#/$defs/lowSeverityType'
            }
          }
        },
        {
          properties: {
            environmentalScore: {
              $ref: '#/$defs/mediumScoreType'
            },
            environmentalSeverity: {
              $ref: '#/$defs/mediumSeverityType'
            }
          }
        },
        {
          properties: {
            environmentalScore: {
              $ref: '#/$defs/highScoreType'
            },
            environmentalSeverity: {
              $ref: '#/$defs/highSeverityType'
            }
          }
        },
        {
          properties: {
            environmentalScore: {
              $ref: '#/$defs/criticalScoreType'
            },
            environmentalSeverity: {
              $ref: '#/$defs/criticalSeverityType'
            }
          }
        }
      ]
    }
  ],
  required: [
    'version',
    'vectorString',
    'baseScore',
    'baseSeverity'
  ]
}
