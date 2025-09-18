/** @type {import('#lib/app/SecvisogramPage/shared/types.js').Property} */
export default {
  key: '',
  fullName: [],
  title: 'Common Security Advisory Framework',
  description:
    'Representation of security advisory information as a JSON document.',
  addMenuItemsForChildObjects: true,
  metaData: { addMenuItemsForChildObjects: true },
  type: 'OBJECT',
  metaInfo: {
    propertyList: [
      {
        key: '$schema',
        fullName: ['$schema'],
        title: 'JSON schema',
        description:
          'Contains the URL of the CSAF JSON schema which the document promises to be valid for.',
        metaData: {
          uiType: 'STRING_URI',
          userDocumentation: {
            specification: 'docs/user/document-spec.en.md',
            usage: 'docs/user/document-usage.en.md',
          },
          i18n: {
            title: 'v2_1.SchemaTitle',
            description: 'v2_1.SchemaDescription',
          },
          relevanceLevels: {
            csaf_base: 'mandatory',
            csaf_security_incident_response: 'mandatory',
            csaf_informational_advisory: 'mandatory',
            csaf_security_advisory: 'mandatory',
            csaf_vex: 'mandatory',
          },
        },
        enum: ['https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json'],
        metaInfo: {},
        type: 'STRING',
      },
      {
        key: 'document',
        fullName: ['document'],
        title: 'Document level meta-data',
        description:
          'Captures the meta-data about this document describing a particular set of security advisories.',
        metaData: {
          userDocumentation: {
            specification: 'docs/user/document-spec.en.md',
            usage: 'docs/user/document-usage.en.md',
          },
          i18n: {
            title: 'v2_1.DocumentTitle',
            description: 'v2_1.DocumentDescription',
          },
          relevanceLevels: {
            csaf_base: 'mandatory',
            csaf_security_incident_response: 'mandatory',
            csaf_informational_advisory: 'mandatory',
            csaf_security_advisory: 'mandatory',
            csaf_vex: 'mandatory',
          },
        },
        type: 'OBJECT',
        metaInfo: {
          propertyList: [
            {
              key: 'acknowledgments',
              fullName: ['document', 'acknowledgments'],
              title: 'Document acknowledgments',
              description:
                'Contains a list of acknowledgment elements associated with the whole document.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/document/acknowledgments-spec.en.md',
                  usage: 'docs/user/document/acknowledgments-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'optional',
                  csaf_security_incident_response: 'optional',
                  csaf_informational_advisory: 'optional',
                  csaf_security_advisory: 'best_practice',
                  csaf_vex: 'want_to_have',
                },
                i18n: {
                  title: 'v2_1.DocumentAcknowledgmentsTitle',
                  description: 'v2_1.DocumentAcknowledgmentsDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['document', 'acknowledgments'],
                  title: 'Acknowledgment',
                  description:
                    'Acknowledges contributions by describing those that contributed.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/acknowledgments/acknowledgment-spec.en.md',
                      usage:
                        'docs/user/types/acknowledgments/acknowledgment-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.AcknowledgmentsItemsTitle',
                      description: 'v2_1.AcknowledgmentsItemsDescription',
                    },
                    itemName: {
                      itemNameTranslationKey: 'arrays.acknowledgmentsItemName',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'optional',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'want_to_have',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'names',
                        fullName: ['document', 'acknowledgments', 'names'],
                        title: 'List of acknowledged names',
                        description:
                          'Contains the names of contributors being recognized.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/acknowledgments/acknowledgment/names-spec.en.md',
                            usage:
                              'docs/user/types/acknowledgments/acknowledgment/names-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'want_to_have',
                            csaf_informational_advisory: 'want_to_have',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'want_to_have',
                          },
                          i18n: {
                            title: 'v2_1.AcknowledgmentsItemsNamesTitle',
                            description:
                              'v2_1.AcknowledgmentsItemsNamesDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: ['document', 'acknowledgments', 'names'],
                            title: 'Name of the contributor',
                            description:
                              'Contains the name of a single contributor being recognized.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/types/acknowledgments/acknowledgment/names/name-spec.en.md',
                                usage:
                                  'docs/user/types/acknowledgments/acknowledgment/names/name-usage.en.md',
                              },
                              i18n: {
                                title:
                                  'v2_1.AcknowledgmentsItemsNamesItemsTitle',
                                description:
                                  'v2_1.AcknowledgmentsItemsNamesItemsDescription',
                              },
                              itemName: {
                                itemNameTranslationKey: 'arrays.namesItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'want_to_have',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'want_to_have',
                              },
                            },
                            minLength: 1,
                            examples: [
                              'Albert Einstein',
                              'Johann Sebastian Bach',
                            ],
                            metaInfo: {},
                            type: 'STRING',
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
                        title: 'Contributing organization',
                        description:
                          'Contains the name of a contributing organization being recognized.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/acknowledgments/acknowledgment/organization-spec.en.md',
                            usage:
                              'docs/user/types/acknowledgments/acknowledgment/organization-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'nice_to_know',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'nice_to_know',
                          },
                          i18n: {
                            title: 'v2_1.AcknowledgmentsItemsOrganizationTitle',
                            description:
                              'v2_1.AcknowledgmentsItemsOrganizationDescription',
                          },
                        },
                        minLength: 1,
                        examples: ['CISA', 'Google Project Zero', 'Talos'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'summary',
                        fullName: ['document', 'acknowledgments', 'summary'],
                        title: 'Summary of the acknowledgment',
                        description:
                          'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
                        metaData: {
                          uiType: 'STRING_MULTI_LINE',
                          userDocumentation: {
                            specification:
                              'docs/user/types/acknowledgments/acknowledgment/summary-spec.en.md',
                            usage:
                              'docs/user/types/acknowledgments/acknowledgment/summary-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'nice_to_know',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'nice_to_know',
                          },
                          i18n: {
                            title: 'v2_1.AcknowledgmentsItemsSummaryTitle',
                            description:
                              'v2_1.AcknowledgmentsItemsSummaryDescription',
                          },
                        },
                        minLength: 1,
                        examples: [
                          'First analysis of Coordinated Multi-Stream Attack (CMSA)',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'urls',
                        fullName: ['document', 'acknowledgments', 'urls'],
                        title: 'List of URLs',
                        description:
                          'Specifies a list of URLs or location of the reference to be acknowledged.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/acknowledgments/acknowledgment/urls-spec.en.md',
                            usage:
                              'docs/user/types/acknowledgments/acknowledgment/urls-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'nice_to_know',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'nice_to_know',
                          },
                          i18n: {
                            title: 'v2_1.AcknowledgmentsItemsUrlsTitle',
                            description:
                              'v2_1.AcknowledgmentsItemsUrlsDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: ['document', 'acknowledgments', 'urls'],
                            title: 'URL of acknowledgment',
                            description:
                              'Contains the URL or location of the reference to be acknowledged.',
                            metaData: {
                              uiType: 'STRING_URI',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/acknowledgments/acknowledgment/urls/url-spec.en.md',
                                usage:
                                  'docs/user/types/acknowledgments/acknowledgment/urls/url-usage.en.md',
                              },
                              i18n: {
                                title:
                                  'v2_1.AcknowledgmentsItemsUrlsItemsTitle',
                                description:
                                  'v2_1.AcknowledgmentsItemsUrlsItemsDescription',
                              },
                              itemName: {
                                itemNameTranslationKey: 'arrays.urlsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'nice_to_know',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'nice_to_know',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'aggregate_severity',
              fullName: ['document', 'aggregate_severity'],
              title: 'Aggregate severity',
              description:
                "Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole — not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures.",
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/document/aggregate_severity-spec.en.md',
                  usage: 'docs/user/document/aggregate_severity-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'optional',
                  csaf_security_incident_response: 'want_to_have',
                  csaf_informational_advisory: 'want_to_have',
                  csaf_security_advisory: 'best_practice',
                  csaf_vex: 'want_to_have',
                },
                i18n: {
                  title: 'v2_1.DocumentAggregateSeverityTitle',
                  description: 'v2_1.DocumentAggregateSeverityDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'namespace',
                    fullName: ['document', 'aggregate_severity', 'namespace'],
                    title: 'Namespace of aggregate severity',
                    description: 'Points to the namespace so referenced.',
                    metaData: {
                      uiType: 'STRING_URI',
                      userDocumentation: {
                        specification:
                          'docs/user/document/aggregate_severity/namespace-spec.en.md',
                        usage:
                          'docs/user/document/aggregate_severity/namespace-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'optional',
                        csaf_security_incident_response: 'nice_to_know',
                        csaf_informational_advisory: 'nice_to_know',
                        csaf_security_advisory: 'want_to_have',
                        csaf_vex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'v2_1.DocumentAggregateSeverityNamespaceTitle',
                        description:
                          'v2_1.DocumentAggregateSeverityNamespaceDescription',
                      },
                    },
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'text',
                    fullName: ['document', 'aggregate_severity', 'text'],
                    title: 'Text of aggregate severity',
                    description:
                      'Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS).',
                    metaData: {
                      uiType: 'STRING_MULTI_LINE',
                      userDocumentation: {
                        specification:
                          'docs/user/document/aggregate_severity/text-spec.en.md',
                        usage:
                          'docs/user/document/aggregate_severity/text-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'optional',
                        csaf_security_incident_response: 'want_to_have',
                        csaf_informational_advisory: 'want_to_have',
                        csaf_security_advisory: 'best_practice',
                        csaf_vex: 'want_to_have',
                      },
                      i18n: {
                        title: 'v2_1.DocumentAggregateSeverityTextTitle',
                        description:
                          'v2_1.DocumentAggregateSeverityTextDescription',
                      },
                    },
                    minLength: 1,
                    examples: ['Critical', 'Important', 'Moderate'],
                    metaInfo: {},
                    type: 'STRING',
                  },
                ],
              },
            },
            {
              key: 'category',
              fullName: ['document', 'category'],
              title: 'Document category',
              description:
                'Defines a short canonical name, chosen by the document producer, which will inform the end user as to the category of document.',
              metaData: {
                uiType: 'STRING_WITH_OPTIONS',
                userDocumentation: {
                  specification: 'docs/user/document/category-spec.en.md',
                  usage: 'docs/user/document/category-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'mandatory',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'mandatory',
                  csaf_vex: 'mandatory',
                },
                i18n: {
                  title: 'v2_1.DocumentCategoryTitle',
                  description: 'v2_1.DocumentCategoryDescription',
                },
                options: [
                  'csaf_base',
                  'csaf_security_incident_response',
                  'csaf_informational_advisory',
                  'csaf_security_advisory',
                  'csaf_vex',
                ],
              },
              minLength: 1,
              examples: [
                'csaf_base',
                'csaf_security_advisory',
                'csaf_vex',
                'Example Company Security Notice',
              ],
              pattern: '^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$',
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'csaf_version',
              fullName: ['document', 'csaf_version'],
              title: 'CSAF version',
              description:
                'Gives the version of the CSAF specification which the document was generated for.',
              metaData: {
                uiType: 'STRING_ENUM',
                userDocumentation: {
                  specification: 'docs/user/document/csaf_version-spec.en.md',
                  usage: 'docs/user/document/csaf_version-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'mandatory',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'mandatory',
                  csaf_vex: 'mandatory',
                },
                i18n: {
                  title: 'v2_1.DocumentCsafVersionTitle',
                  description: 'v2_1.DocumentCsafVersionDescription',
                },
              },
              enum: ['2.1'],
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'distribution',
              fullName: ['document', 'distribution'],
              title: 'Rules for document sharing',
              description:
                'Describe any constraints on how this document might be shared.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/distribution-spec.en.md',
                  usage: 'docs/user/document/distribution-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'want_to_have',
                  csaf_security_incident_response: 'best_practice',
                  csaf_informational_advisory: 'best_practice',
                  csaf_security_advisory: 'best_practice',
                  csaf_vex: 'want_to_have',
                },
                i18n: {
                  title: 'v2_1.DocumentDistributionTitle',
                  description: 'v2_1.DocumentDistributionDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'sharing_group',
                    fullName: ['document', 'distribution', 'sharing_group'],
                    title: 'Sharing Group',
                    description:
                      'Contains information about the group this document is intended to be shared with.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/distribution/sharing_group-spec.en.md',
                        usage:
                          'docs/user/document/distribution/sharing_group-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'want_to_have',
                        csaf_security_incident_response: 'want_to_have',
                        csaf_informational_advisory: 'want_to_have',
                        csaf_security_advisory: 'best_practice',
                        csaf_vex: 'want_to_have',
                      },
                      i18n: {
                        title: 'v2_1.DocumentDistributionSharingGroupTitle',
                        description:
                          'v2_1.DocumentDistributionSharingGroupDescription',
                      },
                    },
                    type: 'OBJECT',
                    metaInfo: {
                      propertyList: [
                        {
                          key: 'id',
                          fullName: [
                            'document',
                            'distribution',
                            'sharing_group',
                            'id',
                          ],
                          title: 'Sharing Group ID',
                          description:
                            'Provides the unique ID for the sharing group.',
                          metaData: {
                            uiType: 'STRING_ENUM',
                            userDocumentation: {
                              specification:
                                'docs/user/document/distribution/sharing_group/id-spec.en.md',
                              usage:
                                'docs/user/document/distribution/sharing_group/id-usage.en.md',
                            },
                            relevanceLevels: {
                              csaf_base: 'mandatory',
                              csaf_security_incident_response: 'mandatory',
                              csaf_informational_advisory: 'mandatory',
                              csaf_security_advisory: 'mandatory',
                              csaf_vex: 'mandatory',
                            },
                            i18n: {
                              title:
                                'v2_1.DocumentDistributionSharingGroupIdTitle',
                              description:
                                'v2_1.DocumentDistributionSharingGroupIdDescription',
                            },
                          },
                          pattern:
                            '^(([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12})|([0]{8}-([0]{4}-){3}[0]{12})|([f]{8}-([f]{4}-){3}[f]{12}))$',
                          metaInfo: {},
                          type: 'STRING',
                        },
                        {
                          key: 'name',
                          fullName: [
                            'document',
                            'distribution',
                            'sharing_group',
                            'name',
                          ],
                          title: 'Sharing Group Name',
                          description:
                            'Contains a human-readable name for the sharing group.',
                          metaData: {
                            userDocumentation: {
                              specification:
                                'docs/user/document/distribution/sharing_group/name-spec.en.md',
                              usage:
                                'docs/user/document/distribution/sharing_group/name-usage.en.md',
                            },
                            relevanceLevels: {
                              csaf_base: 'nice_to_know',
                              csaf_security_incident_response: 'nice_to_know',
                              csaf_informational_advisory: 'nice_to_know',
                              csaf_security_advisory: 'want_to_have',
                              csaf_vex: 'nice_to_know',
                            },
                            i18n: {
                              title:
                                'v2_1.DocumentDistributionSharingGroupNameTitle',
                              description:
                                'v2_1.DocumentDistributionSharingGroupNameDescription',
                            },
                          },
                          minLength: 1,
                          examples: [
                            'Customer A',
                            'ISAC members',
                            'NIS2 regulated important entities in Germany, sector water',
                            'Pre-Sharing group for advisory discussion',
                            'Users of Product A',
                            'US Federal Civilian Authorities',
                          ],
                          metaInfo: {},
                          type: 'STRING',
                        },
                      ],
                    },
                  },
                  {
                    key: 'text',
                    fullName: ['document', 'distribution', 'text'],
                    title: 'Textual description',
                    description:
                      'Provides a textual description of additional constraints.',
                    metaData: {
                      uiType: 'STRING_MULTI_LINE',
                      userDocumentation: {
                        specification:
                          'docs/user/document/distribution/text-spec.en.md',
                        usage:
                          'docs/user/document/distribution/text-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'nice_to_know',
                        csaf_security_incident_response: 'nice_to_know',
                        csaf_informational_advisory: 'nice_to_know',
                        csaf_security_advisory: 'nice_to_know',
                        csaf_vex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'v2_1.DocumentDistributionTextTitle',
                        description: 'v2_1.DocumentDistributionTextDescription',
                      },
                    },
                    minLength: 1,
                    examples: [
                      'Copyright 2021, Example Company, All Rights Reserved.',
                      'Distribute freely.',
                      'Share only on a need-to-know-basis only.',
                    ],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'tlp',
                    fullName: ['document', 'distribution', 'tlp'],
                    title: 'Traffic Light Protocol (TLP)',
                    description:
                      'Provides details about the TLP classification of the document.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/distribution/tlp-spec.en.md',
                        usage:
                          'docs/user/document/distribution/tlp-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'want_to_have',
                        csaf_security_incident_response: 'want_to_have',
                        csaf_informational_advisory: 'want_to_have',
                        csaf_security_advisory: 'best_practice',
                        csaf_vex: 'want_to_have',
                      },
                      i18n: {
                        title: 'v2_1.DocumentDistributionTlpTitle',
                        description: 'v2_1.DocumentDistributionTlpDescription',
                      },
                    },
                    type: 'OBJECT',
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
                          title: 'Label of TLP',
                          description:
                            'Provides the TLP label of the document.',
                          metaData: {
                            uiType: 'STRING_ENUM',
                            userDocumentation: {
                              specification:
                                'docs/user/document/distribution/tlp/label-spec.en.md',
                              usage:
                                'docs/user/document/distribution/tlp/label-usage.en.md',
                            },
                            relevanceLevels: {
                              csaf_base: 'mandatory',
                              csaf_security_incident_response: 'mandatory',
                              csaf_informational_advisory: 'mandatory',
                              csaf_security_advisory: 'mandatory',
                              csaf_vex: 'mandatory',
                            },
                            i18n: {
                              title: 'v2_1.DocumentDistributionTlpLabelTitle',
                              description:
                                'v2_1.DocumentDistributionTlpLabelDescription',
                            },
                          },
                          default: 'CLEAR',
                          enum: [
                            'AMBER',
                            'AMBER+STRICT',
                            'CLEAR',
                            'GREEN',
                            'RED',
                          ],
                          metaInfo: {},
                          type: 'STRING',
                        },
                        {
                          key: 'url',
                          fullName: ['document', 'distribution', 'tlp', 'url'],
                          title: 'URL of TLP version',
                          description:
                            'Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST.',
                          metaData: {
                            uiType: 'STRING_URI',
                            userDocumentation: {
                              specification:
                                'docs/user/document/distribution/tlp/url-spec.en.md',
                              usage:
                                'docs/user/document/distribution/tlp/url-usage.en.md',
                            },
                            relevanceLevels: {
                              csaf_base: 'nice_to_know',
                              csaf_security_incident_response: 'nice_to_know',
                              csaf_informational_advisory: 'nice_to_know',
                              csaf_security_advisory: 'want_to_have',
                              csaf_vex: 'nice_to_know',
                            },
                            i18n: {
                              title: 'v2_1.DocumentDistributionTlpUrlTitle',
                              description:
                                'v2_1.DocumentDistributionTlpUrlDescription',
                            },
                          },
                          examples: [
                            'https://www.us-cert.gov/tlp',
                            'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Kritis/Merkblatt_TLP.pdf',
                          ],
                          default: 'https://www.first.org/tlp/',
                          metaInfo: {},
                          type: 'STRING',
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              key: 'lang',
              fullName: ['document', 'lang'],
              title: 'Document language',
              description:
                'Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/lang-spec.en.md',
                  usage: 'docs/user/document/lang-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'nice_to_know',
                  csaf_security_incident_response: 'nice_to_know',
                  csaf_informational_advisory: 'nice_to_know',
                  csaf_security_advisory: 'want_to_have',
                  csaf_vex: 'want_to_have',
                },
                i18n: {
                  title: 'v2_1.DocumentLangTitle',
                  description: 'v2_1.DocumentLangDescription',
                },
              },
              examples: ['de', 'en', 'fr', 'frc', 'jp'],
              pattern:
                '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'license_expression',
              fullName: ['document', 'license_expression'],
              title: 'License expression',
              description:
                'Contains the SPDX license expression for the CSAF document.',
              metaData: {},
              minLength: 1,
              examples: [
                'CC-BY-4.0',
                'LicenseRef-www.example.org-Example-CSAF-License-3.0+',
                'LicenseRef-scancode-public-domain',
                'MIT OR any-OSI',
              ],
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'notes',
              fullName: ['document', 'notes'],
              title: 'Document notes',
              description: 'Holds notes associated with the whole document.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/notes-spec.en.md',
                  usage: 'docs/user/document/notes-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'want_to_have',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'best_practice',
                  csaf_vex: 'want_to_have',
                },
                i18n: {
                  title: 'v2_1.DocumentNotesTitle',
                  description: 'v2_1.DocumentNotesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['document', 'notes'],
                  title: 'Note',
                  description:
                    'Is a place to put all manner of text blobs related to the current context.',
                  metaData: {
                    userDocumentation: {
                      specification: 'docs/user/types/notes/note-spec.en.md',
                      usage: 'docs/user/types/notes/note-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.NotesItemsTitle',
                      description: 'v2_1.NotesItemsDescription',
                    },
                    itemName: {
                      itemNameTranslationKey: 'arrays.notesItemName',
                      itemNameField: 'title',
                    },
                    relevanceLevels: {
                      csaf_base: 'want_to_have',
                      csaf_security_incident_response: 'mandatory',
                      csaf_informational_advisory: 'mandatory',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'want_to_have',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'audience',
                        fullName: ['document', 'notes', 'audience'],
                        title: 'Audience of note',
                        description: 'Indicates who is intended to read it.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/notes/note/audience-spec.en.md',
                            usage:
                              'docs/user/types/notes/note/audience-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'optional',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'nice_to_know',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'nice_to_know',
                          },
                          i18n: {
                            title: 'v2_1.NotesItemsAudienceTitle',
                            description: 'v2_1.NotesItemsAudienceDescription',
                          },
                        },
                        minLength: 1,
                        examples: [
                          'all',
                          'executives',
                          'operational management and system administrators',
                          'safety engineers',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'category',
                        fullName: ['document', 'notes', 'category'],
                        title: 'Note category',
                        description:
                          'Contains the information of what kind of note this is.',
                        metaData: {
                          uiType: 'STRING_ENUM',
                          userDocumentation: {
                            specification:
                              'docs/user/types/notes/note/category-spec.en.md',
                            usage:
                              'docs/user/types/notes/note/category-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.NotesItemsCategoryTitle',
                            description: 'v2_1.NotesItemsCategoryDescription',
                          },
                        },
                        enum: [
                          'description',
                          'details',
                          'faq',
                          'general',
                          'legal_disclaimer',
                          'other',
                          'summary',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'group_ids',
                        fullName: ['document', 'notes', 'group_ids'],
                        title: 'List of product_group_ids',
                        description:
                          'Specifies a list of product_group_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: ['document', 'notes', 'group_ids'],
                            title: 'Reference token for product group instance',
                            description:
                              'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                            metaData: {},
                            minLength: 1,
                            examples: [
                              'CSAFGID-0001',
                              'CSAFGID-0002',
                              'CSAFGID-0020',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'product_ids',
                        fullName: ['document', 'notes', 'product_ids'],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: ['document', 'notes', 'product_ids'],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {},
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'text',
                        fullName: ['document', 'notes', 'text'],
                        title: 'Note content',
                        description:
                          'Holds the content of the note. Content varies depending on type.',
                        metaData: {
                          uiType: 'STRING_MULTI_LINE',
                          userDocumentation: {
                            specification:
                              'docs/user/types/notes/note/text-spec.en.md',
                            usage:
                              'docs/user/types/notes/note/text-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.NotesItemsTextTitle',
                            description: 'v2_1.NotesItemsTextDescription',
                          },
                        },
                        minLength: 1,
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'title',
                        fullName: ['document', 'notes', 'title'],
                        title: 'Title of note',
                        description:
                          'Provides a concise description of what is contained in the text of the note.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/notes/note/title-spec.en.md',
                            usage:
                              'docs/user/types/notes/note/title-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'best_practice',
                            csaf_security_incident_response: 'best_practice',
                            csaf_informational_advisory: 'best_practice',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'best_practice',
                          },
                          i18n: {
                            title: 'v2_1.NotesItemsTitleTitle',
                            description: 'v2_1.NotesItemsTitleDescription',
                          },
                        },
                        minLength: 1,
                        examples: [
                          'Details',
                          'Executive summary',
                          'Technical summary',
                          'Impact on safety systems',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'publisher',
              fullName: ['document', 'publisher'],
              title: 'Publisher',
              description:
                'Provides information about the publisher of the document.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/publisher-spec.en.md',
                  usage: 'docs/user/document/publisher-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'mandatory',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'mandatory',
                  csaf_vex: 'mandatory',
                },
                i18n: {
                  title: 'v2_1.DocumentPublisherTitle',
                  description: 'v2_1.DocumentPublisherDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'category',
                    fullName: ['document', 'publisher', 'category'],
                    title: 'Category of publisher',
                    description:
                      'Provides information about the category of publisher releasing the document.',
                    metaData: {
                      uiType: 'STRING_ENUM',
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/category-spec.en.md',
                        usage:
                          'docs/user/document/publisher/category-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentPublisherCategoryTitle',
                        description:
                          'v2_1.DocumentPublisherCategoryDescription',
                      },
                    },
                    enum: [
                      'coordinator',
                      'discoverer',
                      'multiplier',
                      'other',
                      'translator',
                      'user',
                      'vendor',
                    ],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'contact_details',
                    fullName: ['document', 'publisher', 'contact_details'],
                    title: 'Contact details',
                    description:
                      'Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses.',
                    metaData: {
                      uiType: 'STRING_MULTI_LINE',
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/contact_details-spec.en.md',
                        usage:
                          'docs/user/document/publisher/contact_details-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'want_to_have',
                        csaf_security_incident_response: 'want_to_have',
                        csaf_informational_advisory: 'want_to_have',
                        csaf_security_advisory: 'best_practice',
                        csaf_vex: 'best_practice',
                      },
                      i18n: {
                        title: 'v2_1.DocumentPublisherContactDetailsTitle',
                        description:
                          'v2_1.DocumentPublisherContactDetailsDescription',
                      },
                    },
                    minLength: 1,
                    examples: [
                      'Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact.',
                    ],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'issuing_authority',
                    fullName: ['document', 'publisher', 'issuing_authority'],
                    title: 'Issuing authority',
                    description:
                      "Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations.",
                    metaData: {
                      uiType: 'STRING_MULTI_LINE',
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/issuing_authority-spec.en.md',
                        usage:
                          'docs/user/document/publisher/issuing_authority-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'nice_to_know',
                        csaf_security_incident_response: 'nice_to_know',
                        csaf_informational_advisory: 'nice_to_know',
                        csaf_security_advisory: 'want_to_have',
                        csaf_vex: 'want_to_have',
                      },
                      i18n: {
                        title: 'v2_1.DocumentPublisherIssuingAuthorityTitle',
                        description:
                          'v2_1.DocumentPublisherIssuingAuthorityDescription',
                      },
                    },
                    minLength: 1,
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'name',
                    fullName: ['document', 'publisher', 'name'],
                    title: 'Name of publisher',
                    description: 'Contains the name of the issuing party.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/name-spec.en.md',
                        usage: 'docs/user/document/publisher/name-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentPublisherNameTitle',
                        description: 'v2_1.DocumentPublisherNameDescription',
                      },
                    },
                    minLength: 1,
                    examples: ['BSI', 'Cisco PSIRT', 'Siemens ProductCERT'],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'namespace',
                    fullName: ['document', 'publisher', 'namespace'],
                    title: 'Namespace of publisher',
                    description:
                      'Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party.',
                    metaData: {
                      uiType: 'STRING_URI',
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/namespace-spec.en.md',
                        usage:
                          'docs/user/document/publisher/namespace-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentPublisherNamespaceTitle',
                        description:
                          'v2_1.DocumentPublisherNamespaceDescription',
                      },
                    },
                    examples: ['https://csaf.io', 'https://www.example.com'],
                    metaInfo: {},
                    type: 'STRING',
                  },
                ],
              },
            },
            {
              key: 'references',
              fullName: ['document', 'references'],
              title: 'Document references',
              description:
                'Holds a list of references associated with the whole document.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/references-spec.en.md',
                  usage: 'docs/user/document/references-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'want_to_have',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'best_practice',
                  csaf_vex: 'best_practice',
                },
                i18n: {
                  title: 'v2_1.DocumentReferencesTitle',
                  description: 'v2_1.DocumentReferencesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['document', 'references'],
                  title: 'Reference',
                  description:
                    'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/references/reference-spec.en.md',
                      usage: 'docs/user/types/references/reference-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.ReferencesItemsTitle',
                      description: 'v2_1.ReferencesItemsDescription',
                    },
                    itemName: {
                      itemNameTranslationKey: 'arrays.referencesItemName',
                    },
                    relevanceLevels: {
                      csaf_base: 'want_to_have',
                      csaf_security_incident_response: 'mandatory',
                      csaf_informational_advisory: 'mandatory',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'best_practice',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'category',
                        fullName: ['document', 'references', 'category'],
                        title: 'Category of reference',
                        description:
                          'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
                        metaData: {
                          uiType: 'STRING_ENUM',
                          userDocumentation: {
                            specification:
                              'docs/user/types/references/reference/category-spec.en.md',
                            usage:
                              'docs/user/types/references/reference/category-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'optional',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'nice_to_know',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'nice_to_know',
                          },
                          i18n: {
                            title: 'v2_1.ReferencesItemsCategoryTitle',
                            description:
                              'v2_1.ReferencesItemsCategoryDescription',
                          },
                        },
                        default: 'external',
                        enum: ['external', 'self'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'summary',
                        fullName: ['document', 'references', 'summary'],
                        title: 'Summary of the reference',
                        description: 'Indicates what this reference refers to.',
                        metaData: {
                          uiType: 'STRING_MULTI_LINE',
                          userDocumentation: {
                            specification:
                              'docs/user/types/references/reference/summary-spec.en.md',
                            usage:
                              'docs/user/types/references/reference/summary-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.ReferencesItemsSummaryTitle',
                            description:
                              'v2_1.ReferencesItemsSummaryDescription',
                          },
                        },
                        minLength: 1,
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'url',
                        fullName: ['document', 'references', 'url'],
                        title: 'URL of reference',
                        description: 'Provides the URL for the reference.',
                        metaData: {
                          uiType: 'STRING_URI',
                          userDocumentation: {
                            specification:
                              'docs/user/types/references/reference/url-spec.en.md',
                            usage:
                              'docs/user/types/references/reference/url-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.ReferencesItemsUrlTitle',
                            description: 'v2_1.ReferencesItemsUrlDescription',
                          },
                        },
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'source_lang',
              fullName: ['document', 'source_lang'],
              title: 'Source language',
              description:
                'If this copy of the document is a translation then the value of this property describes from which language this document was translated.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/source_lang-spec.en.md',
                  usage: 'docs/user/document/source_lang-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'nice_to_know',
                  csaf_security_incident_response: 'nice_to_know',
                  csaf_informational_advisory: 'nice_to_know',
                  csaf_security_advisory: 'nice_to_know',
                  csaf_vex: 'nice_to_know',
                },
                i18n: {
                  title: 'v2_1.DocumentSourceLangTitle',
                  description: 'v2_1.DocumentSourceLangDescription',
                },
              },
              examples: ['de', 'en', 'fr', 'frc', 'jp'],
              pattern:
                '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'title',
              fullName: ['document', 'title'],
              title: 'Title of this document',
              description:
                'This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/title-spec.en.md',
                  usage: 'docs/user/document/title-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'mandatory',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'mandatory',
                  csaf_vex: 'mandatory',
                },
                i18n: {
                  title: 'v2_1.DocumentTitleTitle',
                  description: 'v2_1.DocumentTitleDescription',
                },
              },
              minLength: 1,
              examples: [
                'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
                'Example Company Cross-Site-Scripting Vulnerability in Example Generator',
              ],
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'tracking',
              fullName: ['document', 'tracking'],
              title: 'Tracking',
              description:
                'Is a container designated to hold all management attributes necessary to track a CSAF document as a whole.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/tracking-spec.en.md',
                  usage: 'docs/user/document/tracking-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'mandatory',
                  csaf_security_incident_response: 'mandatory',
                  csaf_informational_advisory: 'mandatory',
                  csaf_security_advisory: 'mandatory',
                  csaf_vex: 'mandatory',
                },
                i18n: {
                  title: 'v2_1.DocumentTrackingTitle',
                  description: 'v2_1.DocumentTrackingDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'aliases',
                    fullName: ['document', 'tracking', 'aliases'],
                    title: 'Aliases',
                    description:
                      'Contains a list of alternate names for the same document.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/aliases-spec.en.md',
                        usage:
                          'docs/user/document/tracking/aliases-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'optional',
                        csaf_security_incident_response: 'nice_to_know',
                        csaf_informational_advisory: 'nice_to_know',
                        csaf_security_advisory: 'nice_to_know',
                        csaf_vex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingAliasesTitle',
                        description: 'v2_1.DocumentTrackingAliasesDescription',
                      },
                    },
                    type: 'ARRAY',
                    metaInfo: {
                      arrayType: {
                        key: '',
                        fullName: ['document', 'tracking', 'aliases'],
                        title: 'Alternate name',
                        description:
                          'Specifies a non-empty string that represents a distinct optional alternative ID used to refer to the document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/document/tracking/aliases/alias-spec.en.md',
                            usage:
                              'docs/user/document/tracking/aliases/alias-usage.en.md',
                          },
                          i18n: {
                            title: 'v2_1.DocumentTrackingAliasesItemsTitle',
                            description:
                              'v2_1.DocumentTrackingAliasesItemsDescription',
                          },
                          itemName: {
                            itemNameTranslationKey: 'arrays.aliasesItemName',
                          },
                          relevanceLevels: {
                            csaf_base: 'optional',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'nice_to_know',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'nice_to_know',
                          },
                        },
                        minLength: 1,
                        examples: ['CVE-2019-12345'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    },
                  },
                  {
                    key: 'current_release_date',
                    fullName: ['document', 'tracking', 'current_release_date'],
                    title: 'Current release date',
                    description:
                      'The date when the current revision of this document was released',
                    metaData: {
                      uiType: 'STRING_DATETIME',
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/current_release_date-spec.en.md',
                        usage:
                          'docs/user/document/tracking/current_release_date-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingCurrentReleaseDateTitle',
                        description:
                          'v2_1.DocumentTrackingCurrentReleaseDateDescription',
                      },
                    },
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'generator',
                    fullName: ['document', 'tracking', 'generator'],
                    title: 'Document generator',
                    description:
                      'Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/generator-spec.en.md',
                        usage:
                          'docs/user/document/tracking/generator-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'nice_to_know',
                        csaf_security_incident_response: 'nice_to_know',
                        csaf_informational_advisory: 'nice_to_know',
                        csaf_security_advisory: 'nice_to_know',
                        csaf_vex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingGeneratorTitle',
                        description:
                          'v2_1.DocumentTrackingGeneratorDescription',
                      },
                    },
                    type: 'OBJECT',
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
                          title: 'Date of document generation',
                          description:
                            'This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date.',
                          metaData: {
                            uiType: 'STRING_DATETIME',
                            userDocumentation: {
                              specification:
                                'docs/user/document/tracking/generator/date-spec.en.md',
                              usage:
                                'docs/user/document/tracking/generator/date-usage.en.md',
                            },
                            relevanceLevels: {
                              csaf_base: 'nice_to_know',
                              csaf_security_incident_response: 'nice_to_know',
                              csaf_informational_advisory: 'nice_to_know',
                              csaf_security_advisory: 'nice_to_know',
                              csaf_vex: 'nice_to_know',
                            },
                            i18n: {
                              title: 'v2_1.DocumentTrackingGeneratorDateTitle',
                              description:
                                'v2_1.DocumentTrackingGeneratorDateDescription',
                            },
                          },
                          metaInfo: {},
                          type: 'STRING',
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
                          description:
                            'Contains information about the engine that generated the CSAF document.',
                          metaData: {
                            userDocumentation: {
                              specification:
                                'docs/user/document/tracking/generator/engine-spec.en.md',
                              usage:
                                'docs/user/document/tracking/generator/engine-usage.en.md',
                            },
                            relevanceLevels: {
                              csaf_base: 'mandatory',
                              csaf_security_incident_response: 'mandatory',
                              csaf_informational_advisory: 'mandatory',
                              csaf_security_advisory: 'mandatory',
                              csaf_vex: 'mandatory',
                            },
                            i18n: {
                              title:
                                'v2_1.DocumentTrackingGeneratorEngineTitle',
                              description:
                                'v2_1.DocumentTrackingGeneratorEngineDescription',
                            },
                          },
                          type: 'OBJECT',
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
                                title: 'Engine name',
                                description:
                                  'Represents the name of the engine that generated the CSAF document.',
                                metaData: {
                                  userDocumentation: {
                                    specification:
                                      'docs/user/document/tracking/generator/engine/name-spec.en.md',
                                    usage:
                                      'docs/user/document/tracking/generator/engine/name-usage.en.md',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'mandatory',
                                    csaf_security_incident_response:
                                      'mandatory',
                                    csaf_informational_advisory: 'mandatory',
                                    csaf_security_advisory: 'mandatory',
                                    csaf_vex: 'mandatory',
                                  },
                                  i18n: {
                                    title:
                                      'v2_1.DocumentTrackingGeneratorEngineNameTitle',
                                    description:
                                      'v2_1.DocumentTrackingGeneratorEngineNameDescription',
                                  },
                                  disable: {
                                    ifStandaloneMode: false,
                                    ifServerMode: true,
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  'Red Hat rhsa-to-cvrf',
                                  'Secvisogram',
                                  'TVCE',
                                ],
                                metaInfo: {},
                                type: 'STRING',
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
                                title: 'Engine version',
                                description:
                                  'Contains the version of the engine that generated the CSAF document.',
                                metaData: {
                                  userDocumentation: {
                                    specification:
                                      'docs/user/document/tracking/generator/engine/version-spec.en.md',
                                    usage:
                                      'docs/user/document/tracking/generator/engine/version-usage.en.md',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'want_to_have',
                                    csaf_security_incident_response:
                                      'want_to_have',
                                    csaf_informational_advisory: 'want_to_have',
                                    csaf_security_advisory: 'want_to_have',
                                    csaf_vex: 'want_to_have',
                                  },
                                  i18n: {
                                    title:
                                      'v2_1.DocumentTrackingGeneratorEngineVersionTitle',
                                    description:
                                      'v2_1.DocumentTrackingGeneratorEngineVersionDescription',
                                  },
                                  disable: {
                                    ifStandaloneMode: false,
                                    ifServerMode: true,
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  '0.6.0',
                                  '1.0.0-beta+exp.sha.a1c44f85',
                                  '2',
                                ],
                                metaInfo: {},
                                type: 'STRING',
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
                    title: 'Unique identifier for the document',
                    description:
                      'The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/id-spec.en.md',
                        usage: 'docs/user/document/tracking/id-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingIdTitle',
                        description: 'v2_1.DocumentTrackingIdDescription',
                      },
                      disable: { ifStandaloneMode: false, ifServerMode: true },
                    },
                    minLength: 1,
                    examples: [
                      'Example Company - 2019-YH3234',
                      'RHBA-2019:0024',
                      'cisco-sa-20190513-secureboot',
                    ],
                    pattern: '^[\\S](.*[\\S])?$',
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'initial_release_date',
                    fullName: ['document', 'tracking', 'initial_release_date'],
                    title: 'Initial release date',
                    description:
                      'The date when this document was first released to the specified target group.',
                    metaData: {
                      uiType: 'STRING_DATETIME',
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/initial_release_date-spec.en.md',
                        usage:
                          'docs/user/document/tracking/initial_release_date-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingInitialReleaseDateTitle',
                        description:
                          'v2_1.DocumentTrackingInitialReleaseDateDescription',
                      },
                    },
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'revision_history',
                    fullName: ['document', 'tracking', 'revision_history'],
                    title: 'Revision history',
                    description:
                      'Holds one revision item for each version of the CSAF document, including the initial one.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/revision_history-spec.en.md',
                        usage:
                          'docs/user/document/tracking/revision_history-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingRevisionHistoryTitle',
                        description:
                          'v2_1.DocumentTrackingRevisionHistoryDescription',
                      },
                      uiType: 'ARRAY_REVISION_HISTORY',
                    },
                    type: 'ARRAY',
                    metaInfo: {
                      arrayType: {
                        key: '',
                        fullName: ['document', 'tracking', 'revision_history'],
                        title: 'Revision',
                        description:
                          'Contains all the information elements required to track the evolution of a CSAF document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/document/tracking/revision_history/revision-spec.en.md',
                            usage:
                              'docs/user/document/tracking/revision_history/revision-usage.en.md',
                          },
                          i18n: {
                            title:
                              'v2_1.DocumentTrackingRevisionHistoryItemsTitle',
                            description:
                              'v2_1.DocumentTrackingRevisionHistoryItemsDescription',
                          },
                          itemName: {
                            itemNameTranslationKey: 'arrays.revisionsItemName',
                            itemNameField: 'number',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                        },
                        type: 'OBJECT',
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
                              title: 'Date of the revision',
                              description: 'The date of the revision entry',
                              metaData: {
                                uiType: 'STRING_DATETIME',
                                userDocumentation: {
                                  specification:
                                    'docs/user/document/tracking/revision_history/revision/date-spec.en.md',
                                  usage:
                                    'docs/user/document/tracking/revision_history/revision/date-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title:
                                    'v2_1.DocumentTrackingRevisionHistoryItemsDateTitle',
                                  description:
                                    'v2_1.DocumentTrackingRevisionHistoryItemsDateDescription',
                                },
                                disable: {
                                  ifStandaloneMode: false,
                                  ifServerMode: true,
                                },
                              },
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'legacy_version',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'legacy_version',
                              ],
                              title: 'Legacy version of the revision',
                              description:
                                'Contains the version string used in an existing document with the same content.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/document/tracking/revision_history/revision/legacy_version-spec.en.md',
                                  usage:
                                    'docs/user/document/tracking/revision_history/revision/legacy_version-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'optional',
                                  csaf_security_incident_response: 'optional',
                                  csaf_informational_advisory: 'optional',
                                  csaf_security_advisory: 'optional',
                                  csaf_vex: 'optional',
                                },
                                i18n: {
                                  title:
                                    'v2_1.DocumentTrackingRevisionHistoryItemsLegacyVersionTitle',
                                  description:
                                    'v2_1.DocumentTrackingRevisionHistoryItemsLegacyVersionDescription',
                                },
                                disable: {
                                  ifStandaloneMode: false,
                                  ifServerMode: true,
                                },
                              },
                              minLength: 1,
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'number',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'number',
                              ],
                              title: 'Version',
                              description:
                                'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/document/tracking/revision_history/revision/number-spec.en.md',
                                  usage:
                                    'docs/user/document/tracking/revision_history/revision/number-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title: 'v2_1.VersionTitle',
                                  description: 'v2_1.VersionDescription',
                                },
                                disable: {
                                  ifStandaloneMode: false,
                                  ifServerMode: true,
                                },
                              },
                              examples: [
                                '1',
                                '4',
                                '0.9.0',
                                '1.4.3',
                                '2.40.0+21AF26D3',
                              ],
                              pattern:
                                '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'summary',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'summary',
                              ],
                              title: 'Summary of the revision',
                              description:
                                'Holds a single non-empty string representing a short description of the changes.',
                              metaData: {
                                uiType: 'STRING_MULTI_LINE',
                                userDocumentation: {
                                  specification:
                                    'docs/user/document/tracking/revision_history/revision/summary-spec.en.md',
                                  usage:
                                    'docs/user/document/tracking/revision_history/revision/summary-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title:
                                    'v2_1.DocumentTrackingRevisionHistoryItemsSummaryTitle',
                                  description:
                                    'v2_1.DocumentTrackingRevisionHistoryItemsSummaryDescription',
                                },
                                disable: {
                                  ifStandaloneMode: false,
                                  ifServerMode: true,
                                },
                              },
                              minLength: 1,
                              examples: ['Initial version.'],
                              metaInfo: {},
                              type: 'STRING',
                            },
                          ],
                        },
                      },
                    },
                  },
                  {
                    key: 'status',
                    fullName: ['document', 'tracking', 'status'],
                    title: 'Document status',
                    description: 'Defines the draft status of the document.',
                    metaData: {
                      uiType: 'STRING_ENUM',
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/status-spec.en.md',
                        usage: 'docs/user/document/tracking/status-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.DocumentTrackingStatusTitle',
                        description: 'v2_1.DocumentTrackingStatusDescription',
                      },
                    },
                    enum: ['draft', 'final', 'interim'],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'version',
                    fullName: ['document', 'tracking', 'version'],
                    title: 'Version',
                    description:
                      'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/version-spec.en.md',
                        usage:
                          'docs/user/document/tracking/version-usage.en.md',
                      },
                      relevanceLevels: {
                        csaf_base: 'mandatory',
                        csaf_security_incident_response: 'mandatory',
                        csaf_informational_advisory: 'mandatory',
                        csaf_security_advisory: 'mandatory',
                        csaf_vex: 'mandatory',
                      },
                      i18n: {
                        title: 'v2_1.VersionTitle',
                        description: 'v2_1.VersionDescription',
                      },
                    },
                    examples: ['1', '4', '0.9.0', '1.4.3', '2.40.0+21AF26D3'],
                    pattern:
                      '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
                    metaInfo: {},
                    type: 'STRING',
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
        description:
          'Is a container for all fully qualified product names that can be referenced elsewhere in the document.',
        metaData: {
          userDocumentation: {
            specification: 'docs/user/product_tree-spec.en.md',
            usage: 'docs/user/product_tree-usage.en.md',
          },
          relevanceLevels: {
            csaf_base: 'want_to_have',
            csaf_security_incident_response: 'nice_to_know',
            csaf_informational_advisory: 'want_to_have',
            csaf_security_advisory: 'mandatory',
            csaf_vex: 'mandatory',
          },
          i18n: {
            title: 'v2_1.ProductTreeTitle',
            description: 'v2_1.ProductTreeDescription',
          },
        },
        type: 'OBJECT',
        metaInfo: {
          propertyList: [
            {
              key: 'branches',
              fullName: ['product_tree', 'branches'],
              title: 'List of branches',
              description:
                'Contains branch elements as children of the current element.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/product_tree/branches-spec.en.md',
                  usage: 'docs/user/product_tree/branches-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'want_to_have',
                  csaf_security_incident_response: 'want_to_have',
                  csaf_informational_advisory: 'want_to_have',
                  csaf_security_advisory: 'best_practice',
                  csaf_vex: 'best_practice',
                },
                i18n: {
                  title: 'v2_1.BranchesTitle',
                  description: 'v2_1.BranchesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'branches'],
                  title: 'Branch',
                  description:
                    'Is a part of the hierarchical structure of the product tree.',
                  addMenuItemsForChildObjects: true,
                  metaData: {
                    addMenuItemsForChildObjects: true,
                    userDocumentation: {
                      specification:
                        'docs/user/types/branches/branch-spec.en.md',
                      usage: 'docs/user/types/branches/branch-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.BranchesItemsTitle',
                      description: 'v2_1.BranchesItemsDescription',
                    },
                    itemName: {
                      itemNameTranslationKey: 'arrays.branchesItemName',
                      itemNameField: 'name',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'branches',
                        fullName: ['product_tree', 'branches'],
                        title: 'List of branches',
                        description:
                          'Contains branch elements as children of the current element.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/branches-spec.en.md',
                            usage:
                              'docs/user/product_tree/branches-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'want_to_have',
                            csaf_informational_advisory: 'want_to_have',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'best_practice',
                          },
                          i18n: {
                            title: 'v2_1.BranchesTitle',
                            description: 'v2_1.BranchesDescription',
                          },
                        },
                        metaInfo: {},
                        type: 'RECURSION',
                      },
                      {
                        key: 'category',
                        fullName: ['product_tree', 'branches', 'category'],
                        title: 'Category of the branch',
                        description:
                          'Describes the characteristics of the labeled branch.',
                        metaData: {
                          uiType: 'STRING_ENUM',
                          userDocumentation: {
                            specification:
                              'docs/user/types/branches/branch/category-spec.en.md',
                            usage:
                              'docs/user/types/branches/branch/category-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.BranchesItemsCategoryTitle',
                            description:
                              'v2_1.BranchesItemsCategoryDescription',
                          },
                        },
                        enum: [
                          'architecture',
                          'host_name',
                          'language',
                          'legacy',
                          'patch_level',
                          'platform',
                          'product_family',
                          'product_name',
                          'product_version',
                          'product_version_range',
                          'service_pack',
                          'specification',
                          'vendor',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'name',
                        fullName: ['product_tree', 'branches', 'name'],
                        title: 'Name of the branch',
                        description:
                          "Contains the canonical descriptor or 'friendly name' of the branch.",
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/branches/branch/name-spec.en.md',
                            usage:
                              'docs/user/types/branches/branch/name-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.BranchesItemsNameTitle',
                            description: 'v2_1.BranchesItemsNameDescription',
                          },
                        },
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
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product',
                        fullName: ['product_tree', 'branches', 'product'],
                        title: 'Full product name',
                        description:
                          'Specifies information about the product and assigns the product_id.',
                        addMenuItemsForChildObjects: true,
                        metaData: {
                          addMenuItemsForChildObjects: true,
                          userDocumentation: {
                            specification:
                              'docs/user/types/branches/branch/product-spec.en.md',
                            usage:
                              'docs/user/types/branches/branch/product-usage.en.md',
                          },
                          i18n: {
                            title: 'v2_1.FullProductNameTitle',
                            description: 'v2_1.FullProductNameDescription',
                          },
                        },
                        type: 'OBJECT',
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
                              title: 'Textual description of the product',
                              description:
                                'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                              metaData: {
                                uiType: 'STRING_BRANCH_FULL_PRODUCT_NAME',
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/name-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/name-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title: 'v2_1.FullProductNameNameTitle',
                                  description:
                                    'v2_1.FullProductNameNameDescription',
                                },
                              },
                              minLength: 1,
                              examples: [
                                'Cisco AnyConnect Secure Mobility Client 2.3.185',
                                'Microsoft Host Integration Server 2006 Service Pack 1',
                              ],
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'product_id',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'product_id',
                              ],
                              title: 'Reference token for product instance',
                              description:
                                'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                              metaData: {
                                uiType: 'STRING_GENERATE_PRODUCT_ID',
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_id-spec.en.md',
                                  usage:
                                    'docs/user/types/product_id-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title: 'v2_1.ProductIdTitle',
                                  description: 'v2_1.ProductIdDescription',
                                },
                              },
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                              metaInfo: {},
                              type: 'STRING',
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
                              description:
                                'Provides at least one method which aids in identifying the product in an asset database.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'want_to_have',
                                  csaf_security_incident_response:
                                    'want_to_have',
                                  csaf_informational_advisory: 'want_to_have',
                                  csaf_security_advisory: 'want_to_have',
                                  csaf_vex: 'want_to_have',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperDescription',
                                },
                              },
                              type: 'OBJECT',
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
                                    title:
                                      'Common Platform Enumeration representation',
                                    description:
                                      'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/cpe-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/cpe-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperCpeTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperCpeDescription',
                                      },
                                    },
                                    minLength: 5,
                                    pattern:
                                      '^((cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:\\/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6}))$',
                                    metaInfo: {},
                                    type: 'STRING',
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
                                    description:
                                      'Contains a list of cryptographic hashes usable to identify files.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/hashes-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/hashes-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperHashesTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperHashesDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
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
                                        description:
                                          'Contains all information to identify a file based on its cryptographic hash values.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.hashesItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        type: 'OBJECT',
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
                                              description:
                                                'Contains a list of cryptographic hashes for this file.',
                                              metaData: {
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesDescription',
                                                },
                                              },
                                              type: 'ARRAY',
                                              metaInfo: {
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
                                                  description:
                                                    'Contains one hash value and algorithm of the file to be identified.',
                                                  metaData: {
                                                    userDocumentation: {
                                                      specification:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-spec.en.md',
                                                      usage:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-usage.en.md',
                                                    },
                                                    i18n: {
                                                      title:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsTitle',
                                                      description:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsDescription',
                                                    },
                                                    itemName: {
                                                      itemNameTranslationKey:
                                                        'arrays.fileHashesItemName',
                                                    },
                                                    relevanceLevels: {
                                                      csaf_base: 'mandatory',
                                                      csaf_security_incident_response:
                                                        'mandatory',
                                                      csaf_informational_advisory:
                                                        'mandatory',
                                                      csaf_security_advisory:
                                                        'mandatory',
                                                      csaf_vex: 'mandatory',
                                                    },
                                                  },
                                                  type: 'OBJECT',
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
                                                        title:
                                                          'Algorithm of the cryptographic hash',
                                                        description:
                                                          'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                        metaData: {
                                                          userDocumentation: {
                                                            specification:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md',
                                                            usage:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-usage.en.md',
                                                          },
                                                          relevanceLevels: {
                                                            csaf_base:
                                                              'mandatory',
                                                            csaf_security_incident_response:
                                                              'mandatory',
                                                            csaf_informational_advisory:
                                                              'mandatory',
                                                            csaf_security_advisory:
                                                              'mandatory',
                                                            csaf_vex:
                                                              'mandatory',
                                                          },
                                                          i18n: {
                                                            title:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmTitle',
                                                            description:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmDescription',
                                                          },
                                                        },
                                                        minLength: 1,
                                                        examples: [
                                                          'blake2b512',
                                                          'sha256',
                                                          'sha3-512',
                                                          'sha384',
                                                          'sha512',
                                                        ],
                                                        default: 'sha256',
                                                        metaInfo: {},
                                                        type: 'STRING',
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
                                                        title:
                                                          'Value of the cryptographic hash',
                                                        description:
                                                          'Contains the cryptographic hash value in hexadecimal representation.',
                                                        metaData: {
                                                          userDocumentation: {
                                                            specification:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md',
                                                            usage:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-usage.en.md',
                                                          },
                                                          relevanceLevels: {
                                                            csaf_base:
                                                              'mandatory',
                                                            csaf_security_incident_response:
                                                              'mandatory',
                                                            csaf_informational_advisory:
                                                              'mandatory',
                                                            csaf_security_advisory:
                                                              'mandatory',
                                                            csaf_vex:
                                                              'mandatory',
                                                          },
                                                          i18n: {
                                                            title:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueTitle',
                                                            description:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueDescription',
                                                          },
                                                        },
                                                        minLength: 32,
                                                        examples: [
                                                          '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                          '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                          '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                        ],
                                                        pattern:
                                                          '^[0-9a-fA-F]{32,}$',
                                                        metaInfo: {},
                                                        type: 'STRING',
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
                                              title: 'Filename',
                                              description:
                                                'Contains the name of the file which is identified by the hash values.',
                                              metaData: {
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFilenameTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFilenameDescription',
                                                },
                                              },
                                              minLength: 1,
                                              examples: [
                                                'WINWORD.EXE',
                                                'msotadddin.dll',
                                                'sudoers.so',
                                              ],
                                              metaInfo: {},
                                              type: 'STRING',
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
                                    description:
                                      'Contains a list of model numbers.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/model_numbers-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/model_numbers-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperModelNumbersTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperModelNumbersDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'model_numbers',
                                        ],
                                        title: 'Model number',
                                        description:
                                          'Contains a model number of the component to identify - possibly with placeholders.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperModelNumbersItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperModelNumbersItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.modelNumbersItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'purls',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'purls',
                                    ],
                                    title: 'List of package URLs',
                                    description:
                                      'Contains a list of package URLs (purl).',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperPurlTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperPurlDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'purls',
                                        ],
                                        title: 'package URL representation',
                                        description:
                                          'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                        metaData: {
                                          uiType: 'STRING_URI',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperPurlsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperPurlsDescription',
                                          },
                                        },
                                        minLength: 7,
                                        pattern:
                                          '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*\\/.+',
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
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
                                    description:
                                      'Contains a list of URLs where SBOMs for this product can be retrieved.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/sbom_urls-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/sbom_urls-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperSbomUrlsTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperSbomUrlsDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'sbom_urls',
                                        ],
                                        title: 'SBOM URL',
                                        description:
                                          'Contains a URL of one SBOM for this product.',
                                        metaData: {
                                          uiType: 'STRING_URI',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperSbomUrlsItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperSbomUrlsItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.sbomItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'STRING',
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
                                    description:
                                      'Contains a list of serial numbers.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperSerialNumbersTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperSerialNumbersDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'serial_numbers',
                                        ],
                                        title: 'Serial number',
                                        description:
                                          'Contains a serial number of the component to identify - possibly with placeholders.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperSerialNumbersItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperSerialNumbersItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.serialNumbersItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
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
                                    description:
                                      'Contains a list of full or abbreviated (partial) stock keeping units.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/skus-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/skus-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperSkusTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperSkusDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'skus',
                                        ],
                                        title: 'Stock keeping unit',
                                        description:
                                          'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/skus/sku-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/skus/sku-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperSkusItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperSkusItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.skusItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
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
                                    description:
                                      'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'want_to_have',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperXGenericUrisTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperXGenericUrisDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
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
                                        description:
                                          'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.genericUrisItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'want_to_have',
                                          },
                                        },
                                        type: 'OBJECT',
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
                                              title:
                                                'Namespace of the generic URI',
                                              description:
                                                'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                              metaData: {
                                                uiType: 'STRING_URI',
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceDescription',
                                                },
                                              },
                                              metaInfo: {},
                                              type: 'STRING',
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
                                              title: 'URI',
                                              description:
                                                'Contains the identifier itself.',
                                              metaData: {
                                                uiType: 'STRING_URI',
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsUriTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsUriDescription',
                                                },
                                              },
                                              metaInfo: {},
                                              type: 'STRING',
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'full_product_names',
              fullName: ['product_tree', 'full_product_names'],
              title: 'List of full product names',
              description: 'Contains a list of full product names.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/product_tree/full_product_names-spec.en.md',
                  usage:
                    'docs/user/product_tree/full_product_names-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'nice_to_know',
                  csaf_security_incident_response: 'nice_to_know',
                  csaf_informational_advisory: 'nice_to_know',
                  csaf_security_advisory: 'nice_to_know',
                  csaf_vex: 'nice_to_know',
                },
                i18n: {
                  title: 'v2_1.ProductTreeFullProductNamesTitle',
                  description: 'v2_1.ProductTreeFullProductNamesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'full_product_names'],
                  title: 'Full product name',
                  description:
                    'Specifies information about the product and assigns the product_id.',
                  addMenuItemsForChildObjects: true,
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/full_product_name-spec.en.md',
                      usage: 'docs/user/types/full_product_name-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.FullProductNameTitle',
                      description: 'v2_1.FullProductNameDescription',
                    },
                    addMenuItemsForChildObjects: true,
                    itemName: {
                      itemNameTranslationKey: 'arrays.productsItemName',
                      itemNameField: 'name',
                    },
                    relevanceLevels: {
                      csaf_base: 'nice_to_know',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'nice_to_know',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'nice_to_know',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'name',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'name',
                        ],
                        title: 'Textual description of the product',
                        description:
                          'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/full_product_name/name-spec.en.md',
                            usage:
                              'docs/user/types/full_product_name/name-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.FullProductNameNameTitle',
                            description: 'v2_1.FullProductNameNameDescription',
                          },
                        },
                        minLength: 1,
                        examples: [
                          'Cisco AnyConnect Secure Mobility Client 2.3.185',
                          'Microsoft Host Integration Server 2006 Service Pack 1',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product_id',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'product_id',
                        ],
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        metaData: {
                          uiType: 'STRING_GENERATE_PRODUCT_ID',
                          userDocumentation: {
                            specification:
                              'docs/user/types/product_id-spec.en.md',
                            usage: 'docs/user/types/product_id-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.ProductIdTitle',
                            description: 'v2_1.ProductIdDescription',
                          },
                        },
                        minLength: 1,
                        examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product_identification_helper',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'product_identification_helper',
                        ],
                        title: 'Helper to identify the product',
                        description:
                          'Provides at least one method which aids in identifying the product in an asset database.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/types/full_product_name/product_identification_helper-spec.en.md',
                            usage:
                              'docs/user/types/full_product_name/product_identification_helper-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'want_to_have',
                            csaf_informational_advisory: 'want_to_have',
                            csaf_security_advisory: 'want_to_have',
                            csaf_vex: 'want_to_have',
                          },
                          i18n: {
                            title:
                              'v2_1.FullProductNameProductIdentificationHelperTitle',
                            description:
                              'v2_1.FullProductNameProductIdentificationHelperDescription',
                          },
                        },
                        type: 'OBJECT',
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
                              title:
                                'Common Platform Enumeration representation',
                              description:
                                'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/cpe-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/cpe-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperCpeTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperCpeDescription',
                                },
                              },
                              minLength: 5,
                              pattern:
                                '^((cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:\\/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6}))$',
                              metaInfo: {},
                              type: 'STRING',
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
                              description:
                                'Contains a list of cryptographic hashes usable to identify files.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/hashes-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/hashes-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperHashesTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperHashesDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'hashes',
                                  ],
                                  title: 'Cryptographic hashes',
                                  description:
                                    'Contains all information to identify a file based on its cryptographic hash values.',
                                  metaData: {
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash-usage.en.md',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsDescription',
                                    },
                                    itemName: {
                                      itemNameTranslationKey:
                                        'arrays.hashesItemName',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'nice_to_know',
                                    },
                                  },
                                  type: 'OBJECT',
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
                                        description:
                                          'Contains a list of cryptographic hashes for this file.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'mandatory',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesDescription',
                                          },
                                        },
                                        type: 'ARRAY',
                                        metaInfo: {
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
                                            description:
                                              'Contains one hash value and algorithm of the file to be identified.',
                                            metaData: {
                                              userDocumentation: {
                                                specification:
                                                  'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-spec.en.md',
                                                usage:
                                                  'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-usage.en.md',
                                              },
                                              i18n: {
                                                title:
                                                  'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsTitle',
                                                description:
                                                  'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsDescription',
                                              },
                                              itemName: {
                                                itemNameTranslationKey:
                                                  'arrays.fileHashesItemName',
                                              },
                                              relevanceLevels: {
                                                csaf_base: 'mandatory',
                                                csaf_security_incident_response:
                                                  'mandatory',
                                                csaf_informational_advisory:
                                                  'mandatory',
                                                csaf_security_advisory:
                                                  'mandatory',
                                                csaf_vex: 'mandatory',
                                              },
                                            },
                                            type: 'OBJECT',
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
                                                  title:
                                                    'Algorithm of the cryptographic hash',
                                                  description:
                                                    'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                  metaData: {
                                                    userDocumentation: {
                                                      specification:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md',
                                                      usage:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-usage.en.md',
                                                    },
                                                    relevanceLevels: {
                                                      csaf_base: 'mandatory',
                                                      csaf_security_incident_response:
                                                        'mandatory',
                                                      csaf_informational_advisory:
                                                        'mandatory',
                                                      csaf_security_advisory:
                                                        'mandatory',
                                                      csaf_vex: 'mandatory',
                                                    },
                                                    i18n: {
                                                      title:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmTitle',
                                                      description:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmDescription',
                                                    },
                                                  },
                                                  minLength: 1,
                                                  examples: [
                                                    'blake2b512',
                                                    'sha256',
                                                    'sha3-512',
                                                    'sha384',
                                                    'sha512',
                                                  ],
                                                  default: 'sha256',
                                                  metaInfo: {},
                                                  type: 'STRING',
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
                                                  title:
                                                    'Value of the cryptographic hash',
                                                  description:
                                                    'Contains the cryptographic hash value in hexadecimal representation.',
                                                  metaData: {
                                                    userDocumentation: {
                                                      specification:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md',
                                                      usage:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-usage.en.md',
                                                    },
                                                    relevanceLevels: {
                                                      csaf_base: 'mandatory',
                                                      csaf_security_incident_response:
                                                        'mandatory',
                                                      csaf_informational_advisory:
                                                        'mandatory',
                                                      csaf_security_advisory:
                                                        'mandatory',
                                                      csaf_vex: 'mandatory',
                                                    },
                                                    i18n: {
                                                      title:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueTitle',
                                                      description:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueDescription',
                                                    },
                                                  },
                                                  minLength: 32,
                                                  examples: [
                                                    '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                    '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                    '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                  ],
                                                  pattern: '^[0-9a-fA-F]{32,}$',
                                                  metaInfo: {},
                                                  type: 'STRING',
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
                                        title: 'Filename',
                                        description:
                                          'Contains the name of the file which is identified by the hash values.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'mandatory',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFilenameTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFilenameDescription',
                                          },
                                        },
                                        minLength: 1,
                                        examples: [
                                          'WINWORD.EXE',
                                          'msotadddin.dll',
                                          'sudoers.so',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
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
                              description: 'Contains a list of model numbers.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/model_numbers-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/model_numbers-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperModelNumbersTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperModelNumbersDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'model_numbers',
                                  ],
                                  title: 'Model number',
                                  description:
                                    'Contains a model number of the component to identify - possibly with placeholders.',
                                  metaData: {
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-usage.en.md',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperModelNumbersItemsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperModelNumbersItemsDescription',
                                    },
                                    itemName: {
                                      itemNameTranslationKey:
                                        'arrays.modelNumbersItemName',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'nice_to_know',
                                    },
                                  },
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                              },
                            },
                            {
                              key: 'purls',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'purls',
                              ],
                              title: 'List of package URLs',
                              description:
                                'Contains a list of package URLs (purl).',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperPurlTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperPurlDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'purls',
                                  ],
                                  title: 'package URL representation',
                                  description:
                                    'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                  metaData: {
                                    uiType: 'STRING_URI',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'nice_to_know',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperPurlsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperPurlsDescription',
                                    },
                                  },
                                  minLength: 7,
                                  pattern:
                                    '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*\\/.+',
                                  metaInfo: {},
                                  type: 'STRING',
                                },
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
                              description:
                                'Contains a list of URLs where SBOMs for this product can be retrieved.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/sbom_urls-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/sbom_urls-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperSbomUrlsTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperSbomUrlsDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'sbom_urls',
                                  ],
                                  title: 'SBOM URL',
                                  description:
                                    'Contains a URL of one SBOM for this product.',
                                  metaData: {
                                    uiType: 'STRING_URI',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-usage.en.md',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperSbomUrlsItemsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperSbomUrlsItemsDescription',
                                    },
                                    itemName: {
                                      itemNameTranslationKey:
                                        'arrays.sbomUrlsItemName',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'nice_to_know',
                                    },
                                  },
                                  metaInfo: {},
                                  type: 'STRING',
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
                              description: 'Contains a list of serial numbers.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/serial_numbers-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/serial_numbers-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperSerialNumbersTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperSerialNumbersDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'serial_numbers',
                                  ],
                                  title: 'Serial number',
                                  description:
                                    'Contains a serial number of the component to identify - possibly with placeholders.',
                                  metaData: {
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-usage.en.md',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperSerialNumbersItemsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperSerialNumbersItemsDescription',
                                    },
                                    itemName: {
                                      itemNameTranslationKey:
                                        'arrays.serialNumbersItemName',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'nice_to_know',
                                    },
                                  },
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
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
                              description:
                                'Contains a list of full or abbreviated (partial) stock keeping units.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/skus-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/skus-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'nice_to_know',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperSkusTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperSkusDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'skus',
                                  ],
                                  title: 'Stock keeping unit',
                                  description:
                                    'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                  metaData: {
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/skus/sku-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/skus/sku-usage.en.md',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperSkusItemsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperSkusItemsDescription',
                                    },
                                    itemName: {
                                      itemNameTranslationKey:
                                        'arrays.skusItemName',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'nice_to_know',
                                    },
                                  },
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
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
                              description:
                                'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'nice_to_know',
                                  csaf_security_incident_response:
                                    'nice_to_know',
                                  csaf_informational_advisory: 'nice_to_know',
                                  csaf_security_advisory: 'nice_to_know',
                                  csaf_vex: 'want_to_have',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisDescription',
                                },
                              },
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'x_generic_uris',
                                  ],
                                  title: 'Generic URI',
                                  description:
                                    'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                  metaData: {
                                    userDocumentation: {
                                      specification:
                                        'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-spec.en.md',
                                      usage:
                                        'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-usage.en.md',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsTitle',
                                      description:
                                        'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsDescription',
                                    },
                                    itemName: {
                                      itemNameTranslationKey:
                                        'arrays.genericUrisItemName',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'nice_to_know',
                                      csaf_security_incident_response:
                                        'nice_to_know',
                                      csaf_informational_advisory:
                                        'nice_to_know',
                                      csaf_security_advisory: 'nice_to_know',
                                      csaf_vex: 'want_to_have',
                                    },
                                  },
                                  type: 'OBJECT',
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
                                        title: 'Namespace of the generic URI',
                                        description:
                                          'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                        metaData: {
                                          uiType: 'STRING_URI',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'mandatory',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceDescription',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'STRING',
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
                                        title: 'URI',
                                        description:
                                          'Contains the identifier itself.',
                                        metaData: {
                                          uiType: 'STRING_URI',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'mandatory',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsUriTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsUriDescription',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          ],
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
              description: 'Contains a list of product groups.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/product_tree/product_groups-spec.en.md',
                  usage: 'docs/user/product_tree/product_groups-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'optional',
                  csaf_security_incident_response: 'optional',
                  csaf_informational_advisory: 'optional',
                  csaf_security_advisory: 'nice_to_know',
                  csaf_vex: 'optional',
                },
                i18n: {
                  title: 'v2_1.ProductTreeProductGroupsTitle',
                  description: 'v2_1.ProductTreeProductGroupsDescription',
                },
                uiType: 'WITH_GENERATED_GROUP_ID',
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'product_groups'],
                  title: 'Product group',
                  description:
                    'Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/product_tree/product_groups/product_group-spec.en.md',
                      usage:
                        'docs/user/product_tree/product_groups/product_group-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.ProductTreeProductGroupsItemsTitle',
                      description:
                        'v2_1.ProductTreeProductGroupsItemsDescription',
                    },
                    itemName: {
                      itemNameTranslationKey: 'arrays.productGroupsItemName',
                      itemNameField: 'group_id',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'optional',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'optional',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'group_id',
                        fullName: [
                          'product_tree',
                          'product_groups',
                          'group_id',
                        ],
                        title: 'Reference token for product group instance',
                        description:
                          'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/product_groups/product_group/group_id-spec.en.md',
                            usage:
                              'docs/user/product_tree/product_groups/product_group/group_id-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.ProductGroupIdTitle',
                            description: 'v2_1.ProductGroupIdDescription',
                          },
                        },
                        minLength: 1,
                        examples: [
                          'CSAFGID-0001',
                          'CSAFGID-0002',
                          'CSAFGID-0020',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product_ids',
                        fullName: [
                          'product_tree',
                          'product_groups',
                          'product_ids',
                        ],
                        title: 'List of Product IDs',
                        description:
                          'Lists the product_ids of those products which known as one group in the document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/product_groups/product_group/product_ids-spec.en.md',
                            usage:
                              'docs/user/product_tree/product_groups/product_group/product_ids-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.ProductTreeProductGroupsItemsProductIdsTitle',
                            description:
                              'v2_1.ProductTreeProductGroupsItemsProductIdsDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'product_tree',
                              'product_groups',
                              'product_ids',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/product_id-spec.en.md',
                                usage: 'docs/user/types/product_id-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'summary',
                        fullName: ['product_tree', 'product_groups', 'summary'],
                        title: 'Summary of the product group',
                        description:
                          'Gives a short, optional description of the group.',
                        metaData: {
                          uiType: 'STRING_MULTI_LINE',
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/product_groups/product_group/summary-spec.en.md',
                            usage:
                              'docs/user/product_tree/product_groups/product_group/summary-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'want_to_have',
                            csaf_informational_advisory: 'want_to_have',
                            csaf_security_advisory: 'want_to_have',
                            csaf_vex: 'want_to_have',
                          },
                          i18n: {
                            title:
                              'v2_1.ProductTreeProductGroupsItemsSummaryTitle',
                            description:
                              'v2_1.ProductTreeProductGroupsItemsSummaryDescription',
                          },
                        },
                        minLength: 1,
                        examples: [
                          'Products supporting Modbus.',
                          'The x64 versions of the operating system.',
                        ],
                        metaInfo: {},
                        type: 'STRING',
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
              description: 'Contains a list of relationships.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/product_tree/relationships-spec.en.md',
                  usage: 'docs/user/product_tree/relationships-usage.en.md',
                },
                relevanceLevels: {
                  csaf_base: 'optional',
                  csaf_security_incident_response: 'optional',
                  csaf_informational_advisory: 'optional',
                  csaf_security_advisory: 'want_to_have',
                  csaf_vex: 'want_to_have',
                },
                i18n: {
                  title: 'v2_1.ProductTreeRelationshipsTitle',
                  description: 'v2_1.ProductTreeRelationshipsDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'relationships'],
                  title: 'Relationship',
                  description:
                    'Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry.',
                  addMenuItemsForChildObjects: true,
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/product_tree/relationships/relationship-spec.en.md',
                      usage:
                        'docs/user/product_tree/relationships/relationship-usage.en.md',
                    },
                    i18n: {
                      title: 'v2_1.ProductTreeRelationshipsItemsTitle',
                      description:
                        'v2_1.ProductTreeRelationshipsItemsDescription',
                    },
                    itemName: {
                      itemNameTranslationKey: 'arrays.relationshipsItemName',
                    },
                    addMenuItemsForChildObjects: true,
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'optional',
                      csaf_security_advisory: 'want_to_have',
                      csaf_vex: 'want_to_have',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'category',
                        fullName: ['product_tree', 'relationships', 'category'],
                        title: 'Relationship category',
                        description:
                          'Defines the category of relationship for the referenced component.',
                        metaData: {
                          uiType: 'STRING_ENUM',
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/relationships/relationship/category-spec.en.md',
                            usage:
                              'docs/user/product_tree/relationships/relationship/category-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.ProductTreeRelationshipsItemsCategoryTitle',
                            description:
                              'v2_1.ProductTreeRelationshipsItemsCategoryDescription',
                          },
                        },
                        enum: [
                          'default_component_of',
                          'external_component_of',
                          'installed_on',
                          'installed_with',
                          'optional_component_of',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'full_product_name',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'full_product_name',
                        ],
                        title: 'Full product name',
                        description:
                          'Specifies information about the product and assigns the product_id.',
                        addMenuItemsForChildObjects: true,
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/relationships/relationship/full_product_name-spec.en.md',
                            usage:
                              'docs/user/product_tree/relationships/relationship/full_product_name-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title: 'v2_1.FullProductNameTitle',
                            description: 'v2_1.FullProductNameDescription',
                          },
                          addMenuItemsForChildObjects: true,
                        },
                        type: 'OBJECT',
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
                              title: 'Textual description of the product',
                              description:
                                'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                              metaData: {
                                uiType: 'STRING_RELATIONSHIP_FULL_PRODUCT_NAME',
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/name-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/name-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title: 'v2_1.FullProductNameNameTitle',
                                  description:
                                    'v2_1.FullProductNameNameDescription',
                                },
                              },
                              minLength: 1,
                              examples: [
                                'Cisco AnyConnect Secure Mobility Client 2.3.185',
                                'Microsoft Host Integration Server 2006 Service Pack 1',
                              ],
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'product_id',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'product_id',
                              ],
                              title: 'Reference token for product instance',
                              description:
                                'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                              metaData: {
                                uiType: 'STRING_GENERATE_PRODUCT_ID',
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_id-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_id-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'mandatory',
                                  csaf_security_incident_response: 'mandatory',
                                  csaf_informational_advisory: 'mandatory',
                                  csaf_security_advisory: 'mandatory',
                                  csaf_vex: 'mandatory',
                                },
                                i18n: {
                                  title: 'v2_1.ProductIdTitle',
                                  description: 'v2_1.ProductIdDescription',
                                },
                              },
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                              metaInfo: {},
                              type: 'STRING',
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
                              description:
                                'Provides at least one method which aids in identifying the product in an asset database.',
                              metaData: {
                                userDocumentation: {
                                  specification:
                                    'docs/user/types/full_product_name/product_identification_helper-spec.en.md',
                                  usage:
                                    'docs/user/types/full_product_name/product_identification_helper-usage.en.md',
                                },
                                relevanceLevels: {
                                  csaf_base: 'want_to_have',
                                  csaf_security_incident_response:
                                    'want_to_have',
                                  csaf_informational_advisory: 'want_to_have',
                                  csaf_security_advisory: 'want_to_have',
                                  csaf_vex: 'want_to_have',
                                },
                                i18n: {
                                  title:
                                    'v2_1.FullProductNameProductIdentificationHelperTitle',
                                  description:
                                    'v2_1.FullProductNameProductIdentificationHelperDescription',
                                },
                              },
                              type: 'OBJECT',
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
                                    title:
                                      'Common Platform Enumeration representation',
                                    description:
                                      'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/cpe-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/cpe-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperCpeTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperCpeDescription',
                                      },
                                    },
                                    minLength: 5,
                                    pattern:
                                      '^((cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:\\/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6}))$',
                                    metaInfo: {},
                                    type: 'STRING',
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
                                    description:
                                      'Contains a list of cryptographic hashes usable to identify files.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/hashes-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/hashes-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperHashesTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperHashesDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
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
                                        description:
                                          'Contains all information to identify a file based on its cryptographic hash values.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.hashesItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        type: 'OBJECT',
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
                                              description:
                                                'Contains a list of cryptographic hashes for this file.',
                                              metaData: {
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesDescription',
                                                },
                                              },
                                              type: 'ARRAY',
                                              metaInfo: {
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
                                                  description:
                                                    'Contains one hash value and algorithm of the file to be identified.',
                                                  metaData: {
                                                    userDocumentation: {
                                                      specification:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-spec.en.md',
                                                      usage:
                                                        'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-usage.en.md',
                                                    },
                                                    i18n: {
                                                      title:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsTitle',
                                                      description:
                                                        'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsDescription',
                                                    },
                                                    itemName: {
                                                      itemNameTranslationKey:
                                                        'arrays.fileHashesItemName',
                                                    },
                                                    relevanceLevels: {
                                                      csaf_base: 'mandatory',
                                                      csaf_security_incident_response:
                                                        'mandatory',
                                                      csaf_informational_advisory:
                                                        'mandatory',
                                                      csaf_security_advisory:
                                                        'mandatory',
                                                      csaf_vex: 'mandatory',
                                                    },
                                                  },
                                                  type: 'OBJECT',
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
                                                        title:
                                                          'Algorithm of the cryptographic hash',
                                                        description:
                                                          'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                        metaData: {
                                                          userDocumentation: {
                                                            specification:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md',
                                                            usage:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-usage.en.md',
                                                          },
                                                          relevanceLevels: {
                                                            csaf_base:
                                                              'mandatory',
                                                            csaf_security_incident_response:
                                                              'mandatory',
                                                            csaf_informational_advisory:
                                                              'mandatory',
                                                            csaf_security_advisory:
                                                              'mandatory',
                                                            csaf_vex:
                                                              'mandatory',
                                                          },
                                                          i18n: {
                                                            title:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmTitle',
                                                            description:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmDescription',
                                                          },
                                                        },
                                                        minLength: 1,
                                                        examples: [
                                                          'blake2b512',
                                                          'sha256',
                                                          'sha3-512',
                                                          'sha384',
                                                          'sha512',
                                                        ],
                                                        default: 'sha256',
                                                        metaInfo: {},
                                                        type: 'STRING',
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
                                                        title:
                                                          'Value of the cryptographic hash',
                                                        description:
                                                          'Contains the cryptographic hash value in hexadecimal representation.',
                                                        metaData: {
                                                          userDocumentation: {
                                                            specification:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md',
                                                            usage:
                                                              'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-usage.en.md',
                                                          },
                                                          relevanceLevels: {
                                                            csaf_base:
                                                              'mandatory',
                                                            csaf_security_incident_response:
                                                              'mandatory',
                                                            csaf_informational_advisory:
                                                              'mandatory',
                                                            csaf_security_advisory:
                                                              'mandatory',
                                                            csaf_vex:
                                                              'mandatory',
                                                          },
                                                          i18n: {
                                                            title:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueTitle',
                                                            description:
                                                              'v2_1.FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueDescription',
                                                          },
                                                        },
                                                        minLength: 32,
                                                        examples: [
                                                          '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                          '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                          '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                        ],
                                                        pattern:
                                                          '^[0-9a-fA-F]{32,}$',
                                                        metaInfo: {},
                                                        type: 'STRING',
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
                                              title: 'Filename',
                                              description:
                                                'Contains the name of the file which is identified by the hash values.',
                                              metaData: {
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFilenameTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperHashesItemsFilenameDescription',
                                                },
                                              },
                                              minLength: 1,
                                              examples: [
                                                'WINWORD.EXE',
                                                'msotadddin.dll',
                                                'sudoers.so',
                                              ],
                                              metaInfo: {},
                                              type: 'STRING',
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
                                    description:
                                      'Contains a list of model numbers.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/model_numbers-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/model_numbers-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperModelNumbersTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperModelNumbersDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'model_numbers',
                                        ],
                                        title: 'Model number',
                                        description:
                                          'Contains a model number of the component to identify - possibly with placeholders.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperModelNumbersItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperModelNumbersItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.modelNumbersItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'purls',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'purls',
                                    ],
                                    title: 'List of package URLs',
                                    description:
                                      'Contains a list of package URLs (purl).',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/purl-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/purl-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperPurlTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperPurlDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'purls',
                                        ],
                                        title: 'package URL representation',
                                        description:
                                          'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                        metaData: {
                                          uiType: 'STRING_URI',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/purl-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/purl-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperPurlsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperPurlsDescription',
                                          },
                                        },
                                        minLength: 7,
                                        pattern:
                                          '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*\\/.+',
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
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
                                    description:
                                      'Contains a list of URLs where SBOMs for this product can be retrieved.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/sbom_urls-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/sbom_urls-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperSbomUrlsTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperSbomUrlsDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'sbom_urls',
                                        ],
                                        title: 'SBOM URL',
                                        description:
                                          'Contains a URL of one SBOM for this product.',
                                        metaData: {
                                          uiType: 'STRING_URI',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperSbomUrlsItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperSbomUrlsItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.sbomUrlsItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'STRING',
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
                                    description:
                                      'Contains a list of serial numbers.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperSerialNumbersTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperSerialNumbersDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'serial_numbers',
                                        ],
                                        title: 'Serial number',
                                        description:
                                          'Contains a serial number of the component to identify - possibly with placeholders.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperSerialNumbersItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperSerialNumbersItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.serialNumbersItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
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
                                    description:
                                      'Contains a list of full or abbreviated (partial) stock keeping units.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/skus-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/skus-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'nice_to_know',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperSkusTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperSkusDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'skus',
                                        ],
                                        title: 'Stock keeping unit',
                                        description:
                                          'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/skus/sku-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/skus/sku-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperSkusItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperSkusItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.skusItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                        },
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
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
                                    description:
                                      'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                                    metaData: {
                                      userDocumentation: {
                                        specification:
                                          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md',
                                        usage:
                                          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-usage.en.md',
                                      },
                                      relevanceLevels: {
                                        csaf_base: 'nice_to_know',
                                        csaf_security_incident_response:
                                          'nice_to_know',
                                        csaf_informational_advisory:
                                          'nice_to_know',
                                        csaf_security_advisory: 'nice_to_know',
                                        csaf_vex: 'want_to_have',
                                      },
                                      i18n: {
                                        title:
                                          'v2_1.FullProductNameProductIdentificationHelperXGenericUrisTitle',
                                        description:
                                          'v2_1.FullProductNameProductIdentificationHelperXGenericUrisDescription',
                                      },
                                    },
                                    type: 'ARRAY',
                                    metaInfo: {
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
                                        description:
                                          'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-spec.en.md',
                                            usage:
                                              'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-usage.en.md',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsTitle',
                                            description:
                                              'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsDescription',
                                          },
                                          itemName: {
                                            itemNameTranslationKey:
                                              'arrays.genericUrisItemName',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'nice_to_know',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'want_to_have',
                                          },
                                        },
                                        type: 'OBJECT',
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
                                              title:
                                                'Namespace of the generic URI',
                                              description:
                                                'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                              metaData: {
                                                uiType: 'STRING_URI',
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceDescription',
                                                },
                                              },
                                              metaInfo: {},
                                              type: 'STRING',
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
                                              title: 'URI',
                                              description:
                                                'Contains the identifier itself.',
                                              metaData: {
                                                uiType: 'STRING_URI',
                                                userDocumentation: {
                                                  specification:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-spec.en.md',
                                                  usage:
                                                    'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-usage.en.md',
                                                },
                                                relevanceLevels: {
                                                  csaf_base: 'mandatory',
                                                  csaf_security_incident_response:
                                                    'mandatory',
                                                  csaf_informational_advisory:
                                                    'mandatory',
                                                  csaf_security_advisory:
                                                    'mandatory',
                                                  csaf_vex: 'mandatory',
                                                },
                                                i18n: {
                                                  title:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsUriTitle',
                                                  description:
                                                    'v2_1.FullProductNameProductIdentificationHelperXGenericUrisItemsUriDescription',
                                                },
                                              },
                                              metaInfo: {},
                                              type: 'STRING',
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                ],
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
                        title: 'Product reference',
                        description:
                          'Holds a Product ID that refers to the Full Product Name element, which is referenced as the first element of the relationship.',
                        metaData: {
                          uiType: 'STRING_PRODUCT_ID',
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/relationships/relationship/product_reference-spec.en.md',
                            usage: 'docs/user/types/product_id-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.ProductTreeRelationshipsItemsProductReferenceTitle',
                            description:
                              'v2_1.ProductTreeRelationshipsItemsProductReferenceDescription',
                          },
                        },
                        minLength: 1,
                        examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'relates_to_product_reference',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'relates_to_product_reference',
                        ],
                        title: 'Relates to product reference',
                        description:
                          'Holds a Product ID that refers to the Full Product Name element, which is referenced as the second element of the relationship.',
                        metaData: {
                          uiType: 'STRING_PRODUCT_ID',
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/relationships/relationship/relates_to_product_reference-spec.en.md',
                            usage: 'docs/user/types/product_id-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'mandatory',
                            csaf_security_incident_response: 'mandatory',
                            csaf_informational_advisory: 'mandatory',
                            csaf_security_advisory: 'mandatory',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.ProductTreeRelationshipsItemsRelatesToProductReferenceTitle',
                            description:
                              'v2_1.ProductTreeRelationshipsItemsRelatesToProductReferenceDescription',
                          },
                        },
                        minLength: 1,
                        examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      {
        key: 'vulnerabilities',
        fullName: ['vulnerabilities'],
        title: 'Vulnerabilities',
        description:
          'Represents a list of all relevant vulnerability information items.',
        metaData: {
          userDocumentation: {
            specification: 'docs/user/vulnerabilities-spec.en.md',
            usage: 'docs/user/vulnerabilities-usage.en.md',
          },
          relevanceLevels: {
            csaf_base: 'want_to_have',
            csaf_security_incident_response: 'nice_to_know',
            csaf_informational_advisory: 'excluded',
            csaf_security_advisory: 'mandatory',
            csaf_vex: 'mandatory',
          },
          i18n: {
            title: 'v2_1.VulnerabilitiesTitle',
            description: 'v2_1.VulnerabilitiesDescription',
          },
        },
        type: 'ARRAY',
        metaInfo: {
          arrayType: {
            key: '',
            fullName: ['vulnerabilities'],
            title: 'Vulnerability',
            description:
              'Is a container for the aggregation of all fields that are related to a single vulnerability in the document.',
            metaData: {
              userDocumentation: {
                specification:
                  'docs/user/vulnerabilities/vulnerability-spec.en.md',
                usage: 'docs/user/vulnerabilities/vulnerability-usage.en.md',
              },
              i18n: {
                title: 'v2_1.VulnerabilitiesItemsTitle',
                description: 'v2_1.VulnerabilitiesItemsDescription',
              },
              itemName: {
                itemNameTranslationKey: 'arrays.vulnerabilitiesItemName',
                itemNameField: 'title',
              },
              relevanceLevels: {
                csaf_base: 'want_to_have',
                csaf_security_incident_response: 'nice_to_know',
                csaf_informational_advisory: 'excluded',
                csaf_security_advisory: 'mandatory',
                csaf_vex: 'mandatory',
              },
            },
            type: 'OBJECT',
            metaInfo: {
              propertyList: [
                {
                  key: 'acknowledgments',
                  fullName: ['vulnerabilities', 'acknowledgments'],
                  title: 'Vulnerability acknowledgments',
                  description:
                    'Contains a list of acknowledgment elements associated with this vulnerability item.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/acknowledgments-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/acknowledgments-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'want_to_have',
                      csaf_vex: 'want_to_have',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsAcknowledgmentsTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsAcknowledgmentsDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'acknowledgments'],
                      title: 'Acknowledgment',
                      description:
                        'Acknowledges contributions by describing those that contributed.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/types/acknowledgments/acknowledgment-spec.en.md',
                          usage:
                            'docs/user/types/acknowledgments/acknowledgment-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.AcknowledgmentsItemsTitle',
                          description: 'v2_1.AcknowledgmentsItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey:
                            'arrays.acknowledgmentsItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'optional',
                          csaf_security_incident_response: 'optional',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'want_to_have',
                          csaf_vex: 'want_to_have',
                        },
                      },
                      type: 'OBJECT',
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
                            description:
                              'Contains the names of contributors being recognized.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/types/acknowledgments/acknowledgment/names-spec.en.md',
                                usage:
                                  'docs/user/types/acknowledgments/acknowledgment/names-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'want_to_have',
                              },
                              i18n: {
                                title: 'v2_1.AcknowledgmentsItemsNamesTitle',
                                description:
                                  'v2_1.AcknowledgmentsItemsNamesDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'acknowledgments',
                                  'names',
                                ],
                                title: 'Name of the contributor',
                                description:
                                  'Contains the name of a single contributor being recognized.',
                                metaData: {
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/acknowledgments/acknowledgment/names/name-spec.en.md',
                                    usage:
                                      'docs/user/types/acknowledgments/acknowledgment/names/name-usage.en.md',
                                  },
                                  i18n: {
                                    title:
                                      'v2_1.AcknowledgmentsItemsNamesItemsTitle',
                                    description:
                                      'v2_1.AcknowledgmentsItemsNamesItemsDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.namesItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'want_to_have',
                                    csaf_security_incident_response:
                                      'want_to_have',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'best_practice',
                                    csaf_vex: 'want_to_have',
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  'Albert Einstein',
                                  'Johann Sebastian Bach',
                                ],
                                metaInfo: {},
                                type: 'STRING',
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
                            title: 'Contributing organization',
                            description:
                              'Contains the name of a contributing organization being recognized.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/types/acknowledgments/acknowledgment/organization-spec.en.md',
                                usage:
                                  'docs/user/types/acknowledgments/acknowledgment/organization-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'nice_to_know',
                              },
                              i18n: {
                                title:
                                  'v2_1.AcknowledgmentsItemsOrganizationTitle',
                                description:
                                  'v2_1.AcknowledgmentsItemsOrganizationDescription',
                              },
                            },
                            minLength: 1,
                            examples: ['CISA', 'Google Project Zero', 'Talos'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'summary',
                            ],
                            title: 'Summary of the acknowledgment',
                            description:
                              'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
                            metaData: {
                              uiType: 'STRING_MULTI_LINE',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/acknowledgments/acknowledgment/summary-spec.en.md',
                                usage:
                                  'docs/user/types/acknowledgments/acknowledgment/summary-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'nice_to_know',
                              },
                              i18n: {
                                title: 'v2_1.AcknowledgmentsItemsSummaryTitle',
                                description:
                                  'v2_1.AcknowledgmentsItemsSummaryDescription',
                              },
                            },
                            minLength: 1,
                            examples: [
                              'First analysis of Coordinated Multi-Stream Attack (CMSA)',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'urls',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'urls',
                            ],
                            title: 'List of URLs',
                            description:
                              'Specifies a list of URLs or location of the reference to be acknowledged.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/types/acknowledgments/acknowledgment/urls-spec.en.md',
                                usage:
                                  'docs/user/types/acknowledgments/acknowledgment/urls-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'nice_to_know',
                              },
                              i18n: {
                                title: 'v2_1.AcknowledgmentsItemsUrlsTitle',
                                description:
                                  'v2_1.AcknowledgmentsItemsUrlsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'acknowledgments',
                                  'urls',
                                ],
                                title: 'URL of acknowledgment',
                                description:
                                  'Contains the URL or location of the reference to be acknowledged.',
                                metaData: {
                                  uiType: 'STRING_URI',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/acknowledgments/acknowledgment/urls/url-spec.en.md',
                                    usage:
                                      'docs/user/types/acknowledgments/acknowledgment/urls/url-usage.en.md',
                                  },
                                  i18n: {
                                    title:
                                      'v2_1.AcknowledgmentsItemsUrlsItemsTitle',
                                    description:
                                      'v2_1.AcknowledgmentsItemsUrlsItemsDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.urlsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'nice_to_know',
                                    csaf_security_incident_response:
                                      'nice_to_know',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'nice_to_know',
                                    csaf_vex: 'nice_to_know',
                                  },
                                },
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'cve',
                  fullName: ['vulnerabilities', 'cve'],
                  title: 'CVE',
                  description:
                    'Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/cve-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/cve-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'want_to_have',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsCveTitle',
                      description: 'v2_1.VulnerabilitiesItemsCveDescription',
                    },
                  },
                  pattern: '^CVE-[0-9]{4}-[0-9]{4,}$',
                  metaInfo: {},
                  type: 'STRING',
                },
                {
                  key: 'cwes',
                  fullName: ['vulnerabilities', 'cwes'],
                  title: 'List of CWEs',
                  description: 'Contains a list of CWEs.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/cwes-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/cwes-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'want_to_have',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'want_to_have',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsCwesTitle',
                      description: 'v2_1.VulnerabilitiesItemsCwesDescription',
                    },
                    uiType: 'OBJECT_CWE',
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'cwes'],
                      title: 'CWE',
                      description:
                        'Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/cwes-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/cwes-usage.en.md',
                        },
                        relevanceLevels: {
                          csaf_base: 'want_to_have',
                          csaf_security_incident_response: 'optional',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'best_practice',
                          csaf_vex: 'want_to_have',
                        },
                        i18n: {
                          title: 'v2_1.VulnerabilitiesItemsCwesTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsCwesDescription',
                        },
                        uiType: 'OBJECT_CWE',
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'id',
                            fullName: ['vulnerabilities', 'cwes', 'id'],
                            title: 'Weakness ID',
                            description:
                              'Holds the ID for the weakness associated.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/cwes/id-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/cwes/id-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.VulnerabilitiesItemsCwesIdTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsCwesIdDescription',
                              },
                            },
                            examples: ['CWE-22', 'CWE-352', 'CWE-79'],
                            pattern: '^CWE-[1-9]\\d{0,5}$',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'name',
                            fullName: ['vulnerabilities', 'cwes', 'name'],
                            title: 'Weakness name',
                            description:
                              'Holds the full name of the weakness as given in the CWE specification.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/cwes/name-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/cwes/name-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.VulnerabilitiesItemsCwesNameTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsCwesNameDescription',
                              },
                            },
                            minLength: 1,
                            examples: [
                              'Cross-Site Request Forgery (CSRF)',
                              "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                              "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                            ],
                            pattern: '^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'version',
                            fullName: ['vulnerabilities', 'cwes', 'version'],
                            title: 'CWE version',
                            description:
                              'Holds the version string of the CWE specification this weakness was extracted from.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/cwes/version-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/cwes/version-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsCwesVersionTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsCwesVersionDescription',
                              },
                            },
                            examples: ['1.0', '3.4.1', '4.0', '4.11', '4.12'],
                            pattern:
                              '^[1-9]\\d*\\.([0-9]|([1-9]\\d+))(\\.\\d+)?$',
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'disclosure_date',
                  fullName: ['vulnerabilities', 'disclosure_date'],
                  title: 'Disclosure date',
                  description:
                    'Holds the date and time the vulnerability was originally disclosed to the public.',
                  metaData: {
                    uiType: 'STRING_DATETIME',
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/disclosure_date-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/disclosure_date-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'nice_to_know',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsDisclosureDateTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsDisclosureDateDescription',
                    },
                  },
                  metaInfo: {},
                  type: 'STRING',
                },
                {
                  key: 'discovery_date',
                  fullName: ['vulnerabilities', 'discovery_date'],
                  title: 'Discovery date',
                  description:
                    'Holds the date and time the vulnerability was originally discovered.',
                  metaData: {
                    uiType: 'STRING_DATETIME',
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/discovery_date-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/discovery_date-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'want_to_have',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'nice_to_know',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsDiscoveryDateTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsDiscoveryDateDescription',
                    },
                  },
                  metaInfo: {},
                  type: 'STRING',
                },
                {
                  key: 'first_known_exploitation_dates',
                  fullName: [
                    'vulnerabilities',
                    'first_known_exploitation_dates',
                  ],
                  title: 'List of first known exploitation dates',
                  description:
                    'Contains a list of dates of first known exploitations.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: [
                        'vulnerabilities',
                        'first_known_exploitation_dates',
                      ],
                      title: 'First known exploitation date',
                      description:
                        'Contains information on when this vulnerability was first known to be exploited in the wild in the products specified.',
                      metaData: {},
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'first_known_exploitation_dates',
                              'date',
                            ],
                            title: 'Date of the information',
                            description:
                              'Contains the date when the information was last updated.',
                            metaData: { uiType: 'STRING_DATETIME' },
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'exploitation_date',
                            fullName: [
                              'vulnerabilities',
                              'first_known_exploitation_dates',
                              'exploitation_date',
                            ],
                            title: 'Date of the exploitation',
                            description:
                              'Contains the date when the exploitation happened.',
                            metaData: { uiType: 'STRING_DATETIME' },
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'first_known_exploitation_dates',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'first_known_exploitation_dates',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                metaData: {},
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'first_known_exploitation_dates',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'first_known_exploitation_dates',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {},
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'flags',
                  fullName: ['vulnerabilities', 'flags'],
                  title: 'List of flags',
                  description: 'Contains a list of machine readable flags.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/flags-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/flags-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'optional',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'optional',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsFlagsTitle',
                      description: 'v2_1.VulnerabilitiesItemsFlagsDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'flags'],
                      title: 'Flag',
                      description:
                        'Contains product specific information in regard to this vulnerability as a single machine readable flag.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/flags/flag-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/flags/flag-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.VulnerabilitiesItemsFlagsItemsTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsFlagsItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.flagsItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'optional',
                          csaf_security_incident_response: 'optional',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'optional',
                          csaf_vex: 'mandatory',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'date',
                            fullName: ['vulnerabilities', 'flags', 'date'],
                            title: 'Date of the flag',
                            description:
                              'Contains the date when assessment was done or the flag was assigned.',
                            metaData: {
                              uiType: 'STRING_DATETIME',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/date-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/date-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'best_practice',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsFlagsItemsDateTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsFlagsItemsDateDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'group_ids',
                            fullName: ['vulnerabilities', 'flags', 'group_ids'],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/group_ids-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/group_ids-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductGroupsTitle',
                                description: 'v2_1.ProductGroupsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'flags',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_GROUP_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_group_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_group_id-spec.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductGroupIdTitle',
                                    description:
                                      'v2_1.ProductGroupIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productGroupIdsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'mandatory',
                                    csaf_security_incident_response:
                                      'mandatory',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'mandatory',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'label',
                            fullName: ['vulnerabilities', 'flags', 'label'],
                            title: 'Label of the flag',
                            description:
                              'Specifies the machine readable label.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/label-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/label-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsFlagsItemsLabelTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsFlagsItemsLabelDescription',
                              },
                            },
                            enum: [
                              'component_not_present',
                              'inline_mitigations_already_exist',
                              'vulnerable_code_cannot_be_controlled_by_adversary',
                              'vulnerable_code_not_in_execute_path',
                              'vulnerable_code_not_present',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'flags',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/product_ids-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/flags/flag/product_ids-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductsTitle',
                                description: 'v2_1.ProductsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'flags',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_PRODUCT_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_id-usage.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductIdTitle',
                                    description: 'v2_1.ProductIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'mandatory',
                                    csaf_security_incident_response:
                                      'mandatory',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'mandatory',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
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
                  description:
                    'Represents a list of unique labels or tracking IDs for the vulnerability (if such information exists).',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/ids-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/ids-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsIdsTitle',
                      description: 'v2_1.VulnerabilitiesItemsIdsDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'ids'],
                      title: 'ID',
                      description:
                        'Contains a single unique label or tracking ID for the vulnerability.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/ids/id-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/ids/id-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.VulnerabilitiesItemsIdsItemsTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsIdsItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.idsItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'optional',
                          csaf_security_incident_response: 'nice_to_know',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'nice_to_know',
                          csaf_vex: 'mandatory',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'system_name',
                            fullName: ['vulnerabilities', 'ids', 'system_name'],
                            title: 'System name',
                            description:
                              'Indicates the name of the vulnerability tracking or numbering system.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/ids/id/system_name-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/ids/id/system_name-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsIdsItemsSystemNameTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsIdsItemsSystemNameDescription',
                              },
                            },
                            minLength: 1,
                            examples: ['Cisco Bug ID', 'GitHub Issue'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'text',
                            fullName: ['vulnerabilities', 'ids', 'text'],
                            title: 'Text',
                            description:
                              'Is unique label or tracking ID for the vulnerability (if such information exists).',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/ids/id/text-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/ids/id/text-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsIdsItemsTextTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsIdsItemsTextDescription',
                              },
                            },
                            minLength: 1,
                            examples: ['CSCso66472', 'oasis-tcs/csaf#210'],
                            metaInfo: {},
                            type: 'STRING',
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
                  description: 'Contains a list of involvements.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/involvements-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/involvements-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'nice_to_know',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsInvolvementsTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsInvolvementsDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'involvements'],
                      title: 'Involvement',
                      description:
                        'Is a container, that allows the document producers to comment on the level of involvement (or engagement) of themselves or third parties in the vulnerability identification, scoping, and remediation process.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/involvements/involvement-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/involvements/involvement-usage.en.md',
                        },
                        i18n: {
                          title:
                            'v2_1.VulnerabilitiesItemsInvolvementsItemsTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsInvolvementsItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.involvementsItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'optional',
                          csaf_security_incident_response: 'nice_to_know',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'nice_to_know',
                          csaf_vex: 'nice_to_know',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'contact',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'contact',
                            ],
                            title: 'Party contact information',
                            description:
                              'Contains the contact information of the party that was used in this state.',
                            metaData: {},
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'date',
                            ],
                            title: 'Date of involvement',
                            description:
                              'Holds the date and time of the involvement entry.',
                            metaData: {
                              uiType: 'STRING_DATETIME',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/date-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/date-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'best_practice',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsDateTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsDateDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'involvements',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                metaData: {},
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'party',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'party',
                            ],
                            title: 'Party category',
                            description:
                              'Defines the category of the involved party.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/party-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/party-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsPartyTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsPartyDescription',
                              },
                            },
                            enum: [
                              'coordinator',
                              'discoverer',
                              'other',
                              'user',
                              'vendor',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'involvements',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {},
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'status',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'status',
                            ],
                            title: 'Party status',
                            description:
                              'Defines contact status of the involved party.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/status-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/status-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsStatusTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsStatusDescription',
                              },
                            },
                            enum: [
                              'completed',
                              'contact_attempted',
                              'disputed',
                              'in_progress',
                              'not_contacted',
                              'open',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'summary',
                            ],
                            title: 'Summary of the involvement',
                            description:
                              'Contains additional context regarding what is going on.',
                            metaData: {
                              uiType: 'STRING_MULTI_LINE',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/summary-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/involvements/involvement/summary-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'best_practice',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsSummaryTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsInvolvementsItemsSummaryDescription',
                              },
                            },
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'metrics',
                  fullName: ['vulnerabilities', 'metrics'],
                  title: 'List of metrics',
                  description:
                    'Contains metric objects for the current vulnerability.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/scores-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/scores-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'nice_to_know',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsScoresTitle',
                      description: 'v2_1.VulnerabilitiesItemsScoresDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'metrics'],
                      title: 'metric',
                      description:
                        'Contains all metadata about the metric including products it applies to and the source and the content itself.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/scores/score-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/scores/score-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.VulnerabilitiesItemsScoresItemsTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsScoresItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.scoresItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'nice_to_know',
                          csaf_security_incident_response: 'nice_to_know',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'best_practice',
                          csaf_vex: 'mandatory',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'content',
                            fullName: ['vulnerabilities', 'metrics', 'content'],
                            title: 'Content',
                            description:
                              'Specifies information about (at least one) metric or score for the given products regarding the current vulnerability.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/metrics/content-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/metrics/content-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsMetricsContentTitle',
                                description:
                                  'v2_1.CvssV2VersionMetricsContentDescription',
                              },
                            },
                            type: 'OBJECT',
                            metaInfo: {
                              propertyList: [
                                {
                                  key: 'cvss_v2',
                                  fullName: [
                                    'vulnerabilities',
                                    'metrics',
                                    'content',
                                    'cvss_v2',
                                  ],
                                  title: 'CVSS v2',
                                  metaData: {
                                    title: 'CVSS v2',
                                    description:
                                      'JSON Schema for Common Vulnerability Scoring System version 2.0',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                      usage:
                                        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'optional',
                                      csaf_security_incident_response:
                                        'optional',
                                      csaf_informational_advisory: 'excluded',
                                      csaf_security_advisory: 'optional',
                                      csaf_vex: 'optional',
                                    },
                                    i18n: {
                                      title: 'v2_1.CvssV2Title',
                                      description: 'v2_1.CvssV2Description',
                                    },
                                    uiType: 'OBJECT_CVSS_2',
                                  },
                                  type: 'OBJECT',
                                  metaInfo: {
                                    propertyList: [
                                      {
                                        key: 'version',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'version',
                                        ],
                                        description: 'CVSS Version',
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title: 'v2_1.CvssV2VersionTitle',
                                            description:
                                              'v2_1.CvssV2VersionDescription',
                                          },
                                        },
                                        enum: ['2.0'],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'vectorString',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'vectorString',
                                        ],
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2VectorStringTitle',
                                            description:
                                              'v2_1.CvssV2VectorStringDescription',
                                          },
                                        },
                                        pattern:
                                          '^((AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))/)*(AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))$',
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'accessVector',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'accessVector',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'best_practice',
                                            csaf_security_incident_response:
                                              'best_practice',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'best_practice',
                                            csaf_vex: 'best_practice',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2AccessVectorTitle',
                                            description:
                                              'v2_1.CvssV2AccessVectorDescription',
                                          },
                                        },
                                        enum: [
                                          'NETWORK',
                                          'ADJACENT_NETWORK',
                                          'LOCAL',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'accessComplexity',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'accessComplexity',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'best_practice',
                                            csaf_security_incident_response:
                                              'best_practice',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'best_practice',
                                            csaf_vex: 'best_practice',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2AccessComplexityTitle',
                                            description:
                                              'v2_1.CvssV2AccessComplexityDescription',
                                          },
                                        },
                                        enum: ['HIGH', 'MEDIUM', 'LOW'],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'authentication',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'authentication',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'best_practice',
                                            csaf_security_incident_response:
                                              'best_practice',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'best_practice',
                                            csaf_vex: 'best_practice',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2AuthenticationTitle',
                                            description:
                                              'v2_1.CvssV2AuthenticationDescription',
                                          },
                                        },
                                        enum: ['MULTIPLE', 'SINGLE', 'NONE'],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'confidentialityImpact',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'confidentialityImpact',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'best_practice',
                                            csaf_security_incident_response:
                                              'best_practice',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'best_practice',
                                            csaf_vex: 'best_practice',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2ConfidentialityImpactTitle',
                                            description:
                                              'v2_1.CvssV2ConfidentialityImpactDescription',
                                          },
                                        },
                                        enum: ['NONE', 'PARTIAL', 'COMPLETE'],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'integrityImpact',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'integrityImpact',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'best_practice',
                                            csaf_security_incident_response:
                                              'best_practice',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'best_practice',
                                            csaf_vex: 'best_practice',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2IntegrityImpactTitle',
                                            description:
                                              'v2_1.CvssV2IntegrityImpactDescription',
                                          },
                                        },
                                        enum: ['NONE', 'PARTIAL', 'COMPLETE'],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'availabilityImpact',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'availabilityImpact',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'best_practice',
                                            csaf_security_incident_response:
                                              'best_practice',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'best_practice',
                                            csaf_vex: 'best_practice',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2AvailabilityImpactTitle',
                                            description:
                                              'v2_1.CvssV2AvailabilityImpactDescription',
                                          },
                                        },
                                        enum: ['NONE', 'PARTIAL', 'COMPLETE'],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'baseScore',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'baseScore',
                                        ],
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'mandatory',
                                            csaf_security_incident_response:
                                              'mandatory',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'mandatory',
                                            csaf_vex: 'mandatory',
                                          },
                                          i18n: {
                                            title: 'v2_1.CvssV2BaseScoreTitle',
                                            description:
                                              'v2_1.CvssV2BaseScoreDescription',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'NUMBER',
                                      },
                                      {
                                        key: 'exploitability',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'exploitability',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'nice_to_know',
                                            csaf_security_incident_response:
                                              'nice_to_know',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'nice_to_know',
                                            csaf_vex: 'nice_to_know',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2ExploitabilityTitle',
                                            description:
                                              'v2_1.CvssV2ExploitabilityDescription',
                                          },
                                        },
                                        enum: [
                                          'UNPROVEN',
                                          'PROOF_OF_CONCEPT',
                                          'FUNCTIONAL',
                                          'HIGH',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'remediationLevel',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'remediationLevel',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'want_to_have',
                                            csaf_security_incident_response:
                                              'want_to_have',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'want_to_have',
                                            csaf_vex: 'want_to_have',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2RemediationLevelTitle',
                                            description:
                                              'v2_1.CvssV2RemediationLevelDescription',
                                          },
                                        },
                                        enum: [
                                          'OFFICIAL_FIX',
                                          'TEMPORARY_FIX',
                                          'WORKAROUND',
                                          'UNAVAILABLE',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'reportConfidence',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'reportConfidence',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'want_to_have',
                                            csaf_security_incident_response:
                                              'want_to_have',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'want_to_have',
                                            csaf_vex: 'want_to_have',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2ReportConfidenceTitle',
                                            description:
                                              'v2_1.CvssV2ReportConfidenceDescription',
                                          },
                                        },
                                        enum: [
                                          'UNCONFIRMED',
                                          'UNCORROBORATED',
                                          'CONFIRMED',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'temporalScore',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'temporalScore',
                                        ],
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'want_to_have',
                                            csaf_security_incident_response:
                                              'want_to_have',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory:
                                              'want_to_have',
                                            csaf_vex: 'want_to_have',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2TemporalScoreTitle',
                                            description:
                                              'v2_1.CvssV2TemporalScoreDescription',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'NUMBER',
                                      },
                                      {
                                        key: 'collateralDamagePotential',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'collateralDamagePotential',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'optional',
                                            csaf_security_incident_response:
                                              'optional',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'optional',
                                            csaf_vex: 'optional',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2CollateralDamagePotentialTitle',
                                            description:
                                              'v2_1.CvssV2CollateralDamagePotentialDescription',
                                          },
                                        },
                                        enum: [
                                          'NONE',
                                          'LOW',
                                          'LOW_MEDIUM',
                                          'MEDIUM_HIGH',
                                          'HIGH',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'targetDistribution',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'targetDistribution',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'optional',
                                            csaf_security_incident_response:
                                              'optional',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'optional',
                                            csaf_vex: 'optional',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2TargetDistributionTitle',
                                            description:
                                              'v2_1.CvssV2TargetDistributionDescription',
                                          },
                                        },
                                        enum: [
                                          'NONE',
                                          'LOW',
                                          'MEDIUM',
                                          'HIGH',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'confidentialityRequirement',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'confidentialityRequirement',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'optional',
                                            csaf_security_incident_response:
                                              'optional',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'optional',
                                            csaf_vex: 'optional',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2ConfidentialityRequirementTitle',
                                            description:
                                              'v2_1.CvssV2ConfidentialityRequirementDescription',
                                          },
                                        },
                                        enum: [
                                          'LOW',
                                          'MEDIUM',
                                          'HIGH',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'integrityRequirement',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'integrityRequirement',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'optional',
                                            csaf_security_incident_response:
                                              'optional',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'optional',
                                            csaf_vex: 'optional',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2IntegrityRequirementTitle',
                                            description:
                                              'v2_1.CvssV2IntegrityRequirementDescription',
                                          },
                                        },
                                        enum: [
                                          'LOW',
                                          'MEDIUM',
                                          'HIGH',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'availabilityRequirement',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'availabilityRequirement',
                                        ],
                                        metaData: {
                                          uiType: 'STRING_ENUM',
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'optional',
                                            csaf_security_incident_response:
                                              'optional',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'optional',
                                            csaf_vex: 'optional',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2AvailabilityRequirementTitle',
                                            description:
                                              'v2_1.CvssV2AvailabilityRequirementDescription',
                                          },
                                        },
                                        enum: [
                                          'LOW',
                                          'MEDIUM',
                                          'HIGH',
                                          'NOT_DEFINED',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'environmentalScore',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'cvss_v2',
                                          'environmentalScore',
                                        ],
                                        metaData: {
                                          userDocumentation: {
                                            specification:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
                                            usage:
                                              'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
                                          },
                                          relevanceLevels: {
                                            csaf_base: 'optional',
                                            csaf_security_incident_response:
                                              'optional',
                                            csaf_informational_advisory:
                                              'excluded',
                                            csaf_security_advisory: 'optional',
                                            csaf_vex: 'optional',
                                          },
                                          i18n: {
                                            title:
                                              'v2_1.CvssV2EnvironmentalScoreTitle',
                                            description:
                                              'v2_1.CvssV2EnvironmentalScoreDescription',
                                          },
                                        },
                                        metaInfo: {},
                                        type: 'NUMBER',
                                      },
                                    ],
                                  },
                                },
                                {
                                  key: 'cvss_v3',
                                  fullName: [
                                    'vulnerabilities',
                                    'metrics',
                                    'content',
                                    'cvss_v3',
                                  ],
                                  title: 'CVSS v3',
                                  metaData: {
                                    title: 'CVSS v3',
                                    description:
                                      'JSON Schema for Common Vulnerability Scoring System version 3.0',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
                                      usage:
                                        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'best_practice',
                                      csaf_security_incident_response:
                                        'best_practice',
                                      csaf_informational_advisory: 'excluded',
                                      csaf_security_advisory: 'best_practice',
                                      csaf_vex: 'best_practice',
                                    },
                                    i18n: {
                                      title: 'v2_1.CvssV3Title',
                                      description: 'v2_1.CvssV3Description',
                                    },
                                    uiType: 'OBJECT_CVSS_3',
                                  },
                                  type: 'OBJECT',
                                  metaInfo: { propertyList: [] },
                                },
                                {
                                  key: 'cvss_v4',
                                  fullName: [
                                    'vulnerabilities',
                                    'metrics',
                                    'content',
                                    'cvss_v4',
                                  ],
                                  title: 'CVSS v4',
                                  metaData: {
                                    title: 'CVSS v3',
                                    description:
                                      'JSON Schema for Common Vulnerability Scoring System version 3.0',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v4-spec.en.md',
                                      usage:
                                        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v4-usage.en.md',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'best_practice',
                                      csaf_security_incident_response:
                                        'best_practice',
                                      csaf_informational_advisory: 'excluded',
                                      csaf_security_advisory: 'best_practice',
                                      csaf_vex: 'best_practice',
                                    },
                                    i18n: {
                                      title: 'v2_1.CvssV4Title',
                                      description: 'v2_1.CvssV4Description',
                                    },
                                  },
                                  type: 'OBJECT',
                                  metaInfo: { propertyList: [] },
                                },
                                {
                                  key: 'epss',
                                  fullName: [
                                    'vulnerabilities',
                                    'metrics',
                                    'content',
                                    'epss',
                                  ],
                                  title: 'EPSS',
                                  description: 'Contains the EPSS data.',
                                  type: 'OBJECT',
                                  metaInfo: {
                                    propertyList: [
                                      {
                                        key: 'percentile',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'epss',
                                          'percentile',
                                        ],
                                        title: 'Percentile',
                                        description:
                                          'Contains the rank ordering of probabilities from highest to lowest.',
                                        metaData: {},
                                        pattern:
                                          '^(([0]\\.([0-9])+)|([1]\\.[0]+))$',
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'probability',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'epss',
                                          'probability',
                                        ],
                                        title: 'Probability',
                                        description:
                                          'Contains the likelihood that any exploitation activity for this Vulnerability is being observed in the 30 days following the given timestamp.',
                                        metaData: {},
                                        pattern:
                                          '^(([0]\\.([0-9])+)|([1]\\.[0]+))$',
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                      {
                                        key: 'timestamp',
                                        fullName: [
                                          'vulnerabilities',
                                          'metrics',
                                          'content',
                                          'epss',
                                          'timestamp',
                                        ],
                                        title: 'EPSS timestamp',
                                        description:
                                          'Holds the date and time the EPSS value was recorded.',
                                        metaData: { uiType: 'STRING_DATETIME' },
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    ],
                                  },
                                },
                                {
                                  key: 'qualitative_severity_rating',
                                  fullName: [
                                    'vulnerabilities',
                                    'metrics',
                                    'content',
                                    'qualitative_severity_rating',
                                  ],
                                  title: 'Qualitative Severity Rating',
                                  description:
                                    'Contains an assessment of the severity of the vulnerability regarding the products on a qualitative scale.',
                                  metaData: { uiType: 'STRING_ENUM' },
                                  enum: [
                                    'critical',
                                    'high',
                                    'low',
                                    'medium',
                                    'none',
                                  ],
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                                {
                                  key: 'ssvc_v2',
                                  fullName: [
                                    'vulnerabilities',
                                    'metrics',
                                    'content',
                                    'ssvc_v2',
                                  ],
                                  title: 'SSVC v2',
                                  type: 'OBJECT',
                                  metaInfo: { propertyList: [] },
                                },
                              ],
                            },
                          },
                          {
                            key: 'products',
                            fullName: [
                              'vulnerabilities',
                              'metrics',
                              'products',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/scores/score/products-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/scores/score/products-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductsTitle',
                                description: 'v2_1.ProductsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'metrics',
                                  'products',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_PRODUCT_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_id-usage.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductIdTitle',
                                    description: 'v2_1.ProductIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'mandatory',
                                    csaf_security_incident_response:
                                      'mandatory',
                                    csaf_informational_advisory: 'mandatory',
                                    csaf_security_advisory: 'mandatory',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'source',
                            fullName: ['vulnerabilities', 'metrics', 'source'],
                            title: 'Source',
                            description:
                              'Contains the URL of the source that originally determined the metric.',
                            metaData: {
                              uiType: 'STRING_URI',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/metrics/source-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/metrics/source-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsMetricsSourceTitle',
                                description:
                                  'v2_1.CvssV2VersionMetricsSourceDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'notes',
                  fullName: ['vulnerabilities', 'notes'],
                  title: 'Vulnerability notes',
                  description:
                    'Holds notes associated with this vulnerability item.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/notes-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/notes-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'want_to_have',
                      csaf_security_incident_response: 'want_to_have',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'mandatory',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsNotesTitle',
                      description: 'v2_1.VulnerabilitiesItemsNotesDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'notes'],
                      title: 'Note',
                      description:
                        'Is a place to put all manner of text blobs related to the current context.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/types/notes/note-spec.en.md',
                          usage: 'docs/user/types/notes/note-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.NotesItemsTitle',
                          description: 'v2_1.NotesItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.notesItemName',
                          itemNameField: 'title',
                        },
                        relevanceLevels: {
                          csaf_base: 'want_to_have',
                          csaf_security_incident_response: 'want_to_have',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'mandatory',
                          csaf_vex: 'mandatory',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'audience',
                            fullName: ['vulnerabilities', 'notes', 'audience'],
                            title: 'Audience of note',
                            description:
                              'Indicates who is intended to read it.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/types/notes/note/audience-spec.en.md',
                                usage:
                                  'docs/user/types/notes/note/audience-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'nice_to_know',
                              },
                              i18n: {
                                title: 'v2_1.NotesItemsAudienceTitle',
                                description:
                                  'v2_1.NotesItemsAudienceDescription',
                              },
                            },
                            minLength: 1,
                            examples: [
                              'all',
                              'executives',
                              'operational management and system administrators',
                              'safety engineers',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'category',
                            fullName: ['vulnerabilities', 'notes', 'category'],
                            title: 'Note category',
                            description:
                              'Contains the information of what kind of note this is.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/notes/note/category-spec.en.md',
                                usage:
                                  'docs/user/types/notes/note/category-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.NotesItemsCategoryTitle',
                                description:
                                  'v2_1.NotesItemsCategoryDescription',
                              },
                            },
                            enum: [
                              'description',
                              'details',
                              'faq',
                              'general',
                              'legal_disclaimer',
                              'other',
                              'summary',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'group_ids',
                            fullName: ['vulnerabilities', 'notes', 'group_ids'],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'notes',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                metaData: {},
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'notes',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'notes',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {},
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'text',
                            fullName: ['vulnerabilities', 'notes', 'text'],
                            title: 'Note content',
                            description:
                              'Holds the content of the note. Content varies depending on type.',
                            metaData: {
                              uiType: 'STRING_MULTI_LINE',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/notes/note/text-spec.en.md',
                                usage:
                                  'docs/user/types/notes/note/text-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.NotesItemsTextTitle',
                                description: 'v2_1.NotesItemsTextDescription',
                              },
                            },
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'title',
                            fullName: ['vulnerabilities', 'notes', 'title'],
                            title: 'Title of note',
                            description:
                              'Provides a concise description of what is contained in the text of the note.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/types/notes/note/title-spec.en.md',
                                usage:
                                  'docs/user/types/notes/note/title-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'best_practice',
                              },
                              i18n: {
                                title: 'v2_1.NotesItemsTitleTitle',
                                description: 'v2_1.NotesItemsTitleDescription',
                              },
                            },
                            minLength: 1,
                            examples: [
                              'Details',
                              'Executive summary',
                              'Technical summary',
                              'Impact on safety systems',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'product_status',
                  fullName: ['vulnerabilities', 'product_status'],
                  title: 'Product status',
                  description:
                    'Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability. ',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/product_status-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/product_status-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'nice_to_know',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'mandatory',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsProductStatusTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsProductStatusDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'first_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'first_affected',
                        ],
                        title: 'First affected',
                        description:
                          'These are the first versions of the releases known to be affected by the vulnerability.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/first_affected-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/first_affected-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'optional',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusFirstAffectedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusFirstAffectedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'first_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'optional',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'first_fixed',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'first_fixed',
                        ],
                        title: 'First fixed',
                        description:
                          'These versions contain the first fix for the vulnerability but may not be the recommended fixed versions.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/first_fixed-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/first_fixed-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'optional',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusFirstFixedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusFirstFixedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'first_fixed',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'optional',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'fixed',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'fixed',
                        ],
                        title: 'Fixed',
                        description:
                          'These versions contain a fix for the vulnerability but may not be the recommended fixed versions.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/fixed-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/fixed-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusFixedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusFixedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'fixed',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'mandatory',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'known_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'known_affected',
                        ],
                        title: 'Known affected',
                        description:
                          'These versions are known to be affected by the vulnerability.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/known_affected-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/known_affected-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'best_practice',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusKnownAffectedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusKnownAffectedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'known_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'mandatory',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'known_not_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'known_not_affected',
                        ],
                        title: 'Known not affected',
                        description:
                          'These versions are known not to be affected by the vulnerability.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/known_not_affected-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/known_not_affected-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusKnownNotAffectedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusKnownNotAffectedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'known_not_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'mandatory',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'last_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'last_affected',
                        ],
                        title: 'Last affected',
                        description:
                          'These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/last_affected-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/last_affected-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'optional',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusLastAffectedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusLastAffectedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'last_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'optional',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'recommended',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'recommended',
                        ],
                        title: 'Recommended',
                        description:
                          'These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/recommended-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/recommended-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'want_to_have',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'want_to_have',
                            csaf_vex: 'nice_to_know',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusRecommendedTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusRecommendedDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'recommended',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'want_to_have',
                                csaf_vex: 'nice_to_know',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'under_investigation',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'under_investigation',
                        ],
                        title: 'Under investigation',
                        description:
                          'It is not known yet whether these versions are or are not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/vulnerabilities/vulnerability/product_status/under_investigation-spec.en.md',
                            usage:
                              'docs/user/vulnerabilities/vulnerability/product_status/under_investigation-usage.en.md',
                          },
                          relevanceLevels: {
                            csaf_base: 'nice_to_know',
                            csaf_security_incident_response: 'nice_to_know',
                            csaf_informational_advisory: 'excluded',
                            csaf_security_advisory: 'nice_to_know',
                            csaf_vex: 'mandatory',
                          },
                          i18n: {
                            title:
                              'v2_1.VulnerabilitiesItemsProductStatusUnderInvestigationTitle',
                            description:
                              'v2_1.VulnerabilitiesItemsProductStatusUnderInvestigationDescription',
                          },
                        },
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'under_investigation',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {
                              uiType: 'STRING_PRODUCT_ID',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/products-spec.en.md',
                                usage: 'docs/user/types/products-usage.en.md',
                              },
                              i18n: {
                                title: 'v2_1.ProductIdTitle',
                                description: 'v2_1.ProductIdDescription',
                              },
                              itemName: {
                                itemNameTranslationKey:
                                  'arrays.productsItemName',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'mandatory',
                              },
                            },
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'unknown',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'unknown',
                        ],
                        title: 'Unknown',
                        description:
                          'It is not known whether these versions are or are not affected by the vulnerability. There is also no investigation and therefore the status might never be determined.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'unknown',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            metaData: {},
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  key: 'references',
                  fullName: ['vulnerabilities', 'references'],
                  title: 'Vulnerability references',
                  description:
                    'Holds a list of references associated with this vulnerability item.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/references-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/references-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'nice_to_know',
                      csaf_security_incident_response: 'want_to_have',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'best_practice',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsReferencesTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsReferencesDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'references'],
                      title: 'Reference',
                      description:
                        'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/types/references/reference-spec.en.md',
                          usage:
                            'docs/user/types/references/reference-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.ReferencesItemsTitle',
                          description: 'v2_1.ReferencesItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.referencesItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'nice_to_know',
                          csaf_security_incident_response: 'want_to_have',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'best_practice',
                          csaf_vex: 'best_practice',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'references',
                              'category',
                            ],
                            title: 'Category of reference',
                            description:
                              'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/references/reference/category-spec.en.md',
                                usage:
                                  'docs/user/types/references/reference/category-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'want_to_have',
                                csaf_vex: 'want_to_have',
                              },
                              i18n: {
                                title: 'v2_1.ReferencesItemsCategoryTitle',
                                description:
                                  'v2_1.ReferencesItemsCategoryDescription',
                              },
                            },
                            default: 'external',
                            enum: ['external', 'self'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'references',
                              'summary',
                            ],
                            title: 'Summary of the reference',
                            description:
                              'Indicates what this reference refers to.',
                            metaData: {
                              uiType: 'STRING_MULTI_LINE',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/references/reference/summary-spec.en.md',
                                usage:
                                  'docs/user/types/references/reference/summary-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ReferencesItemsSummaryTitle',
                                description:
                                  'v2_1.ReferencesItemsSummaryDescription',
                              },
                            },
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'url',
                            fullName: ['vulnerabilities', 'references', 'url'],
                            title: 'URL of reference',
                            description: 'Provides the URL for the reference.',
                            metaData: {
                              uiType: 'STRING_URI',
                              userDocumentation: {
                                specification:
                                  'docs/user/types/references/reference/url-spec.en.md',
                                usage:
                                  'docs/user/types/references/reference/url-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ReferencesItemsUrlTitle',
                                description:
                                  'v2_1.ReferencesItemsUrlDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'remediations',
                  fullName: ['vulnerabilities', 'remediations'],
                  title: 'List of remediations',
                  description: 'Contains a list of remediations.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/remediations-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/remediations-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'want_to_have',
                      csaf_security_incident_response: 'want_to_have',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsRemediationsTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsRemediationsDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'remediations'],
                      title: 'Remediation',
                      description:
                        'Specifies details on how to handle (and presumably, fix) a vulnerability.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/remediations/remediation-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/remediations/remediation-usage.en.md',
                        },
                        i18n: {
                          title:
                            'v2_1.VulnerabilitiesItemsRemediationsItemsTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsRemediationsItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.remediationsItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'want_to_have',
                          csaf_security_incident_response: 'want_to_have',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'best_practice',
                          csaf_vex: 'mandatory',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'category',
                            ],
                            title: 'Category of the remediation',
                            description:
                              'Specifies the category which this remediation belongs to.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/category-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/category-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsCategoryTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsCategoryDescription',
                              },
                            },
                            enum: [
                              'fix_planned',
                              'mitigation',
                              'no_fix_planned',
                              'none_available',
                              'optional_patch',
                              'vendor_fix',
                              'workaround',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'date',
                            ],
                            title: 'Date of the remediation',
                            description:
                              'Contains the date from which the remediation is available.',
                            metaData: {
                              uiType: 'STRING_DATETIME',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/date-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/date-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'want_to_have',
                                csaf_vex: 'want_to_have',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsDateTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsDateDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'details',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'details',
                            ],
                            title: 'Details of the remediation',
                            description:
                              'Contains a thorough human-readable discussion of the remediation.',
                            metaData: {
                              uiType: 'STRING_MULTI_LINE',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/details-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/details-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsDetailsTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsDetailsDescription',
                              },
                            },
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'entitlements',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'entitlements',
                            ],
                            title: 'List of entitlements',
                            description: 'Contains a list of entitlements.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/entitlements-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/entitlements-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'optional',
                                csaf_security_incident_response: 'optional',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'nice_to_know',
                                csaf_vex: 'nice_to_know',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsEntitlementsTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsEntitlementsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'entitlements',
                                ],
                                title: 'Entitlement of the remediation',
                                description:
                                  'Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability.',
                                metaData: {
                                  uiType: 'STRING_MULTI_LINE',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/vulnerabilities/vulnerability/remediations/remediation/entitlements/entitlement-spec.en.md',
                                    usage:
                                      'docs/user/vulnerabilities/vulnerability/remediations/remediation/entitlements/entitlement-usage.en.md',
                                  },
                                  i18n: {
                                    title:
                                      'v2_1.VulnerabilitiesItemsRemediationsItemsEntitlementsItemsTitle',
                                    description:
                                      'v2_1.VulnerabilitiesItemsRemediationsItemsEntitlementsItemsDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.entitlementsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'optional',
                                    csaf_security_incident_response: 'optional',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'nice_to_know',
                                    csaf_vex: 'nice_to_know',
                                  },
                                },
                                minLength: 1,
                                metaInfo: {},
                                type: 'STRING',
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
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/group_ids-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/group_ids-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductGroupsTitle',
                                description: 'v2_1.ProductGroupsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_GROUP_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_group_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_group_id-usage.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductGroupIdTitle',
                                    description:
                                      'v2_1.ProductGroupIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productGroupIdsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'mandatory',
                                    csaf_security_incident_response:
                                      'mandatory',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'mandatory',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
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
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/product_ids-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/product_ids-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductsTitle',
                                description: 'v2_1.ProductsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_PRODUCT_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_id-usage.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductIdTitle',
                                    description: 'v2_1.ProductIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'mandatory',
                                    csaf_security_incident_response:
                                      'mandatory',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'mandatory',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
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
                            description:
                              'Provides information on the category of restart required by this remediation to become effective.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'optional',
                                csaf_security_incident_response: 'optional',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'want_to_have',
                                csaf_vex: 'nice_to_know',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsRestartRequiredTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsRestartRequiredDescription',
                              },
                            },
                            type: 'OBJECT',
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
                                  title: 'Category of restart',
                                  description:
                                    'Specifies what category of restart is required by this remediation to become effective.',
                                  metaData: {
                                    uiType: 'STRING_ENUM',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/category-spec.en.md',
                                      usage:
                                        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/category-usage.en.md',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'mandatory',
                                      csaf_security_incident_response:
                                        'mandatory',
                                      csaf_informational_advisory: 'mandatory',
                                      csaf_security_advisory: 'mandatory',
                                      csaf_vex: 'mandatory',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.VulnerabilitiesItemsRemediationsItemsRestartRequiredCategoryTitle',
                                      description:
                                        'v2_1.VulnerabilitiesItemsRemediationsItemsRestartRequiredCategoryDescription',
                                    },
                                  },
                                  enum: [
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
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                                {
                                  key: 'details',
                                  fullName: [
                                    'vulnerabilities',
                                    'remediations',
                                    'restart_required',
                                    'details',
                                  ],
                                  title: 'Additional restart information',
                                  description:
                                    'Provides additional information for the restart. This can include details on procedures, scope or impact.',
                                  metaData: {
                                    uiType: 'STRING_MULTI_LINE',
                                    userDocumentation: {
                                      specification:
                                        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/details-spec.en.md',
                                      usage:
                                        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/details-usage.en.md',
                                    },
                                    relevanceLevels: {
                                      csaf_base: 'optional',
                                      csaf_security_incident_response:
                                        'optional',
                                      csaf_informational_advisory: 'excluded',
                                      csaf_security_advisory: 'want_to_have',
                                      csaf_vex: 'nice_to_know',
                                    },
                                    i18n: {
                                      title:
                                        'v2_1.VulnerabilitiesItemsRemediationsItemsRestartRequiredDetailsTitle',
                                      description:
                                        'v2_1.VulnerabilitiesItemsRemediationsItemsRestartRequiredDetailsDescription',
                                    },
                                  },
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
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
                            title: 'URL to the remediation',
                            description:
                              'Contains the URL where to obtain the remediation.',
                            metaData: {
                              uiType: 'STRING_URI',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/url-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/remediations/remediation/url-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'best_practice',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsUrlTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsRemediationsItemsUrlDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'threats',
                  fullName: ['vulnerabilities', 'threats'],
                  title: 'List of threats',
                  description:
                    'Contains information about a vulnerability that can change with time.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/threats-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/threats-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'optional',
                      csaf_security_incident_response: 'nice_to_know',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'nice_to_know',
                      csaf_vex: 'mandatory',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsThreatsTitle',
                      description:
                        'v2_1.VulnerabilitiesItemsThreatsDescription',
                    },
                  },
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'threats'],
                      title: 'Threat',
                      description:
                        'Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available.',
                      metaData: {
                        userDocumentation: {
                          specification:
                            'docs/user/vulnerabilities/vulnerability/threats/threat-spec.en.md',
                          usage:
                            'docs/user/vulnerabilities/vulnerability/threats/threat-usage.en.md',
                        },
                        i18n: {
                          title: 'v2_1.VulnerabilitiesItemsThreatsItemsTitle',
                          description:
                            'v2_1.VulnerabilitiesItemsThreatsItemsDescription',
                        },
                        itemName: {
                          itemNameTranslationKey: 'arrays.threatsItemName',
                        },
                        relevanceLevels: {
                          csaf_base: 'optional',
                          csaf_security_incident_response: 'nice_to_know',
                          csaf_informational_advisory: 'excluded',
                          csaf_security_advisory: 'nice_to_know',
                          csaf_vex: 'mandatory',
                        },
                      },
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'category',
                            ],
                            title: 'Category of the threat',
                            description:
                              'Categorizes the threat according to the rules of the specification.',
                            metaData: {
                              uiType: 'STRING_ENUM',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/category-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/category-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsThreatsItemsCategoryTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsThreatsItemsCategoryDescription',
                              },
                            },
                            enum: ['exploit_status', 'impact', 'target_set'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'date',
                            fullName: ['vulnerabilities', 'threats', 'date'],
                            title: 'Date of the threat',
                            description:
                              'Contains the date when the assessment was done or the threat appeared.',
                            metaData: {
                              uiType: 'STRING_DATETIME',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/date-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/date-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'best_practice',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsThreatsItemsDateTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsThreatsItemsDateDescription',
                              },
                            },
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'details',
                            fullName: ['vulnerabilities', 'threats', 'details'],
                            title: 'Details of the threat',
                            description:
                              'Represents a thorough human-readable discussion of the threat.',
                            metaData: {
                              uiType: 'STRING_MULTI_LINE',
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/details-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/details-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'mandatory',
                                csaf_security_incident_response: 'mandatory',
                                csaf_informational_advisory: 'mandatory',
                                csaf_security_advisory: 'mandatory',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title:
                                  'v2_1.VulnerabilitiesItemsThreatsItemsDetailsTitle',
                                description:
                                  'v2_1.VulnerabilitiesItemsThreatsItemsDetailsDescription',
                              },
                            },
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/group_ids-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/group_ids-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'nice_to_know',
                                csaf_security_incident_response: 'nice_to_know',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductGroupsTitle',
                                description: 'v2_1.ProductGroupsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'threats',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_GROUP_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_group_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_group_id-spec.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductGroupIdTitle',
                                    description:
                                      'v2_1.ProductGroupIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productGroupIdsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'nice_to_know',
                                    csaf_security_incident_response:
                                      'nice_to_know',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'best_practice',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
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
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            metaData: {
                              userDocumentation: {
                                specification:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/product_ids-spec.en.md',
                                usage:
                                  'docs/user/vulnerabilities/vulnerability/threats/threat/product_ids-usage.en.md',
                              },
                              relevanceLevels: {
                                csaf_base: 'want_to_have',
                                csaf_security_incident_response: 'want_to_have',
                                csaf_informational_advisory: 'excluded',
                                csaf_security_advisory: 'best_practice',
                                csaf_vex: 'mandatory',
                              },
                              i18n: {
                                title: 'v2_1.ProductsTitle',
                                description: 'v2_1.ProductsDescription',
                              },
                            },
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'threats',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                metaData: {
                                  uiType: 'STRING_PRODUCT_ID',
                                  userDocumentation: {
                                    specification:
                                      'docs/user/types/product_id-spec.en.md',
                                    usage:
                                      'docs/user/types/product_id-usage.en.md',
                                  },
                                  i18n: {
                                    title: 'v2_1.ProductIdTitle',
                                    description: 'v2_1.ProductIdDescription',
                                  },
                                  itemName: {
                                    itemNameTranslationKey:
                                      'arrays.productsItemName',
                                  },
                                  relevanceLevels: {
                                    csaf_base: 'want_to_have',
                                    csaf_security_incident_response:
                                      'want_to_have',
                                    csaf_informational_advisory: 'excluded',
                                    csaf_security_advisory: 'best_practice',
                                    csaf_vex: 'mandatory',
                                  },
                                },
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
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
                  title: 'Title',
                  description:
                    'Gives the document producer the ability to apply a canonical name or title to the vulnerability.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/vulnerabilities/vulnerability/title-spec.en.md',
                      usage:
                        'docs/user/vulnerabilities/vulnerability/title-usage.en.md',
                    },
                    relevanceLevels: {
                      csaf_base: 'nice_to_know',
                      csaf_security_incident_response: 'want_to_have',
                      csaf_informational_advisory: 'excluded',
                      csaf_security_advisory: 'best_practice',
                      csaf_vex: 'want_to_have',
                    },
                    i18n: {
                      title: 'v2_1.VulnerabilitiesItemsTitleTitle',
                      description: 'v2_1.VulnerabilitiesItemsTitleDescription',
                    },
                  },
                  minLength: 1,
                  metaInfo: {},
                  type: 'STRING',
                },
              ],
            },
          },
        },
      },
    ],
  },
}
