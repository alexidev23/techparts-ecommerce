export interface Product {
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

export interface FilterOptions {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  sortBy: "popular" | "price-asc" | "price-desc" | "newest";
}

export interface CartItem {
  product: Product;
  quantity: number;
}
