import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Truck, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { formatPrice } from "@/utils/formatters";
import api from "@/lib/axios";
import { orderService } from "@/services/orderService";

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS = [
  { num: 1, label: "Envío" },
  { num: 2, label: "Confirmación" },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const shippingSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Ingresá un email válido"),
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),
  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo"),
  phone: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .regex(/^[0-9+\s\-()]+$/, "Ingresá un teléfono válido"),
  address: z.string().min(5, "Ingresá una dirección válida"),
  city: z.string().min(2, "Ingresá una ciudad válida"),
  postalCode: z
    .string()
    .min(4, "El código postal debe tener al menos 4 caracteres")
    .max(8, "El código postal es demasiado largo"),
  shippingMethod: z.enum(["standard", "express"]),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface OrderItemProps {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

function OrderItem({ image, name, quantity, price }: OrderItemProps) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded border">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          width={64}
          height={64}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 justify-between">
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cantidad: {quantity}
          </p>
        </div>
        <p className="text-sm font-medium">{formatPrice(price * quantity)}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(
    null,
  );

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      shippingMethod: "standard",
    },
  });

  const selectedShippingMethod = useWatch({
    control: form.control,
    name: "shippingMethod",
    defaultValue: "standard",
  });

  const shipping = useMemo(() => {
    if (totalPrice >= 50000) return 0;
    return selectedShippingMethod === "express" ? 1500 : 500;
  }, [totalPrice, selectedShippingMethod]);

  const total = useMemo(() => totalPrice + shipping, [totalPrice, shipping]);

  const onShippingSubmit = (values: ShippingFormValues) => {
    setShippingData(values);
    setStep(2);
  };

  const handleMercadoPago = async () => {
    if (!shippingData) return;
    setIsProcessing(true);
    try {
      const order = await orderService.create({
        shippingAddress: `${shippingData.address}, ${shippingData.city} (${shippingData.postalCode})`,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      const response = await api.post("/payments/preference", {
        orderId: order.id,
      });

      window.location.href = import.meta.env.DEV
        ? response.data.sandboxInitPoint
        : response.data.initPoint;
    } catch (error) {
      toast.error("Error al procesar el pago. Intentá nuevamente.");
      console.error("[MP Error]", error);
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Helmet>
          <title>Checkout | Tu Tienda</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Agrega productos para poder realizar una compra
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link to="/productos">Explorar productos</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>Checkout | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/carrito">
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
              Volver al carrito
            </Link>
          </Button>
          <h1 className="mt-4 text-3xl font-bold">Finalizar compra</h1>
        </nav>

        {/* Progress Steps */}
        <ol
          aria-label="Pasos del checkout"
          className="mb-8 flex items-center justify-center gap-4 list-none p-0"
        >
          {STEPS.map((s, idx) => (
            <li key={s.num} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step >= s.num
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
                aria-current={step === s.num ? "step" : undefined}
              >
                {s.num}
              </div>
              <span className="ml-2 hidden text-sm md:inline">{s.label}</span>
              {idx < 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 md:w-16 ${
                    step > s.num
                      ? "bg-blue-600"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="rounded-lg border bg-white p-6 dark:bg-slate-900">
                <div className="mb-6 flex items-center gap-3">
                  <Truck className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  <h2 className="text-xl font-semibold">
                    Información de envío
                  </h2>
                </div>

                <form onSubmit={form.handleSubmit(onShippingSubmit)}>
                  <FieldGroup>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Controller
                        name="firstName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                            <Input
                              {...field}
                              id="firstName"
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="lastName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                            <Input
                              {...field}
                              id="lastName"
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            placeholder="+54 11 1234-5678"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="address"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="address">Dirección</FieldLabel>
                          <Input
                            {...field}
                            id="address"
                            placeholder="Calle 123"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="city">Ciudad</FieldLabel>
                            <Input
                              {...field}
                              id="city"
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="postalCode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="postalCode">
                              Código Postal
                            </FieldLabel>
                            <Input
                              {...field}
                              id="postalCode"
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="shippingMethod"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Método de envío</FieldLabel>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="mt-3 space-y-3"
                          >
                            <div className="flex items-center justify-between rounded-lg border p-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="standard"
                                  id="standard"
                                />
                                <Label
                                  htmlFor="standard"
                                  className="cursor-pointer"
                                >
                                  <p className="font-medium">Envío estándar</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    3-5 días hábiles
                                  </p>
                                </Label>
                              </div>
                              <span className="font-medium">
                                {totalPrice >= 50000 ? "Gratis" : "$500"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="express" id="express" />
                                <Label
                                  htmlFor="express"
                                  className="cursor-pointer"
                                >
                                  <p className="font-medium">Envío express</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    24-48 horas
                                  </p>
                                </Label>
                              </div>
                              <span className="font-medium">$1.500</span>
                            </div>
                          </RadioGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <Button type="submit" size="lg" className="mt-6 w-full">
                    Continuar
                  </Button>
                </form>
              </div>
            )}

            {/* Step 2: Confirmation */}
            {step === 2 && shippingData && (
              <div className="rounded-lg border bg-white p-6 dark:bg-slate-900">
                <div className="mb-6 flex items-center gap-3">
                  <CheckCircle2
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <h2 className="text-xl font-semibold">Confirmar pedido</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Datos de envío
                    </h3>
                    <div className="rounded-lg border p-4 text-sm space-y-1">
                      <p className="font-medium">
                        {shippingData.firstName} {shippingData.lastName}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {shippingData.email}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {shippingData.phone}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {shippingData.address}, {shippingData.city} (
                        {shippingData.postalCode})
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Productos
                    </h3>
                    <ul className="space-y-3 list-none p-0">
                      {items.map((item) => (
                        <li key={item.product.id}>
                          <OrderItem
                            image={item.product.imgPrincipal}
                            name={item.product.name}
                            quantity={item.quantity}
                            price={item.product.price}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isProcessing}
                    onClick={handleMercadoPago}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2
                          className="mr-2 h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        Procesando...
                      </>
                    ) : (
                      "Pagar con Mercado Pago"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setStep(1)}
                    disabled={isProcessing}
                  >
                    Volver
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-white p-6 dark:bg-slate-900">
              <h2 className="mb-6 text-lg font-semibold">Resumen</h2>

              <ul className="mb-6 space-y-3 list-none p-0">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded border">
                      <img
                        src={item.product.imgPrincipal}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        width={64}
                        height={64}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

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

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
