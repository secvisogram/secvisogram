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
const validateInput = ajv.compile(inputSchema)

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    category: { type: 'string' },
    name: { type: 'string' },
  },
})
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {unknown} doc
 * @returns
 */
export default async function informativeTest_6_3_11(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
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
        branch.category === 'product_version' &&
        typeof branch.name === 'string' &&
        branch.name.match(/^[vV][0-9].*$/)
      ) {
        ctx.infos.push({
          instancePath: `${path}/${branchIndex}/name`,
          message: 'usage of v as version indicator',
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

  checkBranches({
    path: '/product_tree/branches',
    branches: doc.product_tree.branches ?? [],
  })

  return ctx
}
