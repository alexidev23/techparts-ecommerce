import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/formatters";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
// TODO: reemplazar con datos reales del backend

const favorites: FavoriteItem[] = [
  {
    id: "1",
    name: "Pantalla OLED iPhone 13 Pro",
    price: 89990,
    image:
      "https://images.unsplash.com/photo-1676173646307-d050e097d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM3NDg2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 0,
  },
  {
    id: "2",
    name: "Batería Samsung Galaxy S21",
    price: 34990,
    image:
      "https://images.unsplash.com/photo-1542222216855-78ff1bcf9252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGJhdHRlcnklMjBjaGFyZ2VyfGVufDF8fHx8MTc2MzgyNjYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 32,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function UserFavorite() {
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

      <ul className="space-y-4">
        {favorites.map((item) => (
          <li key={item.id}>
            <Card className="px-4 py-3">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-md object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                    {item.name}
                  </h3>
                  <p className="text-xl font-bold text-green-500">
                    {formatPrice(item.price)}
                  </p>
                  <Badge
                    variant={item.stock > 0 ? "default" : "destructive"}
                    aria-label={
                      item.stock > 0
                        ? `${item.name} en stock`
                        : `${item.name} sin stock`
                    }
                  >
                    {item.stock > 0 ? "En stock" : "Sin stock"}
                  </Badge>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link to={`/productos/${item.id}`}>Ver producto</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
