import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          cwes: {
            elements: {
              additionalProperties: true,
              properties: {},
            },
          },
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)

/**
 * It MUST be tested that at least one CWE is given.
 * @param {unknown} doc
 * @returns
 */
export function informativeTest_6_3_4(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    if (!vulnerability?.cwes?.length) {
      ctx.infos.push({
        instancePath: `/vulnerabilities/${vulnerabilityIndex}`,
        message: 'missing cwe',
      })
    }
  })

  return ctx
}
