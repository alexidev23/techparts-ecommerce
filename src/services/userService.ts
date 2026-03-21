import api from "@/lib/axios";
import type { User } from "@/types/user";

export const userService = {
  // ─── Obtener perfil ───────────────────────────────────────────────────────
  async getProfile(): Promise<User> {
    const response = await api.get<User>("/auth/profile");
    return response.data;
  },

  // ─── Actualizar perfil ────────────────────────────────────────────────────
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>("/auth/profile", data);
    // Actualizamos el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },
};
