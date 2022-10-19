/** @typedef {import('./shared/types').Property} Property */

export default {
  key: '',
  fullName: [],
  title: 'Common Security Advisory Framework',
  type: 'OBJECT',
  description:
    'Representation of security advisory information as a JSON document.',
  mandatory: true,
  addMenuItemsForChildObjects: true,
  metaInfo: {
    propertyList: [
      {
        key: 'document',
        fullName: ['document'],
        title: 'Document level meta-data',
        type: 'OBJECT',
        description:
          'Captures the meta-data about this document describing a particular set of security advisories.',
        mandatory: true,
        metaInfo: {
          propertyList: [
            {
              key: 'acknowledgments',
              fullName: ['document', 'acknowledgments'],
              title: 'List of acknowledgments',
              type: 'ARRAY',
              description: 'Contains a list of acknowledgment elements.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['document', 'acknowledgments'],
                  title: 'Acknowledgment',
                  type: 'OBJECT',
                  description:
                    'Acknowledges contributions by describing those that contributed.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'names',
                        fullName: ['document', 'acknowledgments', 'names'],
                        title: 'List of acknowledged names',
                        type: 'ARRAY',
                        description:
                          'Contains the names of contributors being recognized.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          arrayType: {
                            key: '',
                            fullName: ['document', 'acknowledgments', 'names'],
                            type: 'STRING',
                            title: 'Name of the contributor',
                            description:
                              'Contains the name of a single contributor being recognized.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: [
                                'Albert Einstein',
                                'Johann Sebastian Bach',
                              ],
                            },
                          },
                        },
                      },
                      {
                        key: 'organization',
                        fullName: [
                          'document',
                          'acknowledgments',
                          'organization',
                        ],
                        type: 'STRING',
                        title: 'Contributing organization',
                        description:
                          'Contains the name of a contributing organization being recognized.',
                        mandatory: false,
                        metaInfo: {
                          minLength: 1,
                          examples: ['CISA', 'Google Project Zero', 'Talos'],
                        },
                      },
                      {
                        key: 'summary',
                        fullName: ['document', 'acknowledgments', 'summary'],
                        type: 'STRING',
                        title: 'Summary of the acknowledgment',
                        description:
                          'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
                        mandatory: false,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'First analysis of Coordinated Multi-Stream Attack (CMSA)',
                          ],
                        },
                      },
                      {
                        key: 'urls',
                        fullName: ['document', 'acknowledgments', 'urls'],
                        title: 'List of URLs',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of URLs or location of the reference to be acknowledged.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          arrayType: {
                            key: '',
                            fullName: ['document', 'acknowledgments', 'urls'],
                            type: 'URI',
                            title: 'URL of acknowledgment',
                            description:
                              'Contains the URL or location of the reference to be acknowledged.',
                            mandatory: false,
                            metaInfo: {},
                          },
                        },
                      },
                    ],
                    minProperties: 1,
                  },
                },
              },
              refTitle: 'Document acknowledgments',
              refDescription:
                'Contains a list of acknowledgment elements associated with the whole document.',
            },
            {
              key: 'aggregate_severity',
              fullName: ['document', 'aggregate_severity'],
              title: 'Aggregate severity',
              type: 'OBJECT',
              description:
                "Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole — not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures.",
              mandatory: false,
              metaInfo: {
                propertyList: [
                  {
                    key: 'namespace',
                    fullName: ['document', 'aggregate_severity', 'namespace'],
                    type: 'URI',
                    title: 'Namespace of aggregate severity',
                    description: 'Points to the namespace so referenced.',
                    mandatory: false,
                    metaInfo: {},
                  },
                  {
                    key: 'text',
                    fullName: ['document', 'aggregate_severity', 'text'],
                    type: 'STRING',
                    title: 'Text of aggregate severity',
                    description:
                      'Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS).',
                    mandatory: true,
                    metaInfo: {
                      minLength: 1,
                      examples: ['Critical', 'Important', 'Moderate'],
                    },
                  },
                ],
              },
            },
            {
              key: 'category',
              fullName: ['document', 'category'],
              type: 'STRING',
              title: 'Document category',
              description:
                'Defines a short canonical name, chosen by the document producer, which will inform the end user as to the category of document.',
              mandatory: true,
              metaInfo: {
                minLength: 1,
                examples: [
                  'csaf_base',
                  'csaf_security_advisory',
                  'csaf_vex',
                  'Example Company Security Notice',
                ],
                pattern: '^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$',
              },
            },
            {
              key: 'csaf_version',
              fullName: ['document', 'csaf_version'],
              type: 'STRING',
              title: 'CSAF version',
              description:
                'Gives the version of the CSAF specification which the document was generated for.',
              mandatory: true,
              metaInfo: {
                enumValues: ['2.0'],
              },
            },
            {
              key: 'distribution',
              fullName: ['document', 'distribution'],
              title: 'Rules for sharing document',
              type: 'OBJECT',
              description:
                'Describe any constraints on how this document might be shared.',
              mandatory: false,
              metaInfo: {
                propertyList: [
                  {
                    key: 'text',
                    fullName: ['document', 'distribution', 'text'],
                    type: 'STRING',
                    title: 'Textual description',
                    description:
                      'Provides a textual description of additional constraints.',
                    mandatory: false,
                    metaInfo: {
                      minLength: 1,
                      examples: [
                        'Copyright 2021, Example Company, All Rights Reserved.',
                        'Distribute freely.',
                        'Share only on a need-to-know-basis only.',
                      ],
                    },
                  },
                  {
                    key: 'tlp',
                    fullName: ['document', 'distribution', 'tlp'],
                    title: 'Traffic Light Protocol (TLP)',
                    type: 'OBJECT',
                    description:
                      'Provides details about the TLP classification of the document.',
                    mandatory: false,
                    metaInfo: {
                      propertyList: [
                        {
                          key: 'label',
                          fullName: [
                            'document',
                            'distribution',
                            'tlp',
                            'label',
                          ],
                          type: 'STRING',
                          title: 'Label of TLP',
                          description:
                            'Provides the TLP label of the document.',
                          mandatory: true,
                          metaInfo: {
                            enumValues: ['AMBER', 'GREEN', 'RED', 'WHITE'],
                          },
                        },
                        {
                          key: 'url',
                          fullName: ['document', 'distribution', 'tlp', 'url'],
                          type: 'URI',
                          title: 'URL of TLP version',
                          description:
                            'Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST.',
                          mandatory: false,
                          metaInfo: {
                            examples: [
                              'https://www.us-cert.gov/tlp',
                              'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Kritis/Merkblatt_TLP.pdf',
                            ],
                            default: 'https://www.first.org/tlp/',
                          },
                        },
                      ],
                    },
                  },
                ],
                minProperties: 1,
              },
            },
            {
              key: 'lang',
              fullName: ['document', 'lang'],
              type: 'STRING',
              title: 'Language type',
              description:
                'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
              mandatory: false,
              metaInfo: {
                examples: ['de', 'en', 'fr', 'frc', 'jp'],
                pattern:
                  '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
              },
              refTitle: 'Document language',
              refDescription:
                'Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646.',
            },
            {
              key: 'notes',
              fullName: ['document', 'notes'],
              title: 'List of notes',
              type: 'ARRAY',
              description:
                'Contains notes which are specific to the current context.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['document', 'notes'],
                  title: 'Note',
                  type: 'OBJECT',
                  description:
                    'Is a place to put all manner of text blobs related to the current context.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'audience',
                        fullName: ['document', 'notes', 'audience'],
                        type: 'STRING',
                        title: 'Audience of note',
                        description: 'Indicates who is intended to read it.',
                        mandatory: false,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'all',
                            'executives',
                            'operational management and system administrators',
                            'safety engineers',
                          ],
                        },
                      },
                      {
                        key: 'category',
                        fullName: ['document', 'notes', 'category'],
                        type: 'STRING',
                        title: 'Note category',
                        description:
                          'Contains the information of what kind of note this is.',
                        mandatory: true,
                        metaInfo: {
                          enumValues: [
                            'description',
                            'details',
                            'faq',
                            'general',
                            'legal_disclaimer',
                            'other',
                            'summary',
                          ],
                        },
                      },
                      {
                        key: 'text',
                        fullName: ['document', 'notes', 'text'],
                        type: 'STRING',
                        title: 'Note content',
                        description:
                          'Holds the content of the note. Content varies depending on type.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                        },
                      },
                      {
                        key: 'title',
                        fullName: ['document', 'notes', 'title'],
                        type: 'STRING',
                        title: 'Title of note',
                        description:
                          'Provides a concise description of what is contained in the text of the note.',
                        mandatory: false,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'Details',
                            'Executive summary',
                            'Technical summary',
                            'Impact on safety systems',
                          ],
                        },
                      },
                    ],
                  },
                },
              },
              refTitle: 'Document notes',
              refDescription: 'Holds notes associated with the whole document.',
            },
            {
              key: 'publisher',
              fullName: ['document', 'publisher'],
              title: 'Publisher',
              type: 'OBJECT',
              description:
                'Provides information about the publisher of the document.',
              mandatory: true,
              metaInfo: {
                propertyList: [
                  {
                    key: 'category',
                    fullName: ['document', 'publisher', 'category'],
                    type: 'STRING',
                    title: 'Category of publisher',
                    description:
                      'Provides information about the category of publisher releasing the document.',
                    mandatory: true,
                    metaInfo: {
                      enumValues: [
                        'coordinator',
                        'discoverer',
                        'other',
                        'translator',
                        'user',
                        'vendor',
                      ],
                    },
                  },
                  {
                    key: 'contact_details',
                    fullName: ['document', 'publisher', 'contact_details'],
                    type: 'STRING',
                    title: 'Contact details',
                    description:
                      'Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses.',
                    mandatory: false,
                    metaInfo: {
                      minLength: 1,
                      examples: [
                        'Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact.',
                      ],
                    },
                  },
                  {
                    key: 'issuing_authority',
                    fullName: ['document', 'publisher', 'issuing_authority'],
                    type: 'STRING',
                    title: 'Issuing authority',
                    description:
                      "Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations.",
                    mandatory: false,
                    metaInfo: {
                      minLength: 1,
                    },
                  },
                  {
                    key: 'name',
                    fullName: ['document', 'publisher', 'name'],
                    type: 'STRING',
                    title: 'Name of publisher',
                    description: 'Contains the name of the issuing party.',
                    mandatory: true,
                    metaInfo: {
                      minLength: 1,
                      examples: ['BSI', 'Cisco PSIRT', 'Siemens ProductCERT'],
                    },
                  },
                  {
                    key: 'namespace',
                    fullName: ['document', 'publisher', 'namespace'],
                    type: 'URI',
                    title: 'Namespace of publisher',
                    description:
                      'Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party.',
                    mandatory: true,
                    metaInfo: {
                      examples: ['https://csaf.io', 'https://www.example.com'],
                    },
                  },
                ],
              },
            },
            {
              key: 'references',
              fullName: ['document', 'references'],
              title: 'List of references',
              type: 'ARRAY',
              description: 'Holds a list of references.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['document', 'references'],
                  title: 'Reference',
                  type: 'OBJECT',
                  description:
                    'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'category',
                        fullName: ['document', 'references', 'category'],
                        type: 'STRING',
                        title: 'Category of reference',
                        description:
                          'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
                        mandatory: false,
                        metaInfo: {
                          enumValues: ['external', 'self'],
                          default: 'external',
                        },
                      },
                      {
                        key: 'summary',
                        fullName: ['document', 'references', 'summary'],
                        type: 'STRING',
                        title: 'Summary of the reference',
                        description: 'Indicates what this reference refers to.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                        },
                      },
                      {
                        key: 'url',
                        fullName: ['document', 'references', 'url'],
                        type: 'URI',
                        title: 'URL of reference',
                        description: 'Provides the URL for the reference.',
                        mandatory: true,
                        metaInfo: {},
                      },
                    ],
                  },
                },
              },
              refTitle: 'Document references',
              refDescription:
                'Holds a list of references associated with the whole document.',
            },
            {
              key: 'source_lang',
              fullName: ['document', 'source_lang'],
              type: 'STRING',
              title: 'Language type',
              description:
                'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
              mandatory: false,
              metaInfo: {
                examples: ['de', 'en', 'fr', 'frc', 'jp'],
                pattern:
                  '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
              },
              refTitle: 'Source language',
              refDescription:
                'If this copy of the document is a translation then the value of this property describes from which language this document was translated.',
            },
            {
              key: 'title',
              fullName: ['document', 'title'],
              type: 'STRING',
              title: 'Title of this document',
              description:
                'This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents.',
              mandatory: true,
              metaInfo: {
                minLength: 1,
                examples: [
                  'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
                  'Example Company Cross-Site-Scripting Vulnerability in Example Generator',
                ],
              },
            },
            {
              key: 'tracking',
              fullName: ['document', 'tracking'],
              title: 'Tracking',
              type: 'OBJECT',
              description:
                'Is a container designated to hold all management attributes necessary to track a CSAF document as a whole.',
              mandatory: true,
              metaInfo: {
                propertyList: [
                  {
                    key: 'aliases',
                    fullName: ['document', 'tracking', 'aliases'],
                    title: 'Aliases',
                    type: 'ARRAY',
                    description:
                      'Contains a list of alternate names for the same document.',
                    mandatory: false,
                    metaInfo: {
                      minItem: 1,
                      uniqueItems: true,
                      arrayType: {
                        key: '',
                        fullName: ['document', 'tracking', 'aliases'],
                        type: 'STRING',
                        title: 'Alternate name',
                        description:
                          'Specifies a non-empty string that represents a distinct optional alternative ID used to refer to the document.',
                        mandatory: false,
                        metaInfo: {
                          minLength: 1,
                          examples: ['CVE-2019-12345'],
                        },
                      },
                    },
                  },
                  {
                    key: 'current_release_date',
                    fullName: ['document', 'tracking', 'current_release_date'],
                    type: 'DATETIME',
                    title: 'Current release date',
                    description:
                      'The date when the current revision of this document was released',
                    mandatory: true,
                    metaInfo: {},
                  },
                  {
                    key: 'generator',
                    fullName: ['document', 'tracking', 'generator'],
                    title: 'Document generator',
                    type: 'OBJECT',
                    description:
                      'Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it.',
                    mandatory: false,
                    metaInfo: {
                      propertyList: [
                        {
                          key: 'date',
                          fullName: [
                            'document',
                            'tracking',
                            'generator',
                            'date',
                          ],
                          type: 'DATETIME',
                          title: 'Date of document generation',
                          description:
                            'This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date.',
                          mandatory: false,
                          metaInfo: {},
                        },
                        {
                          key: 'engine',
                          fullName: [
                            'document',
                            'tracking',
                            'generator',
                            'engine',
                          ],
                          title: 'Engine of document generation',
                          type: 'OBJECT',
                          description:
                            'Contains information about the engine that generated the CSAF document.',
                          mandatory: true,
                          metaInfo: {
                            propertyList: [
                              {
                                key: 'name',
                                fullName: [
                                  'document',
                                  'tracking',
                                  'generator',
                                  'engine',
                                  'name',
                                ],
                                type: 'STRING',
                                title: 'Engine name',
                                description:
                                  'Represents the name of the engine that generated the CSAF document.',
                                mandatory: true,
                                metaInfo: {
                                  minLength: 1,
                                  examples: [
                                    'Red Hat rhsa-to-cvrf',
                                    'Secvisogram',
                                    'TVCE',
                                  ],
                                },
                              },
                              {
                                key: 'version',
                                fullName: [
                                  'document',
                                  'tracking',
                                  'generator',
                                  'engine',
                                  'version',
                                ],
                                type: 'STRING',
                                title: 'Engine version',
                                description:
                                  'Contains the version of the engine that generated the CSAF document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: [
                                    '0.6.0',
                                    '1.0.0-beta+exp.sha.a1c44f85',
                                    '2',
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    key: 'id',
                    fullName: ['document', 'tracking', 'id'],
                    type: 'STRING',
                    title: 'Unique identifier for the document',
                    description:
                      'The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority.',
                    mandatory: true,
                    metaInfo: {
                      minLength: 1,
                      examples: [
                        'Example Company - 2019-YH3234',
                        'RHBA-2019:0024',
                        'cisco-sa-20190513-secureboot',
                      ],
                      pattern: '^[\\S](.*[\\S])?$',
                    },
                  },
                  {
                    key: 'initial_release_date',
                    fullName: ['document', 'tracking', 'initial_release_date'],
                    type: 'DATETIME',
                    title: 'Initial release date',
                    description:
                      'The date when this document was first published.',
                    mandatory: true,
                    metaInfo: {},
                  },
                  {
                    key: 'revision_history',
                    fullName: ['document', 'tracking', 'revision_history'],
                    title: 'Revision history',
                    type: 'ARRAY',
                    description:
                      'Holds one revision item for each version of the CSAF document, including the initial one.',
                    mandatory: true,
                    metaInfo: {
                      minItem: 1,
                      arrayType: {
                        key: '',
                        fullName: ['document', 'tracking', 'revision_history'],
                        title: 'Revision',
                        type: 'OBJECT',
                        description:
                          'Contains all the information elements required to track the evolution of a CSAF document.',
                        mandatory: false,
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'date',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'date',
                              ],
                              type: 'DATETIME',
                              title: 'Date of the revision',
                              description: 'The date of the revision entry',
                              mandatory: true,
                              metaInfo: {},
                            },
                            {
                              key: 'legacy_version',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'legacy_version',
                              ],
                              type: 'STRING',
                              title: 'Legacy version of the revision',
                              description:
                                'Contains the version string used in an existing document with the same content.',
                              mandatory: false,
                              metaInfo: {
                                minLength: 1,
                              },
                            },
                            {
                              key: 'number',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'number',
                              ],
                              type: 'STRING',
                              title: 'Version',
                              description:
                                'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
                              mandatory: true,
                              metaInfo: {
                                examples: [
                                  '1',
                                  '4',
                                  '0.9.0',
                                  '1.4.3',
                                  '2.40.0+21AF26D3',
                                ],
                                pattern:
                                  '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
                              },
                            },
                            {
                              key: 'summary',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'summary',
                              ],
                              type: 'STRING',
                              title: 'Summary of the revision',
                              description:
                                'Holds a single non-empty string representing a short description of the changes.',
                              mandatory: true,
                              metaInfo: {
                                minLength: 1,
                                examples: ['Initial version.'],
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                  {
                    key: 'status',
                    fullName: ['document', 'tracking', 'status'],
                    type: 'STRING',
                    title: 'Document status',
                    description: 'Defines the draft status of the document.',
                    mandatory: true,
                    metaInfo: {
                      enumValues: ['draft', 'final', 'interim'],
                    },
                  },
                  {
                    key: 'version',
                    fullName: ['document', 'tracking', 'version'],
                    type: 'STRING',
                    title: 'Version',
                    description:
                      'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
                    mandatory: true,
                    metaInfo: {
                      examples: ['1', '4', '0.9.0', '1.4.3', '2.40.0+21AF26D3'],
                      pattern:
                        '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        key: 'product_tree',
        fullName: ['product_tree'],
        title: 'Product tree',
        type: 'OBJECT',
        description:
          'Is a container for all fully qualified product names that can be referenced elsewhere in the document.',
        mandatory: false,
        metaInfo: {
          propertyList: [
            {
              key: 'branches',
              fullName: ['product_tree', 'branches'],
              title: 'List of branches',
              type: 'ARRAY',
              description:
                'Contains branch elements as children of the current element.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'branches'],
                  title: 'Branch',
                  type: 'OBJECT',
                  description:
                    'Is a part of the hierarchical structure of the product tree.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'branches',
                        fullName: ['product_tree', 'branches', 'branches'],
                        type: 'RECURSION',
                        mandatory: false,
                        metaInfo: {
                          refType: ['product_tree', 'branches'],
                        },
                      },
                      {
                        key: 'category',
                        fullName: ['product_tree', 'branches', 'category'],
                        type: 'STRING',
                        title: 'Category of the branch',
                        description:
                          'Describes the characteristics of the labeled branch.',
                        mandatory: true,
                        metaInfo: {
                          enumValues: [
                            'architecture',
                            'host_name',
                            'language',
                            'legacy',
                            'patch_level',
                            'product_family',
                            'product_name',
                            'product_version',
                            'product_version_range',
                            'service_pack',
                            'specification',
                            'vendor',
                          ],
                        },
                      },
                      {
                        key: 'name',
                        fullName: ['product_tree', 'branches', 'name'],
                        type: 'STRING',
                        title: 'Name of the branch',
                        description:
                          "Contains the canonical descriptor or 'friendly name' of the branch.",
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            '10',
                            '365',
                            'Microsoft',
                            'Office',
                            'PCS 7',
                            'SIMATIC',
                            'Siemens',
                            'Windows',
                          ],
                        },
                      },
                      {
                        key: 'product',
                        fullName: ['product_tree', 'branches', 'product'],
                        title: 'Full product name',
                        type: 'OBJECT',
                        description:
                          'Specifies information about the product and assigns the product_id.',
                        mandatory: false,
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'name',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'name',
                              ],
                              type: 'STRING',
                              title: 'Textual description of the product',
                              description:
                                'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                              mandatory: true,
                              metaInfo: {
                                minLength: 1,
                                examples: [
                                  'Cisco AnyConnect Secure Mobility Client 2.3.185',
                                  'Microsoft Host Integration Server 2006 Service Pack 1',
                                ],
                              },
                            },
                            {
                              key: 'product_id',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'product_id',
                              ],
                              type: 'STRING',
                              title: 'Reference token for product instance',
                              description:
                                'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                              mandatory: true,
                              metaInfo: {
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                              },
                            },
                            {
                              key: 'product_identification_helper',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'product_identification_helper',
                              ],
                              title: 'Helper to identify the product',
                              type: 'OBJECT',
                              description:
                                'Provides at least one method which aids in identifying the product in an asset database.',
                              mandatory: false,
                              metaInfo: {
                                propertyList: [
                                  {
                                    key: 'cpe',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'cpe',
                                    ],
                                    type: 'STRING',
                                    title:
                                      'Common Platform Enumeration representation',
                                    description:
                                      'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                                    mandatory: false,
                                    metaInfo: {
                                      minLength: 5,
                                      pattern:
                                        '^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$',
                                    },
                                  },
                                  {
                                    key: 'hashes',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'hashes',
                                    ],
                                    title: 'List of hashes',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of cryptographic hashes usable to identify files.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'hashes',
                                        ],
                                        title: 'Cryptographic hashes',
                                        type: 'OBJECT',
                                        description:
                                          'Contains all information to identify a file based on its cryptographic hash values.',
                                        mandatory: false,
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'file_hashes',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'hashes',
                                                'file_hashes',
                                              ],
                                              title: 'List of file hashes',
                                              type: 'ARRAY',
                                              description:
                                                'Contains a list of cryptographic hashes for this file.',
                                              mandatory: true,
                                              metaInfo: {
                                                minItem: 1,
                                                arrayType: {
                                                  key: '',
                                                  fullName: [
                                                    'product_tree',
                                                    'branches',
                                                    'product',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                  ],
                                                  title: 'File hash',
                                                  type: 'OBJECT',
                                                  description:
                                                    'Contains one hash value and algorithm of the file to be identified.',
                                                  mandatory: false,
                                                  metaInfo: {
                                                    propertyList: [
                                                      {
                                                        key: 'algorithm',
                                                        fullName: [
                                                          'product_tree',
                                                          'branches',
                                                          'product',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'algorithm',
                                                        ],
                                                        type: 'STRING',
                                                        title:
                                                          'Algorithm of the cryptographic hash',
                                                        description:
                                                          'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                        mandatory: true,
                                                        metaInfo: {
                                                          minLength: 1,
                                                          examples: [
                                                            'blake2b512',
                                                            'sha256',
                                                            'sha3-512',
                                                            'sha384',
                                                            'sha512',
                                                          ],
                                                          default: 'sha256',
                                                        },
                                                      },
                                                      {
                                                        key: 'value',
                                                        fullName: [
                                                          'product_tree',
                                                          'branches',
                                                          'product',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'value',
                                                        ],
                                                        type: 'STRING',
                                                        title:
                                                          'Value of the cryptographic hash',
                                                        description:
                                                          'Contains the cryptographic hash value in hexadecimal representation.',
                                                        mandatory: true,
                                                        metaInfo: {
                                                          minLength: 32,
                                                          examples: [
                                                            '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                            '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                            '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                          ],
                                                          pattern:
                                                            '^[0-9a-fA-F]{32,}$',
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            },
                                            {
                                              key: 'filename',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'hashes',
                                                'filename',
                                              ],
                                              type: 'STRING',
                                              title: 'Filename',
                                              description:
                                                'Contains the name of the file which is identified by the hash values.',
                                              mandatory: true,
                                              metaInfo: {
                                                minLength: 1,
                                                examples: [
                                                  'WINWORD.EXE',
                                                  'msotadddin.dll',
                                                  'sudoers.so',
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'model_numbers',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'model_numbers',
                                    ],
                                    title: 'List of models',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of full or abbreviated (partial) model numbers.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      uniqueItems: true,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'model_numbers',
                                        ],
                                        type: 'STRING',
                                        title: 'Model number',
                                        description:
                                          'Contains a full or abbreviated (partial) model number of the component to identify.',
                                        mandatory: false,
                                        metaInfo: {
                                          minLength: 1,
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'purl',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'purl',
                                    ],
                                    type: 'URI',
                                    title: 'package URL representation',
                                    description:
                                      'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                    mandatory: false,
                                    metaInfo: {
                                      minLength: 7,
                                      pattern:
                                        '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+',
                                    },
                                  },
                                  {
                                    key: 'sbom_urls',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'sbom_urls',
                                    ],
                                    title: 'List of SBOM URLs',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of URLs where SBOMs for this product can be retrieved.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'sbom_urls',
                                        ],
                                        type: 'URI',
                                        title: 'SBOM URL',
                                        description:
                                          'Contains a URL of one SBOM for this product.',
                                        mandatory: false,
                                        metaInfo: {},
                                      },
                                    },
                                  },
                                  {
                                    key: 'serial_numbers',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'serial_numbers',
                                    ],
                                    title: 'List of serial numbers',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of full or abbreviated (partial) serial numbers.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      uniqueItems: true,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'serial_numbers',
                                        ],
                                        type: 'STRING',
                                        title: 'Serial number',
                                        description:
                                          'Contains a full or abbreviated (partial) serial number of the component to identify.',
                                        mandatory: false,
                                        metaInfo: {
                                          minLength: 1,
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'skus',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'skus',
                                    ],
                                    title: 'List of stock keeping units',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of full or abbreviated (partial) stock keeping units.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'skus',
                                        ],
                                        type: 'STRING',
                                        title: 'Stock keeping unit',
                                        description:
                                          'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                        mandatory: false,
                                        metaInfo: {
                                          minLength: 1,
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'x_generic_uris',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'x_generic_uris',
                                    ],
                                    title: 'List of generic URIs',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                        ],
                                        title: 'Generic URI',
                                        type: 'OBJECT',
                                        description:
                                          'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                        mandatory: false,
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'namespace',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'namespace',
                                              ],
                                              type: 'URI',
                                              title:
                                                'Namespace of the generic URI',
                                              description:
                                                'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                              mandatory: true,
                                              metaInfo: {},
                                            },
                                            {
                                              key: 'uri',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'uri',
                                              ],
                                              type: 'URI',
                                              title: 'URI',
                                              description:
                                                'Contains the identifier itself.',
                                              mandatory: true,
                                              metaInfo: {},
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                ],
                                minProperties: 1,
                              },
                            },
                          ],
                        },
                      },
                    ],
                    minProperties: 3,
                    maxProperties: 3,
                  },
                },
              },
            },
            {
              key: 'full_product_names',
              fullName: ['product_tree', 'full_product_names'],
              title: 'List of full product names',
              type: 'ARRAY',
              description: 'Contains a list of full product names.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'full_product_names'],
                  title: 'Full product name',
                  type: 'OBJECT',
                  description:
                    'Specifies information about the product and assigns the product_id.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'name',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'name',
                        ],
                        type: 'STRING',
                        title: 'Textual description of the product',
                        description:
                          'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'Cisco AnyConnect Secure Mobility Client 2.3.185',
                            'Microsoft Host Integration Server 2006 Service Pack 1',
                          ],
                        },
                      },
                      {
                        key: 'product_id',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'product_id',
                        ],
                        type: 'STRING',
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        },
                      },
                      {
                        key: 'product_identification_helper',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'product_identification_helper',
                        ],
                        title: 'Helper to identify the product',
                        type: 'OBJECT',
                        description:
                          'Provides at least one method which aids in identifying the product in an asset database.',
                        mandatory: false,
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'cpe',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'cpe',
                              ],
                              type: 'STRING',
                              title:
                                'Common Platform Enumeration representation',
                              description:
                                'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                              mandatory: false,
                              metaInfo: {
                                minLength: 5,
                                pattern:
                                  '^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$',
                              },
                            },
                            {
                              key: 'hashes',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'hashes',
                              ],
                              title: 'List of hashes',
                              type: 'ARRAY',
                              description:
                                'Contains a list of cryptographic hashes usable to identify files.',
                              mandatory: false,
                              metaInfo: {
                                minItem: 1,
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'hashes',
                                  ],
                                  title: 'Cryptographic hashes',
                                  type: 'OBJECT',
                                  description:
                                    'Contains all information to identify a file based on its cryptographic hash values.',
                                  mandatory: false,
                                  metaInfo: {
                                    propertyList: [
                                      {
                                        key: 'file_hashes',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'hashes',
                                          'file_hashes',
                                        ],
                                        title: 'List of file hashes',
                                        type: 'ARRAY',
                                        description:
                                          'Contains a list of cryptographic hashes for this file.',
                                        mandatory: true,
                                        metaInfo: {
                                          minItem: 1,
                                          arrayType: {
                                            key: '',
                                            fullName: [
                                              'product_tree',
                                              'full_product_names',
                                              'product_identification_helper',
                                              'hashes',
                                              'file_hashes',
                                            ],
                                            title: 'File hash',
                                            type: 'OBJECT',
                                            description:
                                              'Contains one hash value and algorithm of the file to be identified.',
                                            mandatory: false,
                                            metaInfo: {
                                              propertyList: [
                                                {
                                                  key: 'algorithm',
                                                  fullName: [
                                                    'product_tree',
                                                    'full_product_names',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                    'algorithm',
                                                  ],
                                                  type: 'STRING',
                                                  title:
                                                    'Algorithm of the cryptographic hash',
                                                  description:
                                                    'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                  mandatory: true,
                                                  metaInfo: {
                                                    minLength: 1,
                                                    examples: [
                                                      'blake2b512',
                                                      'sha256',
                                                      'sha3-512',
                                                      'sha384',
                                                      'sha512',
                                                    ],
                                                    default: 'sha256',
                                                  },
                                                },
                                                {
                                                  key: 'value',
                                                  fullName: [
                                                    'product_tree',
                                                    'full_product_names',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                    'value',
                                                  ],
                                                  type: 'STRING',
                                                  title:
                                                    'Value of the cryptographic hash',
                                                  description:
                                                    'Contains the cryptographic hash value in hexadecimal representation.',
                                                  mandatory: true,
                                                  metaInfo: {
                                                    minLength: 32,
                                                    examples: [
                                                      '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                      '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                      '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                    ],
                                                    pattern:
                                                      '^[0-9a-fA-F]{32,}$',
                                                  },
                                                },
                                              ],
                                            },
                                          },
                                        },
                                      },
                                      {
                                        key: 'filename',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'hashes',
                                          'filename',
                                        ],
                                        type: 'STRING',
                                        title: 'Filename',
                                        description:
                                          'Contains the name of the file which is identified by the hash values.',
                                        mandatory: true,
                                        metaInfo: {
                                          minLength: 1,
                                          examples: [
                                            'WINWORD.EXE',
                                            'msotadddin.dll',
                                            'sudoers.so',
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                            {
                              key: 'model_numbers',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'model_numbers',
                              ],
                              title: 'List of models',
                              type: 'ARRAY',
                              description:
                                'Contains a list of full or abbreviated (partial) model numbers.',
                              mandatory: false,
                              metaInfo: {
                                minItem: 1,
                                uniqueItems: true,
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'model_numbers',
                                  ],
                                  type: 'STRING',
                                  title: 'Model number',
                                  description:
                                    'Contains a full or abbreviated (partial) model number of the component to identify.',
                                  mandatory: false,
                                  metaInfo: {
                                    minLength: 1,
                                  },
                                },
                              },
                            },
                            {
                              key: 'purl',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'purl',
                              ],
                              type: 'URI',
                              title: 'package URL representation',
                              description:
                                'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                              mandatory: false,
                              metaInfo: {
                                minLength: 7,
                                pattern:
                                  '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+',
                              },
                            },
                            {
                              key: 'sbom_urls',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'sbom_urls',
                              ],
                              title: 'List of SBOM URLs',
                              type: 'ARRAY',
                              description:
                                'Contains a list of URLs where SBOMs for this product can be retrieved.',
                              mandatory: false,
                              metaInfo: {
                                minItem: 1,
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'sbom_urls',
                                  ],
                                  type: 'URI',
                                  title: 'SBOM URL',
                                  description:
                                    'Contains a URL of one SBOM for this product.',
                                  mandatory: false,
                                  metaInfo: {},
                                },
                              },
                            },
                            {
                              key: 'serial_numbers',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'serial_numbers',
                              ],
                              title: 'List of serial numbers',
                              type: 'ARRAY',
                              description:
                                'Contains a list of full or abbreviated (partial) serial numbers.',
                              mandatory: false,
                              metaInfo: {
                                minItem: 1,
                                uniqueItems: true,
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'serial_numbers',
                                  ],
                                  type: 'STRING',
                                  title: 'Serial number',
                                  description:
                                    'Contains a full or abbreviated (partial) serial number of the component to identify.',
                                  mandatory: false,
                                  metaInfo: {
                                    minLength: 1,
                                  },
                                },
                              },
                            },
                            {
                              key: 'skus',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'skus',
                              ],
                              title: 'List of stock keeping units',
                              type: 'ARRAY',
                              description:
                                'Contains a list of full or abbreviated (partial) stock keeping units.',
                              mandatory: false,
                              metaInfo: {
                                minItem: 1,
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'skus',
                                  ],
                                  type: 'STRING',
                                  title: 'Stock keeping unit',
                                  description:
                                    'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                  mandatory: false,
                                  metaInfo: {
                                    minLength: 1,
                                  },
                                },
                              },
                            },
                            {
                              key: 'x_generic_uris',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'x_generic_uris',
                              ],
                              title: 'List of generic URIs',
                              type: 'ARRAY',
                              description:
                                'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                              mandatory: false,
                              metaInfo: {
                                minItem: 1,
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'x_generic_uris',
                                  ],
                                  title: 'Generic URI',
                                  type: 'OBJECT',
                                  description:
                                    'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                  mandatory: false,
                                  metaInfo: {
                                    propertyList: [
                                      {
                                        key: 'namespace',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                          'namespace',
                                        ],
                                        type: 'URI',
                                        title: 'Namespace of the generic URI',
                                        description:
                                          'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                        mandatory: true,
                                        metaInfo: {},
                                      },
                                      {
                                        key: 'uri',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                          'uri',
                                        ],
                                        type: 'URI',
                                        title: 'URI',
                                        description:
                                          'Contains the identifier itself.',
                                        mandatory: true,
                                        metaInfo: {},
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          ],
                          minProperties: 1,
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'product_groups',
              fullName: ['product_tree', 'product_groups'],
              title: 'List of product groups',
              type: 'ARRAY',
              description: 'Contains a list of product groups.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'product_groups'],
                  title: 'Product group',
                  type: 'OBJECT',
                  description:
                    'Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'group_id',
                        fullName: [
                          'product_tree',
                          'product_groups',
                          'group_id',
                        ],
                        type: 'STRING',
                        title: 'Reference token for product group instance',
                        description:
                          'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'CSAFGID-0001',
                            'CSAFGID-0002',
                            'CSAFGID-0020',
                          ],
                        },
                      },
                      {
                        key: 'product_ids',
                        fullName: [
                          'product_tree',
                          'product_groups',
                          'product_ids',
                        ],
                        title: 'List of Product IDs',
                        type: 'ARRAY',
                        description:
                          'Lists the product_ids of those products which known as one group in the document.',
                        mandatory: true,
                        metaInfo: {
                          minItem: 2,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'product_tree',
                              'product_groups',
                              'product_ids',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                      },
                      {
                        key: 'summary',
                        fullName: ['product_tree', 'product_groups', 'summary'],
                        type: 'STRING',
                        title: 'Summary of the product group',
                        description:
                          'Gives a short, optional description of the group.',
                        mandatory: false,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'Products supporting Modbus.',
                            'The x64 versions of the operating system.',
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'relationships',
              fullName: ['product_tree', 'relationships'],
              title: 'List of relationships',
              type: 'ARRAY',
              description: 'Contains a list of relationships.',
              mandatory: false,
              metaInfo: {
                minItem: 1,
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'relationships'],
                  title: 'Relationship',
                  type: 'OBJECT',
                  description:
                    'Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'category',
                        fullName: ['product_tree', 'relationships', 'category'],
                        type: 'STRING',
                        title: 'Relationship category',
                        description:
                          'Defines the category of relationship for the referenced component.',
                        mandatory: true,
                        metaInfo: {
                          enumValues: [
                            'default_component_of',
                            'external_component_of',
                            'installed_on',
                            'installed_with',
                            'optional_component_of',
                          ],
                        },
                      },
                      {
                        key: 'full_product_name',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'full_product_name',
                        ],
                        title: 'Full product name',
                        type: 'OBJECT',
                        description:
                          'Specifies information about the product and assigns the product_id.',
                        mandatory: true,
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'name',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'name',
                              ],
                              type: 'STRING',
                              title: 'Textual description of the product',
                              description:
                                'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                              mandatory: true,
                              metaInfo: {
                                minLength: 1,
                                examples: [
                                  'Cisco AnyConnect Secure Mobility Client 2.3.185',
                                  'Microsoft Host Integration Server 2006 Service Pack 1',
                                ],
                              },
                            },
                            {
                              key: 'product_id',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'product_id',
                              ],
                              type: 'STRING',
                              title: 'Reference token for product instance',
                              description:
                                'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                              mandatory: true,
                              metaInfo: {
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                              },
                            },
                            {
                              key: 'product_identification_helper',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'product_identification_helper',
                              ],
                              title: 'Helper to identify the product',
                              type: 'OBJECT',
                              description:
                                'Provides at least one method which aids in identifying the product in an asset database.',
                              mandatory: false,
                              metaInfo: {
                                propertyList: [
                                  {
                                    key: 'cpe',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'cpe',
                                    ],
                                    type: 'STRING',
                                    title:
                                      'Common Platform Enumeration representation',
                                    description:
                                      'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                                    mandatory: false,
                                    metaInfo: {
                                      minLength: 5,
                                      pattern:
                                        '^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$',
                                    },
                                  },
                                  {
                                    key: 'hashes',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'hashes',
                                    ],
                                    title: 'List of hashes',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of cryptographic hashes usable to identify files.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'hashes',
                                        ],
                                        title: 'Cryptographic hashes',
                                        type: 'OBJECT',
                                        description:
                                          'Contains all information to identify a file based on its cryptographic hash values.',
                                        mandatory: false,
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'file_hashes',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'hashes',
                                                'file_hashes',
                                              ],
                                              title: 'List of file hashes',
                                              type: 'ARRAY',
                                              description:
                                                'Contains a list of cryptographic hashes for this file.',
                                              mandatory: true,
                                              metaInfo: {
                                                minItem: 1,
                                                arrayType: {
                                                  key: '',
                                                  fullName: [
                                                    'product_tree',
                                                    'relationships',
                                                    'full_product_name',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                  ],
                                                  title: 'File hash',
                                                  type: 'OBJECT',
                                                  description:
                                                    'Contains one hash value and algorithm of the file to be identified.',
                                                  mandatory: false,
                                                  metaInfo: {
                                                    propertyList: [
                                                      {
                                                        key: 'algorithm',
                                                        fullName: [
                                                          'product_tree',
                                                          'relationships',
                                                          'full_product_name',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'algorithm',
                                                        ],
                                                        type: 'STRING',
                                                        title:
                                                          'Algorithm of the cryptographic hash',
                                                        description:
                                                          'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                        mandatory: true,
                                                        metaInfo: {
                                                          minLength: 1,
                                                          examples: [
                                                            'blake2b512',
                                                            'sha256',
                                                            'sha3-512',
                                                            'sha384',
                                                            'sha512',
                                                          ],
                                                          default: 'sha256',
                                                        },
                                                      },
                                                      {
                                                        key: 'value',
                                                        fullName: [
                                                          'product_tree',
                                                          'relationships',
                                                          'full_product_name',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'value',
                                                        ],
                                                        type: 'STRING',
                                                        title:
                                                          'Value of the cryptographic hash',
                                                        description:
                                                          'Contains the cryptographic hash value in hexadecimal representation.',
                                                        mandatory: true,
                                                        metaInfo: {
                                                          minLength: 32,
                                                          examples: [
                                                            '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                            '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                            '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                          ],
                                                          pattern:
                                                            '^[0-9a-fA-F]{32,}$',
                                                        },
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            },
                                            {
                                              key: 'filename',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'hashes',
                                                'filename',
                                              ],
                                              type: 'STRING',
                                              title: 'Filename',
                                              description:
                                                'Contains the name of the file which is identified by the hash values.',
                                              mandatory: true,
                                              metaInfo: {
                                                minLength: 1,
                                                examples: [
                                                  'WINWORD.EXE',
                                                  'msotadddin.dll',
                                                  'sudoers.so',
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'model_numbers',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'model_numbers',
                                    ],
                                    title: 'List of models',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of full or abbreviated (partial) model numbers.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      uniqueItems: true,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'model_numbers',
                                        ],
                                        type: 'STRING',
                                        title: 'Model number',
                                        description:
                                          'Contains a full or abbreviated (partial) model number of the component to identify.',
                                        mandatory: false,
                                        metaInfo: {
                                          minLength: 1,
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'purl',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'purl',
                                    ],
                                    type: 'URI',
                                    title: 'package URL representation',
                                    description:
                                      'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                    mandatory: false,
                                    metaInfo: {
                                      minLength: 7,
                                      pattern:
                                        '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+',
                                    },
                                  },
                                  {
                                    key: 'sbom_urls',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'sbom_urls',
                                    ],
                                    title: 'List of SBOM URLs',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of URLs where SBOMs for this product can be retrieved.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'sbom_urls',
                                        ],
                                        type: 'URI',
                                        title: 'SBOM URL',
                                        description:
                                          'Contains a URL of one SBOM for this product.',
                                        mandatory: false,
                                        metaInfo: {},
                                      },
                                    },
                                  },
                                  {
                                    key: 'serial_numbers',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'serial_numbers',
                                    ],
                                    title: 'List of serial numbers',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of full or abbreviated (partial) serial numbers.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      uniqueItems: true,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'serial_numbers',
                                        ],
                                        type: 'STRING',
                                        title: 'Serial number',
                                        description:
                                          'Contains a full or abbreviated (partial) serial number of the component to identify.',
                                        mandatory: false,
                                        metaInfo: {
                                          minLength: 1,
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'skus',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'skus',
                                    ],
                                    title: 'List of stock keeping units',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of full or abbreviated (partial) stock keeping units.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'skus',
                                        ],
                                        type: 'STRING',
                                        title: 'Stock keeping unit',
                                        description:
                                          'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                        mandatory: false,
                                        metaInfo: {
                                          minLength: 1,
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'x_generic_uris',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'x_generic_uris',
                                    ],
                                    title: 'List of generic URIs',
                                    type: 'ARRAY',
                                    description:
                                      'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                                    mandatory: false,
                                    metaInfo: {
                                      minItem: 1,
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                        ],
                                        title: 'Generic URI',
                                        type: 'OBJECT',
                                        description:
                                          'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                        mandatory: false,
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'namespace',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'namespace',
                                              ],
                                              type: 'URI',
                                              title:
                                                'Namespace of the generic URI',
                                              description:
                                                'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                              mandatory: true,
                                              metaInfo: {},
                                            },
                                            {
                                              key: 'uri',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'uri',
                                              ],
                                              type: 'URI',
                                              title: 'URI',
                                              description:
                                                'Contains the identifier itself.',
                                              mandatory: true,
                                              metaInfo: {},
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                ],
                                minProperties: 1,
                              },
                            },
                          ],
                        },
                      },
                      {
                        key: 'product_reference',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'product_reference',
                        ],
                        type: 'STRING',
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        },
                        refTitle: 'Product reference',
                        refDescription:
                          'Holds a Product ID that refers to the Full Product Name element, which is referenced as the first element of the relationship.',
                      },
                      {
                        key: 'relates_to_product_reference',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'relates_to_product_reference',
                        ],
                        type: 'STRING',
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        },
                        refTitle: 'Relates to product reference',
                        refDescription:
                          'Holds a Product ID that refers to the Full Product Name element, which is referenced as the second element of the relationship.',
                      },
                    ],
                  },
                },
              },
            },
          ],
          minProperties: 1,
        },
      },
      {
        key: 'vulnerabilities',
        fullName: ['vulnerabilities'],
        title: 'Vulnerabilities',
        type: 'ARRAY',
        description:
          'Represents a list of all relevant vulnerability information items.',
        mandatory: false,
        metaInfo: {
          minItem: 1,
          arrayType: {
            key: '',
            fullName: ['vulnerabilities'],
            title: 'Vulnerability',
            type: 'OBJECT',
            description:
              'Is a container for the aggregation of all fields that are related to a single vulnerability in the document.',
            mandatory: false,
            metaInfo: {
              propertyList: [
                {
                  key: 'acknowledgments',
                  fullName: ['vulnerabilities', 'acknowledgments'],
                  title: 'List of acknowledgments',
                  type: 'ARRAY',
                  description: 'Contains a list of acknowledgment elements.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'acknowledgments'],
                      title: 'Acknowledgment',
                      type: 'OBJECT',
                      description:
                        'Acknowledges contributions by describing those that contributed.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'names',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'names',
                            ],
                            title: 'List of acknowledged names',
                            type: 'ARRAY',
                            description:
                              'Contains the names of contributors being recognized.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'acknowledgments',
                                  'names',
                                ],
                                type: 'STRING',
                                title: 'Name of the contributor',
                                description:
                                  'Contains the name of a single contributor being recognized.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: [
                                    'Albert Einstein',
                                    'Johann Sebastian Bach',
                                  ],
                                },
                              },
                            },
                          },
                          {
                            key: 'organization',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'organization',
                            ],
                            type: 'STRING',
                            title: 'Contributing organization',
                            description:
                              'Contains the name of a contributing organization being recognized.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: [
                                'CISA',
                                'Google Project Zero',
                                'Talos',
                              ],
                            },
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'summary',
                            ],
                            type: 'STRING',
                            title: 'Summary of the acknowledgment',
                            description:
                              'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: [
                                'First analysis of Coordinated Multi-Stream Attack (CMSA)',
                              ],
                            },
                          },
                          {
                            key: 'urls',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'urls',
                            ],
                            title: 'List of URLs',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of URLs or location of the reference to be acknowledged.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'acknowledgments',
                                  'urls',
                                ],
                                type: 'URI',
                                title: 'URL of acknowledgment',
                                description:
                                  'Contains the URL or location of the reference to be acknowledged.',
                                mandatory: false,
                                metaInfo: {},
                              },
                            },
                          },
                        ],
                        minProperties: 1,
                      },
                    },
                  },
                  refTitle: 'Vulnerability acknowledgments',
                  refDescription:
                    'Contains a list of acknowledgment elements associated with this vulnerability item.',
                },
                {
                  key: 'cve',
                  fullName: ['vulnerabilities', 'cve'],
                  type: 'STRING',
                  title: 'CVE',
                  description:
                    'Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability.',
                  mandatory: false,
                  metaInfo: {
                    pattern: '^CVE-[0-9]{4}-[0-9]{4,}$',
                  },
                },
                {
                  key: 'cwe',
                  fullName: ['vulnerabilities', 'cwe'],
                  title: 'CWE',
                  type: 'OBJECT',
                  description:
                    'Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated.',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'id',
                        fullName: ['vulnerabilities', 'cwe', 'id'],
                        type: 'STRING',
                        title: 'Weakness ID',
                        description:
                          'Holds the ID for the weakness associated.',
                        mandatory: true,
                        metaInfo: {
                          examples: ['CWE-22', 'CWE-352', 'CWE-79'],
                          pattern: '^CWE-[1-9]\\d{0,5}$',
                        },
                      },
                      {
                        key: 'name',
                        fullName: ['vulnerabilities', 'cwe', 'name'],
                        type: 'STRING',
                        title: 'Weakness name',
                        description:
                          'Holds the full name of the weakness as given in the CWE specification.',
                        mandatory: true,
                        metaInfo: {
                          minLength: 1,
                          examples: [
                            'Cross-Site Request Forgery (CSRF)',
                            "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                            "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  key: 'discovery_date',
                  fullName: ['vulnerabilities', 'discovery_date'],
                  type: 'DATETIME',
                  title: 'Discovery date',
                  description:
                    'Holds the date and time the vulnerability was originally discovered.',
                  mandatory: false,
                  metaInfo: {},
                },
                {
                  key: 'flags',
                  fullName: ['vulnerabilities', 'flags'],
                  title: 'List of flags',
                  type: 'ARRAY',
                  description: 'Contains a list of machine readable flags.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    uniqueItems: true,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'flags'],
                      title: 'Flag',
                      type: 'OBJECT',
                      description:
                        'Contains product specific information in regard to this vulnerability as a single machine readable flag.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'date',
                            fullName: ['vulnerabilities', 'flags', 'date'],
                            type: 'DATETIME',
                            title: 'Date of the flag',
                            description:
                              'Contains the date when assessment was done or the flag was assigned.',
                            mandatory: false,
                            metaInfo: {},
                          },
                          {
                            key: 'group_ids',
                            fullName: ['vulnerabilities', 'flags', 'group_ids'],
                            title: 'List of product_group_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'flags',
                                  'group_ids',
                                ],
                                type: 'STRING',
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: [
                                    'CSAFGID-0001',
                                    'CSAFGID-0002',
                                    'CSAFGID-0020',
                                  ],
                                },
                              },
                            },
                          },
                          {
                            key: 'label',
                            fullName: ['vulnerabilities', 'flags', 'label'],
                            type: 'STRING',
                            title: 'Label of the flag',
                            description:
                              'Specifies the machine readable label.',
                            mandatory: true,
                            metaInfo: {
                              enumValues: [
                                'component_not_present',
                                'inline_mitigations_already_exist',
                                'vulnerable_code_cannot_be_controlled_by_adversary',
                                'vulnerable_code_not_in_execute_path',
                                'vulnerable_code_not_present',
                              ],
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'flags',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'flags',
                                  'product_ids',
                                ],
                                type: 'STRING',
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'ids',
                  fullName: ['vulnerabilities', 'ids'],
                  title: 'List of IDs',
                  type: 'ARRAY',
                  description:
                    'Represents a list of unique labels or tracking IDs for the vulnerability (if such information exists).',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    uniqueItems: true,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'ids'],
                      title: 'ID',
                      type: 'OBJECT',
                      description:
                        'Contains a single unique label or tracking ID for the vulnerability.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'system_name',
                            fullName: ['vulnerabilities', 'ids', 'system_name'],
                            type: 'STRING',
                            title: 'System name',
                            description:
                              'Indicates the name of the vulnerability tracking or numbering system.',
                            mandatory: true,
                            metaInfo: {
                              minLength: 1,
                              examples: ['Cisco Bug ID', 'GitHub Issue'],
                            },
                          },
                          {
                            key: 'text',
                            fullName: ['vulnerabilities', 'ids', 'text'],
                            type: 'STRING',
                            title: 'Text',
                            description:
                              'Is unique label or tracking ID for the vulnerability (if such information exists).',
                            mandatory: true,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSCso66472', 'oasis-tcs/csaf#210'],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'involvements',
                  fullName: ['vulnerabilities', 'involvements'],
                  title: 'List of involvements',
                  type: 'ARRAY',
                  description: 'Contains a list of involvements.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    uniqueItems: true,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'involvements'],
                      title: 'Involvement',
                      type: 'OBJECT',
                      description:
                        'Is a container, that allows the document producers to comment on the level of involvement (or engagement) of themselves or third parties in the vulnerability identification, scoping, and remediation process.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'date',
                            ],
                            type: 'DATETIME',
                            title: 'Date of involvement',
                            description:
                              'Holds the date and time of the involvement entry.',
                            mandatory: false,
                            metaInfo: {},
                          },
                          {
                            key: 'party',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'party',
                            ],
                            type: 'STRING',
                            title: 'Party category',
                            description:
                              'Defines the category of the involved party.',
                            mandatory: true,
                            metaInfo: {
                              enumValues: [
                                'coordinator',
                                'discoverer',
                                'other',
                                'user',
                                'vendor',
                              ],
                            },
                          },
                          {
                            key: 'status',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'status',
                            ],
                            type: 'STRING',
                            title: 'Party status',
                            description:
                              'Defines contact status of the involved party.',
                            mandatory: true,
                            metaInfo: {
                              enumValues: [
                                'completed',
                                'contact_attempted',
                                'disputed',
                                'in_progress',
                                'not_contacted',
                                'open',
                              ],
                            },
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'summary',
                            ],
                            type: 'STRING',
                            title: 'Summary of the involvement',
                            description:
                              'Contains additional context regarding what is going on.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'notes',
                  fullName: ['vulnerabilities', 'notes'],
                  title: 'List of notes',
                  type: 'ARRAY',
                  description:
                    'Contains notes which are specific to the current context.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'notes'],
                      title: 'Note',
                      type: 'OBJECT',
                      description:
                        'Is a place to put all manner of text blobs related to the current context.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'audience',
                            fullName: ['vulnerabilities', 'notes', 'audience'],
                            type: 'STRING',
                            title: 'Audience of note',
                            description:
                              'Indicates who is intended to read it.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: [
                                'all',
                                'executives',
                                'operational management and system administrators',
                                'safety engineers',
                              ],
                            },
                          },
                          {
                            key: 'category',
                            fullName: ['vulnerabilities', 'notes', 'category'],
                            type: 'STRING',
                            title: 'Note category',
                            description:
                              'Contains the information of what kind of note this is.',
                            mandatory: true,
                            metaInfo: {
                              enumValues: [
                                'description',
                                'details',
                                'faq',
                                'general',
                                'legal_disclaimer',
                                'other',
                                'summary',
                              ],
                            },
                          },
                          {
                            key: 'text',
                            fullName: ['vulnerabilities', 'notes', 'text'],
                            type: 'STRING',
                            title: 'Note content',
                            description:
                              'Holds the content of the note. Content varies depending on type.',
                            mandatory: true,
                            metaInfo: {
                              minLength: 1,
                            },
                          },
                          {
                            key: 'title',
                            fullName: ['vulnerabilities', 'notes', 'title'],
                            type: 'STRING',
                            title: 'Title of note',
                            description:
                              'Provides a concise description of what is contained in the text of the note.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: [
                                'Details',
                                'Executive summary',
                                'Technical summary',
                                'Impact on safety systems',
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                  refTitle: 'Vulnerability notes',
                  refDescription:
                    'Holds notes associated with this vulnerability item.',
                },
                {
                  key: 'product_status',
                  fullName: ['vulnerabilities', 'product_status'],
                  title: 'Product status',
                  type: 'OBJECT',
                  description:
                    'Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability. ',
                  mandatory: false,
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'first_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'first_affected',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'first_affected',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'First affected',
                        refDescription:
                          'These are the first versions of the releases known to be affected by the vulnerability.',
                      },
                      {
                        key: 'first_fixed',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'first_fixed',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'first_fixed',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'First fixed',
                        refDescription:
                          'These versions contain the first fix for the vulnerability but may not be the recommended fixed versions.',
                      },
                      {
                        key: 'fixed',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'fixed',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'fixed',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'Fixed',
                        refDescription:
                          'These versions contain a fix for the vulnerability but may not be the recommended fixed versions.',
                      },
                      {
                        key: 'known_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'known_affected',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'known_affected',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'Known affected',
                        refDescription:
                          'These versions are known to be affected by the vulnerability.',
                      },
                      {
                        key: 'known_not_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'known_not_affected',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'known_not_affected',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'Known not affected',
                        refDescription:
                          'These versions are known not to be affected by the vulnerability.',
                      },
                      {
                        key: 'last_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'last_affected',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'last_affected',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'Last affected',
                        refDescription:
                          'These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability.',
                      },
                      {
                        key: 'recommended',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'recommended',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'recommended',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'Recommended',
                        refDescription:
                          'These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability.',
                      },
                      {
                        key: 'under_investigation',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'under_investigation',
                        ],
                        title: 'List of product_ids',
                        type: 'ARRAY',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        mandatory: false,
                        metaInfo: {
                          minItem: 1,
                          uniqueItems: true,
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'under_investigation',
                            ],
                            type: 'STRING',
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            mandatory: false,
                            metaInfo: {
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            },
                          },
                        },
                        refTitle: 'Under investigation',
                        refDescription:
                          'It is not known yet whether these versions are or are not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document.',
                      },
                    ],
                    minProperties: 1,
                  },
                },
                {
                  key: 'references',
                  fullName: ['vulnerabilities', 'references'],
                  title: 'List of references',
                  type: 'ARRAY',
                  description: 'Holds a list of references.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'references'],
                      title: 'Reference',
                      type: 'OBJECT',
                      description:
                        'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'references',
                              'category',
                            ],
                            type: 'STRING',
                            title: 'Category of reference',
                            description:
                              'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
                            mandatory: false,
                            metaInfo: {
                              enumValues: ['external', 'self'],
                              default: 'external',
                            },
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'references',
                              'summary',
                            ],
                            type: 'STRING',
                            title: 'Summary of the reference',
                            description:
                              'Indicates what this reference refers to.',
                            mandatory: true,
                            metaInfo: {
                              minLength: 1,
                            },
                          },
                          {
                            key: 'url',
                            fullName: ['vulnerabilities', 'references', 'url'],
                            type: 'URI',
                            title: 'URL of reference',
                            description: 'Provides the URL for the reference.',
                            mandatory: true,
                            metaInfo: {},
                          },
                        ],
                      },
                    },
                  },
                  refTitle: 'Vulnerability references',
                  refDescription:
                    'Holds a list of references associated with this vulnerability item.',
                },
                {
                  key: 'release_date',
                  fullName: ['vulnerabilities', 'release_date'],
                  type: 'DATETIME',
                  title: 'Release date',
                  description:
                    'Holds the date and time the vulnerability was originally released into the wild.',
                  mandatory: false,
                  metaInfo: {},
                },
                {
                  key: 'remediations',
                  fullName: ['vulnerabilities', 'remediations'],
                  title: 'List of remediations',
                  type: 'ARRAY',
                  description: 'Contains a list of remediations.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'remediations'],
                      title: 'Remediation',
                      type: 'OBJECT',
                      description:
                        'Specifies details on how to handle (and presumably, fix) a vulnerability.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'category',
                            ],
                            type: 'STRING',
                            title: 'Category of the remediation',
                            description:
                              'Specifies the category which this remediation belongs to.',
                            mandatory: true,
                            metaInfo: {
                              enumValues: [
                                'mitigation',
                                'no_fix_planned',
                                'none_available',
                                'vendor_fix',
                                'workaround',
                              ],
                            },
                          },
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'date',
                            ],
                            type: 'DATETIME',
                            title: 'Date of the remediation',
                            description:
                              'Contains the date from which the remediation is available.',
                            mandatory: false,
                            metaInfo: {},
                          },
                          {
                            key: 'details',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'details',
                            ],
                            type: 'STRING',
                            title: 'Details of the remediation',
                            description:
                              'Contains a thorough human-readable discussion of the remediation.',
                            mandatory: true,
                            metaInfo: {
                              minLength: 1,
                            },
                          },
                          {
                            key: 'entitlements',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'entitlements',
                            ],
                            title: 'List of entitlements',
                            type: 'ARRAY',
                            description: 'Contains a list of entitlements.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'entitlements',
                                ],
                                type: 'STRING',
                                title: 'Entitlement of the remediation',
                                description:
                                  'Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                },
                              },
                            },
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'group_ids',
                                ],
                                type: 'STRING',
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: [
                                    'CSAFGID-0001',
                                    'CSAFGID-0002',
                                    'CSAFGID-0020',
                                  ],
                                },
                              },
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'product_ids',
                                ],
                                type: 'STRING',
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                },
                              },
                            },
                          },
                          {
                            key: 'restart_required',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'restart_required',
                            ],
                            title: 'Restart required by remediation',
                            type: 'OBJECT',
                            description:
                              'Provides information on category of restart is required by this remediation to become effective.',
                            mandatory: false,
                            metaInfo: {
                              propertyList: [
                                {
                                  key: 'category',
                                  fullName: [
                                    'vulnerabilities',
                                    'remediations',
                                    'restart_required',
                                    'category',
                                  ],
                                  type: 'STRING',
                                  title: 'Category of restart',
                                  description:
                                    'Specifies what category of restart is required by this remediation to become effective.',
                                  mandatory: true,
                                  metaInfo: {
                                    enumValues: [
                                      'connected',
                                      'dependencies',
                                      'machine',
                                      'none',
                                      'parent',
                                      'service',
                                      'system',
                                      'vulnerable_component',
                                      'zone',
                                    ],
                                  },
                                },
                                {
                                  key: 'details',
                                  fullName: [
                                    'vulnerabilities',
                                    'remediations',
                                    'restart_required',
                                    'details',
                                  ],
                                  type: 'STRING',
                                  title: 'Additional restart information',
                                  description:
                                    'Provides additional information for the restart. This can include details on procedures, scope or impact.',
                                  mandatory: false,
                                  metaInfo: {
                                    minLength: 1,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            key: 'url',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'url',
                            ],
                            type: 'URI',
                            title: 'URL to the remediation',
                            description:
                              'Contains the URL where to obtain the remediation.',
                            mandatory: false,
                            metaInfo: {},
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'scores',
                  fullName: ['vulnerabilities', 'scores'],
                  title: 'List of scores',
                  type: 'ARRAY',
                  description:
                    'Contains score objects for the current vulnerability.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'scores'],
                      title: 'Score',
                      type: 'OBJECT',
                      description:
                        'Specifies information about (at least one) score of the vulnerability and for which products the given value applies.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'cvss_v2',
                            fullName: ['vulnerabilities', 'scores', 'cvss_v2'],
                            title:
                              'JSON Schema for Common Vulnerability Scoring System version 2.0',
                            type: 'OBJECT',
                            mandatory: false,
                            metaInfo: {
                              propertyList: [
                                {
                                  key: 'version',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'version',
                                  ],
                                  type: 'STRING',
                                  description: 'CVSS Version',
                                  mandatory: true,
                                  metaInfo: {
                                    enumValues: ['2.0'],
                                  },
                                },
                                {
                                  key: 'vectorString',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'vectorString',
                                  ],
                                  type: 'STRING',
                                  mandatory: true,
                                  metaInfo: {
                                    pattern:
                                      '^((AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))/)*(AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))$',
                                  },
                                },
                                {
                                  key: 'accessVector',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'accessVector',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NETWORK',
                                      'ADJACENT_NETWORK',
                                      'LOCAL',
                                    ],
                                  },
                                },
                                {
                                  key: 'accessComplexity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'accessComplexity',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['HIGH', 'MEDIUM', 'LOW'],
                                  },
                                },
                                {
                                  key: 'authentication',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'authentication',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['MULTIPLE', 'SINGLE', 'NONE'],
                                  },
                                },
                                {
                                  key: 'confidentialityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'confidentialityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'PARTIAL', 'COMPLETE'],
                                  },
                                },
                                {
                                  key: 'integrityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'integrityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'PARTIAL', 'COMPLETE'],
                                  },
                                },
                                {
                                  key: 'availabilityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'availabilityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'PARTIAL', 'COMPLETE'],
                                  },
                                },
                                {
                                  key: 'exploitability',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'exploitability',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'UNPROVEN',
                                      'PROOF_OF_CONCEPT',
                                      'FUNCTIONAL',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'remediationLevel',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'remediationLevel',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'OFFICIAL_FIX',
                                      'TEMPORARY_FIX',
                                      'WORKAROUND',
                                      'UNAVAILABLE',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'reportConfidence',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'reportConfidence',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'UNCONFIRMED',
                                      'UNCORROBORATED',
                                      'CONFIRMED',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'collateralDamagePotential',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'collateralDamagePotential',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'LOW_MEDIUM',
                                      'MEDIUM_HIGH',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'targetDistribution',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'targetDistribution',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'confidentialityRequirement',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'confidentialityRequirement',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'integrityRequirement',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'integrityRequirement',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'availabilityRequirement',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v2',
                                    'availabilityRequirement',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            key: 'cvss_v3',
                            fullName: ['vulnerabilities', 'scores', 'cvss_v3'],
                            title:
                              'JSON Schema for Common Vulnerability Scoring System version 3.1',
                            type: 'OBJECT',
                            mandatory: false,
                            metaInfo: {
                              propertyList: [
                                {
                                  key: 'version',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'version',
                                  ],
                                  type: 'STRING',
                                  description: 'CVSS Version',
                                  mandatory: true,
                                  metaInfo: {
                                    enumValues: ['3.1'],
                                  },
                                },
                                {
                                  key: 'vectorString',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'vectorString',
                                  ],
                                  type: 'STRING',
                                  mandatory: true,
                                  metaInfo: {
                                    pattern:
                                      '^CVSS:3[.]1/((AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$',
                                  },
                                },
                                {
                                  key: 'attackVector',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'attackVector',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NETWORK',
                                      'ADJACENT_NETWORK',
                                      'LOCAL',
                                      'PHYSICAL',
                                    ],
                                  },
                                },
                                {
                                  key: 'attackComplexity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'attackComplexity',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['HIGH', 'LOW'],
                                  },
                                },
                                {
                                  key: 'privilegesRequired',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'privilegesRequired',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['HIGH', 'LOW', 'NONE'],
                                  },
                                },
                                {
                                  key: 'userInteraction',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'userInteraction',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'REQUIRED'],
                                  },
                                },
                                {
                                  key: 'scope',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'scope',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['UNCHANGED', 'CHANGED'],
                                  },
                                },
                                {
                                  key: 'confidentialityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'confidentialityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'LOW', 'HIGH'],
                                  },
                                },
                                {
                                  key: 'integrityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'integrityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'LOW', 'HIGH'],
                                  },
                                },
                                {
                                  key: 'availabilityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'availabilityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['NONE', 'LOW', 'HIGH'],
                                  },
                                },
                                {
                                  key: 'baseSeverity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'baseSeverity',
                                  ],
                                  type: 'STRING',
                                  mandatory: true,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'CRITICAL',
                                    ],
                                  },
                                },
                                {
                                  key: 'exploitCodeMaturity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'exploitCodeMaturity',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'UNPROVEN',
                                      'PROOF_OF_CONCEPT',
                                      'FUNCTIONAL',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'remediationLevel',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'remediationLevel',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'OFFICIAL_FIX',
                                      'TEMPORARY_FIX',
                                      'WORKAROUND',
                                      'UNAVAILABLE',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'reportConfidence',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'reportConfidence',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'UNKNOWN',
                                      'REASONABLE',
                                      'CONFIRMED',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'temporalSeverity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'temporalSeverity',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'CRITICAL',
                                    ],
                                  },
                                },
                                {
                                  key: 'confidentialityRequirement',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'confidentialityRequirement',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'integrityRequirement',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'integrityRequirement',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'availabilityRequirement',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'availabilityRequirement',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedAttackVector',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedAttackVector',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NETWORK',
                                      'ADJACENT_NETWORK',
                                      'LOCAL',
                                      'PHYSICAL',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedAttackComplexity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedAttackComplexity',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: ['HIGH', 'LOW', 'NOT_DEFINED'],
                                  },
                                },
                                {
                                  key: 'modifiedPrivilegesRequired',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedPrivilegesRequired',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'HIGH',
                                      'LOW',
                                      'NONE',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedUserInteraction',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedUserInteraction',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'REQUIRED',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedScope',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedScope',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'UNCHANGED',
                                      'CHANGED',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedConfidentialityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedConfidentialityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedIntegrityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedIntegrityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'modifiedAvailabilityImpact',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'modifiedAvailabilityImpact',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'HIGH',
                                      'NOT_DEFINED',
                                    ],
                                  },
                                },
                                {
                                  key: 'environmentalSeverity',
                                  fullName: [
                                    'vulnerabilities',
                                    'scores',
                                    'cvss_v3',
                                    'environmentalSeverity',
                                  ],
                                  type: 'STRING',
                                  mandatory: false,
                                  metaInfo: {
                                    enumValues: [
                                      'NONE',
                                      'LOW',
                                      'MEDIUM',
                                      'HIGH',
                                      'CRITICAL',
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            key: 'products',
                            fullName: ['vulnerabilities', 'scores', 'products'],
                            title: 'List of product_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            mandatory: true,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'scores',
                                  'products',
                                ],
                                type: 'STRING',
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                },
                              },
                            },
                          },
                        ],
                        minProperties: 2,
                      },
                    },
                  },
                },
                {
                  key: 'threats',
                  fullName: ['vulnerabilities', 'threats'],
                  title: 'List of threats',
                  type: 'ARRAY',
                  description:
                    'Contains information about a vulnerability that can change with time.',
                  mandatory: false,
                  metaInfo: {
                    minItem: 1,
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'threats'],
                      title: 'Threat',
                      type: 'OBJECT',
                      description:
                        'Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available.',
                      mandatory: false,
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'category',
                            ],
                            type: 'STRING',
                            title: 'Category of the threat',
                            description:
                              'Categorizes the threat according to the rules of the specification.',
                            mandatory: true,
                            metaInfo: {
                              enumValues: [
                                'exploit_status',
                                'impact',
                                'target_set',
                              ],
                            },
                          },
                          {
                            key: 'date',
                            fullName: ['vulnerabilities', 'threats', 'date'],
                            type: 'DATETIME',
                            title: 'Date of the threat',
                            description:
                              'Contains the date when the assessment was done or the threat appeared.',
                            mandatory: false,
                            metaInfo: {},
                          },
                          {
                            key: 'details',
                            fullName: ['vulnerabilities', 'threats', 'details'],
                            type: 'STRING',
                            title: 'Details of the threat',
                            description:
                              'Represents a thorough human-readable discussion of the threat.',
                            mandatory: true,
                            metaInfo: {
                              minLength: 1,
                            },
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'threats',
                                  'group_ids',
                                ],
                                type: 'STRING',
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: [
                                    'CSAFGID-0001',
                                    'CSAFGID-0002',
                                    'CSAFGID-0020',
                                  ],
                                },
                              },
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            type: 'ARRAY',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            mandatory: false,
                            metaInfo: {
                              minItem: 1,
                              uniqueItems: true,
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'threats',
                                  'product_ids',
                                ],
                                type: 'STRING',
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                mandatory: false,
                                metaInfo: {
                                  minLength: 1,
                                  examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'title',
                  fullName: ['vulnerabilities', 'title'],
                  type: 'STRING',
                  title: 'Title',
                  description:
                    'Gives the document producer the ability to apply a canonical name or title to the vulnerability.',
                  mandatory: false,
                  metaInfo: {
                    minLength: 1,
                  },
                },
              ],
              minProperties: 1,
            },
          },
        },
      },
    ],
  },
}
