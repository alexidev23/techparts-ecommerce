import api from "@/lib/axios";

export interface FavoriteItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    imgPrincipal: string;
    stock: number;
    category: {
      name: string;
    };
  };
}

export const favoriteService = {
  // ─── Obtener favoritos ────────────────────────────────────────────────────
  async getMyFavorites(): Promise<FavoriteItem[]> {
    const response = await api.get<FavoriteItem[]>("/favorites");
    return response.data;
  },

  // ─── Agregar favorito ─────────────────────────────────────────────────────
  async add(productId: string): Promise<FavoriteItem> {
    const response = await api.post<FavoriteItem>("/favorites", { productId });
    return response.data;
  },

  // ─── Eliminar favorito ────────────────────────────────────────────────────
  async remove(productId: string): Promise<void> {
    await api.delete(`/favorites/${productId}`);
  },
};
