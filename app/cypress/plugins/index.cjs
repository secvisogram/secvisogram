// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const { rm } = require('fs/promises')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
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
              use: require.resolve('babel-loader'),
            },
            { test: /\.html$/, use: require.resolve('raw-loader') },
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
  })
}
