import * as cvss2 from '../../lib/shared/cvss2.js'
import * as cvss3 from '../../lib/shared/cvss3.js'
import * as cvss4 from '../../lib/shared/cvss4.js'
import Ajv from 'ajv/dist/jtd.js'

/** @typedef {import('ajv/dist/jtd.js').JTDDataType<typeof inputSchema>} InputSchema */

/** @typedef {InputSchema['vulnerabilities'][number]} Vulnerability */

/** @typedef {NonNullable<Vulnerability['metrics']>[number]} Metric */

/** @typedef {NonNullable<Metric['content']>} MetricContent */

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          metrics: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                content: {
                  additionalProperties: true,
                  optionalProperties: {
                    cvss_v2: {
                      additionalProperties: true,
                      optionalProperties: {
                        vectorString: { type: 'string' },
                        version: { type: 'string' },
                      },
                    },
                    cvss_v3: {
                      additionalProperties: true,
                      optionalProperties: {
                        vectorString: { type: 'string' },
                        version: { type: 'string' },
                      },
                    },
                    cvss_v4: {
                      additionalProperties: true,
                      optionalProperties: {
                        vectorString: { type: 'string' },
                        version: { type: 'string' },
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
const ajv = new Ajv()
const validateInput = ajv.compile(inputSchema)

/** @type {  Record<string, { jsonName:string, optionsByKey:Record<string, string>}>} */
const cvssV3MappingByMetricKey = Object.fromEntries(
  cvss3.mapping.map((mapping) => {
    return [
      mapping[1],
      {
        jsonName: mapping[0],
        optionsByKey: Object.fromEntries(
          Object.entries(mapping[2]).map(([key, value]) => [value, key])
        ),
      },
    ]
  })
)

/** @type {  Record<string, { jsonName:string, optionsByKey:Record<string, string>}>} */
const cvssV2MappingByMetricKey = Object.fromEntries(
  cvss2.mapping.map((mapping) => {
    return [
      mapping[1],
      {
        jsonName: mapping[0],
        optionsByKey: Object.fromEntries(
          Object.entries(mapping[2]).map(([key, value]) => [value.id, key])
        ),
      },
    ]
  })
)

/**
 * @param {{optionName: string, optionValue: string, optionKey: string}[]} optionsArray
 * @return {Record<string, string>}
 */
function convertOptionsArrayToObject(optionsArray) {
  /** @type {Record<string, string>} */
  const result = {}
  optionsArray.forEach((option) => {
    result[option.optionKey] = option.optionValue
  })
  return result
}

/** @type {  Record<string, { jsonName:string, optionsByKey:Record<string, string>}>} */
const cvssV4MappingByMetricKey = Object.fromEntries(
  cvss4.flatMetrics.map((flatMetric) => {
    return [
      flatMetric.metricShort,
      {
        jsonName: flatMetric.jsonName,
        optionsByKey: convertOptionsArrayToObject(flatMetric.options),
      },
    ]
  })
)

/**
 * @param {Metric} metric
 */
function validateCvss2(metric) {
  if (typeof metric.content?.cvss_v2?.vectorString === 'string') {
    return validateCVSSAttributes(
      cvssV2MappingByMetricKey,
      metric.content.cvss_v2
    )
  } else {
    return []
  }
}

/**
 * @param {Metric} metric
 */
function validateCvss3(metric) {
  if (
    typeof metric?.content?.cvss_v3?.vectorString === 'string' &&
    (metric.content.cvss_v3.version === '3.1' ||
      metric.content.cvss_v3.version === '3.0')
  ) {
    return validateCVSSAttributes(
      cvssV3MappingByMetricKey,
      metric.content.cvss_v3
    )
  } else {
    return []
  }
}

/**
 * @param {Metric} metric
 */
function validateCvss4(metric) {
  if (typeof metric?.content?.cvss_v4?.vectorString === 'string') {
    return validateCVSSAttributes(
      cvssV4MappingByMetricKey,
      metric.content.cvss_v4
    )
  } else {
    return []
  }
}

/**
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_10(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (!validateInput(doc)) {
    return { errors, isValid: true }
  }

  if (Array.isArray(doc.vulnerabilities)) {
    /** @type {Array<Vulnerability>} */
    const vulnerabilities = doc.vulnerabilities
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (!Array.isArray(vulnerability.metrics)) return
      /** @type {Array<Metric>} */
      const metrics = vulnerability.metrics
      metrics.forEach((metric, metricIndex) => {
        validateCvss2(metric).forEach((attributeKey) => {
          errors.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/cvss_v2/${attributeKey}`,
            message: 'value is not consistent with the vector string',
          })
        })

        validateCvss3(metric).forEach((attributeKey) => {
          errors.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/cvss_v3/${attributeKey}`,
            message: 'value is not consistent with the vector string',
          })
        })

        validateCvss4(metric).forEach((attributeKey) => {
          errors.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/cvss_v4/${attributeKey}`,
            message: 'value is not consistent with the vector string',
          })
        })
      })
    })
  }

  return { errors, isValid: errors.length === 0 }
}

/**
 * validate the cvss vector against the cvss properties
 * @param {Record<string, { jsonName:string, optionsByKey:Record<string, string>}>}mappingByMetricKey cvss version specific mapping
 * @param {Record<string, unknown>} cvss cvss object

 */
function validateCVSSAttributes(mappingByMetricKey, cvss) {
  const vectorString = /** @type {string} */ (cvss.vectorString)
  const vectorValues = vectorString.split('/').slice(1)
  /**
   * @type {string[]}
   */
  const invalidKeys = []
  vectorValues.forEach((vectorValue) => {
    const [vectorMetricKey, vectorOptionKey] = vectorValue.split(':')
    const mapping = mappingByMetricKey[vectorMetricKey]
    if (mapping) {
      const metricOptionValue = cvss[mapping.jsonName]
      if (typeof metricOptionValue == 'string') {
        const expectedOptionValue = mapping.optionsByKey[vectorOptionKey]
        if (metricOptionValue !== expectedOptionValue) {
          invalidKeys.push(mapping.jsonName)
        }
      }
    }
  })
  return invalidKeys
}
