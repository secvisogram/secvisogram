import { expect, test } from '@playwright/test'
import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  getAdvisories,
  getGetAdvisoryDetailResponse,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'

test.describe('SecvisogramPage / direct advisory link', () => {
  test('backend-connected: loads the advisory and redirects to the editor', async ({
    page,
  }) => {
    const [advisory] = getAdvisories()
    const user = getUsers()[0]

    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )
    await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
      route.fulfill({ json: getUserInfo(user) }),
    )
    const advisoryDetail = getGetAdvisoryDetailResponse({
      advisoryId: advisory.advisoryId,
    })
    await page.route(`/api/v1/advisories/${advisory.advisoryId}`, (route) =>
      route.fulfill({ json: advisoryDetail }),
    )

    await page.goto(`?advisoryId=${advisory.advisoryId}`)

    await expect(page.getByTestId('loading_indicator')).toBeHidden()
    await expect(page).toHaveURL(/\?tab=EDITOR/)

    await page.getByTestId('menu_entry-/document').click()
    await expect(
      page.getByTestId('attribute-document-title').locator('input'),
    ).toHaveValue(advisoryDetail.csaf.document.title)
  })

  test('standalone mode: redirects to the editor without fetching an advisory', async ({
    page,
  }) => {
    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ status: 404, json: {} }),
    )

    await page.goto('?advisoryId=some-advisory-id')

    await expect(page).toHaveURL(/\?tab=EDITOR/)
    await expect(page.getByTestId('loading_indicator')).toBeHidden()
    await expect(page.getByTestId('error_toast_message')).toBeHidden()

    await page.getByTestId('menu_entry-/document').click()
    await expect(
      page.getByTestId('attribute-document-title').locator('input'),
    ).toHaveValue('')
  })

  test('backend-connected: shows an error and still redirects when the advisory cannot be loaded', async ({
    page,
  }) => {
    const user = getUsers()[0]
    const advisoryId = 'unknown-advisory-id'

    await page.route(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      (route) => route.fulfill({ json: getLoginEnabledConfig() }),
    )
    await page.route(getLoginEnabledConfig().userInfoUrl, (route) =>
      route.fulfill({ json: getUserInfo(user) }),
    )
    await page.route(`/api/v1/advisories/${advisoryId}`, (route) =>
      route.fulfill({ status: 404, json: {} }),
    )

    await page.goto(`?advisoryId=${advisoryId}`)

    await expect(page).toHaveURL(/\?tab=EDITOR/)
    await expect(page.getByTestId('loading_indicator')).toBeHidden()
    await expect(page.getByTestId('error_toast_message')).toBeAttached()
  })
})
