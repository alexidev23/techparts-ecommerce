import type { ColumnDef } from "@tanstack/react-table";
import type { Category, CategoryStatus } from "@/types/category";
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

interface CategoryColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const createCategoryColumns = ({
  onEdit,
  onDelete,
}: CategoryColumnsProps): ColumnDef<Category>[] => [
  // --- COLUMNA: Nombre ---
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },

  // --- COLUMNA: Subcategorías ---
  {
    accessorKey: "subcategoryCount",
    header: "Subcategorías",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue<number>("subcategoryCount")} subcategorías
      </span>
    ),
  },

  // --- COLUMNA: Total productos ---
  {
    accessorKey: "totalProducts",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total productos
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span>{row.getValue<number>("totalProducts")} productos</span>
    ),
  },

  // --- COLUMNA: Estado ---
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<CategoryStatus>("status");
      return (
        <Badge variant={status === "activo" ? "default" : "secondary"}>
          {status === "activo" ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },

  // --- COLUMNA: Acciones ---
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const category = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(category)}>
              Editar categoría
            </DropdownMenuItem>
            <DropdownMenuItem>Ver productos</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Abre el AlertDialog pasando el id — NO elimina directo */}
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(category.id)}
            >
              Eliminar categoría
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
