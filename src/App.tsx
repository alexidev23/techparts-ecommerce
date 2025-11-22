import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home";
import Products from "./pages/Productos";
import ProductDetail from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/CartContext";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
