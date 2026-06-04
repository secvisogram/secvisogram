import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import { getUserInfo } from '../../fixtures/cmsBackendData.js'

const TOTAL_ADVISORIES = 271
const PAGE_SIZE = 50

/**
 * Builds the full set of mocked advisories the paginated endpoint serves.
 *
 * @returns {Array<object>}
 */
function buildAllAdvisories() {
  return Array.from({ length: TOTAL_ADVISORIES }, (_, index) => {
    const id = `advisory-${String(index).padStart(4, '0')}`
    return {
      advisoryId: id,
      revision: 'rev-1',
      workflowState: 'Draft',
      documentTrackingId: `tracking-${id}`,
      title: `Advisory ${index}`,
      owner: 'editor',
      changeable: false,
      deletable: false,
      canCreateVersion: false,
      allowedStateChanges: [],
      currentReleaseDate: '2024-01-01T00:00:00.000Z',
    }
  })
}

/**
 * Serves a single page of the advisory list per the page envelope.
 * The bookmark encodes the next offset; it is null on the last page.
 *
 * @param {Array<object>} all
 * @param {string | undefined} bookmark
 * @param {number} limit
 */
function pageFor(all, bookmark, limit) {
  const offset = bookmark ? Number(bookmark) : 0
  const slice = all.slice(offset, offset + limit)
  const nextOffset = offset + slice.length
  const hasMore = nextOffset < all.length
  return {
    advisories: slice,
    bookmark: hasMore ? String(nextOffset) : null,
    hasMore,
    limit,
  }
}

describe('SecvisogramPage / DocumentsTab pagination', function () {
  beforeEach(function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig(),
    ).as('wellKnownAppConfig')

    cy.intercept(
      getLoginEnabledConfig().userInfoUrl,
      getUserInfo({
        user: 'editor',
        preferredUsername: 'editor',
        email: '',
        groups: ['editor', 'author'],
      }),
    ).as('apiGetUserInfo')

    const all = buildAllAdvisories()
    cy.intercept({ method: 'GET', url: '/api/v1/advisories*' }, (req) => {
      const limit = Number(req.query.limit) || PAGE_SIZE
      const bookmark =
        typeof req.query.bookmark === 'string' ? req.query.bookmark : undefined
      req.reply(pageFor(all, bookmark, limit))
    }).as('apiGetAdvisories')
  })

  it('loads all advisories across pages via "Load more"', function () {
    cy.visit('?tab=DOCUMENTS')
    cy.wait('@wellKnownAppConfig')
    cy.wait('@apiGetUserInfo')
    cy.wait('@apiGetAdvisories')

    // First page is rendered promptly.
    cy.get('[data-testid$="-list_entry"]').should('have.length', PAGE_SIZE)

    // Click "Load more" until it disappears (last page reached).
    function loadRemaining() {
      cy.get('body').then(($body) => {
        const button = $body.find(
          '[data-testid="advisory-list-load_more_button"]',
        )
        if (button.length === 0) return
        cy.wrap(button).click()
        cy.wait('@apiGetAdvisories')
        loadRemaining()
      })
    }
    loadRemaining()

    // The "Load more" control is gone and every mocked row is rendered.
    cy.get('[data-testid="advisory-list-load_more_button"]').should('not.exist')
    cy.get('[data-testid$="-list_entry"]').should(
      'have.length',
      TOTAL_ADVISORIES,
    )
  })
})
