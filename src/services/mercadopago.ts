// ─── Types ────────────────────────────────────────────────────────────────────

export interface MPItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

export interface MPPreferenceData {
  items: MPItem[];
  payer?: {
    email: string;
    name: string;
    surname: string;
    phone?: string;
  };
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: "approved" | "all";
}

export interface MPPreferenceResponse {
  id: string;
  init_point: string; // URL de pago producción
  sandbox_init_point: string; // URL de pago sandbox (testing)
}

// ─── Service ──────────────────────────────────────────────────────────────────

const IS_PRODUCTION = import.meta.env.PROD;

/**
 * Crea una preferencia de pago en Mercado Pago.
 *
 * HOY: Simula la respuesta para desarrollo frontend.
 * DESPUÉS: Descomentar el fetch real y eliminar la simulación.
 */
export async function createMPPreference(
  data: MPPreferenceData,
): Promise<MPPreferenceResponse> {
  // ── Simulación (eliminar cuando el backend esté listo) ──────────────────
  console.log("[MP Simulado] Preferencia generada con:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simula latencia

  return {
    id: "mock-preference-id-123",
    init_point:
      "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=mock",
    sandbox_init_point: `${window.location.origin}/pago/exitoso?payment_id=mock&status=approved&external_reference=mock`,
  };
  // ── Fin simulación ──────────────────────────────────────────────────────

  // ── Real (descomentar cuando el backend esté listo) ─────────────────────
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mercadopago/preference`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  //
  // if (!response.ok) {
  //   throw new Error("Error al crear la preferencia de pago");
  // }
  //
  // return response.json();
  // ── Fin real ─────────────────────────────────────────────────────────────
}

/**
 * Devuelve la URL correcta según el entorno.
 * En desarrollo usa sandbox_init_point, en producción init_point.
 */
export function getMPCheckoutUrl(preference: MPPreferenceResponse): string {
  return IS_PRODUCTION ? preference.init_point : preference.sandbox_init_point;
}
