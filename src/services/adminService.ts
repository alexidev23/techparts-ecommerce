import api from "@/lib/axios";
import type { OrderStatus } from "@/types/orders";

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: {
    order: string;
    name: string;
    status: OrderStatus;
  }[];
  lowStockProducts: {
    id: string;
    name: string;
    stock: number;
  }[];
}

// Agregá esta interface
export interface AdminUser {
  id?: string;
  name?: string;
  email: string;
  role: "admin" | "user";
  status?: "active" | "inactive";
  createdAt: string;
}

export interface AdminOrder {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentId: string | null;
  createdAt: string;
  user: {
    id: string;
    name?: string;
    email: string;
  };
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      imgPrincipal: string;
      price: number;
    };
  }[];
}

export interface AdminProduct {
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

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const response = await api.get<AdminStats>("/admin/stats");
    return response.data;
  },

  // Agregá este método al objeto adminService
  async getUsers(): Promise<AdminUser[]> {
    const response = await api.get<AdminUser[]>("/admin/users");
    return response.data;
  },

  async updateUser(
    id: string,
    data: {
      name?: string;
      role?: "admin" | "user";
      status?: "active" | "inactive";
    },
  ): Promise<AdminUser> {
    const response = await api.put<AdminUser>(`/admin/users/${id}`, data);
    return response.data;
  },

  // Agregá este método al objeto adminService
  async getOrders(): Promise<AdminOrder[]> {
    const response = await api.get<AdminOrder[]>("/admin/orders");
    return response.data;
  },

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
  ): Promise<AdminOrder> {
    const response = await api.put<AdminOrder>(`/orders/${id}/status`, {
      status,
    });
    return response.data;
  },

  // Agregá estos métodos al objeto adminService
  async getProducts(): Promise<AdminProduct[]> {
    const response = await api.get<AdminProduct[]>("/admin/products");
    return response.data;
  },

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    brand: string;
    stock: number;
    imgPrincipal: string;
    categoryId: string;
    discountPercent?: number;
  }): Promise<AdminProduct> {
    const response = await api.post<AdminProduct>("/products", data);
    return response.data;
  },

  async updateProduct(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      brand: string;
      stock: number;
      imgPrincipal: string;
      categoryId: string;
      discountPercent: number;
      status: string;
    }>,
  ): Promise<AdminProduct> {
    const response = await api.put<AdminProduct>(`/products/${id}`, data);
    return response.data;
  },
};
