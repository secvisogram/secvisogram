import { describe, expect, it } from 'vitest'
import {
  createEditorHost,
  remoteValidationErrors,
} from '../../lib/editorHost.js'

/** Creates a host that records everything it reports to the embedding page. */
function setup() {
  /** @type {{}[]} */
  const changes = []
  /** @type {{ errors: {}[]; valid: boolean }[]} */
  const validations = []
  const host = createEditorHost({
    onChange: (doc) => changes.push(doc),
    onValidate: (result) => validations.push(result),
  })
  return { host, changes, validations }
}

describe('editor host: documents', () => {
  it('reports a document change made inside the editor', () => {
    const { host, changes } = setup()
    host.documentChanged({ title: 'initial' })

    const edited = { title: 'edited' }
    host.documentChanged(edited)

    expect(changes).toEqual([edited])
  })

  it('does not report the document the editor starts with', () => {
    const { host, changes } = setup()

    host.documentChanged({ title: 'initial' })

    expect(changes).toEqual([])
  })

  it('does not report a document written by the page', () => {
    const { host, changes } = setup()
    host.documentChanged({ title: 'initial' })

    const written = { title: 'written by the page' }
    host.loadDocument(written)
    host.documentChanged(written)

    expect(changes).toEqual([])
    expect(host.getDocument()).toBe(written)
  })

  it('reports an edit following a document written by the page', () => {
    const { host, changes } = setup()
    host.documentChanged({ title: 'initial' })
    const written = { title: 'written by the page' }
    host.loadDocument(written)
    host.documentChanged(written)

    const edited = { title: 'edited' }
    host.documentChanged(edited)

    expect(changes).toEqual([edited])
  })

  it('does not report a replacement that has the same content', () => {
    const { host, changes } = setup()
    host.documentChanged({ title: 'initial', tags: ['a'] })

    host.documentChanged({ title: 'initial', tags: ['a'] })

    expect(changes).toEqual([])
  })

  it('keeps reporting what the editor holds after the page rewrote it', () => {
    const { host, changes } = setup()
    host.documentChanged({ title: 'initial' })
    const written = { title: 'written by the page' }
    host.loadDocument(written)
    host.documentChanged(written)
    host.documentChanged({ title: 'edited' })

    host.loadDocument(written)
    host.documentChanged(written)

    expect(changes).toHaveLength(1)
    expect(host.getDocument()).toBe(written)
  })
})

/** @type {import('../../lib/app/SecvisogramPage/shared/types.js').TypedValidationError} */
const clientError = {
  type: 'error',
  instancePath: '/document/title',
  message: 'client says no',
}
/** @type {import('../../lib/app/SecvisogramPage/shared/types.js').TypedValidationError} */
const remoteError = {
  type: 'error',
  instancePath: '/document/tracking',
  message: 'remote says no',
}
/** @type {import('../../lib/app/SecvisogramPage/shared/types.js').TypedValidationError} */
const remoteWarning = {
  type: 'warning',
  instancePath: '/document/notes',
  message: 'remote warns',
}

describe('editor host: validation', () => {
  it('reports the client result for the current document', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)

    host.clientValidated(doc, { errors: [clientError], valid: false })

    expect(validations).toEqual([{ errors: [clientError], valid: false }])
  })

  it('reports errors with the documented properties only', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)
    // Not a fresh literal, so the extra properties don't trip the excess-property check.
    const detailedError = {
      ...clientError,
      keyword: 'required',
      schemaPath: '#/required',
      params: { missingProperty: 'title' },
    }

    host.clientValidated(doc, { errors: [detailedError], valid: false })

    expect(validations).toEqual([{ errors: [clientError], valid: false }])
  })

  it('ignores a client result for a document that was replaced meanwhile', () => {
    const { host, validations } = setup()
    const stale = { title: 'stale' }
    host.documentChanged(stale)
    host.documentChanged({ title: 'current' })

    host.clientValidated(stale, { errors: [clientError], valid: false })

    expect(validations).toEqual([])
  })

  it('merges a remote result into the latest client result', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)
    host.clientValidated(doc, { errors: [clientError], valid: false })

    host.remoteValidated(doc, {
      errors: [remoteError, remoteWarning],
      valid: false,
    })

    expect(validations.at(-1)).toEqual({
      errors: [clientError, remoteError, remoteWarning],
      valid: false,
    })
  })

  it('is only valid if both the client and the remote check pass', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)
    host.clientValidated(doc, { errors: [], valid: true })

    host.remoteValidated(doc, { errors: [remoteWarning], valid: true })
    expect(validations.at(-1)).toEqual({ errors: [remoteWarning], valid: true })

    host.remoteValidated(doc, { errors: [remoteError], valid: false })
    expect(validations.at(-1)).toEqual({ errors: [remoteError], valid: false })
  })

  it('does not report a remote result for a document that was replaced meanwhile', () => {
    const { host, validations } = setup()
    const stale = { title: 'stale' }
    host.documentChanged(stale)
    host.clientValidated(stale, { errors: [], valid: true })
    host.documentChanged({ title: 'current' })
    validations.length = 0

    host.remoteValidated(stale, { errors: [remoteError], valid: false })

    expect(validations).toEqual([])
  })

  it('drops the remote result once the document is edited', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)
    host.clientValidated(doc, { errors: [], valid: true })
    host.remoteValidated(doc, { errors: [remoteError], valid: false })

    const edited = { title: 'edited' }
    host.documentChanged(edited)
    host.clientValidated(edited, { errors: [], valid: true })

    expect(validations.at(-1)).toEqual({ errors: [], valid: true })
  })

  it('waits for the pending client result before reporting a remote result', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)

    host.remoteValidated(doc, { errors: [remoteError], valid: false })
    expect(validations).toEqual([])

    host.clientValidated(doc, { errors: [clientError], valid: false })
    expect(validations).toEqual([
      { errors: [clientError, remoteError], valid: false },
    ])
  })

  it('keeps the remote result when the client result is refreshed for the same document', () => {
    const { host, validations } = setup()
    const doc = { title: 'doc' }
    host.documentChanged(doc)
    host.clientValidated(doc, { errors: [], valid: true })
    host.remoteValidated(doc, { errors: [remoteError], valid: false })

    host.clientValidated(doc, { errors: [clientError], valid: false })

    expect(validations.at(-1)).toEqual({
      errors: [clientError, remoteError],
      valid: false,
    })
  })
})

describe('remoteValidationErrors', () => {
  it('flattens errors, warnings and infos of all tests into one typed list', () => {
    const errors = remoteValidationErrors({
      tests: [
        {
          errors: [{ instancePath: '/a', message: 'e1' }],
          warnings: [{ instancePath: '/b', message: 'w1' }],
          infos: [],
        },
        {
          errors: [],
          warnings: [],
          infos: [{ instancePath: '/c', message: 'i1' }],
        },
      ],
    })

    expect(errors).toEqual([
      { type: 'error', instancePath: '/a', message: 'e1' },
      { type: 'warning', instancePath: '/b', message: 'w1' },
      { type: 'info', instancePath: '/c', message: 'i1' },
    ])
  })
})
