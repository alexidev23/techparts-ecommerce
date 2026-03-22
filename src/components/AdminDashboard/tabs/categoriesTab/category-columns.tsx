import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@/types/category";
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
  onViewProducts: (category: Category) => void;
}

export const createCategoryColumns = ({
  onEdit,
  onDelete,
  onViewProducts,
}: CategoryColumnsProps): ColumnDef<Category>[] => [
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
  {
    id: "subcategories",
    header: "Subcategorías",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.subcategories?.length ?? 0} subcategorías
      </span>
    ),
  },
  {
    id: "totalProducts",
    header: "Productos",
    cell: ({ row }) => (
      <span>{row.original._count?.products ?? 0} productos</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
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
            <DropdownMenuItem onClick={() => onViewProducts(category)}>
              Ver productos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(category)}>
              Editar categoría
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
