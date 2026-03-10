import type { ColumnDef } from "@tanstack/react-table";
import type { Subcategory, CategoryStatus } from "@/types/category";
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

interface SubcategoryColumnsProps {
  onEdit: (subcategory: Subcategory) => void;
  onDelete: (id: string) => void;
}

export const createSubcategoryColumns = ({
  onEdit,
  onDelete,
}: SubcategoryColumnsProps): ColumnDef<Subcategory>[] => [
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

  // --- COLUMNA: Categoría principal ---
  {
    accessorKey: "parentCategory",
    header: "Categoría principal",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("parentCategory")}</Badge>
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
        Productos
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
      const subcategory = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(subcategory)}>
              Editar subcategoría
            </DropdownMenuItem>
            <DropdownMenuItem>Ver productos</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(subcategory.id)}
            >
              Eliminar subcategoría
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
