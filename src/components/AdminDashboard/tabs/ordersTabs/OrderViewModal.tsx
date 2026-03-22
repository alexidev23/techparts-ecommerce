import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AdminOrder } from "@/services/adminService";
import type { OrderStatus } from "@/types/orders";
import { formatPrice } from "@/utils/formatters";

const STATUS_STYLES: Record<OrderStatus, string> = {
  procesando: "text-yellow-600 bg-yellow-100",
  enviado: "text-blue-600 bg-blue-100",
  entregado: "text-green-600 bg-green-100",
  cancelado: "text-red-600 bg-red-100",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  procesando: "Procesando",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

interface OrderViewModalProps {
  order: AdminOrder | null;
  open: boolean;
  onClose: () => void;
}

export function OrderViewModal({ order, open, onClose }: OrderViewModalProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Pedido #{order.id.slice(0, 8).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Estado y fecha */}
          <div className="flex items-center justify-between">
            <Badge className={STATUS_STYLES[order.status]}>
              {STATUS_LABELS[order.status]}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("es-AR")}
            </span>
          </div>

          <Separator />

          {/* Cliente */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Cliente</p>
            <p className="font-medium">{order.user.name ?? order.user.email}</p>
            <p className="text-sm text-gray-500">{order.user.email}</p>
          </div>

          {/* Dirección */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">
              Dirección de envío
            </p>
            <p className="text-sm">{order.shippingAddress}</p>
          </div>

          <Separator />

          {/* Items */}
          {order.items.length > 0 ? (
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Productos
              </p>
              <ul className="space-y-2 list-none p-0">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.imgPrincipal}
                        alt={item.product.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                      <span>{item.product.name}</span>
                      <span className="text-gray-400">x{item.quantity}</span>
                    </div>
                    <span className="font-medium">
                      {formatPrice(Number(item.price) * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Sin productos registrados</p>
          )}

          <Separator />

          {/* Total */}
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-blue-600">
              {formatPrice(Number(order.totalPrice))}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
