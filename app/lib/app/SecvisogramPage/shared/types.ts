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
  doc: {document?: any}
}
