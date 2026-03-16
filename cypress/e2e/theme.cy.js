describe('Toggle de tema Light/Dark', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('https://techparts-ecommerce.vercel.app/')
    cy.get('html').should('have.class', 'dark')
  })

  it('Debería cambiar a modo light al seleccionarlo', () => {
    cy.get('[data-slot="dropdown-menu-trigger"]').click()
    cy.get('[data-side="bottom"]').should('be.visible')
    cy.get('[role="menuitem"]').contains('Light').click()
    cy.get('html').should('have.class', 'light')
  })

  it('Debería cambiar a modo dark luego de haber cambiado a light', () => {
    cy.get('[data-slot="dropdown-menu-trigger"]').click()
    cy.get('[role="menuitem"]').contains('Light').click()
    cy.get('html').should('have.class', 'light')
    cy.get('[data-side="bottom"]').should('not.exist')

    cy.get('[data-slot="dropdown-menu-trigger"]').click()
    cy.get('[data-side="bottom"]').should('be.visible')
    cy.get('[role="menuitem"]').contains('Dark').click()
    cy.get('html').should('have.class', 'dark')
  })
})