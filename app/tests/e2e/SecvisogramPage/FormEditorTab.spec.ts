import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
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

/**
 * Shared setup for "reconciles typed CWE values on blur" tests. Installs
 * window.Cypress so the app exposes MONACO_EDITOR, then navigates to EDITOR,
 * selects v2.0, adds a vulnerability and opens the CWE section.
 */
async function setupCweEditor(page: Page) {
  // The app only sets window.MONACO_EDITOR when window.Cypress is truthy
  await page.addInitScript(() => {
    ;(window as any).Cypress = true
  })
  await page.goto('?tab=EDITOR')
  await page.locator('#csafVersionSelect').selectOption('v2.0')

  const addVulnerabilityButton = page.getByTestId(
    'menu_entry-/vulnerabilities-add_item_button',
  )
  // Force the hover-only container into view, click, then restore
  await addVulnerabilityButton
    .locator('..')
    .evaluate((el) => ((el as HTMLElement).style.display = 'flex'))
  await addVulnerabilityButton.click()
  await addVulnerabilityButton
    .locator('..')
    .evaluate((el) => ((el as HTMLElement).style.display = ''))

  await page.getByTestId('menu_entry-/vulnerabilities/0/cwe').click()
}

/**
 * Shared setup for "reconciles typed dropdown values on blur" tests. Installs
 * window.Cypress so the app exposes MONACO_EDITOR, then navigates to EDITOR,
 * adds a vulnerability score, and opens the cvss_v3 section.
 */
async function setupCvssEditor(page: Page) {
  await page.addInitScript(() => {
    ;(window as any).Cypress = true
  })
  await page.goto('?tab=EDITOR')

  const addVulnerabilityButton = page.getByTestId(
    'menu_entry-/vulnerabilities-add_item_button',
  )
  await addVulnerabilityButton
    .locator('..')
    .evaluate((el) => ((el as HTMLElement).style.display = 'flex'))
  await addVulnerabilityButton.click()
  await addVulnerabilityButton
    .locator('..')
    .evaluate((el) => ((el as HTMLElement).style.display = ''))

  await clickHoverButton(
    page.getByTestId('menu_entry-/vulnerabilities/0/scores-add_item_button'),
  )
  await page
    .getByTestId('menu_entry-/vulnerabilities/0/scores/0/cvss_v3')
    .click()
}

/**
 * Clicks a button that is only visible on hover. Playwright's { force: true }
 * still requires a rendered bounding box; hidden hover buttons inside `display:
 * none` containers have none. Using native DOM `.click()` via `evaluate` fires
 * the event directly, bypassing all Playwright actionability checks.
 */
async function clickHoverButton(locator: Locator) {
  await locator.evaluate((el) => (el as HTMLElement).click())
}

test.describe('SecvisogramPage / FormEditor Tab', () => {
  test.describe('can save documents', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        test(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}, canChangeDocument: ${canChangeDocument(user.user)}`, async ({
          page,
          context,
        }) => {
          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
            userName: user.user,
          })

          // Set up all routes before navigating
          await page.route(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            (route) => route.fulfill({ json: getLoginEnabledConfig() }),
          )
          await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
            route.fulfill({ json: getUserInfo(user) }),
          )
          await page.route('/api/v1/advisories', (route) =>
            route.fulfill({ json: getGetAdvisoriesResponse() }),
          )

          // Single handler for both GET (advisory detail) and PATCH (update)
          let capturedPatchBody: any
          await page.route(
            new RegExp(`/api/v1/advisories/${advisory.advisoryId}`),
            async (route) => {
              if (route.request().method() === 'PATCH') {
                capturedPatchBody = route.request().postDataJSON()
                await route.fulfill({
                  status: 200,
                  body: '{}',
                  contentType: 'application/json',
                })
              } else {
                await route.fulfill({ json: advisoryDetail })
              }
            },
          )

          await page.goto('?tab=DOCUMENTS')

          await page
            .getByTestId(
              `advisory-${advisory.advisoryId}-list_entry-open_button`,
            )
            .click()
          await expect(page.getByTestId('loading_indicator')).toBeHidden()
          await expect(page).toHaveURL(/\?tab=EDITOR/)

          await page.getByTestId('menu_entry-/document').click()

          const documentTitle =
            (advisoryDetail.csaf as any).document.title + '-some-more-text'
          await page
            .getByTestId('attribute-document-title')
            .locator('input')
            .clear()
          await page
            .getByTestId('attribute-document-title')
            .locator('input')
            .fill(documentTitle)

          if (canChangeDocument(user.user)) {
            await context.addCookies([
              {
                name: 'XSRF-TOKEN',
                value: 'test-Value-123',
                url: 'http://localhost:8080',
              },
            ])

            await page.getByTestId('save_button').click()

            // check if the input fields are pre-filled with the latest revision history item data
            // for draft documents (version < 1) and if no revision history is given the fields should be empty
            let expectedSummary = ''
            let expectedLegacyVersion = ''
            if (advisory.advisoryId === advisoryIdV1) {
              expectedSummary = latestRevisionHistorySummary
              expectedLegacyVersion = latestRevisionHistoryLegacyVersion
            }

            await expect(
              page.getByTestId('submit_version-summary-textarea'),
            ).toHaveValue(expectedSummary)
            await expect(
              page.getByTestId('submit_version-legacy_version-input'),
            ).toHaveValue(expectedLegacyVersion)

            const summary = 'Summary'
            const legacyVersion = 'Legacy version'
            await page.getByTestId('submit_version-summary-textarea').clear()
            await page
              .getByTestId('submit_version-summary-textarea')
              .fill(summary)
            await page
              .getByTestId('submit_version-legacy_version-input')
              .clear()
            await page
              .getByTestId('submit_version-legacy_version-input')
              .fill(legacyVersion)

            // Set up both response promises before the triggering action
            const patchResponsePromise = page.waitForResponse(
              (r) =>
                r.request().method() === 'PATCH' &&
                r.url().includes(`/api/v1/advisories/${advisory.advisoryId}`),
            )
            const advisoryReloadPromise = page.waitForResponse(
              (r) =>
                r.request().method() === 'GET' &&
                r.url().includes(`/api/v1/advisories/${advisory.advisoryId}`),
            )

            await page.getByTestId('submit_version-submit').click()
            await expect(page.getByTestId('submit_version')).toBeHidden()

            await patchResponsePromise
            expect(capturedPatchBody.csaf.document.title).toEqual(documentTitle)
            expect(capturedPatchBody.summary).toEqual(summary)
            expect(capturedPatchBody.legacyVersion).toEqual(legacyVersion)

            await advisoryReloadPromise
          } else {
            await expect(page.getByTestId('save_button')).toBeHidden()
          }
        })
      }
    }
  })

  test('can display usage help', async ({ page }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )

    await page.goto('?tab=EDITOR')

    await page.getByTestId('document-acknowledgments-infoButton').click()
    await page.getByTestId('sideBar-DOCUMENTATION-button').click()
    const infoPanelContent = page.getByTestId('infoPanel-content')
    await expect(infoPanelContent).toBeAttached()
    await expect(infoPanelContent).toContainText('Acknowledgments - Usage')
  })

  test.describe('can add and remove new array items from object editor', () => {
    test('/product_tree/branches', async ({ page }) => {
      await page.route(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        (route) => route.fulfill({ status: 404, json: {} }),
      )

      await page.goto('?tab=EDITOR')

      await page.getByTestId('menu_entry-/product_tree/branches').click()
      await clickHoverButton(
        page.getByTestId('menu_entry-/product_tree/branches-add_item_button'),
      )
      await expect(
        page.getByTestId('menu_entry-/product_tree/branches/0/branches'),
      ).toHaveClass(/menu_entry-selected/)
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/product_tree/branches/0/branches-add_item_button',
        ),
      )
      await expect(
        page.getByTestId(
          'menu_entry-/product_tree/branches/0/branches/0/branches',
        ),
      ).toHaveClass(/menu_entry-selected/)

      await clickHoverButton(
        page.getByTestId('product_tree-branches-0-deleteButton'),
      )
      await expect(
        page.getByTestId(
          'menu_entry-/product_tree/branches/0/branches/0/branches',
        ),
      ).toBeHidden()
    })
  })

  test('shows fields based on selected level', async ({ page }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )

    await page.goto('?tab=EDITOR')

    // with default category csaf_security_advisory publisher should be displayed
    await page.getByTestId('layer-button-best_practice').click()
    await expect(
      page.getByTestId('menu_entry-/document/publisher'),
    ).toBeAttached()

    // relationships menu should not be displayed for level best_practice
    await expect(
      page.getByTestId('menu_entry-/product_tree/relationships'),
    ).toBeHidden()

    await page.getByTestId('menu_entry-/document').click()

    // the language attribute should not be displayed for level mandatory
    await page.getByTestId('layer-button-mandatory').click()
    await expect(page.getByTestId('attribute-document-lang')).toBeHidden()

    // it should exist for level want_to_have
    await page.getByTestId('layer-button-want_to_have').click()
    await expect(page.getByTestId('attribute-document-lang')).toBeAttached()
  })

  test('hides "Fields" button when no input fields are shown', async ({
    page,
  }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )

    await page.goto('?tab=EDITOR')

    await page.getByTestId('layer-button-optional').click()
    await page.getByTestId('menu_entry-/document/distribution').click()
    await expect(
      page.getByTestId('document/distribution-fieldButton'),
    ).toBeAttached()
    await page.getByTestId('layer-button-want_to_have').click()
    await expect(
      page.getByTestId('document/distribution-fieldButton'),
    ).toBeHidden()
  })

  test('selects the closest relevant path if the selected becomes irrelevant', async ({
    page,
  }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )

    await page.goto('?tab=EDITOR')

    await page.getByTestId('layer-button-optional').click()
    await page.getByTestId('menu_entry-/document/tracking').click()
    await page.getByTestId('menu_entry-/document/tracking/generator').click()
    await page.getByTestId('layer-button-best_practice').click()
    await expect(
      page.getByTestId('menu_entry-/document/tracking/generator/engine'),
    ).toBeHidden()
  })

  test('selects the closest relevant path if the selected becomes irrelevant when deep down', async ({
    page,
  }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ status: 404, json: {} }),
    )

    await page.goto('?tab=EDITOR')

    await page.locator('#csafVersionSelect').selectOption('v2.0')
    await clickHoverButton(
      page.getByTestId('menu_entry-/vulnerabilities-add_item_button'),
    )
    await clickHoverButton(
      page.getByTestId('menu_entry-/vulnerabilities/0/scores-add_item_button'),
    )
    await page
      .getByTestId('menu_entry-/vulnerabilities/0/scores/0/cvss_v3')
      .click()
    await page.getByTestId('layer-button-mandatory').click()
    await expect(
      page.getByTestId('vulnerabilities-0-scores-infoButton'),
    ).toBeHidden()
  })

  test('shows errors in sidebar according to selected path', async ({
    page,
  }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ status: 404, json: {} }),
    )

    await page.goto('?tab=EDITOR')

    await page.locator('#csafVersionSelect').selectOption('v2.1')
    await page.getByTestId('beta_version-confirm_button').click()

    await page.getByTestId('new_document_button').click()
    await page
      .getByTestId('new_document-templates-select')
      .selectOption('MINIMAL')
    await page.getByTestId('new_document-create_document_button').click()

    await page.getByTestId('document-tracking-infoButton').click()

    // there should be 6 error cards (1 warning) under /document/tracking for the default minimal document
    await expect(page.locator('[data-testid="error-cards"] div')).toHaveCount(7)

    await page.getByTestId('menu_entry-/document/tracking').click()
    await page
      .getByTestId('attribute-document-tracking-version')
      .locator('input')
      .clear()
    await page
      .getByTestId('attribute-document-tracking-version')
      .locator('input')
      .fill('doesNotMatchRegex')
    await page.getByTestId('document-tracking-version-infoButton').click()

    // there should be one error card for /document/tracking/version when it does not match the expected regex
    const errorCards = page.locator('[data-testid="error-cards"] div')
    await expect(errorCards).toHaveCount(1)
    await expect(errorCards).toHaveClass(/border-red-800/)
    await expect(
      page.getByTestId('error_card-/document/tracking/version-0'),
    ).toBeAttached()
  })

  test('enable fields that should be editable when not logged in', async ({
    page,
  }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )

    await page.goto('?tab=EDITOR')

    await page.getByTestId('layer-button-optional').click()
    await page.getByTestId('menu_entry-/document/tracking').click()
    await page.getByTestId('menu_entry-/document/tracking/generator').click()
    await page
      .getByTestId('menu_entry-/document/tracking/generator/engine')
      .click()
    await expect(
      page
        .getByTestId('attribute-document-tracking-generator-engine-name')
        .locator('input'),
    ).not.toBeDisabled()
  })

  test.describe('disable fields that should not be editable when logged in', () => {
    for (const user of getUsers()) {
      test(`user: ${user.preferredUsername}`, async ({ page }) => {
        await page.route(
          '/.well-known/appspecific/de.bsi.secvisogram.json',
          (route) => route.fulfill({ json: getLoginEnabledConfig() }),
        )
        await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
          route.fulfill({ json: getUserInfo(user) }),
        )

        await page.goto('?tab=EDITOR')

        await page.getByTestId('layer-button-optional').click()
        await page.getByTestId('menu_entry-/document/tracking').click()
        await page
          .getByTestId('menu_entry-/document/tracking/generator')
          .click()
        await page
          .getByTestId('menu_entry-/document/tracking/generator/engine')
          .click()
        await expect(
          page
            .getByTestId('attribute-document-tracking-generator-engine-name')
            .locator('input'),
        ).toBeDisabled()
      })
    }
  })

  test.describe('correctly display errors when adding and deleting elements from arrays', () => {
    for (const user of getUsers()) {
      test(`user: ${user.preferredUsername}`, async ({ page }) => {
        await page.route(
          '/.well-known/appspecific/de.bsi.secvisogram.json',
          (route) => route.fulfill({ json: getLoginEnabledConfig() }),
        )
        await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
          route.fulfill({ json: getUserInfo(user) }),
        )

        await page.goto('?tab=EDITOR')

        await expect(
          page.locator(
            '[data-testid="error_indicator-object/vulnerabilities"] svg',
          ),
        ).toHaveClass(/text-green-600/)
        await clickHoverButton(
          page.getByTestId('menu_entry-/vulnerabilities-add_item_button'),
        )
        await expect(
          page.locator(
            '[data-testid="error_indicator-object/vulnerabilities"] svg',
          ),
        ).toHaveClass(/text-red-600/)
        await clickHoverButton(
          page.getByTestId('vulnerabilities-0-deleteButton'),
        )
        await expect(
          page.locator(
            '[data-testid="error_indicator-object/vulnerabilities"] svg',
          ),
        ).toHaveClass(/text-green-600/)
      })
    }
  })

  test('prefills product and group IDs', async ({ page }) => {
    await page.goto('?tab=EDITOR')

    // set relevance level to optional to enable editing groups
    await page.getByTestId('layer-button-optional').click()

    // check if branch full product name is filled with a generated product ID
    await clickHoverButton(
      page.getByTestId('menu_entry-/product_tree/branches-add_item_button'),
    )
    await page
      .getByTestId('menu_entry-/product_tree/branches/0/product')
      .click()
    // should be empty first
    await expect(
      page
        .getByTestId('attribute-product_tree-branches-0-product-product_id')
        .locator('input'),
    ).toHaveValue('')
    // and filled with a value after clicking the generate button
    await page
      .getByTestId('product_tree-branches-0-product-product_id-generateButton')
      .click()
    await expect(
      page
        .getByTestId('attribute-product_tree-branches-0-product-product_id')
        .locator('input'),
    ).toHaveValue('CSAFPID-0001')

    // check if a new relationship gets assigned the next generated product ID
    await page.getByTestId('layer-button-optional').click()
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/relationships-add_item_button',
      ),
    )
    await page
      .getByTestId('menu_entry-/product_tree/relationships/0/full_product_name')
      .click()
    // should be empty first
    await expect(
      page
        .getByTestId(
          'attribute-product_tree-relationships-0-full_product_name-product_id',
        )
        .locator('input'),
    ).toHaveValue('')
    // and filled with the next value after clicking the generate button
    await page
      .getByTestId(
        'product_tree-relationships-0-full_product_name-product_id-generateButton',
      )
      .click()
    await expect(
      page
        .getByTestId(
          'attribute-product_tree-relationships-0-full_product_name-product_id',
        )
        .locator('input'),
    ).toHaveValue('CSAFPID-0002')

    // check if a full product name gets assigned the next generated product ID
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/full_product_names-add_item_button',
      ),
    )
    // should be empty first
    await expect(
      page
        .getByTestId('attribute-product_tree-full_product_names-0-product_id')
        .locator('input'),
    ).toHaveValue('')
    // and filled with the next value after clicking the generate button
    await page
      .getByTestId(
        'product_tree-full_product_names-0-product_id-generateButton',
      )
      .click()
    await expect(
      page
        .getByTestId('attribute-product_tree-full_product_names-0-product_id')
        .locator('input'),
    ).toHaveValue('CSAFPID-0003')

    // check if two group IDs are prefilled with sequential values
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/product_groups-add_item_button',
      ),
    )
    await expect(
      page
        .getByTestId('attribute-product_tree-product_groups-0-group_id')
        .locator('input'),
    ).toHaveValue('CSAFGID-0001')
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/product_groups-add_item_button',
      ),
    )
    await expect(
      page
        .getByTestId('attribute-product_tree-product_groups-1-group_id')
        .locator('input'),
    ).toHaveValue('CSAFGID-0002')

    // create new document
    await page.getByTestId('new_document_button').click()
    await page
      .getByTestId('new_document-templates-select')
      .selectOption('Minimal')
    await page.getByTestId('new_document-create_document_button').click()
    await page.getByTestId('alert-confirm_button').click()

    // product ID counter should be reset
    await clickHoverButton(
      page.getByTestId('menu_entry-/product_tree/branches-add_item_button'),
    )
    await page
      .getByTestId('menu_entry-/product_tree/branches/0/product')
      .click()
    await page
      .getByTestId('product_tree-branches-0-product-product_id-generateButton')
      .click()
    await expect(
      page
        .getByTestId('attribute-product_tree-branches-0-product-product_id')
        .locator('input'),
    ).toHaveValue('CSAFPID-0001')

    // group ID counter should be reset
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/product_groups-add_item_button',
      ),
    )
    await expect(
      page
        .getByTestId('attribute-product_tree-product_groups-0-group_id')
        .locator('input'),
    ).toHaveValue('CSAFGID-0001')

    // create new document but cancel
    await page.getByTestId('new_document_button').click()
    await page.getByTestId('new_document-cancel_button').click()

    // product ID counter should not be reset
    await clickHoverButton(
      page.getByTestId('menu_entry-/product_tree/branches-add_item_button'),
    )
    await page
      .getByTestId('menu_entry-/product_tree/branches/1/product')
      .click()
    await page
      .getByTestId('product_tree-branches-1-product-product_id-generateButton')
      .click()
    await expect(
      page
        .getByTestId('attribute-product_tree-branches-1-product-product_id')
        .locator('input'),
    ).toHaveValue('CSAFPID-0002')

    // group ID counter should not be reset
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/product_groups-add_item_button',
      ),
    )
    await expect(
      page
        .getByTestId('attribute-product_tree-product_groups-1-group_id')
        .locator('input'),
    ).toHaveValue('CSAFGID-0002')

    // create new document but cancel on confirm
    await page.getByTestId('new_document_button').click()
    await page
      .getByTestId('new_document-templates-select')
      .selectOption('Minimal')
    await page.getByTestId('new_document-create_document_button').click()
    await page.getByTestId('alert-refute_button').click()

    // product ID counter should not be reset
    await clickHoverButton(
      page.getByTestId('menu_entry-/product_tree/branches-add_item_button'),
    )
    await page
      .getByTestId('menu_entry-/product_tree/branches/2/product')
      .click()
    await page
      .getByTestId('product_tree-branches-2-product-product_id-generateButton')
      .click()
    await expect(
      page
        .getByTestId('attribute-product_tree-branches-2-product-product_id')
        .locator('input'),
    ).toHaveValue('CSAFPID-0003')

    // group ID counter should be reset
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/product_groups-add_item_button',
      ),
    )
    await expect(
      page
        .getByTestId('attribute-product_tree-product_groups-2-group_id')
        .locator('input'),
    ).toHaveValue('CSAFGID-0003')
  })

  test('fill full product name', async ({ page }) => {
    await page.goto('?tab=EDITOR')
    await page.locator('#csafVersionSelect').selectOption('v2.0')

    // check if branch full product name is filled with a generated name
    await expect(
      page.getByTestId('menu_entry-/product_tree/branches-hover_menu_button'),
    ).toBeVisible()

    // Force the hover-only container into view, click, then restore
    const addBranchButton = page.getByTestId(
      'menu_entry-/product_tree/branches-add_item_button',
    )
    await addBranchButton
      .locator('..')
      .evaluate((el) => ((el as HTMLElement).style.display = 'flex'))
    await addBranchButton.click()
    await addBranchButton
      .locator('..')
      .evaluate((el) => ((el as HTMLElement).style.display = ''))

    await page.getByTestId('product_tree/branches/0-fieldButton').click()
    await page
      .getByTestId('attribute-product_tree-branches-0-name')
      .locator('input')
      .clear()
    await page
      .getByTestId('attribute-product_tree-branches-0-name')
      .locator('input')
      .fill('Vendor A')

    // now create a sub element
    await clickHoverButton(
      page.getByTestId(
        'menu_entry-/product_tree/branches/0/branches-add_item_button',
      ),
    )
    await page
      .getByTestId('product_tree/branches/0/branches/0-fieldButton')
      .click()
    await page
      .getByTestId('attribute-product_tree-branches-0-branches-0-name')
      .locator('input')
      .clear()
    await page
      .getByTestId('attribute-product_tree-branches-0-branches-0-name')
      .locator('input')
      .fill('Product ABC')

    // full product name should be empty first
    await page
      .getByTestId('menu_entry-/product_tree/branches/0/branches/0/product')
      .click()
    await expect(
      page
        .getByTestId(
          'attribute-product_tree-branches-0-branches-0-product-name',
        )
        .locator('input'),
    ).toHaveValue('')

    // and filled with a value after clicking the generate button
    await page
      .getByTestId(
        'product_tree-branches-0-branches-0-product-name-generateButton',
      )
      .click()
    await expect(
      page
        .getByTestId(
          'attribute-product_tree-branches-0-branches-0-product-name',
        )
        .locator('input'),
    ).toHaveValue('Vendor A Product ABC')

    // just regenerating should be still the same
    await page
      .getByTestId(
        'product_tree-branches-0-branches-0-product-name-generateButton',
      )
      .click()
    await expect(
      page
        .getByTestId(
          'attribute-product_tree-branches-0-branches-0-product-name',
        )
        .locator('input'),
    ).toHaveValue('Vendor A Product ABC')

    // change the value
    await page
      .getByTestId('product_tree/branches/0/branches/0-fieldButton')
      .click()
    await page
      .getByTestId('attribute-product_tree-branches-0-branches-0-name')
      .locator('input')
      .clear()
    await page
      .getByTestId('attribute-product_tree-branches-0-branches-0-name')
      .locator('input')
      .fill('Product DEF')

    // and regenerate: it should recompute the value
    await page
      .getByTestId('menu_entry-/product_tree/branches/0/branches/0/product')
      .click()
    await page
      .getByTestId(
        'product_tree-branches-0-branches-0-product-name-generateButton',
      )
      .click()
    await expect(
      page
        .getByTestId(
          'attribute-product_tree-branches-0-branches-0-product-name',
        )
        .locator('input'),
    ).toHaveValue('Vendor A Product DEF')
  })

  test.describe('fill functions for revision history', () => {
    test('fill date of revision', async ({ page }) => {
      // page.clock.install must come before page.goto to freeze time for the page
      await page.clock.install({ time: new Date(2020, 1, 1, 10, 30) })
      await page.goto('?tab=EDITOR')

      // create new revision history item
      await page.getByTestId('menu_entry-/document/tracking').click()
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/document/tracking/revision_history-add_item_button',
        ),
      )
      await page
        .getByTestId('menu_entry-/document/tracking/revision_history/0')
        .click()

      // values should be empty first
      await expect(
        page
          .getByTestId('attribute-document-tracking-revision_history-0-date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-revision_history-0-date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // and filled with a value after clicking the generate button
      await page
        .getByTestId('document-tracking-revision_history-0-date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-revision_history-0-date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-revision_history-0-date')
          .locator('input[type="time"]'),
      ).toHaveValue('11:00')

      // just regenerating should be still the same
      await page
        .getByTestId('document-tracking-revision_history-0-date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-revision_history-0-date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-revision_history-0-date')
          .locator('input[type="time"]'),
      ).toHaveValue('11:00')
    })

    test('fill current release date', async ({ page }) => {
      await page.goto('?tab=EDITOR')

      // input should be empty first
      await page.getByTestId('menu_entry-/document/tracking').click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // generate button should do nothing without revision history entries
      await page.getByTestId(
        'document-tracking-current_release_date-generateButton',
      )
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // create new revision history item
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/document/tracking/revision_history-add_item_button',
        ),
      )
      await page
        .getByTestId('menu_entry-/document/tracking/revision_history/0')
        .click()
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-date')
        .locator('input[type="date"]')
        .fill('2020-02-01')
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-date')
        .locator('input[type="time"]')
        .fill('13:41')

      // current release should still be empty
      await page.getByTestId('document/tracking-fieldButton').click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // generate button should enter correct date and time
      await page
        .getByTestId('document-tracking-current_release_date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('13:41')

      // just regenerating should be still the same
      await page
        .getByTestId('document-tracking-current_release_date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('13:41')
    })

    test('fill initial release date', async ({ page }) => {
      await page.goto('?tab=EDITOR')

      // input should be empty first
      await page.getByTestId('menu_entry-/document/tracking').click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // generate button should do nothing without revision history entries
      await page.getByTestId(
        'document-tracking-initial_release_date-generateButton',
      )
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // create new revision history item
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/document/tracking/revision_history-add_item_button',
        ),
      )
      await page
        .getByTestId('menu_entry-/document/tracking/revision_history/0')
        .click()
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-date')
        .locator('input[type="date"]')
        .fill('2020-02-01')
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-date')
        .locator('input[type="time"]')
        .fill('13:41')
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-number')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-number')
        .locator('input')
        .fill('1.0.0')

      // current release should still be empty
      await page.getByTestId('document/tracking-fieldButton').click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('')
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('')

      // generate button should enter correct date and time
      await page
        .getByTestId('document-tracking-initial_release_date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('13:41')

      // just regenerating should be still the same
      await page
        .getByTestId('document-tracking-initial_release_date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('13:41')
    })

    test('fill release dates with more than one revision history entry', async ({
      page,
    }) => {
      await page.goto('?tab=EDITOR')

      // create first revision history item
      await page.getByTestId('menu_entry-/document/tracking').click()
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/document/tracking/revision_history-add_item_button',
        ),
      )
      await page
        .getByTestId('menu_entry-/document/tracking/revision_history/0')
        .click()
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-date')
        .locator('input[type="date"]')
        .fill('2019-12-31')
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-date')
        .locator('input[type="time"]')
        .fill('12:01')
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-number')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-document-tracking-revision_history-0-number')
        .locator('input')
        .fill('0.9.0')

      // create second revision history item
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/document/tracking/revision_history-add_item_button',
        ),
      )
      await page
        .getByTestId('menu_entry-/document/tracking/revision_history/1')
        .click()
      await page
        .getByTestId('attribute-document-tracking-revision_history-1-date')
        .locator('input[type="date"]')
        .fill('2020-02-01')
      await page
        .getByTestId('attribute-document-tracking-revision_history-1-date')
        .locator('input[type="time"]')
        .fill('13:41')
      await page
        .getByTestId('attribute-document-tracking-revision_history-1-number')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-document-tracking-revision_history-1-number')
        .locator('input')
        .fill('1.0.0')

      // create third revision history item
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/document/tracking/revision_history-add_item_button',
        ),
      )
      await page
        .getByTestId('menu_entry-/document/tracking/revision_history/2')
        .click()
      await page
        .getByTestId('attribute-document-tracking-revision_history-2-date')
        .locator('input[type="date"]')
        .fill('2021-02-01')
      await page
        .getByTestId('attribute-document-tracking-revision_history-2-date')
        .locator('input[type="time"]')
        .fill('13:15')
      await page
        .getByTestId('attribute-document-tracking-revision_history-2-number')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-document-tracking-revision_history-2-number')
        .locator('input')
        .fill('1.5.0')

      // initial release generate button should enter date and time of version 1.0.0
      await page.getByTestId('document/tracking-fieldButton').click()
      await page
        .getByTestId('document-tracking-initial_release_date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('2020-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-initial_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('13:41')

      // current release generate button should enter date and time of version 1.5.0
      await page
        .getByTestId('document-tracking-current_release_date-generateButton')
        .click()
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="date"]'),
      ).toHaveValue('2021-02-01')
      await expect(
        page
          .getByTestId('attribute-document-tracking-current_release_date')
          .locator('input[type="time"]'),
      ).toHaveValue('13:15')
    })
  })

  test.describe('selects first suggestion in combobox when pressing enter', () => {
    test('CWEAttribute Id', async ({ page }) => {
      await page.goto('?tab=EDITOR')
      await page.locator('#csafVersionSelect').selectOption('v2.0')

      // create new vulnerability and select CWE section
      const addVulnerabilityButton = page.getByTestId(
        'menu_entry-/vulnerabilities-add_item_button',
      )
      await addVulnerabilityButton
        .locator('..')
        .evaluate((el) => ((el as HTMLElement).style.display = 'flex'))
      await addVulnerabilityButton.click()
      await addVulnerabilityButton
        .locator('..')
        .evaluate((el) => ((el as HTMLElement).style.display = ''))
      await page.getByTestId('menu_entry-/vulnerabilities/0/cwe').click()

      // enter letter C and wait for autocomplete popup
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .pressSequentially('C')
      // wait for popup to show
      await expect(page.locator('.autocomplete.Mui-expanded')).toBeVisible()
      // press enter to select first suggestion
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .press('Enter')

      // check whether both fields were updated
      await expect(
        page.getByTestId('attribute-vulnerabilities-0-cwe-id').locator('input'),
      ).toHaveValue(/CWE/)
      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-cwe-name')
          .locator('input'),
      ).not.toHaveValue('')
    })

    test('CWEAttribute Name', async ({ page }) => {
      await page.goto('?tab=EDITOR')
      await page.locator('#csafVersionSelect').selectOption('v2.0')

      // create new vulnerability and select CWE section
      const addVulnerabilityButton = page.getByTestId(
        'menu_entry-/vulnerabilities-add_item_button',
      )
      await addVulnerabilityButton
        .locator('..')
        .evaluate((el) => ((el as HTMLElement).style.display = 'flex'))
      await addVulnerabilityButton.click()
      await addVulnerabilityButton
        .locator('..')
        .evaluate((el) => ((el as HTMLElement).style.display = ''))
      await page.getByTestId('menu_entry-/vulnerabilities/0/cwe').click()

      // enter letter C and wait for autocomplete popup
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .pressSequentially('C')
      // wait for popup to show
      await expect(page.locator('.autocomplete.Mui-expanded')).toBeVisible()
      // press enter to select first suggestion
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .press('Enter')

      // check whether both fields were updated
      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-cwe-name')
          .locator('input'),
      ).not.toHaveValue('')
      const nameValue = await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .inputValue()
      expect(nameValue.length).toBeGreaterThan(1)
      await expect(
        page.getByTestId('attribute-vulnerabilities-0-cwe-id').locator('input'),
      ).not.toHaveValue('')
    })

    test('AttributeId', async ({ page }) => {
      await page.goto('?tab=EDITOR')
      await page.locator('#csafVersionSelect').selectOption('v2.0')

      // add product
      const addBranchButton = page.getByTestId(
        'menu_entry-/product_tree/branches-add_item_button',
      )
      await addBranchButton
        .locator('..')
        .evaluate((el) => ((el as HTMLElement).style.display = 'flex'))
      await addBranchButton.click()
      await addBranchButton
        .locator('..')
        .evaluate((el) => ((el as HTMLElement).style.display = ''))

      await page
        .getByTestId('attribute-product_tree-branches-0-category')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-product_tree-branches-0-category')
        .locator('input')
        .fill('architecture')
      await page
        .getByTestId('attribute-product_tree-branches-0-name')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-product_tree-branches-0-name')
        .locator('input')
        .fill('Test')
      await page
        .getByTestId('menu_entry-/product_tree/branches/0/product')
        .click()
      await page
        .getByTestId('attribute-product_tree-branches-0-product-name')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-product_tree-branches-0-product-name')
        .locator('input')
        .fill('Test')
      await page
        .getByTestId('attribute-product_tree-branches-0-product-product_id')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-product_tree-branches-0-product-product_id')
        .locator('input')
        .fill('CSAFPID-0001')

      // create new vulnerability and add product in known affected
      await clickHoverButton(
        page.getByTestId('menu_entry-/vulnerabilities-add_item_button'),
      )
      await page
        .getByTestId('menu_entry-/vulnerabilities/0/product_status')
        .click()
      await clickHoverButton(
        page.getByTestId(
          'menu_entry-/vulnerabilities/0/product_status/known_affected-add_item_button',
        ),
      )

      // enter letter C and wait for autocomplete popup
      await page
        .getByTestId(
          'attribute-vulnerabilities-0-product_status-known_affected-0',
        )
        .locator('input')
        .clear()
      await page
        .getByTestId(
          'attribute-vulnerabilities-0-product_status-known_affected-0',
        )
        .locator('input')
        .pressSequentially('C')
      // wait for popup to show
      await expect(page.locator('.autocomplete')).toBeVisible()
      // press enter to select first suggestion
      await page
        .getByTestId(
          'attribute-vulnerabilities-0-product_status-known_affected-0',
        )
        .locator('input')
        .press('Enter')

      // check whether field was updated
      await expect(
        page
          .getByTestId(
            'attribute-vulnerabilities-0-product_status-known_affected-0',
          )
          .locator('input'),
      ).toHaveValue('CSAFPID-0001')
    })
  })

  test.describe('reconciles typed CWE values on blur', () => {
    test('commits a valid typed CWE id on blur and keeps JSON in sync', async ({
      page,
    }) => {
      const expectedId = 'CWE-79'

      await setupCweEditor(page)

      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .fill(expectedId)
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .blur()

      await expect(
        page.getByTestId('attribute-vulnerabilities-0-cwe-id').locator('input'),
      ).toHaveValue(expectedId)

      const expectedName = await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .inputValue()
      expect(expectedName).not.toBe('')

      // typing an invalid CWE id and blurring should revert to the last valid value
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .fill('CWE-0000')
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .blur()

      await expect(
        page.getByTestId('attribute-vulnerabilities-0-cwe-id').locator('input'),
      ).toHaveValue(expectedId)
      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-cwe-name')
          .locator('input'),
      ).toHaveValue(expectedName)

      // verify Monaco editor is in sync
      await page.getByTestId('tab_button-SOURCE').click()
      await page.waitForFunction(
        () => (window as any).MONACO_EDITOR !== undefined,
      )
      const doc = await page.evaluate(() =>
        JSON.parse((window as any).MONACO_EDITOR.getModel().getValue()),
      )
      expect(doc.vulnerabilities?.[0]?.cwe?.id).toEqual(expectedId)
      expect(doc.vulnerabilities?.[0]?.cwe?.name).toEqual(expectedName)
    })

    test('commits a valid typed CWE name on blur and reverts invalid typed name', async ({
      page,
    }) => {
      const expectedId = 'CWE-79'

      await setupCweEditor(page)

      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .fill(expectedId)
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-id')
        .locator('input')
        .blur()

      const expectedName = await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .inputValue()
      expect(expectedName).not.toBe('')

      // typing the same valid name and blurring should keep it
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .fill(expectedName)
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .blur()

      await expect(
        page.getByTestId('attribute-vulnerabilities-0-cwe-id').locator('input'),
      ).toHaveValue(expectedId)
      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-cwe-name')
          .locator('input'),
      ).toHaveValue(expectedName)

      // typing an invalid name and blurring should revert to last valid name
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .fill('This is not a CWE name')
      await page
        .getByTestId('attribute-vulnerabilities-0-cwe-name')
        .locator('input')
        .blur()

      await expect(
        page.getByTestId('attribute-vulnerabilities-0-cwe-id').locator('input'),
      ).toHaveValue(expectedId)
      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-cwe-name')
          .locator('input'),
      ).toHaveValue(expectedName)

      // verify Monaco editor is in sync
      await page.getByTestId('tab_button-SOURCE').click()
      await page.waitForFunction(
        () => (window as any).MONACO_EDITOR !== undefined,
      )
      const doc = await page.evaluate(() =>
        JSON.parse((window as any).MONACO_EDITOR.getModel().getValue()),
      )
      expect(doc.vulnerabilities?.[0]?.cwe?.id).toEqual(expectedId)
      expect(doc.vulnerabilities?.[0]?.cwe?.name).toEqual(expectedName)
    })
  })

  test.describe('reconciles typed dropdown values on blur', () => {
    test('keeps enum dropdown value and JSON consistent when typed value is invalid on blur', async ({
      page,
    }) => {
      const expectedVersion = '3.1'

      await setupCvssEditor(page)

      await page
        .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
        .locator('input')
        .fill(expectedVersion)
      await page
        .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
        .locator('input')
        .blur()

      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
          .locator('input'),
      ).toHaveValue(expectedVersion)

      // typing an invalid enum value and blurring should revert
      await page
        .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
        .locator('input')
        .clear()
      await page
        .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
        .locator('input')
        .fill('4.0')
      await page
        .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
        .locator('input')
        .blur()

      await expect(
        page
          .getByTestId('attribute-vulnerabilities-0-scores-0-cvss_v3-version')
          .locator('input'),
      ).toHaveValue(expectedVersion)

      // verify Monaco editor is in sync
      await page.getByTestId('tab_button-SOURCE').click()
      await page.waitForFunction(
        () => (window as any).MONACO_EDITOR !== undefined,
      )
      const doc = await page.evaluate(() =>
        JSON.parse((window as any).MONACO_EDITOR.getModel().getValue()),
      )
      expect(doc.vulnerabilities?.[0]?.scores?.[0]?.cvss_v3?.version).toEqual(
        expectedVersion,
      )
    })
  })
})
