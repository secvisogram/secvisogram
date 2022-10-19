export interface Result {
  isValid: boolean
  warnings: Array<{ message: string; instancePath: string }>
  errors: Array<{ message: string; instancePath: string }>
  infos: Array<{ message: string; instancePath: string }>
}

interface TestResult {
  isValid?: boolean
  warnings?: Array<{ message: string; instancePath: string }>
  errors?: Array<{ message: string; instancePath: string }>
  infos?: Array<{ message: string; instancePath: string }>
}

export type DocumentTest = (doc: any) => TestResult | Promise<TestResult>
