import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
