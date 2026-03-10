import { useState } from "react";
import type { Product, ProductStatus } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createColumns } from "./columns";
import { DataTable } from "../data-table";

const mockProducts: Product[] = [
  {
    id: "a1b2c3d4e5f6",
    name: "Motherboard ASUS ROG",
    category: "Placas madre",
    price: 85000,
    stock: 12,
    status: "activo",
  },
  {
    id: "b2c3d4e5f6a1",
    name: "GPU RTX 4070",
    category: "Tarjetas de video",
    price: 320000,
    stock: 3,
    status: "activo",
  },
  {
    id: "c3d4e5f6a1b2",
    name: "RAM Corsair 32GB DDR5",
    category: "Memorias",
    price: 45000,
    stock: 8,
    status: "activo",
  },
  {
    id: "d4e5f6a1b2c3",
    name: "SSD Samsung 1TB NVMe",
    category: "Almacenamiento",
    price: 38000,
    stock: 0,
    status: "inactivo",
  },
  {
    id: "e5f6a1b2c3d4",
    name: "CPU Intel Core i9",
    category: "Procesadores",
    price: 195000,
    stock: 5,
    status: "activo",
  },
  {
    id: "f6a1b2c3d4e5",
    name: "Fuente Corsair 850W",
    category: "Fuentes",
    price: 52000,
    stock: 2,
    status: "activo",
  },
];

export default function ProductsTabs() {
  // Estado de los productos — en el futuro vendrá de tu API
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // Estado que controla si el modal de agregar está abierto
  const [modalOpen, setModalOpen] = useState(false);

  // Función que maneja el toggle de estado de un producto
  // La definimos acá en la página porque es quien maneja los datos
  const handleToggleStatus = (id: string, currentStatus: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: currentStatus === "activo" ? "inactivo" : "activo" }
          : p,
      ),
    );
  };

  // Creamos las columnas pasándole la función de toggle
  // Usamos createColumns en lugar del array directo porque necesitamos pasarle props
  const columns = createColumns({ onToggleStatus: handleToggleStatus });

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow dark:bg-gray-950">
      {/* Encabezado con botón de agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">
            Administrá todos los productos de TechParts
          </p>
        </div>
        {/* Botón que abre el modal */}
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar producto
        </Button>
      </div>

      <DataTable columns={columns} data={products} />

      {/* Modal de agregar producto */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar nuevo producto</DialogTitle>
            <DialogDescription>
              Completá los datos del nuevo producto para TechParts
            </DialogDescription>
          </DialogHeader>

          {/* Formulario básico — lo expandís con react-hook-form + zod cuando estés listo */}
          <div className="space-y-4 py-2">
            <Input placeholder="Nombre del producto" />
            <Input placeholder="Categoría" />
            <Input placeholder="Precio" type="number" />
            <Input placeholder="Stock inicial" type="number" />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setModalOpen(false)}>
                Guardar producto
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
