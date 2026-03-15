// URL y conponente search
const BASE_URL = 'https://techparts-ecommerce.vercel.app/'
const SEARCH_INPUT = 'input[placeholder="Buscar repuestos y accesorios..."]'
// Palabras sin resultado
const PALABRAS_SIN_RESULTADO = ['pantallas', 'teclado', 'mouse', 'tapa']
// Palabras sin tilde
const PALABRAS_SIN_TILDE = ['camaras', 'camara', 'bateria', 'baterias']

describe('Barra de búsqueda', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit(BASE_URL)
  })

  it('Debería mostrar 2 productos al buscar "batería" con tilde', () => {
    cy.get(SEARCH_INPUT)
      .type('batería{enter}')
    cy.get('p[aria-live="polite"]').contains('2 productos')
  })

  it('Debería navegar al primer producto desde los resultados de búsqueda', () => {
    cy.get(SEARCH_INPUT).type('batería{enter}')
    cy.get('p[aria-live="polite"]').contains('2 productos')
    cy.get('li').first().click()
    cy.url().should('include', '/producto/')
  })

  it('Debería mostrar mensaje de no encontrado para palabras sin resultado', () => {
    PALABRAS_SIN_RESULTADO.forEach((palabra) => {
      cy.get(SEARCH_INPUT).clear().type(`${palabra}{enter}`)
      cy.get('p[aria-live="polite"]').contains('0 productos')
      cy.get('[aria-labelledby="products-heading"]')
        .find('p')
        .contains(`El producto "${palabra}" no se encuentra disponible por el momento`)
    })
  })

  it('Debería buscar sin tilde "bateria" y mostrar 0 productos', () => {
    PALABRAS_SIN_TILDE.forEach((palabra) => {
      cy.get(SEARCH_INPUT).type(`${palabra}{enter}`)
      cy.get('p[aria-live="polite"]').contains('0 productos')
      cy.get('[aria-labelledby="products-heading"]')
        .find('p')
        .contains(`El producto "${palabra}" no se encuentra disponible por el momento`)
    })
  })
})