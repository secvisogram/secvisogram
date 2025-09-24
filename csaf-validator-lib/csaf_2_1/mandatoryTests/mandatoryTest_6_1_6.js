import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          product_status: {
            additionalProperties: true,
            optionalProperties: {
              first_affected: { elements: { type: 'string' } },
              first_fixed: { elements: { type: 'string' } },
              fixed: { elements: { type: 'string' } },
              known_affected: { elements: { type: 'string' } },
              known_not_affected: { elements: { type: 'string' } },
              last_affected: { elements: { type: 'string' } },
              under_investigation: { elements: { type: 'string' } },
              unknown: { elements: { type: 'string' } },
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.6 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_6(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test ran and is
    finally returned by the function.
   */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  if (Array.isArray(doc.vulnerabilities)) {
    /** @type {Array<any>} */
    const vulnerabilities = doc.vulnerabilities
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      const productStatus = vulnerability.product_status
      if (!productStatus) return
      const groups = [
        new Set(
          []
            .concat(
              Array.isArray(productStatus.first_affected)
                ? productStatus.first_affected
                : []
            )
            .concat(
              Array.isArray(productStatus.known_affected)
                ? productStatus.known_affected
                : []
            )
            .concat(
              Array.isArray(productStatus.last_affected)
                ? productStatus.last_affected
                : []
            )
        ),
        new Set(
          Array.isArray(productStatus.known_not_affected)
            ? productStatus.known_not_affected
            : []
        ),
        new Set(
          []
            .concat(
              Array.isArray(productStatus.first_fixed)
                ? productStatus.first_fixed
                : []
            )
            .concat(
              Array.isArray(productStatus.fixed) ? productStatus.fixed : []
            )
        ),
        new Set(
          Array.isArray(productStatus.under_investigation)
            ? productStatus.under_investigation
            : []
        ),
        new Set(
          Array.isArray(productStatus.unknown) ? productStatus.unknown : []
        ),
      ]

      groups.forEach((group, index) => {
        const remainingGroups = groups.slice(index + 1)
        group.forEach((productID) => {
          if (remainingGroups.some((g) => g.has(productID))) {
            ctx.isValid = false
            ctx.errors.push({
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/product_status`,
              message: `product id "${productID}" is mentioned in contradicting product status groups`,
            })
          }
        })
      })
    })
  }

  return ctx
}
