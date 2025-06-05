import { expect } from 'chai'
import HTMLTemplate2_1 from '../../../../lib/app/SecvisogramPage/View/shared/HTMLTemplate2_1.js'
import DocumentEntityCsaf21 from '../../../../lib/core/v2_1/entities/DocumentEntity.js'
import {
  createCvss31,
  createCvss40,
  createVulnerabilities,
  testDocuments,
} from '../../../fixtures/vulnerabilityFlagsTests.js'
import minimalDoc from '#cypress/fixtures/documentTests/shared/minimalDoc.js'

const testDocument = (
  /** @type {any} */ document,
  /** @type {RegExp[]} */ expectedOutputs
) => {
  const preview = new DocumentEntityCsaf21().preview({ document })
  const html = HTMLTemplate2_1(preview)

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

  it('calculate vulnerability base score for preview cvss 4.0', () => {
    const contentCvss4 = createCvss40(
      5.4,
      'MEDIUM',
      'CVSS:4.0/AV:L/AC:L/AT:P/PR:H/UI:A/VC:H/VI:H/VA:H/SC:L/SI:L/SA:L'
    )

    const scoreTestDocument = {
      document: {
        ...minimalDoc.document,
      },
      ...createVulnerabilities(contentCvss4, ['CSAFPID-9080700']),
    }
    testDocument(scoreTestDocument, [/CVSSv4\.0 Base Score: 5.4/])
  })

  it('calculate vulnerability base score for preview cvss 3.1', () => {
    const contentCvss3 = createCvss31(
      3.3,
      'MEDIUM',
      'CVSS:4.0/AV:L/AC:L/AT:P/PR:H/UI:A/VC:H/VI:H/VA:H/SC:L/SI:L/SA:L'
    )

    const scoreTestDocument = {
      document: {
        ...minimalDoc.document,
      },
      ...createVulnerabilities(contentCvss3, ['CSAFPID-9080700']),
    }
    testDocument(scoreTestDocument, [/CVSSv3\.1 Base Score: 3.3/])
  })

  it('calculate vulnerability base score for preview cvss 3.1 and 4.0', () => {
    const content = {
      ...createCvss31(
        6.7,
        'MEDIUM',
        'CVSS:4.0/AV:L/AC:L/AT:P/PR:H/UI:A/VC:H/VI:H/VA:H/SC:L/SI:L/SA:L'
      ),
      ...createCvss40(
        4.5,
        'MEDIUM',
        'CVSS:4.0/AV:L/AC:L/AT:P/PR:H/UI:A/VC:H/VI:H/VA:H/SC:L/SI:L/SA:L'
      ),
    }

    const scoreTestDocument = {
      document: {
        ...minimalDoc.document,
      },
      ...createVulnerabilities(content, ['CSAFPID-9080700']),
    }
    testDocument(scoreTestDocument, [/CVSSv4\.0 Base Score: 4.5/])
  })
})
