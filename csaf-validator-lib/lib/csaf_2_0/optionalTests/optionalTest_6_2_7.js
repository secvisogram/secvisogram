import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          involvements: {
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

const validate = ajv.compile(inputSchema)

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_7(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validate(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    vulnerability.involvements?.forEach((involvement, involvementIndex) => {
      if (!involvement.date) {
        ctx.warnings.push({
          message: 'missing date',
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/involvements/${involvementIndex}`,
        })
      }
    })
  })

  return ctx
}
