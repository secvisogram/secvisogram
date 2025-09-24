import cvss2js from 'cvss2js'
import { getEnvironmentalScoreFromVectorString } from '../../lib/shared/cvss2.js'
import { cvss30 as CVSS30, cvss31 as CVSS31 } from '../../lib/shared/first.js'
import Ajv from 'ajv/dist/jtd.js'
import { calculateCvss4_0_Score } from '../../lib/shared/cvss4.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        properties: {
          metrics: {
            elements: {
              additionalProperties: true,
              properties: {
                content: {
                  additionalProperties: true,
                  optionalProperties: {
                    cvss_v2: {
                      additionalProperties: true,
                      optionalProperties: {
                        vectorString: { type: 'string' },
                        baseScore: { type: 'float64' },
                        temporalScore: { type: 'float64' },
                        environmentalScore: { type: 'float64' },
                      },
                    },
                    cvss_v3: {
                      additionalProperties: true,
                      optionalProperties: {
                        vectorString: { type: 'string' },
                        version: { type: 'string' },
                        baseScore: { type: 'float64' },
                        baseSeverity: { type: 'string' },
                        temporalScore: { type: 'float64' },
                        temporalSeverity: { type: 'string' },
                        environmentalScore: { type: 'float64' },
                        environmentalSeverity: { type: 'string' },
                      },
                    },
                    cvss_v4: {
                      additionalProperties: true,
                      optionalProperties: {
                        vectorString: { type: 'string' },
                        version: { type: 'string' },
                        baseScore: { type: 'float64' },
                        baseSeverity: { type: 'string' },
                        threatScore: { type: 'float64' },
                        threatSeverity: { type: 'string' },
                        environmentalScore: { type: 'float64' },
                        environmentalSeverity: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)

/**
 * @param {any} doc
 */
export function mandatoryTest_6_1_9(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (!validateInput(doc)) {
    return { errors, isValid }
  }

  const vulnerabilities = doc.vulnerabilities
  vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    const metrics = vulnerability.metrics
    metrics?.forEach((metric, metricIndex) => {
      calculateCvss2(metric).forEach((failedMetricName) => {
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${metricIndex}/cvss_v2/${failedMetricName}`,
          message: 'invalid calculated value',
        })
      })

      calculateCvss3(metric).forEach((failedMetricName) => {
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${metricIndex}/cvss_v3/${failedMetricName}`,
          message: 'invalid calculated value',
        })
      })

      calculateCvss4(metric).forEach((failedMetricName) => {
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${metricIndex}/cvss_v4/${failedMetricName}`,
          message: 'invalid calculated value',
        })
      })
    })
  })

  return { errors, isValid: errors.length === 0 }
}

/**
 * @param {string} vectorString
 * @returns
 */
function safelyParseCVSSV2Vector(vectorString) {
  try {
    return {
      success: true,
      baseMetricScore: cvss2js.getBaseScore(vectorString),
      temporalMetricScore: cvss2js.getTemporalScore(vectorString),
      environmentalMetricScore:
        getEnvironmentalScoreFromVectorString(vectorString),
    }
  } catch (e) {
    return {
      success: false,
      baseMetricScore: -1,
      temporalMetricScore: -1,
      environmentalMetricScore: -1,
    }
  }
}

/**
 * @param {any} metric
 * @return {string[]}
 */
function calculateCvss2(metric) {
  const failedMetrics = []
  if (
    metric.content?.cvss_v2 &&
    typeof metric.content.cvss_v2.vectorString === 'string'
  ) {
    const cvssV2 = metric.content.cvss_v2
    const result = safelyParseCVSSV2Vector(metric.content.cvss_v2.vectorString)

    if (result.success) {
      for (const { score, expectedScore, name } of [
        {
          score: cvssV2.baseScore,
          expectedScore: result.baseMetricScore,
          name: 'baseScore',
        },
        {
          score: cvssV2.temporalScore,
          expectedScore: result.temporalMetricScore,
          name: 'temporalScore',
        },
        {
          score: cvssV2.environmentalScore,
          expectedScore: result.environmentalMetricScore,
          name: 'environmentalScore',
        },
      ]) {
        if (typeof score === 'number') {
          if (score !== Number(expectedScore)) {
            failedMetrics.push(name)
          }
        }
      }
    } else {
      // Invalid CVSS string is tested in test 6.1.8
    }
  }

  return failedMetrics
}

/**
 * @param {any} metric
 * @return {string[]}
 */
function calculateCvss3(metric) {
  const failedMetrics = []
  if (
    metric.content?.cvss_v3 &&
    typeof metric.content.cvss_v3.vectorString === 'string' &&
    (metric.content.cvss_v3.version === '3.1' ||
      metric.content.cvss_v3.version === '3.0')
  ) {
    const calculator =
      metric.content.cvss_v3.version === '3.0' ? CVSS30 : CVSS31
    const result = calculator.calculateCVSSFromVector(
      metric.content.cvss_v3.vectorString
    )

    if (result.success) {
      for (const { score: scoreValue, expectedScore, name } of [
        {
          score: metric.content.cvss_v3.baseScore,
          expectedScore: result.baseMetricScore,
          name: 'baseScore',
        },
        {
          score: metric.content.cvss_v3.temporalScore,
          expectedScore: result.temporalMetricScore,
          name: 'temporalScore',
        },
        {
          score: metric.content.cvss_v3.environmentalScore,
          expectedScore: result.environmentalMetricScore,
          name: 'environmentalScore',
        },
      ]) {
        if (typeof scoreValue === 'number') {
          if (scoreValue !== Number(expectedScore)) {
            failedMetrics.push(name)
          }
        }
      }

      for (const { severity, expectedSeverity, name } of [
        {
          severity: metric.content.cvss_v3.baseSeverity,
          expectedSeverity: result.baseSeverity,
          name: 'baseSeverity',
        },
        {
          severity: metric.content.cvss_v3.temporalSeverity,
          expectedSeverity: result.temporalSeverity,
          name: 'temporalSeverity',
        },
        {
          severity: metric.content.cvss_v3.environmentalSeverity,
          expectedSeverity: result.environmentalSeverity,
          name: 'environmentalSeverity',
        },
      ]) {
        if (typeof severity === 'string') {
          if (severity !== expectedSeverity.toUpperCase()) {
            failedMetrics.push(name)
          }
        }
      }
    } else {
      // Invalid CVSS is tested in test 6.1.8
    }
  }
  return failedMetrics
}

/**
 * @param {any} metric
 * @return {string[]}
 */
function calculateCvss4(metric) {
  /**
   * @type {string[]}
   */
  const failedMetrics = []
  if (
    metric.content?.cvss_v4 &&
    typeof metric.content.cvss_v4.vectorString === 'string'
  ) {
    const scores = calculateCvss4_0_Score(metric.content.cvss_v4.vectorString)
    scores.forEach((score) => {
      const expectedScore = metric.content.cvss_v4[score.scoreJsonName]
      const expectedSeverity = metric.content.cvss_v4[score.severityJsonName]
      if (typeof expectedScore === 'number' && score.score !== expectedScore) {
        failedMetrics.push(score.scoreJsonName)
      }

      if (
        typeof expectedSeverity === 'string' &&
        score.severity.toUpperCase() !== expectedSeverity.toUpperCase()
      ) {
        failedMetrics.push(score.severityJsonName)
      }
    })
  }
  return failedMetrics
}
