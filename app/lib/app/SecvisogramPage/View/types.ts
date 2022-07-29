import React from 'react'
import CsafTab from './CsafTab.js'
import PreviewTab from './PreviewTab.js'

type Advisory = {
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

export type AdvisoryState =
  | {
      type: 'ADVISORY'
      advisory: Advisory
    }
  | { type: 'NEW_ADVISORY'; csaf: {} }

export interface Props {
  isLoading: boolean
  isTabLocked: boolean
  errors: import('../shared/types.js').ValidationError[]
  data: {
    doc: unknown
  } | null
  defaultAdvisoryState?: AdvisoryState | null
  generatorEngineData: {
    name: string
    version: string
  }
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
  strict: boolean
  DocumentsTab: React.ComponentType<{
    onOpenAdvisory(
      params: {
        advisoryId: string
      },
      callback: () => void
    ): void
  }>
  onLoadAdvisory(
    params: { advisoryId: string },
    callback: (advisory: Advisory) => void
  ): void
  onUpdateAdvisory(
    params: {
      advisoryId: string
      revision: string
      csaf: {}
    },
    callback: () => void
  ): void
  onSetStrict(strict: boolean): void
  onDownload(doc: {}): void
  onOpen(file: File): Promise<void | {}>
  onChangeTab(
    tab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON' | 'DOCUMENTS',
    document: {}
  ): void
  onValidate(document: {}): void
  onServiceValidate(
    params: { validatorUrl: string; csaf: {} },
    callback: (result: {
      tests: Array<{
        errors: Array<{ instancePath: string; message: string }>
        warnings: Array<{ instancePath: string; message: string }>
        infos: Array<{ instancePath: string; message: string }>
      }>
    }) => void
  ): void
  onGetDocMin(callback: (csaf: {}) => void): void
  onGetDocMax(callback: (csaf: {}) => void): void
  onCreateAdvisory(
    params: { csaf: {}; summary: string; legacyVersion: string },
    callback: (advisoryData: { id: string; revision: string }) => void
  ): void
  onStrip(document: {}): void
  onPreview(document: {}): void
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
  onGetTemplates(
    callback: (
      templates: Array<{ templateId: string; templateDescription: string }>
    ) => void
  ): void
  onGetTemplateContent(
    params: { templateId: string },
    callback: (templateContent: {}) => void
  ): void
}
