import type { ColumnDef } from "@tanstack/react-table";
import type { Sponsor } from "@/types/sponsor";
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

interface SponsorColumnsProps {
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: string) => void;
}

export const createSponsorColumns = ({
  onEdit,
  onDelete,
  onToggleStatus,
}: SponsorColumnsProps): ColumnDef<Sponsor>[] => [
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
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <img
        src={row.getValue("logo")}
        alt={row.original.name}
        className="h-8 w-8 object-contain"
      />
    ),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <a
        href={row.getValue("link")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm truncate max-w-xs block"
      >
        {row.getValue("link")}
      </a>
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
    accessorKey: "createdAt",
    header: "Creado el",
    cell: ({ row }) => (
      <span>
        {new Date(row.getValue("createdAt")).toLocaleDateString("es-AR")}
      </span>
    ),
  },
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
              {sponsor.status === "active" ? "Desactivar" : "Activar"}
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
