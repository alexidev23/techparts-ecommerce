import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { AdminUser } from "@/services/adminService";

interface UserViewModalProps {
  user: AdminUser | null;
  open: boolean;
  onClose: () => void;
}

export function UserViewModal({ user, open, onClose }: UserViewModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil de usuario</DialogTitle>
        </DialogHeader>
        <dl className="space-y-4 mt-4">
          <div className="flex justify-between border-b pb-2">
            <dt className="text-sm text-gray-500">Nombre</dt>
            <dd className="text-sm font-medium">{user.name ?? "Sin nombre"}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="text-sm font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-sm text-gray-500">Rol</dt>
            <dd>
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                {user.role === "admin" ? "Admin" : "Usuario"}
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-sm text-gray-500">Estado</dt>
            <dd>
              <Badge
                variant={user.status === "active" ? "default" : "destructive"}
              >
                {user.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-sm text-gray-500">Registrado el</dt>
            <dd className="text-sm font-medium">
              {new Date(user.createdAt).toLocaleDateString("es-AR")}
            </dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
