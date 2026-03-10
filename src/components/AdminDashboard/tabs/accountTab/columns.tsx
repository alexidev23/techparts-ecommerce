// Acá definimos QUÉ columnas tiene la tabla y CÓMO se ve cada celda.
// ColumnDef es el tipo de TanStack Table para definir columnas.

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
import type { UserInfo } from "@/types/userInfo";

// El array columns es lo que le pasaremos al hook useReactTable
export const columns: ColumnDef<UserInfo>[] = [
  // --- COLUMNA: Nombre ---
  {
    accessorKey: "name", // le dice a TanStack qué propiedad del objeto User leer
    header: ({ column }) => (
      // Botón que activa el sorting al hacer click
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  // --- COLUMNA: Email ---
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

  // --- COLUMNA: Rol ---
  {
    accessorKey: "role",
    header: "Rol",
    // cell nos permite personalizar cómo se renderiza la celda
    cell: ({ row }) => {
      const role = row.getValue<string>("role");
      return (
        // Badge de color diferente según el rol
        <Badge variant={role === "admin" ? "default" : "secondary"}>
          {role === "admin" ? "Admin" : "Usuario"}
        </Badge>
      );
    },
  },

  // --- COLUMNA: Estado ---
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

  // --- COLUMNA: Fecha de creación ---
  {
    accessorKey: "createdAt",
    header: "Creado el",
    // Formateamos la fecha para que se vea legible
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <span>{date.toLocaleDateString("es-AR")}</span>;
    },
  },

  // --- COLUMNA: Acciones ---
  {
    id: "actions", // No tiene accessorKey porque no viene de los datos
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original; // row.original es el objeto User completo de esa fila

      return (
        // Menú desplegable con las acciones posibles
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
            <DropdownMenuItem>Editar usuario</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Eliminar usuario
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
