export interface Props {
  data: {
    templates: Array<{ templateId: string; templateDescription: string }>
  } | null
  defaultSource?: 'TEMPLATE' | 'FILESYSTEM' | 'URL' | ''
  onSubmit(
    params:
      | { source: 'TEMPLATE'; templateId: string }
      | { source: 'FILESYSTEM'; file: File }
      | { source: 'URL'; url: string },
  ): void
  onClose(): void
}
