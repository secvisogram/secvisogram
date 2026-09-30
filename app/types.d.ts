declare module '*/subtags.json' {
  export const subtags: Array<{
    type: string
    subtag: string
    prefix: string[]
  }>
}

declare module '*/extensions.json' {
  const extensions: Array<{ identifier: string }>
  export default extensions
}

declare module '*.md'

// Imported via webpack's `resourceQuery` rule for `.css` files, which
// exports the stylesheet as a constructed `CSSStyleSheet` instead of
// injecting it into `document.head`. Used to populate `adoptedStyleSheets`
// on a shadow root (see `lib/secvisogram-editor.js`).
declare module '*.css?adoptedStyleSheet' {
  const sheet: CSSStyleSheet
  export default sheet
}

// Imported via webpack's inline loader syntax to get a `CSSStyleSheet`
// export for third-party stylesheets whose package `exports` field would
// otherwise reject the `?adoptedStyleSheet` resource query (see
// `lib/secvisogram-editor.js`).
declare module '!!css-loader?exportType=css-style-sheet!*' {
  const sheet: CSSStyleSheet
  export default sheet
}

declare module '*/metaData2.json' {
  const metadata: Object
  export default metadata
}
declare module 'json-source-map' {
  export interface ParseOptions {
    bigint?: boolean
  }

  export type PointerProp = 'value' | 'valueEnd' | 'key' | 'keyEnd'

  export interface Location {
    line: number
    column: number
    pos: number
  }

  export type Pointers = Record<string, Record<PointerProp, Location>>

  export interface ParseResult {
    data: any
    pointers: Pointers
  }

  export function parse(
    source: string,
    _reviver?: any,
    options?: ParseOptions,
  ): ParseResult

  export interface StringifyOptions {
    space?: string | number
    es6?: boolean
  }

  export interface StringifyResult {
    json: string
    pointers: Pointers
  }

  export function stringify(
    data: any,
    _replacer?: any,
    options?: string | number | StringifyOptions,
  ): StringifyResult
}
