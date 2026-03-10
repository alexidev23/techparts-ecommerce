import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { LowProductProps } from "@/types/orders";

export default function LowStockProducts({ title, items }: LowProductProps) {
  return (
    <div className="space-y-2.5 bg-white p-4 rounded-lg border border-gray-200 overflow-y-scroll max-h-100 dark:bg-gray-950 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex flex-row px-4 py-2.5 items-center justify-between border-b"
        >
          <div>
            <p className="text-lg font-bold">{item.name}</p>
            <span
              className={`text-sm ${item.stock < 10 ? "text-red-500 font-semibold" : "text-yellow-700"}`}
            >
              stock: {item.stock}
            </span>
          </div>
          <Button>Restablecer</Button>
        </Card>
      ))}
    </div>
  );
}
