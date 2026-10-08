import type { Page, Route } from '@playwright/test'
import { fileURLToPath } from 'node:url'

export const editorBuilds = [
  {
    name: 'application build',
    outputDirectory: new URL('../../../dist/', import.meta.url),
  },
  {
    name: 'editor package build',
    outputDirectory: new URL('../../../../editor/dist/', import.meta.url),
  },
]

export const editorPackageOutput = editorBuilds[1].outputDirectory

/**
 * Serves a built `<secvisogram-editor>` asset tree below `basePath` on the
 * page's origin and a host page that loads it. Everything outside of
 * `basePath` is left untouched, so tests can observe it via request events.
 */
export async function serveEditor(
  page: Page,
  {
    outputDirectory,
    basePath,
  }: {
    outputDirectory: URL
    basePath: string
  },
) {
  await page.route(`**${basePath}/**`, async (route: Route) => {
    const requestPath = new URL(route.request().url()).pathname
    const assetPath = requestPath.slice(basePath.length)

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

    await route.fulfill({
      path: fileURLToPath(new URL(assetPath.slice(1), outputDirectory)),
    })
  })
}
