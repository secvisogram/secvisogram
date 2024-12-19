import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_tree: {
      additionalProperties: true,
      properties: {
        branches: {
          elements: {
            additionalProperties: true,
            properties: {},
          },
        },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    category: { type: 'string' },
    name: { type: 'string' },
    branches: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
  },
})

const validate = ajv.compile(inputSchema)
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_31(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  /**
   * @param {object} params
   * @param {string} params.path
   * @param {unknown[]} params.branches
   */
  function checkBranches({ path, branches }) {
    branches.forEach((branch, branchIndex) => {
      if (validateBranch(branch)) {
        if (
          branch.category === 'product_version' &&
          typeof branch.name === 'string' &&
          (['<', '<=', '>', '>='].some((str) =>
            branch.name?.toLowerCase().includes(str)
          ) ||
            ['after', 'all', 'before', 'earlier', 'later', 'prior', 'versions'].some(
              (str) =>
                branch.name
                  ?.toLowerCase()
                  .split(/\s/)
                  .some((word) => {
                    return str === word
                  })
            ))
        ) {
          ctx.isValid = false
          ctx.errors.push({
            instancePath: `${path}/${branchIndex}/name`,
            message: 'version range in product version',
          })
        }
        if (Array.isArray(branch.branches)) {
          checkBranches({
            path: `${path}/${branchIndex}/branches`,
            branches: branch.branches,
          })
        }
      }
    })
  }

  checkBranches({
    path: '/product_tree/branches',
    branches: doc.product_tree.branches,
  })

  return ctx
}
