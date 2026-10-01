import { expect, test } from '@playwright/test'
import translation from '../../locales/en/translation.json' with { type: 'json' }

test('loads editor translations from a nested base path', async ({ page }) => {
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

    const response = await route.fetch({
      url: new URL(assetPath, route.request().url()).href,
    })
    await route.fulfill({ response })
  })

  await page.goto(`${editorBasePath}/index.html`)

  const editor = page.locator('secvisogram-editor')
  await expect(editor.getByText(translation.menu.formEditor)).toBeVisible()
  await expect
    .poll(() => [...localeRequestPaths])
    .toContain(`${editorBasePath}/locales/en/translation.json`)
})
