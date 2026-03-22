import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HomeHeroImage from "@/assets/img/img-home1.jpg";
import { FEATURES } from "@/data/homeData";
import { FeatureCard } from "@/components/home/FeatureCard";
import { ProductSection } from "@/components/home/ProductSection";
import { productService } from "@/services/productService";
import { favoriteService } from "@/services/favoriteService";
import { useAuth } from "@/hook/useAuth";
import type { Product } from "@/types";

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

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

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const bestsellerProducts = useMemo(() => products.slice(4, 8), [products]);

  const saleProducts = useMemo(
    () => products.filter((p) => p.discountPercent > 0),
    [products],
  );

  return (
    <>
      <Helmet>
        <title>Repuestos y Accesorios para Celulares | Tu Tienda</title>
        <meta
          name="description"
          content="Encontrá repuestos y accesorios para tu smartphone con garantía de 6 meses y envío en 24-48 horas. Pantallas, baterías, cargadores y más."
        />
        <meta
          name="keywords"
          content="repuestos celulares, accesorios smartphone, pantallas, baterías, cargadores"
        />
        <link rel="canonical" href="https://tutienda.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tutienda.com/" />
        <meta
          property="og:title"
          content="Repuestos y Accesorios para Celulares | Tu Tienda"
        />
        <meta
          property="og:description"
          content="Encontrá repuestos y accesorios para tu smartphone con garantía de 6 meses y envío en 24-48 horas."
        />
        <meta property="og:image" content={HomeHeroImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Tu Tienda",
            description:
              "Repuestos y accesorios para smartphones con garantía y envío rápido.",
            url: "https://tutienda.com",
            image: HomeHeroImage,
            priceRange: "$$",
            telephone: "",
          })}
        </script>
      </Helmet>

      <main>
        {/* Hero */}
        <section
          aria-label="Presentación de la tienda"
          className="relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 text-white"
        >
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                  Repuestos y Accesorios para tu Smartphone
                </h1>
                <p className="text-lg text-blue-100 md:text-xl">
                  Encuentra todo lo que necesitas para reparar o personalizar tu
                  celular. Calidad garantizada y envío rápido.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/productos">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      Ver productos
                      <ChevronRight
                        className="ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Button>
                  </Link>
                  <Link to="/productos?category=Ofertas">
                    <Button
                      size="lg"
                      className="w-full bg-blue-500 text-white hover:bg-white/10 sm:w-auto hover:border"
                    >
                      Ver ofertas
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={HomeHeroImage}
                  alt="Variedad de repuestos y accesorios para smartphones"
                  className="rounded-lg shadow-2xl"
                  width={600}
                  height={400}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          aria-label="Beneficios de la tienda"
          className="border-b bg-slate-50 dark:bg-slate-900"
        >
          <div className="container mx-auto px-4 py-12">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
              {FEATURES.map((feature) => (
                <li key={feature.title}>
                  <FeatureCard {...feature} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section aria-label="Productos destacados">
            <ProductSection
              title="Productos Destacados"
              description="Los repuestos más populares y de mejor calidad"
              linkTo="/productos"
              linkLabel="Ver todos"
              productList={featuredProducts}
              favoriteIds={favoriteIds}
            />
          </section>
        )}

        {/* Bestsellers */}
        {bestsellerProducts.length > 0 && (
          <section
            aria-label="Productos más vendidos"
            className="border-t bg-slate-50 dark:bg-slate-900"
          >
            <ProductSection
              title="Más Vendidos"
              description="Los productos preferidos por nuestros clientes"
              linkTo="/productos"
              linkLabel="Ver todos"
              productList={bestsellerProducts}
              favoriteIds={favoriteIds}
            />
          </section>
        )}

        {/* Sales */}
        {saleProducts.length > 0 && (
          <section aria-label="Ofertas especiales">
            <ProductSection
              title="Ofertas Especiales"
              description="Aprovecha estos descuentos por tiempo limitado"
              linkTo="/productos"
              linkLabel="Ver todas"
              productList={saleProducts}
              favoriteIds={favoriteIds}
            />
          </section>
        )}

        {/* CTA */}
        <section
          aria-label="Contacto"
          className="border-t bg-blue-600 text-white"
        >
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="mb-8 text-lg text-blue-100">
                Contáctanos y te ayudaremos a encontrar el repuesto o accesorio
                perfecto para tu dispositivo.
              </p>
              <Button size="lg" variant="secondary">
                Contactar ahora
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
