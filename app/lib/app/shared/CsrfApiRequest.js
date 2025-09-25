/* eslint-disable react/no-is-mounted */
import { t } from 'i18next'
import ApiRequest from './ApiRequest.js'
import { callAboutInfo } from './api/backend.js'
import BackendUnavailableError from './BackendUnavailableError.js'

export default class CsrfApiRequest extends ApiRequest {
  /**
   * @param {Request} request
   */
  constructor(request) {
    super(request)
  }

  async send() {
    if (!this.isCsrfRequired()) {
      return super.send()
    }

    this.setCsrfHeader()
    if (this.isCsrfHeaderSet) {
      return super.send()
    } else {
      // GET call to obtain the CSRF cookie
      await callAboutInfo().catch(() => {
        throw new BackendUnavailableError()
      })

      this.setCsrfHeader()
      return super.send()
    }
  }

  isCsrfRequired() {
    return !['GET', 'HEAD'].includes(this.request.method)
  }

  setCsrfHeader() {
    const headers = new Headers(this.request.headers)
    const regex = /^([^=]+)=(.+)$/
    const xsrfCookie = document.cookie
      .split('; ')
      .filter((c) => c)
      .map((s) => {
        const m = s.match(regex)
        if (!m) throw new Error(t('error.failedToParseCookies'))
        return /** @type {const} */ ([m[1], m[2]])
      })
      .find(([name]) => name === 'XSRF-TOKEN')
    if (xsrfCookie) {
      headers.set('X-XSRF-TOKEN', xsrfCookie[1])
      this.isCsrfHeaderSet = true
      this.request = new Request(this.request, {
        headers,
      })
    } else {
      this.isCsrfHeaderSet = false
    }
  }
}
