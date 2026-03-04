import { Link } from "react-router-dom";
import { Smartphone, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span>TechParts</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tu tienda de confianza para repuestos y accesorios de celulares.
              Calidad garantizada.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/productos?category=Pantallas"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Pantallas
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?category=Baterías"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Baterías
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?category=Accesorios"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Accesorios
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?category=Cases"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Envíos y devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Garantías
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
                >
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contacto">
            <h3 className="mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Email: info@techparts.com</li>
              <li>Tel: +54 11 1234-5678</li>
              <li>Lun - Vie: 9:00 - 18:00</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© 2025 TechParts. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
