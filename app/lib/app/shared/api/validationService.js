import ApiRequest from '../ApiRequest.js'

/**
 * @param {string} validatorUrl
 * @param {object} params
 * @param {{}} params.csaf
 * @returns
 */
export async function validateCSAF(validatorUrl, { csaf }) {
  const version = /** @type {any} */ (csaf)?.document?.csaf_version
  const tests =
    version === '2.1'
      ? [{ type: 'preset', name: 'full' }]
      : [
          { type: 'test', name: 'csaf_2_0_strict' },
          { type: 'preset', name: 'mandatory' },
          { type: 'preset', name: 'optional' },
          { type: 'preset', name: 'informative' },
        ]

  const validateResponse = await new ApiRequest(
    new Request(validatorUrl + '/api/v1/validate', { method: 'POST' }),
  )
    .setJsonRequestBody({
      tests,
      document: csaf,
    })
    .setContentType('application/json')
    .send()

  /**
   * @type {{ isValid: boolean, tests: Array<{ name: string; errors: Array<{ instancePath: string; message: string }>; warnings: Array<{ instancePath: string; message: string }>; infos: Array<{ instancePath: string; message: string }> }> }}
   */
  return await validateResponse.json()
}
