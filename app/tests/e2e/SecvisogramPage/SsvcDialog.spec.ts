import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

async function clickHoverButton(locator: Locator) {
  await locator.evaluate((el) => (el as HTMLElement).click())
}

/**
 * Opens the v2.1 editor, adds a vulnerability with a CVE and a metric and
 * opens the `ssvc_v2` section.
 */
async function setupSsvcEditor(page: Page, cve = 'CVE-2026-1234') {
  await page.addInitScript(() => {
    ;(window as any).Cypress = true
  })
  await page.route(
    '/.well-known/appspecific/de.bsi.secvisogram.json',
    (route) => route.fulfill({ status: 404, json: {} }),
  )
  await page.goto('?tab=EDITOR')
  await page.locator('#csafVersionSelect').selectOption('v2.1')
  await page.getByTestId('beta_version-confirm_button').click()
  await page.getByTestId('layer-button-best_practice').click()

  await clickHoverButton(
    page.getByTestId('menu_entry-/vulnerabilities-add_item_button'),
  )
  if (cve) {
    await page
      .getByTestId('attribute-vulnerabilities-0-cve')
      .locator('input')
      .fill(cve)
  }
  await clickHoverButton(
    page.getByTestId('menu_entry-/vulnerabilities/0/metrics-add_item_button'),
  )
  await page
    .getByTestId('menu_entry-/vulnerabilities/0/metrics/0/content')
    .click()
  await page
    .getByTestId('menu_entry-/vulnerabilities/0/metrics/0/content/ssvc_v2')
    .click()
}

async function sourceDocument(page: Page) {
  await page.getByTestId('tab_button-SOURCE').click()
  await page.waitForFunction(() => (window as any).MONACO_EDITOR !== undefined)
  return page.evaluate(() =>
    JSON.parse((window as any).MONACO_EDITOR.getModel().getValue()),
  )
}

async function answer(page: Page, key: string, value: string) {
  await page.getByTestId(`ssvc_dp-${key}-${value}`).click()
}

test.describe('SecvisogramPage / SSVC dialog', () => {
  test('Coordinator: applies a spec compliant ssvc_v2', async ({ page }) => {
    await setupSsvcEditor(page)
    await expect(page.getByTestId('ssvc_summary')).toContainText(
      'No SSVC decision yet',
    )
    await page.getByTestId('ssvc_open').click()

    const dialog = page.getByTestId('ssvc_dialog')
    await expect(dialog).toBeVisible()
    await expect(page.getByTestId('ssvc_cve')).toContainText('CVE-2026-1234')
    await expect(page.getByTestId('ssvc_apply')).toBeDisabled()
    await expect(page.getByTestId('ssvc_copy')).toBeDisabled()

    await answer(page, 'E', 'P')
    await answer(page, 'A', 'N')
    await answer(page, 'TI', 'T')
    await answer(page, 'MP', 'S')
    await answer(page, 'PWI', 'MA')
    await expect(page.getByTestId('ssvc_derived-MWI-value')).toHaveText(
      'Medium',
    )
    await expect(page.getByTestId('ssvc_outcome_value')).toHaveText('Track*')
    await expect(page.getByTestId('ssvc_path')).toContainText(
      'Exploitation: Public PoC → Automatable: No',
    )

    await page.getByTestId('ssvc_apply').click()
    await expect(dialog).toBeHidden()
    await expect(page.getByTestId('ssvc_summary')).toContainText(
      'Coordinator: Track*',
    )

    const doc = await sourceDocument(page)
    const ssvc = doc.vulnerabilities[0].metrics[0].content.ssvc_v2
    expect(ssvc.schemaVersion).toBe('2.0.0')
    expect(ssvc.target_ids).toEqual(['CVE-2026-1234'])
    expect(ssvc.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    expect(
      ssvc.selections.map(
        (s: any) => `${s.namespace}:${s.key}:${s.values[0].key}`,
      ),
    ).toEqual([
      'ssvc:E:P',
      'ssvc:A:N',
      'ssvc:TI:T',
      'cisa:MP:S',
      'ssvc:PWI:MA',
      'ssvc:MWI:M',
      'cisa:CISA:T*',
    ])
    expect(ssvc).not.toHaveProperty('references')
    expect(ssvc).not.toHaveProperty('decision_point_resources')
  })

  test('Patch Applier: derives Human Impact', async ({ page }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await page.getByTestId('ssvc_role-patchApplier').click()
    await answer(page, 'E', 'A')
    await answer(page, 'EXP', 'O')
    await answer(page, 'A', 'Y')
    await answer(page, 'SI', 'R')
    await answer(page, 'MI', 'MSC')
    await expect(page.getByTestId('ssvc_derived-HI-value')).toHaveText('High')
    await expect(page.getByTestId('ssvc_outcome_value')).toHaveText('Immediate')
    await page.getByTestId('ssvc_apply').click()

    const doc = await sourceDocument(page)
    const keys =
      doc.vulnerabilities[0].metrics[0].content.ssvc_v2.selections.map(
        (s: any) => s.key,
      )
    expect(keys).toEqual(['E', 'EXP', 'A', 'SI', 'MI', 'HI', 'DSOI'])
  })

  test('Developer: derives Utility and Public Safety Impact', async ({
    page,
  }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await page.getByTestId('ssvc_role-developer').click()
    await answer(page, 'E', 'P')
    await answer(page, 'A', 'Y')
    await answer(page, 'VD', 'C')
    await answer(page, 'TI', 'T')
    await answer(page, 'SI', 'C')
    await expect(page.getByTestId('ssvc_derived-U-value')).toHaveText(
      'Super Effective',
    )
    await expect(page.getByTestId('ssvc_derived-PSI-value')).toHaveText(
      'Significant',
    )
    await page.getByTestId('ssvc_apply').click()

    const doc = await sourceDocument(page)
    const keys =
      doc.vulnerabilities[0].metrics[0].content.ssvc_v2.selections.map(
        (s: any) => s.key,
      )
    expect(keys).toEqual(['E', 'A', 'VD', 'TI', 'SI', 'U', 'PSI', 'DSOI'])
  })

  test('Cancel does not change the document', async ({ page }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await answer(page, 'E', 'N')
    await page.getByTestId('ssvc_cancel').click()
    await expect(page.getByTestId('ssvc_dialog')).toBeHidden()
    await expect(page.getByTestId('ssvc_summary')).toContainText(
      'No SSVC decision yet',
    )
    const doc = await sourceDocument(page)
    expect(doc.vulnerabilities[0].metrics[0].content?.ssvc_v2).toBeUndefined()
  })

  test('switching the role keeps shared answers', async ({ page }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await answer(page, 'E', 'A')
    await answer(page, 'A', 'Y')
    await page.getByTestId('ssvc_role-developer').click()
    await expect(page.getByTestId('ssvc_dp-E-A')).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await expect(page.getByTestId('ssvc_dp-A-Y')).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await expect(page.getByTestId('ssvc_dp-TI-T')).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })

  test('answers can be given with the keyboard', async ({ page }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await expect(page.getByRole('radiogroup', { name: 'Role' })).toBeVisible()

    const first = page.getByTestId('ssvc_dp-E-N')
    await first.focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.getByTestId('ssvc_dp-E-P')).toBeFocused()
    await expect(page.getByTestId('ssvc_dp-E-P')).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await expect(page.getByTestId('ssvc_dp-E-A')).toBeFocused()

    // one tab stop per group: the other options of E are skipped
    await page.keyboard.press('Tab')
    await expect(page.getByText('Show definitions').first()).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByTestId('ssvc_dp-A-N')).toBeFocused()
  })

  test('re-opening pre-fills the answers and keeps foreign selections', async ({
    page,
  }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await answer(page, 'E', 'N')
    await answer(page, 'A', 'N')
    await answer(page, 'TI', 'P')
    await answer(page, 'MP', 'M')
    await answer(page, 'PWI', 'M')
    await expect(page.getByTestId('ssvc_outcome_value')).toHaveText('Track')
    await page.getByTestId('ssvc_apply').click()

    await page.getByTestId('ssvc_open').click()
    await expect(page.getByTestId('ssvc_role-coordinator')).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await expect(page.getByTestId('ssvc_dp-E-N')).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await expect(page.getByTestId('ssvc_outcome_value')).toHaveText('Track')
    await expect(page.getByTestId('ssvc_info_replaced')).toBeVisible()
    await answer(page, 'E', 'A')
    await answer(page, 'A', 'Y')
    await answer(page, 'TI', 'T')
    await answer(page, 'MP', 'E')
    await expect(page.getByTestId('ssvc_outcome_value')).toHaveText('Act')
    await page.getByTestId('ssvc_cancel').click()
  })

  test('Copy JSON copies the object that Apply writes', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await answer(page, 'E', 'N')
    await answer(page, 'A', 'N')
    await answer(page, 'TI', 'P')
    await answer(page, 'MP', 'M')
    await answer(page, 'PWI', 'M')
    await page.getByTestId('ssvc_copy').click()
    await expect(page.getByTestId('ssvc_copy_message')).toContainText('Copied')
    const copied = JSON.parse(
      await page.evaluate(() => navigator.clipboard.readText()),
    )
    expect(copied.selections).toHaveLength(7)
    expect(copied.target_ids).toEqual(['CVE-2026-1234'])
    await page.getByTestId('ssvc_cancel').click()
    const doc = await sourceDocument(page)
    expect(doc.vulnerabilities[0].metrics[0].content?.ssvc_v2).toBeUndefined()
  })

  test('without CVE the target_ids are omitted', async ({ page }) => {
    await setupSsvcEditor(page, '')
    await page.getByTestId('ssvc_open').click()
    await expect(page.getByTestId('ssvc_cve')).toContainText('No CVE set')
    await answer(page, 'E', 'N')
    await answer(page, 'A', 'N')
    await answer(page, 'TI', 'P')
    await answer(page, 'MP', 'M')
    await answer(page, 'PWI', 'M')
    await page.getByTestId('ssvc_apply').click()
    const doc = await sourceDocument(page)
    expect(
      doc.vulnerabilities[0].metrics[0].content.ssvc_v2,
    ).not.toHaveProperty('target_ids')
  })

  test('warns about test 6.1.49 in final documents but still applies', async ({
    page,
  }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('tab_button-SOURCE').click()
    await page.waitForFunction(
      () => (window as any).MONACO_EDITOR !== undefined,
    )
    await page.evaluate(() => {
      const model = (window as any).MONACO_EDITOR.getModel()
      const doc = JSON.parse(model.getValue())
      doc.document = {
        ...doc.document,
        csaf_version: '2.1',
        tracking: {
          ...doc.document?.tracking,
          status: 'final',
          revision_history: [
            { date: '2020-01-01T00:00:00Z', number: '1', summary: 'first' },
          ],
        },
      }
      model.setValue(JSON.stringify(doc))
    })
    // let Monaco finish its delayed work before the editor is disposed
    await page.waitForTimeout(1000)
    await page.getByTestId('tab_button-EDITOR').click()
    for (const path of [
      '/vulnerabilities/0/metrics/0/content',
      '/vulnerabilities/0/metrics/0/content/ssvc_v2',
    ]) {
      await page.getByTestId(`menu_entry-${path}`).click()
    }
    await page.getByTestId('ssvc_open').click()
    await expect(page.getByTestId('ssvc_timestamp_warning')).toBeVisible()
    await answer(page, 'E', 'N')
    await answer(page, 'A', 'N')
    await answer(page, 'TI', 'P')
    await answer(page, 'MP', 'M')
    await answer(page, 'PWI', 'M')
    await expect(page.getByTestId('ssvc_apply')).toBeEnabled()
    await page.getByTestId('ssvc_apply').click()
    const doc = await sourceDocument(page)
    expect(
      doc.vulnerabilities[0].metrics[0].content.ssvc_v2.selections,
    ).toHaveLength(7)
  })

  test('no warning in draft documents', async ({ page }) => {
    await setupSsvcEditor(page)
    await page.getByTestId('ssvc_open').click()
    await expect(page.getByTestId('ssvc_timestamp_warning')).toHaveCount(0)
  })
})
