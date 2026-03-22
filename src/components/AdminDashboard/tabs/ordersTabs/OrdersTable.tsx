import { useState } from "react";
import { toast } from "sonner";
import type { AdminOrder } from "@/services/adminService";
import { adminService } from "@/services/adminService";
import { DataTable } from "../data-table";
import { createOrderColumns } from "./columns";
import { OrderViewModal } from "./OrderViewModal";
import type { OrderStatus } from "@/types/orders";

interface OrdersTableProps {
  orders: AdminOrder[];
  onOrdersChange: (orders: AdminOrder[]) => void;
}

export default function OrdersTable({
  orders,
  onOrdersChange,
}: OrdersTableProps) {
  const [viewOrder, setViewOrder] = useState<AdminOrder | null>(null);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await adminService.updateOrderStatus(id, status);
      onOrdersChange(orders.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Estado actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el estado");
    }
  };

  const columns = createOrderColumns({
    onView: (order) => setViewOrder(order),
    onStatusChange: handleStatusChange,
  });

  return (
    <div className="p-6 space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
        <p className="text-muted-foreground">
          Administrá todos los pedidos de TechParts
        </p>
      </header>

      <DataTable columns={columns} data={orders} />

      <OrderViewModal
        order={viewOrder}
        open={!!viewOrder}
        onClose={() => setViewOrder(null)}
      />
    </div>
  );
}
