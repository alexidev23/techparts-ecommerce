import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ItemListCardProps, OrderStatus } from "@/types/orders";

export default function DataListCard({ title, items }: ItemListCardProps) {
  const statusStyles: Record<OrderStatus, string> = {
    procesando: "text-yellow-600 bg-yellow-100",
    enviado: "text-blue-600 bg-blue-100",
    entregado: "text-green-600 bg-green-100",
    cancelado: "text-red-600 bg-red-100",
  };

  return (
    <div className="space-y-2.5 bg-white p-4 rounded-lg border border-gray-200 dark:bg-gray-950 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {items.map((item) => (
        <Card
          key={item.order}
          className="flex flex-row px-4 py-2.5 items-center justify-between border-b"
        >
          <div>
            <p className="font-medium">#{item.order}</p>
            <p className="text-sm text-gray-500">{item.name}</p>
          </div>
          <Badge className={`text-sm ${statusStyles[item.status]}`}>
            {item.status}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
