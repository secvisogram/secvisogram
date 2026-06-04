interface Advisory {
  advisoryId: string
  title: string
  owner: string
  workflowState: string
  allowedStateChanges: string[]
  deletable: boolean
  canCreateVersion: boolean
  currentReleaseDate: string
}

interface Data {
  advisories: Array<Advisory>
  // Opaque cursor for the next page; null on the last page.
  bookmark: string | null
  // Whether another page exists; drives the "Load more" control.
  hasMore: boolean
}

export interface Props {
  defaultData?: Data | null
  onGetData(params?: { limit?: number }): Promise<Data>
  onGetMoreData(params: {
    bookmark: string | null
    limit?: number
  }): Promise<Data>
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
