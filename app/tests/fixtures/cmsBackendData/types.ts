export interface Sample {
  advisoriesList: Array<{ advisoryId: string; workflowState: string }>
  advisories: Array<{
    advisoryId: string
    revision: string
    csaf: {}
    documentTrackingId: string
  }>
}
