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
import type { AdminUser } from "@/services/adminService";

interface ColumnCallbacks {
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
}

export function createColumns({
  onView,
  onEdit,
}: ColumnCallbacks): ColumnDef<AdminUser>[] {
  return [
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
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => {
        const role = row.getValue<string>("role");
        return (
          <Badge variant={role === "admin" ? "default" : "secondary"}>
            {role === "admin" ? "Admin" : "Usuario"}
          </Badge>
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
      accessorKey: "createdAt",
      header: "Creado el",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <span>{date.toLocaleDateString("es-AR")}</span>;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const user = row.original;
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id ?? "")}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onView(user)}>
                Ver perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(user)}>
                Editar usuario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
