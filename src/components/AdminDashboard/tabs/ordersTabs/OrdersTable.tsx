import type { Order } from "@/types/orders";
import { DataTable } from "../data-table";
import { columns } from "./columns";

// Datos mock — los reemplazarás por un fetch a tu API
const mockOrders: Order[] = [
  {
    id: "a1b2c3d4e5f6",
    clientName: "María García",
    date: "2024-05-01",
    total: 15200,
    status: "entregado",
  },
  {
    id: "b2c3d4e5f6a1",
    clientName: "Juan Pérez",
    date: "2024-05-10",
    total: 8750,
    status: "enviado",
  },
  {
    id: "c3d4e5f6a1b2",
    clientName: "Luis Fernández",
    date: "2024-05-15",
    total: 23400,
    status: "procesando",
  },
  {
    id: "d4e5f6a1b2c3",
    clientName: "Sofía Torres",
    date: "2024-05-18",
    total: 5100,
    status: "cancelado",
  },
  {
    id: "e5f6a1b2c3d4",
    clientName: "Diego Ramírez",
    date: "2024-05-20",
    total: 11800,
    status: "procesando",
  },
  {
    id: "f6a1b2c3d4e5",
    clientName: "Ana Martínez",
    date: "2024-05-22",
    total: 31500,
    status: "enviado",
  },
];

export default function OrdersTable() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
        <p className="text-muted-foreground">
          Administrá todos los pedidos de TechParts
        </p>
      </div>

      {/* Mismo DataTable de siempre, solo cambian columns y data */}
      <DataTable columns={columns} data={mockOrders} />
    </div>
  );
}
