import api from "@/lib/axios";

export interface ProductFromAPI {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  brand: string;
  stock: number;
  rating: number | null;
  imgPrincipal: string;
  status: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  images: { id: string; url: string; order: number }[];
}

export const productService = {
  // ─── Obtener todos los productos ──────────────────────────────────────────
  async getAll(filters?: {
    category?: string;
    search?: string;
  }): Promise<ProductFromAPI[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.search) params.append("search", filters.search);

    const response = await api.get<ProductFromAPI[]>(
      `/products?${params.toString()}`,
    );
    return response.data;
  },

  // ─── Obtener producto por ID ──────────────────────────────────────────────
  async getById(id: string): Promise<ProductFromAPI> {
    const response = await api.get<ProductFromAPI>(`/products/${id}`);
    return response.data;
  },
};
