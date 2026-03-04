import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/hook/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  role?: "admin" | "user";
};

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { user } = useAuth();

  // Usuario no logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Usuario logueado pero sin el rol requerido
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
