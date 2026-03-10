import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import StatisticsCard from "./StatisticsCard";
import DataListCard from "./DataListCard";
import type { ItemListCardProps } from "@/types/orders";
import LowStockProducts from "./LowStockProducts";

// Mover a data/generalTabData.ts
const cardsStadistics = [
  {
    title: "Usuarios",
    value: 1200,
    percentage: -12,
    icon: <Users className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Pedidos",
    value: 500,
    percentage: 8,
    icon: <ShoppingBag className="h-10 w-10 text-green-500" />,
  },
  {
    title: "Productos",
    value: 300,
    percentage: 5,
    icon: <Package className="h-10 w-10 text-purple-500" />,
  },
  {
    title: "Ingresos",
    value: "$25,000",
    percentage: 15,
    icon: <DollarSign className="h-10 w-10 text-yellow-500" />,
  },
];

const recentOrders: ItemListCardProps = {
  title: "Pedidos Recientes",
  items: [
    {
      order: "0001",
      name: "John Doe",
      status: "procesando",
    },
    {
      order: "0002",
      name: "Alex Luna",
      status: "enviado",
    },
    {
      order: "0003",
      name: "Martin Suarez",
      status: "entregado",
    },
    {
      order: "0004",
      name: "Marcelo Rodriguez",
      status: "cancelado",
    },
  ],
};

const lowStockProducts = {
  title: "Productos con Bajo Stock",
  items: [
    {
      id: "1",
      name: "Iphone 13 Pro Max",
      stock: 5,
    },
    {
      id: "2",
      name: "Samsung Galaxy S21",
      stock: 3,
    },
    {
      id: "3",
      name: "Google Pixel 6",
      stock: 10,
    },
    {
      id: "4",
      name: 'Smart TV 55"',
      stock: 10,
    },
    {
      id: "5",
      name: "Auriculares Bluetooth",
      stock: 10,
    },
  ],
};

export default function GeneralTab() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-3 gap-4 mt-6">
      <div className="col-span-2 flex items-center justify-between rounded-lg">
        {cardsStadistics.map((card) => (
          <StatisticsCard
            key={card.title}
            title={card.title}
            value={card.value}
            percentage={card.percentage}
            icon={card.icon}
          />
        ))}
      </div>
      <div className="row-start-2 row-span-3">
        <DataListCard title={recentOrders.title} items={recentOrders.items} />
      </div>
      <div className="row-start-2 row-span-3">
        <LowStockProducts
          title={lowStockProducts.title}
          items={lowStockProducts.items}
        />
      </div>
    </div>
  );
}
