import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LowProductProps } from "@/types/orders";

// ─── Constants ────────────────────────────────────────────────────────────────

const LOW_STOCK_THRESHOLD = 10;

// ─── Component ────────────────────────────────────────────────────────────────

export default function LowStockProducts({ title, items }: LowProductProps) {
  return (
    <Card className="max-h-100 overflow-y-auto dark:border-gray-700 dark:bg-gray-950">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5 list-none p-0">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2.5 dark:border-gray-700"
            >
              <div>
                <p className="text-lg font-bold">{item.name}</p>
                <span
                  className={`text-sm ${
                    item.stock < LOW_STOCK_THRESHOLD
                      ? "font-semibold text-red-500"
                      : "text-yellow-700"
                  }`}
                  aria-label={`Stock disponible: ${item.stock} unidades`}
                >
                  Stock: {item.stock} unidades
                </span>
              </div>
              <Button size="sm">Restablecer</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
