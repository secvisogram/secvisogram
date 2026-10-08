import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const editorBundlePath = fileURLToPath(
  new URL('../dist/secvisogram-editor.js', import.meta.url),
)

if (!existsSync(editorBundlePath)) {
  console.error(
    'Editor build output is missing. Run `npm run build:editor` from the repository root before packing.',
  )
  process.exit(1)
}
