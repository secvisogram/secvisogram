import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        properties: {},
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

const validateInput = ajv.compile(inputSchema)

/**
 * @param {unknown} doc
 * @returns
 */
export default function informativeTest_6_3_1(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    vulnerability.scores?.forEach((score, scoreIndex) => {
      if (score.cvss_v2 && !score.cvss_v3) {
        ctx.infos.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}`,
          message: 'use of cvss v2 as the only scoring system',
        })
      }
    })
  })

  return ctx
}
