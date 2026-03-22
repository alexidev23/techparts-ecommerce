import { useState } from "react";
import type { AdminUser } from "@/services/adminService";
import { adminService } from "@/services/adminService";
import { DataTable } from "../data-table";
import { createColumns } from "./columns";
import { UserViewModal } from "./UserViewModal";
import { UserEditModal } from "./UserEditModal";
import { toast } from "sonner";

interface UsersTableProps {
  users: AdminUser[];
  onUsersChange: (users: AdminUser[]) => void;
}

export default function UsersTable({ users, onUsersChange }: UsersTableProps) {
  const [viewUser, setViewUser] = useState<AdminUser | null>(null);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);

  const handleSave = async (
    id: string,
    data: {
      name?: string;
      role?: "admin" | "user";
      status?: "active" | "inactive";
    },
  ) => {
    try {
      const updated = await adminService.updateUser(id, data);
      onUsersChange(users.map((u) => (u.id === id ? { ...u, ...updated } : u)));
      toast.success("Usuario actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el usuario");
    }
  };

  const columns = createColumns({
    onView: (user) => setViewUser(user),
    onEdit: (user) => setEditUser(user),
  });

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

      <DataTable columns={columns} data={users} />

      <UserViewModal
        user={viewUser}
        open={!!viewUser}
        onClose={() => setViewUser(null)}
      />

      <UserEditModal
        user={editUser}
        open={!!editUser}
        onClose={() => setEditUser(null)}
        onSave={handleSave}
      />
    </section>
  );
}
