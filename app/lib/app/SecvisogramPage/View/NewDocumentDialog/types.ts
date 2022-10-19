export interface Props {
  data: {
    templates: Array<{ templateId: string; templateDescription: string }>
  } | null
  defaultSource?: 'TEMPLATE' | 'FILESYSTEM' | ''
  onSubmit(
    params:
      | { source: 'TEMPLATE'; templateId: string }
      | { source: 'FILESYSTEM'; file: File }
  ): void
  onClose(): void
}
