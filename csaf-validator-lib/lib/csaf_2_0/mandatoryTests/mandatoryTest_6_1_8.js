import Ajv from 'ajv/dist/jtd.js'
import csafAjv from '../../shared/csafAjv.js'

const jtdAjv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          scores: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                cvss_v2: {
                  additionalProperties: true,
                  properties: {},
                },
                cvss_v3: {
                  additionalProperties: true,
                  properties: {},
                },
              },
            },
          },
        },
      },
    },
  },
})

const validate = jtdAjv.compile(inputSchema)

const validate_2_0 = csafAjv.compile({
  $ref: 'https://www.first.org/cvss/cvss-v2.0.json',
})

const validate_3 = csafAjv.compile({
  oneOf: [
    {
      $ref: 'https://www.first.org/cvss/cvss-v3.0.json',
    },
    {
      $ref: 'https://www.first.org/cvss/cvss-v3.1.json',
    },
  ],
})

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_8(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  for (const [
    vulnerabilityIndex,
    vulnerability,
  ] of doc.vulnerabilities?.entries() ?? []) {
    for (const [scoreIndex, score] of vulnerability.scores?.entries() ?? []) {
      if (score.cvss_v2) {
        const valid = validate_2_0(score.cvss_v2)
        if (!valid) {
          ctx.isValid = false
          for (const err of validate_2_0.errors ?? []) {
            ctx.errors.push({
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v2${err.instancePath}`,
              message: err.message ?? '',
            })
          }
        }
      }
      if (score.cvss_v3) {
        const valid = validate_3(score.cvss_v3)
        if (!valid) {
          ctx.isValid = false
          for (const err of validate_3.errors ?? []) {
            ctx.errors.push({
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v3${err.instancePath}`,
              message: err.message ?? '',
            })
          }
        }
      }
    }
  }

  return ctx
}
