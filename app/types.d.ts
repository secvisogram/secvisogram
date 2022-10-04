declare module '*/cwec_4.3.json' {
  export const weaknesses: Array<{ id: string; name: string }>
}

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

declare module '*.json' {
  const content: {}
  export default content
}

declare module "*.md"


declare module '*/metaData2.json' {
  const metadata: Object
  export default metadata
}