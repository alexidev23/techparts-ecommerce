import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { Helmet } from "react-helmet-async";

import type { Product, FilterOptions } from "@/types";
import { FilterSidebar } from "@/components/FilterSidebar";
import { productService } from "@/services/productService";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useAuth } from "@/hook/useAuth";
import { favoriteService } from "@/services/favoriteService";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    categories: [],
    priceRange: [0, 150000],
    sortBy: "popular",
  });

  const searchQuery = searchParams.get("search");
  const urlCategory = searchParams.get("category");

  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const favorites = await favoriteService.getMyFavorites();
        setFavoriteIds(favorites.map((f) => f.productId));
      } catch {
        // silencioso
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getAll({
          category: urlCategory ?? undefined,
          search: searchQuery ?? undefined,
        });
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [urlCategory, searchQuery]);

  const filteredProducts = useMemo<Product[]>(() => {
    let filtered = [...products];

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category.name),
      );
    }

    // Price range
    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    // Sort
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
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
    }

    return filtered;
  }, [filters, products]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>Productos | Tu Tienda</title>
        <meta
          name="description"
          content="Explorá nuestra selección de repuestos y accesorios para smartphones. Filtrá por marca, categoría y precio."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Productos | Tu Tienda" />
        <meta
          property="og:description"
          content="Explorá nuestra selección de repuestos y accesorios para smartphones."
        />
        <link rel="canonical" href="https://tutienda.com/productos" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
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
            <div className="mb-6 flex items-center justify-between">
              <p
                className="text-slate-600 dark:text-slate-400"
                aria-live="polite"
              >
                {loading
                  ? "Cargando productos..."
                  : filteredProducts.length === 1
                    ? "1 producto"
                    : `${filteredProducts.length} productos`}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
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

            {loading ? (
              <div className="flex min-h-75 items-center justify-center rounded-lg border bg-white dark:bg-slate-900">
                <p className="text-slate-600 dark:text-slate-400">
                  Cargando productos...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 list-none p-0">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard
                      product={product}
                      isFavorite={favoriteIds.includes(product.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="flex min-h-75 items-center justify-center rounded-lg border bg-white dark:bg-slate-900"
                role="status"
                aria-live="polite"
              >
                <p className="text-center text-slate-600 dark:text-slate-400">
                  {searchQuery ? (
                    <>
                      El producto "
                      <span className="font-medium">{searchQuery}</span>" no se
                      encuentra disponible por el momento.
                    </>
                  ) : (
                    "No se encontraron productos con los filtros seleccionados."
                  )}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
