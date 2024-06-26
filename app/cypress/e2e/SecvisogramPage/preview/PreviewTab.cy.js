import { expect } from 'chai'
import DocumentEntity from '../../../../lib/app/shared/Core/entities/DocumentEntity.js'
import HTMLTemplate from '../../../../lib/app/SecvisogramPage/View/shared/HTMLTemplate.js'
import { testDocuments } from '../../../fixtures/vulnerabilityFlagsTests.js'

const testDocument = (
  /** @type {any} */ document,
  /** @type {RegExp[]} */ expectedOutputs
) => {
  const preview = new DocumentEntity().preview({ document })
  const html = HTMLTemplate(preview)

  expectedOutputs.forEach((eo) => {
    // expand regex to make sure no brackets come after the given regex
    // i.e. no vulnerability flags if none were given
    const expandedRegex = new RegExp(eo.source + '(?! \\(.*\\))', eo.flags)
    const matched = html.match(expandedRegex)
    expect(matched !== null).to.be.true
  })
}

describe('preview tab shows vulnerability flags', () => {
  it('shows single vulnerability flag', () => {
    testDocument(testDocuments.baseTestDocument, [
      /Product A 1\.0/,
      /Product A 1\.1 \(component not present\)/,
    ])
  })

  it('shows two different vulnerability flags', () => {
    testDocument(testDocuments.twoFlagsDocument, [
      /Product A 1\.0 \(inline mitigations already exist\)/,
      /Product A 1\.1 \(component not present\)/,
    ])
  })

  it('shows vulnerability flags referenced by group id', () => {
    testDocument(testDocuments.productGroupsDocument, [
      /Product A 1\.0 \(component not present\)/,
      /Product A 1\.1 \(component not present\)/,
    ])
  })

  it('shows two vulnerability flags for one product', () => {
    testDocument(testDocuments.multipleFlagsPerProductDocument, [
      /Product A 1\.0 \(component not present, vulnerable code not present\)/,
      /Product A 1\.1 \(component not present\)/,
    ])
  })
})