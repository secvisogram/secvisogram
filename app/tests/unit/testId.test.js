import { describe, expect, it } from 'vitest'
import { testIdFromName, testIdUrl } from '../../lib/shared/testId.js'

describe('testIdFromName', () => {
  it('extracts the test id from a test function name', () => {
    expect(testIdFromName('mandatoryTest_6_1_2')).to.equal('6.1.2')
    expect(testIdFromName('mandatoryTest_6_1_27_11')).to.equal('6.1.27.11')
    expect(testIdFromName('recommendedTest_6_2_39_13')).to.equal('6.2.39.13')
    expect(testIdFromName('informativeTest_6_3_1')).to.equal('6.3.1')
    expect(testIdFromName('optionalTest_6_2_20')).to.equal('6.2.20')
  })

  it('returns undefined for names without a test id', () => {
    expect(testIdFromName('csaf_2_1_strict')).to.equal(undefined)
    expect(testIdFromName('csaf_2_0_strict')).to.equal(undefined)
    expect(testIdFromName('')).to.equal(undefined)
    expect(testIdFromName(undefined)).to.equal(undefined)
  })
})

describe('testIdUrl', () => {
  it('links to the anchor of the chapter (v2.1)', () => {
    expect(testIdUrl('6.1.2', 'v2.1')).to.equal(
      'https://docs.oasis-open.org/csaf/csaf/v2.1/csd04/csaf-v2.1-csd04.html#multiple-definition-of-product-id',
    )
    expect(testIdUrl('6.1.27.11', 'v2.1')).to.match(
      /#vulnerabilities-for-security-advisory-or-vex$/,
    )
  })

  it('links to the CSAF 2.0 specification for v2.0', () => {
    expect(testIdUrl('6.1.2', 'v2.0')).to.equal(
      'https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html#612-multiple-definition-of-product-id',
    )
  })

  it('links to the top of the document for unknown test ids', () => {
    expect(testIdUrl('6.9.99', 'v2.0')).to.equal(
      'https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html',
    )
  })

  it('has an anchor for every test of the validator library', async () => {
    const { default: anchors } =
      await import('../../lib/shared/testIdAnchors.js')
    const ids = (/** @type {object[]} */ ...mods) =>
      mods
        .flatMap((m) => Object.keys(m))
        .map((k) => testIdFromName(k))
        .filter((id) => id !== undefined)
    const v20 = ids(
      await import('@secvisogram/csaf-validator-lib/basic.js'),
      await import('@secvisogram/csaf-validator-lib/optionalTests.js'),
    )
    const v21 = ids(
      await import('@secvisogram/csaf-validator-lib/csaf_2_1/basic.js'),
      await import('../../lib/core/v2_1/recommendedTests.js'),
    )
    expect(v20.filter((id) => !anchors['v2.0'][id])).to.deep.equal([])
    expect(v21.filter((id) => !anchors['v2.1'][id])).to.deep.equal([])
  }, 30000)
})
