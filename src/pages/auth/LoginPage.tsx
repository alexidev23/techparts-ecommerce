import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hook/useAuth";

// ─── Schema ───────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    const success = loginUser(data.email, data.password);

    if (!success) {
      form.setError("root", {
        message: "Correo o contraseña incorrectos",
      });
      return;
    }

    // Usamos el user del contexto en lugar de leer localStorage
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/perfil");
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-gray-50 py-16 dark:bg-gray-900">
        <section
          className="container mx-auto max-w-lg px-4"
          aria-labelledby="login-title"
        >
          <header className="mb-6 text-center">
            <h1
              id="login-title"
              className="text-3xl font-semibold text-gray-900 dark:text-gray-50"
            >
              Iniciar sesión
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Ingresa a tu cuenta para continuar
            </p>
          </header>

          <div className="rounded-lg border bg-white p-8 shadow-sm dark:bg-gray-950">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Correo electrónico
                    </FieldLabel>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                        className="pl-10"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                        className="pl-10 pr-10"
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
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

              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>

            <Separator className="my-6" />

            <p className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link
                to="/crear-cuenta"
                className="text-blue-600 hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>

            <Separator className="my-6" />

            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
              <h2 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-300">
                Demo - Credenciales de prueba
              </h2>
              <p className="text-xs text-blue-800 dark:text-blue-500">
                <strong>Admin:</strong> admin@techparts.com / admin123
              </p>
              <p className="text-xs text-blue-800 dark:text-blue-500">
                <strong>Usuario:</strong> usuario@test.com / user123
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
