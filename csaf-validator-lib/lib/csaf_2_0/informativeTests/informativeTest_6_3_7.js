import Ajv from 'ajv/dist/jtd.js'
import testURL from './shared/testURL.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    document: {
      additionalProperties: true,
      optionalProperties: {
        references: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              url: { type: 'string' },
              category: { type: 'string' },
            },
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          references: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                url: { type: 'string' },
                category: { type: 'string' },
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
export default async function informativeTest_6_3_7(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const referenceObjects = (
    doc.document?.references?.map((reference, referenceIndex) => ({
      instancePath: `/document/references/${referenceIndex}`,
      value: reference,
    })) ?? []
  ).concat(
    doc.vulnerabilities?.flatMap(
      (vulnerability, vulnerabilityIndex) =>
        vulnerability.references?.map((reference, referenceIndex) => ({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/references/${referenceIndex}`,
          value: reference,
        })) ?? []
    ) ?? []
  )

  for (const { value: reference, instancePath } of referenceObjects) {
    if (reference.category !== 'self' || !reference.url) continue
    await testURL(reference.url, () => {
      ctx.infos.push({
        instancePath,
        message: 'use of self referencing urls failing to resolve',
      })
    })
  }

  return ctx
}
