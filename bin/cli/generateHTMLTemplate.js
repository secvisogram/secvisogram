const jsonPtr = require('json-pointer')
const { resolve } = require('path')

/**
 * @param {{
 *    csaf20Schema: string
 *    cvss31Schema: string
 *  }} args
 */
module.exports = function generateHTMLTemplate(args) {
  const rootSchema = require(resolve(args.csaf20Schema))
  const cvss3Schema = require(resolve(args.cvss31Schema))
  Object.assign(rootSchema.$defs, cvss3Schema.$defs)

  /** @typedef {{ path: string; schema: any; items?: Array<Entry>; headingLevel: number }} Entry */

  /**
   * @param {any} schema
   * @param {string[]} instancePath
   * @param {number} headingLevel
   * @returns {Array<Entry>}
   */
  function generateSchemaPaths(schema, instancePath = [], headingLevel = 1) {
    const path = instancePath.length ? instancePath.join('.') : '.'
    if (headingLevel > 8) return [{ path, schema, headingLevel }]
    switch (schema.type) {
      case 'object':
        return [
          { path, schema, headingLevel },
          ...Object.entries(schema.properties || {}).flatMap(([key, value]) =>
            generateSchemaPaths(
              value,
              instancePath.concat([key]),
              headingLevel + 1,
            ),
          ),
        ]
      case 'array':
        return [
          {
            path,
            schema,
            items: generateSchemaPaths(schema.items, [], headingLevel + 1),
            headingLevel,
          },
        ]
      default:
        if (schema.$ref && schema.$ref.startsWith('#')) {
          return generateSchemaPaths(
            jsonPtr.get(rootSchema, schema.$ref.slice(1)),
            instancePath,
            headingLevel,
          )
        }
        if (
          schema.oneOf?.find(
            (/** @type {any} */ s) =>
              s.$ref === 'https://www.first.org/cvss/cvss-v3.1.json',
          )
        ) {
          return generateSchemaPaths(cvss3Schema, instancePath, headingLevel)
        }
        return [{ schema, path, headingLevel }]
    }
  }

  /**
   * @param {Array<Entry>} entries
   * @returns {string}
   */
  function generateSchemaHTML(entries) {
    return entries.reduce((html, entry) => {
      const headingLevel = entry.headingLevel

      switch (entry.schema.type) {
        case 'string':
          return (
            html +
            `{{#${entry.path}}}<h${headingLevel}>${
              entry.schema.title || entry.path.split('.').pop()
            }</h${headingLevel}>\n<p>{{${entry.path}}}</p>{{/${entry.path}}}\n`
          )

        case 'object':
          return (
            html +
            `<h${headingLevel}>${entry.schema.title}</h${headingLevel}>\n`
          )

        case 'array':
          return (
            html +
            `<h${headingLevel}>${entry.schema.title}</h${headingLevel}>\n` +
            (entry.items
              ? `{{#${entry.path}}}${generateSchemaHTML(entry.items)}{{/${
                  entry.path
                }}}\n`
              : '')
          )

        default:
          return html
      }
    }, '')
  }

  console.log(
    `\
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="https://unpkg.com/gutenberg-css" media="print" charset="utf-8">
    <link rel="stylesheet" href="https://unpkg.com/gutenberg-css/dist/themes/modern.min.css" media="print" charset="utf-8">
    <meta charset="utf-8"/>
  </head>
  <body>
    ${generateSchemaHTML(generateSchemaPaths(rootSchema, []))}
  </body>
</html>`,
  )
}
