const jsonPtr = require('json-pointer')
const { resolve } = require('path')

/**
 * @param {{
 *    csaf20Schema: string
 *    cvss31Schema: string
 *    cvss20Schema: string
 *  }} args
 */
module.exports = function generatePreviewTemplatingTable(args) {
  const rootSchema = require(resolve(args.csaf20Schema))
  const cvss3Schema = require(resolve(args.cvss31Schema))
  const cvss2Schema = require(resolve(args.cvss20Schema))
  Object.assign(rootSchema.$defs, cvss3Schema.$defs, cvss2Schema.$defs)

  /** @typedef {{ path: string; schema: any; items?: Array<Entry>; depth: number }} Entry */

  /**
   * @param {any} schema
   * @param {string[]} instancePath
   * @param {number} depth
   * @returns {Array<Entry>}
   */
  function generateSchemaPaths(
    schema,
    instancePath = [],
    depth = 1,
    overwriteDescription = '',
  ) {
    const path = instancePath.length ? instancePath.join('.') : '.'
    if (depth > 10) return [{ path, schema, depth }]
    switch (schema.type) {
      case 'object':
        return [
          { path, schema, depth },
          ...Object.entries(schema.properties || {}).flatMap(([key, value]) =>
            generateSchemaPaths(value, instancePath.concat([key]), depth + 1),
          ),
        ]
      case 'array':
        return [
          {
            path,
            schema,
            items: generateSchemaPaths(schema.items, [], depth + 1),
            depth,
          },
        ]
      default:
        if (schema.$ref && schema.$ref.startsWith('#')) {
          var refSchema = jsonPtr.get(rootSchema, schema.$ref.slice(1))
          if (schema.description) {
            refSchema = Object.assign({}, refSchema)
            refSchema.description = schema.description
          }
          return generateSchemaPaths(refSchema, instancePath, depth)
        }
        if (
          schema.oneOf?.find(
            (/** @type {any} */ s) =>
              s.$ref === 'https://www.first.org/cvss/cvss-v3.1.json',
          )
        ) {
          return generateSchemaPaths(cvss3Schema, instancePath, depth)
        }
        if (schema.$ref === 'https://www.first.org/cvss/cvss-v2.0.json') {
          return generateSchemaPaths(cvss2Schema, instancePath, depth)
        }
        return [{ schema, path, depth }]
    }
  }

  /**
   * @param {Array<Entry>} entries
   * @param {string} parentPath
   * @returns {string}
   */
  function generateTable(entries, parentPath = '') {
    return entries.reduce((markdown, entry) => {
      const depth = entry.depth
      const key =
        parentPath.length > 0
          ? parentPath + (entry.path != '.' ? '.' + entry.path : '')
          : entry.path

      switch (entry.schema.type) {
        case 'number':
        case 'string':
          return (
            markdown +
            `| \`${key}\` | ` +
            (entry.schema.description ? `${entry.schema.description} ` : '') +
            `| ` +
            (entry.schema.examples
              ? `${entry.schema.examples.join(', ')} `
              : '') +
            `|\n`
          )

        case 'object':
          return (
            markdown +
            `| \`${key}\` | ` +
            (entry.schema.description ? `${entry.schema.description} ` : '') +
            `| |\n`
          )

        case 'array':
          return (
            markdown +
            `| \`${key}\` | ${entry.schema.description}| |\n` +
            (entry.items ? `${generateTable(entry.items, key + '[]')}` : '')
          )

        default:
          return markdown
      }
    }, '')
  }

  console.log(
    `| Attribute                                                          | Description                                                                                                                                                                                                                                                                                                                                                                             | Example value                                                                                                                                                                                           |\n` +
      `| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n` +
      `${generateTable(generateSchemaPaths(rootSchema, []))}`,
  )
}
