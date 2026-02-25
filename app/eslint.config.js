import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  js.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015,
        ...globals.mocha,
        suite: true,
        setup: true,
        teardown: true,
        test: true,
        mocha: true,
        ace: true,
        CVSS: true,
        CVSS31: true,
        cy: true,
        expect: true,
        Cypress: true,
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
          caughtErrorsIgnorePattern: '^_',
        },
      ],
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
