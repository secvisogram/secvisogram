import cvss2js from 'cvss2js'
import { getEnvironmentalScoreFromVectorString } from '../shared/cvss2.js'
import { cvss30 as CVSS, cvss31 as CVSS31 } from '../shared/first.js'

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_9(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (Array.isArray(doc.vulnerabilities)) {
    /** @type {Array<any>} */
    const vulnerabilities = doc.vulnerabilities
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (!Array.isArray(vulnerability.scores)) return
      /** @type {Array<any>} */
      const scores = vulnerability.scores
      scores.forEach((score, scoreIndex) => {
        if (typeof score.cvss_v2?.vectorString === 'string') {
          /**
           * @typedef {object} CVSSV2
           * @property {string} vectorString
           * @property {unknown} baseScore
           * @property {unknown} temporalScore
           * @property {unknown} environmentalScore
           */

          /** @type {CVSSV2} */
          const cvssV2 = score.cvss_v2
          const result = safelyParseCVSSV2Vector(cvssV2.vectorString)

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
                  isValid = false
                  errors.push({
                    instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v2/${name}`,
                    message: 'invalid calculated value',
                  })
                }
              }
            }
          }
        }

        if (
          typeof score.cvss_v3?.vectorString === 'string' &&
          (score.cvss_v3.version === '3.1' || score.cvss_v3.version === '3.0')
        ) {
          /**
           * @typedef {object} CVSSV3
           * @property {string} vectorString
           * @property {'3.1' | '3.0'} version
           * @property {unknown} baseScore
           * @property {unknown} baseSeverity
           * @property {unknown} temporalScore
           * @property {unknown} temporalSeverity
           * @property {unknown} environmentalScore
           * @property {unknown} environmentalSeverity
           */

          /** @type {CVSSV3} */
          const cvssV3 = score.cvss_v3

          const calculator = cvssV3.version === '3.0' ? CVSS : CVSS31
          const result = calculator.calculateCVSSFromVector(cvssV3.vectorString)

          if (result.success) {
            for (const { score, expectedScore, name } of [
              {
                score: cvssV3.baseScore,
                expectedScore: result.baseMetricScore,
                name: 'baseScore',
              },
              {
                score: cvssV3.temporalScore,
                expectedScore: result.temporalMetricScore,
                name: 'temporalScore',
              },
              {
                score: cvssV3.environmentalScore,
                expectedScore: result.environmentalMetricScore,
                name: 'environmentalScore',
              },
            ]) {
              if (typeof score === 'number') {
                if (score !== Number(expectedScore)) {
                  isValid = false
                  errors.push({
                    instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v3/${name}`,
                    message: 'invalid calculated value',
                  })
                }
              }
            }

            for (const { severity, expectedSeverity, name } of [
              {
                severity: cvssV3.baseSeverity,
                expectedSeverity: result.baseSeverity,
                name: 'baseSeverity',
              },
              {
                severity: cvssV3.temporalSeverity,
                expectedSeverity: result.temporalSeverity,
                name: 'temporalSeverity',
              },
              {
                severity: cvssV3.environmentalSeverity,
                expectedSeverity: result.environmentalSeverity,
                name: 'environmentalSeverity',
              },
            ]) {
              if (typeof severity === 'string') {
                if (severity !== expectedSeverity.toUpperCase()) {
                  isValid = false
                  errors.push({
                    instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v3/${name}`,
                    message: 'invalid calculated value',
                  })
                }
              }
            }
          }
        }
      })
    })
  }

  return { errors, isValid }
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
