import { describe, expect, it } from 'vitest'
import {
  enrichDocumentV2_1,
  HTMLTemplate2_1,
  renderMarkdown,
} from '@secvisogram/html-template'
import secureHrefTests from '../../fixtures/secureHrefTests.js'

describe('secureHrefTests', () => {
  secureHrefTests.forEach((test, i) => {
    it(test.title ?? `Test #${i + 1}`, () => {
      const enriched = enrichDocumentV2_1(test.content)
      const html = HTMLTemplate2_1({
        document: renderMarkdown(enriched.document),
      })
      // during HTML generation some characters are being replaced, so they are being replaced here as well
      const url = test.url.replaceAll('/', '&#x2F;').replaceAll('=', '&#x3D;')
      const hasHref = html.match(new RegExp(`<a href="${url}">.*</a>`))
      expect(hasHref !== null).to.equal(test.valid)
    })
  })
})
