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
import i18next from 'i18next'
import { createEditorHost } from './editorHost.js'
import './i18next/i18next.js'
import '../vendor/first/cvsscalc30.js'
import '../vendor/first/cvsscalc31.js'

const DEFAULT_LOCALE = 'en'

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
    this.host = this.#createHost()
    /** @type {{ doc: {} } | null} */
    this.documentRequest = null
    /** @type {string | undefined} */
    this._validatorUrl = undefined
    /** @type {string | undefined} */
    this._locale = undefined
  }

  /**
   * The document currently held by the editor. Writing it loads a new
   * document, which resets the editor and is not reported via `csaf-change`.
   *
   * @type {{} | undefined}
   */
  get doc() {
    return this.host.getDocument() ?? this.documentRequest?.doc
  }

  set doc(value) {
    // `undefined` is what hosts write while they do not have a document yet.
    if (value === null || typeof value !== 'object') return
    this.documentRequest = { doc: value }
    this.host.loadDocument(value)
    this.render()
  }

  /**
   * Language code of the editor's own i18next instance.
   *
   * @type {string | undefined}
   */
  get locale() {
    return this._locale
  }

  set locale(value) {
    this._locale = value
    i18next.changeLanguage(value || DEFAULT_LOCALE)
  }

  /**
   * Base URL of the validator service. Remote validation is only offered if
   * it is set.
   *
   * @type {string | undefined}
   */
  get validatorUrl() {
    return this._validatorUrl
  }

  set validatorUrl(value) {
    this._validatorUrl = value
    this.render()
  }

  #createHost() {
    return createEditorHost({
      onChange: (doc) => {
        this.dispatchEvent(new CustomEvent('csaf-change', { detail: { doc } }))
      },
      onValidate: ({ errors, valid }) => {
        this.dispatchEvent(
          new CustomEvent('csaf-validate', { detail: { errors, valid } }),
        )
      },
    })
  }

  connectedCallback() {
    this.shadow.adoptedStyleSheets = [
      appStylesheet,
      fontAwesomeStylesheet,
      monacoStylesheet,
    ]

    this.emotionCache = createCache({
      key: 'secvisogram-editor',
      container: this.shadow,
    })

    this.theme = createTheme({
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
    this.render()
  }

  disconnectedCallback() {
    // A reconnected element starts a new editor session with the document
    // the previous one ended with.
    const doc = this.doc
    this.documentRequest = doc ? { doc } : null
    this.host = this.#createHost()
    if (doc) this.host.loadDocument(doc)
    this.root?.unmount()
    this.root = null
  }

  render() {
    if (!this.root || !this.emotionCache || !this.theme) return

    this.root.render(
      <CacheProvider value={this.emotionCache}>
        <ThemeProvider theme={this.theme}>
          <React.Suspense fallback={<LoadingIndicator label="" />}>
            <App
              secvisogramPage={
                <SecvisogramPage
                  host={this.host}
                  documentRequest={this.documentRequest}
                />
              }
              embedded
              validatorUrl={this._validatorUrl}
            />
          </React.Suspense>
        </ThemeProvider>
      </CacheProvider>,
    )
  }
}

customElements.define('secvisogram-editor', SecvisogramEditor)
