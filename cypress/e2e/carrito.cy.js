const BASE_URL = 'https://techparts-ecommerce.vercel.app/'
const PRODUCTOS_A_AGREGAR = [
  { href: '/producto/1' },
  { href: '/producto/2' },
  { href: '/producto/3' }
]

describe('Carrito de compras', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit(BASE_URL)
  })

  it('Debería mostrar el carrito vacío al ingresar sin productos', () => {
    cy.get('a[aria-label="Ir al carrito"]').find('button').click()
    cy.get('h1').contains('Tu carrito está vacío')
    cy.get('p').contains('Agrega productos a tu carrito para continuar')
    cy.get('a[href="/productos"]').contains('Explorar productos').click()
    cy.url().should('include', '/productos')
  })

  it('Debería mostrar el contador en 1 al agregar un producto', () => {
    cy.get('a[href="/producto/1"]')
      .find('button')
      .contains('Agregar al carrito')
      .click()
    cy.get('a[aria-label="Ir al carrito"]').find('span').contains('1').click()
    cy.get('h1').contains('Carrito de compras')
  })

  it(`Debería mostrar ${PRODUCTOS_A_AGREGAR.length} productos en el carrito`, () => {
    const productosCapturados = []

    // 1. Capturás nombre y precio de cada producto y los agregás
    PRODUCTOS_A_AGREGAR.forEach(({ href }) => {
      cy.get(`a[href="${href}"]`).first().find('h3')
        .invoke('text')
        .then((texto) => {
          cy.get(`a[href="${href}"]`).first()
            .find('span[class*="text-blue-600"]')
            .invoke('text')
            .then((precio) => {
              productosCapturados.push({ nombre: texto.trim(), precio: precio.trim() })
            })
        })

      cy.get(`a[href="${href}"]`)
        .find('button')
        .contains('Agregar al carrito')
        .click()
    })

    // 2. Vas al carrito
    cy.get('a[aria-label="Ir al carrito"]')
      .find('span')
      .contains(`${PRODUCTOS_A_AGREGAR.length}`)
      .click()

    // 3. Verificás que cada producto aparezca en el carrito
    cy.then(() => {
      productosCapturados.forEach(({ nombre, precio }) => {
        cy.get('ul li h2').contains(nombre)
        cy.get('ul li').contains(precio)
      })
    })
  })

  it('Debería aumentar la cantidad del producto en el carrito', () => {
    cy.get('a[href="/producto/1"]')
      .find('button')
      .contains('Agregar al carrito')
      .click()

    cy.get('a[aria-label="Ir al carrito"]').find('span').contains('1').click()

    // Aumentás la cantidad
    cy.get('[aria-label="Aumentar cantidad de Pantalla OLED iPhone 13 Pro"]').click()

    // Verificás que el contador muestre 2
    cy.get('span[aria-live="polite"]').contains('2')
  })

  it('Debería disminuir la cantidad del producto en el carrito', () => {
    cy.get('a[href="/producto/1"]')
      .find('button')
      .contains('Agregar al carrito')
      .click()

    cy.get('a[aria-label="Ir al carrito"]').find('span').contains('1').click()

    // Aumentás a 2 primero
    cy.get('[aria-label="Aumentar cantidad de Pantalla OLED iPhone 13 Pro"]').click()
    cy.get('span[aria-live="polite"]').contains('2')

    // Disminuís a 1
    cy.get('[aria-label="Disminuir cantidad de Pantalla OLED iPhone 13 Pro"]').click()
    cy.get('span[aria-live="polite"]').contains('1')
  })
})  