import { Package, Shield, Truck } from "lucide-react";
import type { ShippingFeature } from "@/types/product";

export const SHIPPING_FEATURES: ShippingFeature[] = [
  {
    icon: Truck,
    title: "Envío gratis",
    description: "En compras superiores a $50.000",
  },
  {
    icon: Shield,
    title: "Garantía de 6 meses",
    description: "Cubrimos defectos de fábrica",
  },
  {
    icon: Package,
    title: "Devolución garantizada",
    description: "30 días para cambios",
  },
];
