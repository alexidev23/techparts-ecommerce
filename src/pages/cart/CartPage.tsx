import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatters";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const shipping = useMemo(() => (totalPrice >= 50000 ? 0 : 500), [totalPrice]);
  const total = useMemo(() => totalPrice + shipping, [totalPrice, shipping]);
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Helmet>
          <title>Carrito | Tu Tienda</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag
              className="mx-auto h-24 w-24 text-slate-300 dark:text-slate-700"
              aria-hidden="true"
            />
            <h1 className="mt-6 text-2xl font-bold">Tu carrito está vacío</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Agrega productos a tu carrito para continuar
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link to="/productos">Explorar productos</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>Carrito | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Carrito de compras</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <ul className="lg:col-span-2 space-y-4 list-none p-0">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="rounded-lg border bg-white p-4 dark:bg-slate-900 md:p-6"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    to={`/producto/${item.product.id}`}
                    className="shrink-0"
                    aria-label={`Ver detalle de ${item.product.name}`}
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-lg border">
                      <img
                        src={item.product.imgPrincipal}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        width={96}
                        height={96}
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to={`/producto/${item.product.id}`}>
                        <h2 className="text-sm font-medium hover:text-blue-600 md:text-base">
                          {item.product.name}
                        </h2>
                      </Link>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {item.product.category.name} • {item.product.brand}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Disminuir cantidad de ${item.product.name}`}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </Button>
                        <span
                          className="w-8 text-center text-sm"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Aumentar cantidad de ${item.product.name}`}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-medium text-blue-600 dark:text-blue-400">
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
                    aria-label={`Eliminar ${item.product.name} del carrito`}
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h2 className="mb-6 text-lg font-semibold">Resumen del pedido</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Subtotal ({totalItems}{" "}
                    {totalItems === 1 ? "producto" : "productos"})
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
                    Agrega {formatPrice(50000 - totalPrice)} más para envío
                    gratis
                  </p>
                )}

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Button asChild size="lg" className="mt-6 w-full">
                <Link to="/checkout">Finalizar compra</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-3 w-full"
              >
                <Link to="/productos">Seguir comprando</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
