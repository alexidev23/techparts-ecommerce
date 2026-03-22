import api from "@/lib/axios";

export interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },
};
