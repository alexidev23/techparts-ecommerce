describe('Página de detalle de producto', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit("https://techparts-ecommerce.vercel.app/")
    cy.get('[aria-label="Categorías de productos"]').contains('Todos los productos').click()
  })

  it('Entrar en un producto', () => {
    cy.get('[aria-labelledby="products-heading"]')
      .contains('Módulo Cámara iPhone 12')
      .click()
    cy.get('h1').contains('Módulo Cámara iPhone 12')
  })

  it('Agregar producto al carrito', () => {
    cy.get('[aria-label="Categorías de productos"]').contains('Todos los productos').click()
    cy.get('[aria-labelledby="products-heading"]')
      .contains('Kit Herramientas Reparación')
      .click()
    cy.get('h1').contains('Kit Herramientas Reparación')
    cy.get('button').contains('Agregar al carrito').click()
    cy.get('[aria-label="Ir al carrito"]').contains('1')
  })
})