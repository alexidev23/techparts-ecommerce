import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoPerfil from "@/components/userPerfile/InfoPerfil";
import { Heart, Package2, User2 } from "lucide-react";
import UserFavorite from "../../components/userPerfile/UserFavorite";
import UserPackage from "@/components/userPerfile/UserPackage";

export default function UserProfilePage() {
  return (
    <main className="w-full min-h-screen">
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Bienvenido a tu perfil, Alex!
        </h1>
      </header>

      <section className="w-full bg-gray-200 dark:bg-gray-900 ">
        <div className="container mx-auto max-w-3xl px-4 py-6">
          <Tabs defaultValue="perfil" className="w-full">
            {/* TABS */}
            <TabsList
              className="
              max-w-2xl
              grid
              grid-cols-2
              lg:grid-cols-3
              gap-2
              bg-muted
              rounded-lg
              h-auto!
              mx-auto
            "
            >
              <TabsTrigger
                value="perfil"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <User2 className="h-4 w-4" />
                Perfil
              </TabsTrigger>

              <TabsTrigger
                value="favoritos"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </TabsTrigger>

              <TabsTrigger
                value="pedidos"
                className="flex w-full items-center justify-center gap-2 text-sm"
              >
                <Package2 className="h-4 w-4" />
                Mis pedidos
              </TabsTrigger>
            </TabsList>

            {/* CONTENIDO */}

            <TabsContent value="perfil" className="mt-6 lg:mt-0">
              <InfoPerfil />
            </TabsContent>

            <TabsContent value="favoritos" className="mt-6 lg:mt-0">
              <UserFavorite />
            </TabsContent>

            <TabsContent value="pedidos" className="mt-6 lg:mt-0">
              <UserPackage />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
