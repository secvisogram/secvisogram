import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        product_groups: {
          elements: {
            optionalProperties: {
              group_id: { type: 'string' },
              product_ids: {
                elements: { type: 'string' },
              },
            },
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        properties: {
          flags: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                group_ids: { elements: { type: 'string' } },
                product_ids: { elements: { type: 'string' } },
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
export default function mandatoryTest_6_1_33(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    /** @type {Set<string>} */
    const productIDsWithVexJustificationCode = new Set()

    vulnerability.flags.forEach((flag, flagIndex) => {
      let flagReported = false

      function error() {
        if (!flagReported) {
          ctx.isValid = false
          ctx.errors.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/flags/${flagIndex}`,
            message: 'multiple flags with vex justification codes per product',
          })
        }
        flagReported = true
      }

      flag.product_ids?.forEach((productID) => {
        if (productIDsWithVexJustificationCode.has(productID)) {
          error()
        }
        productIDsWithVexJustificationCode.add(productID)
      })
      flag.group_ids?.forEach((groupID) => {
        const productIDs = doc.product_tree.product_groups?.find(
          (group) => group.group_id === groupID
        )?.product_ids
        productIDs?.forEach((productID) => {
          if (productIDsWithVexJustificationCode.has(productID)) {
            error()
          }
          productIDsWithVexJustificationCode.add(productID)
        })
      })
    })
  })

  return ctx
}
