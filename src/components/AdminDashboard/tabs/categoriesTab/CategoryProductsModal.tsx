import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

interface Product {
  id: string;
  name: string;
  stock: number;
  status: string;
}

interface CategoryProductsModalProps {
  categoryId: string | null;
  categoryName: string;
  open: boolean;
  onClose: () => void;
}

export function CategoryProductsModal({
  categoryId,
  categoryName,
  open,
  onClose,
}: CategoryProductsModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId || !open) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await adminService.getProductsByCategory(categoryId);
        setProducts(data);
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Productos en {categoryName}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-gray-500">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-gray-500">
            No hay productos en esta categoría.
          </p>
        ) : (
          <ul className="space-y-2 list-none p-0 max-h-80 overflow-y-auto">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between rounded-lg border px-4 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
                <Badge
                  variant={
                    product.status === "active" ? "default" : "destructive"
                  }
                >
                  {product.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
