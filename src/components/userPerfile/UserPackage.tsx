import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/formatters";
import { orderService, type Order } from "@/services/orderService";
import type { OrderStatus } from "@/types/orders";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <section className="my-10 w-full rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950">
        <p className="text-sm text-gray-500">Cargando pedidos...</p>
      </section>
    );
  }

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

      {orders.length === 0 ? (
        <p className="text-sm text-gray-500" role="status">
          No tenés pedidos todavía.
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id}>
              <Card className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <Badge
                        className={STATUS_STYLES[order.status]}
                        aria-label={`Estado del pedido: ${STATUS_LABELS[order.status]}`}
                      >
                        {STATUS_LABELS[order.status]}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </p>

                    <span className="text-sm text-gray-600">
                      {order.items.length}{" "}
                      {order.items.length > 1 ? "productos" : "producto"}
                    </span>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p className="text-lg font-bold text-green-500">
                      {formatPrice(Number(order.totalPrice))}
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
      )}
    </section>
  );
}
