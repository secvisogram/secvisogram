import { getObjectMenuPaths } from '../../../lib/app/SecvisogramPage/View/FormEditor/editors/GenericEditor/ObjectEditor.js'
import schema from '../../../lib/app/SecvisogramPage/View/FormEditor/editors/schemas/csaf_2_0.js'
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
  latestRevisionHistorySummary,
} from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / FormEditor Tab', function () {
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
            '/api/v1/advisories',
            getGetAdvisoriesResponse()
          ).as('apiGetAdvisories')

          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
            userName: user.user,
          })
          cy.intercept(
            'GET',
            `/api/v1/advisories/${advisory.advisoryId}`,
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

          cy.get(`[data-testid="menu_entry-/document"]`).click()

          const documentTitle =
            /** @type {any} */ (advisoryDetail.csaf).document.title +
            '-some-more-text'
          cy.get('[data-testid="attribute-document-title"] input')
            .clear()
            .type(documentTitle)

          if (canChangeDocument(user.user)) {
            cy.setCookie('XSRF-TOKEN', 'test-Value-123')
            cy.intercept(
              'PATCH',
              `/api/v1/advisories/${advisory.advisoryId}?revision=${advisoryDetail.revision}`,
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

  it('can display usage help', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="document-acknowledgments-infoButton"]`).click()
    cy.get(`[data-testid="sideBar-DOCUMENTATION-button"]`).click()
    const infoPanelContent = cy.get('[data-testid="infoPanel-content"]')
    infoPanelContent.should('exist')
    infoPanelContent.should('contain.text', 'Acknowledgments - Usage')
  })

  describe('can add and remove new array items from object editor', function () {
    it('/product_tree/branches', function () {
      cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
        statusCode: 404,
        body: {},
      }).as('wellKnownAppConfig')

      cy.visit('?tab=EDITOR')
      cy.wait('@wellKnownAppConfig')

      cy.get(`[data-testid="menu_entry-/product_tree/branches"]`).click()
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches-add_item_button"]`
      ).click({ force: true })
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches"]`
      ).should('have.class', 'menu_entry-selected')
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches-add_item_button"]`
      ).click({ force: true })
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches/0/branches"]`
      ).should('have.class', 'menu_entry-selected')

      cy.get(`[data-testid="product_tree-branches-0-deleteButton"]`).click({
        force: true,
      })
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches/0/branches"]`
      ).should('not.exist')
    })
  })

  describe('getMenuPaths()', function () {
    it('can calculate the menu structure for the top level sidebar', function () {
      expect(
        getObjectMenuPaths(
          /** @type {import('../../../lib/app/SecvisogramPage/View/FormEditor/editors/schemas/csaf_2_0.js').Property} */ (
            schema
          )
        )
      ).to.deep.equal([
        { instancePath: ['document'] },
        { instancePath: ['document', 'acknowledgments'] },
        { instancePath: ['document', 'aggregate_severity'] },
        { instancePath: ['document', 'distribution'] },
        { instancePath: ['document', 'notes'] },
        { instancePath: ['document', 'publisher'] },
        { instancePath: ['document', 'references'] },
        { instancePath: ['document', 'tracking'] },
        { instancePath: ['product_tree'] },
        { instancePath: ['product_tree', 'branches'] },
        { instancePath: ['product_tree', 'full_product_names'] },
        { instancePath: ['product_tree', 'product_groups'] },
        { instancePath: ['product_tree', 'relationships'] },
        { instancePath: ['vulnerabilities'] },
      ])
    })
  })

  it('shows fields based on selected level', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    // with default category csaf_security_advisory publisher should be displayed
    cy.get(`[data-testid="layer-button-best_practice"]`).click()
    cy.get(`[data-testid="menu_entry-/document/publisher"]`).should('exist')

    // relationships menu should not be displayed for level best_practice
    cy.get(`[data-testid="menu_entry-/product_tree/relationships"]`).should(
      'not.exist'
    )

    cy.get(`[data-testid="menu_entry-/document"]`).click()

    // the language attribute should not be displayed for level mandatory
    cy.get(`[data-testid="layer-button-mandatory"]`).click()
    cy.get(`[data-testid="attribute-document-lang"]`).should('not.exist')

    // it should exist for level want_to_have
    cy.get(`[data-testid="layer-button-want_to_have"]`).click()
    cy.get(`[data-testid="attribute-document-lang"]`).should('exist')
  })

  it('hides "Fields" button when no input fields are shown', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="layer-button-optional"]`).click()
    cy.get(`[data-testid="menu_entry-/document/distribution"]`).click()
    cy.get(`[data-testid="document/distribution-fieldButton"]`).should('exist')
    cy.get(`[data-testid="layer-button-want_to_have"]`).click()
    cy.get(`[data-testid="document/distribution-fieldButton"]`).should(
      'not.exist'
    )
  })

  it('selects the closest relevant path if the selected becomes irrelevant', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="layer-button-optional"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking/generator"]`).click()
    cy.get(`[data-testid="layer-button-best_practice"]`).click()
    cy.get(
      `[data-testid="menu_entry-/document/tracking/generator/engine"]`
    ).should('not.exist')
  })

  it('selects the closest relevant path if the selected becomes irrelevant when deep down', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/vulnerabilities-add_item_button"]`).click(
      { force: true }
    )
    cy.get(
      `[data-testid="menu_entry-/vulnerabilities/0/scores-add_item_button"]`
    ).click({ force: true })
    cy.get(
      `[data-testid="menu_entry-/vulnerabilities/0/scores/0/cvss_v3"]`
    ).click()
    cy.get(`[data-testid="layer-button-mandatory"]`).click()
    cy.get(`[data-testid="vulnerabilities-0-scores-infoButton"]`).should(
      'not.exist'
    )
  })

  it('shows errors in sidebar according to selected path', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="document-tracking-infoButton"]`).click()

    // there should be 6 error cards under /document/tracking for the default minimal document
    cy.get(`[data-testid="error-cards"] div`).should('have.length', 6)

    cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
    cy.get('[data-testid="attribute-document-tracking-version"] input')
      .clear()
      .type('doesNotMatchRegex')
    cy.get(`[data-testid="document-tracking-version-infoButton"]`).click()

    // there should be one error card for /document/tracking/version when it does not match the expected regex
    cy.get(`[data-testid="error-cards"] div`).should('have.length', 1)
    cy.get(`[data-testid="error_card-/document/tracking/version-0"]`).should(
      'exist'
    )
  })

  it('enable fields that should be editable when not logged in', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="layer-button-optional"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking/generator"]`).click()
    cy.get(
      `[data-testid="menu_entry-/document/tracking/generator/engine"]`
    ).click()
    cy.get(
      `[data-testid="attribute-document-tracking-generator-engine-name"] input`
    ).should('not.have.attr', 'disabled')
  })

  it('disable fields that should not be editable when logged in', function () {
    for (const user of getUsers()) {
      cy.intercept(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        getLoginEnabledConfig()
      ).as('wellKnownAppConfig')
      cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
        'apiGetUserInfo'
      )

      cy.visit('?tab=EDITOR')
      cy.wait('@wellKnownAppConfig')
      cy.wait('@apiGetUserInfo')

      cy.get(`[data-testid="layer-button-optional"]`).click()
      cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
      cy.get(`[data-testid="menu_entry-/document/tracking/generator"]`).click()
      cy.get(
        `[data-testid="menu_entry-/document/tracking/generator/engine"]`
      ).click()
      cy.get(
        `[data-testid="attribute-document-tracking-generator-engine-name"] input`
      ).should('have.attr', 'disabled')
    }
  })

  it('correctly display errors when adding and deleting elements from arrays', function () {
    for (const user of getUsers()) {
      cy.intercept(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        getLoginEnabledConfig()
      ).as('wellKnownAppConfig')
      cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
        'apiGetUserInfo'
      )

      cy.visit('?tab=EDITOR')
      cy.wait('@wellKnownAppConfig')
      cy.wait('@apiGetUserInfo')

      cy.get(
        '[data-testid="error_indicator-object/vulnerabilities"] svg'
      ).should('have.class', 'text-green-600')
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="error_indicator-object/vulnerabilities"] svg'
      ).should('have.class', 'text-red-600')
      cy.get('[data-testid="vulnerabilities-0-deleteButton"]').click({
        force: true,
      })
      cy.get(
        '[data-testid="error_indicator-object/vulnerabilities"] svg'
      ).should('have.class', 'text-green-600')
    }
  })

  it('prefills product and group IDs', function () {
    cy.visit('?tab=EDITOR')

    // set relevance level to optional to enable editing groups
    cy.get('[data-testid="layer-button-optional"]').click()

    // check if branch full product name is filled with a generated product ID
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/0/product"]'
    ).click()
    // should be empty first
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-product-product_id"] input'
    ).should('be.empty')
    // and filled with a value after clicking the generate button
    cy.get(
      '[data-testid="product_tree-branches-0-product-product_id-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-product-product_id"] input'
    ).should('have.value', 'CSAFPID-0001')

    // check if a new relationship gets assigned the next generated product ID
    cy.get(`[data-testid="layer-button-optional"]`).click()
    cy.get(
      `[data-testid="menu_entry-/product_tree/relationships-add_item_button"]`
    ).click({ force: true })
    cy.get(
      `[data-testid="menu_entry-/product_tree/relationships/0/full_product_name"]`
    ).click()
    // should be empty first
    cy.get(
      '[data-testid="attribute-product_tree-relationships-0-full_product_name-product_id"] input'
    ).should('be.empty')
    // and filled with the next value after clicking the generate button
    cy.get(
      '[data-testid="product_tree-relationships-0-full_product_name-product_id-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-relationships-0-full_product_name-product_id"] input'
    ).should('have.value', 'CSAFPID-0002')

    // check if a full product name gets assigned the next generated product ID
    cy.get(
      `[data-testid="menu_entry-/product_tree/full_product_names-add_item_button"]`
    ).click({ force: true })
    // should be empty first
    cy.get(
      '[data-testid="attribute-product_tree-full_product_names-0-product_id"] input'
    ).should('be.empty')
    // and filled with the next value after clicking the generate button
    cy.get(
      '[data-testid="product_tree-full_product_names-0-product_id-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-full_product_names-0-product_id"] input'
    ).should('have.value', 'CSAFPID-0003')

    // check if two group IDs are prefilled with sequential values
    cy.get(
      '[data-testid="menu_entry-/product_tree/product_groups-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="attribute-product_tree-product_groups-0-group_id"] input'
    ).should('have.value', 'CSAFGID-0001')
    cy.get(
      '[data-testid="menu_entry-/product_tree/product_groups-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="attribute-product_tree-product_groups-1-group_id"] input'
    ).should('have.value', 'CSAFGID-0002')

    // create new document
    cy.get('[data-testid="new_document_button"]').click()
    cy.get('[data-testid="new_document-templates-select"]').select('Minimal')
    cy.get('[data-testid="new_document-create_document_button"]').click()
    cy.get('[data-testid="alert-confirm_button"]').click()

    // product ID counter should be reset
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/0/product"]'
    ).click()
    cy.get(
      '[data-testid="product_tree-branches-0-product-product_id-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-product-product_id"] input'
    ).should('have.value', 'CSAFPID-0001')

    // group ID counter should be reset
    cy.get(
      '[data-testid="menu_entry-/product_tree/product_groups-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="attribute-product_tree-product_groups-0-group_id"] input'
    ).should('have.value', 'CSAFGID-0001')

    // create new document but cancel
    cy.get('[data-testid="new_document_button"]').click()
    cy.get('[data-testid="new_document-cancel_button"]').click()

    // product ID counter should not be reset
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/1/product"]'
    ).click()
    cy.get(
      '[data-testid="product_tree-branches-1-product-product_id-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-1-product-product_id"] input'
    ).should('have.value', 'CSAFPID-0002')

    // group ID counter should not be reset
    cy.get(
      '[data-testid="menu_entry-/product_tree/product_groups-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="attribute-product_tree-product_groups-1-group_id"] input'
    ).should('have.value', 'CSAFGID-0002')

    // create new document but cancel on confirm
    cy.get('[data-testid="new_document_button"]').click()
    cy.get('[data-testid="new_document-templates-select"]').select('Minimal')
    cy.get('[data-testid="new_document-create_document_button"]').click()
    cy.get('[data-testid="alert-refute_button"]').click()

    // product ID counter should not be reset
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/2/product"]'
    ).click()
    cy.get(
      '[data-testid="product_tree-branches-2-product-product_id-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-2-product-product_id"] input'
    ).should('have.value', 'CSAFPID-0003')

    // group ID counter should be reset
    cy.get(
      '[data-testid="menu_entry-/product_tree/product_groups-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="attribute-product_tree-product_groups-2-group_id"] input'
    ).should('have.value', 'CSAFGID-0003')
  })

  it('fill full product name', function () {
    cy.visit('?tab=EDITOR')

    // check if branch full product name is filled with a generated name
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches-add_item_button"]'
    ).click({ force: true })
    cy.get('[data-testid="product_tree/branches/0-fieldButton"]').click()
    cy.get('[data-testid="attribute-product_tree-branches-0-name"] input')
      .clear()
      .type('Vendor A')
    // now create a sub element
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/0/branches-add_item_button"]'
    ).click({ force: true })
    cy.get(
      '[data-testid="product_tree/branches/0/branches/0-fieldButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-branches-0-name"] input'
    )
      .clear()
      .type('Product ABC')
    // full product name should be empty first
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/0/branches/0/product"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-branches-0-product-name"] input'
    ).should('be.empty')
    // and filled with a value after clicking the generate button
    cy.get(
      '[data-testid="product_tree-branches-0-branches-0-product-name-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-branches-0-product-name"] input'
    ).should('have.value', 'Vendor A Product ABC')
    // just regenerating should be still the same
    cy.get(
      '[data-testid="product_tree-branches-0-branches-0-product-name-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-branches-0-product-name"] input'
    ).should('have.value', 'Vendor A Product ABC')
    // change the value
    cy.get(
      '[data-testid="product_tree/branches/0/branches/0-fieldButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-branches-0-name"] input'
    )
      .clear()
      .type('Product DEF')
    // and regenerate it should recompute the value
    cy.get(
      '[data-testid="menu_entry-/product_tree/branches/0/branches/0/product"]'
    ).click()
    cy.get(
      '[data-testid="product_tree-branches-0-branches-0-product-name-generateButton"]'
    ).click()
    cy.get(
      '[data-testid="attribute-product_tree-branches-0-branches-0-product-name"] input'
    ).should('have.value', 'Vendor A Product DEF')
  })

  describe('fill functions for revision history', function () {
    it('fill date of revision', function () {
      cy.visit('?tab=EDITOR')
      const now = new Date(2020, 1, 1, 10, 30)
      cy.clock(now)

      // create new revision history item
      cy.get('[data-testid="menu_entry-/document/tracking"]').click()
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history/0"]'
      ).click()

      // values should be empty first
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="time"]'
      ).should('be.empty')

      // and filled with a value after clicking the generate button
      cy.get(
        '[data-testid="document-tracking-revision_history-0-date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="time"]'
      ).should('have.value', '11:00')

      // just regenerating should be still the same
      cy.get(
        '[data-testid="document-tracking-revision_history-0-date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="time"]'
      ).should('have.value', '11:00')
    })

    it('fill current release date', function () {
      cy.visit('?tab=EDITOR')

      // input should be empty first
      cy.get('[data-testid="menu_entry-/document/tracking"]').click()
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="time"]'
      ).should('be.empty')

      // generate button should do nothing without revision history entries
      cy.get(
        '[data-testid="document-tracking-current_release_date-generateButton"]'
      )
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="time"]'
      ).should('be.empty')

      // create new revision history item
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history/0"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="date"]'
      ).type('2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="time"]'
      ).type('13:41')

      // current release should still be empty
      cy.get('[data-testid="document/tracking-fieldButton"]').click()
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="time"]'
      ).should('be.empty')

      // generate button should enter correct date and time
      cy.get(
        '[data-testid="document-tracking-current_release_date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="time"]'
      ).should('have.value', '13:41')

      // just regenerating should be still the same
      cy.get(
        '[data-testid="document-tracking-current_release_date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="time"]'
      ).should('have.value', '13:41')
    })

    it('fill initial release date', function () {
      cy.visit('?tab=EDITOR')

      // input should be empty first
      cy.get('[data-testid="menu_entry-/document/tracking"]').click()
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="time"]'
      ).should('be.empty')

      // generate button should do nothing without revision history entries
      cy.get(
        '[data-testid="document-tracking-initial_release_date-generateButton"]'
      )
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="time"]'
      ).should('be.empty')

      // create new revision history item
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history/0"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="date"]'
      ).type('2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="time"]'
      ).type('13:41')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-number"] input'
      )
        .clear()
        .type('1.0.0')

      // current release should still be empty
      cy.get('[data-testid="document/tracking-fieldButton"]').click()
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="date"]'
      ).should('be.empty')
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="time"]'
      ).should('be.empty')

      // generate button should enter correct date and time
      cy.get(
        '[data-testid="document-tracking-initial_release_date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="time"]'
      ).should('have.value', '13:41')

      // just regenerating should be still the same
      cy.get(
        '[data-testid="document-tracking-initial_release_date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="time"]'
      ).should('have.value', '13:41')
    })

    it('fill release dates with more than one revision history entry', function () {
      cy.visit('?tab=EDITOR')

      // create first revision history item
      cy.get('[data-testid="menu_entry-/document/tracking"]').click()
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history/0"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="date"]'
      ).type('2019-12-31')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-date"] input[type="time"]'
      ).type('12:01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-0-number"] input'
      )
        .clear()
        .type('0.9.0')

      // create second revision history item
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history/1"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-1-date"] input[type="date"]'
      ).type('2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-1-date"] input[type="time"]'
      ).type('13:41')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-1-number"] input'
      )
        .clear()
        .type('1.0.0')

      // create third revision history item
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/document/tracking/revision_history/2"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-2-date"] input[type="date"]'
      ).type('2021-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-2-date"] input[type="time"]'
      ).type('13:15')
      cy.get(
        '[data-testid="attribute-document-tracking-revision_history-2-number"] input'
      )
        .clear()
        .type('1.5.0')

      // initial release generate button should enter date and time of version 1.0.0
      cy.get('[data-testid="document/tracking-fieldButton"]').click()
      cy.get(
        '[data-testid="document-tracking-initial_release_date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="date"]'
      ).should('have.value', '2020-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-initial_release_date"] input[type="time"]'
      ).should('have.value', '13:41')

      // current release generate button should enter date and time of version 1.5.0
      cy.get(
        '[data-testid="document-tracking-current_release_date-generateButton"]'
      ).click()
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="date"]'
      ).should('have.value', '2021-02-01')
      cy.get(
        '[data-testid="attribute-document-tracking-current_release_date"] input[type="time"]'
      ).should('have.value', '13:15')
    })
  })

  describe('selects first suggestion in combobox when pressing enter', function () {
    it('CWEAttribute Id', function () {
      cy.visit('?tab=EDITOR')

      // create new vulnerability and select CWE section
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities-add_item_button"]'
      ).click({ force: true })
      cy.get('[data-testid="menu_entry-/vulnerabilities/0/cwe"]').click()

      // enter letter c and press enter
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-id"] input')
        .clear()
        .type('C')
      // wait for popup to show
      cy.get('.shadow-popup')
      // press enter
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-id"] input').type(
        '{enter}'
      )

      // check whether both fields were updated
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-id"] input').should(
        'contain.value',
        'CWE'
      )
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-name"] input')
        .invoke('val')
        .should('not.be.empty')
    })

    it('CWEAttribute Name', function () {
      cy.visit('?tab=EDITOR')

      // create new vulnerability and select CWE section
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities-add_item_button"]'
      ).click({ force: true })
      cy.get('[data-testid="menu_entry-/vulnerabilities/0/cwe"]').click()

      // enter letter c
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-name"] input')
        .clear()
        .type('C')
      // wait for popup to show
      cy.get('.shadow-popup')
      // press enter
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-name"] input').type(
        '{enter}'
      )

      // check whether both fields were updated
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-name"] input')
        .invoke('val')
        .should('have.length.above', 1)
      cy.get('[data-testid="attribute-vulnerabilities-0-cwe-id"] input')
        .invoke('val')
        .should('not.be.empty')
    })

    it('AttributeId', function () {
      cy.visit('?tab=EDITOR')

      // add product
      cy.get(
        '[data-testid="menu_entry-/product_tree/branches-add_item_button"]'
      ).click({ force: true })
      cy.get('[data-testid="attribute-product_tree-branches-0-category"] input')
        .clear()
        .type('architecture')
      cy.get('[data-testid="attribute-product_tree-branches-0-name"] input')
        .clear()
        .type('Test')
      cy.get(
        '[data-testid="menu_entry-/product_tree/branches/0/product"]'
      ).click()
      cy.get(
        '[data-testid="attribute-product_tree-branches-0-product-name"] input'
      )
        .clear()
        .type('Test')
      cy.get(
        '[data-testid="attribute-product_tree-branches-0-product-product_id"] input'
      )
        .clear()
        .type('CSAFPID-0001')

      // create new vulnerability and add product in known affected
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities/0/product_status"]'
      ).click()
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities/0/product_status/known_affected-add_item_button"]'
      ).click({ force: true })

      // enter letter c
      cy.get(
        '[data-testid="attribute-vulnerabilities-0-product_status-known_affected-0"] input'
      )
        .clear()
        .type('C')
      // wait for popup to show
      cy.get('.shadow-popup')
      // press enter
      cy.get(
        '[data-testid="attribute-vulnerabilities-0-product_status-known_affected-0"] input'
      ).type('{enter}')

      // check whether field was updated
      cy.get(
        '[data-testid="attribute-vulnerabilities-0-product_status-known_affected-0"] input'
      ).should('have.value', 'CSAFPID-0001')
    })
  })
})
