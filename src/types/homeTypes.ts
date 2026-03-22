import type { LucideIcon } from "lucide-react";
import type { Product } from "@/types";

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
  productList: Product[];
  favoriteIds?: string[];
}
