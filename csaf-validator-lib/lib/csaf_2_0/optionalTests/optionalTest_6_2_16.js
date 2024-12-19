import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: { elements: { additionalProperties: true, properties: {} } },
        full_product_names: {
          elements: { additionalProperties: true, properties: {} },
        },
        relationships: {
          elements: { additionalProperties: true, properties: {} },
        },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product: {
      additionalProperties: true,
      optionalProperties: {
        product_identification_helper: {
          additionalProperties: true,
          properties: {},
        },
      },
    },
  },
})

const relationshipSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    full_product_name: {
      additionalProperties: true,
      optionalProperties: {
        product_identification_helper: {
          additionalProperties: true,
          properties: {},
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)
const validateRelationship = ajv.compile(relationshipSchema)
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_16(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.product_tree.full_product_names?.forEach(
    (fullProductName, fullProductNameIndex) => {
      if (!fullProductName.product_identification_helper) {
        ctx.warnings.push({
          instancePath: `/product_tree/full_product_names/${fullProductNameIndex}`,
          message: 'missing product identification helper',
        })
      }
    }
  )

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
      if (branch.product && !branch.product.product_identification_helper) {
        ctx.warnings.push({
          instancePath: `${path}/${branchIndex}/product`,
          message: 'missing product identification helper',
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

  doc.product_tree.relationships?.forEach((relationship, relationshipIndex) => {
    if (!validateRelationship(relationship)) {
      return
    }

    if (!relationship.full_product_name.product_identification_helper) {
      ctx.warnings.push({
        instancePath: `/product_tree/relationships/${relationshipIndex}/full_product_name`,
        message: 'missing product identification helper',
      })
    }
  })

  return ctx
}
