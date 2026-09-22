import js from '@eslint/js'
import react from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  js.configs.recommended,
  react.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015,
        CVSS: true,
        CVSS31: true,
      },
    },
    rules: {
      'no-unused-params': 'off',
      'no-empty-pattern': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'no-unused-vars': [
        'error',
        {
          caughtErrors: 'all',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Redundant, stylistic, or core ESLint noise
      'no-useless-assignment': 'off',
      '@eslint-react/exhaustive-deps': 'off', // Already handled by eslint-plugin-react-hooks
      '@eslint-react/use-state': 'off', // Already handled by eslint-plugin-react-hooks
      // React 19 Migration (Plan to refactor later)
      '@eslint-react/no-forward-ref': 'off', // Legacy forwardRef is deprecated but still works in React 19
      '@eslint-react/no-context-provider': 'off', // Legacy <Context.Provider> is still supported in React 19
      '@eslint-react/no-use-context': 'off', // Legacy useContext is still supported alongside the new use() API
      '@eslint-react/no-array-index-key': 'warn', // Kept as a warning to flag potential list rendering bugs
      // Keep active to prevent bugs and memory leaks
      '@eslint-react/jsx-no-key-after-spread': 'error', // Prevents incorrect key overriding in component loops
      '@eslint-react/set-state-in-effect': 'warn', // Warns against infinite render loops and layout thrashing
      '@eslint-react/web-api-no-leaked-event-listener': 'warn', // Catches missing cleanup functions in useEffect listeners
      '@eslint-react/web-api-no-leaked-timeout': 'warn', // Catches missing clearTimeout in useEffect hooks
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['dist', 'node_modules', 'vendor', 'coverage'],
  },
])
