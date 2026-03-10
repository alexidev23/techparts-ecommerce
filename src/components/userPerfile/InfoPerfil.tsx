import { Mail, MapPin, Pencil, Phone, User2 } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

// Componente reutilizable para cada campo del perfil
// Usar dl/dt/dd es semánticamente correcto para pares label-valor
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
        {/* aria-hidden porque el ícono es decorativo, el label ya describe el campo */}
        <span aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="pl-8 text-gray-900 dark:text-gray-50 text-base font-bold">
        {value}
      </dd>
    </div>
  );
}

export default function InfoPerfil() {
  return (
    // Usamos <section> en lugar de <div> porque es una sección
    // con contenido propio y un encabezado — más semántico
    <section
      aria-labelledby="profile-info-title"
      className="w-full h-full bg-gray-50 dark:bg-gray-950 rounded-lg p-6 my-10 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        {/* id vinculado al aria-labelledby de la section */}
        <h2
          id="profile-info-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Información del Perfil
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-800">
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Editar
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* dl es la etiqueta correcta para listas de definición (label + valor) */}
      <dl>
        <ProfileField
          icon={<User2 className="h-5 w-5" />}
          label="Nombre"
          value="Alexis Escobar"
        />
        <ProfileField
          icon={<Mail className="h-5 w-5" />}
          label="Correo Electrónico"
          value="alexis.escobar@example.com"
        />
        <ProfileField
          icon={<Phone className="h-5 w-5" />}
          label="Teléfono"
          value="123-456-7890"
        />
        <ProfileField
          icon={<MapPin className="h-5 w-5" />}
          label="Ubicación"
          value="123 Main Street, City, Country"
        />
      </dl>
    </section>
  );
}
