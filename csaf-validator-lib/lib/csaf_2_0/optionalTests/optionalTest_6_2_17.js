import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          ids: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                text: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)

/**
 * @param {any} doc
 */
export default function optionalTest_6_2_17(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    vulnerability.ids?.forEach((id, idIndex) => {
      if (id.text?.match(/^CVE-[0-9]{4}-[0-9]{4,}$/)) {
        ctx.warnings.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/ids/${idIndex}`,
          message: 'contains CVE',
        })
      }
    })
  })

  return ctx
}
