interface Data {
  advisories: Array<{
    advisoryId: string
    title: string
    owner: string
    workflowState: string
    allowedStateChanges: string[]
    deletable: boolean
    canCreateVersion: boolean
  }>
}

export interface Props {
  defaultData?: Data | null
  onGetData(): Promise<Data>
  onDeleteAdvisory(params: { advisoryId: string }): Promise<void>
  onOpenAdvisory(params: { advisoryId: string }, callback: () => void): void
  onChangeWorkflowState(params: {
    advisoryId: string
    workflowState: string
    documentTrackingStatus: string | null
    proposedTime: Date | null
  }): Promise<void>
  onCreateNewVersion(params: { advisoryId: string }): Promise<void>
}
