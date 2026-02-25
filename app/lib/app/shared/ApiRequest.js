export default class ApiRequest {
  /**
   * @param {Request} request
   */
  constructor(request) {
    /** @protected */
    this.request = request
  }

  /**
   * @param {{ username: string; password: string }} credentials
   */
  setBasicAuth(credentials) {
    const headers = new Headers(this.request.headers)
    headers.set(
      'authorization',
      `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
    )
    this.request = new Request(this.request, { headers })
    return this
  }

  /**
   * @param {string} contentType
   */
  setContentType(contentType) {
    const headers = new Headers(this.request.headers)
    headers.set('accept', contentType)
    this.request = new Request(this.request, { headers })
    return this
  }

  /**
   * @param {{}} body
   */
  setJsonRequestBody(body) {
    const headers = new Headers(this.request.headers)
    headers.set('content-type', 'application/json')
    this.request = new Request(this.request, {
      headers,
      body: JSON.stringify(body),
    })
    return this
  }

  async send() {
    const res = await fetch(this.request)
    if (!res.ok) {
      /** @type {any} */
      const error = new Error(res.statusText)
      error.status = res.status
      throw error
    }

    return res
  }
}
