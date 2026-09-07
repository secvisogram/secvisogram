const jsonPtr = require('json-pointer')
const { resolve } = require('path')

/**
 * @param {{
 *    csaf20Schema: string
 *    csaf21Schema: string
 *    cvss40Schema: string
 *    cvss31Schema: string
 *    cvss20Schema: string
 *    ssvc20Schema: string
 *    csafExtensionContentSchema: string
 *    csafExtensionMetaschemaSchema: string
 *  }} args
 */
module.exports = function generatePreviewTemplatingTable(args) {
  const isV21 = args.csaf21Schema ? true : false
  const rootSchema = isV21
    ? require(resolve(args.csaf21Schema))
    : require(resolve(args.csaf20Schema))
  const cvss4Schema = isV21 ? require(resolve(args.cvss40Schema)) : undefined
  const cvss3Schema = require(resolve(args.cvss31Schema))
  const cvss2Schema = require(resolve(args.cvss20Schema))
  const ssvc2Schema = isV21 ? require(resolve(args.ssvc20Schema)) : undefined
  const extensionContentSchema = isV21
    ? require(resolve(args.csafExtensionContentSchema))
    : undefined
  const extensionMetaschemaSchema = isV21
    ? require(resolve(args.csafExtensionMetaschemaSchema))
    : undefined

  /**
   * Registry of all loaded schema documents, keyed by their `$id` with any
   * query string and fragment stripped. Used to resolve `$ref`s against the
   * document they actually belong to, instead of a single flattened
   * `rootSchema`, so that same-named `$defs` in different documents
   * (e.g. CVSS 4.0 vs CVSS 3.1) never collide.
   * @type {Record<string, any>}
   */
  const documents = {}
  for (const doc of [
    rootSchema,
    cvss4Schema,
    cvss3Schema,
    cvss2Schema,
    ssvc2Schema,
    extensionContentSchema,
    extensionMetaschemaSchema,
  ]) {
    if (doc && doc.$id) {
      documents[normalizeUrl(doc.$id)] = doc
    }
  }

  /**
   * @param {string} url
   * @returns {string}
   */
  function normalizeUrl(url) {
    return url.split('#')[0].split('?')[0]
  }

  /**
   * Resolves a `$ref` against the document it was found in (`currentDoc`),
   * following fragment-qualified refs into whichever document they actually
   * point at (which may be a different document than `currentDoc`).
   * @param {string} ref
   * @param {any} currentDoc
   * @returns {{ schema: any; doc: any } | undefined}
   */
  function resolveRef(ref, currentDoc) {
    const [base, fragment] = ref.split('#')
    const targetDoc = base ? documents[normalizeUrl(base)] : currentDoc
    if (!targetDoc) return undefined
    const schema = fragment ? jsonPtr.get(targetDoc, fragment) : targetDoc
    return { schema, doc: targetDoc }
  }

  /** @typedef {{ path: string; schema: any; items?: Array<Entry>; depth: number }} Entry */

  /**
   * @param {any} schema
   * @param {any} currentDoc the document `schema` was taken from, used to
   *   resolve any local (`#/...`) `$ref`s it contains
   * @param {string[]} instancePath
   * @param {number} depth
   * @returns {Array<Entry>}
   */
  function generateSchemaPaths(
    schema,
    currentDoc,
    instancePath = [],
    depth = 1,
  ) {
    const path = instancePath.length ? instancePath.join('.') : '.'
    if (depth > 10) return [{ path, schema, depth }]
    switch (schema.type) {
      case 'object':
        return [
          { path, schema, depth },
          ...Object.entries(schema.properties || {}).flatMap(([key, value]) =>
            generateSchemaPaths(
              value,
              currentDoc,
              instancePath.concat([key]),
              depth + 1,
            ),
          ),
        ]
      case 'array':
        return [
          {
            path,
            schema,
            items: generateSchemaPaths(schema.items, currentDoc, [], depth + 1),
            depth,
          },
        ]
      default:
        // CVSS 3.x is a `oneOf` between the 3.0 and 3.1 variants; both are
        // represented here by the loaded 3.1 schema
        if (
          schema.oneOf?.find(
            (/** @type {any} */ s) =>
              normalizeUrl(s.$ref || '') === normalizeUrl(cvss3Schema.$id),
          )
        ) {
          return generateSchemaPaths(
            cvss3Schema,
            cvss3Schema,
            instancePath,
            depth,
          )
        }
        if (schema.$ref) {
          const resolved = resolveRef(schema.$ref, currentDoc)
          if (resolved) {
            let refSchema = resolved.schema
            if (schema.description) {
              refSchema = Object.assign({}, refSchema)
              refSchema.description = schema.description
            }
            return generateSchemaPaths(
              refSchema,
              resolved.doc,
              instancePath,
              depth,
            )
          }
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
        case 'boolean':
        case 'integer':
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
      `${generateTable(generateSchemaPaths(rootSchema, rootSchema, []))}`,
  )
}
