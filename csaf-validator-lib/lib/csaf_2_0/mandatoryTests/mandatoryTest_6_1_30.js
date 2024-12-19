import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        tracking: {
          additionalProperties: true,
          optionalProperties: {
            revision_history: {
              elements: {
                additionalProperties: true,
                optionalProperties: {
                  number: { type: 'string' },
                },
              },
            },
            version: { type: 'string' },
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
export default function mandatoryTest_6_1_30(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  /** @type {'SEMANTIC' | 'INTEGER' | null} */
  let versioningSchema = null
  doc.document.tracking.revision_history?.forEach((revision, revisionIndex) => {
    if (typeof revision.number === 'string') {
      const revisionNumberVersioningSchema = detectVersionSchema(
        revision.number
      )
      if (versioningSchema === null) {
        versioningSchema = revisionNumberVersioningSchema
      }
      if (versioningSchema !== revisionNumberVersioningSchema) {
        ctx.isValid = false
        ctx.errors.push({
          instancePath: `/document/tracking/revisions/${revisionIndex}/number`,
          message: 'mixed integer and semantic versioning',
        })
      }
    }
  })
  if (versioningSchema != null && typeof doc.document.tracking.version === 'string') {
    if (
      versioningSchema !== detectVersionSchema(doc.document.tracking.version)
    ) {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `/document/tracking/version`,
        message: 'mixed integer and semantic versioning',
      })
    }
  }

  return ctx
}

/**
 * @param {string} version
 */
function detectVersionSchema(version) {
  if (parseInt(version).toString() === version) return 'INTEGER'
  return 'SEMANTIC'
}
