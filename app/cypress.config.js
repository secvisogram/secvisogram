import codeCoverageTasks from '@cypress/code-coverage/task.js'
import webpackPreprocessor from '@cypress/webpack-preprocessor'
import { defineConfig } from 'cypress'
import { rm } from 'fs/promises'

export default defineConfig({
  video: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 1024,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      codeCoverageTasks(on, config)

      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: {
            mode: 'development',
            module: {
              rules: [
                {
                  test: /\.jsx?$/,
                  exclude: [/node_modules/],
                  use: 'babel-loader',
                },
                { test: /\.html$/, use: 'raw-loader' },
              ],
            },
          },
        })
      )

      on('task', {
        /**
         * @param {string} path
         */
        async rm(path) {
          await rm(path, { recursive: true, force: true })
          return null
        },

        /**
         * Allows console logs during cypress testing
         *
         * @param {any} message
         */
        async log(message) {
          console.log(message)
          return null
        },
      })
      return config
    },
    baseUrl: 'http://localhost:8080',
  },
})
