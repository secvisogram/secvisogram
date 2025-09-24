import Ajv from 'ajv/dist/jtd.js'

/**
 * @typedef {string} Product
 * /

 /** @typedef {import('ajv/dist/jtd.js').JTDDataType<typeof inputSchema>} InputSchema */

/** @typedef {InputSchema['vulnerabilities'][number]} Vulnerability */

/** @typedef {NonNullable<Vulnerability['metrics']>[number]} Metric */

/** @typedef {NonNullable<Metric['content']>} MetricContent */

const jtdAjv = new Ajv()

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
                source: {
                  type: 'string',
                },
                products: {
                  elements: { type: 'string' },
                },
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

const validate = jtdAjv.compile(inputSchema)

/**
 * For each item in /vulnerabilities it MUST be tested that the same Product ID
 * is not a member of more than one CVSS-Vectors with the same version and the same source.
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_7(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (!validate(doc)) {
    return ctx
  }

  /** @type {Array<Vulnerability>} */
  const vulnerabilities = doc.vulnerabilities

  /**
   * Create a unique string for the tuple of version and source
   * to compare them easily
   * @param {string} version
   * @param {string | undefined} source
   */
  function createIdForVersionAndSource(version, source) {
    return JSON.stringify({ version: version, source: source ?? '' })
  }

  /**
   *
   * @param  {Metric}  metric
   * @param {string}  versionSourceId
   * @returns {string|null}
   */
  function findCvssVersionWithSameVersionAndSource(metric, versionSourceId) {
    if (
      metric.content?.cvss_v2?.version !== undefined &&
      versionSourceId ===
        createIdForVersionAndSource(
          metric.content?.cvss_v2.version,
          metric.source
        )
    ) {
      return metric.content?.cvss_v2?.version
    } else if (
      metric.content?.cvss_v3?.version !== undefined &&
      versionSourceId ===
        createIdForVersionAndSource(
          metric.content?.cvss_v3.version,
          metric.source
        )
    ) {
      return metric.content?.cvss_v3?.version
    } else if (
      metric.content?.cvss_v4?.version !== undefined &&
      versionSourceId ===
        createIdForVersionAndSource(
          metric.content?.cvss_v4.version,
          metric.source
        )
    ) {
      return metric.content?.cvss_v4?.version
    } else {
      return null
    }
  }

  /**
   * @param {Metric} metric
   * @param {Set<string>} versionSourceIdSet
   */
  function addAllVersionSourceIdsInMetricToSet(metric, versionSourceIdSet) {
    if (metric.content?.cvss_v2?.version !== undefined) {
      versionSourceIdSet.add(
        createIdForVersionAndSource(
          metric.content?.cvss_v2.version,
          metric.source
        )
      )
    }
    if (metric.content?.cvss_v3?.version !== undefined) {
      versionSourceIdSet.add(
        createIdForVersionAndSource(
          metric.content?.cvss_v3.version,
          metric.source
        )
      )
    }
    if (metric.content?.cvss_v4?.version !== undefined) {
      versionSourceIdSet.add(
        createIdForVersionAndSource(
          metric.content?.cvss_v4.version,
          metric.source
        )
      )
    }
  }

  vulnerabilities.forEach((vulnerabilityItem, vulnerabilityIndex) => {
    /** @type {Map<string, Set<string>>} */
    const versionsSourceIdSetByProduct = new Map()

    /** @type {Array<Metric> | undefined} */
    const metrics = vulnerabilityItem.metrics
    metrics?.forEach((metric, metricIndex) => {
      /** @type {Array<Product> | undefined} */
      const productsOfMetric = metric.products
      productsOfMetric?.forEach((product, productIndex) => {
        const versionSourceIdsOfProduct =
          versionsSourceIdSetByProduct.get(product) ?? new Set()
        versionsSourceIdSetByProduct.set(product, versionSourceIdsOfProduct)

        versionSourceIdsOfProduct.forEach((versionSourceIdOfProduct) => {
          const sameVersion = findCvssVersionWithSameVersionAndSource(
            metric,
            versionSourceIdOfProduct
          )
          if (sameVersion) {
            isValid = false
            const sourceOfMetric = metric.source ? metric.source : ''
            errors.push({
              message: `Product is member of more than one CVSS-Vectors with the same version '${sameVersion}' and same source '${sourceOfMetric}'.`,
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/products/${productIndex}`,
            })
          }
        })

        addAllVersionSourceIdsInMetricToSet(metric, versionSourceIdsOfProduct)
      })
    })
  })

  return { errors, isValid }
}
