import { expect, test } from '@playwright/test'
import translation from '../../locales/en/translation.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'

const editorBuilds = [
  {
    name: 'application build',
    outputDirectory: new URL('../../dist/', import.meta.url),
  },
  {
    name: 'editor package build',
    outputDirectory: new URL('../../../editor/dist/', import.meta.url),
  },
]

for (const { name, outputDirectory } of editorBuilds) {
  test(`loads editor translations from a nested base path (${name})`, async ({
    page,
  }) => {
    const editorBasePath = '/nested-editor'
    const localeRequestPaths = new Set<string>()

    page.on('request', (request) => {
      const requestPath = new URL(request.url()).pathname
      if (requestPath.endsWith('/locales/en/translation.json')) {
        localeRequestPaths.add(requestPath)
      }
    })

    await page.route(`**${editorBasePath}/**`, async (route) => {
      const requestPath = new URL(route.request().url()).pathname
      const assetPath = requestPath.slice(editorBasePath.length)

      if (assetPath === '/index.html') {
        await route.fulfill({
          contentType: 'text/html',
          body: `<!doctype html>
<html>
  <head>
    <script type="module" src="./secvisogram-editor.js"></script>
  </head>
  <body>
    <secvisogram-editor></secvisogram-editor>
  </body>
</html>`,
        })
        return
      }

      if (assetPath === '/.well-known/appspecific/de.bsi.secvisogram.json') {
        await route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({ loginAvailable: false }),
        })
        return
      }

      await route.fulfill({
        path: fileURLToPath(new URL(assetPath.slice(1), outputDirectory)),
      })
    })

    await page.goto(`${editorBasePath}/index.html`)

    const editor = page.locator('secvisogram-editor')
    await expect(editor.getByText(translation.menu.formEditor)).toBeVisible()
    await expect
      .poll(() => [...localeRequestPaths])
      .toContain(`${editorBasePath}/locales/en/translation.json`)
  })
}
