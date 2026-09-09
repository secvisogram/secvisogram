import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { createTheme, ThemeProvider } from '@mui/material'
import { config } from '@fortawesome/fontawesome-svg-core'
import fontAwesomeStylesheet from '!!css-loader?exportType=css-style-sheet!@fortawesome/fontawesome-svg-core/styles.css'
import monacoStylesheet from '!!css-loader?exportType=css-style-sheet!monaco-editor/min/vs/editor/editor.main.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import appStylesheet from './style.css?adoptedStyleSheet'
import App from './app/App.js'
import SecvisogramPage from './app/SecvisogramPage.js'
import LoadingIndicator from './app/SecvisogramPage/View/LoadingIndicator.js'
import './i18next/i18next.js'
import '../vendor/first/cvsscalc30.js'
import '../vendor/first/cvsscalc31.js'

// Font Awesome would otherwise auto-inject its stylesheet into
// `document.head`, which is unreachable from within a shadow root.
config.autoAddCss = false

class SecvisogramEditor extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.mountPoint = document.createElement('div')
    this.shadow.append(this.mountPoint)
    /** @type {import('react-dom/client').Root | null} */
    this.root = null
  }

  connectedCallback() {
    this.shadow.adoptedStyleSheets = [
      appStylesheet,
      fontAwesomeStylesheet,
      monacoStylesheet,
    ]

    const emotionCache = createCache({
      key: 'secvisogram-editor',
      container: this.shadow,
    })

    const theme = createTheme({
      typography: {
        fontFamily:
          'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      components: {
        // MUI components based on `Modal`/`Popper` (e.g. `Dialog`,
        // `Autocomplete`) render their content in a portal that defaults to
        // `document.body`. Since that is outside of the shadow root, the
        // portalled content needs to be redirected into the shadow root
        // explicitly.
        MuiModal: {
          defaultProps: { container: () => this.mountPoint },
        },
        MuiPopper: {
          defaultProps: { container: () => this.mountPoint },
        },
      },
    })

    this.root = createRoot(this.mountPoint)
    this.root.render(
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<LoadingIndicator label="" />}>
            <App secvisogramPage={<SecvisogramPage />} embedded />
          </React.Suspense>
        </ThemeProvider>
      </CacheProvider>,
    )
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
  }
}

customElements.define('secvisogram-editor', SecvisogramEditor)
