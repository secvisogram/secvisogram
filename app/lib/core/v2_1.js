import { compose, set } from 'lodash/fp.js'
import * as basic from '../../../csaf-validator-lib/csaf_2_1/basic.js'
import * as recommendedTests from '../../../csaf-validator-lib/csaf_2_1/recommendedTests.js'
import libStrip from '../../../csaf-validator-lib/strip.js'
import libValidate from '../../../csaf-validator-lib/validate.js'
import doc_max from './v2_1/doc-max.json'
import doc_min from './v2_1/doc-min.json'
import { DocumentEntity } from './v2_1/entities.js'

const INSTANT_TESTS =
  /** @type {import('../../../csaf-validator-lib/lib/shared/types.js').DocumentTest[]} */ (
    Object.values(basic)
  ).concat(Object.values(recommendedTests))

const secvisogramName = 'Secvisogram'

/* eslint-disable */
const secvisogramVersion =
  typeof SECVISOGRAM_VERSION !== 'undefined'
    ? SECVISOGRAM_VERSION.startsWith('v')
      ? SECVISOGRAM_VERSION.substr(1)
      : SECVISOGRAM_VERSION
    : 'unidentified version'
/* eslint-enable */

const setGeneratorFields = (/** @type {Date} */ date) =>
  compose(
    set('document.tracking.generator.engine.name', secvisogramName),
    set('document.tracking.generator.engine.version', secvisogramVersion),
    set('document.tracking.generator.date', date.toISOString())
  )

/**
 * This is a factory-function which instantiates the business-logic object.
 * Logic which can be abstracted without UI-interaction should be placed here
 * to be tested independently.
 */

/** @typedef {import('./typedValidationError.js').TypedValidationError} TypedValidationError */

/**
 * Validates the document and returns errors that possibly occur.
 *
 * @param {object} params
 * @param {{}} params.document
 */
export async function validate({ document }) {
  const res = await libValidate(INSTANT_TESTS, document)
  return {
    isValid: res.isValid,
    /** @type {TypedValidationError[]} */
    errors: res.tests.flatMap((t) =>
      t.errors
        .map(
          (e) => /** @type {TypedValidationError} */ ({ type: 'error', ...e })
        )
        .concat(
          t.warnings.map(
            (e) =>
              /** @type {TypedValidationError} */ ({ type: 'warning', ...e })
          )
        )
        .concat(
          t.infos.map(
            (e) => /** @type {TypedValidationError} */ ({ type: 'info', ...e })
          )
        )
    ),
  }
}

/**
 * @typedef {Object} FullProductName
 * @property {string} name
 * @property {string} product_id
 */

/**
 * @typedef {Object} Branch
 * @property {Array<Branch>} branches
 * @property {FullProductName} product
 */

/**
 * This method collects product_ids and corresponding names in the given document and returns a result object.
 *
 * @param {{
 *  document: any
 *  strict?: boolean
 * }} params
 * @returns {Promise<{id: string, name: string}[]>}
 */
export async function collectProductIds({ document }) {
  const documentEntity = new DocumentEntity()
  return documentEntity.collectProductIds({ document })
}

/**
 * This method collects group_ids and corresponding summaries in the given document and returns a result object.
 *
 * @param {{
 *  document: any
 *  strict?: boolean
 * }} params
 * @returns {Promise<{id: string, name: string}[]>}
 */
export async function collectGroupIds({ document }) {
  const documentEntity = new DocumentEntity()
  return documentEntity.collectGroupIds({ document })
}

/**
 * Provides a minimal new document.
 */
export function newDocMin() {
  return setGeneratorFields(new Date())({
    ...doc_min,
  })
}

/**
 * Provides a maximal new document.
 */
export async function newDocMax() {
  return setGeneratorFields(new Date())({
    ...doc_max,
  })
}

/**
 * Strips the document according to the CSAF-algorithm and returns a list
 * of removed elements.
 *
 * @param {object} params
 * @param {{}} params.document
 */
export async function strip({ document }) {
  const res = await libStrip(INSTANT_TESTS, document)

  return res
}

/**
 * Extends the current document with data required for preview and returns the extended document.
 *
 * @param {{
 *  document: {}
 *  strict?: boolean
 * }} params
 */
export async function preview({ document }) {
  const documentEntity = new DocumentEntity()
  return documentEntity.preview({ document })
}

export function getGeneratorEngineData() {
  return {
    name: secvisogramName,
    version: secvisogramVersion,
  }
}
