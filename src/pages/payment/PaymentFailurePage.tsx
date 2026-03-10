import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailurePage() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <>
      <Helmet>
        <title>Pago fallido | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <XCircle
                  className="h-12 w-12 text-red-600 dark:text-red-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
              El pago no se pudo procesar
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Hubo un problema con tu pago. Podés intentarlo nuevamente o elegir
              otro método de pago.
            </p>

            {paymentId && (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Número de pago:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {paymentId}
                </span>
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link to="/checkout">Reintentar pago</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/carrito">Volver al carrito</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
