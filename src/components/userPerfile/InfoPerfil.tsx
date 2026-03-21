import { useEffect, useState } from "react";
import { Mail, MapPin, Pencil, Phone, User2 } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { userService } from "@/services/userService";
import type { User } from "@/types/user";

// ─── Schema ───────────────────────────────────────────────────────────────────

const editProfileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().optional(),
  address: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
});

type EditProfileData = z.infer<typeof editProfileSchema>;

// ─── ProfileField ─────────────────────────────────────────────────────────────

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="mb-4">
      <dt className="flex items-center gap-2.5 text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
        <span aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="pl-8 text-gray-900 dark:text-gray-50 text-base font-bold">
        {value}
      </dd>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InfoPerfil() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const form = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      province: "",
      country: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
        // Precargamos el formulario con los datos actuales
        form.reset({
          name: data.name ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          province: data.province ?? "",
          country: data.country ?? "",
        });
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: EditProfileData) => {
    try {
      const updated = await userService.updateProfile(data);
      setProfile(updated);
      setOpen(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      form.setError("root", { message: "Error al guardar los cambios" });
    }
  };

  if (loading) {
    return (
      <section className="w-full h-full bg-gray-50 dark:bg-gray-950 rounded-lg p-6 my-10 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 text-sm">Cargando perfil...</p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="profile-info-title"
      className="w-full h-full bg-gray-50 dark:bg-gray-950 rounded-lg p-6 my-10 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          id="profile-info-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Información del Perfil
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-800">
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Editar
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar perfil</DialogTitle>
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
                      placeholder="Tu nombre completo"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Teléfono */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Teléfono</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="+54 11 1234-5678"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Dirección */}
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Dirección</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Calle y número"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Provincia */}
              <Controller
                name="province"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Provincia</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Buenos Aires"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* País */}
              <Controller
                name="country"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>País</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Argentina"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Error global */}
              {form.formState.errors.root && (
                <p
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-red-500"
                >
                  {form.formState.errors.root.message}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
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
      </div>

      <dl>
        <ProfileField
          icon={<User2 className="h-5 w-5" />}
          label="Nombre"
          value={profile?.name ?? "Sin nombre"}
        />
        <ProfileField
          icon={<Mail className="h-5 w-5" />}
          label="Correo Electrónico"
          value={profile?.email ?? "Sin correo"}
        />
        <ProfileField
          icon={<Phone className="h-5 w-5" />}
          label="Teléfono"
          value={profile?.phone ?? "Sin teléfono"}
        />
        <ProfileField
          icon={<MapPin className="h-5 w-5" />}
          label="Ubicación"
          value={
            profile?.address
              ? `${profile.address}${profile.province ? `, ${profile.province}` : ""}${profile.country ? `, ${profile.country}` : ""}`
              : "Sin ubicación"
          }
        />
      </dl>
    </section>
  );
}
