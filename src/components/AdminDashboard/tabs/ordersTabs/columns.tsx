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
import type { Order, OrderStatus } from "@/types/orders";

// Configuración visual de cada estado — color del badge y label
const statusConfig: Record<
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

export const columns: ColumnDef<Order>[] = [
  // --- COLUMNA: ID ---
  {
    accessorKey: "id",
    header: "ID",
    // Mostramos solo los primeros 8 caracteres para no ocupar demasiado espacio
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm font-mono">
        #{row.getValue<string>("id").slice(0, 8)}
      </span>
    ),
  },

  // --- COLUMNA: Cliente ---
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cliente
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  // --- COLUMNA: Fecha ---
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <span>{date.toLocaleDateString("es-AR")}</span>;
    },
  },

  // --- COLUMNA: Total ---
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    // Formateamos el número como moneda
    cell: ({ row }) => {
      const total = row.getValue<number>("total");
      return (
        <span className="font-medium">
          ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
        </span>
      );
    },
  },

  // --- COLUMNA: Estado ---
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<OrderStatus>("status");
      const { label, variant } = statusConfig[status];
      return <Badge variant={variant}>{label}</Badge>;
    },
  },

  // --- COLUMNA: Acciones ---
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

            {/* Ver detalle — en el futuro navegás a /admin/orders/:id */}
            <DropdownMenuItem>Ver detalle del pedido</DropdownMenuItem>

            {/* Cambiar estado — submenú con los 4 estados posibles */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Cambiar estado</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {(Object.keys(statusConfig) as OrderStatus[]).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    // Deshabilitamos el estado actual para no seleccionarlo de nuevo
                    disabled={order.status === status}
                    onClick={() =>
                      console.log(`Cambiar ${order.id} a ${status}`)
                    }
                  >
                    {statusConfig[status].label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            {/* Eliminar — en rojo para indicar acción destructiva */}
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => console.log(`Eliminar pedido ${order.id}`)}
            >
              Eliminar pedido
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
