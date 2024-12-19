import Ajv from 'ajv/dist/jtd.js'
import { walkHashes } from '../../../shared/csafHelpers.js'

const ajv = new Ajv()

const hashSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    file_hashes: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
  },
})

const validateHash = ajv.compile(hashSchema)

/**
 * @param {any} doc
 * @param {string} hashName
 */
export default function (doc, hashName) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  walkHashes(doc, ({ path, hash }) => {
    if (!validateHash(hash)) return
    const hashSet = getHashAlgorithmSet(hash)
    if (hashSet.has(hashName) && hashSet.size === 1) {
      ctx.warnings.push({
        instancePath: path,
        message: `use of ${hashName} as the only hash algorithm`,
      })
    }
  })

  return ctx
}

/**
 *
 * @param {{ file_hashes: Array<{ algorithm?: unknown }> }} hash
 * @returns
 */
function getHashAlgorithmSet(hash) {
  return new Set(
    hash.file_hashes
      .map((h) => h.algorithm)
      .filter(
        /** @returns {v is string} */
        (v) => typeof v === 'string'
      )
  )
}
