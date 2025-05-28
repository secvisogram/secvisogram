import Ajv from 'ajv/dist/jtd.js'

/*
  The maximum allowed nesting level of branches.
 */
const MAX_DEPTH = 30

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
  },
})

const validateBranch = ajv.compile(branchSchema)

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_tree: branchSchema,
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.34 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_34(doc) {
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

  /**
   * This recursive function checks if the given branch is too deep. A maximum of 30
   * levels is allowed.
   *
   * @param {import('./mandatoryTest_6_1_34/types').TypeOf<typeof validateBranch>} branch
   * @param {string} prefix The json path to the given branch.
   *    Is used to generate the error messages.
   */
  const checkBranch = (branch, prefix, count = 0) => {
    if (!branch.branches?.length && count > MAX_DEPTH) {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: prefix,
        message: `branch structure nesting exceeds ${MAX_DEPTH} branches (it is ${count} levels deep)`,
      })
      return
    }
    branch.branches?.forEach((branch, index) => {
      if (!validateBranch(branch)) return
      checkBranch(branch, `${prefix}/branches/${index}`, count + 1)
    })
  }

  checkBranch(doc.product_tree, '/product_tree')

  return ctx
}
