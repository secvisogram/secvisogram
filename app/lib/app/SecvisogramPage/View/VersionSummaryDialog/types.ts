export interface Props {
  prefilledData: {
    summary: string
    legacyVersion: string
  }
  onSubmit(params: { summary: string; legacyVersion: string }): void
  onClose(): void
}
