import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { AdminProduct } from "@/services/adminService";
import { formatPrice } from "@/utils/formatters";

interface ProductColumnCallbacks {
  onView: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
}

export function createProductColumns({
  onView,
  onEdit,
}: ProductColumnCallbacks): ColumnDef<AdminProduct>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm font-mono">
          #{row.getValue<string>("id").slice(0, 8)}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
    },
    {
      id: "category",
      header: "Categoría",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category.name}</Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {formatPrice(Number(row.getValue("price")))}
        </span>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const stock = row.getValue<number>("stock");
        return (
          <span className={stock < 5 ? "text-red-500 font-semibold" : ""}>
            {stock} unidades
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue<string>("status");
        return (
          <Badge variant={status === "active" ? "default" : "destructive"}>
            {status === "active" ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const product = row.original;
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
              <DropdownMenuItem onClick={() => onView(product)}>
                Ver detalle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(product)}>
                Editar producto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
