import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const CreateAccountPage = lazy(() => import("@/pages/auth/CreateAcountPage"));

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailPage = lazy(
  () => import("@/pages/products/ProductDetailPage"),
);
const CartPage = lazy(() => import("@/pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/checkout/CheckoutPage"));
const Help = lazy(() => import("@/pages/help/Help"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const UserProfilePage = lazy(() => import("@/pages/user/UserProfilePage"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

// Payment pages
const PaymentSuccessPage = lazy(
  () => import("@/pages/payment/PaymentSuccessPage"),
);
const PaymentPendingPage = lazy(
  () => import("@/pages/payment/PaymentPendingPage"),
);
const PaymentFailurePage = lazy(
  () => import("@/pages/payment/PaymentFailurePage"),
);

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/crear-cuenta", element: <CreateAccountPage /> },
      { path: "/productos", element: <ProductsPage /> },
      { path: "/producto/:id", element: <ProductDetailPage /> },
      { path: "/carrito", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/ayuda", element: <Help /> },

      // Rutas de resultado de pago (Mercado Pago)
      { path: "/pago/exitoso", element: <PaymentSuccessPage /> },
      { path: "/pago/pendiente", element: <PaymentPendingPage /> },
      { path: "/pago/error", element: <PaymentFailurePage /> },

      {
        path: "/perfil",
        element: (
          <ProtectedRoute role="user">
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
