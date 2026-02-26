import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Truck, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    shippingMethod: "standard",
    paymentMethod: "credit-card",
  });

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-AR")}`;
  };

  const getShippingCost = () => {
    if (totalPrice >= 50000) return 0;
    return formData.shippingMethod === "express" ? 1500 : 500;
  };

  const shipping = getShippingCost();
  const total = totalPrice + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Process order
      toast.success("¡Compra realizada con éxito!");
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  if (items.length === 0 && step < 4) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <h1>Tu carrito está vacío</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Agrega productos para poder realizar una compra
            </p>
            <Link to="/products">
              <Button className="mt-6" size="lg">
                Explorar productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Volver al carrito
            </Button>
          </Link>
          <h1 className="mt-4">Finalizar compra</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {[
            { num: 1, label: "Envío" },
            { num: 2, label: "Pago" },
            { num: 3, label: "Confirmación" },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  step >= s.num
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {s.num}
              </div>
              <span className="ml-2 hidden text-sm md:inline">{s.label}</span>
              {idx < 2 && (
                <div
                  className={`mx-2 h-0.5 w-8 md:w-16 ${
                    step > s.num
                      ? "bg-blue-600"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="rounded-lg border bg-white p-6 dark:bg-slate-900">
                  <div className="mb-6 flex items-center gap-3">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <h2>Información de envío</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+54 11 1234-5678"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Calle 123"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          required
                          value={formData.postalCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Método de envío</Label>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) =>
                          setFormData({ ...formData, shippingMethod: value })
                        }
                        className="mt-3 space-y-3"
                      >
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label
                              htmlFor="standard"
                              className="cursor-pointer"
                            >
                              <div>
                                <p>Envío estándar</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  3-5 días hábiles
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span>{totalPrice >= 50000 ? "Gratis" : "$500"}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="cursor-pointer">
                              <div>
                                <p>Envío express</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  24-48 horas
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span>$1.500</span>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="mt-6 w-full">
                    Continuar al pago
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="rounded-lg border bg-white p-6 dark:bg-slate-900">
                  <div className="mb-6 flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <h2>Método de pago</h2>
                  </div>

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMethod: value })
                    }
                    className="space-y-3"
                  >
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="cursor-pointer">
                          Tarjeta de crédito/débito
                        </Label>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="cursor-pointer">
                          Transferencia bancaria
                        </Label>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mercadopago" id="mercadopago" />
                        <Label htmlFor="mercadopago" className="cursor-pointer">
                          Mercado Pago
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Volver
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="rounded-lg border bg-white p-6 dark:bg-slate-900">
                  <div className="mb-6 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                    <h2>Confirmar pedido</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Shipping Info */}
                    <div>
                      <h3 className="mb-3 text-sm">Datos de envío</h3>
                      <div className="rounded-lg border p-4 text-sm">
                        <p>
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          {formData.email}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          {formData.phone}
                        </p>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                          {formData.address}, {formData.city} (
                          {formData.postalCode})
                        </p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="mb-3 text-sm">Método de pago</h3>
                      <div className="rounded-lg border p-4 text-sm">
                        <p>
                          {formData.paymentMethod === "credit-card" &&
                            "Tarjeta de crédito/débito"}
                          {formData.paymentMethod === "transfer" &&
                            "Transferencia bancaria"}
                          {formData.paymentMethod === "mercadopago" &&
                            "Mercado Pago"}
                        </p>
                      </div>
                    </div>

                    {/* Products */}
                    <div>
                      <h3 className="mb-3 text-sm">Productos</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex gap-3 rounded-lg border p-3"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded border">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 justify-between">
                              <div>
                                <p className="text-sm">{item.product.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Cantidad: {item.quantity}
                                </p>
                              </div>
                              <p className="text-sm">
                                {formatPrice(
                                  item.product.price * item.quantity,
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      Volver
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                      Confirmar compra
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h2 className="mb-6">Resumen</h2>

              <div className="mb-6 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item.product.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Subtotal
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Envío
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
