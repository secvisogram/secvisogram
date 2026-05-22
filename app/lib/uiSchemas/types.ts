/**
 * A json schema used by the json editor to
 */
export interface SubJsonSchema {
  /**
   * The $ref used in the parent schema. Is needed to register it in the
   * json editor.
   */
  ref: string

  /**
   * The schema content.
   */
  content: {}
}
