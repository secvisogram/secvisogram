import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

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
                    cvss_v3: {
                      additionalProperties: true,
                      optionalProperties: {
                        version: { type: 'string' },
                        vectorString: { type: 'string' },
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
 * For each item in the list of metrics which contains the cvss_v3 object under
 * content it MUST be tested that CVSS v3.0 is not used.
 * @param {unknown} doc
 * @returns
 */
export function informativeTest_6_3_2(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    const metrics = vulnerability.metrics
    metrics?.forEach((metric, metricIndex) => {
      if (metric.content?.cvss_v3) {
        if (
          metric.content.cvss_v3.version === '3.0' ||
          metric.content.cvss_v3.vectorString?.startsWith('CVSS:3.0')
        ) {
          ctx.infos.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/cvss_v3/version`,
            message: 'It is recommended to upgrade to CVSS v3.1.',
          })
        }
      }
    })
  })

  return ctx
}
