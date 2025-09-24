import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

/**
 * @typedef {object} MetricContent
 * @property {object} [cvss_v2]
 * @property {string} cvss_v2.version
 * @property {object} [cvss_v3]
 * @property {string} cvss_v3.version
 * @property {object} [cvss_v4]
 * @property {string} cvss_v4.version
 */

/**
 * @typedef {object} Metric
 * @property {MetricContent} [content]
 * @property {Array<string>} products
 */

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        properties: {},
        optionalProperties: {
          metrics: {
            elements: {
              additionalProperties: true,
              properties: {
                products: {
                  elements: { type: 'string' },
                },
              },
              optionalProperties: {
                content: {
                  additionalProperties: true,
                  optionalProperties: {
                    cvss_v2: {
                      additionalProperties: true,
                      properties: {
                        version: { type: 'string' },
                      },
                    },
                    cvss_v3: {
                      additionalProperties: true,
                      properties: {
                        version: { type: 'string' },
                      },
                    },
                    cvss_v4: {
                      additionalProperties: true,
                      properties: {
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

const validateInput = ajv.compile(inputSchema)

/**
 * @param {unknown} doc
 * @returns
 */
export function informativeTest_6_3_1(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  /**
   * @param {Metric} metric
   * @param {Set<string>} versionSet
   */
  function addVersionsInMetricToSet(metric, versionSet) {
    if (metric.content?.cvss_v2?.version !== undefined) {
      versionSet.add(metric.content.cvss_v2.version)
    }
    if (metric.content?.cvss_v3?.version !== undefined) {
      versionSet.add(metric.content.cvss_v3.version)
    }
    if (metric.content?.cvss_v4?.version !== undefined) {
      versionSet.add(metric.content.cvss_v4.version)
    }
  }

  const vulnerabilities = doc.vulnerabilities

  vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    /** @type {Map<string, Set<string>>} */
    const cvssVersionsByProduct = new Map()
    const metricIndexByProduct = new Map()
    /** @type {Array<Metric> | undefined} */
    const metrics = vulnerability.metrics
    metrics?.forEach((metric, metricIndex) => {
      /** @type {Array<string>} */
      const products = metric.products
      products.forEach((product) => {
        const versionSet = cvssVersionsByProduct.get(product) ?? new Set()
        cvssVersionsByProduct.set(product, versionSet)
        metricIndexByProduct.set(product, metricIndex)
        addVersionsInMetricToSet(metric, versionSet)
      })
    })
    cvssVersionsByProduct.forEach((value, product) => {
      if (value.size === 1 && value.values().next().value === '2.0') {
        const metricIndex = metricIndexByProduct.get(product)
        ctx.infos.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}`,
          message: `use of cvss v2 as the only scoring system for product ${product}`,
        })
      }
    })
  })

  return ctx
}
