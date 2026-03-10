import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentPendingPage() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <>
      <Helmet>
        <title>Pago pendiente | Tu Tienda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <Clock
                  className="h-12 w-12 text-yellow-600 dark:text-yellow-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
              Pago pendiente
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Tu pago está siendo procesado. Esto puede tardar algunas horas
              dependiendo del medio de pago elegido. Te notificaremos por email
              cuando se confirme.
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
