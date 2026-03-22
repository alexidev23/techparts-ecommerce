import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
  ChartColumn,
  CircleStar,
  Layers,
  Package2,
  ShoppingBag,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsTab from "@/components/AdminDashboard/tabs/accountTab/AccountsTab";
import CategoriesTab from "@/components/AdminDashboard/tabs/categoriesTab/CategoriesTab";
import GeneralTab from "@/components/AdminDashboard/tabs/generalTabs/GeneralTab";
import OrdersTab from "@/components/AdminDashboard/tabs/ordersTabs/OrdersTab";
import ProductsTabs from "@/components/AdminDashboard/tabs/productsTabs/ProductsTab";
import SponsorsTab from "@/components/AdminDashboard/tabs/sponsorsTab/SponsorsTab";
import {
  adminService,
  type AdminCategory,
  type AdminOrder,
  type AdminProduct,
  type AdminStats,
  type AdminSubcategory,
  type AdminUser,
} from "@/services/adminService";
import { useSearchParams } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────

interface TabItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { value: "general", label: "General", icon: ChartColumn },
  { value: "cuentas", label: "Cuentas", icon: Users },
  { value: "pedidos", label: "Pedidos", icon: ShoppingBag },
  { value: "productos", label: "Productos", icon: Package2 },
  { value: "categorias", label: "Categorías", icon: Layers },
  { value: "sponsors", label: "Sponsors", icon: CircleStar },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "general";
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [adminCategories, setAdminCategories] = useState<AdminCategory[]>([]);
  const [adminSubcategories, setAdminSubcategories] = useState<
    AdminSubcategory[]
  >([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          statsData,
          usersData,
          ordersData,
          productsData,
          categoriesData,
          subcategoriesData,
        ] = await Promise.all([
          adminService.getStats(),
          adminService.getUsers(),
          adminService.getOrders(),
          adminService.getProducts(),
          adminService.getCategories(),
          adminService.getSubcategories(),
        ]);
        setStats(statsData);
        setUsers(usersData);
        setOrders(ordersData);
        setAdminProducts(productsData);
        setAdminCategories(categoriesData);
        setAdminSubcategories(subcategoriesData);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const TAB_CONTENT: Record<string, React.ReactNode> = {
    general: <GeneralTab stats={stats} loading={loading} />,
    cuentas: <AccountsTab users={users} onUsersChange={setUsers} />,
    pedidos: <OrdersTab orders={orders} onOrdersChange={setOrders} />,
    productos: (
      <ProductsTabs
        products={adminProducts}
        onProductsChange={setAdminProducts}
      />
    ),
    categorias: (
      <CategoriesTab
        categories={adminCategories}
        subcategories={adminSubcategories}
        onCategoriesChange={setAdminCategories}
        onSubcategoriesChange={setAdminSubcategories}
      />
    ),
    sponsors: <SponsorsTab />,
  };

  return (
    <>
      <Helmet>
        <title>Panel de Administración | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen w-full">
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Panel de Administración
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gestiona productos, pedidos y usuarios de tu tienda.
          </p>
        </header>

        <section
          aria-label="Panel de administración"
          className="w-full bg-gray-200 dark:bg-gray-900"
        >
          <div className="container mx-auto max-w-7xl px-4 py-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setSearchParams({ tab: value })}
              className="w-full"
            >
              <TabsList
                className="
                  h-auto! w-full grid grid-cols-2 gap-2
                  rounded-lg bg-muted
                  md:grid-cols-3 lg:grid-cols-6
                "
              >
                {TABS.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex w-full items-center justify-center gap-2 text-sm"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {TABS.map(({ value }) => (
                <TabsContent key={value} value={value} className="mt-6 lg:mt-0">
                  {TAB_CONTENT[value]}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
}
