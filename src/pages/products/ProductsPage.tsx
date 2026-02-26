import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

import type { Product } from "@/types";
import type { FilterOptions } from "@/types";
import { FilterSidebar } from "@/components/FilterSidebar";
import { products } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    categories: [],
    priceRange: [0, 150000],
    sortBy: "popular",
  });

  const applyFilters = () => {
    let filtered = [...products];

    // Category from URL
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      filtered = filtered.filter((p) => p.category === urlCategory);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category),
      );
    }

    // Price range
    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    // Sort options
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.reverse();
        break;
      case "popular":
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchParams]);

  // CORREGIDO: ya no usa `any`
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1>Productos</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Explora nuestra amplia selección de repuestos y accesorios
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <p className="text-slate-600 dark:text-slate-400">
                {filteredProducts.length} productos
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar onFilterChange={handleFilterChange} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop count */}
            <div className="mb-6 hidden lg:block">
              <p className="text-slate-600 dark:text-slate-400">
                Mostrando {filteredProducts.length} productos
              </p>
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-100 items-center justify-center rounded-lg border bg-white dark:bg-slate-900">
                <div className="text-center">
                  <p className="text-slate-600 dark:text-slate-400">
                    No se encontraron productos con los filtros seleccionados
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() =>
                      setFilters({
                        brands: [],
                        categories: [],
                        priceRange: [0, 150000],
                        sortBy: "popular",
                      })
                    }
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
