describe('Home - Theme toggle', () => {
  beforeEach(() => {
    cy.visit("https://techparts-ecommerce.vercel.app/")
    // Aseguramos estado inicial conocido (dark mode por defecto)
    cy.get('html').should('have.class', 'dark')
  })

  it('Debería cambiar a modo light al seleccionarlo', () => {
    cy.get('[data-slot="dropdown-menu-trigger"]').click()
    cy.get('[data-side="bottom"]').should('be.visible')
    cy.get('[role="menuitem"]').contains('Light').click()
    cy.get('html').should('have.class', 'light')
  })

  it('Debería cambiar a modo dark al seleccionarlo', () => {
    // Cambio a light
    cy.get('[data-slot="dropdown-menu-trigger"]').click()
    cy.get('[role="menuitem"]').contains('Light').click()
    cy.get('html').should('have.class', 'light')

    // Esperamos que el dropdown se cierre completamente
    cy.get('[data-side="bottom"]').should('not.exist')

    // Ahora volvemos a dark
    cy.get('[data-slot="dropdown-menu-trigger"]').click()
    cy.get('[data-side="bottom"]').should('be.visible')
    cy.get('[role="menuitem"]').contains('Dark').click()
    cy.get('html').should('have.class', 'dark')
  })
})

describe('Ver los productos de una categoria seleccionada', () => {
  beforeEach(() => {
    cy.viewport(1280, 720) // Forzás desktop
    cy.visit("https://techparts-ecommerce.vercel.app/")
  })

  it('Entrando a la categoria "Pantallas" - Desktop', () => {
    cy.get('[aria-label="Categorías de productos"]').contains('Pantallas').click()
    cy.get('section[aria-labelledby="products-heading"]').find('p').contains('3 productos')
  })

  it('Entrando a la categoria "Pantallas" - Mobile', () => {
    cy.viewport(390, 844) // iPhone 14
    cy.get('[aria-label="Abrir menú"]').click()
    cy.get('[data-slot="sheet-content"]').find('[aria-label="Menú móvil"]').contains('Pantallas').click()
    cy.get('section[aria-labelledby="products-heading"]').find('p').contains('3 productos')
  })
})