import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import sortObjectKeys from '../../../lib/app/shared/sortObjectKeys.js'
import minimalDoc from '../../fixtures/documentTests/shared/minimalDoc.js'

/**
 * Loads a document from a URL via the "new document" dialog. A confirm dialog
 * only appears if the current document has unsaved changes, so it is clicked
 * only when it actually shows up.
 */
async function loadDocumentFromUrl(page: Page, fileURL: string) {
  await page.getByTestId('new_document_button').click()
  await page.getByTestId('new_document-url_button').click()
  await page.getByTestId('new_document-url_input').fill(fileURL)
  await page.getByTestId('new_document-create_document_button').click()

  const confirmButton = page.getByTestId('alert-confirm_button')
  await confirmButton
    .waitFor({ state: 'visible', timeout: 3000 })
    .then(() => confirmButton.click())
    .catch(() => {})
}

/** Waits until the Monaco editor's document title matches the expected value. */
async function expectEditorTitle(page: Page, title: string) {
  await page.waitForFunction((expected) => {
    const win = window as any
    if (!win.MONACO_EDITOR) return false
    const doc = JSON.parse(win.MONACO_EDITOR.getModel().getValue())
    return doc.document.title === expected
  }, title)
}

test.describe('SecvisogramPage / JsonEditorTab', () => {
  test('can change a document and load changes', async ({ page }) => {
    // The app only sets window.MONACO_EDITOR when window.Cypress is truthy
    await page.addInitScript(() => {
      ;(window as any).Cypress = true
    })
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ status: 404, json: {} }),
    )

    await page.goto('?tab=SOURCE')

    await page.waitForFunction(
      () => (window as any).MONACO_EDITOR !== undefined,
    )
    const initialTitle = await page.evaluate(() => {
      const doc = JSON.parse(
        (window as any).MONACO_EDITOR.getModel().getValue(),
      )
      return typeof doc.document.category
    })
    expect(initialTitle).toEqual('string')

    const newDocumentTitle = 'MY NEW TITLE'

    await page.evaluate((title) => {
      const editor = (window as any).MONACO_EDITOR
      const value = JSON.parse(editor.getModel().getValue())
      value.document.title = title
      editor.getModel().setValue(JSON.stringify(value, null, 2))
    }, newDocumentTitle)

    await page.getByTestId('tab_button-EDITOR').click()
    await page.getByTestId('menu_entry-/document').click()
    const titleInput = page
      .getByTestId('attribute-document-title')
      .locator('input')
    await expect(titleInput).toHaveValue(newDocumentTitle)
    await titleInput.fill(newDocumentTitle + ' (FORM EDITOR)')

    await page.getByTestId('tab_button-SOURCE').click()
    await expectEditorTitle(page, newDocumentTitle + ' (FORM EDITOR)')
  })

  test('can sort a document', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as any).Cypress = true
    })
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ status: 404, json: {} }),
    )

    await page.goto('?tab=SOURCE')

    await page.waitForFunction(
      () => (window as any).MONACO_EDITOR !== undefined,
    )
    const initialValue = await page.evaluate(
      () => (window as any).MONACO_EDITOR.getModel().getValue() as string,
    )
    const doc = JSON.parse(initialValue)
    expect(typeof doc.document.category).toEqual('string')

    const sortedEditorValue = JSON.stringify(
      sortObjectKeys(new Intl.Collator(), doc),
      null,
      2,
    )

    await page.getByTestId('sort_document_button').click()

    await page.waitForFunction(
      (expected) =>
        (window as any).MONACO_EDITOR.getModel().getValue() === expected,
      sortedEditorValue,
    )
  })

  test('editor updates on file load', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as any).Cypress = true
    })
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ status: 404, json: {} }),
    )
    const fileURL = 'https://example.com/test.json'
    await page.route(fileURL, (route) => route.fulfill({ json: minimalDoc }))

    await page.goto('?tab=SOURCE')

    // load test document
    await loadDocumentFromUrl(page, fileURL)
    await expectEditorTitle(page, minimalDoc.document.title)

    // change title
    const newDocumentTitle = 'a different document title'
    await page.evaluate((title) => {
      const editor = (window as any).MONACO_EDITOR
      const value = JSON.parse(editor.getModel().getValue())
      value.document.title = title
      editor.getModel().setValue(JSON.stringify(value, null, 2))
    }, newDocumentTitle)
    await expectEditorTitle(page, newDocumentTitle)

    // reload test document
    await loadDocumentFromUrl(page, fileURL)

    // title change should be undone
    await expectEditorTitle(page, minimalDoc.document.title)
  })
})
