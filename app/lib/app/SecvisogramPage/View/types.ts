import React from 'react'
import { Advisory, AdvisoryState } from '../shared/types.js'
import CsafTab from './CsafTab.js'
import PreviewTab from './PreviewTab.js'

export interface Props {
  isLoading: boolean
  isTabLocked: boolean
  errors: import('../shared/types.js').ValidationError[]
  data: {
    doc: unknown
  } | null
  defaultAdvisoryState?: AdvisoryState | null
  activeTab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON' | 'DOCUMENTS'
  alert: {
    confirmLabel: string
    cancelLabel: string
    label: string
    description: string
    onConfirm(): void
    onCancel(): void
  } | null
  stripResult: React.ComponentProps<typeof CsafTab>['stripResult']
  previewResult: React.ComponentProps<typeof PreviewTab>['previewResult']
  DocumentsTab: React.ComponentType<{
    onOpenAdvisory(
      params: {
        advisoryId: string
      },
      callback: () => void
    ): void
  }>
  generatorEngineData: {
    name: string
    version: string
  }
  onLoadAdvisory(params: { advisoryId: string }): Promise<Advisory>
  onUpdateAdvisory(params: {
    advisoryId: string
    revision: string
    csaf: {}
    summary: string
    legacyVersion: string
  }): Promise<void>
  onDownload(doc: {}): void
  onOpen(file: File): Promise<void | {}>
  onChangeTab(
    tab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON' | 'DOCUMENTS',
    document: {}
  ): void
  onValidate(document: {}): void
  onServiceValidate(params: { validatorUrl: string; csaf: {} }): Promise<{
    isValid: boolean
    tests: Array<{
      errors: Array<{ instancePath: string; message: string }>
      warnings: Array<{ instancePath: string; message: string }>
      infos: Array<{ instancePath: string; message: string }>
    }>
  }>
  onGetDocMin(): Promise<{}>
  onGetDocMax(): Promise<{}>
  onCreateAdvisory(params: {
    csaf: {}
    summary: string
    legacyVersion: string
  }): Promise<{ id: string; revision: string }>
  onStrip(document: {}): void
  onPreview(document: {}): void
  onPrepareDocumentForTemplate(document: {}): Promise<{ document: {} }>
  onExportCSAF(doc: {}): void
  onExportHTML(html: string, doc: {}): void
  onLockTab(): void
  onUnlockTab(): void
  onCollectProductIds(document: {}): Promise<
    void | { id: string; name: string }[]
  >
  onCollectGroupIds(document: {}): Promise<
    void | { id: string; name: string }[]
  >
  onGetTemplates(): Promise<
    Array<{ templateId: string; templateDescription: string }>
  >
  onGetTemplateContent(params: { templateId: string }): Promise<{}>
  onGetBackendInfo(): Promise<{ version: string }>
}