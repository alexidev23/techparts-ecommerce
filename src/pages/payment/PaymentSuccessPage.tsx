import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  // Limpiamos el carrito cuando el pago fue exitoso
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Helmet>
        <title>Pago exitoso | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle2
                  className="h-12 w-12 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
              ¡Pago realizado con éxito!
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Tu pedido fue confirmado. Te enviaremos un email con los detalles
              de tu compra y el seguimiento del envío.
            </p>

            {paymentId && (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Número de pago:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {paymentId}
                </span>
              </p>
            )}

            {externalReference && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Referencia:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {externalReference}
                </span>
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link to="/productos">Seguir comprando</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Ir al inicio</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
