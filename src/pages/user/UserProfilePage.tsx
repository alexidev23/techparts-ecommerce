import { Helmet } from "react-helmet-async";
import { Heart, Package2, User2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoPerfil from "@/components/userPerfile/InfoPerfil";
import UserFavorite from "@/components/userPerfile/UserFavorite";
import UserPackage from "@/components/userPerfile/UserPackage";
import { useAuth } from "@/hook/useAuth";

// ─── Constants ────────────────────────────────────────────────────────────────

interface TabItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { value: "perfil", label: "Perfil", icon: User2 },
  { value: "favoritos", label: "Favoritos", icon: Heart },
  { value: "pedidos", label: "Mis pedidos", icon: Package2 },
];

const TAB_CONTENT: Record<string, React.ReactNode> = {
  perfil: <InfoPerfil />,
  favoritos: <UserFavorite />,
  pedidos: <UserPackage />,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserProfilePage() {
  const { user } = useAuth();
  const displayName = user?.name ?? user?.email ?? "Usuario";

  return (
    <>
      <Helmet>
        <title>Mi perfil | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen w-full">
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Bienvenido a tu perfil, {displayName}!
          </h1>
        </header>

        <section
          aria-label="Panel de usuario"
          className="w-full bg-gray-200 dark:bg-gray-900"
        >
          <div className="container mx-auto max-w-3xl px-4 py-6">
            <Tabs defaultValue="perfil" className="w-full">
              <TabsList
                className="
                  mx-auto h-auto! max-w-2xl grid grid-cols-2 gap-2
                  rounded-lg bg-muted lg:grid-cols-3
                "
              >
                {TABS.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex w-full items-center justify-center gap-2 text-sm"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {TABS.map(({ value }) => (
                <TabsContent key={value} value={value} className="mt-6 lg:mt-0">
                  {TAB_CONTENT[value]}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
}
