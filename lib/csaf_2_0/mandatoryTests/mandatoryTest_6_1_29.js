import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        properties: {
          remediations: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                group_ids: { elements: { type: 'string' } },
                product_ids: { elements: { type: 'string' } },
              },
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
export default function mandatoryTest_6_1_29(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    vulnerability.remediations.forEach((remediation, remediationIndex) => {
      if (!remediation.group_ids && !remediation.product_ids) {
        ctx.isValid = false
        ctx.errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/remediations/${remediationIndex}`,
          message: 'remediation without product reference',
        })
      }
    })
  })

  return ctx
}
