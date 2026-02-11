import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailPage = lazy(
  () => import("@/pages/products/ProductDetailPage"),
);
const CartPage = lazy(() => import("@/pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/checkout/CheckoutPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/productos", element: <ProductsPage /> },
      { path: "/producto/:id", element: <ProductDetailPage /> },
      { path: "/carrito", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
