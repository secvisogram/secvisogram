import valid1 from '../../seeds/documents/valid-1.json'
import valid2 from '../../seeds/documents/valid-2.json'

const MINIMAL_DOC = {
  document: {
    category: 'Test Report',
    csaf_version: '2.0',
    title: 'Minimal valid',
    publisher: {
      category: 'other',
      name: 'Secvisogram Automated Tester',
      namespace: 'https://github.com/secvisogram/secvisogram',
    },
    tracking: {
      current_release_date: '2021-01-14T00:00:00.000Z',
      id: '1',
      initial_release_date: '2021-01-14T00:00:00.000Z',
      revision_history: [
        {
          number: '1',
          date: '2021-01-14T00:00:00.000Z',
          summary: 'Summary',
        },
      ],
      status: 'draft',
      version: '1',
    },
  },
}

/**
 * @typedef {T extends Promise<infer R> ? R : unknown} Unpromisify
 * @template T
 */

export default {
  document: {},
  documents: [
    { valid: true, content: valid1, strippedVersion: valid1 },
    { valid: true, content: valid2, strippedVersion: valid2 },
    { valid: false, content: {}, strippedVersion: {} },
    {
      valid: false,
      content: {
        document: {
          category: 'Test Report',
          csaf_version: '2.0',
          title: 'Minimal valid',
          publisher: {
            category: 'other',
            name: 'Secvisogram Automated Tester',
            namespace: 'https://github.com/secvisogram/secvisogram',
          },
          tracking: {
            current_release_date: '2021-01-14T00:00:00.000Z',
            id: '1',
            initial_release_date: '2021-01-14T00:00:00.000Z',
            revision_history: [
              {
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'draft',
            version: '1',
          },
        },
      },
      strippedVersion: {},
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        emptyAdditionalStringProp: '',
      },
      strippedVersion: {
        ...MINIMAL_DOC,
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          lang: 'XX',
        },
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          source_lang: 'XX',
        },
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        vulnerabilities: [
          {
            cwe: {
              id: 'CWE-1005',
              name: "Sensitive Cookie Without 'HttpOnly' Flag",
            },
          },
        ],
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        vulnerabilities: [
          {
            cwe: {
              id: 'CWE-1007',
              name: "Sensitive Cookie Without 'HttpOnly' Flag",
            },
          },
        ],
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        document: {
          category: 'Test Report',
          csaf_version: '2.0',
          title: 'Minimal valid',
          publisher: {
            category: 'other',
            name: 'Secvisogram Automated Tester',
            namespace: 'https://github.com/secvisogram/secvisogram',
          },
          tracking: {
            current_release_date: '2021-01-14T00:00:00.000Z',
            id: '1',
            initial_release_date: '2021-01-14T00:00:00.000Z',
            revision_history: [
              {
                number: '1',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'draft',
            version: '1',
          },
          acknowledgments: [],
          vulnerabilities: null,
          someOtherProp: {},
        },
      },
      strippedVersion: {
        document: {
          category: 'Test Report',
          csaf_version: '2.0',
          title: 'Minimal valid',
          publisher: {
            category: 'other',
            name: 'Secvisogram Automated Tester',
            namespace: 'https://github.com/secvisogram/secvisogram',
          },
          tracking: {
            current_release_date: '2021-01-14T00:00:00.000Z',
            id: '1',
            initial_release_date: '2021-01-14T00:00:00.000Z',
            revision_history: [
              {
                number: '1',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'draft',
            version: '1',
          },
        },
      },
    },
    {
      valid: false,
      content: {
        aggregate_severity: {
          namespace:
            'https://access.redhat.com/security/updates/classification/',
          text: 'Moderate',
        },
      },
      strippedVersion: {},
    },
  ],
}
