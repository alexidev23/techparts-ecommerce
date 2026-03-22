import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AdminProduct } from "@/services/adminService";
import { formatPrice } from "@/utils/formatters";

interface ProductViewModalProps {
  product: AdminProduct | null;
  open: boolean;
  onClose: () => void;
}

export function ProductViewModal({
  product,
  open,
  onClose,
}: ProductViewModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalle del producto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <img
            src={product.imgPrincipal}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
          </div>

          <Separator />

          <dl className="space-y-3">
            {[
              { label: "Categoría", value: product.category.name },
              { label: "Marca", value: product.brand },
              { label: "Precio", value: formatPrice(Number(product.price)) },
              {
                label: "Descuento",
                value:
                  product.discountPercent > 0
                    ? `${product.discountPercent}%`
                    : "Sin descuento",
              },
              { label: "Stock", value: `${product.stock} unidades` },
              {
                label: "Rating",
                value: product.rating
                  ? `${Number(product.rating).toFixed(1)} / 5`
                  : "Sin rating",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b pb-2">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="text-sm font-medium">{value}</dd>
              </div>
            ))}
            <div className="flex justify-between border-b pb-2">
              <dt className="text-sm text-gray-500">Estado</dt>
              <dd>
                <Badge
                  variant={
                    product.status === "active" ? "default" : "destructive"
                  }
                >
                  {product.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </dd>
            </div>
          </dl>
        </div>
      </DialogContent>
    </Dialog>
  );
}
