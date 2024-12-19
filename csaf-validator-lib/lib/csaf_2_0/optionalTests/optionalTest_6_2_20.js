import schema from '../../schemas/schema_2_0_strict.js'
import csafAjv from '../../shared/csafAjv.js'

const validateStrictSchema = csafAjv.compile(schema)

/**
 * @param {unknown} doc
 */
export default function optionalTest_6_2_20(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateStrictSchema(doc)) {
    const additionalPropertiesErrors =
      validateStrictSchema.errors?.filter(
        (e) => e.keyword === 'additionalProperties'
      ) ?? []
    for (const error of additionalPropertiesErrors) {
      ctx.warnings.push({
        instancePath: error.instancePath,
        message: error.message ?? '',
      })
    }
  }

  return ctx
}
