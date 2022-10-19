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
