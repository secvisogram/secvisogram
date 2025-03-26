/** @typedef {keyof uiSchemas} UiSchemaVersion */

export const uiSchemas = {
  'v2.0': await import('./uiSchemas/csaf_2_0.js'),
  'v2.1': await import('./uiSchemas/csaf_2_1.js'),
}
