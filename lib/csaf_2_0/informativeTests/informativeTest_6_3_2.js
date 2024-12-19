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
                cvss_v3: {
                  additionalProperties: true,
                  properties: {},
                  optionalProperties: {
                    version: { type: 'string' },
                    vectorString: { type: 'string' },
                  },
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
export default function informativeTest_6_3_2(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    vulnerability.scores?.forEach((score, scoreIndex) => {
      if (score.cvss_v3) {
        if (
          score.cvss_v3.version === '3.0' ||
          score.cvss_v3.vectorString?.startsWith('CVSS:3.0')
        ) {
          ctx.infos.push({
            instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v3/version`,
            message: 'It is recommended to upgrade to CVSS v3.1.',
          })
        }
      }
    })
  })

  return ctx
}
