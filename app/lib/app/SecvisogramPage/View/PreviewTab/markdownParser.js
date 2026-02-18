import { get, set } from 'lodash'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

/**
 * Fields which will be parsed by the markdown parser
 * Be aware that these fields should not be html escaped in the template, so use {{{}}} insteadof {{}}
 *
 * @type {string[]}
 */
const markdownFields = [
  'document.acknowledgments.*.summary',
  'document.distribution.text',
  'document.notes.*.text',
  'document.publisher.issuing_authority',
  'document.references.*.summary',
  'document.tracking.revision_history.*.summary',
  'product_tree.product_groups.*.summary',
  'vulnerabilities.*.acknowledgments.*.summary',
  'vulnerabilities.*.involvements.*.summary',
  'vulnerabilities.*.notes.*.text',
  'vulnerabilities.*.references.*.summary',
  'vulnerabilities.*.remediations.*.details',
  'vulnerabilities.*.remediations.*.entitlements.*',
  'vulnerabilities.*.remediations.*.restart_required.details',
  'vulnerabilities.*.threats.*.details',
]

/**
 * @param {object} object
 * @param {string} key Nested key e.g `a.b.*.c`
 * @param {(value: any) => any} modifierFunction
 * @returns {void}
 */
const modifyNestedValues = (object, key, modifierFunction) => {
  // check if key includes nested array
  if (key.indexOf('.*') !== -1) {
    const keyParts = key.split('.*')
    // get nested key without leading `.`
    const newKey = key.substring(keyParts[0].length + 2).replace(/^\./, '')
    // get arraylike object
    const elem = get(object, keyParts[0])

    if (newKey) {
      // call function recursively for all array entries
      for (const x of elem ?? []) {
        if (x instanceof Object) {
          modifyNestedValues(x, newKey, modifierFunction)
        }
      }
    } else if (elem) {
      // apply modifierfunction to all array entries
      set(
        object,
        keyParts[0],
        elem.map((/** @type {any} */ v) => modifierFunction(v)),
      )
    }
  } else {
    // apply modifierfunction to nested value
    const prevValue = get(object, key)
    if (prevValue) {
      set(object, key, modifierFunction(prevValue))
    }
  }
}

/**
 * Parses selected markdown fields in the document
 *
 * @param {object} doc
 * @returns {object}
 */
export function parseMarkdown(doc) {
  markdownFields.forEach((field) =>
    modifyNestedValues(doc, field, (x) => {
      const parsedX = micromark(x, {
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()],
      })

      // only return parsed value if markdown was used
      return x === parsedX.match(/^<p>(.*)<\/p>$/)?.[1] ? x : parsedX
    }),
  )

  return doc
}
