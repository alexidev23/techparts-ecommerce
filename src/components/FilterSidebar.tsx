import { useState } from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import type { FilterOptions } from "@/types";
import { useCategories } from "@/hook/useCategories";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClose?: () => void;
  brands: string[]; // ← prop nueva
}

type SortBy = "popular" | "price-asc" | "price-desc" | "newest";

export function FilterSidebar({
  onFilterChange,
  onClose,
  brands,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const { categories, loading, error } = useCategories();

  // ── Helpers ──────────────────────────────────────────────────────────────

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleCategoryChange = (name: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, name]
      : selectedCategories.filter((c) => c !== name);
    setSelectedCategories(updated);
    applyFilters({ categories: updated });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const updated = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);
    setSelectedBrands(updated);
    applyFilters({ brands: updated });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handlePriceCommit = () => {
    applyFilters({ priceRange });
  };

  const handleSortChange = (value: string) => {
    const validSort = value as SortBy;
    setSortBy(validSort);
    applyFilters({ sortBy: validSort });
  };

  const applyFilters = (updates: Partial<FilterOptions>) => {
    onFilterChange({
      brands: updates.brands ?? selectedBrands,
      categories: updates.categories ?? selectedCategories,
      priceRange: updates.priceRange ?? priceRange,
      sortBy: updates.sortBy ?? sortBy,
    });
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setExpandedCategories([]);
    setPriceRange([0, 150000]);
    setSortBy("popular");
    onFilterChange({
      brands: [],
      categories: [],
      priceRange: [0, 150000],
      sortBy: "popular",
    });
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Filtros</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        onClick={clearFilters}
        className="w-full"
      >
        Limpiar filtros
      </Button>

      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="text-sm">Ordenar por</h3>
        <RadioGroup value={sortBy} onValueChange={handleSortChange}>
          {[
            { value: "popular", label: "Más populares" },
            { value: "price-asc", label: "Precio: menor a mayor" },
            { value: "price-desc", label: "Precio: mayor a menor" },
            { value: "newest", label: "Más recientes" },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value} className="cursor-pointer text-sm">
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm">Rango de precio</h3>
        <div className="px-2 pt-2">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            max={150000}
            step={1000}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>${priceRange[0].toLocaleString("es-AR")}</span>
          <span>${priceRange[1].toLocaleString("es-AR")}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm">Categorías</h3>

        {loading && (
          <p className="text-sm text-slate-400">Cargando categorías...</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-1">
            {categories
              .filter((c) => c.status === "active")
              .map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const hasSubcategories = category.subcategories?.length > 0;

                return (
                  <div key={category.id}>
                    {/* Categoría principal */}
                    <div className="flex items-center space-x-2 py-1">
                      {/* Chevron para expandir/colapsar */}
                      <button
                        type="button"
                        onClick={() =>
                          hasSubcategories && toggleExpanded(category.id)
                        }
                        className={`p-0.5 ${hasSubcategories ? "cursor-pointer" : "invisible"}`}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3 text-slate-400" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                        )}
                      </button>

                      <Checkbox
                        id={`cat-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(
                            category.name,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`cat-${category.id}`}
                        className="cursor-pointer text-sm font-medium"
                      >
                        {category.name}
                      </Label>
                    </div>

                    {/* Subcategorías */}
                    {isExpanded && hasSubcategories && (
                      <div className="ml-6 space-y-1 border-l border-slate-200 dark:border-slate-700 pl-3">
                        {category.subcategories
                          .filter((s) => s.status === "active")
                          .map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center space-x-2 py-1"
                            >
                              <Checkbox
                                id={`sub-${sub.id}`}
                                checked={selectedCategories.includes(sub.name)}
                                onCheckedChange={(checked) =>
                                  handleCategoryChange(
                                    sub.name,
                                    checked as boolean,
                                  )
                                }
                              />
                              <Label
                                htmlFor={`sub-${sub.id}`}
                                className="cursor-pointer text-sm text-slate-600 dark:text-slate-400"
                              >
                                {sub.name}
                              </Label>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Brands — sin cambios, igual que antes */}
      <div className="space-y-3">
        <h3 className="text-sm">Marcas</h3>
        <div className="space-y-2">
          {brands
            .filter((b) => b !== "Todas")
            .map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="cursor-pointer text-sm"
                >
                  {brand}
                </Label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
