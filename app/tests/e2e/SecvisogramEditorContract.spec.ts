import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import translation from '../../locales/en/translation.json' with { type: 'json' }
import { editorPackageOutput, serveEditor } from './helpers/serveEditor.js'

const basePath = '/editor'

type EditorEvent = { type: 'csaf-change' | 'csaf-validate'; detail: any }

function csafDocument(version: '2.0' | '2.1', title: string) {
  return {
    document: { category: 'csaf_base', csaf_version: version, title },
  }
}

/**
 * Serves the editor package and opens a host page with a
 * `<secvisogram-editor>` element. Everything the page requests outside of the
 * editor's asset tree is recorded in `externalRequests`.
 */
async function openEditor(page: Page) {
  const externalRequests: string[] = []
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (
      url.protocol.startsWith('http') &&
      !url.pathname.startsWith(`${basePath}/`)
    ) {
      externalRequests.push(`${request.method()} ${url.href}`)
    }
  })

  await serveEditor(page, {
    outputDirectory: editorPackageOutput,
    basePath,
  })
  await page.goto(`${basePath}/index.html`)

  const editor = page.locator('secvisogram-editor')
  await expect(editor.getByText(translation.menu.formEditor)).toBeVisible()
  await editor.evaluate((element) => {
    const events: EditorEvent[] = []
    ;(window as any).__editorEvents = events
    for (const type of ['csaf-change', 'csaf-validate'] as const) {
      element.addEventListener(type, (event) => {
        const detail = JSON.parse(JSON.stringify((event as CustomEvent).detail))
        events.push({ type, detail })
      })
    }
  })

  return { editor, externalRequests }
}

const eventsOf = (page: Page, type: EditorEvent['type']) =>
  page.evaluate(
    (type) =>
      ((window as any).__editorEvents as EditorEvent[]).filter(
        (event) => event.type === type,
      ),
    type,
  )

const readDoc = (editor: Locator) =>
  editor.evaluate((element) => JSON.parse(JSON.stringify((element as any).doc)))

const writeDoc = (editor: Locator, doc: unknown) =>
  editor.evaluate((element, doc) => {
    ;(element as any).doc = doc
  }, doc)

async function openDocumentSection(editor: Locator) {
  await editor.getByTestId('menu_entry-/document').click()
  return editor.getByTestId('attribute-document-title').locator('input')
}

test.describe('<secvisogram-editor> contract', () => {
  test('does not fetch app configuration or call the CMS backend', async ({
    page,
  }) => {
    const { editor, externalRequests } = await openEditor(page)

    await expect(editor.getByTestId('new_document_button')).toBeVisible()
    await expect(editor.getByTestId('save_button')).toHaveCount(0)
    await expect(editor.getByTestId('tab_button-DOCUMENTS')).toHaveCount(0)
    expect(externalRequests).toEqual([])
  })

  test('loads a document written to doc, reads it live and reloads on every write', async ({
    page,
  }) => {
    const { editor } = await openEditor(page)

    const first = csafDocument('2.0', 'First hosted advisory')
    await writeDoc(editor, first)
    await expect.poll(() => readDoc(editor)).toEqual(first)
    const titleInput = await openDocumentSection(editor)
    await expect(titleInput).toHaveValue('First hosted advisory')

    await titleInput.fill('Edited inside the editor')
    await expect
      .poll(async () => (await readDoc(editor)).document.title)
      .toEqual('Edited inside the editor')

    await writeDoc(editor, first)
    await expect(titleInput).toHaveValue('First hosted advisory')
    await expect.poll(() => readDoc(editor)).toEqual(first)
  })

  test('emits csaf-change for edits but not for writes of doc', async ({
    page,
  }) => {
    const { editor } = await openEditor(page)

    await writeDoc(editor, csafDocument('2.0', 'Hosted advisory'))
    const titleInput = await openDocumentSection(editor)
    await expect(titleInput).toHaveValue('Hosted advisory')
    // Wait for the debounced validation of the loaded document.
    await expect.poll(() => eventsOf(page, 'csaf-validate')).not.toHaveLength(0)
    expect(await eventsOf(page, 'csaf-change')).toEqual([])

    await titleInput.fill('Edited advisory')

    await expect
      .poll(async () => (await eventsOf(page, 'csaf-change')).at(-1))
      .toMatchObject({
        detail: { doc: { document: { title: 'Edited advisory' } } },
      })
  })

  test('emits csaf-change when a local template is applied', async ({
    page,
  }) => {
    const { editor } = await openEditor(page)
    await writeDoc(editor, csafDocument('2.0', 'Hosted advisory'))
    await expect.poll(() => readDoc(editor)).toBeTruthy()

    await editor.getByTestId('new_document_button').click()
    await editor.getByTestId('new_document-template_button').check()
    await editor
      .getByTestId('new_document-templates-select')
      .selectOption({ label: 'Minimal' })
    await editor.getByTestId('new_document-create_document_button').click()
    // The current document has not been edited, so no confirmation is needed.

    await expect
      .poll(async () => (await eventsOf(page, 'csaf-change')).length)
      .toBeGreaterThan(0)
    const [change] = await eventsOf(page, 'csaf-change')
    expect(change.detail.doc.document.csaf_version).toEqual('2.0')
    expect(change.detail.doc.document.title).not.toEqual('Hosted advisory')
    expect(await readDoc(editor)).toEqual(change.detail.doc)
  })

  test('asks for confirmation before loading a CSAF 2.1 document', async ({
    page,
  }) => {
    const { editor } = await openEditor(page)
    const initial = await readDoc(editor)
    const csaf21 = csafDocument('2.1', 'Hosted 2.1 advisory')

    await writeDoc(editor, csaf21)
    await editor.getByTestId('beta_version-cancel_button').click()

    await expect(editor.getByTestId('beta_version_dialog')).toBeHidden()
    await expect(editor.locator('#csafVersionSelect')).toHaveValue('v2.0')
    expect(await readDoc(editor)).toEqual(initial)

    await writeDoc(editor, csaf21)
    await editor.getByTestId('beta_version-confirm_button').click()

    await expect(editor.locator('#csafVersionSelect')).toHaveValue('v2.1')
    await expect.poll(() => readDoc(editor)).toEqual(csaf21)
    expect(await eventsOf(page, 'csaf-change')).toEqual([])
  })

  test('loads the locale from the editor asset tree', async ({ page }) => {
    const localeRequests: string[] = []
    page.on('request', (request) => {
      const { pathname } = new URL(request.url())
      if (pathname.endsWith('/translation.json')) localeRequests.push(pathname)
    })
    const { editor } = await openEditor(page)
    // Registered after the editor is served, so that it takes precedence.
    await page.route(`**${basePath}/locales/de/translation.json`, (route) =>
      route.fulfill({
        json: {
          ...translation,
          menu: { ...translation.menu, formEditor: 'Formular-Editor' },
        },
      }),
    )

    await editor.evaluate((element) => {
      ;(element as any).locale = 'de'
    })

    await expect(editor.getByText('Formular-Editor')).toBeVisible()
    expect(localeRequests).toContain(`${basePath}/locales/de/translation.json`)
  })

  test.describe('validation', () => {
    const validatorUrl = 'https://validator.example.test'

    test('emits csaf-validate with the client result', async ({ page }) => {
      const { editor } = await openEditor(page)

      await writeDoc(editor, csafDocument('2.0', 'Incomplete advisory'))

      await expect
        .poll(async () => (await eventsOf(page, 'csaf-validate')).at(-1))
        .toMatchObject({ detail: { valid: false } })
      const [{ detail }] = (await eventsOf(page, 'csaf-validate')).slice(-1)
      expect(detail.errors.length).toBeGreaterThan(0)
      expect(detail.errors[0]).toEqual({
        type: expect.stringMatching(/^(error|warning|info)$/),
        instancePath: expect.any(String),
        message: expect.any(String),
      })
    })

    test('offers remote validation only when validatorUrl is set', async ({
      page,
    }) => {
      const { editor, externalRequests } = await openEditor(page)
      await expect(editor.getByTestId('new_document_button')).toBeVisible()
      await expect(editor.getByTestId('validate_button')).toHaveCount(0)
      expect(externalRequests).toEqual([])

      await editor.evaluate((element, url) => {
        ;(element as any).validatorUrl = url
      }, validatorUrl)
      await expect(editor.getByTestId('validate_button')).toBeVisible()

      await editor.evaluate((element) => {
        ;(element as any).validatorUrl = undefined
      })
      await expect(editor.getByTestId('validate_button')).toHaveCount(0)
    })

    test('merges the remote result into the client result until the document is edited', async ({
      page,
    }) => {
      const remoteRequests: unknown[] = []
      await page.route(`${validatorUrl}/api/v1/validate`, (route) => {
        const headers = {
          'access-control-allow-origin': '*',
          'access-control-allow-headers': '*',
        }
        if (route.request().method() === 'OPTIONS') {
          return route.fulfill({ status: 204, headers })
        }
        remoteRequests.push(route.request().postDataJSON())
        return route.fulfill({
          headers,
          json: {
            isValid: false,
            tests: [
              {
                errors: [{ instancePath: '/remote/error', message: 'remote' }],
                warnings: [
                  { instancePath: '/remote/warning', message: 'remote' },
                ],
                infos: [{ instancePath: '/remote/info', message: 'remote' }],
              },
            ],
          },
        })
      })
      const { editor } = await openEditor(page)
      await editor.evaluate((element, url) => {
        ;(element as any).validatorUrl = url
      }, validatorUrl)
      await writeDoc(editor, csafDocument('2.0', 'Remote advisory'))
      await expect
        .poll(() => eventsOf(page, 'csaf-validate'))
        .not.toHaveLength(0)
      const clientOnly = (await eventsOf(page, 'csaf-validate')).at(-1)!

      await editor.getByTestId('validate_button').click()

      await expect
        .poll(async () => (await eventsOf(page, 'csaf-validate')).at(-1))
        .not.toEqual(clientOnly)
      const { detail } = (await eventsOf(page, 'csaf-validate')).at(-1)!
      expect(detail.valid).toBe(false)
      expect(detail.errors).toEqual([
        ...clientOnly.detail.errors,
        { type: 'error', instancePath: '/remote/error', message: 'remote' },
        { type: 'warning', instancePath: '/remote/warning', message: 'remote' },
        { type: 'info', instancePath: '/remote/info', message: 'remote' },
      ])
      expect(remoteRequests).toHaveLength(1)
      expect(remoteRequests[0]).toMatchObject({
        document: { document: { title: 'Remote advisory' } },
      })

      const titleInput = await openDocumentSection(editor)
      await titleInput.fill('Edited remote advisory')
      await expect
        .poll(async () => (await eventsOf(page, 'csaf-validate')).at(-1))
        .toMatchObject({ detail: { errors: expect.any(Array) } })
      await expect
        .poll(async () =>
          (await eventsOf(page, 'csaf-validate'))
            .at(-1)!
            .detail.errors.some((e: any) =>
              e.instancePath.startsWith('/remote'),
            ),
        )
        .toBe(false)
    })

    test('shows a notification, but reports no result, if the validator is unreachable', async ({
      page,
    }) => {
      await page.route(`${validatorUrl}/api/v1/validate`, (route) =>
        route.fulfill({
          status: 503,
          headers: { 'access-control-allow-origin': '*' },
          body: 'unavailable',
        }),
      )
      const { editor } = await openEditor(page)
      await editor.evaluate((element, url) => {
        ;(element as any).validatorUrl = url
      }, validatorUrl)
      await writeDoc(editor, csafDocument('2.0', 'Unvalidated advisory'))
      await expect
        .poll(() => eventsOf(page, 'csaf-validate'))
        .not.toHaveLength(0)
      const before = await eventsOf(page, 'csaf-validate')

      await editor.getByTestId('validate_button').click()

      await expect(editor.getByTestId('error_toast_message')).toBeVisible()
      expect(await eventsOf(page, 'csaf-validate')).toEqual(before)
    })
  })
})
