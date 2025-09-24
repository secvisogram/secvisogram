import assert from 'node:assert/strict'
import { csaf_2_1, csaf_2_1_strict } from '../../csaf_2_1/schemaTests.js'

const minimalValidDocument = {
  $schema: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json',
  document: {
    title: 'Basic CSAF document',
    csaf_version: '2.1',
    category: 'csaf_base',
    distribution: {
      tlp: { label: 'AMBER' },
    },
    publisher: {
      name: 'Some publisher',
      namespace: 'https://example.com',
      category: 'coordinator',
    },
    tracking: {
      id: 'some-id',
      initial_release_date: '2025-02-18T14:37:32.671Z',
      current_release_date: '2025-06-18T14:37:32.671Z',
      revision_history: [
        {
          date: '2025-02-18T14:37:32.671Z',
          number: '1',
          summary: 'Initial release',
        },
      ],
      version: '1',
      status: 'draft',
    },
  },
}

describe('csaf_2_1_strict', function () {
  it('validates a basic document', function () {
    assert.ok(csaf_2_1_strict(minimalValidDocument).isValid)
  })
})

describe('csaf_2_1', function () {
  it('validates a basic document', function () {
    assert.ok(csaf_2_1(minimalValidDocument).isValid)
  })
})
