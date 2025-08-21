import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.js'
import SecvisogramPage from './app/SecvisogramPage.js'
import LoadingIndicator from './app/SecvisogramPage/View/LoadingIndicator.js'
import './i18next/i18next.js'

const root = document.createElement('div')
document.body.appendChild(root)

const theme = createTheme({
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
})

createRoot(root).render(
  <ThemeProvider theme={theme}>
    <React.Suspense fallback={<LoadingIndicator label="" />}>
      <App secvisogramPage={<SecvisogramPage />} />
    </React.Suspense>
  </ThemeProvider>
)
