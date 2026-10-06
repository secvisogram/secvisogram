import { expect, test } from '@playwright/test'
import translation from '../../locales/en/translation.json' with { type: 'json' }
import { editorBuilds, serveEditor } from './helpers/serveEditor.js'

for (const { name, outputDirectory } of editorBuilds) {
  test(`loads editor translations from a nested base path (${name})`, async ({
    page,
  }) => {
    const editorBasePath = '/nested-editor'
    const localeRequestPaths = new Set<string>()
    const documentationRequestPaths = new Set<string>()

    page.on('request', (request) => {
      const requestPath = new URL(request.url()).pathname
      if (requestPath.endsWith('/locales/en/translation.json')) {
        localeRequestPaths.add(requestPath)
      }
      if (requestPath.includes('/docs/user/')) {
        documentationRequestPaths.add(requestPath)
      }
    })

    await serveEditor(page, { outputDirectory, basePath: editorBasePath })

    await page.goto(`${editorBasePath}/index.html`)

    const editor = page.locator('secvisogram-editor')
    await expect(editor.getByText(translation.menu.formEditor)).toBeVisible()
    await expect
      .poll(() => [...localeRequestPaths])
      .toContain(`${editorBasePath}/locales/en/translation.json`)

    await editor.getByTestId('document-acknowledgments-infoButton').click()
    await editor.getByTestId('sideBar-DOCUMENTATION-button').click()

    const infoPanelContent = page.getByTestId('infoPanel-content')
    await expect(infoPanelContent).toContainText('Acknowledgments - Usage')
    await expect
      .poll(() => [...documentationRequestPaths])
      .toContain(
        `${editorBasePath}/docs/user/document/acknowledgments-usage.en.md`,
      )

    await infoPanelContent.getByText('types').click()
    await expect(infoPanelContent).toContainText(
      'There is no usage documentation yet.',
    )
    await expect
      .poll(() => [...documentationRequestPaths])
      .toContain(
        `${editorBasePath}/docs/user/types/acknowledgments-usage.en.md`,
      )
  })
}
