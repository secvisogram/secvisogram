export default {
  $schema: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json',
  document: {
    category: 'Test Report',
    csaf_version: '2.1',
    title: 'Minimal valid',
    lang: 'en',
    distribution: {
      tlp: {
        label: 'AMBER',
      },
    },
    publisher: {
      category: 'other',
      name: 'Secvisogram Automated Tester',
      namespace: 'https://github.com/secvisogram/secvisogram',
    },
    references: [
      {
        category: 'self',
        summary: 'A non-canonical URL.',
        url: 'https://example.com/security/data/csaf/2021/my-thing-_10.json',
      },
    ],
    tracking: {
      current_release_date: '2021-01-14T00:00:00.000Z',
      id: 'My-Thing-.10',
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
