import { useState } from "react";
import type { Sponsor, Ad, SponsorStatus, AdStatus } from "@/types/sponsor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createSponsorColumns } from "./sponsor-columns";
import { createAdColumns } from "./ad-columns";
import { DataTable } from "../data-table";

// --- DATOS MOCK ---
const mockSponsors: Sponsor[] = [
  {
    id: "s1",
    name: "Intel",
    category: "Procesadores",
    since: "2023-01-10",
    status: "activo",
  },
  {
    id: "s2",
    name: "NVIDIA",
    category: "GPU",
    since: "2023-03-15",
    status: "activo",
  },
  {
    id: "s3",
    name: "Corsair",
    category: "Periféricos",
    since: "2023-06-01",
    status: "inactivo",
  },
  {
    id: "s4",
    name: "Samsung",
    category: "Almacenamiento",
    since: "2024-01-20",
    status: "activo",
  },
];

const mockAds: Ad[] = [
  {
    id: "ad1",
    title: "Banner Intel Core i9",
    position: "Banner superior",
    clicks: 4320,
    status: "activo",
  },
  {
    id: "ad2",
    title: "Promo RTX 4070",
    position: "Sidebar",
    clicks: 2150,
    status: "activo",
  },
  {
    id: "ad3",
    title: "Oferta Corsair RAM",
    position: "Banner inferior",
    clicks: 980,
    status: "inactivo",
  },
  {
    id: "ad4",
    title: "Samsung SSD Campaña",
    position: "Pop-up",
    clicks: 6700,
    status: "activo",
  },
];

export default function SponsorsTab() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(mockSponsors);
  const [ads, setAds] = useState<Ad[]>(mockAds);

  // --- Estados para modales de edición ---
  // null = modal cerrado, con valor = modal abierto con ese item
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  // --- Handlers de Sponsors ---
  const handleToggleSponsor = (id: string, currentStatus: SponsorStatus) => {
    setSponsors((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: currentStatus === "activo" ? "inactivo" : "activo" }
          : s,
      ),
    );
  };

  const handleDeleteSponsor = (id: string) => {
    setSponsors((prev) => prev.filter((s) => s.id !== id));
  };

  // --- Handlers de Publicidades ---
  const handleToggleAd = (id: string, currentStatus: AdStatus) => {
    setAds((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: currentStatus === "activo" ? "inactivo" : "activo" }
          : a,
      ),
    );
  };

  const handleDeleteAd = (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id));
  };

  // --- Columnas ---
  const sponsorColumns = createSponsorColumns({
    onToggleStatus: handleToggleSponsor,
    onEdit: setEditingSponsor,
    onDelete: handleDeleteSponsor,
  });

  const adColumns = createAdColumns({
    onToggleStatus: handleToggleAd,
    onEdit: setEditingAd,
    onDelete: handleDeleteAd,
  });

  return (
    <div className="p-6 space-y-10 bg-white rounded-lg shadow dark:bg-gray-950">
      {/* ===== SECCIÓN SPONSORS ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Sponsors</h1>
            <p className="text-muted-foreground">
              Administrá los sponsors de TechParts
            </p>
          </div>

          {/* Agregar sponsor — DialogTrigger sin estado */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar sponsor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nuevo sponsor</DialogTitle>
                <DialogDescription>
                  Completá los datos del nuevo sponsor
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input placeholder="Nombre del sponsor" />
                <Input placeholder="Categoría" />
                <Input placeholder="Fecha de inicio" type="date" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar sponsor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={sponsorColumns} data={sponsors} />
      </section>

      {/* ===== SECCIÓN PUBLICIDADES ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Publicidades</h1>
            <p className="text-muted-foreground">
              Administrá las publicidades activas de TechParts
            </p>
          </div>

          {/* Agregar publicidad — DialogTrigger sin estado */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar publicidad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nueva publicidad</DialogTitle>
                <DialogDescription>
                  Completá los datos de la nueva publicidad
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input placeholder="Título de la publicidad" />
                <Input placeholder="Posición (ej: Banner superior)" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar publicidad</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={adColumns} data={ads} />
      </section>

      {/* ===== MODAL EDITAR SPONSOR — controlado por estado ===== */}
      <Dialog
        open={!!editingSponsor}
        onOpenChange={() => setEditingSponsor(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar sponsor</DialogTitle>
            <DialogDescription>
              Modificá los datos de {editingSponsor?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Nombre" defaultValue={editingSponsor?.name} />
            <Input
              placeholder="Categoría"
              defaultValue={editingSponsor?.category}
            />
            <Input
              placeholder="Desde"
              type="date"
              defaultValue={editingSponsor?.since}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditingSponsor(null)}>
                Cancelar
              </Button>
              <Button onClick={() => setEditingSponsor(null)}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== MODAL EDITAR PUBLICIDAD — controlado por estado ===== */}
      <Dialog open={!!editingAd} onOpenChange={() => setEditingAd(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar publicidad</DialogTitle>
            <DialogDescription>
              Modificá los datos de {editingAd?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Título" defaultValue={editingAd?.title} />
            <Input placeholder="Posición" defaultValue={editingAd?.position} />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditingAd(null)}>
                Cancelar
              </Button>
              <Button onClick={() => setEditingAd(null)}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
