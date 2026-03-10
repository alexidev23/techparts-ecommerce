export type OrderStatus = "cancelado" | "entregado" | "enviado" | "procesando";

export interface OrderItem {
  order: string;
  name: string;
  status: OrderStatus;
}

export interface ItemListCardProps {
  title: string;
  items: OrderItem[];
}

export interface LowProductItem {
  id: string;
  name: string;
  stock: number;
}

export interface LowProductProps {
  title: string;
  items: LowProductItem[];
}

export interface Order {
  id: string;
  clientName: string; // nombre del cliente aplanado desde User
  date: string;
  total: number;
  status: OrderStatus;
}
