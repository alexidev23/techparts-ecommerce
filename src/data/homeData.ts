import type { FeatureItem } from "@/types/homeTypes";
import { Headphones, Package, Shield, Truck } from "lucide-react";

export const FEATURES: FeatureItem[] = [
  {
    icon: Package,
    title: "Amplio Stock",
    description: "Miles de productos disponibles",
  },
  {
    icon: Truck,
    title: "Envío Rápido",
    description: "Entrega en 24-48 horas",
  },
  {
    icon: Shield,
    title: "Garantía",
    description: "6 meses en todos los productos",
  },
  {
    icon: Headphones,
    title: "Soporte",
    description: "Atención al cliente 24/7",
  },
];
