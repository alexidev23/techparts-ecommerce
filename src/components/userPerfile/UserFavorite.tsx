import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/formatters";
import { favoriteService, type FavoriteItem } from "@/services/favoriteService";

export default function UserFavorite() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await favoriteService.getMyFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await favoriteService.remove(productId);
      setFavorites((prev) => prev.filter((f) => f.productId !== productId));
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  if (loading) {
    return (
      <section className="my-10 w-full rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950">
        <p className="text-sm text-gray-500">Cargando favoritos...</p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="favorites-title"
      className="my-10 w-full rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-950"
    >
      <header className="mb-6 flex items-center justify-between">
        <h2
          id="favorites-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Mis Favoritos
        </h2>
      </header>

      {favorites.length === 0 ? (
        <p className="text-sm text-gray-500" role="status">
          No tenés productos en favoritos todavía.
        </p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((item) => (
            <li key={item.id}>
              <Card className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imgPrincipal}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                      {item.product.name}
                    </h3>
                    <p className="text-xl font-bold text-green-500">
                      {formatPrice(Number(item.product.price))}
                    </p>
                    <Badge
                      variant={
                        item.product.stock > 0 ? "default" : "destructive"
                      }
                      aria-label={
                        item.product.stock > 0
                          ? `${item.product.name} en stock`
                          : `${item.product.name} sin stock`
                      }
                    >
                      {item.product.stock > 0 ? "En stock" : "Sin stock"}
                    </Badge>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2">
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Link to={`/productos/${item.product.id}`}>
                        Ver producto
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
