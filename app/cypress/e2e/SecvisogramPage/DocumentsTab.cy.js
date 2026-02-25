import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  canCreateVersion,
  canDeleteDocument,
  getAdvisories,
  getGetAdvisoriesResponse,
  getGetAdvisoryDetailResponse,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'

describe('SecvisogramPage / DocumentsTab', function () {
  beforeEach(function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig(),
    ).as('wellKnownAppConfig')
    cy.intercept('/api/v1/advisories', getGetAdvisoriesResponse()).as(
      'apiGetAdvisories',
    )
  })

  describe('can fetch documents from the csaf cms backend', function () {
    for (const user of getUsers()) {
      it(`user: ${user.preferredUsername}`, function () {
        cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
          'apiGetUserInfo',
        )

        cy.visit('?tab=DOCUMENTS')

        cy.wait('@wellKnownAppConfig')
        cy.wait('@apiGetUserInfo')
        for (const advisory of getAdvisories()) {
          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`,
          ).should('exist')
          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state"]`,
          ).should('have.text', advisory.workflowState)
        }
      })
    }
  })

  describe('can delete documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        it(`user: ${user.preferredUsername}, advisoryId: ${
          advisory.advisoryId
        }, canDelete: ${canDeleteDocument(user.user)}`, function () {
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user),
          ).as('apiGetUserInfo')
          cy.intercept(
            '/api/v1/advisories',
            getGetAdvisoriesResponse(user.user),
          ).as('apiGetAdvisories')
          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
          })
          cy.setCookie('XSRF-TOKEN', 'test-Value-123')
          cy.intercept(
            {
              method: 'DELETE',
              url: `/api/v1/advisories/${advisory.advisoryId}?revision=${advisoryDetail.revision}`,
            },
            { statusCode: 204 },
          ).as('apiDeleteAdvisory')
          cy.intercept(
            `/api/v1/advisories/${advisory.advisoryId}`,
            advisoryDetail,
          ).as('apiGetAdvisoryDetail')

          cy.visit('?tab=DOCUMENTS')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')
          cy.wait('@apiGetAdvisories')

          // Pretend to have the advisory removed
          cy.intercept(
            '/api/v1/advisories',
            getGetAdvisoriesResponse().filter(
              (a) => a.advisoryId !== advisory.advisoryId,
            ),
          ).as('apiGetAdvisories')

          if (!canDeleteDocument(user.user)) {
            cy.get(
              `[data-testid="advisory-${advisory.advisoryId}-list_entry-delete_button"]`,
            ).should('not.exist')
          } else {
            cy.get(
              `[data-testid="advisory-${advisory.advisoryId}-list_entry-delete_button"]`,
            ).click()
            cy.get('[data-testid="alert-confirm_button"]').click()
            cy.wait([
              '@apiGetAdvisoryDetail',
              '@apiDeleteAdvisory',
              '@apiGetAdvisories',
            ])
            cy.get('[data-testid="loading_indicator"]').should('not.exist')
            cy.get(
              `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`,
            ).should('not.exist')
          }
        })
      }
    }
  })

  describe('can open documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        it(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, function () {
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user),
          ).as('apiGetUserInfo')
          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
          })
          cy.intercept(
            `/api/v1/advisories/${advisory.advisoryId}`,
            advisoryDetail,
          ).as('apiGetAdvisoryDetail')

          cy.visit('?tab=DOCUMENTS')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')
          cy.wait('@apiGetAdvisories')

          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-open_button"]`,
          ).click()
          cy.wait('@apiGetAdvisoryDetail')
          cy.get('[data-testid="loading_indicator"]').should('not.exist')
          cy.location('search').should('equal', '?tab=EDITOR')
          cy.get(`[data-testid="menu_entry-/document"]`).click()
          cy.get('[data-testid="attribute-document-title"] input').should(
            'have.value',
            /** @type {any} */ (advisoryDetail.csaf).document.title,
          )
          cy.get('[data-testid="document_tracking_id"]').should(
            'have.text',
            /** @type {any} */ (advisoryDetail.csaf).document.title,
          )
        })
      }
    }
  })

  describe('can move a document into a new workflow state', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories().filter((a) => !a.isValid)) {
        for (const workflowState of advisory.allowedStateChanges) {
          it(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}, workflowState: ${workflowState}`, function () {
            cy.intercept(
              getLoginEnabledConfig().userInfoUrl,
              getUserInfo(user),
            ).as('apiGetUserInfo')
            cy.intercept(
              `/api/v1/advisories/${advisory.advisoryId}`,
              getGetAdvisoryDetailResponse({
                advisoryId: advisory.advisoryId,
              }),
            ).as('apiGetAdvisoryDetail')

            cy.visit('?tab=DOCUMENTS')
            cy.wait('@wellKnownAppConfig')
            cy.wait('@apiGetUserInfo')
            cy.wait('@apiGetAdvisories')

            const documentTrackingStatus = 'Final'
            const proposedTime = '2017-06-01T08:30'
            const apiChangeWorkflowStateURL = new URL(
              `/api/v1/advisories/${advisory.advisoryId}/workflowstate/${workflowState}`,
              window.location.href,
            )
            apiChangeWorkflowStateURL.searchParams.set(
              'revision',
              advisory.revision,
            )
            if (workflowState === 'Published') {
              apiChangeWorkflowStateURL.searchParams.set(
                'documentTrackingStatus',
                documentTrackingStatus,
              )
            }
            if (
              workflowState === 'Published' ||
              workflowState === 'RfPublication'
            ) {
              apiChangeWorkflowStateURL.searchParams.set(
                'proposedTime',
                new Date(proposedTime).toISOString(),
              )
            }
            cy.setCookie('XSRF-TOKEN', 'test-Value-123')
            cy.intercept(
              'PATCH',
              apiChangeWorkflowStateURL.pathname +
                apiChangeWorkflowStateURL.search,
              advisory.isValid ? {} : { statusCode: 422 },
            ).as('apiChangeWorkflowState')

            cy.get(
              `[data-testid="advisory-${advisory.advisoryId}-list_entry-edit_workflow_state_button"]`,
            ).click()
            cy.get(
              `select[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state_select"]`,
            ).select(workflowState)
            if (workflowState === 'Published') {
              for (const trackingStatus of ['Final', 'Interim']) {
                cy.get(
                  `select[data-testid="advisory-${advisory.advisoryId}-edit_workflow_state_dialog-tracking_status_select"] option[value="${trackingStatus}"]`,
                ).should('exist')
              }
              cy.get(
                `select[data-testid="advisory-${advisory.advisoryId}-edit_workflow_state_dialog-tracking_status_select"]`,
              ).select(documentTrackingStatus)
            }
            if (
              workflowState === 'Published' ||
              workflowState === 'RfPublication'
            ) {
              cy.get(
                `[data-testid="advisory-${advisory.advisoryId}-edit_workflow_state_dialog-proposed_time_input"]`,
              ).type(proposedTime)
            }
            cy.get(
              `select[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state_select"]`,
            )
              .closest('form')
              .submit()
            cy.wait('@apiChangeWorkflowState')
            if (!advisory.isValid) {
              cy.get('[data-testid="error_toast_message"]').should(
                'contain',
                'document is not valid',
              )
            } else {
              cy.wait('@apiGetAdvisories')
            }
          })
        }
      }
    }
  })

  describe('can create a new version', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories().filter((a) =>
        canCreateVersion({
          userName: user.user,
          workflowState: a.workflowState,
        }),
      )) {
        it(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, function () {
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user),
          ).as('apiGetUserInfo')
          cy.intercept(
            '/api/v1/advisories',
            getGetAdvisoriesResponse(user.user),
          ).as('apiGetAdvisories')
          cy.intercept(
            `/api/v1/advisories/${advisory.advisoryId}`,
            getGetAdvisoryDetailResponse({
              advisoryId: advisory.advisoryId,
            }),
          ).as('apiGetAdvisoryDetail')

          cy.visit('?tab=DOCUMENTS')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')
          cy.wait('@apiGetAdvisories')
          cy.get('[data-testid="user_info"]').should('exist')

          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-edit_workflow_state_button"]`,
          ).should('not.exist')

          const createNewVersionURL = new URL(
            `/api/v1/advisories/${advisory.advisoryId}/createNewVersion`,
            Cypress.config().baseUrl ?? undefined,
          )
          createNewVersionURL.searchParams.set('revision', advisory.revision)
          cy.setCookie('XSRF-TOKEN', 'test-Value-123')
          cy.intercept('PATCH', createNewVersionURL.href, { body: '' }).as(
            'apiCreateVersion',
          )
          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-create_new_version_button"]`,
          ).click()
          cy.wait('@apiGetAdvisoryDetail')
          cy.wait('@apiCreateVersion')
          cy.wait('@apiGetAdvisories')
        })
      }
    }
  })
})
