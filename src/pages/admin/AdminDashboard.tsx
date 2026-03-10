import AccountsTab from "@/components/AdminDashboard/tabs/accountTab/AccountsTab";
import CategoriesTab from "@/components/AdminDashboard/tabs/categoriesTab/CategoriesTab";
import GeneralTab from "@/components/AdminDashboard/tabs/generalTabs/GeneralTab";
import OrdersTab from "@/components/AdminDashboard/tabs/ordersTabs/OrdersTab";
import ProductsTabs from "@/components/AdminDashboard/tabs/productsTabs/ProductsTab";
import SponsorsTab from "@/components/AdminDashboard/tabs/sponsorsTab/SponsorsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartColumn,
  CircleStar,
  Layers,
  Package2,
  ShoppingBag,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="w-full min-h-screen">
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Panel de Administración
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gestiona productos, pedidos y usuarios de tu tienda.
        </p>
      </header>

      <section className="w-full bg-gray-200 dark:bg-gray-900 ">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <Tabs defaultValue="general" className="w-full">
            {/* TABS */}
            <TabsList
              className="
              w-full
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-6
              gap-2
              bg-muted
              rounded-lg
              h-auto!
            "
            >
              <TabsTrigger
                value="general"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <ChartColumn className="h-4 w-4" />
                General
              </TabsTrigger>

              <TabsTrigger
                value="cuentas"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <Users className="h-4 w-4" />
                Cuentas
              </TabsTrigger>

              <TabsTrigger
                value="pedidos"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                Pedidos
              </TabsTrigger>

              <TabsTrigger
                value="productos"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <Package2 className="h-4 w-4" />
                Productos
              </TabsTrigger>

              <TabsTrigger
                value="categorias"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <Layers className="h-4 w-4" />
                Categorías
              </TabsTrigger>

              <TabsTrigger
                value="sponsors"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <CircleStar className="h-4 w-4" />
                Sponsors
              </TabsTrigger>
            </TabsList>

            {/* CONTENIDO */}

            <TabsContent value="general" className="mt-6 lg:mt-0">
              <GeneralTab />
            </TabsContent>

            <TabsContent value="cuentas" className="mt-6 lg:mt-0">
              <AccountsTab />
            </TabsContent>

            <TabsContent value="pedidos" className="mt-6 lg:mt-0">
              <OrdersTab />
            </TabsContent>

            <TabsContent value="productos" className="mt-6 lg:mt-0">
              <ProductsTabs />
            </TabsContent>

            <TabsContent value="categorias" className="mt-6 lg:mt-0">
              <CategoriesTab />
            </TabsContent>

            <TabsContent value="sponsors" className="mt-6 lg:mt-0">
              <SponsorsTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
