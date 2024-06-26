import { expect } from 'chai'
import DocumentEntity from '../../../../lib/app/shared/Core/entities/DocumentEntity.js'
import HTMLTemplate from '../../../../lib/app/SecvisogramPage/View/shared/HTMLTemplate.js'
import secureHrefTests from '../../../fixtures/secureHrefTests.js'

describe('secureHrefTests', () => {
  secureHrefTests.forEach((test, i) => {
    it(test.title ?? `Test #${i + 1}`, () => {
      const preview = new DocumentEntity().preview({ document: test.content })
      const html = HTMLTemplate(preview)
      // during HTML generation some characters are being replaced, so they are being replaced here as well
      const url = test.url.replaceAll('/', '&#x2F;').replaceAll('=', '&#x3D;')
      const hasHref = html.match(new RegExp(`<a href="${url}">.*</a>`))
      expect(hasHref !== null).to.equal(test.valid)
    })
  })
})