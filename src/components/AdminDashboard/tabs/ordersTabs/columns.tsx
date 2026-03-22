import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { AdminOrder } from "@/services/adminService";
import type { OrderStatus } from "@/types/orders";
import { formatPrice } from "@/utils/formatters";

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  procesando: { label: "Procesando", variant: "secondary" },
  enviado: { label: "Enviado", variant: "default" },
  entregado: { label: "Entregado", variant: "outline" },
  cancelado: { label: "Cancelado", variant: "destructive" },
};

interface OrderColumnCallbacks {
  onView: (order: AdminOrder) => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
}

export function createOrderColumns({
  onView,
  onStatusChange,
}: OrderColumnCallbacks): ColumnDef<AdminOrder>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm font-mono">
          #{row.getValue<string>("id").slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      id: "clientName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{row.original.user.name ?? row.original.user.email}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("createdAt")).toLocaleDateString("es-AR")}
        </span>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {formatPrice(Number(row.getValue("totalPrice")))}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue<OrderStatus>("status");
        const { label, variant } = STATUS_CONFIG[status];
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(order)}>
                Ver detalle
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Cambiar estado</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map(
                    (status) => (
                      <DropdownMenuItem
                        key={status}
                        disabled={order.status === status}
                        onClick={() => onStatusChange(order.id, status)}
                      >
                        {STATUS_CONFIG[status].label}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
