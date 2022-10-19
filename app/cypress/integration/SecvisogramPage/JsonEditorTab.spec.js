import sortObjectKeys from '../../../lib/app/shared/sortObjectKeys.js'

describe('SecvisogramPage / JsonEditorTab', function () {
  it('can change a document and load changes', function () {
    cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
      statusCode: 404,
    }).as('wellKnownAppConfig')

    cy.visit('?tab=SOURCE')
    cy.wait('@wellKnownAppConfig')

    cy.window().should((/** @type {any} */ win) => {
      expect(Boolean(win.MONACO_EDITOR)).to.be.true
      const doc = JSON.parse(win.MONACO_EDITOR.getModel().getValue())
      expect(typeof doc.document.title).to.equal('string')
    })

    const newDocumentTitle = 'MY NEW TITLE'

    cy.window().then((/** @type {any} */ win) => {
      const editor = win.MONACO_EDITOR
      const value = JSON.parse(editor.getModel().getValue())
      value.document.title = newDocumentTitle
      editor.getModel().setValue(JSON.stringify(value, null, 2))
    })

    // Wait for debounced value to be settled
    cy.wait(500)
    cy.get('[data-testid="tab_button-EDITOR"]').click()
    cy.get('[data-testid="attribute-/document/title"] input').should(
      'have.value',
      newDocumentTitle
    )
    cy.get('[data-testid="attribute-/document/title"] input').type(
      ' (FORM EDITOR)'
    )

    cy.get('[data-testid="tab_button-SOURCE"]').click()
    cy.window().should((/** @type {any} */ win) => {
      expect(Boolean(win.MONACO_EDITOR)).to.be.true
      const doc = JSON.parse(win.MONACO_EDITOR.getModel().getValue())
      expect(doc.document.title).to.equal(newDocumentTitle + ' (FORM EDITOR)')
    })
  })

  it('can sort a document', function () {
    cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
      statusCode: 404,
    }).as('wellKnownAppConfig')

    cy.visit('?tab=SOURCE')
    cy.wait('@wellKnownAppConfig')

    cy.window().should((/** @type {any} */ win) => {
      expect(Boolean(win.MONACO_EDITOR)).to.be.true
      const doc = JSON.parse(win.MONACO_EDITOR.getModel().getValue())
      expect(typeof doc.document.title).to.equal('string')
    })

    cy.window().should((/** @type {any} */ win) => {
      const editor = win.MONACO_EDITOR
      expect(Boolean(editor)).to.be.true
      this.sortedEditorValue = sortObjectKeys(
        new Intl.Collator(),
        JSON.parse(editor.getModel().getValue())
      )
    })

    cy.get('[data-testid="sort_document_button"]').click()

    cy.window().should((/** @type {any} */ win) => {
      const editor = win.MONACO_EDITOR
      expect(editor.getModel().getValue()).to.equal(
        JSON.stringify(this.sortedEditorValue, null, 2)
      )
    })
  })
})
