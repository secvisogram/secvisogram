const fs = require('node:fs')
const path = require('node:path')

const editorBundlePath = path.join(__dirname, '../dist/secvisogram-editor.js')

if (!fs.existsSync(editorBundlePath)) {
  console.error(
    'Editor build output is missing. Run `npm run build:editor` from the repository root before packing.',
  )
  process.exit(1)
}
