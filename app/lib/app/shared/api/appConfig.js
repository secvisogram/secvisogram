import { t } from 'i18next'
import ApiRequest from '../ApiRequest.js'

export async function getAppConfig() {
  try {
    const response = await new ApiRequest(
      new Request('.well-known/appspecific/de.bsi.secvisogram.json')
    )
      .setContentType('application/json')
      .send()
    return await response.json()
  } catch (_error) {
    console.info(t('error.couldNotGetConfig'))
    return {
      loginAvailable: false,
    }
  }
}
