export const coreRecord = /**
 * @type {const}
 * @satisfies {Record<import("./uiSchemas").UiSchemaVersion, {}>}
 */ ({
  'v2.0': await import('./core/v2_0.js'),
  'v2.1': await import('./core/v2_1.js'),
})
