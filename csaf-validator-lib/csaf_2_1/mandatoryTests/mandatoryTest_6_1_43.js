import Ajv from 'ajv/dist/jtd.js'

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
            model_numbers: { elements: { type: 'string' } },
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
        model_numbers: { elements: { type: 'string' } },
      },
    },
  },
})

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match, it normally means that the input
  document does not validate against the csaf JSON schema or optional fields that
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
 *
 * @param {string} stringToCheck
 * @return {boolean}
 */
export function containMultipleUnescapedStars(stringToCheck) {
  const regex = /\*/g
  return (stringToCheck.replace(/\\\*/g, '').match(regex)?.length ?? 0) > 1
}

/**
 * Validates all given model numbers and
 * check whether they contain multiple unescaped stars
 *
 * @param {Array<string> | undefined} modelNumbers model_numbers to check
 * @return {Array<number>} indexes of the model_numbers that invalid
 */
export function checkModelNumbers(modelNumbers) {
  /** @type {Array<number>}*/
  const invalidNumbers = []
  if (modelNumbers) {
    for (let i = 0; i < modelNumbers.length; i++) {
      const modelNumber = modelNumbers[i]
      if (containMultipleUnescapedStars(modelNumber)) {
        invalidNumbers.push(i)
      }
    }
  }
  return invalidNumbers
}

/**
 * For each model number, it MUST be tested
 * that it does not contain multiple unescaped stars.
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_43(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test run and is
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

  doc.product_tree?.full_product_names?.forEach((fullProduceName, index) => {
    checkFullProductName(
      `/product_tree/full_product_names/${index}`,
      fullProduceName
    )
  })

  doc.product_tree?.relationships?.forEach((relationship, index) => {
    const fullProductName = relationship.full_product_name
    if (fullProductName) {
      checkFullProductName(
        `/product_tree/relationships/${index}/full_product_name`,
        fullProductName
      )
    }
  })

  return ctx

  /**
   *  Check whether the model numbers contain multiple unescaped stars for a full product name object
   *
   * @param {string} prefix The instance path prefix of the "full product name". It is
   *    used to generate error messages.
   * @param {FullProductName} fullProductName The "full product name" object.
   */
  function checkFullProductName(prefix, fullProductName) {
    const invalidNumberIndexes = checkModelNumbers(
      fullProductName.product_identification_helper?.model_numbers
    )
    invalidNumberIndexes.forEach((invalidNumberIndex) => {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `${prefix}/product_identification_helper/model_numbers/${invalidNumberIndex}`,
        message: `model number contains multiple unescaped stars`,
      })
    })
  }

  /**
   * Check whether the model numbers contain multiple unescaped stars for the given branch object
   * and its branch children.
   *
   * @param {string} prefix The instance path prefix of the "branch". It is
   *    used to generate error messages.
   * @param {Branch} branch The "branch" object.
   */
  function checkBranch(prefix, branch) {
    const invalidNumberIndexes = checkModelNumbers(
      branch.product?.product_identification_helper?.model_numbers
    )
    invalidNumberIndexes.forEach((invalidNumberIndex) => {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `${prefix}/product/product_identification_helper/model_numbers/${invalidNumberIndex}`,
        message: `model number contains multiple unescaped stars`,
      })
    })
    branch.branches?.forEach((branch, index) => {
      if (validateBranch(branch)) {
        checkBranch(`${prefix}/branches/${index}`, branch)
      }
    })
  }
}
