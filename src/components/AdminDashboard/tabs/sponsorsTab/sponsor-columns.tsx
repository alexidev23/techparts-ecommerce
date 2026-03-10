import type { ColumnDef } from "@tanstack/react-table";
import type { Sponsor, SponsorStatus } from "@/types/sponsor";
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

interface SponsorColumnsProps {
  onToggleStatus: (id: string, currentStatus: SponsorStatus) => void;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
}

export const createSponsorColumns = ({
  onToggleStatus,
  onEdit,
  onDelete,
}: SponsorColumnsProps): ColumnDef<Sponsor>[] => [
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

  // --- COLUMNA: Categoría ---
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("category")}</Badge>
    ),
  },

  // --- COLUMNA: Desde ---
  {
    accessorKey: "since",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Desde
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("since"));
      return <span>{date.toLocaleDateString("es-AR")}</span>;
    },
  },

  // --- COLUMNA: Estado con Switch ---
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<SponsorStatus>("status");
      const sponsor = row.original;
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={status === "activo"}
            onCheckedChange={() => onToggleStatus(sponsor.id, status)}
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
      const sponsor = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(sponsor)}>
              Editar sponsor
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onToggleStatus(sponsor.id, sponsor.status)}
            >
              {sponsor.status === "activo" ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(sponsor.id)}
            >
              Eliminar sponsor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
