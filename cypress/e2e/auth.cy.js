const BASE_URL = 'https://techparts-ecommerce.vercel.app'
const LOGIN_URL = '/login'
const EMAIL_INPUT = 'input[placeholder="correo@ejemplo.com"]'
const PASSWORD_INPUT = 'input[type="password"]'
const SUBMIT_BTN = 'button[type="submit"]'
const LOGIN_BTN = 'a[href="/login"] button'

// Credenciales
const ADMIN = { email: 'admin@techparts.com', password: 'admin123' }
const USER = { email: 'usuario@test.com', password: 'user123' }
const NEW_USER = { name: 'Martin Perez', email: 'mperez2026@gmail.com', password: 'martin2026' }

// Comando reutilizable para ir al login
const goToLogin = () => {
  cy.contains(LOGIN_BTN, 'Iniciar sesión').click()
  cy.url().should('include', LOGIN_URL)
}

// Comando reutilizable para iniciar sesión
const login = (email, password) => {
  goToLogin()
  cy.get(EMAIL_INPUT).type(email)
  cy.get(PASSWORD_INPUT).type(password)
  cy.get(SUBMIT_BTN).click()
}

// ─────────────────────────────────────────────
// Inicio de sesión
// ─────────────────────────────────────────────
describe('Inicio de sesión', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit(BASE_URL)
  })

  it('Debería redirigir a /login al hacer click en "Iniciar sesión"', () => {
    goToLogin()
  })

  it('Debería redirigir al panel de admin al iniciar sesión con cuenta admin', () => {
    login(ADMIN.email, ADMIN.password)
    cy.url().should('include', '/admin')
  })

  it('Debería poder mostrar y ocultar la contraseña', () => {
    goToLogin()
    cy.get(PASSWORD_INPUT).type(ADMIN.password)
    cy.get('button[aria-label="Mostrar contraseña"]').click()
    cy.get('button[aria-label="Ocultar contraseña"]').click()
  })

  it('Debería mostrar error si se envía el formulario sin contraseña', () => {
    goToLogin()
    cy.get(EMAIL_INPUT).type(ADMIN.email)
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]')
      .should('have.text', 'La contraseña debe tener al menos 6 caracteres')
  })

  it('Debería mostrar error si se envía el formulario sin email', () => {
    goToLogin()
    cy.get(PASSWORD_INPUT).type(ADMIN.password)
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]')
      .should('have.text', 'El correo electrónico es requerido')
  })

  it('Debería mostrar ambos errores si se envía el formulario vacío', () => {
    goToLogin()
    cy.get(SUBMIT_BTN).click()
    // Solución al problema de los dos field-error con el mismo selector
    cy.get('div[data-slot="field-error"]').then(($errors) => {
      const textos = [...$errors].map(el => el.innerText)
      expect(textos).to.include('El correo electrónico es requerido')
      expect(textos).to.include('La contraseña debe tener al menos 6 caracteres')
    })
  })

  it('Debería mostrar el avatar y email del usuario al iniciar sesión', () => {
    login(USER.email, USER.password)
    cy.get('span[data-slot="avatar"]').find('img').should('have.attr', 'src')
    cy.get('button[data-slot="dropdown-menu-trigger"]')
      .find('span')
      .contains(USER.email)
  })

  it('Debería redirigir a /perfil al hacer click en "Ver perfil"', () => {
    login(USER.email, USER.password)
    cy.get('header').find('a[href="/"]').click()
    cy.get('div[class="flex items-center gap-2"]').last().click()
    cy.get('div[role="menu"]').find('div').contains('Ver perfil').click()
    cy.url().should('include', '/perfil')
  })

  it('Debería redirigir a /login al cerrar sesión', () => {
    login(USER.email, USER.password)
    cy.get('header').find('a[href="/"]').click()
    cy.get('div[class="flex items-center gap-2"]').last().click()
    cy.get('div[role="menu"]').find('div').contains('Cerrar sesión').click()
    cy.url().should('include', LOGIN_URL)
  })
})

// ─────────────────────────────────────────────
// Registro de cuenta
// ─────────────────────────────────────────────
describe('Registro de cuenta', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit(BASE_URL)
    cy.get('a[href="/login"]').find('button').contains('Iniciar sesión').click()
    cy.get('a[href="/crear-cuenta"]').click()
  })

  it('Debería registrar un nuevo usuario y redirigir a /login', () => {
    cy.get('input[placeholder="Nombre completo"]').type(NEW_USER.name)
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get('input[name="password"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').type(NEW_USER.password)
    cy.get(SUBMIT_BTN).click()
    cy.url().should('include', LOGIN_URL)
  })

  it('Debería poder iniciar sesión con el usuario recién registrado', () => {
    // Primero registramos
    cy.get('input[placeholder="Nombre completo"]').type(NEW_USER.name)
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get('input[name="password"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').type(NEW_USER.password)
    cy.get(SUBMIT_BTN).click()
    cy.url().should('include', LOGIN_URL)

    // Luego iniciamos sesión
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get(PASSWORD_INPUT).type(NEW_USER.password)
    cy.get(SUBMIT_BTN).click()
    cy.url().should('not.include', LOGIN_URL)
  })

  it('Debería mostrar errores al enviar el formulario de registro vacío', () => {
    cy.get(SUBMIT_BTN).contains('Crear cuenta').click()
    cy.get('div[data-slot="field-error"]').then(($errors) => {
      const textos = [...$errors].map(el => el.innerText)
      expect(textos).to.include('El nombre debe tener al menos 2 caracteres')
      expect(textos).to.include('El correo electrónico es requerido')
      expect(textos).to.include('La contraseña debe tener al menos 6 caracteres')
      expect(textos).to.include('La confirmación debe tener al menos 6 caracteres')
    })
  })

  it('Debería mostrar error si solo falta el nombre', () => {
    cy.get('input[placeholder="Nombre completo"]').type(NEW_USER.name)
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get('input[name="password"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').type(NEW_USER.password)
    cy.get('input[placeholder="Nombre completo"]').clear()
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]')
      .should('have.text', 'El nombre debe tener al menos 2 caracteres')
  })

  it('Debería mostrar error si solo falta el email', () => {
    cy.get('input[placeholder="Nombre completo"]').type(NEW_USER.name)
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get('input[name="password"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').type(NEW_USER.password)
    cy.get(EMAIL_INPUT).clear()
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]')
      .should('have.text', 'El correo electrónico es requerido')
  })

  it('Debería mostrar error si solo falta la contraseña', () => {
    cy.get('input[placeholder="Nombre completo"]').type(NEW_USER.name)
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get('input[name="password"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').type(NEW_USER.password)
    cy.get('input[name="password"]').clear()
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]').then(($errors) => {
      const textos = [...$errors].map(el => el.innerText)
      expect(textos).to.include('La contraseña debe tener al menos 6 caracteres')
      expect(textos).to.include('Las contraseñas no coinciden')
    })
  })

  it('Debería mostrar error si solo falta confirmar la contraseña', () => {
    cy.get('input[placeholder="Nombre completo"]').type(NEW_USER.name)
    cy.get(EMAIL_INPUT).type(NEW_USER.email)
    cy.get('input[name="password"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').type(NEW_USER.password)
    cy.get('input[name="confirmPassword"]').clear()
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]')
      .should('have.text', 'La confirmación debe tener al menos 6 caracteres')
  })

  it('Debería mostrar error si las contraseñas no coinciden', () => {
    cy.get('input[placeholder="Nombre completo"]').type('Martin Ramirez')
    cy.get(EMAIL_INPUT).type('marRamirez2026@gmail.com')
    cy.get('input[name="password"]').type('martin2026')
    cy.get('input[name="confirmPassword"]').type('ramirez2026')
    cy.get(SUBMIT_BTN).click()
    cy.get('div[data-slot="field-error"]')
      .should('have.text', 'Las contraseñas no coinciden')
  })
})