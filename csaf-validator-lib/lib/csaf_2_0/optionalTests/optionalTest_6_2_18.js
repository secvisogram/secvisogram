import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: { elements: { additionalProperties: true, properties: {} } },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    category: { type: 'string' },
    name: { type: 'string' },
  },
})

const validateInput = ajv.compile(inputSchema)
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_18(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  /**
   * @param {object} params
   * @param {string} params.path
   * @param {unknown[]} params.branches
   */
  function checkBranches({ path, branches }) {
    branches.forEach((branch, branchIndex) => {
      if (!validateBranch(branch)) {
        return
      }
      if (
        branch.category === 'product_version_range' &&
        typeof branch.name === 'string' &&
        !branch.name.match(
          new RegExp('^vers:[a-z\\.\\-\\+][a-z0-9\\.\\-\\+]*/.+')
        )
      ) {
        ctx.warnings.push({
          instancePath: `${path}/${branchIndex}`,
          message: 'product version range without vers',
        })
      }
      if (Array.isArray(branch.branches)) {
        checkBranches({
          path: `${path}/${branchIndex}/branches`,
          branches: branch.branches,
        })
      }
    })
  }

  if (doc.product_tree.branches) {
    checkBranches({
      path: '/product_tree/branches',
      branches: doc.product_tree.branches,
    })
  }

  return ctx
}
