import type { products } from "@/data/products";
import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductSectionProps {
  title: string;
  description: string;
  linkTo: string;
  linkLabel: string;
  productList: typeof products;
}
