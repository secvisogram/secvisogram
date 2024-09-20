import { compose, set } from 'lodash/fp.js'
import strip from '../../../../csaf-validator-lib/strip.js'
import validate from '../../../../csaf-validator-lib/validate.js'
import * as basic from '../../../../csaf-validator-lib/versions/basic.js'
import doc_max from './Core/doc-max.json'
import doc_min from './Core/doc-min.json'
import { DocumentEntity } from './Core/entities.js'

const BASIC_TESTS = Object.values(basic)

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
export default function createCore() {
  return {
    document: {
      /**
       * Validates the document and returns errors that possibly occur.
       * The validation is based on the basic tests and the tests of the
       * corresponding CSAF-version.
       *
       * @param {object} params
       * @param {any} params.document
       * @returns {Promise<{
       *   isValid: boolean;
       *   errors: {
       *     message?: string | undefined;
       *     instancePath: string;
       *   }[];
       * }>}
       */
      async validate({ document }) {
        const version = document.document.csaf_version
        let TESTS = BASIC_TESTS

        try {
          const VERSION_TESTS = Object.values(
            await import(
              `../../../../csaf-validator-lib/versions/${version}/basic.js`
            )
          )

          // Make sure that the tests are not duplicated
          VERSION_TESTS.forEach((t) => {
            if (!TESTS.map((t) => t.name).includes(t.name)) {
              TESTS.push(t)
            } else {
              // eslint-disable-next-line no-console
              console.warn(
                `Test ${t.name} is already present in the basic tests.`
              )
            }
          })

          try {
            const IGNORED_TESTS = Object.values(
              await import(
                `../../../../csaf-validator-lib/versions/${version}/ignoredTests.js`
              )
            )
            TESTS = TESTS.filter((t) => !IGNORED_TESTS.includes(t.name))
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`No ignored tests for this version ${version}`)
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            `Could not load tests for version ${version}. Falling back to basic tests.`
          )
        }

        const res = await validate(TESTS, document)
        return {
          isValid: res.isValid,
          errors: res.tests.flatMap((t) => t.errors),
        }
      },

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
      async collectProductIds({ document }) {
        const documentEntity = new DocumentEntity()
        return documentEntity.collectProductIds({ document })
      },

      /**
       * This method collects group_ids and corresponding summaries in the given document and returns a result object.
       *
       * @param {{
       *  document: any
       *  strict?: boolean
       * }} params
       * @returns {Promise<{id: string, name: string}[]>}
       */
      async collectGroupIds({ document }) {
        const documentEntity = new DocumentEntity()
        return documentEntity.collectGroupIds({ document })
      },

      /**
       * Provides a minimal new document.
       */
      newDocMin() {
        return setGeneratorFields(new Date())({
          ...doc_min,
        })
      },

      /**
       * Provides a maximal new document.
       */
      async newDocMax() {
        return setGeneratorFields(new Date())({
          ...doc_max,
        })
      },

      /**
       * Strips the document according to the CSAF-algorithm and returns a list
       * of removed elements.
       *
       * @param {object} params
       * @param {{}} params.document
       */
      async strip({ document }) {
        const res = await strip(BASIC_TESTS, document)

        return res
      },

      /**
       * Extends the current document with data required for preview and returns the extended document.
       *
       * @param {{
       *  document: {}
       *  strict?: boolean
       * }} params
       */
      async preview({ document }) {
        const documentEntity = new DocumentEntity()
        return documentEntity.preview({ document })
      },

      getGeneratorEngineData() {
        return {
          name: secvisogramName,
          version: secvisogramVersion,
        }
      },
    },
  }
}
