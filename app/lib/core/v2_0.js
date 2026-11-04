import sortObjectKeys from '#lib/app/shared/sortObjectKeys.js'
import * as basic from '@secvisogram/csaf-validator-lib/basic.js'
import * as optionalTests from '@secvisogram/csaf-validator-lib/optionalTests.js'
import libStrip from '@secvisogram/csaf-validator-lib/strip.js'
import libValidate from '@secvisogram/csaf-validator-lib/validate.js'
import { compose, set } from 'lodash/fp.js'
import { testIdFromName } from '#lib/shared/testId.js'
import doc_max from './v2_0/doc-max.json'
import doc_min from './v2_0/doc-min.json'
import { DocumentEntity } from './v2_0/entities.js'

// The export keys are used to determine the test IDs, because the function
// names are not reliable in the minified browser bundle.
const INSTANT_TEST_ENTRIES =
  /** @type {[string, import('@secvisogram/csaf-validator-lib/lib/shared/types.js').DocumentTest][]} */ (
    Object.entries(basic)
  ).concat(
    /** @type {[string, import('@secvisogram/csaf-validator-lib/lib/shared/types.js').DocumentTest][]} */ (
      Object.entries(optionalTests)
    ),
  )
const INSTANT_TESTS = INSTANT_TEST_ENTRIES.map(([, test]) => test)

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
    (d) => sortObjectKeys(new Intl.Collator(), d),
    set('document.tracking.generator.engine.name', secvisogramName),
    set('document.tracking.generator.engine.version', secvisogramVersion),
    set('document.tracking.generator.date', date.toISOString()),
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
    errors: res.tests.flatMap((t, i) => {
      const testId = testIdFromName(INSTANT_TEST_ENTRIES[i]?.[0])
      /**
       * @param {'error' | 'warning' | 'info'} type
       * @param {{ instancePath: string; message: string }} e
       */
      const toTyped = (type, e) =>
        /** @type {TypedValidationError} */ ({
          type,
          ...e,
          ...(testId ? { testId } : {}),
        })
      return t.errors
        .map((e) => toTyped('error', e))
        .concat(t.warnings.map((e) => toTyped('warning', e)))
        .concat(t.infos.map((e) => toTyped('info', e)))
    }),
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

export function getGeneratorEngineData() {
  return {
    name: secvisogramName,
    version: secvisogramVersion,
  }
}
