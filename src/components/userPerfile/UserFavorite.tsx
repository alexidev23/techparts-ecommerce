import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

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

export default function UserFavorite() {
  return (
    // section en lugar de main — main va una sola vez en toda la página
    <section
      aria-labelledby="favorites-title"
      className="w-full h-full bg-gray-50 dark:bg-gray-950 rounded-lg p-6 my-10 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        {/* id único para este componente */}
        <h2
          id="favorites-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50"
        >
          Mis Favoritos
        </h2>
      </div>

      {/* ul es semánticamente correcto para una lista de items */}
      <ul className="space-y-4">
        {favorites.map((item) => (
          <li key={item.id}>
            <Card className="px-4 py-3">
              {/* flex en el card para poner imagen+info a la izquierda y botones a la derecha */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md shrink-0"
                />

                {/* Info ocupa todo el espacio disponible */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                    {item.name}
                  </h3>
                  <p className="text-xl font-bold text-green-500">
                    ${item.price.toLocaleString("es-AR")}
                  </p>
                  <Badge variant={item.stock > 0 ? "default" : "destructive"}>
                    {item.stock > 0 ? "En stock" : "Sin stock"}
                  </Badge>
                </div>

                {/* Botones al lado derecho, en columna pero juntos */}
                <div className="flex flex-col gap-2 shrink-0">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ver producto
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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
