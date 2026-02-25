import minimalDoc from './documentTests/shared/minimalDoc.js'

export default [
  // Valid tests
  {
    title: '# href (valid)',
    valid: true,
    url: '#example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['#example.com'] }],
      },
    },
  },
  {
    title: 'http href (valid)',
    valid: true,
    url: 'http://example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['http://example.com'] }],
      },
    },
  },
  {
    title: 'https href (valid)',
    valid: true,
    url: 'https://example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['https://example.com'] }],
      },
    },
  },
  {
    title: 'mailto href (valid)',
    valid: true,
    url: 'mailto:user@example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['mailto:user@example.com'] }],
      },
    },
  },
  {
    title: 'mailto href with slashes (valid)',
    valid: true,
    url: 'mailto://user@example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['mailto://user@example.com'] }],
      },
    },
  },
  {
    title: 'tel href (valid)',
    valid: true,
    url: 'tel:\\+493023125000',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['tel:+493023125000'] }],
      },
    },
  },
  {
    title: 'tel href with slashes (valid)',
    valid: true,
    url: 'tel://\\+493023125000',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['tel://+493023125000'] }],
      },
    },
  },
  {
    title: 'ftp href (valid)',
    valid: true,
    url: 'ftp://example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['ftp://example.com'] }],
      },
    },
  },
  {
    title: 'data href (MIME-type png) (valid)',
    valid: true,
    url: 'data:image/png;base64,dGVzdA==',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [
          {
            urls: ['data:image/png;base64,dGVzdA=='],
          },
        ],
      },
    },
  },
  {
    title: 'data href (MIME-type jpeg) (valid)',
    valid: true,
    url: 'data:image/jpeg;base64,dGVzdA==',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [
          {
            urls: ['data:image/jpeg;base64,dGVzdA=='],
          },
        ],
      },
    },
  },
  {
    title: 'data href (MIME-type gif) (valid)',
    valid: true,
    url: 'data:image/gif;base64,dGVzdA==',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['data:image/gif;base64,dGVzdA=='] }],
      },
    },
  },

  // invalid tests
  {
    title: 'sftp href (invalid)',
    valid: false,
    url: 'sftp://example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['sftp://example.com'] }],
      },
    },
  },
  {
    title: 'ws href (invalid)',
    valid: false,
    url: 'ws://example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['ws://example.com'] }],
      },
    },
  },
  {
    title: 'wss href (invalid)',
    valid: false,
    url: 'wss://example.com',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['wss://example.com'] }],
      },
    },
  },
  {
    title: 'data href (MIME-type svg) (invalid)',
    valid: false,
    url: 'data:image/svg\\+xml;base64,dGVzdA==',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['data:image/svg+xml;base64,dGVzdA=='] }],
      },
    },
  },
  {
    title: 'data href (MIME-type png) with invalid base64 (invalid)',
    valid: false,
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA',
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [
          {
            urls: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA'],
          },
        ],
      },
    },
  },
]
