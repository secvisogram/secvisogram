import minimalCSAFBaseDoc from './documentTests/minimalCSAFBaseDoc.js'
import minimalInformationalAdvisoryDoc from './documentTests/minimalInformationalAdvisoryDoc.js'
import minimalSecurityAdvisoryDoc from './documentTests/minimalSecurityAdvisoryDoc.js'
import minimalSecurityIncidentResponseDoc from './documentTests/minimalSecurityIncidentResponseDoc.js'
import minimalVexDoc from './documentTests/minimalVexDoc.js'

export default [
  // Fails "6.1.3 Circular Definition of Product ID"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
        relationships: [
          {
            category: 'installed_on',
            full_product_name: {
              name: 'Product B',
              product_id: 'CSAFPID-9080701',
            },
            product_reference: 'CSAFPID-9080700',
            relates_to_product_reference: 'CSAFPID-9080701',
          },
        ],
      },
    },
  },

  // Fails "6.1.3 Circular Definition of Product ID"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-0001',
            name: 'asd',
          },
        ],
        relationships: [
          {
            full_product_name: {
              name: 'asdf',
              product_id: 'CSAFPID-0002',
            },
            product_reference: 'CSAFPID-0001',
            category: 'installed_on',
            relates_to_product_reference: 'CSAFPID-0003',
          },
          {
            full_product_name: {
              name: 'asdfg',
              product_id: 'CSAFPID-0003',
            },
            product_reference: 'CSAFPID-0001',
            category: 'installed_on',
            relates_to_product_reference: 'CSAFPID-0002',
          },
        ],
      },
    },
  },

  // Fails "6.1.6 Contradicting Product Status"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          product_status: {
            known_affected: ['CSAFPID-9080700'],
            known_not_affected: ['CSAFPID-9080700'],
          },
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 10.0,
                baseSeverity: 'MEDIUM',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'LOW',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
                temporalScore: 10,
                temporalSeverity: 'MEDIUM',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
                temporalScore: 6.5,
                temporalSeverity: 'LOW',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
                temporalScore: 6.5,
                temporalSeverity: 'MEDIUM',
                environmentalScore: 10,
                environmentalSeverity: 'MEDIUM',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
                temporalScore: 6.5,
                temporalSeverity: 'MEDIUM',
                environmentalScore: 6.5,
                environmentalSeverity: 'LOW',
              },
            },
          ],
        },
      ],
    },
  },

  // Skips "6.1.9 Invalid CVSS computation" - invalid v3 vector-string
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:_/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
                temporalScore: 6.5,
                temporalSeverity: 'MEDIUM',
                environmentalScore: 6.5,
                environmentalSeverity: 'LOW',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                baseScore: 5,
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                baseScore: 10,
                temporalScore: 5,
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.9 Invalid CVSS computation"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                baseScore: 10,
                temporalScore: 10,
                environmentalScore: 5,
              },
            },
          ],
        },
      ],
    },
  },

  // Skips "6.1.9 Invalid CVSS computation" - invalid v2 vector-string
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:_/AC:L/Au:N/C:C/I:C/A:C',
                baseScore: 10,
                temporalScore: 10,
                environmentalScore: 5,
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.10 Inconsistent CVSS"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                baseScore: 9.8,
                baseSeverity: 'CRITICAL',
                attackVector: 'LOCAL',
                attackComplexity: 'LOW',
                privilegesRequired: 'NONE',
                userInteraction: 'NONE',
                scope: 'CHANGED',
                confidentialityImpact: 'HIGH',
                integrityImpact: 'HIGH',
                availabilityImpact: 'LOW',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.10 Inconsistent CVSS"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                accessVector: 'LOCAL',
                baseScore: 10,
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.12 Language"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        lang: 'EZ',
      },
    },
  },

  // Fails "6.1.12 Language"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        source_lang: 'EZ',
      },
    },
  },

  // Fails "6.1.13 PURL"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            name: 'Product A',
            product_id: 'CSAFPID-9080700',
            product_identification_helper: {
              purl: 'pkg:maven/@1.3.4',
            },
          },
        ],
      },
    },
  },

  // Fails "6.1.13 PURL"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        relationships: [
          {
            full_product_name: {
              name: 'A',
              product_id: 'CSAFPID-0001',
              product_identification_helper: {
                purl: 'pkg:maven/@1.3.4',
              },
            },
            product_reference: 'CSAFPID-0001',
            category: 'default_component_of',
            relates_to_product_reference: 'CSAFPID-0001',
          },
        ],
      },
    },
  },

  // Fails "6.1.13 PURL"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        branches: [
          {
            category: 'architecture',
            name: 'My branch',
            product: {
              product_id: 'CSAFPID-0001',
              name: 'My branch',
              product_identification_helper: {
                purl: 'pkg:maven/@1.3.4',
              },
            },
          },
        ],
      },
    },
  },

  // Fails "6.1.13 PURL"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        branches: [
          {
            category: 'architecture',
            name: 'My branch',
            branches: [
              {
                category: 'architecture',
                name: 'My branch',
                product: {
                  product_id: 'CSAFPID-0001',
                  name: 'My branch',
                  product_identification_helper: {
                    purl: 'pkg:maven/@1.3.4',
                  },
                },
              },
            ],
          },
        ],
      },
    },
  },

  // Fails "6.1.14 Sorted Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-07-22T10:00:00.000Z',
              number: '2',
              summary: 'Second version.',
            },
            {
              date: '2021-07-23T10:00:00.000Z',
              number: '1',
              summary: 'Initial version.',
            },
          ],
          version: '1',
        },
      },
    },
  },

  // Fails "6.1.16 Released Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              number: '2',
              date: '2021-01-14T00:00:00.000Z',
              summary: 'Summary',
            },
          ],
          version: '1',
        },
      },
    },
  },

  {
    title: 'Passes "6.1.16 Released Revision History"',
    valid: true,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-01-14T00:00:00.000Z',
              number: '1',
              summary: 'Summary',
            },
          ],
          version: '1',
        },
      },
    },
  },

  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-01-14T00:00:00.000Z',
              number: '0.1.0',
              summary: 'Summary',
            },
          ],
          status: 'final',
          version: '0.1.0',
        },
      },
    },
  },

  {
    valid: true,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-01-14T00:00:00.000Z',
              number: '1.0.0',
              summary: 'Initial version',
            },
          ],
          status: 'draft',
          version: '1.0.0-alpha+123',
        },
      },
    },
  },

  // Fails "6.1.7 Multiple Scores with same Version per Product"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
                baseScore: 10,
                baseSeverity: 'CRITICAL',
              },
            },
            {
              products: ['CSAFPID-9080700'],
              cvss_v3: {
                version: '3.1',
                vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
              },
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.7 Multiple Scores with same Version per Product"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                baseScore: 10,
              },
            },
            {
              products: ['CSAFPID-9080700'],
              cvss_v2: {
                version: '2.0',
                vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                baseScore: 6.5,
              },
            },
          ],
        },
      ],
    },
  },

  // Passes "6.1.7 Multiple Scores with same Version per Product" #30
  {
    valid: true,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            name: 'Product A',
            product_id: 'CSAFPID-9080700',
            product_identification_helper: {
              serial_numbers: ['98765?43210-BCD*'],
            },
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              cvss_v2: {
                baseScore: 10,
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                version: '2.0',
              },
              products: ['CSAFPID-9080700'],
            },
          ],
        },
        {
          scores: [
            {
              cvss_v2: {
                baseScore: 10,
                vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                version: '2.0',
              },
              products: ['CSAFPID-9080700'],
            },
          ],
        },
      ],
    },
  },

  // Passes "6.1.7 Multiple Scores with same Version per Product"
  {
    valid: true,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            name: 'Product A',
            product_id: 'CSAFPID-9080700',
            product_identification_helper: {
              serial_numbers: ['98765?43210-BCD*'],
            },
          },
        ],
      },
      vulnerabilities: [
        {
          scores: [
            {
              cvss_v3: {
                baseScore: 10,
                baseSeverity: 'CRITICAL',
                vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
                version: '3.1',
              },
              products: ['CSAFPID-9080700'],
            },
            {
              cvss_v3: {
                baseScore: 6.5,
                baseSeverity: 'MEDIUM',
                vectorString: 'CVSS:3.0/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                version: '3.0',
              },
              products: ['CSAFPID-9080700'],
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.15 Translator"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        publisher: {
          category: 'translator',
          name: 'CSAF TC Translator',
          namespace: 'https://csaf.io/translator',
        },
      },
    },
  },

  // Fails "6.1.18 Released Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-05-17T10:00:00.000Z',
              number: '0',
              summary: 'First draft',
            },
            {
              date: '2021-07-21T10:00:00.000Z',
              number: '1',
              summary: 'Initial version.',
            },
          ],
          status: 'final',
          version: '1',
        },
      },
    },
  },

  // Fails "6.1.18 Released Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-05-17T10:00:00.000Z',
              number: '0.1.0',
              summary: 'First draft',
            },
            {
              date: '2021-07-21T10:00:00.000Z',
              number: '1.0.0',
              summary: 'Initial version.',
            },
          ],
          status: 'final',
          version: '1.0.0',
        },
      },
    },
  },

  // Fails "6.1.18 Released Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-05-17T10:00:00.000Z',
              number: '0',
              summary: 'First draft',
            },
            {
              date: '2021-07-21T10:00:00.000Z',
              number: '1',
              summary: 'Initial version.',
            },
          ],
          status: 'interim',
          version: '1',
        },
      },
    },
  },

  // Fails "6.1.19 Revision History Entries for Pre-release Versions"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-04-23T10:00:00.000Z',
              number: '1.0.0-rc',
              summary: 'Release Candidate for initial version.',
            },
            {
              date: '2021-04-23T11:00:00.000Z',
              number: '1.0.0',
              summary: 'Initial version.',
            },
          ],
          version: '1.0.0',
          status: 'draft',
        },
      },
    },
  },

  // Fails "6.1.20 Non-draft Document Version"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-04-23T10:00:00.000Z',
              number: '1.0.0-rc',
              summary: 'Release Candidate for initial version.',
            },
          ],
          version: '1.0.0-rc',
          status: 'final',
        },
      },
    },
  },

  // Fails "6.1.20 Non-draft Document Version"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-04-23T10:00:00.000Z',
              number: '1.0.0-rc',
              summary: 'Release Candidate for initial version.',
            },
          ],
          version: '1.0.0-rc',
          status: 'interim',
        },
      },
    },
  },

  // Fails "6.1.21 Missing Item in Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-04-22T10:00:00.000Z',
              number: '1',
              summary: 'Initial version.',
            },
            {
              date: '2021-07-21T10:00:00.000Z',
              number: '3',
              summary: 'Some other changes.',
            },
          ],
          status: 'final',
          version: '3',
        },
      },
    },
  },

  // Fails "6.1.22 Multiple Definition in Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-07-20T10:00:00.000Z',
              number: '1',
              summary: 'Initial version.',
            },
            {
              date: '2021-07-21T10:00:00.000Z',
              number: '1',
              summary: 'Some other changes.',
            },
          ],
          version: '1',
        },
      },
    },
  },

  // Fails "6.1.22 Multiple Definition in Revision History"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        tracking: {
          ...minimalCSAFBaseDoc.document.tracking,
          revision_history: [
            {
              date: '2021-07-20T10:00:00.000Z',
              number: '1.0.0',
              summary: 'Initial version.',
            },
            {
              date: '2021-07-21T10:00:00.000Z',
              number: '1.0.0',
              summary: 'Some other changes.',
            },
          ],
          version: '1.0.0',
        },
      },
    },
  },

  // Fails "6.1.23 Multiple Use of Same CVE"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      vulnerabilities: [
        {
          cve: 'CVE-2017-0145',
        },
        {
          cve: 'CVE-2017-0145',
        },
      ],
    },
  },

  // Fails "6.1.24 Definition in Involvements"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      vulnerabilities: [
        {
          involvements: [
            {
              date: '2021-04-23T10:00:00.000Z',
              party: 'vendor',
              status: 'in_progress',
            },
            {
              date: '2021-04-23T10:00:00.000Z',
              party: 'vendor',
              status: 'in_progress',
              summary:
                'The vendor has released a mitigation and is working to fully resolve the issue.',
            },
          ],
        },
      ],
    },
  },

  // Fails "6.1.25 Multiple Use of Same Hash Algorithm"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        full_product_names: [
          {
            name: 'Product A',
            product_id: 'CSAFPID-9080700',
            product_identification_helper: {
              hashes: [
                {
                  file_hashes: [
                    {
                      algorithm: 'sha256',
                      value:
                        '026a37919b182ef7c63791e82c9645e2f897a3f0b73c7a6028c7febf62e93838',
                    },
                    {
                      algorithm: 'sha256',
                      value:
                        '0a853ce2337f0608489ac596a308dc5b7b19d35a52b10bf31261586ac368b175',
                    },
                  ],
                  filename: 'product_a.so',
                },
              ],
            },
          },
        ],
      },
    },
  },

  // Fails "6.1.25 Multiple Use of Same Hash Algorithm"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        relationships: [
          {
            full_product_name: {
              name: 'A',
              product_id: 'CSAFPID-0001',
              product_identification_helper: {
                hashes: [
                  {
                    file_hashes: [
                      {
                        algorithm: 'sha256',
                        value: '12312312312312312312312312312312',
                      },
                      {
                        algorithm: 'sha256',
                        value: '12312312312312312312312312312312',
                      },
                    ],
                    filename: 'my-hash.a',
                  },
                ],
              },
            },
            product_reference: 'CSAFPID-0001',
            category: 'default_component_of',
            relates_to_product_reference: 'CSAFPID-0001',
          },
        ],
      },
    },
  },

  // Fails "6.1.25 Multiple Use of Same Hash Algorithm"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        branches: [
          {
            category: 'architecture',
            name: 'My branch',
            product: {
              product_id: 'CSAFPID-0001',
              name: 'My branch',
              product_identification_helper: {
                hashes: [
                  {
                    file_hashes: [
                      {
                        algorithm: 'sha256',
                        value: '12312312312312312312312312312312',
                      },
                      {
                        algorithm: 'sha256',
                        value: '12312312312312312312312312312312',
                      },
                    ],
                    filename: 'my_hash.a',
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },

  // Fails "6.1.25 Multiple Use of Same Hash Algorithm"
  {
    title: 'Fails 6.1.25 Multiple Use of Same Hash Algorithm',
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      product_tree: {
        branches: [
          {
            category: 'architecture',
            name: 'My branch',
            branches: [
              {
                category: 'architecture',
                name: 'My branch',
                product: {
                  product_id: 'CSAFPID-0001',
                  name: 'My branch',
                  product_identification_helper: {
                    hashes: [
                      {
                        file_hashes: [
                          {
                            algorithm: 'sha256',
                            value: '12312312312312312312312312312312',
                          },
                          {
                            algorithm: 'sha256',
                            value: '12312312312312312312312312312312',
                          },
                        ],
                        filename: 'my_hash.a',
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  },

  // Fails "6.1.26 Prohibited Document Category Name"
  ...[
    'Csaf_a',
    'Security_Incident_Response',
    'Informational Advisory',
    'security-incident-response',
    'Security      Advisory',
    'veX',
    'V_ex',
    'V___eX',
    'Informational - Advisory',
    'security-_ incident-response',
    'Security\tAdvisory',
    'Security\nAdvisory',
    'Security\rAdvisory',
  ].map((category) => ({
    //    title: `Fails "6.1.26 Prohibited Document Category Name" (category "${category}")`,
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        category,
      },
    },
  })),

  // Succeeds "6.1.26 Prohibited Document Category Name"
  ...[
    'CSAF Base',
    'csaf_base',
    //    'csaf_security_incident_response',
    //    'csaf_informational_advisory',
    //    'csaf_security_advisory',
    //    'csaf_vex',
    'Example Company Security Advisory',
    'CSAF Security Notice',
  ].map((category) => ({
    //    title: `Succeeds "6.1.26 Prohibited Document Category Name" (category "${category}")`,
    valid: true,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        category,
      },
    },
  })),

  // Fails "6.1.27.9 Impact Statement"
  {
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        category: 'csaf_vex',
      },
      product_tree: {
        full_product_names: [
          {
            name: 'Product A',
            product_id: 'CSAFPID-9080700',
            product_identification_helper: {
              serial_numbers: ['98765?43210-BCD*'],
            },
          },
          {
            name: 'Product B',
            product_id: 'CSAFPID-9080701',
            product_identification_helper: {
              serial_numbers: ['98765?43210-BCE*'],
            },
          },
          {
            name: 'Product C',
            product_id: 'CSAFPID-9080702',
            product_identification_helper: {
              serial_numbers: ['98765?43210-BCF*'],
            },
          },
        ],
        product_groups: [
          {
            group_id: 'CSAFGID-0001',
            product_ids: ['CSAFPID-9080700', 'CSAFPID-9080701'],
          },
        ],
      },
      vulnerabilities: [
        {
          product_status: {
            known_not_affected: [
              'CSAFPID-9080700',
              'CSAFPID-9080701',
              'CSAFPID-9080702',
            ],
          },
          threats: [
            {
              category: 'impact',
              details: 'The vulnerable code is not present in these products.',
              group_ids: ['CSAFGID-0001'],
            },
          ],
        },
      ],
    },
  },

  {
    title: 'Fails "6.1.27.9 Impact Statement"',
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        category: 'csaf_vex',
      },
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
          {
            product_id: 'CSAFPID-9080701',
            name: 'Product B',
          },
          {
            product_id: 'CSAFPID-9080702',
            name: 'Product C',
          },
        ],
        product_groups: [
          {
            group_id: 'CSAFGID-0001',
            product_ids: ['CSAFPID-9080700', 'CSAFPID-9080701'],
          },
        ],
      },
      vulnerabilities: [
        {
          product_status: {
            known_not_affected: [
              'CSAFPID-9080700',
              'CSAFPID-9080701',
              'CSAFPID-9080702',
            ],
          },
          threats: [
            {
              category: 'impact',
              details: 'The vulnerable code is not present in these products.',
              product_ids: ['CSAFPID-9080700', 'CSAFPID-9080702'],
            },
          ],
        },
      ],
    },
  },

  {
    title: 'Fails "6.1.27.10 Action Statement"',
    valid: false,
    content: {
      ...minimalCSAFBaseDoc,
      document: {
        ...minimalCSAFBaseDoc.document,
        category: 'csaf_vex',
      },
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-9080700',
            name: 'Product A',
          },
          {
            product_id: 'CSAFPID-9080701',
            name: 'Product B',
          },
          {
            product_id: 'CSAFPID-9080702',
            name: 'Product C',
          },
        ],
        product_groups: [
          {
            group_id: 'CSAFGID-0001',
            product_ids: ['CSAFPID-9080700', 'CSAFPID-9080701'],
            summary: 'EOL products',
          },
        ],
      },
      vulnerabilities: [
        {
          product_status: {
            known_affected: [
              'CSAFPID-9080700',
              'CSAFPID-9080701',
              'CSAFPID-9080702',
            ],
          },
          remediations: [
            {
              category: 'no_fix_planned',
              details:
                'These products are end-of-life. Therefore, no fix will be provided.',
              group_ids: ['CSAFGID-0001'],
            },
          ],
        },
      ],
    },
  },

  {
    title: 'Minimal security_incident_response document is valid',
    valid: true,
    content: minimalSecurityIncidentResponseDoc,
  },

  {
    title: 'Minimal informational_advisory document is valid',
    valid: true,
    content: minimalInformationalAdvisoryDoc,
  },

  {
    title: 'Minimal security_advisory document is valid',
    valid: true,
    content: minimalSecurityAdvisoryDoc,
  },

  {
    title: 'Minimal vex document is valid',
    valid: true,
    content: minimalVexDoc,
  },

  ...[minimalSecurityIncidentResponseDoc, minimalInformationalAdvisoryDoc].map(
    (doc) => ({
      title: `Fails "6.1.27.1 Document Notes" (category "${doc.document.category}")`,
      valid: false,
      content: {
        ...doc,
        document: {
          ...doc.document,
          notes: [
            {
              category: 'legal_disclaimer',
              text: 'The CSAF document is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.',
              title: 'Terms of Use',
            },
          ],
        },
      },
    }),
  ),

  ...[minimalSecurityIncidentResponseDoc, minimalInformationalAdvisoryDoc].map(
    (doc) => ({
      title: `Fails "6.1.27.2 Document References" (category "${doc.document.category}")`,
      valid: false,
      content: {
        ...doc,
        document: {
          ...doc.document,
          references: [
            {
              category: 'self',
              summary: 'The canonical URL.',
              url: 'https://example.com/security/data/csaf/2021/OASIS_CSAF_TC-CSAF_2_0-2021-6-1-27-02-01.json',
            },
          ],
        },
      },
    }),
  ),

  {
    title: `Fails "6.1.27.3 Vulnerabilities"`,
    valid: false,
    content: {
      ...minimalInformationalAdvisoryDoc,
      document: {
        ...minimalInformationalAdvisoryDoc.document,
      },
      vulnerabilities: [
        {
          title: 'A vulnerability item that SHALL NOT exist',
        },
      ],
    },
  },

  ...[minimalSecurityAdvisoryDoc, minimalVexDoc].map((doc) => ({
    title: `Fails "6.1.27.4 Product Tree" (category "${doc.document.category}")`,
    valid: false,
    expectedNumberOfErrors: 2,
    content: {
      ...doc,
      product_tree: undefined,
    },
  })),

  ...[minimalSecurityAdvisoryDoc, minimalVexDoc].map((doc) => ({
    title: `Fails "6.1.27.5 Vulnerability Notes" (category "${doc.document.category}")`,
    valid: false,
    expectedNumberOfErrors: 1,
    content: {
      ...doc,
      vulnerabilities: [
        {
          ...(doc === minimalVexDoc
            ? {
                ids: [
                  {
                    system_name: 'GitHub Issue',
                    text: 'oasis-tcs/csaf#210',
                  },
                ],
              }
            : {}),
          product_status: {
            fixed: ['CSAFPID-0001'],
          },
          title: 'A vulnerability item without a note',
        },
      ],
    },
  })),

  {
    title: `Fails "6.1.27.6 Product Status"`,
    valid: false,
    content: {
      ...minimalSecurityAdvisoryDoc,
      vulnerabilities: [
        {
          notes: [
            {
              category: 'description',
              text: 'My note',
            },
          ],
          title: 'A vulnerability item without a product status',
        },
      ],
    },
  },

  {
    title: `Fails "6.1.27.7 VEX Product Status" (product_status attribute is missing)`,
    valid: false,
    expectedNumberOfErrors: 2, // needs a product_status attribute, is not referenced
    content: {
      ...minimalVexDoc,
      vulnerabilities: [
        {
          ids: [
            {
              system_name: 'GitHub Issue',
              text: 'oasis-tcs/csaf#210',
            },
          ],
          notes: [
            {
              category: 'description',
              text: 'My note',
            },
          ],
          title: 'A vulnerability item with invalid product_status',
        },
      ],
    },
  },

  {
    title: `Fails "6.1.27.7 VEX Product Status"`,
    valid: false,
    expectedNumberOfErrors: 1,
    content: {
      ...minimalVexDoc,
      vulnerabilities: [
        {
          ids: [
            {
              system_name: 'GitHub Issue',
              text: 'oasis-tcs/csaf#210',
            },
          ],
          notes: [
            {
              category: 'description',
              text: 'My note',
            },
          ],
          product_status: {
            first_fixed: ['CSAFPID-0001'],
            recommended: ['CSAFPID-0001'],
          },
          title: 'A vulnerability item with invalid product_status',
        },
      ],
    },
  },

  {
    title: `Fails "6.1.27.8 Vulnerability ID"`,
    valid: false,
    expectedNumberOfErrors: 1,
    content: {
      ...minimalVexDoc,
      vulnerabilities: [
        {
          notes: [
            {
              category: 'description',
              text: 'My note',
            },
          ],
          product_status: {
            fixed: ['CSAFPID-0001'],
          },
          title: 'A vulnerability item with missing cve and id',
        },
      ],
    },
  },
]
