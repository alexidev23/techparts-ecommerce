export type CategoryStatus = "activo" | "inactivo";

export interface Category {
  id: string;
  name: string;
  subcategoryCount: number; // cantidad de subcategorías
  totalProducts: number; // total de productos en esta categoría
  status: CategoryStatus;
}

export interface Subcategory {
  id: string;
  name: string;
  parentCategory: string; // nombre de la categoría principal
  totalProducts: number;
  status: CategoryStatus;
}
