import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SponsorsCarousel } from "@/components/layout/SponsorsCarousel";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <SponsorsCarousel />
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
