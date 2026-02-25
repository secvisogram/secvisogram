import { isCanonicalUrl } from '../lib/shared/urlHelper.js'
import { expect } from 'chai'

describe('test url helper', function () {
  it('test isCanonicalUrl', function () {
    expect(
      isCanonicalUrl(
        {
          url: 'https://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-12.json',
          category: 'self',
        },
        'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-12'
      ),
      'Valid canonical URL'
    ).to.be.true

    expect(
      isCanonicalUrl(
        {
          url: 'https://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-12.json',
          category: 'not_self',
        },
        'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-12'
      ),
      'Invalid canonical URL - category not self'
    ).to.be.false
  })

  expect(
    isCanonicalUrl(
      {
        url: 'http://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-12.json',
        category: 'self',
      },
      'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-12'
    ),
    'Invalid canonical URL - url starts not with https://'
  ).to.be.false

  expect(
    isCanonicalUrl(
      {
        category: 'self',
      },
      'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-12'
    ),
    'Invalid canonical URL - no URL '
  ).to.be.false

  expect(
    isCanonicalUrl(
      {
        url: 'https://example.com/.well-known/csaf/clear/2024/oasis_csaf_tc-csaf_2_1-2024-6-2-47-12_invalid.json',
        category: 'self',
      },
      'OASIS_CSAF_TC-CSAF_2.1-2024-6-2-47-12'
    ),
    'Valid canonical URL - URL ends not with valid filename'
  ).to.be.false
})
