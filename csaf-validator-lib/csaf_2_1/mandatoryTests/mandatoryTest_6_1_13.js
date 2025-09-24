import pkgURL from 'packageurl-js'
import Ajv from 'ajv/dist/jtd.js'

const { PackageURL } = pkgURL

const ajv = new Ajv()

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    branches: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
    product: {
      additionalProperties: true,
      optionalProperties: {
        product_identification_helper: {
          additionalProperties: true,
          optionalProperties: {
            purls: { elements: { type: 'string' } },
          },
        },
      },
    },
  },
})

const validateBranch = ajv.compile(branchSchema)

const fullProductNameSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_identification_helper: {
      additionalProperties: true,
      optionalProperties: {
        purls: { elements: { type: 'string' } },
      },
    },
  },
})

const validateFullProductName = ajv.compile(fullProductNameSchema)

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: {
          elements: branchSchema,
        },
        full_product_names: {
          elements: fullProductNameSchema,
        },
        relationships: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              full_product_name: fullProductNameSchema,
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * @typedef {import('ajv/dist/core').JTDDataType<typeof branchSchema>} Branch
 * @typedef {import('ajv/dist/core').JTDDataType<typeof fullProductNameSchema>} FullProductName
 */

/**
 * This implements the mandatory test 6.1.13 of the CSAF 2.1 standard.
 *
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_13(doc) {
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

  doc.product_tree?.branches?.forEach((branch, index) => {
    checkBranch(`/product_tree/branches/${index}`, branch)
  })

  doc.product_tree?.full_product_names?.forEach((name, index) => {
    checkFullProductName(`/product_tree/full_product_names/${index}`, name)
  })

  doc.product_tree?.relationships?.forEach((relationship, index) => {
    const fullProductName = relationship.full_product_name
    if (!fullProductName) return
    checkFullProductName(
      `/product_tree/relationships/${index}/full_product_name`,
      fullProductName
    )
  })

  return ctx

  /**
   * Validates the given purl and generates an error message if it is not.
   *
   * @param {string} instancePath The instance path of the purl to check. It is used to
   *    to generate a potential error message.
   * @param {string} str
   */
  function checkPURL(instancePath, str) {
    try {
      PackageURL.fromString(str)
    } catch (e) {
      const errorObject = /** @type {{message: string}} */ (e)
      ctx.isValid = false
      const message = errorObject?.message ?? 'unknown purl error'
      ctx.errors.push({
        instancePath,
        message: `${message.at(0)?.toLocaleLowerCase()}${message.slice(1)}`,
      })
    }
  }

  /**
   * Validates the purls in the given "full product name".
   *
   * @param {string} prefix The instance path prefix of the "full product name". It is
   *    used to generate error messages.
   * @param {FullProductName} fullProductName The "full product name" object.
   */
  function checkFullProductName(prefix, fullProductName) {
    fullProductName.product_identification_helper?.purls?.forEach(
      (purl, index) => {
        checkPURL(
          `${prefix}/product_identification_helper/purls/${index}`,
          purl
        )
      }
    )
  }

  /**
   * Validates the purls in the given branch object and its branch children.
   *
   * @param {string} prefix The instance path prefix of the "branch". It is
   *    used to generate error messages.
   * @param {Branch} branch The "branch" object.
   */
  function checkBranch(prefix, branch) {
    branch.product?.product_identification_helper?.purls?.forEach(
      (purl, index) => {
        checkPURL(
          `${prefix}/product/product_identification_helper/purls/${index}`,
          purl
        )
      }
    )
    branch.branches?.forEach((branch, index) => {
      if (!validateBranch(branch)) return
      checkBranch(`${prefix}/branches/${index}`, branch)
    })
  }
}
