import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useRequireAuth() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const requireAuth = async (
    callback: () => void | Promise<void>,
    message?: string,
  ) => {
    if (!user) {
      toast.error(message ?? "Necesitás iniciar sesión para continuar");
      navigate("/login");
      return;
    }
    await callback();
  };

  return { requireAuth };
}
