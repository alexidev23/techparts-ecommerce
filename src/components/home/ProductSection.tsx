import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import type { ProductSectionProps } from "@/types/homeTypes";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductSection({
  title,
  description,
  linkTo,
  linkLabel,
  productList,
  favoriteIds = [],
}: ProductSectionProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <Link to={linkTo}>
          <Button variant="ghost">
            {linkLabel}
            <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 list-none p-0">
        {productList.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              isFavorite={favoriteIds.includes(product.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
