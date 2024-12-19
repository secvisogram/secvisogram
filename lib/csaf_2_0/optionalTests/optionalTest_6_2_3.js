import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,

  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,

        properties: {
          product_status: {
            additionalProperties: true,
            optionalProperties: {
              first_affected: { elements: { type: 'string' } },
              known_affected: { elements: { type: 'string' } },
              last_affected: { elements: { type: 'string' } },
            },
          },
        },

        optionalProperties: {
          scores: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                products: { elements: { type: 'string' } },
              },
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_3(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  doc.vulnerabilities?.forEach((vulnerability, vulnerabilityIndex) => {
    const productStatus = vulnerability.product_status
    const lists = /** @type {const} */ ([
      'first_affected',
      'known_affected',
      'last_affected',
    ])
    lists.forEach((listID) => {
      const listOfProductIDs = productStatus[listID]
      listOfProductIDs?.forEach((productID, productIDIndex) => {
        const hasMatchingScore = vulnerability.scores?.some((score) =>
          score.products?.includes(productID)
        )
        if (!hasMatchingScore) {
          context.warnings.push({
            message: 'missing score',
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status/${listID}/${productIDIndex}`,
          })
        }
      })
    })
  })

  return context
}
