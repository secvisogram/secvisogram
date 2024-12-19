import { createRequire } from 'module'
import { request } from 'undici'

/**
 * @type {{
 *  name: string
 *  version: string
 * }}
 */
const packageInfo = createRequire(import.meta.url)('../../../../package.json')

/**
 * @param {string} url
 * @param {() => void} onError
 */
export default async function testURL(url, onError) {
  // set user-agent to csaf-validator-lib/VERSION
  const userAgent = `${packageInfo.name.split('/').at(-1)}/${packageInfo.version}`
  try {
    const res = await request(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': userAgent
      }
    })
    if (res.statusCode < 200 || 400 <= res.statusCode) {
      onError()
    }
  } catch (e) {
    onError()
  }
}
