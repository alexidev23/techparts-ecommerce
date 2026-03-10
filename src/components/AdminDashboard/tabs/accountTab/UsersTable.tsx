// La página del panel admin que junta todo.
// Acá es donde en el futuro harías el fetch a tu API.
// Por ahora usamos datos mock para que funcione de inmediato.

import type { UserInfo } from "@/types/userInfo";
import { DataTable } from "../data-table";
import { columns } from "./columns";

// Datos mock — los reemplazarás por un fetch a tu API/backend
const mockUsers: UserInfo[] = [
  {
    id: "1",
    name: "Carlos López",
    email: "carlos@techparts.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "María García",
    email: "maria@gmail.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan@gmail.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@techparts.com",
    role: "admin",
    status: "active",
    createdAt: "2024-03-10",
  },
  {
    id: "5",
    name: "Luis Fernández",
    email: "luis@gmail.com",
    role: "user",
    status: "active",
    createdAt: "2024-04-01",
  },
  {
    id: "6",
    name: "Sofía Torres",
    email: "sofia@gmail.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-04-15",
  },
  {
    id: "7",
    name: "Diego Ramírez",
    email: "diego@gmail.com",
    role: "user",
    status: "active",
    createdAt: "2024-05-01",
  },
  {
    id: "8",
    name: "Valentina Díaz",
    email: "vale@techparts.com",
    role: "admin",
    status: "active",
    createdAt: "2024-05-20",
  },
];

export default function UsersTable() {
  return (
    <section aria-labelledby="users-table-title" className="space-y-6 p-6">
      <header>
        <h2 id="users-table-title" className="text-2xl font-bold">
          Gestión de Usuarios
        </h2>
        <p className="text-muted-foreground">
          Administrá todos los usuarios de TechParts
        </p>
      </header>

      <DataTable columns={columns} data={mockUsers} />
    </section>
  );
}
