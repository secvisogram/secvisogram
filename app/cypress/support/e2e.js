///<reference types="cypress" />

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@cypress/code-coverage/support.js'
import '../../vendor/first/cvsscalc30.js'
import '../../vendor/first/cvsscalc31.js'
import './commands.js'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/** @type {any} */
const win = window
win.SECVISOGRAM_VERSION = 'test'

beforeEach(() => {
  cy.intercept('/api/v1/about', (req) => {
    req.reply({ statusCode: 500 })
  })
  cy.intercept('/oauth2/userinfo', (req) => {
    req.reply({ statusCode: 500 })
  })
})
