import Ajv from 'ajv/dist/jtd.js'
import { cwecMap } from '../../lib/cwec.js'

const ajv = new Ajv()

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        properties: {
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

const cweSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
  },
})

const validateCWE = ajv.compile(cweSchema)

/**
 * This implements the mandatory test 6.1.11 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export async function mandatoryTest_6_1_11(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (!validateInput(doc)) {
    return { errors, isValid }
  }

  for (let i = 0; i < doc.vulnerabilities.length; ++i) {
    const vulnerability = doc.vulnerabilities[i]
    for (let j = 0; j < vulnerability.cwes.length; ++j) {
      const cwe = vulnerability.cwes.at(j)
      if (validateCWE(cwe)) {
        const cwec = cwecMap.get(cwe.version)
        if (!cwec) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${i}/cwes/${j}/version`,
            message: 'no such cwe version is recognized',
          })
          continue
        }
        const entry = (await cwec()).default.weaknesses.find(
          (w) => w.id === cwe.id
        )
        if (!entry) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${i}/cwes/${j}/id`,
            message: `no weakness with this id is recognized in CWE ${cwe.version}`,
          })
          continue
        }
        if (entry.name !== cwe.name) {
          isValid = false
          errors.push({
            instancePath: `/vulnerabilities/${i}/cwes/${j}/name`,
            message: `the name does not match the weakness with the given id in CWE ${cwe.version}`,
          })
          continue
        }
      }
    }
  }

  return { isValid, errors }
}
