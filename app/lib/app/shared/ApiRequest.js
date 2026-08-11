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
      const backendMessage = await ApiRequest.extractBackendMessage(res)
      /** @type {any} */
      const error = new Error(backendMessage ?? res.statusText)
      error.status = res.status
      error.hasBackendMessage = backendMessage != null
      throw error
    }

    return res
  }

  /**
   * Extracts the backend's error message from the response body (which can be JSON or text/plain)
   * Returns null in case that no message was passed or it could not be parsed.
   * @param {Response} res
   * @returns {Promise<string | null>}
   */
  static async extractBackendMessage(res) {
    const contentType = res.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      try {
        const body = await res.json()
        if (typeof body?.message === 'string' && body.message.trim()) {
          return body.message
        }
      } catch {
        // fall through
      }
    } else if (contentType.includes('text/plain')) {
      try {
        const text = await res.text()
        if (text.trim()) {
          return text
        }
      } catch {
        // fall through
      }
    }
    return null
  }
}
