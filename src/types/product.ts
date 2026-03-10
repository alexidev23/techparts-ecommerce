import type { LucideIcon } from "lucide-react";

export type ProductStatus = "activo" | "inactivo";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export interface ShippingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}
