import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,

  optionalProperties: {
    product_tree: {
      additionalProperties: true,

      optionalProperties: {
        product_groups: {
          elements: {
            additionalProperties: true,

            optionalProperties: {
              group_id: { type: 'string' },
              product_ids: { elements: { type: 'string' } },
            },
          },
        },
      },
    },
  },

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
              under_investigation: { elements: { type: 'string' } },
            },
          },
        },

        optionalProperties: {
          remediations: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                product_ids: { elements: { type: 'string' } },
                group_ids: {
                  elements: { type: 'string' },
                },
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
export default function optionalTest_6_2_2(doc) {
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
      'under_investigation',
    ])
    lists.forEach((listID) => {
      const listOfProductIDs = productStatus[listID]
      listOfProductIDs?.forEach((productID, productIDIndex) => {
        const hasMatchingRemediation = vulnerability.remediations?.some(
          (remediation) =>
            remediation.product_ids?.includes(productID) ||
            remediation.group_ids
              ?.map((id) =>
                doc.product_tree?.product_groups?.find((g) => g.group_id === id)
              )
              .some((g) => g?.product_ids?.includes(productID))
        )
        if (!hasMatchingRemediation) {
          context.warnings.push({
            message: 'missing remediation',
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status/${listID}/${productIDIndex}`,
          })
        }
      })
    })
  })

  return context
}
