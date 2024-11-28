export type Schema =
  | ObjectSchema
  | ArraySchema
  | StringSchema
  | NumberSchema
  | Ref
export type JSONSchema = Schema & { $defs?: Defs }

export type Defs = Record<string, Schema | undefined>

type CommonSchemaFields = {
  title?: string
  description?: string
}

export interface ObjectSchema extends CommonSchemaFields {
  type: 'object'
  properties: Record<string, Schema>
}

export interface ArraySchema extends CommonSchemaFields {
  type: 'array'
  items: Schema
}

export interface NumberSchema extends CommonSchemaFields {
  type: 'number'
  format?: string
  pattern?: string
  uniqueItems?: boolean
  examples?: string[]
  minLength?: number
  enum?: string[]
}

export interface StringSchema extends CommonSchemaFields {
  type: 'string'
  format?: string
  pattern?: string
  default?: string
  uniqueItems?: boolean
  examples?: string[]
  minLength?: number
  enum?: string[]
}

export interface Ref extends CommonSchemaFields {
  $ref: string
}

export interface CommonUiSchemaFields {
  title?: string
  description?: string
  addMenuItemsForChildObjects?: boolean
  key: string
  fullName: string[]
  metaData?: {
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
      | 'OBJECT_CVSS_4'
      | 'ARRAY_REVISION_HISTORY'
    relevanceLevels?: {}
  }
}

export interface ArrayUiSchema extends CommonUiSchemaFields {
  type: 'ARRAY'
  metaInfo: {
    arrayType: UiSchema
  }
}

export interface ObjectUiSchema extends CommonUiSchemaFields {
  type: 'OBJECT'
  metaInfo: {
    propertyList: UiSchema[]
  }
}

export interface RecursionUiSchema extends CommonUiSchemaFields {
  type: 'RECURSION'
  metaInfo: {}
}

export interface StringUiSchema extends CommonUiSchemaFields {
  type: 'STRING'
  metaInfo: {}
}

export interface NumberUiSchema extends CommonUiSchemaFields {
  type: 'NUMBER'
  metaInfo: {}
}

export type UiSchema =
  | ArrayUiSchema
  | ObjectUiSchema
  | RecursionUiSchema
  | StringUiSchema
  | NumberUiSchema
