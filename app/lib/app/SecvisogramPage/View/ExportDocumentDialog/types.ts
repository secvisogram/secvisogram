import { AdvisoryState } from '../../shared/types'

export interface Props {
  formValues: { doc: {} }
  originalValues: { doc: {} }
  documentIsValid: boolean
  advisoryState: AdvisoryState | null
  defaultSource?:
    | 'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'
  onPrepareDocumentForTemplate(doc: {}): Promise<{ document: {} }>
  onDownload(doc: {}): void
  onExportCSAF(doc: {}): void
  onExportHTML(html: string, doc: {}): void
  onClose(): void
}
