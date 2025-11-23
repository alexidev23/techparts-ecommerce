import { useState } from 'react';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { brands, categories } from '../data/products';
import type { FilterOptions } from '@/types';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClose?: () => void;
}

export function FilterSidebar({ onFilterChange, onClose }: FilterSidebarProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [sortBy, setSortBy] = useState<string>('popular');

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter(b => b !== brand);
    setSelectedBrands(newBrands);
    applyFilters({ brands: newBrands });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(newCategories);
    applyFilters({ categories: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handlePriceCommit = () => {
    applyFilters({ priceRange });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters({ sortBy: value });
  };

  const applyFilters = (updates: any) => {
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
    setPriceRange([0, 150000]);
    setSortBy('popular');
    onFilterChange({
      brands: [],
      categories: [],
      priceRange: [0, 150000],
      sortBy: 'popular',
    });
  };

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
      <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
        Limpiar filtros
      </Button>

      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="text-sm">Ordenar por</h3>
        <RadioGroup value={sortBy} onValueChange={handleSortChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="popular" id="popular" />
            <Label htmlFor="popular" className="cursor-pointer text-sm">
              Más populares
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-asc" id="price-asc" />
            <Label htmlFor="price-asc" className="cursor-pointer text-sm">
              Precio: menor a mayor
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-desc" id="price-desc" />
            <Label htmlFor="price-desc" className="cursor-pointer text-sm">
              Precio: mayor a menor
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest" className="cursor-pointer text-sm">
              Más recientes
            </Label>
          </div>
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
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>${priceRange[0].toLocaleString('es-AR')}</span>
          <span>${priceRange[1].toLocaleString('es-AR')}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm">Categorías</h3>
        <div className="space-y-2">
          {categories.filter(c => c !== 'Todos').map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label
                htmlFor={`category-${category}`}
                className="cursor-pointer text-sm"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="text-sm">Marcas</h3>
        <div className="space-y-2">
          {brands.filter(b => b !== 'Todas').map(brand => (
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
