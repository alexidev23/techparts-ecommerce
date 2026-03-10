import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/formatters";
import type { OrderStatus } from "@/types/orders";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrdersItem {
  id: string;
  num_pedido: string;
  date: string;
  cantidad: number;
  price: number;
  status: OrderStatus;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<OrderStatus, string> = {
  procesando: "text-yellow-600 bg-yellow-100",
  enviado: "text-blue-600 bg-blue-100",
  entregado: "text-green-600 bg-green-100",
  cancelado: "text-red-600 bg-red-100",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  procesando: "Procesando",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

// TODO: reemplazar con datos reales del backend
const orders: OrdersItem[] = [
  {
    id: "1",
    num_pedido: "0001",
    date: "2020-02-13",
    cantidad: 3,
    price: 23321,
    status: "entregado",
  },
  {
    id: "2",
    num_pedido: "0002",
    date: "2026-02-13",
    cantidad: 2,
    price: 60000,
    status: "enviado",
  },
  {
    id: "3",
    num_pedido: "0003",
    date: "2026-04-13",
    cantidad: 1,
    price: 103234,
    status: "procesando",
  },
];

// ─── Utils ────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function UserPackage() {
  return (
    <section
      aria-labelledby="orders-title"
      className="my-10 w-full rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950"
    >
      <header className="mb-6 flex items-center justify-between">
        <h2
          id="orders-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Mis Pedidos
        </h2>
      </header>

      <ul className="space-y-4">
        {orders.map((item) => (
          <li key={item.id}>
            <Card className="px-4 py-3">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                      #{item.num_pedido}
                    </h3>
                    <Badge
                      className={STATUS_STYLES[item.status]}
                      aria-label={`Estado del pedido: ${STATUS_LABELS[item.status]}`}
                    >
                      {STATUS_LABELS[item.status]}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">
                    {formatDate(item.date)}
                  </p>

                  <span className="text-sm text-gray-600">
                    {item.cantidad}{" "}
                    {item.cantidad > 1 ? "productos" : "producto"}
                  </span>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <p className="text-lg font-bold text-green-500">
                    {formatPrice(item.price)}
                  </p>
                  {/* TODO: reemplazar con Link cuando tengas la ruta de detalle de pedido */}
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ver detalle
                  </Button>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
