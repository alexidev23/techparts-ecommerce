export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  bestseller?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'newest';
}
