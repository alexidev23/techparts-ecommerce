import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type OrderStatus = "entregado" | "enviado" | "procesando";

interface OrdersItem {
  id: string;
  num_pedido: string;
  date: string;
  cantidad: number;
  price: number;
  status: OrderStatus;
}

// Afuera del componente — es estático, no necesita recrearse en cada render
const statusStyles: Record<OrderStatus, string> = {
  procesando: "text-yellow-600 bg-yellow-100",
  enviado: "text-blue-600 bg-blue-100",
  entregado: "text-green-600 bg-green-100",
};

// Labels con la primera letra en mayúscula para mostrar en el Badge
const statusLabels: Record<OrderStatus, string> = {
  procesando: "Procesando",
  enviado: "Enviado",
  entregado: "Entregado",
};

// Nombre del array corregido a orders
const orders: OrdersItem[] = [
  {
    id: "1", // ids únicos
    num_pedido: "0001",
    date: "2020-02-13", // formato ISO consistente con el resto del proyecto
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

export default function UserPackage() {
  return (
    <section
      aria-labelledby="orders-title" // id único para este componente
      className="w-full h-full bg-gray-50 dark:bg-gray-950 rounded-lg p-6 my-10 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          id="orders-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Mis Pedidos
        </h2>
      </div>

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
                    <Badge className={statusStyles[item.status]}>
                      {/* Label con mayúscula en lugar del valor crudo del tipo */}
                      {statusLabels[item.status]}
                    </Badge>
                  </div>

                  {/* Formateamos la fecha desde ISO a formato legible */}
                  <p className="text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <span className="text-sm text-gray-600">
                    {item.cantidad}{" "}
                    {item.cantidad > 1 ? "productos" : "producto"}
                  </span>
                </div>

                <div className="flex flex-col gap-2 shrink-0 items-end">
                  {/* p es más semántico que div para un precio */}
                  <p className="text-lg font-bold text-green-500">
                    ${item.price.toLocaleString("es-AR")}
                  </p>
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
