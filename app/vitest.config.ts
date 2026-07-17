import { readFileSync } from 'fs'
import { transformSync } from 'rolldown/utils'
import { defineConfig, type Plugin } from 'vitest/config'

// The app's webpack config uses raw-loader to import .html files as raw strings
// (see HTMLTemplate2_0.js/HTMLTemplate2_1.js). Vite has no built-in equivalent
// for plain (non-`?raw`) `.html` imports, so provide one here.
const rawHtmlLoader: Plugin = {
  name: 'raw-html-loader',
  enforce: 'pre',
  load(id) {
    if (id.endsWith('.html')) {
      return `export default ${JSON.stringify(readFileSync(id, 'utf-8'))}`
    }
  },
}

// The app's source uses JSX inside plain .js files (no .jsx extension, see e.g.
// ObjectEditor.js). Vite's default Oxc-based transform decides whether to parse
// JSX purely from the file extension (.jsx/.tsx yes, .js/.ts no) and that isn't
// configurable via Oxc's own include/exclude options, so this plugin
// pre-transforms .js files under lib/ by calling Oxc's own transform (via
// rolldown/utils, the same engine Vite 8 uses internally) directly with an
// explicit `lang: 'jsx'` before Oxc's regular (JSX-unaware) pass runs on them.
// No @vitejs/plugin-react dependency is needed since these files are only
// imported for their non-JSX exports in tests, never rendered.
const jsxInJsLoader: Plugin = {
  name: 'jsx-in-js-loader',
  enforce: 'pre',
  transform(code, id) {
    if (/\/lib\/.*\.js$/.test(id)) {
      const result = transformSync(id, code, {
        lang: 'jsx',
        sourcemap: true,
      })
      return { code: result.code, map: result.map }
    }
  },
}

export default defineConfig({
  plugins: [rawHtmlLoader, jsxInJsLoader],
  test: {
    include: ['tests/unit/**/*.test.{js,ts}'],
  },
})
