import minimalDoc from './shared/minimalCSAFBaseDoc.js'

import { expect } from 'chai'
import { mandatoryTest_6_1_30 } from '../mandatoryTests.js'

describe('Mandatory test 6.1.30', function () {
  it('should allow valid doc', function () {
    const result = mandatoryTest_6_1_30(minimalDoc)
    expect(result.errors).to.have.lengthOf(0)
  })

  it('should fail on mixed integer and semantic versioning', function () {
    const result = mandatoryTest_6_1_30({
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        tracking: {
          ...minimalDoc.document.tracking,
          revision_history: [
            {
              date: '2021-07-21T09:00:00.000Z',
              number: '2.0.0',
              summary: 'Initial version.',
            },
          ],
          version: '2',
        },
      },
    })

    expect(result.errors).to.have.lengthOf(1)
  })

  it('allows an empty revision_history', function () {
    const result = mandatoryTest_6_1_30({
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        tracking: {
          ...minimalDoc.document.tracking,
          revision_history: [],
          version: '1',
        },
      },
    })

    expect(result.errors).to.have.lengthOf(0)
  })
})
