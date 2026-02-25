import assert from 'node:assert/strict'
import { recommendedTest_6_2_40 } from '../../csaf_2_1/recommendedTests/recommendedTest_6_2_40.js'

describe('recommendedTest_6_2_40', function () {
  it('only runs on relevant documents', function () {
    assert.equal(recommendedTest_6_2_40({}).warnings.length, 0)
  })
  it('skips empty objects', function () {
    assert.equal(
      recommendedTest_6_2_40({
        document: {
          notes: [
            {
              category: 'description',
              text: 'Product A is a local time tracking tool. It is mainly used by software developers and can be connected with most modern time-tracking systems.',
              title: 'Product Description',
            },
            {}, // skip this empty object
          ],
        },
      }).warnings.length,
      1
    )
  })
  it('no language specific translation', function () {
    assert.equal(
      recommendedTest_6_2_40({
        document: {
          lang: '123456789',
          notes: [
            {
              category: 'description',
              product_ids: ['CSAFPID-9080700'],
              text: 'Produkt A is ein lokales Zeiterfassungstool. Es wird hauptsächlich von Softwareentwicklern verwendet und kann an die meisten modernen Zeiterfasssungssysteme angebunden werden.',
              title: 'Produkt A wird hier beschrieben',
            },
          ],
        },
      }).infos.length,
      1
    )
  })
})
