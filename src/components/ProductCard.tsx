import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useRequireAuth } from "@/hook/useRequireAuth";
import { favoriteService } from "@/services/favoriteService";
import { formatPrice } from "@/utils/formatters";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  isFavorite: initialFavorite = false,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const { addToCart } = useCart();
  const { requireAuth } = useRequireAuth();
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const isOnSale = product.discountPercent > 0;
  const originalPrice = isOnSale
    ? product.price / (1 - product.discountPercent / 100)
    : null;

  // Sincronizar si cambia la prop
  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    requireAuth(() => {
      addToCart(product);
      toast.success("Producto agregado al carrito");
    }, "Necesitás iniciar sesión para agregar productos al carrito");
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    await requireAuth(async () => {
      setLoadingFavorite(true);
      try {
        if (isFavorite) {
          await favoriteService.remove(product.id);
          setIsFavorite(false);
          toast.success("Eliminado de favoritos");
        } else {
          await favoriteService.add(product.id);
          setIsFavorite(true);
          toast.success("Agregado a favoritos");
        }
      } catch {
        toast.error("Error al actualizar favoritos");
      } finally {
        setLoadingFavorite(false);
      }
    }, "Necesitás iniciar sesión para agregar favoritos");
  };

  return (
    <Link to={`/producto/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg dark:bg-slate-900">
        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {isOnSale && (
            <Badge variant="destructive" className="shadow-sm">
              Oferta
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          disabled={loadingFavorite}
          className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-slate-400 hover:text-red-500"
            }`}
            aria-hidden="true"
          />
        </Button>

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.imgPrincipal}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {product.category.name}
          </p>

          <h3 className="mt-1 line-clamp-2 min-h-10">{product.name}</h3>

          {product.rating && (
            <div className="mt-2 flex items-center gap-1">
              <Star
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                aria-hidden="true"
              />
              <span className="text-sm">
                {Number(product.rating).toFixed(1)}
              </span>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(Math.round(originalPrice))}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
          </p>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-3 w-full"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Agregar al carrito
          </Button>
        </div>
      </div>
    </Link>
  );
}
