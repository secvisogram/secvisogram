/**
 * Bridge between the editor's React tree and the embedding page's
 * `<secvisogram-editor>` element. It decides what is reported to the page.
 */

/**
 * @typedef {import('./app/SecvisogramPage/shared/types.js').TypedValidationError} TypedValidationError
 */

/**
 * @typedef {object} ValidationResult
 * @property {TypedValidationError[]} errors
 * @property {boolean} valid
 */

/**
 * @typedef {object} EditorHost
 * @property {() => {} | undefined} getDocument
 *   The document currently held by the editor.
 * @property {(doc: {}) => void} loadDocument
 *   Records `doc` as written by the page, so that the editor loading it is
 *   not reported back as a change.
 * @property {(doc: {}) => void} documentChanged
 *   Reports that the editor now holds `doc`.
 * @property {(doc: {}, result: ValidationResult) => void} clientValidated
 *   Reports the result of the client-side validation of `doc`.
 * @property {(doc: {}, result: ValidationResult) => void} remoteValidated
 *   Reports the result of the validator service for `doc`.
 */

/**
 * Normalizes the response of the validator service into the typed error list.
 *
 * @param {{
 *   tests: Array<{
 *     errors: Array<{ instancePath: string; message: string }>
 *     warnings: Array<{ instancePath: string; message: string }>
 *     infos: Array<{ instancePath: string; message: string }>
 *   }>
 * }} response
 * @returns {TypedValidationError[]}
 */
export function remoteValidationErrors(response) {
  return response.tests.flatMap((test) => [
    ...test.errors.map((e) => ({ ...e, type: /** @type {const} */ ('error') })),
    ...test.warnings.map((e) => ({
      ...e,
      type: /** @type {const} */ ('warning'),
    })),
    ...test.infos.map((e) => ({ ...e, type: /** @type {const} */ ('info') })),
  ])
}

/**
 * @param {object} params
 * @param {(doc: {}) => void} params.onChange
 * @param {(result: ValidationResult) => void} params.onValidate
 * @returns {EditorHost}
 */
export function createEditorHost({ onChange, onValidate }) {
  /** @type {{} | undefined} */
  let currentDoc
  /** @type {{} | undefined} */
  let writtenDoc
  /**
   * Serialization of the document the page last knew about.
   *
   * @type {string | undefined}
   */
  let knownJson
  /**
   * Validation results are only kept for `currentDoc`. Any other document
   * invalidates them.
   *
   * @type {ValidationResult | null}
   */
  let clientResult = null
  /** @type {ValidationResult | null} */
  let remoteResult = null

  function reportValidation() {
    if (!clientResult) return
    onValidate({
      errors: [...clientResult.errors, ...(remoteResult?.errors ?? [])].map(
        ({ type, instancePath, message }) => ({ type, instancePath, message }),
      ),
      valid: clientResult.valid && (remoteResult?.valid ?? true),
    })
  }

  return {
    getDocument: () => currentDoc,
    loadDocument(doc) {
      writtenDoc = doc
    },
    documentChanged(doc) {
      if (doc === currentDoc) return
      currentDoc = doc
      clientResult = null
      remoteResult = null
      const json = JSON.stringify(doc)
      const isInitial = knownJson === undefined
      const isUnchanged = json === knownJson
      knownJson = json
      if (isInitial || isUnchanged || doc === writtenDoc) return
      onChange(doc)
    },
    clientValidated(doc, result) {
      if (doc !== currentDoc) return
      clientResult = result
      reportValidation()
    },
    remoteValidated(doc, result) {
      if (doc !== currentDoc) return
      remoteResult = result
      reportValidation()
    },
  }
}
