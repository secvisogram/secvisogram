import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { compose, set } from 'lodash/fp'
import csaf_2_0 from './Core/csaf_2.0.json'
import csaf_2_0_strict from './Core/csaf_2.0_strict.json'
import cvss_v2_0 from './Core/cvss-v2.0.json'
import cvss_v3_0 from './Core/cvss-v3.0.json'
import cvss_v3_1 from './Core/cvss-v3.1.json'
import doc_max from './Core/doc-max.json'
import doc_min from './Core/doc-min.json'
import { DocumentEntity } from './Core/entities'

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
export default async function createCore() {
  const ajv = new Ajv({ strict: false, allErrors: true })
  addFormats(ajv)
  ajv.addSchema(cvss_v2_0, 'https://www.first.org/cvss/cvss-v2.0.json')
  ajv.addSchema(cvss_v3_0, 'https://www.first.org/cvss/cvss-v3.0.json')
  ajv.addSchema(cvss_v3_1, 'https://www.first.org/cvss/cvss-v3.1.json')
  const schemaValidatorLenient = ajv.compile(csaf_2_0)
  const schemaValidatorStrict = ajv.compile(csaf_2_0_strict)

  return {
    document: {
      /**
       * Validates the document and returns errors that possibly occur.
       *
       * @param {{
       *  document: {}
       *  strict?: boolean
       * }} params
       * @returns {Promise<{
       *   isValid: boolean;
       *   errors: {
       *     message?: string | undefined;
       *     dataPath: string;
       *   }[];
       * }>}
       */
      async validate({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
        return documentEntity.validate({ document })
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
      async collectProductIds({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
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
      async collectGroupIds({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
        return documentEntity.collectGroupIds({ document })
      },

      /**
       * Provides a minimal new document.
       */
      async newDocMin() {
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
       * @param {{
       *  document: {}
       *  strict?: boolean
       * }} params
       */
      async strip({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
        return documentEntity.strip({ document })
      },

      /**
       * Extends the current document with data required for preview and returns the extended document.
       *
       * @param {{
       *  document: {}
       *  strict?: boolean
       * }} params
       */
      async preview({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
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
