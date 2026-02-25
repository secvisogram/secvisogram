import Ajv from 'ajv/dist/jtd.js'
import { isCanonicalUrl } from '../../lib/shared/urlHelper.js'

/** @typedef {import('ajv/dist/jtd.js').JTDDataType<typeof inputSchema>} InputSchema */

/** @typedef {InputSchema['vulnerabilities'][number]} Vulnerability */

/** @typedef {NonNullable<Vulnerability['metrics']>[number]} Metric */

/** @typedef {NonNullable<Metric['content']>} MetricContent */

/** @typedef {{url?: string, category?: string}} Reference */

const jtdAjv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      optionalProperties: {
        references: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              category: { type: 'string' },
              url: { type: 'string' },
            },
          },
        },

        tracking: {
          additionalProperties: true,
          optionalProperties: {
            id: { type: 'string' },
          },
        },
      },
    },
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
                content: {
                  additionalProperties: true,
                  optionalProperties: {
                    qualitative_severity_rating: {
                      type: 'string',
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

const validateInput = jtdAjv.compile(inputSchema)

/**
 * Get the canonical url from the document
 * @return {string} canonical url or empty when no canonical url exists
 * @param {Array<{url?: string, category?: string}>|undefined} references
 * @param {string|undefined} trackingId
 */
function getCanonicalUrl(references, trackingId) {
  if (references && trackingId) {
    // Find the reference that matches our criteria
    /** @type {Reference| undefined} */
    const canonicalUrlReference = references.find((reference) =>
      isCanonicalUrl(reference, trackingId)
    )

    // When we find a matching reference, we know it has the url property
    // because isCanonicalUrl ensures it matches the Reference schema
    return canonicalUrlReference?.url ?? ''
  } else {
    return ''
  }
}

/**
 *  check whether metric has a  qualitative_severity_rating
 *  and no `source` or `source` that is equal to the canonical URL.
 * @param {Metric}  metric
 * @param {string} canonicalURL
 * @return {string | null}
 */
function checkSeverityRatingAndNoSource(metric, canonicalURL) {
  if (metric?.content?.qualitative_severity_rating) {
    if (!metric.source) {
      return 'as no "source" is given'
    } else if (metric.source === canonicalURL) {
      return 'as the "source" property equals to the canonical URL'
    } else {
      return null
    }
  } else {
    return null
  }
}

/**
 * For each item in `metrics` provided by the issuing party it MUST be tested
 * that it does not use the qualitative severity rating.
 * This covers all items in `metrics` that do not have a `source` property and those where the `source` is equal to
 * the canonical URL.
 *
/**
 * @param {any} doc
 */
export function recommendedTest_6_2_47(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }
  if (!validateInput(doc)) {
    return ctx
  }

  /** @type {Array<Vulnerability>} */
  const vulnerabilities = doc.vulnerabilities
  const canonicalURL = getCanonicalUrl(
    doc.document?.references,
    doc.document?.tracking?.id
  )

  vulnerabilities.forEach((vulnerabilityItem, vulnerabilityIndex) => {
    /** @type {Array<Metric> | undefined} */
    const metrics = vulnerabilityItem.metrics
    /** @type {Array<{path: string, message: string}> | undefined} */
    const invalidPaths = metrics
      ?.map((metric, metricIndex) => {
        const message = checkSeverityRatingAndNoSource(metric, canonicalURL)
        return message != null
          ? {
              path: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/qualitative_severity_rating`,
              message: message,
            }
          : null
      })
      .filter((path) => path !== null)

    invalidPaths?.forEach((path) => {
      ctx.warnings.push({
        message: `a qualitative severity rating is used by the issuing party (${path.message})`,
        instancePath: path.path,
      })
    })
  })

  return ctx
}
