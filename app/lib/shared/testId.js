import anchors from './testIdAnchors.js'

const SPEC_URLS = {
  'v2.0': 'https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html',
  'v2.1':
    'https://docs.oasis-open.org/csaf/csaf/v2.1/csd04/csaf-v2.1-csd04.html',
}

/**
 * Extracts the CSAF test ID (e.g. `6.1.27.11`) from the name of a test
 * function (e.g. `mandatoryTest_6_1_27_11`).
 *
 * @param {string | undefined} name
 * @returns {string | undefined} `undefined` if the name contains no test ID
 */
export function testIdFromName(name) {
  const match = name?.match(/_(6(?:_\d+)+)$/)
  return match ? match[1].replaceAll('_', '.') : undefined
}

/**
 * Builds the URL of the chapter of a test in the CSAF specification. The
 * anchors are generated from the heading text (e.g. `6.1.2` is
 * `#612-multiple-definition-of-product-id` in CSAF 2.0), so they are looked up
 * in the generated `testIdAnchors.js`. Tests without a
 * known chapter link to the top of the document.
 *
 * @param {string} testId
 * @param {import('#lib/uiSchemas.js').UiSchemaVersion} uiSchemaVersion
 */
export function testIdUrl(testId, uiSchemaVersion) {
  const anchor = anchors[uiSchemaVersion][testId]
  return anchor
    ? `${SPEC_URLS[uiSchemaVersion]}#${anchor}`
    : SPEC_URLS[uiSchemaVersion]
}
