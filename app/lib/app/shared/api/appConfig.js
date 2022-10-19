import ApiRequest from '../ApiRequest.js'

export async function getAppConfig() {
  try {
    const response = await new ApiRequest(
      new Request('.well-known/appspecific/de.bsi.secvisogram.json')
    )
      .setContentType('application/json')
      .send()
    return await response.json()
  } catch (error) {
    console.info('Could not get config. Falling back to standalone mode.')
    return {
      loginAvailable: false,
    }
  }
}
