import { expect, test } from '@playwright/test'
import translation from '../../../locales/en/translation.json' with { type: 'json' }
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

test.describe('SecvisogramPage / DocumentsTab', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )
    await page.route('/api/v1/advisories', (route) =>
      route.fulfill({ json: getGetAdvisoriesResponse() }),
    )
  })

  test.describe('can fetch documents from the csaf cms backend', () => {
    for (const user of getUsers()) {
      test(`user: ${user.preferredUsername}`, async ({ page }) => {
        await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
          route.fulfill({ json: getUserInfo(user) }),
        )

        await page.goto('?tab=DOCUMENTS')

        for (const advisory of getAdvisories()) {
          await expect(
            page.getByTestId(`advisory-${advisory.advisoryId}-list_entry`),
          ).toBeAttached()
          await expect(
            page.getByTestId(
              `advisory-${advisory.advisoryId}-list_entry-workflow_state`,
            ),
          ).toHaveText(advisory.workflowState)
        }
      })
    }
  })

  test.describe('can delete documents', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        test(`user: ${user.preferredUsername}, advisoryId: ${
          advisory.advisoryId
        }, canDelete: ${canDeleteDocument(user.user)}`, async ({
          page,
          context,
        }) => {
          await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
            route.fulfill({ json: getUserInfo(user) }),
          )
          await page.route('/api/v1/advisories', (route) =>
            route.fulfill({ json: getGetAdvisoriesResponse(user.user) }),
          )

          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
          })
          await context.addCookies([
            {
              name: 'XSRF-TOKEN',
              value: 'test-Value-123',
              url: 'http://localhost:8080',
            },
          ])

          let capturedDeleteRevision: string | null = null
          await page.route(
            new RegExp(`/api/v1/advisories/${advisory.advisoryId}(\\?|$)`),
            async (route) => {
              const request = route.request()
              if (request.method() === 'DELETE') {
                capturedDeleteRevision = new URL(
                  request.url(),
                ).searchParams.get('revision')
                await route.fulfill({ status: 204 })
              } else {
                await route.fulfill({ json: advisoryDetail })
              }
            },
          )

          await page.goto('?tab=DOCUMENTS')
          await expect(
            page.getByTestId(`advisory-${advisory.advisoryId}-list_entry`),
          ).toBeAttached()

          // Pretend to have the advisory removed
          await page.route('/api/v1/advisories', (route) =>
            route.fulfill({
              json: getGetAdvisoriesResponse().filter(
                (a) => a.advisoryId !== advisory.advisoryId,
              ),
            }),
          )

          const deleteButton = page.getByTestId(
            `advisory-${advisory.advisoryId}-list_entry-delete_button`,
          )
          if (!canDeleteDocument(user.user)) {
            await expect(deleteButton).toBeHidden()
          } else {
            await deleteButton.click()
            await page.getByTestId('alert-confirm_button').click()

            await expect(page.getByTestId('loading_indicator')).toBeHidden()
            await expect(
              page.getByTestId(`advisory-${advisory.advisoryId}-list_entry`),
            ).toBeHidden()
            expect(capturedDeleteRevision).toBe(advisoryDetail.revision)
          }
        })
      }
    }
  })

  test.describe('can open documents', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        test(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, async ({
          page,
        }) => {
          await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
            route.fulfill({ json: getUserInfo(user) }),
          )
          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
          })
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
          await page.getByTestId('menu_entry-/document').click()
          await expect(
            page.getByTestId('attribute-document-title').locator('input'),
          ).toHaveValue((advisoryDetail.csaf as any).document.title)
          await expect(page.getByTestId('document_tracking_id')).toHaveText(
            (advisoryDetail.csaf as any).document.title,
          )
        })
      }
    }
  })

  test.describe('can move a document into a new workflow state', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories().filter((a) => !a.isValid)) {
        for (const workflowState of advisory.allowedStateChanges) {
          test(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}, workflowState: ${workflowState}`, async ({
            page,
            context,
          }) => {
            await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
              route.fulfill({ json: getUserInfo(user) }),
            )
            await page.route(
              `/api/v1/advisories/${advisory.advisoryId}`,
              (route) =>
                route.fulfill({
                  json: getGetAdvisoryDetailResponse({
                    advisoryId: advisory.advisoryId,
                  }),
                }),
            )

            await page.goto('?tab=DOCUMENTS')
            await expect(
              page.getByTestId(`advisory-${advisory.advisoryId}-list_entry`),
            ).toBeAttached()

            const documentTrackingStatus = 'Final'
            const proposedTime = '2017-06-01T08:30'

            await context.addCookies([
              {
                name: 'XSRF-TOKEN',
                value: 'test-Value-123',
                url: 'http://localhost:8080',
              },
            ])

            let capturedRevision: string | null = null
            let capturedDocumentTrackingStatus: string | null = null
            let capturedProposedTime: string | null = null
            await page.route(
              new RegExp(
                `/api/v1/advisories/${advisory.advisoryId}/workflowstate/${workflowState}`,
              ),
              async (route) => {
                const requestUrl = new URL(route.request().url())
                capturedRevision = requestUrl.searchParams.get('revision')
                capturedDocumentTrackingStatus = requestUrl.searchParams.get(
                  'documentTrackingStatus',
                )
                capturedProposedTime =
                  requestUrl.searchParams.get('proposedTime')
                if (advisory.isValid) {
                  await route.fulfill({ json: {} })
                } else {
                  await route.fulfill({ status: 422 })
                }
              },
            )

            await page
              .getByTestId(
                `advisory-${advisory.advisoryId}-list_entry-edit_workflow_state_button`,
              )
              .click()
            await page
              .locator(
                `select[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state_select"]`,
              )
              .selectOption(workflowState)
            if (workflowState === 'Published') {
              for (const trackingStatus of ['Final', 'Interim']) {
                await expect(
                  page.locator(
                    `select[data-testid="advisory-${advisory.advisoryId}-edit_workflow_state_dialog-tracking_status_select"] option[value="${trackingStatus}"]`,
                  ),
                ).toBeAttached()
              }
              await page
                .locator(
                  `select[data-testid="advisory-${advisory.advisoryId}-edit_workflow_state_dialog-tracking_status_select"]`,
                )
                .selectOption(documentTrackingStatus)
            }
            if (
              workflowState === 'Published' ||
              workflowState === 'RfPublication'
            ) {
              await page
                .getByTestId(
                  `advisory-${advisory.advisoryId}-edit_workflow_state_dialog-proposed_time_input`,
                )
                .fill(proposedTime)
            }

            const changeWorkflowStateResponsePromise = page.waitForResponse(
              (r) =>
                r.request().method() === 'PATCH' &&
                r
                  .url()
                  .includes(
                    `/api/v1/advisories/${advisory.advisoryId}/workflowstate/${workflowState}`,
                  ),
            )
            const advisoriesReloadPromise = advisory.isValid
              ? page.waitForResponse(
                  (r) =>
                    r.request().method() === 'GET' &&
                    r.url().endsWith('/api/v1/advisories'),
                )
              : null

            await page
              .locator(
                `select[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state_select"]`,
              )
              .evaluate((el) =>
                (el.closest('form') as HTMLFormElement).requestSubmit(),
              )

            await changeWorkflowStateResponsePromise
            expect(capturedRevision).toBe(advisory.revision)
            if (workflowState === 'Published') {
              expect(capturedDocumentTrackingStatus).toBe(
                documentTrackingStatus,
              )
            }
            if (
              workflowState === 'Published' ||
              workflowState === 'RfPublication'
            ) {
              expect(capturedProposedTime).toBe(
                new Date(proposedTime).toISOString(),
              )
            }

            if (!advisory.isValid) {
              await expect(
                page.getByTestId('error_toast_message'),
              ).toContainText('document is not valid')
            } else {
              await advisoriesReloadPromise
            }
          })
        }
      }
    }
  })

  test.describe('can create a new version', () => {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories().filter((a) =>
        canCreateVersion({
          userName: user.user,
          workflowState: a.workflowState,
        }),
      )) {
        test(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, async ({
          page,
          context,
        }) => {
          await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
            route.fulfill({ json: getUserInfo(user) }),
          )
          await page.route('/api/v1/advisories', (route) =>
            route.fulfill({ json: getGetAdvisoriesResponse(user.user) }),
          )
          await page.route(
            `/api/v1/advisories/${advisory.advisoryId}`,
            (route) =>
              route.fulfill({
                json: getGetAdvisoryDetailResponse({
                  advisoryId: advisory.advisoryId,
                }),
              }),
          )

          await page.goto('?tab=DOCUMENTS')
          await expect(page.getByTestId('user_info')).toBeVisible()

          await expect(
            page.getByTestId(
              `advisory-${advisory.advisoryId}-list_entry-edit_workflow_state_button`,
            ),
          ).toBeHidden()

          const createNewVersionURL = new URL(
            `/api/v1/advisories/${advisory.advisoryId}/createNewVersion`,
            'http://localhost:8080',
          )
          createNewVersionURL.searchParams.set('revision', advisory.revision)
          await context.addCookies([
            {
              name: 'XSRF-TOKEN',
              value: 'test-Value-123',
              url: 'http://localhost:8080',
            },
          ])
          await page.route(
            new RegExp(
              `/api/v1/advisories/${advisory.advisoryId}/createNewVersion`,
            ),
            (route) => route.fulfill({ body: '' }),
          )

          const advisoryDetailPromise = page.waitForResponse(
            (r) =>
              r.request().method() === 'GET' &&
              r.url().includes(`/api/v1/advisories/${advisory.advisoryId}`) &&
              !r.url().includes('createNewVersion'),
          )
          const createVersionPromise = page.waitForResponse(
            (r) =>
              r.request().method() === 'PATCH' &&
              r
                .url()
                .includes(
                  `/api/v1/advisories/${advisory.advisoryId}/createNewVersion`,
                ),
          )
          const advisoriesReloadPromise = page.waitForResponse(
            (r) =>
              r.request().method() === 'GET' &&
              r.url().endsWith('/api/v1/advisories'),
          )

          await page
            .getByTestId(
              `advisory-${advisory.advisoryId}-list_entry-create_new_version_button`,
            )
            .click()

          await advisoryDetailPromise
          await createVersionPromise
          await advisoriesReloadPromise
        })
      }
    }
  })

  test.describe('can copy a permalink to an advisory', () => {
    const user = getUsers()[0]
    const [advisory] = getAdvisories()

    test.beforeEach(async ({ page }) => {
      await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
        route.fulfill({ json: getUserInfo(user) }),
      )

      await page.goto('?tab=DOCUMENTS')
    })

    test('copies the permalink to the clipboard and shows a success message', async ({
      page,
    }) => {
      await page.evaluate(() => {
        ;(window as any).__capturedClipboardText = null
        Object.defineProperty(navigator, 'clipboard', {
          value: {
            writeText: (text: string) => {
              ;(window as any).__capturedClipboardText = text
              return Promise.resolve()
            },
          },
          configurable: true,
        })
      })

      await page
        .getByTestId(`advisory-${advisory.advisoryId}-list_entry`)
        .locator(`[aria-label="${translation.documentsTab.copyPermalink}"]`)
        .click()

      await expect(page.getByTestId('error_toast_message')).toHaveText(
        translation.documentsTab.permalinkCopiedMessage,
      )

      const capturedText = await page.evaluate(
        () => (window as any).__capturedClipboardText,
      )
      const origin = new URL(page.url()).origin
      const expectedUrl = new URL('/', origin)
      expectedUrl.searchParams.set('advisoryId', advisory.advisoryId)
      expect(capturedText).toBe(expectedUrl.href)
    })

    test('shows a failure message when the clipboard write fails', async ({
      page,
    }) => {
      await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', {
          value: {
            writeText: () =>
              Promise.reject(new Error('clipboard write denied')),
          },
          configurable: true,
        })
      })

      await page
        .getByTestId(`advisory-${advisory.advisoryId}-list_entry`)
        .locator(`[aria-label="${translation.documentsTab.copyPermalink}"]`)
        .click()

      await expect(page.getByTestId('error_toast_message')).toHaveText(
        translation.documentsTab.failedToCopyPermalinkMessage,
      )
    })
  })
})
