import { expect } from 'chai'
import HTMLTemplate20 from '../../../../lib/app/SecvisogramPage/View/shared/HTMLTemplate2.0.js'
import DocumentEntity from '../../../../lib/core/v2_0/entities/DocumentEntity.js'
import secureHrefTests from '../../../fixtures/secureHrefTests.js'

describe('secureHrefTests', () => {
  secureHrefTests.forEach((test, i) => {
    it(test.title ?? `Test #${i + 1}`, () => {
      const preview = new DocumentEntity().preview({ document: test.content })
      const html = HTMLTemplate20(preview)
      // during HTML generation some characters are being replaced, so they are being replaced here as well
      const url = test.url.replaceAll('/', '&#x2F;').replaceAll('=', '&#x3D;')
      const hasHref = html.match(new RegExp(`<a href="${url}">.*</a>`))
      expect(hasHref !== null).to.equal(test.valid)
    })
  })
})
