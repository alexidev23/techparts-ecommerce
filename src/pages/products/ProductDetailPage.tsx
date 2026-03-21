import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useRequireAuth } from "@/hook/useRequireAuth";
import { productService } from "@/services/productService";
import { favoriteService } from "@/services/favoriteService";
import { useAuth } from "@/hook/useAuth";
import { SHIPPING_FEATURES } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import type { Product } from "@/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { requireAuth } = useRequireAuth();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getById(id);
        setProduct(data);

        // Traemos productos relacionados por categoría
        const related = await productService.getAll({
          category: data.category.name,
        });
        setRelatedProducts(related.filter((p) => p.id !== id).slice(0, 4));
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const favorites = await favoriteService.getMyFavorites();
        const ids = favorites.map((f) => f.productId);
        setFavoriteIds(ids);
        if (id) setIsFavorite(ids.includes(id));
      } catch {
        // silencioso
      }
    };

    fetchFavorites();
  }, [user, id]);

  const discountPercent = useMemo(() => {
    if (!product?.discountPercent) return null;
    return product.discountPercent;
  }, [product]);

  const originalPrice = useMemo(() => {
    if (!product?.discountPercent) return null;
    return Math.round(product.price / (1 - product.discountPercent / 100));
  }, [product]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Cargando producto...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link to="/productos">
          <Button className="mt-4">Volver a productos</Button>
        </Link>
      </main>
    );
  }

  const handleAddToCart = async () => {
    await requireAuth(() => {
      addToCart(product, quantity);
      toast.success(`${quantity} producto(s) agregado(s) al carrito`);
    }, "Necesitás iniciar sesión para agregar productos al carrito");
  };

  const handleToggleFavorite = async () => {
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

  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <>
      <Helmet>
        <title>{product.category.name} | Tu Tienda</title>
        <meta
          name="description"
          content={`${product.description} Garantía de 6 meses y envío rápido.`}
        />
        <link
          rel="canonical"
          href={`https://tutienda.com/productos/${product.id}`}
        />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} | Tu Tienda`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imgPrincipal} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.imgPrincipal,
            brand: { "@type": "Brand", name: product.brand },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "ARS",
              availability:
                product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `https://tutienda.com/productos/${product.id}`,
            },
            ...(product.rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
              },
            }),
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link to="/productos">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
                Volver a productos
              </Button>
            </Link>
          </nav>

          {/* Product Detail */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg border bg-white dark:bg-slate-900">
              <div className="aspect-square">
                <img
                  src={product.imgPrincipal}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  width={600}
                  height={600}
                  loading="eager"
                />
              </div>
              {discountPercent && (
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
                  {product.category.name}
                </p>
                <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

                {product.rating && (
                  <div className="mt-3 flex items-center gap-2">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`Calificación: ${product.rating} de 5 estrellas`}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          className={`h-5 w-5 ${
                            i < Math.floor(Number(product.rating))
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span aria-hidden="true">
                      {Number(product.rating).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatPrice(product.price)}
                </span>
                {originalPrice && discountPercent && (
                  <>
                    <span className="text-xl text-slate-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                    <Badge variant="destructive">{discountPercent}% OFF</Badge>
                  </>
                )}
              </div>

              {/* Stock */}
              <p
                className={
                  product.stock > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
                aria-live="polite"
              >
                {product.stock > 0
                  ? `✓ Stock disponible (${product.stock} unidades)`
                  : "✗ Sin stock"}
              </p>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity === 1}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <span
                    id="quantity"
                    className="w-12 text-center"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart + Favorite */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                  Agregar al carrito
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleFavorite}
                  disabled={loadingFavorite}
                  aria-label={
                    isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
                  }
                  className={
                    isFavorite
                      ? "border-red-500 text-red-500 hover:bg-red-50"
                      : ""
                  }
                >
                  <Star
                    className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                    aria-hidden="true"
                  />
                </Button>
              </div>

              {/* Shipping Features */}
              <ul className="space-y-3 rounded-lg border bg-white p-4 dark:bg-slate-900 list-none">
                {SHIPPING_FEATURES.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex items-center gap-3">
                    <Icon
                      className="h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tabs */}
          <section aria-label="Detalles del producto" className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                <TabsTrigger value="shipping">Envío</TabsTrigger>
              </TabsList>

              <TabsContent
                value="description"
                className="mt-6 rounded-lg border bg-white p-6 dark:bg-slate-900"
              >
                <h2 className="mb-4 text-lg font-semibold">
                  Descripción del producto
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {product.description}
                </p>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  Este producto es compatible con {product.brand} y ha sido
                  testeado para garantizar la máxima calidad y rendimiento.
                  Incluye todo lo necesario para una instalación exitosa.
                </p>
              </TabsContent>

              <TabsContent
                value="specs"
                className="mt-6 rounded-lg border bg-white p-6 dark:bg-slate-900"
              >
                <h2 className="mb-4 text-lg font-semibold">
                  Especificaciones técnicas
                </h2>
                <dl className="space-y-3">
                  {[
                    { label: "Marca", value: product.brand },
                    { label: "Categoría", value: product.category.name },
                    { label: "Stock", value: `${product.stock} unidades` },
                    { label: "Garantía", value: "6 meses" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between border-b pb-2"
                    >
                      <dt className="text-slate-600 dark:text-slate-400">
                        {label}:
                      </dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </TabsContent>

              <TabsContent
                value="shipping"
                className="mt-6 rounded-lg border bg-white p-6 dark:bg-slate-900"
              >
                <h2 className="mb-4 text-lg font-semibold">
                  Información de envío
                </h2>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400 list-none">
                  <li>• Envío estándar: 3-5 días hábiles — $500</li>
                  <li>• Envío express: 24-48 horas — $1.500</li>
                  <li>• Envío gratis en compras superiores a $50.000</li>
                </ul>
                <p className="mt-6 text-slate-600 dark:text-slate-400">
                  Los pedidos realizados antes de las 14:00 se despachan el
                  mismo día.
                </p>
              </TabsContent>
            </Tabs>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section aria-label="Productos relacionados" className="mt-16">
              <h2 className="mb-8 text-2xl font-semibold">
                Productos relacionados
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
                {relatedProducts.map((related) => (
                  <li key={related.id}>
                    <ProductCard
                      product={related}
                      isFavorite={favoriteIds.includes(related.id)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
