export type Advisory = {
  advisoryId: string
  revision: string
  changeable: boolean
  csaf: {
    document?: {
      title?: string
    }
  }
  documentTrackingId: string
}

export interface ValidationError {
  message: string
  instancePath: string
}

export interface TypedValidationError {
  type: 'error' | 'warning' | 'info'
  message: string
  instancePath: string
}

export interface FormValues {
  doc: { document?: any }
}

export type AdvisoryState =
  | {
      type: 'ADVISORY'
      advisory: Advisory
    }
  | { type: 'NEW_ADVISORY'; csaf: {} }

export type Property = Readonly<{
  key: string
  title?: string
  type: 'STRING' | 'ARRAY' | 'OBJECT' | 'RECURSION' | 'NUMBER'
  fullName: ReadonlyArray<string>
  description?: string
  mandatory?: boolean
  enum?: ReadonlyArray<string>
  default?: string
  examples?: ReadonlyArray<string>
  pattern?: string
  minLength?: number
  addMenuItemsForChildObjects?: boolean
  metaInfo: MetaInfo
  metaData?: MetaData
}>

type MetaInfo = Readonly<{
  propertyList?: ReadonlyArray<Property>
  arrayType?: Property
}>

type MetaData = Readonly<{
  addMenuItemsForChildObjects?: boolean
  uiType?:
    | 'STRING_DATETIME'
    | 'STRING_URI'
    | 'STRING_ENUM'
    | 'STRING_WITH_OPTIONS'
    | 'STRING_MULTI_LINE'
    | 'STRING_GENERATE_PRODUCT_ID'
    | 'STRING_PRODUCT_ID'
    | 'WITH_GENERATED_GROUP_ID'
    | 'STRING_GROUP_ID'
    | 'STRING_BRANCH_FULL_PRODUCT_NAME'
    | 'STRING_RELATIONSHIP_FULL_PRODUCT_NAME'
    | 'OBJECT_CWE'
    | 'OBJECT_CVSS_2'
    | 'OBJECT_CVSS_3'
    | 'ARRAY_REVISION_HISTORY'
  relevanceLevels?: {
    csaf_base: RelevanceLevel
    csaf_security_incident_response: RelevanceLevel
    csaf_informational_advisory: RelevanceLevel
    csaf_security_advisory: RelevanceLevel
    csaf_vex: RelevanceLevel
  }
  userDocumentation?: {
    specification: string
    usage: string
  }
  title?: string
  description?: string
  i18n?: {
    title: string
    description: string
  }
  options?: ReadonlyArray<string>
  disable?: {
    ifStandaloneMode: boolean
    ifServerMode: boolean
  }
  itemName?: {
    itemNameTranslationKey: string
    itemNameField?: string
  }
}>

type RelevanceLevel =
  | 'mandatory'
  | 'best_practice'
  | 'want_to_have'
  | 'nice_to_know'
  | 'optional'
  | 'excluded'
