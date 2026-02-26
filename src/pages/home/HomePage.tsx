import { Button } from "@/components/ui/button";
import { ChevronRight, Headphones, Package, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import HomeHeroImage from "@/assets/img/img-home1.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured);
  const bestsellerProducts = products.filter((p) => p.bestseller);
  const saleProducts = products.filter((p) => p.onSale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl">
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
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/productos?category=Ofertas">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white/10 sm:w-auto"
                  >
                    Ver ofertas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={HomeHeroImage}
                alt="Repuestos para celulares"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm">Amplio Stock</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Miles de productos disponibles
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm">Envío Rápido</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Entrega en 24-48 horas
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm">Garantía</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  6 meses en todos los productos
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm">Soporte</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Atención al cliente 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2>Productos Destacados</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Los repuestos más populares y de mejor calidad
            </p>
          </div>
          <Link to="/productos">
            <Button variant="ghost">
              Ver todos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="border-t bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2>Más Vendidos</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Los productos preferidos por nuestros clientes
              </p>
            </div>
            <Link to="/productos?sort=bestseller">
              <Button variant="ghost">
                Ver todos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bestsellerProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sales */}
      {saleProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2>Ofertas Especiales</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Aprovecha estos descuentos por tiempo limitado
              </p>
            </div>
            <Link to="/productos?sale=true">
              <Button variant="ghost">
                Ver todas
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl md:text-4xl">
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
    </div>
  );
}
