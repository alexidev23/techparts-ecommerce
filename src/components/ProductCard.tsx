import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Product } from '@/types';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Producto agregado al carrito');
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  return (
    <Link to={`/producto/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg dark:bg-slate-900">
        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.onSale && (
            <Badge variant="destructive" className="shadow-sm">
              Oferta
            </Badge>
          )}
          {product.bestseller && (
            <Badge className="bg-blue-600 shadow-sm hover:bg-blue-700">
              Más vendido
            </Badge>
          )}
        </div>

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="mt-1 line-clamp-2 min-h-10">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
          </p>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-3 w-full"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al carrito
          </Button>
        </div>
      </div>
    </Link>
  );
}
