# TechParts Ecommerce 🛒

TechParts es un ecommerce frontend desarrollado en React + TypeScript, orientado a la venta de repuestos y accesorios para celulares. Incluye panel de usuario, panel de administración, carrito de compras, checkout y más.

🔗 **Demo en vivo:** [techparts-ecommerce.vercel.app](https://techparts-ecommerce.vercel.app)

---

## 🚀 Tecnologías utilizadas

- **React 18** + **TypeScript**
- **Vite** – bundler y servidor de desarrollo
- **React Router** – navegación dinámica entre páginas
- **Context API** – gestión global del carrito
- **Tailwind CSS** – diseño responsive
- **localStorage** – persistencia del carrito y sesión
- **Vercel** – deploy continuo

---

## 📁 Estructura del proyecto

```
src/
 ├─ app/
 ├─ assets/
 ├─ components/       # Componentes reutilizables
 ├─ context/          # Context API (carrito, auth)
 ├─ data/             # Productos y datos estáticos
 ├─ hook/             # Custom hooks
 ├─ layouts/          # Layouts por rol (user/admin)
 ├─ lib/
 ├─ pages/
 │   ├─ admin/        # Panel de administración
 │   ├─ auth/         # Login y autenticación
 │   ├─ cart/         # Carrito de compras
 │   ├─ checkout/     # Proceso de compra
 │   ├─ help/         # Página de ayuda
 │   ├─ home/         # Página principal
 │   ├─ payment/      # Confirmación de pago
 │   ├─ products/     # Listado y detalle de productos
 │   └─ user/         # Panel de usuario
 ├─ services/
 ├─ types/
 ├─ utils/
 └─ App.tsx
```

---

## 📄 Páginas principales

| Página      | Descripción                                           |
| ----------- | ----------------------------------------------------- |
| `/`         | Home con listado de productos y filtros por categoría |
| `/auth`     | Login con roles: **admin** y **user**                 |
| `/products` | Catálogo de repuestos y accesorios para celulares     |
| `/cart`     | Carrito de compras con persistencia en localStorage   |
| `/checkout` | Formulario de datos para completar la compra          |
| `/payment`  | Confirmación del pedido                               |
| `/user`     | Panel del usuario — historial y perfil                |
| `/admin`    | Panel de administración — gestión de productos        |
| `/help`     | Preguntas frecuentes y soporte                        |

---

## 🔐 Roles y acceso

La app cuenta con dos roles de prueba disponibles desde la pantalla de login:

| Rol       | Acceso                                               |
| --------- | ---------------------------------------------------- |
| **User**  | Home, productos, carrito, checkout, panel de usuario |
| **Admin** | Todo lo anterior + panel de administración           |

> Los credenciales de prueba están disponibles directamente en la pantalla de login.

---

## ⚙️ Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/alexidev23/techparts-ecommerce
cd techparts-ecommerce

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🧪 Testing con Cypress

Este proyecto incluye una suite de tests E2E automatizados con **Cypress** (en desarrollo activo).

### Flujos testeados:

- Navegación general y carga de páginas
- Login con rol user y rol admin
- Agregar y eliminar productos del carrito
- Persistencia del carrito en localStorage
- Flujo completo de checkout
- Acceso a panel de administración

### Correr los tests

```bash
# Instalar Cypress
npm install cypress --save-dev

# Abrir Cypress en modo interactivo
npx cypress open

# Ejecutar en modo headless
npx cypress run
```

---

## 📦 Scripts disponibles

| Comando            | Descripción                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Servidor de desarrollo         |
| `npm run build`    | Build de producción            |
| `npm run preview`  | Preview del build              |
| `npx cypress open` | Abre Cypress en modo GUI       |
| `npx cypress run`  | Ejecuta tests en modo headless |

---

## 📌 Estado del proyecto

- [x] Frontend completo y deployado
- [x] Sistema de roles (admin / user)
- [x] Carrito con persistencia
- [x] Flujo de checkout
- [ ] Suite de tests E2E con Cypress _(en progreso)_
- [ ] Backend / API REST _(próximamente)_

---

## 👤 Autor

**Alexis Escobar**  
[GitHub](https://github.com/alexidev23) · [LinkedIn](https://www.linkedin.com/in/alexis-escobar-95b491184/) · [Portafolio](https://portafolio-alexisdev.vercel.app/)
