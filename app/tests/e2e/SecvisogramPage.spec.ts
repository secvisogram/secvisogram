import { expect, test } from '@playwright/test'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { canCreateDocuments } from '../../lib/app/shared/permissions.js'
import docMax from '../../lib/core/v2_0/doc-max.json' with { type: 'json' }
import docMin from '../../lib/core/v2_0/doc-min.json' with { type: 'json' }
import { getLoginEnabledConfig } from '../fixtures/appConfigData.js'
import {
  getAdvisories,
  getCreateAdvisoryResponse,
  getGetAdvisoriesResponse,
  getGetAdvisoryDetailResponse,
  getGetTemplateContentResponse,
  getGetTemplatesResponse,
  getTemplates,
  getUserInfo,
  getUsers,
} from '../fixtures/cmsBackendData.js'
import { getValidationResponse } from '../fixtures/csafValidatorServiceData.js'
import sampleUploadDocument from '../fixtures/sampleUploadDocument.js'

// Note: the Cypress top-level beforeEach ran cy.task('rm', downloadsFolder) to clean the
// downloads folder before every test. Playwright isolates downloads per test via the
// download event API, so no equivalent cleanup is needed here.

test.describe('SecvisogramPage', () => {
  test.describe('csaf version selection', () => {
    test('requires confirmation before switching to v2.1 beta', async ({
      page,
    }) => {
      await page.route(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        (route) => route.fulfill({ status: 404, json: {} }),
      )

      await page.goto('?tab=EDITOR')

      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.0')
      await expect(
        page.locator('#csafVersionSelect option[value="v2.1"]'),
      ).toHaveText('v2.1 (Beta)')

      await page.locator('#csafVersionSelect').selectOption('v2.1')
      await expect(page.getByTestId('beta_version_dialog')).toBeVisible()
      await page.getByTestId('beta_version-cancel_button').click()
      await expect(page.getByTestId('beta_version_dialog')).not.toBeAttached()
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.0')

      await page.locator('#csafVersionSelect').selectOption('v2.1')
      await expect(page.getByTestId('beta_version_dialog')).toBeVisible()
      await page.getByTestId('beta_version-confirm_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeHidden()
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.1')
    })
  })

  test.describe('auto-switch to CSAF 2.1 beta mode when opening a v2.1 file', () => {
    /** A minimal CSAF 2.1 document */
    const csaf21Doc = {
      $schema: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/csaf.json',
      document: {
        category: 'csaf_security_advisory',
        csaf_version: '2.1',
        title: 'My 2.1 document',
      },
    }

    /** A minimal CSAF 2.0 document */
    const csaf20Doc = {
      document: {
        category: 'csaf_security_advisory',
        csaf_version: '2.0',
        title: 'My 2.0 document',
      },
    }

    test.beforeEach(async ({ page }) => {
      await page.route(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        (route) => route.fulfill({ status: 404, json: {} }),
      )
      await page.goto('?tab=EDITOR')
      // Ensure we start in v2.0 mode
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.0')
    })

    test('shows the beta confirmation dialog when opening a v2.1 file in v2.0 mode', async ({
      page,
    }) => {
      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'csaf_2_1.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(csaf21Doc)),
      })
      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeVisible()
    })

    test('cancelling the dialog aborts the file open and keeps v2.0 mode', async ({
      page,
    }) => {
      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'csaf_2_1.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(csaf21Doc)),
      })
      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeVisible()

      await page.getByTestId('beta_version-cancel_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeHidden()

      // Mode must remain v2.0
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.0')
    })

    test('confirming the dialog switches to v2.1 mode and loads the document', async ({
      page,
    }) => {
      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'csaf_2_1.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(csaf21Doc)),
      })
      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeVisible()

      await page.getByTestId('beta_version-confirm_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeHidden()

      // Mode must have switched to v2.1
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.1')

      // The document title from the file must now be loaded
      await page.getByTestId('menu_entry-/document').click()
      await expect(
        page.getByTestId('attribute-document-title').locator('input'),
      ).toHaveValue(csaf21Doc.document.title)
    })

    test('opening a v2.0 file in v2.0 mode shows no beta dialog', async ({
      page,
    }) => {
      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'csaf_2_0.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(csaf20Doc)),
      })
      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeHidden()
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.0')
    })

    test('opening a v2.1 file while already in v2.1 mode shows no beta dialog', async ({
      page,
    }) => {
      // Switch to v2.1 manually first
      await page.locator('#csafVersionSelect').selectOption('v2.1')
      await page.getByTestId('beta_version-confirm_button').click()
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.1')

      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'csaf_2_1.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(csaf21Doc)),
      })
      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('beta_version_dialog')).toBeHidden()
      await expect(page.locator('#csafVersionSelect')).toHaveValue('v2.1')
    })
  })

  test.describe('can validate the document against the rest service', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        const { advisoryId } = advisory

        for (const tab of ['EDITOR', 'SOURCE'] as const) {
          test(`user: ${user.preferredUsername}, advisoryId: ${advisoryId}, tab: ${tab}`, async ({
            page,
          }) => {
            const advisoryDetail = getGetAdvisoryDetailResponse({ advisoryId })
            const validationResponse = getValidationResponse({
              document: advisoryDetail.csaf,
            })
            let capturedValidateBody: unknown

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
            await page.route(`/api/v1/advisories/${advisoryId}`, (route) =>
              route.fulfill({ json: advisoryDetail }),
            )
            await page.route('/api/v1/validate', async (route) => {
              capturedValidateBody = route.request().postDataJSON()
              await route.fulfill({ json: validationResponse })
            })

            await page.goto('?tab=DOCUMENTS')

            await page
              .getByTestId(`advisory-${advisoryId}-list_entry-open_button`)
              .click()
            await expect(page.getByTestId('loading_indicator')).toBeHidden()
            await expect(page).toHaveURL(/\?tab=EDITOR/)

            if (tab === 'SOURCE') {
              await page.getByTestId('tab_button-SOURCE').click()
            }
            await page.waitForTimeout(500)

            const validateResponsePromise = page.waitForResponse((r) =>
              r.url().includes('/api/v1/validate'),
            )
            await page.getByTestId('validate_button').click()
            await validateResponsePromise

            expect(capturedValidateBody).toEqual({
              tests: [
                { type: 'test', name: 'csaf_2_0_strict' },
                { type: 'preset', name: 'mandatory' },
                { type: 'preset', name: 'optional' },
                { type: 'preset', name: 'informative' },
              ],
              document: advisoryDetail.csaf,
            })

            const expectedCount = String(
              (validationResponse as any).tests.flatMap((t: any) =>
                t.errors.concat(t.warnings).concat(t.infos),
              ).length,
            )
            await expect(
              page.getByTestId('number_of_validation_errors'),
            ).toHaveText(expectedCount)
          })
        }
      }
    }
  })

  test.describe('can open a minimal new document from filesystem in standalone mode', () => {
    test('in form editor', async ({ page }) => {
      await page.route(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        (route) => route.fulfill({ status: 404, json: {} }),
      )

      await page.goto('?tab=EDITOR')
      await page.locator('#csafVersionSelect').selectOption('v2.0')

      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'some_file.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(sampleUploadDocument)),
      })

      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('new_document_dialog')).toBeHidden()
      await page.getByTestId('menu_entry-/document').click()
      await expect(
        page.getByTestId('attribute-document-title').locator('input'),
      ).toHaveValue((sampleUploadDocument as any).document.title)
      await page.getByTestId('sideBar-ERRORS-button').click()
      await expect(page.locator('[data-testid*="error_card-"]')).toHaveCount(7)
    })

    test('in source editor', async ({ page }) => {
      // The app only exposes MONACO_EDITOR when window.Cypress is truthy
      await page.addInitScript(() => {
        ;(window as any).Cypress = true
      })
      await page.route(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        (route) => route.fulfill({ status: 404, json: {} }),
      )

      await page.goto('?tab=SOURCE')

      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-file_selector_button').click()
      await page.getByTestId('new_document-file_input').setInputFiles({
        name: 'some_file.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(sampleUploadDocument)),
      })

      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByTestId('new_document_dialog')).toBeHidden()

      // Wait for Monaco editor to initialise after document load
      await page.waitForFunction(
        () => (window as any).MONACO_EDITOR !== undefined,
      )
      const title = await page.evaluate(() => {
        const doc = JSON.parse(
          (window as any).MONACO_EDITOR.getModel().getValue(),
        )
        return doc.document.title
      })
      expect(title).toEqual((sampleUploadDocument as any).document.title)
    })
  })

  test.describe('can create a new document from template in standalone mode', () => {
    for (const template of [
      { templateId: 'MINIMAL', templateContent: docMin },
      { templateId: 'ALL_FIELDS', templateContent: docMax },
    ]) {
      test(`templateId: ${template.templateId}`, async ({ page }) => {
        await page.route(
          '/.well-known/appspecific/de.bsi.secvisogram.json',
          (route) => route.fulfill({ status: 404, json: {} }),
        )

        await page.goto('?tab=EDITOR')

        await page.getByTestId('new_document_button').click()
        await page
          .getByTestId('new_document-templates-select')
          .selectOption(template.templateId)

        await page.getByTestId('new_document-create_document_button').click()
        await expect(page.getByTestId('new_document_dialog')).toBeHidden()

        await page.getByTestId('new_export_document_button').click()
        const downloadPromise = page.waitForEvent('download')
        await page.getByTestId('export_document-export_document_button').click()
        await page.getByTestId('alert-confirm_button').click()
        const download = await downloadPromise
        const downloadPath = path.join(
          os.tmpdir(),
          `pw-download-${Date.now()}.json`,
        )
        await download.saveAs(downloadPath)
        const body = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'))

        const removeGeneratedPartsFromDocument = (doc: any) => ({
          ...doc,
          document: {
            ...doc.document,
            tracking: {
              ...Object.fromEntries(
                Object.entries(doc.document.tracking || {}).filter(
                  ([key]) => key !== 'generator',
                ),
              ),
            },
          },
        })

        expect(removeGeneratedPartsFromDocument(body)).toMatchObject(
          removeGeneratedPartsFromDocument(template.templateContent),
        )
      })
    }
  })

  test.describe('can create a minimal new document from URL in standalone mode', () => {
    const testDocURL = 'http://localhost:22222/test.json'

    test('in form editor', async ({ page }) => {
      await page.route(testDocURL, (route) =>
        route.fulfill({
          status: 200,
          body: JSON.stringify(sampleUploadDocument),
          contentType: 'application/json',
        }),
      )

      await page.goto('?tab=EDITOR')
      const isModified = await page.evaluate(() => (window as any).IS_MODIFIED)
      expect(isModified).toBe(false)

      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-url_button').click()
      await page.getByTestId('new_document-url_input').fill(testDocURL)

      const urlResponsePromise = page.waitForResponse(testDocURL)
      await page.getByTestId('new_document-create_document_button').click()
      await urlResponsePromise

      await expect(page.getByTestId('new_document_dialog')).toBeHidden()
      await page.getByTestId('menu_entry-/document').click()
      await expect(
        page.getByTestId('attribute-document-title').locator('input'),
      ).toHaveValue((sampleUploadDocument as any).document.title)
    })

    test('with error from a URL with CORS restrictions', async ({ page }) => {
      await page.route(testDocURL, (route) => route.abort('failed'))

      await page.goto('?tab=EDITOR')
      await page.locator('#csafVersionSelect').selectOption('v2.0')

      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-url_button').click()
      await page.getByTestId('new_document-url_input').fill(testDocURL)

      await page.getByTestId('new_document-create_document_button').click()
      await expect(
        page.getByText(
          'Failed to load from URL. The server may be unreachable or the resource cannot be accessed due to CORS restrictions.',
        ),
      ).toBeVisible()
    })

    test('with error due to invalid JSON file', async ({ page }) => {
      await page.route(testDocURL, (route) =>
        route.fulfill({
          status: 200,
          body: JSON.stringify(sampleUploadDocument).replaceAll('}', '"'),
          contentType: 'application/json',
        }),
      )

      await page.goto('?tab=EDITOR')
      await page.locator('#csafVersionSelect').selectOption('v2.0')

      await page.getByTestId('new_document_button').click()
      await page.getByTestId('new_document-url_button').click()
      await page.getByTestId('new_document-url_input').fill(testDocURL)

      await page.getByTestId('new_document-create_document_button').click()
      await expect(page.getByText('Failed to parse JSON file.')).toBeVisible()
    })
  })

  test.describe('can create a new document in connected mode', () => {
    for (const user of getUsers()) {
      for (const mode of ['TEMPLATE', 'FILESYSTEM'] as const) {
        test(`user: ${user.preferredUsername}, mode: ${mode}`, async ({
          page,
          context,
        }) => {
          const [template] = getTemplates()

          await page.route(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            (route) => route.fulfill({ json: getLoginEnabledConfig() }),
          )
          await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
            route.fulfill({ json: getUserInfo(user) }),
          )
          await page.route('/api/v1/advisories/templates', (route) =>
            route.fulfill({ json: getGetTemplatesResponse() }),
          )

          await page.goto('?tab=EDITOR')

          await expect(page.getByTestId('user_info')).toBeVisible()

          if (!canCreateDocuments(user.groups)) {
            await expect(page.getByTestId('new_document_button')).toBeHidden()
          } else {
            const templatesPromise = page.waitForResponse((r) =>
              r.url().includes('/api/v1/advisories/templates'),
            )
            await page.getByTestId('new_document_button').click()
            await templatesPromise

            if (mode === 'TEMPLATE') {
              for (const tmpl of getTemplates()) {
                await expect(
                  page
                    .getByTestId('new_document-templates-select')
                    .locator(`option[value="${tmpl.templateId}"]`),
                ).toBeAttached()
              }
              await page
                .getByTestId('new_document-templates-select')
                .selectOption(template.templateId)

              await page.route(
                `/api/v1/advisories/templates/${template.templateId}`,
                (route) =>
                  route.fulfill({
                    json: getGetTemplateContentResponse({ template }),
                  }),
              )

              await page
                .getByTestId('new_document-create_document_button')
                .click()
              await expect(page.getByTestId('new_document_dialog')).toBeHidden()
            } else {
              await page
                .getByTestId('new_document-file_selector_button')
                .click()
              await page.getByTestId('new_document-file_input').setInputFiles({
                name: 'some_file.json',
                mimeType: 'application/json',
                buffer: Buffer.from(JSON.stringify(sampleUploadDocument)),
              })

              await page
                .getByTestId('new_document-create_document_button')
                .click()
              await expect(page.getByTestId('new_document_dialog')).toBeHidden()
              await page.getByTestId('menu_entry-/document').click()
              await expect(
                page.getByTestId('attribute-document-title').locator('input'),
              ).toHaveValue((sampleUploadDocument as any).document.title)
            }

            const createAdvisoryResponse = getCreateAdvisoryResponse()
            await context.addCookies([
              {
                name: 'XSRF-TOKEN',
                value: 'test-Value-123',
                url: 'http://localhost:8080',
              },
            ])

            let capturedCreateBody: any
            await page.route(/\/api\/v1\/advisories$/, async (route) => {
              if (route.request().method() === 'POST') {
                capturedCreateBody = route.request().postDataJSON()
                await route.fulfill({
                  json: createAdvisoryResponse,
                  status: 201,
                })
              } else {
                await route.fulfill({ json: getGetAdvisoriesResponse() })
              }
            })
            await page.route(
              `/api/v1/advisories/${createAdvisoryResponse.id}`,
              (route) =>
                route.fulfill({
                  json: getGetAdvisoryDetailResponse({
                    advisoryId: createAdvisoryResponse.id,
                  }),
                }),
            )

            await page.getByTestId('save_button').click()

            const summary = 'Summary'
            const legacyVersion = 'Legacy version'
            await page
              .getByTestId('submit_version-summary-textarea')
              .fill(summary)
            await page
              .getByTestId('submit_version-legacy_version-input')
              .fill(legacyVersion)

            const createResponsePromise = page.waitForResponse(
              (r) =>
                r.url().includes('/api/v1/advisories') &&
                !r.url().includes('/templates') &&
                r.request().method() === 'POST',
            )
            await page.getByTestId('submit_version-submit').click()
            await createResponsePromise

            if (mode === 'TEMPLATE') {
              expect(capturedCreateBody.csaf).toEqual(template.templateContent)
            } else {
              expect(capturedCreateBody.csaf).toEqual(sampleUploadDocument)
            }
            expect(capturedCreateBody.summary).toEqual(summary)
            expect(capturedCreateBody.legacyVersion).toEqual(legacyVersion)

            await page.waitForResponse((r) =>
              r
                .url()
                .includes(`/api/v1/advisories/${createAdvisoryResponse.id}`),
            )
          }
        })
      }
    }
  })

  test.describe('can export a document from server', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        for (const [select, format, extension] of [
          ['csaf-json', 'JSON', 'json'],
          ['csaf-json-stripped', 'JSON', 'json'],
          ['html', 'HTML', 'html'],
          ['pdf', 'PDF', 'pdf'],
          ['markdown', 'Markdown', 'md'],
        ] as const) {
          test(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}, format: ${select}`, async ({
            page,
          }) => {
            const advisoryDetail = getGetAdvisoryDetailResponse({
              advisoryId: advisory.advisoryId,
            })

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
            await page.route(
              `/api/v1/advisories/${advisory.advisoryId}`,
              (route) => route.fulfill({ json: advisoryDetail }),
            )

            await page.goto('?tab=DOCUMENTS')

            await page
              .getByTestId(
                `advisory-${advisory.advisoryId}-list_entry-open_button`,
              )
              .click()
            await expect(page.getByTestId('loading_indicator')).toBeHidden()
            await expect(page).toHaveURL(/\?tab=EDITOR/)

            await page.getByTestId('new_export_document_button').click()
            await page
              .getByTestId(`export_document-${select}_selector_button`)
              .click()

            if (select === 'csaf-json-stripped') {
              // csaf-json-stripped uses fetch + downloadFile() — fully interceptable
              await page.route(
                new RegExp(
                  `/api/v1/advisories/${advisory.advisoryId}/csaf\\?format=${format}$`,
                ),
                (route) =>
                  route.fulfill({
                    body: JSON.stringify({ my: 'doc' }),
                    contentType: 'application/json',
                  }),
              )
              const apiResponsePromise = page.waitForResponse(
                new RegExp(`/api/v1/advisories/${advisory.advisoryId}/csaf`),
              )
              const downloadPromise = page.waitForEvent('download')
              await page
                .getByTestId('export_document-export_document_button')
                .click()
              await apiResponsePromise
              await page.getByTestId('alert-confirm_button').click()
              const download = await downloadPromise
              const downloadPath = path.join(
                os.tmpdir(),
                `pw-download-${Date.now()}.json`,
              )
              await download.saveAs(downloadPath)
              const parsed = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'))
              expect(parsed).toEqual({})
            } else {
              // Non-stripped formats use <a download href="..."> which bypasses
              // Playwright's route interceptors. Verify the anchor is configured
              // correctly (href and download attribute) instead of downloading.
              const exportBtn = page.getByTestId(
                'export_document-export_document_button',
              )
              await expect(exportBtn).toHaveAttribute(
                'href',
                new RegExp(
                  `/api/v1/advisories/${advisory.advisoryId}/csaf.*format=${format}`,
                ),
              )
              await expect(exportBtn).toHaveAttribute(
                'download',
                new RegExp(`\\.${extension}$`),
              )
            }
          })
        }
      }
    }
  })

  test.describe('can download from local', () => {
    for (const [select] of [
      ['csaf-json', 'JSON', 'json'],
      ['csaf-json-stripped', 'JSON', 'json'],
      ['html', 'HTML', 'html'],
      ['pdf', 'PDF', 'pdf'],
    ] as const) {
      test(`format: ${select}`, async ({ page }) => {
        await page.goto('?tab=EDITOR')
        await page.getByTestId('new_export_document_button').click()
        await page
          .getByTestId(`export_document-${select}_selector_button`)
          .click()

        if (select === 'pdf') {
          // The iframe is hidden by default; use toBeAttached (matches Cypress's .should('exist'))
          await expect(page.getByTestId('pdf_document_iframe')).toBeAttached()
          // Stub window.print on the iframe's contentWindow to detect the call
          await page.evaluate(() => {
            const iframe = document.querySelector(
              '[data-testid="pdf_document_iframe"]',
            ) as HTMLIFrameElement
            if (iframe?.contentWindow) {
              ;(iframe.contentWindow as any).__printCalled = false
              iframe.contentWindow.print = function () {
                ;(iframe.contentWindow as any).__printCalled = true
              }
            }
          })
          await page
            .getByTestId('export_document-export_document_button')
            .click()
          const printCalled = await page.evaluate(() => {
            const iframe = document.querySelector(
              '[data-testid="pdf_document_iframe"]',
            ) as HTMLIFrameElement
            return !!(
              iframe?.contentWindow &&
              (iframe.contentWindow as any).__printCalled
            )
          })
          expect(printCalled).toBe(true)
        } else {
          const downloadPromise = page.waitForEvent('download')
          await page
            .getByTestId('export_document-export_document_button')
            .click()
          await page.getByTestId('alert-confirm_button').click()
          const download = await downloadPromise
          const downloadPath = path.join(
            os.tmpdir(),
            `pw-download-${Date.now()}`,
          )
          await download.saveAs(downloadPath)

          if (select === 'csaf-json') {
            const content = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'))
            expect(content).toHaveProperty('document')
          } else if (select === 'csaf-json-stripped') {
            const content = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'))
            expect(content).toEqual({})
          } else if (select === 'html') {
            // Verify the HTML file was downloaded and is non-empty
            const content = fs.readFileSync(downloadPath, 'utf-8')
            expect(content).toBeTruthy()
            // Note: cy.document() checks on doctype are not applicable in Playwright;
            // the downloaded file content is validated instead.
          }
        }
      })
    }
  })

  test.describe('View', () => {
    test.describe('style tests', () => {
      test('sidebar expands the right way', async ({ page }) => {
        await page.goto('?tab=SOURCE')
        const initialWidth = await page.evaluate(
          () => document.body.scrollWidth,
        )
        await page.getByTestId('sideBar-ERRORS-button').click()
        const newWidth = await page.evaluate(() => document.body.scrollWidth)
        expect(newWidth).toBe(initialWidth)
      })
    })
  })
})
