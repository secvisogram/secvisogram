import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  canChangeDocument,
  getAdvisories,
  getGetAdvisoriesResponse,
  getGetAdvisoryDetailResponse,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'
import {
  advisoryIdV1,
  latestRevisionHistoryLegacyVersion,
  latestRevisionHistorySummary
} from "../../fixtures/samples/cmsBackendData/tests.js";

describe('SecvisogramPage / EditorTab', function () {
  describe('can save documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        it(`user: ${user.preferredUsername}, advisoryId: ${
          advisory.advisoryId
        }, canChangeDocument: ${canChangeDocument(user.user)}`, function () {
          cy.intercept(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            getLoginEnabledConfig()
          ).as('wellKnownAppConfig')
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
          cy.intercept(
            'GET',
            '/api/v1/advisories/',
            getGetAdvisoriesResponse()
          ).as('apiGetAdvisories')

          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
            userName: user.user,
          })
          cy.intercept(
            'GET',
            `/api/v1/advisories/${advisory.advisoryId}/`,
            advisoryDetail
          ).as('apiGetAdvisoryDetail')

          cy.visit('?tab=DOCUMENTS')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')
          cy.wait('@apiGetAdvisories')

          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-open_button"]`
          ).click()
          cy.wait('@apiGetAdvisoryDetail')
          cy.get('[data-testid="loading_indicator"]').should('not.exist')
          cy.location('search').should('equal', '?tab=EDITOR')

          const documentTitle =
            /** @type {any} */ (advisoryDetail.csaf).document.title +
            '-some-more-text'
          cy.get('[data-testid="attribute-/document/title"] input')
            .clear()
            .type(documentTitle)

          if (canChangeDocument(user.user)) {
            cy.setCookie("XSRF-TOKEN", "test-Value-123")
            cy.intercept(
              'PATCH',
              `/api/v1/advisories/${advisory.advisoryId}/?revision=${advisoryDetail.revision}`,
              {}
            ).as('apiUpdateAdvisory')
            cy.get('[data-testid="save_button"]').click()

            // check if the input fields are pre-filled with the latest revision history item data
            // for draft documents (version < 1) and if no revision history is given the fields should be empty
            let expectedSummary = ''
            let expectedLegacyVersion = ''
            if (advisory.advisoryId === advisoryIdV1) {
              expectedSummary = latestRevisionHistorySummary
              expectedLegacyVersion = latestRevisionHistoryLegacyVersion
            }

            cy.get('[data-testid="submit_version-summary-textarea"]')
              .should('have.value', expectedSummary)
              .as('prefilledSummary')
            cy.get('[data-testid="submit_version-legacy_version-input"]')
              .should('have.value', expectedLegacyVersion)
              .as('prefilledLegacyVersion')

            const summary = 'Summary'
            const legacyVersion = 'Legacy version'
            cy.get('@prefilledSummary').clear().type(summary)
            cy.get('@prefilledLegacyVersion').clear().type(legacyVersion)
            cy.get('[data-testid="submit_version-submit"]').click()
            cy.get('[data-testid="submit_version"]').should('not.exist')

            cy.wait('@apiUpdateAdvisory').then((xhr) => {
              expect(xhr.request.body.csaf.document.title).to.equal(
                documentTitle
              )
              expect(xhr.request.body.summary).to.equal(summary)
              expect(xhr.request.body.legacyVersion).to.equal(legacyVersion)
            })
            cy.wait('@apiGetAdvisoryDetail')
          } else {
            cy.get('[data-testid="save_button"]').should('not.exist')
          }
        })
      }
    }
  })
})
