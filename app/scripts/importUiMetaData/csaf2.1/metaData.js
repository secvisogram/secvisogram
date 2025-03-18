export default {
  $: {
    addMenuItemsForChildObjects: true,
    propertyOrder: ['$schema', 'document', 'product_tree', 'vulnerabilities'],
  },
  '$.$schema': {
    userDocumentation: {
      specification: 'docs/user/document-spec.en.md',
      usage: 'docs/user/document-usage.en.md',
    },
    i18n: {title: 'SchemaTitle', description: 'SchemaDescription'},
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
  },
  '$.document': {
    userDocumentation: {
      specification: 'docs/user/document-spec.en.md',
      usage: 'docs/user/document-usage.en.md',
    },
    i18n: {title: 'DocumentTitle', description: 'DocumentDescription'},
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
  },
  '$.document.acknowledgments': {
    userDocumentation: {
      specification: 'docs/user/document/acknowledgments-spec.en.md',
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
      title: 'DocumentAcknowledgmentsTitle',
      description: 'DocumentAcknowledgmentsDescription',
    },
  },
  '$.document.acknowledgments[]': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment-spec.en.md',
      usage: 'docs/user/types/acknowledgments/acknowledgment-usage.en.md',
    },
    i18n: {
      title: 'AcknowledgmentsItemsTitle',
      description: 'AcknowledgmentsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.acknowledgmentsItemName',
    },
  },
  '$.document.acknowledgments.names': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/names-spec.en.md',
      usage: 'docs/user/types/acknowledgments/acknowledgment/names-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'want_to_have',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'AcknowledgmentsItemsNamesTitle',
      description: 'AcknowledgmentsItemsNamesDescription',
    },
  },
  '$.document.acknowledgments.names[]': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/names/name-spec.en.md',
      usage:
        'docs/user/types/acknowledgments/acknowledgment/names/name-usage.en.md',
    },
    i18n: {
      title: 'AcknowledgmentsItemsNamesItemsTitle',
      description: 'AcknowledgmentsItemsNamesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.namesItemName',
    },
  },
  '$.document.acknowledgments.organization': {
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
      title: 'AcknowledgmentsItemsOrganizationTitle',
      description: 'AcknowledgmentsItemsOrganizationDescription',
    },
  },
  '$.document.acknowledgments.summary': {
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
      title: 'AcknowledgmentsItemsSummaryTitle',
      description: 'AcknowledgmentsItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.acknowledgments.urls': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/urls-spec.en.md',
      usage: 'docs/user/types/acknowledgments/acknowledgment/urls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'AcknowledgmentsItemsUrlsTitle',
      description: 'AcknowledgmentsItemsUrlsDescription',
    },
  },
  '$.document.acknowledgments.urls[]': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/urls/url-spec.en.md',
      usage:
        'docs/user/types/acknowledgments/acknowledgment/urls/url-usage.en.md',
    },
    i18n: {
      title: 'AcknowledgmentsItemsUrlsItemsTitle',
      description: 'AcknowledgmentsItemsUrlsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.urlsItemName',
    },
  },
  '$.document.aggregate_severity': {
    userDocumentation: {
      specification: 'docs/user/document/aggregate_severity-spec.en.md',
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
      title: 'DocumentAggregateSeverityTitle',
      description: 'DocumentAggregateSeverityDescription',
    },
  },
  '$.document.aggregate_severity.namespace': {
    userDocumentation: {
      specification:
        'docs/user/document/aggregate_severity/namespace-spec.en.md',
      usage: 'docs/user/document/aggregate_severity/namespace-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentAggregateSeverityNamespaceTitle',
      description: 'DocumentAggregateSeverityNamespaceDescription',
    },
  },
  '$.document.aggregate_severity.text': {
    userDocumentation: {
      specification: 'docs/user/document/aggregate_severity/text-spec.en.md',
      usage: 'docs/user/document/aggregate_severity/text-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'want_to_have',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'DocumentAggregateSeverityTextTitle',
      description: 'DocumentAggregateSeverityTextDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.category': {
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
      title: 'DocumentCategoryTitle',
      description: 'DocumentCategoryDescription',
    },
    uiType: 'STRING_WITH_OPTIONS',
    options: [
      'csaf_base',
      'csaf_security_incident_response',
      'csaf_informational_advisory',
      'csaf_security_advisory',
      'csaf_vex',
    ],
  },
  '$.document.csaf_version': {
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
      title: 'DocumentCsafVersionTitle',
      description: 'DocumentCsafVersionDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.distribution': {
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
      title: 'DocumentDistributionTitle',
      description: 'DocumentDistributionDescription',
    },
  },
  '$.document.distribution.text': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/text-spec.en.md',
      usage: 'docs/user/document/distribution/text-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentDistributionTextTitle',
      description: 'DocumentDistributionTextDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.distribution.tlp': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/tlp-spec.en.md',
      usage: 'docs/user/document/distribution/tlp-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'want_to_have',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'DocumentDistributionTlpTitle',
      description: 'DocumentDistributionTlpDescription',
    },
  },
  '$.document.distribution.tlp.label': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/tlp/label-spec.en.md',
      usage: 'docs/user/document/distribution/tlp/label-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentDistributionTlpLabelTitle',
      description: 'DocumentDistributionTlpLabelDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.distribution.tlp.url': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/tlp/url-spec.en.md',
      usage: 'docs/user/document/distribution/tlp/url-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentDistributionTlpUrlTitle',
      description: 'DocumentDistributionTlpUrlDescription',
    },
  },
  '$.document.distribution.sharing_group': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/sharing_group-spec.en.md',
      usage: 'docs/user/document/distribution/sharing_group-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'want_to_have',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'DocumentDistributionSharingGroupTitle',
      description: 'DocumentDistributionSharingGroupDescription',
    },
  },
  '$.document.distribution.sharing_group.id': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/sharing_group/id-spec.en.md',
      usage: 'docs/user/document/distribution/sharing_group/id-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentDistributionSharingGroupIdTitle',
      description: 'DocumentDistributionSharingGroupIdDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.distribution.sharing_group.name': {
    userDocumentation: {
      specification: 'docs/user/document/distribution/sharing_group/name-spec.en.md',
      usage: 'docs/user/document/distribution/sharing_group/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentDistributionSharingGroupNameTitle',
      description: 'DocumentDistributionSharingGroupNameDescription',
    },
  },
  '$.document.lang': {
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
      title: 'DocumentLangTitle',
      description: 'DocumentLangDescription',
    },
  },
  '$.document.notes': {
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
      title: 'DocumentNotesTitle',
      description: 'DocumentNotesDescription',
    },
  },
  '$.document.notes[]': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note-spec.en.md',
      usage: 'docs/user/types/notes/note-usage.en.md',
    },
    i18n: {
      title: 'NotesItemsTitle',
      description: 'NotesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.notesItemName',
      itemNameField: 'title',
    },
  },
  '$.document.notes.audience': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/audience-spec.en.md',
      usage: 'docs/user/types/notes/note/audience-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'NotesItemsAudienceTitle',
      description: 'NotesItemsAudienceDescription',
    },
  },
  '$.document.notes.category': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/category-spec.en.md',
      usage: 'docs/user/types/notes/note/category-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'NotesItemsCategoryTitle',
      description: 'NotesItemsCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.notes.text': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/text-spec.en.md',
      usage: 'docs/user/types/notes/note/text-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'NotesItemsTextTitle',
      description: 'NotesItemsTextDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.notes.title': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/title-spec.en.md',
      usage: 'docs/user/types/notes/note/title-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'best_practice',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'NotesItemsTitleTitle',
      description: 'NotesItemsTitleDescription',
    },
  },
  '$.document.publisher': {
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
      title: 'DocumentPublisherTitle',
      description: 'DocumentPublisherDescription',
    },
  },
  '$.document.publisher.category': {
    userDocumentation: {
      specification: 'docs/user/document/publisher/category-spec.en.md',
      usage: 'docs/user/document/publisher/category-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentPublisherCategoryTitle',
      description: 'DocumentPublisherCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.publisher.contact_details': {
    userDocumentation: {
      specification: 'docs/user/document/publisher/contact_details-spec.en.md',
      usage: 'docs/user/document/publisher/contact_details-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'want_to_have',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'DocumentPublisherContactDetailsTitle',
      description: 'DocumentPublisherContactDetailsDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.publisher.issuing_authority': {
    userDocumentation: {
      specification:
        'docs/user/document/publisher/issuing_authority-spec.en.md',
      usage: 'docs/user/document/publisher/issuing_authority-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'DocumentPublisherIssuingAuthorityTitle',
      description: 'DocumentPublisherIssuingAuthorityDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.publisher.name': {
    userDocumentation: {
      specification: 'docs/user/document/publisher/name-spec.en.md',
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
      title: 'DocumentPublisherNameTitle',
      description: 'DocumentPublisherNameDescription',
    },
  },
  '$.document.publisher.namespace': {
    userDocumentation: {
      specification: 'docs/user/document/publisher/namespace-spec.en.md',
      usage: 'docs/user/document/publisher/namespace-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentPublisherNamespaceTitle',
      description: 'DocumentPublisherNamespaceDescription',
    },
  },
  '$.document.references': {
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
      title: 'DocumentReferencesTitle',
      description: 'DocumentReferencesDescription',
    },
  },
  '$.document.references[]': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference-spec.en.md',
      usage: 'docs/user/types/references/reference-usage.en.md',
    },
    i18n: {
      title: 'ReferencesItemsTitle',
      description: 'ReferencesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.referencesItemName',
    },
  },
  '$.document.references.category': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference/category-spec.en.md',
      usage: 'docs/user/types/references/reference/category-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'ReferencesItemsCategoryTitle',
      description: 'ReferencesItemsCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.references.summary': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference/summary-spec.en.md',
      usage: 'docs/user/types/references/reference/summary-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'ReferencesItemsSummaryTitle',
      description: 'ReferencesItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.document.references.url': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference/url-spec.en.md',
      usage: 'docs/user/types/references/reference/url-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'ReferencesItemsUrlTitle',
      description: 'ReferencesItemsUrlDescription',
    },
  },
  '$.document.source_lang': {
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
      title: 'DocumentSourceLangTitle',
      description: 'DocumentSourceLangDescription',
    },
  },
  '$.document.title': {
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
      title: 'DocumentTitleTitle',
      description: 'DocumentTitleDescription',
    },
  },
  '$.document.tracking': {
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
      title: 'DocumentTrackingTitle',
      description: 'DocumentTrackingDescription',
    },
  },
  '$.document.tracking.aliases': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/aliases-spec.en.md',
      usage: 'docs/user/document/tracking/aliases-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentTrackingAliasesTitle',
      description: 'DocumentTrackingAliasesDescription',
    },
  },
  '$.document.tracking.aliases[]': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/aliases/alias-spec.en.md',
      usage: 'docs/user/document/tracking/aliases/alias-usage.en.md',
    },
    i18n: {
      title: 'DocumentTrackingAliasesItemsTitle',
      description: 'DocumentTrackingAliasesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.aliasesItemName',
    },
  },
  '$.document.tracking.current_release_date': {
    userDocumentation: {
      specification:
        'docs/user/document/tracking/current_release_date-spec.en.md',
      usage: 'docs/user/document/tracking/current_release_date-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentTrackingCurrentReleaseDateTitle',
      description: 'DocumentTrackingCurrentReleaseDateDescription',
    },
  },
  '$.document.tracking.generator': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/generator-spec.en.md',
      usage: 'docs/user/document/tracking/generator-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentTrackingGeneratorTitle',
      description: 'DocumentTrackingGeneratorDescription',
    },
  },
  '$.document.tracking.generator.date': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/generator/date-spec.en.md',
      usage: 'docs/user/document/tracking/generator/date-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'DocumentTrackingGeneratorDateTitle',
      description: 'DocumentTrackingGeneratorDateDescription',
    },
  },
  '$.document.tracking.generator.engine': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/generator/engine-spec.en.md',
      usage: 'docs/user/document/tracking/generator/engine-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentTrackingGeneratorEngineTitle',
      description: 'DocumentTrackingGeneratorEngineDescription',
    },
  },
  '$.document.tracking.generator.engine.name': {
    userDocumentation: {
      specification:
        'docs/user/document/tracking/generator/engine/name-spec.en.md',
      usage: 'docs/user/document/tracking/generator/engine/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentTrackingGeneratorEngineNameTitle',
      description: 'DocumentTrackingGeneratorEngineNameDescription',
    },
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.generator.engine.version': {
    userDocumentation: {
      specification:
        'docs/user/document/tracking/generator/engine/version-spec.en.md',
      usage: 'docs/user/document/tracking/generator/engine/version-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'want_to_have',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'DocumentTrackingGeneratorEngineVersionTitle',
      description: 'DocumentTrackingGeneratorEngineVersionDescription',
    },
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.id': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/id-spec.en.md',
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
      title: 'DocumentTrackingIdTitle',
      description: 'DocumentTrackingIdDescription',
    },
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.initial_release_date': {
    userDocumentation: {
      specification:
        'docs/user/document/tracking/initial_release_date-spec.en.md',
      usage: 'docs/user/document/tracking/initial_release_date-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentTrackingInitialReleaseDateTitle',
      description: 'DocumentTrackingInitialReleaseDateDescription',
    },
  },
  '$.document.tracking.revision_history': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/revision_history-spec.en.md',
      usage: 'docs/user/document/tracking/revision_history-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'DocumentTrackingRevisionHistoryTitle',
      description: 'DocumentTrackingRevisionHistoryDescription',
    },
    uiType: 'ARRAY_REVISION_HISTORY',
  },
  '$.document.tracking.revision_history[]': {
    userDocumentation: {
      specification:
        'docs/user/document/tracking/revision_history/revision-spec.en.md',
      usage:
        'docs/user/document/tracking/revision_history/revision-usage.en.md',
    },
    i18n: {
      title: 'DocumentTrackingRevisionHistoryItemsTitle',
      description: 'DocumentTrackingRevisionHistoryItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.revisionsItemName',
      itemNameField: 'number',
    },
  },
  '$.document.tracking.revision_history.date': {
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
      title: 'DocumentTrackingRevisionHistoryItemsDateTitle',
      description: 'DocumentTrackingRevisionHistoryItemsDateDescription',
    },
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.revision_history.legacy_version': {
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
      title: 'DocumentTrackingRevisionHistoryItemsLegacyVersionTitle',
      description:
        'DocumentTrackingRevisionHistoryItemsLegacyVersionDescription',
    },
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.revision_history.number': {
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
    i18n: {title: 'VersionTitle', description: 'VersionDescription'},
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.revision_history.summary': {
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
      title: 'DocumentTrackingRevisionHistoryItemsSummaryTitle',
      description: 'DocumentTrackingRevisionHistoryItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
    disable: {
      ifStandaloneMode: false,
      ifServerMode: true,
    },
  },
  '$.document.tracking.status': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/status-spec.en.md',
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
      title: 'DocumentTrackingStatusTitle',
      description: 'DocumentTrackingStatusDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.document.tracking.version': {
    userDocumentation: {
      specification: 'docs/user/document/tracking/version-spec.en.md',
      usage: 'docs/user/document/tracking/version-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {title: 'VersionTitle', description: 'VersionDescription'},
  },
  '$.product_tree': {
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
      title: 'ProductTreeTitle',
      description: 'ProductTreeDescription',
    },
  },
  '$.product_tree.branches': {
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
    i18n: {title: 'BranchesTitle', description: 'BranchesDescription'},
  },
  '$.product_tree.branches[]': {
    addMenuItemsForChildObjects: true,
    userDocumentation: {
      specification: 'docs/user/types/branches/branch-spec.en.md',
      usage: 'docs/user/types/branches/branch-usage.en.md',
    },
    i18n: {
      title: 'BranchesItemsTitle',
      description: 'BranchesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.branchesItemName',
      itemNameField: 'name',
    },
  },
  '$.product_tree.branches.branches': {
    userDocumentation: {
      specification: 'docs/user/types/branches-spec.en.md',
      usage: 'docs/user/types/branches-usage.en.md',
    },
    i18n: {title: 'BranchesTitle', description: 'BranchesDescription'},
  },
  '$.product_tree.branches.category': {
    userDocumentation: {
      specification: 'docs/user/types/branches/branch/category-spec.en.md',
      usage: 'docs/user/types/branches/branch/category-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'BranchesItemsCategoryTitle',
      description: 'BranchesItemsCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.product_tree.branches.name': {
    userDocumentation: {
      specification: 'docs/user/types/branches/branch/name-spec.en.md',
      usage: 'docs/user/types/branches/branch/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'BranchesItemsNameTitle',
      description: 'BranchesItemsNameDescription',
    },
  },
  '$.product_tree.branches.product': {
    addMenuItemsForChildObjects: true,
    userDocumentation: {
      specification: 'docs/user/types/branches/branch/product-spec.en.md',
      usage: 'docs/user/types/branches/branch/product-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameTitle',
      description: 'FullProductNameDescription',
    },
  },
  '$.product_tree.branches.product.name': {
    userDocumentation: {
      specification: 'docs/user/types/full_product_name/name-spec.en.md',
      usage: 'docs/user/types/full_product_name/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'FullProductNameNameTitle',
      description: 'FullProductNameNameDescription',
    },
    uiType: 'STRING_BRANCH_FULL_PRODUCT_NAME',
  },
  '$.product_tree.branches.product.product_id': {
    userDocumentation: {
      specification: 'docs/user/types/full_product_name/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_GENERATE_PRODUCT_ID',
  },
  '$.product_tree.branches.product.product_identification_helper': {
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
      title: 'FullProductNameProductIdentificationHelperTitle',
      description: 'FullProductNameProductIdentificationHelperDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.cpe': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/cpe-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/cpe-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperCpeTitle',
      description: 'FullProductNameProductIdentificationHelperCpeDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.hashes': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/hashes-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/hashes-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperHashesTitle',
      description:
        'FullProductNameProductIdentificationHelperHashesDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.hashes[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/hashes/hash-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/hashes/hash-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperHashesItemsTitle',
      description:
        'FullProductNameProductIdentificationHelperHashesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.hashesItemName',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.hashes.file_hashes':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.hashes.file_hashes[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.fileHashesItemName',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.hashes.file_hashes.algorithm':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.hashes.file_hashes.value':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.hashes.filename':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFilenameTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFilenameDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.model_numbers':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperModelNumbersTitle',
        description:
          'FullProductNameProductIdentificationHelperModelNumbersDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.model_numbers[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperModelNumbersItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperModelNumbersItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.modelNumbersItemName',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.purls': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperPurlTitle',
      description: 'FullProductNameProductIdentificationHelperPurlDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.purls[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperPurlsTitle',
      description: 'FullProductNameProductIdentificationHelperPurlsDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.sbom_urls': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/sbom_urls-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/sbom_urls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSbomUrlsTitle',
      description:
        'FullProductNameProductIdentificationHelperSbomUrlsDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.sbom_urls[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSbomUrlsItemsTitle',
      description:
        'FullProductNameProductIdentificationHelperSbomUrlsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.sbomItemName',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.serial_numbers':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSerialNumbersTitle',
        description:
          'FullProductNameProductIdentificationHelperSerialNumbersDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.serial_numbers[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperSerialNumbersItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperSerialNumbersItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.serialNumbersItemName',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.skus': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/skus-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/skus-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSkusTitle',
      description: 'FullProductNameProductIdentificationHelperSkusDescription',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.skus[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/skus/sku-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/skus/sku-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSkusItemsTitle',
      description:
        'FullProductNameProductIdentificationHelperSkusItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.skusItemName',
    },
  },
  '$.product_tree.branches.product.product_identification_helper.x_generic_uris':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'want_to_have',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperXGenericUrisTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.x_generic_uris[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.genericUrisItemName',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.x_generic_uris.namespace':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-usage.en.md',
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
          'FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceDescription',
      },
    },
  '$.product_tree.branches.product.product_identification_helper.x_generic_uris.uri':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-usage.en.md',
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
          'FullProductNameProductIdentificationHelperXGenericUrisItemsUriTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsUriDescription',
      },
    },
  '$.product_tree.full_product_names': {
    userDocumentation: {
      specification: 'docs/user/product_tree/full_product_names-spec.en.md',
      usage: 'docs/user/product_tree/full_product_names-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'ProductTreeFullProductNamesTitle',
      description: 'ProductTreeFullProductNamesDescription',
    },
  },
  '$.product_tree.full_product_names[]': {
    userDocumentation: {
      specification: 'docs/user/types/full_product_name-spec.en.md',
      usage: 'docs/user/types/full_product_name-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameTitle',
      description: 'FullProductNameDescription',
    },
    addMenuItemsForChildObjects: true,
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
      itemNameField: 'name',
    },
  },
  '$.product_tree.full_product_names.name': {
    userDocumentation: {
      specification: 'docs/user/types/full_product_name/name-spec.en.md',
      usage: 'docs/user/types/full_product_name/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'FullProductNameNameTitle',
      description: 'FullProductNameNameDescription',
    },
  },
  '$.product_tree.full_product_names.product_id': {
    userDocumentation: {
      specification: 'docs/user/types/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_GENERATE_PRODUCT_ID',
  },
  '$.product_tree.full_product_names.product_identification_helper': {
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
      title: 'FullProductNameProductIdentificationHelperTitle',
      description: 'FullProductNameProductIdentificationHelperDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.cpe': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/cpe-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/cpe-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperCpeTitle',
      description: 'FullProductNameProductIdentificationHelperCpeDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.hashes': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/hashes-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/hashes-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperHashesTitle',
      description:
        'FullProductNameProductIdentificationHelperHashesDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.hashes[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/hashes/hash-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/hashes/hash-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperHashesItemsTitle',
      description:
        'FullProductNameProductIdentificationHelperHashesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.hashesItemName',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.hashes.file_hashes':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.hashes.file_hashes[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.fileHashesItemName',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.hashes.file_hashes.algorithm':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.hashes.file_hashes.value':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.hashes.filename':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFilenameTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFilenameDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.model_numbers':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperModelNumbersTitle',
        description:
          'FullProductNameProductIdentificationHelperModelNumbersDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.model_numbers[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperModelNumbersItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperModelNumbersItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.modelNumbersItemName',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.purls': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperPurlTitle',
      description: 'FullProductNameProductIdentificationHelperPurlDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.purls[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/purls-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/purls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperPurlsTitle',
      description: 'FullProductNameProductIdentificationHelperPurlsDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.sbom_urls': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/sbom_urls-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/sbom_urls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSbomUrlsTitle',
      description:
        'FullProductNameProductIdentificationHelperSbomUrlsDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.sbom_urls[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-usage.en.md',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSbomUrlsItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperSbomUrlsItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.sbomUrlsItemName',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.serial_numbers':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSerialNumbersTitle',
        description:
          'FullProductNameProductIdentificationHelperSerialNumbersDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.serial_numbers[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperSerialNumbersItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperSerialNumbersItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.serialNumbersItemName',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.skus': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/skus-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/skus-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'nice_to_know',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSkusTitle',
      description: 'FullProductNameProductIdentificationHelperSkusDescription',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.skus[]': {
    userDocumentation: {
      specification:
        'docs/user/types/full_product_name/product_identification_helper/skus/sku-spec.en.md',
      usage:
        'docs/user/types/full_product_name/product_identification_helper/skus/sku-usage.en.md',
    },
    i18n: {
      title: 'FullProductNameProductIdentificationHelperSkusItemsTitle',
      description:
        'FullProductNameProductIdentificationHelperSkusItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.skusItemName',
    },
  },
  '$.product_tree.full_product_names.product_identification_helper.x_generic_uris':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'want_to_have',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperXGenericUrisTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.x_generic_uris[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.genericUrisItemName',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.x_generic_uris.namespace':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-usage.en.md',
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
          'FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceDescription',
      },
    },
  '$.product_tree.full_product_names.product_identification_helper.x_generic_uris.uri':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-usage.en.md',
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
          'FullProductNameProductIdentificationHelperXGenericUrisItemsUriTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsUriDescription',
      },
    },
  '$.product_tree.product_groups': {
    userDocumentation: {
      specification: 'docs/user/product_tree/product_groups-spec.en.md',
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
      title: 'ProductTreeProductGroupsTitle',
      description: 'ProductTreeProductGroupsDescription',
    },
    uiType: 'WITH_GENERATED_GROUP_ID',
  },
  '$.product_tree.product_groups[]': {
    userDocumentation: {
      specification:
        'docs/user/product_tree/product_groups/product_group-spec.en.md',
      usage: 'docs/user/product_tree/product_groups/product_group-usage.en.md',
    },
    i18n: {
      title: 'ProductTreeProductGroupsItemsTitle',
      description: 'ProductTreeProductGroupsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.productGroupsItemName',
      itemNameField: 'group_id',
    },
  },
  '$.product_tree.product_groups.group_id': {
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
      title: 'ProductGroupIdTitle',
      description: 'ProductGroupIdDescription',
    },
  },
  '$.product_tree.product_groups.product_ids': {
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
      title: 'ProductTreeProductGroupsItemsProductIdsTitle',
      description: 'ProductTreeProductGroupsItemsProductIdsDescription',
    },
  },
  '$.product_tree.product_groups.product_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.product_tree.product_groups.summary': {
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
      title: 'ProductTreeProductGroupsItemsSummaryTitle',
      description: 'ProductTreeProductGroupsItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.product_tree.relationships': {
    userDocumentation: {
      specification: 'docs/user/product_tree/relationships-spec.en.md',
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
      title: 'ProductTreeRelationshipsTitle',
      description: 'ProductTreeRelationshipsDescription',
    },
  },
  '$.product_tree.relationships[]': {
    userDocumentation: {
      specification:
        'docs/user/product_tree/relationships/relationship-spec.en.md',
      usage: 'docs/user/product_tree/relationships/relationship-usage.en.md',
    },
    i18n: {
      title: 'ProductTreeRelationshipsItemsTitle',
      description: 'ProductTreeRelationshipsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.relationshipsItemName',
    },
    addMenuItemsForChildObjects: true,
  },
  '$.product_tree.relationships.category': {
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
      title: 'ProductTreeRelationshipsItemsCategoryTitle',
      description: 'ProductTreeRelationshipsItemsCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.product_tree.relationships.full_product_name': {
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
      title: 'FullProductNameTitle',
      description: 'FullProductNameDescription',
    },
    addMenuItemsForChildObjects: true,
  },
  '$.product_tree.relationships.full_product_name.name': {
    userDocumentation: {
      specification: 'docs/user/types/full_product_name/name-spec.en.md',
      usage: 'docs/user/types/full_product_name/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'FullProductNameNameTitle',
      description: 'FullProductNameNameDescription',
    },
    uiType: 'STRING_RELATIONSHIP_FULL_PRODUCT_NAME',
  },
  '$.product_tree.relationships.full_product_name.product_id': {
    userDocumentation: {
      specification: 'docs/user/types/full_product_name/product_id-spec.en.md',
      usage: 'docs/user/types/full_product_name/product_id-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_GENERATE_PRODUCT_ID',
  },
  '$.product_tree.relationships.full_product_name.product_identification_helper':
    {
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
        title: 'FullProductNameProductIdentificationHelperTitle',
        description: 'FullProductNameProductIdentificationHelperDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.cpe':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/cpe-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/cpe-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperCpeTitle',
        description: 'FullProductNameProductIdentificationHelperCpeDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperHashesTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash-usage.en.md',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperHashesItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.hashesItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes.file_hashes':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes.file_hashes[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.fileHashesItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes.file_hashes.algorithm':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/algorithm-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsAlgorithmDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes.file_hashes.value':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/file_hashes/file_hash/value-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFileHashesItemsValueDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.hashes.filename':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/hashes/hash/filename-usage.en.md',
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
          'FullProductNameProductIdentificationHelperHashesItemsFilenameTitle',
        description:
          'FullProductNameProductIdentificationHelperHashesItemsFilenameDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.model_numbers':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperModelNumbersTitle',
        description:
          'FullProductNameProductIdentificationHelperModelNumbersDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.model_numbers[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/model_numbers/model_number-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperModelNumbersItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperModelNumbersItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.modelNumbersItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.purls':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/purl-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/purl-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperPurlTitle',
        description:
          'FullProductNameProductIdentificationHelperPurlDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.purls[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/purl-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/purl-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperPurlsTitle',
        description:
          'FullProductNameProductIdentificationHelperPurlsDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.sbom_urls':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/sbom_urls-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/sbom_urls-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSbomUrlsTitle',
        description:
          'FullProductNameProductIdentificationHelperSbomUrlsDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.sbom_urls[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/sbom_urls/sbom_url-usage.en.md',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSbomUrlsItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperSbomUrlsItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.sbomUrlsItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.serial_numbers':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSerialNumbersTitle',
        description:
          'FullProductNameProductIdentificationHelperSerialNumbersDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.serial_numbers[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/serial_numbers/serial_number-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperSerialNumbersItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperSerialNumbersItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.serialNumbersItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.skus':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/skus-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/skus-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'nice_to_know',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSkusTitle',
        description:
          'FullProductNameProductIdentificationHelperSkusDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.skus[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/skus/sku-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/skus/sku-usage.en.md',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperSkusItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperSkusItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.skusItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.x_generic_uris':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris-usage.en.md',
      },
      relevanceLevels: {
        csaf_base: 'nice_to_know',
        csaf_security_incident_response: 'nice_to_know',
        csaf_informational_advisory: 'nice_to_know',
        csaf_security_advisory: 'nice_to_know',
        csaf_vex: 'want_to_have',
      },
      i18n: {
        title: 'FullProductNameProductIdentificationHelperXGenericUrisTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.x_generic_uris[]':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri-usage.en.md',
      },
      i18n: {
        title:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsDescription',
      },
      itemName: {
        itemNameTranslationKey: 'arrays.genericUrisItemName',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.x_generic_uris.namespace':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/namespace-usage.en.md',
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
          'FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsNamespaceDescription',
      },
    },
  '$.product_tree.relationships.full_product_name.product_identification_helper.x_generic_uris.uri':
    {
      userDocumentation: {
        specification:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-spec.en.md',
        usage:
          'docs/user/types/full_product_name/product_identification_helper/x_generic_uris/x_generic_uri/uri-usage.en.md',
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
          'FullProductNameProductIdentificationHelperXGenericUrisItemsUriTitle',
        description:
          'FullProductNameProductIdentificationHelperXGenericUrisItemsUriDescription',
      },
    },
  '$.product_tree.relationships.product_reference': {
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
      title: 'ProductTreeRelationshipsItemsProductReferenceTitle',
      description: 'ProductTreeRelationshipsItemsProductReferenceDescription',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.product_tree.relationships.relates_to_product_reference': {
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
      title: 'ProductTreeRelationshipsItemsRelatesToProductReferenceTitle',
      description:
        'ProductTreeRelationshipsItemsRelatesToProductReferenceDescription',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.vulnerabilities': {
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
      title: 'VulnerabilitiesTitle',
      description: 'VulnerabilitiesDescription',
    },
  },
  '$.vulnerabilities[]': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsTitle',
      description: 'VulnerabilitiesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.vulnerabilitiesItemName',
      itemNameField: 'title',
    },
  },
  '$.vulnerabilities.acknowledgments': {
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
      title: 'VulnerabilitiesItemsAcknowledgmentsTitle',
      description: 'VulnerabilitiesItemsAcknowledgmentsDescription',
    },
  },
  '$.vulnerabilities.acknowledgments[]': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment-spec.en.md',
      usage: 'docs/user/types/acknowledgments/acknowledgment-usage.en.md',
    },
    i18n: {
      title: 'AcknowledgmentsItemsTitle',
      description: 'AcknowledgmentsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.acknowledgmentsItemName',
    },
  },
  '$.vulnerabilities.acknowledgments.names': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/names-spec.en.md',
      usage: 'docs/user/types/acknowledgments/acknowledgment/names-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'AcknowledgmentsItemsNamesTitle',
      description: 'AcknowledgmentsItemsNamesDescription',
    },
  },
  '$.vulnerabilities.acknowledgments.names[]': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/names/name-spec.en.md',
      usage:
        'docs/user/types/acknowledgments/acknowledgment/names/name-usage.en.md',
    },
    i18n: {
      title: 'AcknowledgmentsItemsNamesItemsTitle',
      description: 'AcknowledgmentsItemsNamesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.namesItemName',
    },
  },
  '$.vulnerabilities.acknowledgments.organization': {
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
      title: 'AcknowledgmentsItemsOrganizationTitle',
      description: 'AcknowledgmentsItemsOrganizationDescription',
    },
  },
  '$.vulnerabilities.acknowledgments.summary': {
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
      title: 'AcknowledgmentsItemsSummaryTitle',
      description: 'AcknowledgmentsItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.acknowledgments.urls': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/urls-spec.en.md',
      usage: 'docs/user/types/acknowledgments/acknowledgment/urls-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'AcknowledgmentsItemsUrlsTitle',
      description: 'AcknowledgmentsItemsUrlsDescription',
    },
  },
  '$.vulnerabilities.acknowledgments.urls[]': {
    userDocumentation: {
      specification:
        'docs/user/types/acknowledgments/acknowledgment/urls/url-spec.en.md',
      usage:
        'docs/user/types/acknowledgments/acknowledgment/urls/url-usage.en.md',
    },
    i18n: {
      title: 'AcknowledgmentsItemsUrlsItemsTitle',
      description: 'AcknowledgmentsItemsUrlsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.urlsItemName',
    },
  },
  '$.vulnerabilities.cve': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability/cve-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/cve-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsCveTitle',
      description: 'VulnerabilitiesItemsCveDescription',
    },
  },
  '$.vulnerabilities.cwes': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability/cwes-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/cwes-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'VulnerabilitiesItemsCwesTitle',
      description: 'VulnerabilitiesItemsCwesDescription',
    },
    uiType: 'OBJECT_CWE',
  },
  '$.vulnerabilities.cwes.id': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/cwes/id-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/cwes/id-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsCwesIdTitle',
      description: 'VulnerabilitiesItemsCwesIdDescription',
    },
  },
  '$.vulnerabilities.cwes.name': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/cwes/name-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/cwes/name-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsCwesNameTitle',
      description: 'VulnerabilitiesItemsCwesNameDescription',
    },
  },
  '$.vulnerabilities.cwes.version': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/cwes/version-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/cwes/version-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsCwesVersionTitle',
      description: 'VulnerabilitiesItemsCwesVersionDescription',
    },
  },
  '$.vulnerabilities.discovery_date': {
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
      title: 'VulnerabilitiesItemsDiscoveryDateTitle',
      description: 'VulnerabilitiesItemsDiscoveryDateDescription',
    },
  },
  '$.vulnerabilities.flags': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability/flags-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/flags-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsFlagsTitle',
      description: 'VulnerabilitiesItemsFlagsDescription',
    },
  },
  '$.vulnerabilities.flags[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/flags/flag-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/flags/flag-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsFlagsItemsTitle',
      description: 'VulnerabilitiesItemsFlagsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.flagsItemName',
    },
  },
  '$.vulnerabilities.flags.date': {
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
      title: 'VulnerabilitiesItemsFlagsItemsDateTitle',
      description: 'VulnerabilitiesItemsFlagsItemsDateDescription',
    },
  },
  '$.vulnerabilities.flags.group_ids': {
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
      title: 'ProductGroupsTitle',
      description: 'ProductGroupsDescription',
    },
  },
  '$.vulnerabilities.flags.group_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_group_id-spec.en.md',
      usage: 'docs/user/types/product_group_id-spec.en.md',
    },
    i18n: {
      title: 'ProductGroupIdTitle',
      description: 'ProductGroupIdDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.productGroupIdsItemName',
    },
    uiType: 'STRING_GROUP_ID',
  },
  '$.vulnerabilities.flags.label': {
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
      title: 'VulnerabilitiesItemsFlagsItemsLabelTitle',
      description: 'VulnerabilitiesItemsFlagsItemsLabelDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.vulnerabilities.flags.product_ids': {
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
    i18n: {title: 'ProductsTitle', description: 'ProductsDescription'},
  },
  '$.vulnerabilities.flags.product_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.vulnerabilities.ids': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability/ids-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/ids-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsIdsTitle',
      description: 'VulnerabilitiesItemsIdsDescription',
    },
  },
  '$.vulnerabilities.ids[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/ids/id-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/ids/id-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsIdsItemsTitle',
      description: 'VulnerabilitiesItemsIdsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.idsItemName',
    },
  },
  '$.vulnerabilities.ids.system_name': {
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
      title: 'VulnerabilitiesItemsIdsItemsSystemNameTitle',
      description: 'VulnerabilitiesItemsIdsItemsSystemNameDescription',
    },
  },
  '$.vulnerabilities.ids.text': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/ids/id/text-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/ids/id/text-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsIdsItemsTextTitle',
      description: 'VulnerabilitiesItemsIdsItemsTextDescription',
    },
  },
  '$.vulnerabilities.involvements': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/involvements-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/involvements-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'VulnerabilitiesItemsInvolvementsTitle',
      description: 'VulnerabilitiesItemsInvolvementsDescription',
    },
  },
  '$.vulnerabilities.involvements[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/involvements/involvement-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/involvements/involvement-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsInvolvementsItemsTitle',
      description: 'VulnerabilitiesItemsInvolvementsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.involvementsItemName',
    },
  },
  '$.vulnerabilities.involvements.date': {
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
      title: 'VulnerabilitiesItemsInvolvementsItemsDateTitle',
      description: 'VulnerabilitiesItemsInvolvementsItemsDateDescription',
    },
  },
  '$.vulnerabilities.involvements.party': {
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
      title: 'VulnerabilitiesItemsInvolvementsItemsPartyTitle',
      description: 'VulnerabilitiesItemsInvolvementsItemsPartyDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.vulnerabilities.involvements.status': {
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
      title: 'VulnerabilitiesItemsInvolvementsItemsStatusTitle',
      description: 'VulnerabilitiesItemsInvolvementsItemsStatusDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.vulnerabilities.involvements.summary': {
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
      title: 'VulnerabilitiesItemsInvolvementsItemsSummaryTitle',
      description: 'VulnerabilitiesItemsInvolvementsItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.notes': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability/notes-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/notes-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsNotesTitle',
      description: 'VulnerabilitiesItemsNotesDescription',
    },
  },
  '$.vulnerabilities.notes[]': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note-spec.en.md',
      usage: 'docs/user/types/notes/note-usage.en.md',
    },
    i18n: {
      title: 'NotesItemsTitle',
      description: 'NotesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.notesItemName',
      itemNameField: 'title',
    },
  },
  '$.vulnerabilities.notes.audience': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/audience-spec.en.md',
      usage: 'docs/user/types/notes/note/audience-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'NotesItemsAudienceTitle',
      description: 'NotesItemsAudienceDescription',
    },
  },
  '$.vulnerabilities.notes.category': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/category-spec.en.md',
      usage: 'docs/user/types/notes/note/category-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'NotesItemsCategoryTitle',
      description: 'NotesItemsCategoryDescription',
    },
  },
  '$.vulnerabilities.notes.text': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/text-spec.en.md',
      usage: 'docs/user/types/notes/note/text-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'NotesItemsTextTitle',
      description: 'NotesItemsTextDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.notes.title': {
    userDocumentation: {
      specification: 'docs/user/types/notes/note/title-spec.en.md',
      usage: 'docs/user/types/notes/note/title-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'NotesItemsTitleTitle',
      description: 'NotesItemsTitleDescription',
    },
  },
  '$.vulnerabilities.product_status': {
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
      title: 'VulnerabilitiesItemsProductStatusTitle',
      description: 'VulnerabilitiesItemsProductStatusDescription',
    },
  },
  '$.vulnerabilities.product_status.first_affected': {
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
      title: 'VulnerabilitiesItemsProductStatusFirstAffectedTitle',
      description: 'VulnerabilitiesItemsProductStatusFirstAffectedDescription',
    },
  },
  '$.vulnerabilities.product_status.first_affected[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.first_fixed': {
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
      title: 'VulnerabilitiesItemsProductStatusFirstFixedTitle',
      description: 'VulnerabilitiesItemsProductStatusFirstFixedDescription',
    },
  },
  '$.vulnerabilities.product_status.first_fixed[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.fixed': {
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
      title: 'VulnerabilitiesItemsProductStatusFixedTitle',
      description: 'VulnerabilitiesItemsProductStatusFixedDescription',
    },
  },
  '$.vulnerabilities.product_status.fixed[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.known_affected': {
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
      title: 'VulnerabilitiesItemsProductStatusKnownAffectedTitle',
      description: 'VulnerabilitiesItemsProductStatusKnownAffectedDescription',
    },
  },
  '$.vulnerabilities.product_status.known_affected[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.known_not_affected': {
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
      title: 'VulnerabilitiesItemsProductStatusKnownNotAffectedTitle',
      description:
        'VulnerabilitiesItemsProductStatusKnownNotAffectedDescription',
    },
  },
  '$.vulnerabilities.product_status.known_not_affected[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.last_affected': {
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
      title: 'VulnerabilitiesItemsProductStatusLastAffectedTitle',
      description: 'VulnerabilitiesItemsProductStatusLastAffectedDescription',
    },
  },
  '$.vulnerabilities.product_status.last_affected[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.recommended': {
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
      title: 'VulnerabilitiesItemsProductStatusRecommendedTitle',
      description: 'VulnerabilitiesItemsProductStatusRecommendedDescription',
    },
  },
  '$.vulnerabilities.product_status.recommended[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.product_status.under_investigation': {
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
      title: 'VulnerabilitiesItemsProductStatusUnderInvestigationTitle',
      description:
        'VulnerabilitiesItemsProductStatusUnderInvestigationDescription',
    },
  },
  '$.vulnerabilities.product_status.under_investigation[]': {
    userDocumentation: {
      specification: 'docs/user/types/products-spec.en.md',
      usage: 'docs/user/types/products-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    uiType: 'STRING_PRODUCT_ID',
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
  },
  '$.vulnerabilities.references': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/references-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/references-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'VulnerabilitiesItemsReferencesTitle',
      description: 'VulnerabilitiesItemsReferencesDescription',
    },
  },
  '$.vulnerabilities.references[]': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference-spec.en.md',
      usage: 'docs/user/types/references/reference-usage.en.md',
    },
    i18n: {
      title: 'ReferencesItemsTitle',
      description: 'ReferencesItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.referencesItemName',
    },
  },
  '$.vulnerabilities.references.category': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference/category-spec.en.md',
      usage: 'docs/user/types/references/reference/category-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'ReferencesItemsCategoryTitle',
      description: 'ReferencesItemsCategoryDescription',
    },
  },
  '$.vulnerabilities.references.summary': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference/summary-spec.en.md',
      usage: 'docs/user/types/references/reference/summary-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'ReferencesItemsSummaryTitle',
      description: 'ReferencesItemsSummaryDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.references.url': {
    userDocumentation: {
      specification: 'docs/user/types/references/reference/url-spec.en.md',
      usage: 'docs/user/types/references/reference/url-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'mandatory',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'ReferencesItemsUrlTitle',
      description: 'ReferencesItemsUrlDescription',
    },
  },
  '$.vulnerabilities.disclosure_date': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/disclosure_date-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/disclosure_date-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'VulnerabilitiesItemsDisclosureDateTitle',
      description: 'VulnerabilitiesItemsDisclosureDateDescription',
    },
  },
  '$.vulnerabilities.remediations': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/remediations-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/remediations-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsRemediationsTitle',
      description: 'VulnerabilitiesItemsRemediationsDescription',
    },
  },
  '$.vulnerabilities.remediations[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsRemediationsItemsTitle',
      description: 'VulnerabilitiesItemsRemediationsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.remediationsItemName',
    },
  },
  '$.vulnerabilities.remediations.category': {
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
      title: 'VulnerabilitiesItemsRemediationsItemsCategoryTitle',
      description: 'VulnerabilitiesItemsRemediationsItemsCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.vulnerabilities.remediations.date': {
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
      title: 'VulnerabilitiesItemsRemediationsItemsDateTitle',
      description: 'VulnerabilitiesItemsRemediationsItemsDateDescription',
    },
  },
  '$.vulnerabilities.remediations.details': {
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
      title: 'VulnerabilitiesItemsRemediationsItemsDetailsTitle',
      description: 'VulnerabilitiesItemsRemediationsItemsDetailsDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.remediations.entitlements': {
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
      title: 'VulnerabilitiesItemsRemediationsItemsEntitlementsTitle',
      description:
        'VulnerabilitiesItemsRemediationsItemsEntitlementsDescription',
    },
  },
  '$.vulnerabilities.remediations.entitlements[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation/entitlements/entitlement-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation/entitlements/entitlement-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsRemediationsItemsEntitlementsItemsTitle',
      description:
        'VulnerabilitiesItemsRemediationsItemsEntitlementsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.entitlementsItemName',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.remediations.group_ids': {
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
      title: 'ProductGroupsTitle',
      description: 'ProductGroupsDescription',
    },
  },
  '$.vulnerabilities.remediations.group_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_group_id-spec.en.md',
      usage: 'docs/user/types/product_group_id-usage.en.md',
    },
    i18n: {
      title: 'ProductGroupIdTitle',
      description: 'ProductGroupIdDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.productGroupIdsItemName',
    },
    uiType: 'STRING_GROUP_ID',
  },
  '$.vulnerabilities.remediations.product_ids': {
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
    i18n: {title: 'ProductsTitle', description: 'ProductsDescription'},
  },
  '$.vulnerabilities.remediations.product_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.vulnerabilities.remediations.restart_required': {
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
      title: 'VulnerabilitiesItemsRemediationsItemsRestartRequiredTitle',
      description:
        'VulnerabilitiesItemsRemediationsItemsRestartRequiredDescription',
    },
  },
  '$.vulnerabilities.remediations.restart_required.category': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/category-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/category-usage.en.md',
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
        'VulnerabilitiesItemsRemediationsItemsRestartRequiredCategoryTitle',
      description:
        'VulnerabilitiesItemsRemediationsItemsRestartRequiredCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.vulnerabilities.remediations.restart_required.details': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/details-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/remediations/remediation/restart_required/details-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'VulnerabilitiesItemsRemediationsItemsRestartRequiredDetailsTitle',
      description:
        'VulnerabilitiesItemsRemediationsItemsRestartRequiredDetailsDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.remediations.url': {
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
      title: 'VulnerabilitiesItemsRemediationsItemsUrlTitle',
      description: 'VulnerabilitiesItemsRemediationsItemsUrlDescription',
    },
  },
  '$.vulnerabilities.metrics': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/scores-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsScoresTitle',
      description: 'VulnerabilitiesItemsScoresDescription',
    },
  },
  '$.vulnerabilities.metrics[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/scores/score-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsScoresItemsTitle',
      description: 'VulnerabilitiesItemsScoresItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.scoresItemName',
    },
  },
  '$.vulnerabilities.metrics.content': {
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
      title: 'VulnerabilitiesItemsMetricsContentTitle',
      description: 'CvssV2VersionMetricsContentDescription',
    },
  },
  '$.vulnerabilities.metrics.source': {
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
      title: 'VulnerabilitiesItemsMetricsSourceTitle',
      description: 'CvssV2VersionMetricsSourceDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2': {
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
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {title: 'CvssV2Title', description: 'CvssV2Description'},
    uiType: 'OBJECT_CVSS_2',
  },
  '$.vulnerabilities.metrics.content.cvss_v2.version': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV2VersionTitle',
      description: 'CvssV2VersionDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.vectorString': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV2VectorStringTitle',
      description: 'CvssV2VectorStringDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.accessVector': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV2AccessVectorTitle',
      description: 'CvssV2AccessVectorDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.accessComplexity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV2AccessComplexityTitle',
      description: 'CvssV2AccessComplexityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.authentication': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV2AuthenticationTitle',
      description: 'CvssV2AuthenticationDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.confidentialityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV2ConfidentialityImpactTitle',
      description: 'CvssV2ConfidentialityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.integrityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV2IntegrityImpactTitle',
      description: 'CvssV2IntegrityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.availabilityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV2AvailabilityImpactTitle',
      description: 'CvssV2AvailabilityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.baseScore': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV2BaseScoreTitle',
      description: 'CvssV2BaseScoreDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.exploitability': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'CvssV2ExploitabilityTitle',
      description: 'CvssV2ExploitabilityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.remediationLevel': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV2RemediationLevelTitle',
      description: 'CvssV2RemediationLevelDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.reportConfidence': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV2ReportConfidenceTitle',
      description: 'CvssV2ReportConfidenceDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.temporalScore': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV2TemporalScoreTitle',
      description: 'CvssV2TemporalScoreDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.collateralDamagePotential': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV2CollateralDamagePotentialTitle',
      description: 'CvssV2CollateralDamagePotentialDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.targetDistribution': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV2TargetDistributionTitle',
      description: 'CvssV2TargetDistributionDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.confidentialityRequirement': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV2ConfidentialityRequirementTitle',
      description: 'CvssV2ConfidentialityRequirementDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.integrityRequirement': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV2IntegrityRequirementTitle',
      description: 'CvssV2IntegrityRequirementDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.availabilityRequirement': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV2AvailabilityRequirementTitle',
      description: 'CvssV2AvailabilityRequirementDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v2.environmentalScore': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v2-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV2EnvironmentalScoreTitle',
      description: 'CvssV2EnvironmentalScoreDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3': {
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
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {title: 'CvssV3Title', description: 'CvssV3Description'},
    uiType: 'OBJECT_CVSS_3',
  },
  '$.vulnerabilities.metrics.content.cvss_v3.version': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV3VersionTitle',
      description: 'CvssV3VersionDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.vectorString': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV3VectorStringTitle',
      description: 'CvssV3VectorStringDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.attackVector': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3AttackVectorTitle',
      description: 'CvssV3AttackVectorDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.attackComplexity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3AttackComplexityTitle',
      description: 'CvssV3AttackComplexityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.privilegesRequired': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3PrivilegesRequiredTitle',
      description: 'CvssV3PrivilegesRequiredDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.userInteraction': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3UserInteractionTitle',
      description: 'CvssV3UserInteractionDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.scope': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3ScopeTitle',
      description: 'CvssV3ScopeDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.confidentialityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3ConfidentialityImpactTitle',
      description: 'CvssV3ConfidentialityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.integrityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3IntegrityImpactTitle',
      description: 'CvssV3IntegrityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.availabilityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {
      title: 'CvssV3AvailabilityImpactTitle',
      description: 'CvssV3AvailabilityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.baseScore': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV3BaseScoreTitle',
      description: 'CvssV3BaseScoreDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.baseSeverity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'mandatory',
      csaf_security_incident_response: 'mandatory',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'mandatory',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'CvssV3BaseSeverityTitle',
      description: 'CvssV3BaseSeverityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.exploitCodeMaturity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'nice_to_know',
    },
    i18n: {
      title: 'CvssV3ExploitCodeMaturityTitle',
      description: 'CvssV3ExploitCodeMaturityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.remediationLevel': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV3RemediationLevelTitle',
      description: 'CvssV3RemediationLevelDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.reportConfidence': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV3ReportConfidenceTitle',
      description: 'CvssV3ReportConfidenceDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.temporalScore': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV3TemporalScoreTitle',
      description: 'CvssV3TemporalScoreDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.temporalSeverity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'want_to_have',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'want_to_have',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'CvssV3TemporalSeverityTitle',
      description: 'CvssV3TemporalSeverityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.confidentialityRequirement': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ConfidentialityRequirementTitle',
      description: 'CvssV3ConfidentialityRequirementDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.integrityRequirement': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3IntegrityRequirementTitle',
      description: 'CvssV3IntegrityRequirementDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.availabilityRequirement': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3AvailabilityRequirementTitle',
      description: 'CvssV3AvailabilityRequirementDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedAttackVector': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedAttackVectorTitle',
      description: 'CvssV3ModifiedAttackVectorDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedAttackComplexity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedAttackComplexityTitle',
      description: 'CvssV3ModifiedAttackComplexityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedPrivilegesRequired': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedPrivilegesRequiredTitle',
      description: 'CvssV3ModifiedPrivilegesRequiredDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedUserInteraction': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedUserInteractionTitle',
      description: 'CvssV3ModifiedUserInteractionDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedScope': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedScopeTitle',
      description: 'CvssV3ModifiedScopeDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedConfidentialityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedConfidentialityImpactTitle',
      description: 'CvssV3ModifiedConfidentialityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedIntegrityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedIntegrityImpactTitle',
      description: 'CvssV3ModifiedIntegrityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.modifiedAvailabilityImpact': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3ModifiedAvailabilityImpactTitle',
      description: 'CvssV3ModifiedAvailabilityImpactDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.environmentalScore': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3EnvironmentalScoreTitle',
      description: 'CvssV3EnvironmentalScoreDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v3.environmentalSeverity': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/cvss_v3-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'optional',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'optional',
      csaf_vex: 'optional',
    },
    i18n: {
      title: 'CvssV3EnvironmentalSeverityTitle',
      description: 'CvssV3EnvironmentalSeverityDescription',
    },
  },
  '$.vulnerabilities.metrics.content.cvss_v4': {
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
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {title: 'CvssV4Title', description: 'CvssV4Description'},
    uiType: 'OBJECT_CVSS_3',
  },
  '$.vulnerabilities.metrics.content.ssvc_v1': {
    title: 'SSVC V1',
    description:
      'JSON Schema for Stakeholder-Specific Vulnerability Categorization version 1.0',
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/scores/score/ssvc_v1-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/scores/score/ssvc_v1-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'best_practice',
      csaf_security_incident_response: 'best_practice',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'best_practice',
    },
    i18n: {title: 'SsvcV1Title', description: 'SsvcV1Description'},
    uiType: 'OBJECT_CVSS_3',
  },
  '$.vulnerabilities.metrics.products': {
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
    i18n: {title: 'ProductsTitle', description: 'ProductsDescription'},
  },
  '$.vulnerabilities.metrics.products[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.vulnerabilities.threats': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/threats-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/threats-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'optional',
      csaf_security_incident_response: 'nice_to_know',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'nice_to_know',
      csaf_vex: 'mandatory',
    },
    i18n: {
      title: 'VulnerabilitiesItemsThreatsTitle',
      description: 'VulnerabilitiesItemsThreatsDescription',
    },
  },
  '$.vulnerabilities.threats[]': {
    userDocumentation: {
      specification:
        'docs/user/vulnerabilities/vulnerability/threats/threat-spec.en.md',
      usage:
        'docs/user/vulnerabilities/vulnerability/threats/threat-usage.en.md',
    },
    i18n: {
      title: 'VulnerabilitiesItemsThreatsItemsTitle',
      description: 'VulnerabilitiesItemsThreatsItemsDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.threatsItemName',
    },
  },
  '$.vulnerabilities.threats.category': {
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
      title: 'VulnerabilitiesItemsThreatsItemsCategoryTitle',
      description: 'VulnerabilitiesItemsThreatsItemsCategoryDescription',
    },
    uiType: 'STRING_ENUM',
  },
  '$.vulnerabilities.threats.date': {
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
      title: 'VulnerabilitiesItemsThreatsItemsDateTitle',
      description: 'VulnerabilitiesItemsThreatsItemsDateDescription',
    },
  },
  '$.vulnerabilities.threats.details': {
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
      title: 'VulnerabilitiesItemsThreatsItemsDetailsTitle',
      description: 'VulnerabilitiesItemsThreatsItemsDetailsDescription',
    },
    uiType: 'STRING_MULTI_LINE',
  },
  '$.vulnerabilities.threats.group_ids': {
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
      title: 'ProductGroupsTitle',
      description: 'ProductGroupsDescription',
    },
  },
  '$.vulnerabilities.threats.group_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_group_id-spec.en.md',
      usage: 'docs/user/types/product_group_id-spec.en.md',
    },
    i18n: {
      title: 'ProductGroupIdTitle',
      description: 'ProductGroupIdDescription',
    },
    itemName: {
      itemNameTranslationKey: 'arrays.productGroupIdsItemName',
    },
    uiType: 'STRING_GROUP_ID',
  },
  '$.vulnerabilities.threats.product_ids': {
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
    i18n: {title: 'ProductsTitle', description: 'ProductsDescription'},
  },
  '$.vulnerabilities.threats.product_ids[]': {
    userDocumentation: {
      specification: 'docs/user/types/product_id-spec.en.md',
      usage: 'docs/user/types/product_id-usage.en.md',
    },
    i18n: {title: 'ProductIdTitle', description: 'ProductIdDescription'},
    itemName: {
      itemNameTranslationKey: 'arrays.productsItemName',
    },
    uiType: 'STRING_PRODUCT_ID',
  },
  '$.vulnerabilities.title': {
    userDocumentation: {
      specification: 'docs/user/vulnerabilities/vulnerability/title-spec.en.md',
      usage: 'docs/user/vulnerabilities/vulnerability/title-usage.en.md',
    },
    relevanceLevels: {
      csaf_base: 'nice_to_know',
      csaf_security_incident_response: 'want_to_have',
      csaf_informational_advisory: 'excluded',
      csaf_security_advisory: 'best_practice',
      csaf_vex: 'want_to_have',
    },
    i18n: {
      title: 'VulnerabilitiesItemsTitleTitle',
      description: 'VulnerabilitiesItemsTitleDescription',
    },
  },
}
