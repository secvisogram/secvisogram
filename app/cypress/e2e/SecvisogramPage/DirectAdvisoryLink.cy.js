import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  getAdvisories,
  getGetAdvisoryDetailResponse,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'

describe('SecvisogramPage / direct advisory link', function () {
  it('backend-connected: loads the advisory and redirects to the editor', function () {
    const [advisory] = getAdvisories()
    const user = getUsers()[0]

    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig(),
    ).as('wellKnownAppConfig')
    cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
      'apiGetUserInfo',
    )
    const advisoryDetail = getGetAdvisoryDetailResponse({
      advisoryId: advisory.advisoryId,
    })
    cy.intercept(
      `/api/v1/advisories/${advisory.advisoryId}`,
      advisoryDetail,
    ).as('apiGetAdvisoryDetail')

    cy.visit(`?advisoryId=${advisory.advisoryId}`)
    cy.wait('@wellKnownAppConfig')
    cy.wait('@apiGetUserInfo')
    cy.wait('@apiGetAdvisoryDetail')

    cy.get('[data-testid="loading_indicator"]').should('not.exist')
    cy.location('search').should('equal', '?tab=EDITOR')

    cy.get('[data-testid="menu_entry-/document"]').click()
    cy.get('[data-testid="attribute-document-title"] input').should(
      'have.value',
      advisoryDetail.csaf.document.title,
    )
  })

  it('standalone mode: redirects to the editor without fetching an advisory', function () {
    cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
      statusCode: 404,
      body: {},
    }).as('wellKnownAppConfig')

    cy.visit('?advisoryId=some-advisory-id')
    cy.wait('@wellKnownAppConfig')

    cy.location('search').should('equal', '?tab=EDITOR')
    cy.get('[data-testid="loading_indicator"]').should('not.exist')
    cy.get('[data-testid="error_toast_message"]').should('not.exist')

    cy.get('[data-testid="menu_entry-/document"]').click()
    cy.get('[data-testid="attribute-document-title"] input').should(
      'have.value',
      '',
    )
  })

  it('backend-connected: shows an error and still redirects when the advisory cannot be loaded', function () {
    const user = getUsers()[0]
    const advisoryId = 'unknown-advisory-id'

    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig(),
    ).as('wellKnownAppConfig')
    cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
      'apiGetUserInfo',
    )
    cy.intercept(`/api/v1/advisories/${advisoryId}`, {
      statusCode: 404,
      body: {},
    }).as('apiGetAdvisoryDetail')

    cy.visit(`?advisoryId=${advisoryId}`)
    cy.wait('@wellKnownAppConfig')
    cy.wait('@apiGetUserInfo')
    cy.wait('@apiGetAdvisoryDetail')

    cy.location('search').should('equal', '?tab=EDITOR')
    cy.get('[data-testid="loading_indicator"]').should('not.exist')
    cy.get('[data-testid="error_toast_message"]').should('exist')
  })
})
