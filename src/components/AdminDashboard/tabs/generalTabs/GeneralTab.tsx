import type { LucideIcon } from "lucide-react";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

import StatisticsCard from "./StatisticsCard";
import DataListCard from "./DataListCard";
import LowStockProducts from "./LowStockProducts";
import type { ItemListCardProps } from "@/types/orders";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatisticsCardData {
  title: string;
  value: number | string;
  percentage: number;
  icon: LucideIcon;
  iconClassName: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
// TODO: reemplazar con datos reales del backend

const CARDS_STATISTICS: StatisticsCardData[] = [
  {
    title: "Usuarios",
    value: 1200,
    percentage: -12,
    icon: Users,
    iconClassName: "h-10 w-10 text-blue-500",
  },
  {
    title: "Pedidos",
    value: 500,
    percentage: 8,
    icon: ShoppingBag,
    iconClassName: "h-10 w-10 text-green-500",
  },
  {
    title: "Productos",
    value: 300,
    percentage: 5,
    icon: Package,
    iconClassName: "h-10 w-10 text-purple-500",
  },
  {
    title: "Ingresos",
    value: "$25,000",
    percentage: 15,
    icon: DollarSign,
    iconClassName: "h-10 w-10 text-yellow-500",
  },
];

const RECENT_ORDERS: ItemListCardProps = {
  title: "Pedidos Recientes",
  items: [
    { order: "0001", name: "John Doe", status: "procesando" },
    { order: "0002", name: "Alex Luna", status: "enviado" },
    { order: "0003", name: "Martin Suarez", status: "entregado" },
    { order: "0004", name: "Marcelo Rodriguez", status: "cancelado" },
  ],
};

const LOW_STOCK_PRODUCTS = {
  title: "Productos con Bajo Stock",
  items: [
    { id: "1", name: "Iphone 13 Pro Max", stock: 5 },
    { id: "2", name: "Samsung Galaxy S21", stock: 3 },
    { id: "3", name: "Google Pixel 6", stock: 10 },
    { id: "4", name: 'Smart TV 55"', stock: 10 },
    { id: "5", name: "Auriculares Bluetooth", stock: 10 },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GeneralTab() {
  return (
    <section
      aria-label="Resumen general"
      className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-3"
    >
      {/* Statistics Cards */}
      <ul className="col-span-2 flex items-center justify-between gap-4 rounded-lg list-none p-0">
        {CARDS_STATISTICS.map(
          ({ title, value, percentage, icon: Icon, iconClassName }) => (
            <li key={title} className="flex-1">
              <StatisticsCard
                title={title}
                value={value}
                percentage={percentage}
                icon={<Icon className={iconClassName} aria-hidden="true" />}
              />
            </li>
          ),
        )}
      </ul>

      {/* Recent Orders */}
      <div className="row-span-3 row-start-2">
        <DataListCard title={RECENT_ORDERS.title} items={RECENT_ORDERS.items} />
      </div>

      {/* Low Stock Products */}
      <div className="row-span-3 row-start-2">
        <LowStockProducts
          title={LOW_STOCK_PRODUCTS.title}
          items={LOW_STOCK_PRODUCTS.items}
        />
      </div>
    </section>
  );
}
