import api from "@/lib/axios";
import type { User } from "@/types/user";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  // ─── Login ───────────────────────────────────────────────────────────────
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user)); // guardamos el usuario
    return response.data;
  },

  // ─── Registro ────────────────────────────────────────────────────────────
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user)); // guardamos el usuario
    return response.data;
  },

  // ─── Logout ──────────────────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // limpiamos el usuario también
  },

  // ─── Obtener usuario actual ───────────────────────────────────────────────
  getCurrentUser(): User | null {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      // Verificamos que el token no haya expirado
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }

      // Obtenemos el usuario guardado
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
};
