describe('Filtro por categoría', () => {
  beforeEach(() => {
    cy.visit('https://techparts-ecommerce.vercel.app/')
  })

  it('Debería mostrar 3 productos al seleccionar "Pantallas" en desktop', () => {
    cy.viewport(1280, 720)
    cy.get('[aria-label="Categorías de productos"]').contains('Pantallas').click()
    cy.get('section[aria-labelledby="products-heading"]')
      .find('p')
      .contains('3 productos')
  })

  it('Debería mostrar 3 productos al seleccionar "Pantallas" en mobile', () => {
    cy.viewport(390, 844)
    cy.get('[aria-label="Abrir menú"]').click()
    cy.get('[data-slot="sheet-content"]')
      .find('[aria-label="Menú móvil"]')
      .contains('Pantallas')
      .click()
    cy.get('section[aria-labelledby="products-heading"]')
      .find('p')
      .contains('3 productos')
  })
})