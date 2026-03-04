import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

import type { Product, FilterOptions } from "@/types";
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

    // Search from URL
    const searchQuery = searchParams.get("search")?.toLowerCase();
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery),
      );
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

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Read search param
  const searchQuery = searchParams.get("search");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* <Helmet>
        <title>Productos | TechParts</title>
        <meta
          name="description"
          content="Explora nuestra selección de repuestos y accesorios tecnológicos al mejor precio."
        />
      </Helmet> */}

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <header className="mb-8">
          <h1
            id="products-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Productos
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Explora nuestra amplia selección de repuestos y accesorios
          </p>
        </header>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside
            className="hidden w-64 shrink-0 lg:block"
            aria-label="Filtros de productos"
          >
            <div className="sticky top-24 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Products Section */}
          <section className="flex-1" aria-labelledby="products-heading">
            {/* Mobile Filter Button */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <p
                className="text-slate-600 dark:text-slate-400"
                aria-live="polite"
              >
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
              <p
                className="text-slate-600 dark:text-slate-400"
                aria-live="polite"
              >
                Mostrando {filteredProducts.length} productos
              </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-75 items-center justify-center rounded-lg border bg-white dark:bg-slate-900">
                <div className="text-center">
                  {searchQuery ? (
                    <p className="text-slate-600 dark:text-slate-400">
                      El producto "
                      <span className="font-medium">{searchQuery}</span>" no se
                      encuentra disponible por el momento.
                    </p>
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400">
                      No se encontraron productos con los filtros seleccionados.
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
