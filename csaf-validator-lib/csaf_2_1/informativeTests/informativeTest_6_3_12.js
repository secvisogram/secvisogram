import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

/**
 * @typedef {object} MetricContent
 * @property {object} [cvss_v2]
 * @property {string} [cvss_v2.version]
 * @property {object} [cvss_v3]
 * @property {string} [cvss_v3.version]
 * @property {object} [cvss_v4]
 * @property {string} [cvss_v4.version]
 */

/**
 * @typedef {object} Metric
 * @property {MetricContent} [content]
 * @property {Array<string>} [products]
 */

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
                        version: { type: 'string' },
                      },
                    },
                    cvss_v3: {
                      additionalProperties: true,
                      optionalProperties: {
                        version: { type: 'string' },
                      },
                    },
                    cvss_v4: {
                      additionalProperties: true,
                      optionalProperties: {
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
 * For each item in the list of metrics, it MUST be tested that a cvss_v4 object is present.
 * @param {unknown} doc
 * @returns
 */
export function informativeTest_6_3_12(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const vulnerabilities = doc.vulnerabilities

  vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    /** @type {Array<Metric> | undefined} */
    const metrics = vulnerability.metrics
    metrics?.forEach((metric, metricIndex) => {
      if (!metric?.content?.cvss_v4) {
        ctx.infos.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/cvss_v4`,
          message: `cvss_v4 object is not present`,
        })
      }
    })
  })

  return ctx
}
