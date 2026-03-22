export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: string;
  name: string;
  status: CategoryStatus;
  subcategories: Subcategory[];
  _count: { products: number };
}

export interface Subcategory {
  id: string;
  name: string;
  status: CategoryStatus;
  categoryId: string;
  category?: { id: string; name: string };
  _count?: { products: number };
}
