import { Link } from "react-router-dom";
import { Smartphone, Facebook, Instagram, Twitter } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LINKS = [
  { label: "Pantallas", to: "/productos?category=Pantallas" },
  { label: "Baterías", to: "/productos?category=Baterías" },
  { label: "Accesorios", to: "/productos?category=Accesorios" },
  { label: "Cases", to: "/productos?category=Cases" },
];

const INFO_LINKS = [
  { label: "Sobre nosotros", to: "#" },
  { label: "Envíos y devoluciones", to: "#" },
  { label: "Garantías", to: "#" },
  { label: "Términos y condiciones", to: "#" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Twitter", href: "#", icon: Twitter },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="mb-4 flex items-center gap-2"
              aria-label="Ir al inicio"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Smartphone className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-semibold">TechParts</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tu tienda de confianza para repuestos y accesorios de celulares.
              Calidad garantizada.
            </p>
          </div>

          {/* Categorías */}
          <nav aria-label="Categorías">
            <h3 className="mb-4 font-semibold">Categorías</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Información */}
          <nav aria-label="Información">
            <h3 className="mb-4 font-semibold">Información</h3>
            <ul className="space-y-2 text-sm">
              {INFO_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div id="contacto">
            <h3 className="mb-4 font-semibold">Contacto</h3>
            <address className="not-italic">
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="mailto:info@techparts.com"
                    className="hover:text-blue-600"
                  >
                    info@techparts.com
                  </a>
                </li>
                <li>
                  <a href="tel:+541112345678" className="hover:text-blue-600">
                    +54 11 1234-5678
                  </a>
                </li>
                <li>Lun - Vie: 9:00 - 18:00</li>
              </ul>
            </address>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© {currentYear} TechParts. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
