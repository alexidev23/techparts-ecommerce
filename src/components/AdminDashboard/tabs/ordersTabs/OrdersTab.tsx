import type { AdminOrder } from "@/services/adminService";
import OrdersTable from "./OrdersTable";

interface OrdersTabProps {
  orders: AdminOrder[];
  onOrdersChange: (orders: AdminOrder[]) => void;
}

export default function OrdersTab({ orders, onOrdersChange }: OrdersTabProps) {
  return (
    <div className="w-full rounded-lg bg-white p-6 shadow dark:bg-gray-950">
      <OrdersTable orders={orders} onOrdersChange={onOrdersChange} />
    </div>
  );
}
