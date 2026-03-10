import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ItemListCardProps, OrderStatus } from "@/types/orders";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<OrderStatus, string> = {
  procesando: "text-yellow-600 bg-yellow-100",
  enviado: "text-blue-600 bg-blue-100",
  entregado: "text-green-600 bg-green-100",
  cancelado: "text-red-600 bg-red-100",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DataListCard({ title, items }: ItemListCardProps) {
  return (
    <Card className="dark:border-gray-700 dark:bg-gray-950">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5 list-none p-0">
          {items.map((item) => (
            <li
              key={item.order}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2.5 dark:border-gray-700"
            >
              <div>
                <p className="font-medium">#{item.order}</p>
                <p className="text-sm text-gray-500">{item.name}</p>
              </div>
              <Badge className={`text-sm ${STATUS_STYLES[item.status]}`}>
                {item.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
