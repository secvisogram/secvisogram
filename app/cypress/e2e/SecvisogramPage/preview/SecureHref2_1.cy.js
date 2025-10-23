import { expect } from 'chai'
import HTMLTemplate2_1 from '../../../../lib/app/SecvisogramPage/View/shared/HTMLTemplate2_1.js'
import DocumentEntityCsaf21 from '../../../../lib/core/v2_1/entities/DocumentEntity.js'
import secureHrefTests from '../../../fixtures/secureHrefTests.js'

describe('secureHrefTests', () => {
  secureHrefTests.forEach((test, i) => {
    it(test.title ?? `Test #${i + 1}`, () => {
      const preview = new DocumentEntityCsaf21().preview({
        document: test.content,
      })
      const html = HTMLTemplate2_1(preview)
      // during HTML generation some characters are being replaced, so they are being replaced here as well
      const url = test.url.replaceAll('/', '&#x2F;').replaceAll('=', '&#x3D;')
      const hasHref = html.match(new RegExp(`<a href="${url}">.*</a>`))
      expect(hasHref !== null).to.equal(test.valid)
    })
  })
})
