import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, ChevronLeft, Truck, Shield, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1>Producto no encontrado</h1>
        <Link to="/productos">
          <Button className="mt-4">Volver a productos</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} producto(s) agregado(s) al carrito`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/productos">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Volver a productos
            </Button>
          </Link>
        </div>

        {/* Product Detail */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-lg border bg-white dark:bg-slate-900">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.onSale && (
              <Badge
                variant="destructive"
                className="absolute left-4 top-4 shadow-lg"
              >
                Oferta
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {product.category}
              </p>
              <h1 className="mt-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  ({product.reviews} reseñas)
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl text-blue-600 dark:text-blue-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <p className="text-green-600 dark:text-green-400">
                  ✓ Stock disponible ({product.stock} unidades)
                </p>
              ) : (
                <p className="text-red-600 dark:text-red-400">
                  ✗ Sin stock
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm">Cantidad</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>

            {/* Features */}
            <div className="space-y-3 rounded-lg border bg-white p-4 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm">Envío gratis</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    En compras superiores a $50.000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm">Garantía de 6 meses</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cubrimos defectos de fábrica
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm">Devolución garantizada</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    30 días para cambios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specs">Especificaciones</TabsTrigger>
              <TabsTrigger value="shipping">Envío</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h3 className="mb-4">Descripción del producto</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {product.description}
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Este producto es compatible con {product.brand} y ha sido
                testeado para garantizar la máxima calidad y rendimiento.
                Incluye todo lo necesario para una instalación exitosa.
              </p>
            </TabsContent>
            <TabsContent value="specs" className="mt-6 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h3 className="mb-4">Especificaciones técnicas</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Marca:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Categoría:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Stock:</span>
                  <span>{product.stock} unidades</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Garantía:</span>
                  <span>6 meses</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h3 className="mb-4">Información de envío</h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <p>
                  • Envío estándar: 3-5 días hábiles - $500
                </p>
                <p>
                  • Envío express: 24-48 horas - $1.500
                </p>
                <p>
                  • Envío gratis en compras superiores a $50.000
                </p>
                <p className="mt-6">
                  Los pedidos realizados antes de las 14:00 se despachan el mismo día.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8">Productos relacionados</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
