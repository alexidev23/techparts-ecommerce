import { useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminUser } from "@/services/adminService";

// ─── Schema ───────────────────────────────────────────────────────────────────

const editUserSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  role: z.enum(["admin", "user"]),
  status: z.enum(["active", "inactive"]),
});

type EditUserData = z.infer<typeof editUserSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

interface UserEditModalProps {
  user: AdminUser | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, data: EditUserData) => Promise<void>;
}

export function UserEditModal({
  user,
  open,
  onClose,
  onSave,
}: UserEditModalProps) {
  const form = useForm<EditUserData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      role: "user",
      status: "active",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        role: user.role,
        status: user.status ?? "active",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: EditUserData) => {
    if (!user) return;
    await onSave(user.id ?? "", data);
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
          noValidate
        >
          {/* Nombre */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Rol */}
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="role">Rol</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* Estado */}
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="status">Estado</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* Error global */}
          {form.formState.errors.root && (
            <p role="alert" className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
