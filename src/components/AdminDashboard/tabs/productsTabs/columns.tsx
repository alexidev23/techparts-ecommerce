import type { ColumnDef } from "@tanstack/react-table";
import type { Product, ProductStatus } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// Recibe onToggleStatus como prop para que la página maneje el cambio de estado
// Esto es importante: las columnas no manejan estado propio, le avisan a la página
interface ColumnsProps {
  onToggleStatus: (id: string, currentStatus: ProductStatus) => void;
}

export const createColumns = ({
  onToggleStatus,
}: ColumnsProps): ColumnDef<Product>[] => [
  // --- COLUMNA: ID ---
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm font-mono">
        #{row.getValue<string>("id").slice(0, 8)}
      </span>
    ),
  },

  // --- COLUMNA: Producto ---
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
    // Mostramos el nombre en negrita para destacarlo
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },

  // --- COLUMNA: Categoría ---
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("category")}</Badge>
    ),
  },

  // --- COLUMNA: Precio ---
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
    cell: ({ row }) => {
      const price = row.getValue<number>("price");
      return (
        <span className="font-medium">
          ${price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
        </span>
      );
    },
  },

  // --- COLUMNA: Stock ---
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
        // Si el stock es menor a 5, lo mostramos en rojo como advertencia
        <span className={stock < 5 ? "text-red-500 font-semibold" : ""}>
          {stock} unidades
        </span>
      );
    },
  },

  // --- COLUMNA: Estado con Switch ---
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<ProductStatus>("status");
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          {/* Switch para activar/desactivar directo en la tabla */}
          <Switch
            checked={status === "activo"}
            // Le avisa a la página que cambió el estado de este producto
            onCheckedChange={() => onToggleStatus(product.id, status)}
          />
          <Badge variant={status === "activo" ? "default" : "secondary"}>
            {status === "activo" ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      );
    },
  },

  // --- COLUMNA: Acciones ---
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
            <DropdownMenuItem>Ver detalle</DropdownMenuItem>
            <DropdownMenuItem>Editar producto</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => console.log(`Eliminar producto ${product.id}`)}
            >
              Eliminar producto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
