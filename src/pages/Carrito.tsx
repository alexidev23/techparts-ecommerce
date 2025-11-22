import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useCart } from '@/context/CartContext';

export default function Carrito() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const shipping = totalPrice >= 50000 ? 0 : 500;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-slate-300 dark:text-slate-700" />
            <h1 className="mt-6">Tu carrito está vacío</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Agrega productos a tu carrito para continuar
            </p>
            <Link to="/productos">
              <Button className="mt-6" size="lg">
                Explorar productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8">Carrito de compras</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.product.id}
                className="rounded-lg border bg-white p-4 dark:bg-slate-900 md:p-6"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    to={`/producto/${item.product.id}`}
                    className="shrink-0"
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-lg border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to={`/producto/${item.product.id}`}>
                        <h3 className="text-sm md:text-base hover:text-blue-600">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {item.product.category} • {item.product.brand}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-blue-600 dark:text-blue-400">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatPrice(item.product.price)} c/u
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h2 className="mb-6">Resumen del pedido</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} productos)
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Envío
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {totalPrice < 50000 && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Agrega {formatPrice(50000 - totalPrice)} más para envío gratis
                  </p>
                )}

                <Separator />

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="mt-6 w-full">
                  Finalizar compra
                </Button>
              </Link>

              <Link to="/productos">
                <Button variant="outline" size="lg" className="mt-3 w-full">
                  Seguir comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
