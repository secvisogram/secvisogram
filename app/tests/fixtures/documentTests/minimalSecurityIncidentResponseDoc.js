import minimalDoc from './shared/minimalDoc.js'

export default {
  ...minimalDoc,
  document: {
    category: 'csaf_security_incident_response',
    csaf_version: '2.0',
    distribution: {
      tlp: {
        label: 'AMBER',
      },
    },
    lang: 'de',
    notes: [
      {
        category: 'description',
        text: 'Some mandatory description',
        title: 'Some description',
      },
    ],
    publisher: {
      category: 'other',
      name: 'Secvisogram Automated Tester',
      namespace: 'https://github.com/secvisogram/secvisogram',
    },
    references: [
      {
        category: 'self',
        summary: 'The canonical URL.',
        url: 'https://example.com/security/data/csaf/2024/oasis_csaf_tc-1.json',
      },
      {
        category: 'external',
        summary: 'A valid reference.',
        url: 'https://example.net',
      },
    ],
    title: 'Minimal security incident valid',
    tracking: {
      current_release_date: '2021-01-14T00:00:00.000Z',
      id: 'oasis_csaf_tc-1',
      initial_release_date: '2021-01-14T00:00:00.000Z',
      revision_history: [
        {
          date: '2021-01-14T00:00:00.000Z',
          number: '1',
          summary: 'Summary',
        },
      ],
      status: 'draft',
      version: '1',
    },
  },
}
