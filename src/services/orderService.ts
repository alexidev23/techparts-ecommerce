import api from "@/lib/axios";
import type { OrderStatus } from "@/types/orders";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    imgPrincipal: string;
  };
}

export interface Order {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  createdAt: string;
  items: OrderItem[];
}

export const orderService = {
  // ─── Mis pedidos ──────────────────────────────────────────────────────────
  async getMyOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>("/orders/my-orders");
    return response.data;
  },
};
