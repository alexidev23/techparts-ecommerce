import type { ColumnDef } from "@tanstack/react-table";
import type { Ad, AdStatus } from "@/types/sponsor";
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

interface AdColumnsProps {
  onToggleStatus: (id: string, currentStatus: AdStatus) => void;
  onEdit: (ad: Ad) => void;
  onDelete: (id: string) => void;
}

export const createAdColumns = ({
  onToggleStatus,
  onEdit,
  onDelete,
}: AdColumnsProps): ColumnDef<Ad>[] => [
  // --- COLUMNA: Título ---
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Título
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
  },

  // --- COLUMNA: Posición ---
  {
    accessorKey: "position",
    header: "Posición",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("position")}</Badge>
    ),
  },

  // --- COLUMNA: Clicks ---
  {
    accessorKey: "clicks",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Clicks
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    // Formateamos el número con separador de miles
    cell: ({ row }) => {
      const clicks = row.getValue<number>("clicks");
      return (
        <span className="font-mono">{clicks.toLocaleString("es-AR")}</span>
      );
    },
  },

  // --- COLUMNA: Estado con Switch ---
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<AdStatus>("status");
      const ad = row.original;
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={status === "activo"}
            onCheckedChange={() => onToggleStatus(ad.id, status)}
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
      const ad = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(ad)}>
              Editar publicidad
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(ad.id, ad.status)}>
              {ad.status === "activo" ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(ad.id)}
            >
              Eliminar publicidad
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
