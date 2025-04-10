/**
 * This module exports the ui schemas and the associated meta data
 * (including the csaf json schema) for all supported CSAF versions.
 *
 * See app/scripts/importUiMetaData/README.md for more information.
 */

/** @typedef {keyof uiSchemas} UiSchemaVersion */

export const uiSchemas = {
  'v2.0': await import('./uiSchemas/csaf_2_0.js'),
  'v2.1': await import('./uiSchemas/csaf_2_1.js'),
}
