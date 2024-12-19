import Ajv from 'ajv/dist/jtd.js'
import { walkHashes } from '../../shared/csafHelpers.js'

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
 * @param {unknown} doc
 * @returns
 */
export default function informativeTest_6_3_5(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  walkHashes(doc, ({ path, hash }) => {
    if (!validateHash(hash)) return
    hash.file_hashes.forEach((fileHash, fileHashIndex) => {
      if (typeof fileHash.value === 'string' && fileHash.value.length < 64) {
        ctx.infos.push({
          instancePath: `${path}/file_hashes/${fileHashIndex}/value`,
          message: 'use of short hash',
        })
      }
    })
  })

  return ctx
}
