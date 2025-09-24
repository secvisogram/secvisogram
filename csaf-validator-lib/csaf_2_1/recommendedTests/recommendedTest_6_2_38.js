import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        category: { type: 'string' },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the recommended test 6.2.38 of the CSAF 2.1 standard.
 *
/**
 * @param {any} doc
 */
export function recommendedTest_6_2_38(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  if (doc.document.category.match(/^csaf_deprecated_.*$/)) {
    context.warnings.push({
      message:
        'The document category indicates the usage of a deprecated profile as it starts with "csaf_deprecated_"',
      instancePath: '/document/category',
    })
  }

  return context
}
