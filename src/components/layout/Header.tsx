import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/hook/useAuth";
import { categoryService, type Category } from "@/services/categoryService";

export function Header() {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      navigate(`/productos?search=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 dark:bg-slate-950/95 dark:supports-backdrop-filter:bg-slate-950/80">
      {/* Top Bar */}
      <div className="border-b bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <p className="text-slate-600 dark:text-slate-400">
              Envío gratis en compras superiores a $50.000
            </p>
            <div className="hidden items-center gap-4 md:flex">
              <Link
                to="/ayuda"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                Ayuda
              </Link>
              <a
                href="#contacto"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Ir al inicio"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Smartphone className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="hidden md:block font-semibold">TechParts</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 max-w-xl lg:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Buscar repuestos y accesorios..."
                className="w-full pl-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchSubmit}
                aria-label="Buscar productos"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Abrir buscador"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Cart */}
            <Link to="/carrito" aria-label="Ir al carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {totalItems > 0 && (
                  <Badge className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <UserMenu user={user} />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <nav
                  className="mt-8 flex flex-col gap-4 px-4"
                  aria-label="Menú móvil"
                >
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-900 hover:text-blue-600 dark:text-slate-100"
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/productos"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-900 hover:text-blue-600 dark:text-slate-100"
                  >
                    Todos los productos
                  </Link>
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        to={`/productos?category=${category.name}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="pl-4 text-slate-600 hover:text-blue-600 dark:text-slate-400"
                      >
                        {category.name}
                      </Link>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/productos?category=${sub.name}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block pl-8 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-500"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="pb-4 lg:hidden">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Buscar repuestos y accesorios..."
                className="w-full pl-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchSubmit}
                aria-label="Buscar productos"
              />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Categories */}
      <div className="hidden border-t lg:block">
        <div className="container mx-auto px-4">
          <nav
            className="flex h-12 items-center gap-6"
            aria-label="Categorías de productos"
          >
            {/* Dropdown de categorías */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 text-sm ${
                    isActive("/productos")
                      ? "text-blue-600"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Menu className="h-4 w-4" aria-hidden="true" />
                  Categorías
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/productos" className="cursor-pointer">
                    Todos los productos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <div key={category.id}>
                    <DropdownMenuLabel className="text-xs text-slate-500">
                      {category.name}
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link
                        to={`/productos?category=${category.name}`}
                        className="cursor-pointer"
                      >
                        Ver todos en {category.name}
                      </Link>
                    </DropdownMenuItem>
                    {category.subcategories.map((sub) => (
                      <DropdownMenuItem key={sub.id} asChild>
                        <Link
                          to={`/productos?category=${sub.name}`}
                          className="cursor-pointer pl-6 text-slate-500"
                        >
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Links directos de categorías */}
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/productos?category=${category.name}`}
                className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
