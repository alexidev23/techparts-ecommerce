import type { LucideIcon } from "lucide-react";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

import StatisticsCard from "./StatisticsCard";
import DataListCard from "./DataListCard";
import LowStockProducts from "./LowStockProducts";
import type { AdminStats } from "@/services/adminService";
import { formatPrice } from "@/utils/formatters";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatisticsCardData {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName: string;
}

interface GeneralTabProps {
  stats: AdminStats | null;
  loading: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GeneralTab({ stats, loading }: GeneralTabProps) {
  if (loading) {
    return (
      <section className="mt-6">
        <p className="text-sm text-gray-500">Cargando estadísticas...</p>
      </section>
    );
  }

  const CARDS_STATISTICS: StatisticsCardData[] = [
    {
      title: "Usuarios",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      iconClassName: "h-10 w-10 text-blue-500",
    },
    {
      title: "Pedidos",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingBag,
      iconClassName: "h-10 w-10 text-green-500",
    },
    {
      title: "Productos",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      iconClassName: "h-10 w-10 text-purple-500",
    },
    {
      title: "Ingresos",
      value: formatPrice(stats?.totalRevenue ?? 0),
      icon: DollarSign,
      iconClassName: "h-10 w-10 text-yellow-500",
    },
  ];

  return (
    <section
      aria-label="Resumen general"
      className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-3"
    >
      {/* Statistics Cards */}
      <ul className="col-span-2 flex items-center justify-between gap-4 rounded-lg list-none p-0">
        {CARDS_STATISTICS.map(({ title, value, icon: Icon, iconClassName }) => (
          <li key={title} className="flex-1">
            <StatisticsCard
              title={title}
              value={value}
              icon={<Icon className={iconClassName} aria-hidden="true" />}
            />
          </li>
        ))}
      </ul>

      {/* Recent Orders */}
      <div className="row-span-3 row-start-2">
        <DataListCard
          title="Pedidos Recientes"
          items={stats?.recentOrders ?? []}
        />
      </div>

      {/* Low Stock Products */}
      <div className="row-span-3 row-start-2">
        <LowStockProducts
          title="Productos con Bajo Stock"
          items={stats?.lowStockProducts ?? []}
        />
      </div>
    </section>
  );
}
