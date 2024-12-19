import isEmpty from 'lodash/isEmpty.js'
import unset from 'lodash/fp/unset.js'
import jsonPointer from 'json-pointer'
import validate from './validate.js'
import sortObjectKeys from './shared/sortObjectKeys.js'

const { parse } = jsonPointer

/**
 * This function strips empty nodes and nodes with errors.
 *
 * @param {Array<import('./shared/types.js').DocumentTest>} tests
 * @param {any} document
 */
export default async function (tests, document) {
  /** @type {Array<{ instancePath: string; message: string; error: boolean }>} */
  const strippedPaths = []

  /**
   * @param {{}} doc
   * @param {string} instancePath
   * @returns {{}}
   */
  const deleteEmptyNodes = (doc, instancePath) => {
    if (typeof doc === 'string' || typeof doc === 'number') return doc
    if (Array.isArray(doc))
      return doc.map((item, i) =>
        deleteEmptyNodes(item, `${instancePath}/${i}`)
      )
    return {
      ...Object.fromEntries(
        Object.entries(doc)
          .filter(([key, value]) => {
            const valueIsEmpty =
              value === '' ||
              value === null ||
              (typeof value === 'object' && isEmpty(value))

            if (valueIsEmpty) {
              strippedPaths.push({
                instancePath: `${instancePath}/${key}`,
                message: 'value was empty',
                error: false,
              })
            }
            return !valueIsEmpty
          })
          .map(([key, value]) => [
            key,
            deleteEmptyNodes(value, `${instancePath}/${key}`),
          ])
      ),
    }
  }

  const documentWithoutEmptyNodes = deleteEmptyNodes(document, '')
  let errorStrippedDocument = documentWithoutEmptyNodes
  /**
   * @type {Array<{
   *    message?: string
   *    instancePath: string
   *  }>}
   */
  let errors
  do {
    errors = (await validate(tests, errorStrippedDocument)).tests.flatMap(
      (t) => t.errors
    )
    errorStrippedDocument = JSON.parse(
      JSON.stringify(
        errors.reduce((updatedDoc, error) => {
          strippedPaths.push({
            instancePath: error.instancePath,
            error: true,
            message: /** @type {string} */ (error.message),
          })
          const parsedInstancePath = parse(error.instancePath).join('.')
          if (parsedInstancePath === '') return {}
          return unset(parsedInstancePath, updatedDoc)
        }, errorStrippedDocument),
        (_, value) => {
          if (Array.isArray(value)) {
            return value.filter((e) => e !== undefined)
          }
          return value
        }
      )
    )
  } while (
    errors &&
    errors.length &&
    Object.keys(errorStrippedDocument).length > 0
  )
  return {
    document: /** @type {any} */ (
      sortObjectKeys(new Intl.Collator(), errorStrippedDocument)
    ),
    strippedPaths,
  }
}
