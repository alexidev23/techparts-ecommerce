import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Sponsor } from "@/types/sponsor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "../data-table";
import { createSponsorColumns } from "./sponsor-columns";
import { adminService, type AdminSponsor } from "@/services/adminService";

interface SponsorsTabProps {
  sponsors: AdminSponsor[];
  onSponsorsChange: (sponsors: AdminSponsor[]) => void;
}

export default function SponsorsTab({
  sponsors,
  onSponsorsChange,
}: SponsorsTabProps) {
  const [editingSponsor, setEditingSponsor] = useState<AdminSponsor | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    logo: "",
    link: "",
  });

  const handleAdd = async () => {
    if (!newSponsor.name || !newSponsor.logo || !newSponsor.link) {
      toast.error("Todos los campos son requeridos");
      return;
    }
    try {
      const created = await adminService.createSponsor(newSponsor);
      onSponsorsChange([created, ...sponsors]);
      toast.success("Sponsor agregado correctamente");
      setNewSponsor({ name: "", logo: "", link: "" });
      setAddOpen(false);
    } catch {
      toast.error("Error al agregar el sponsor");
    }
  };

  const handleEdit = async () => {
    if (!editingSponsor) return;
    try {
      const updated = await adminService.updateSponsor(editingSponsor.id, {
        name: editingSponsor.name,
        logo: editingSponsor.logo,
        link: editingSponsor.link,
      });
      onSponsorsChange(
        sponsors.map((s) => (s.id === updated.id ? updated : s)),
      );
      toast.success("Sponsor actualizado correctamente");
      setEditingSponsor(null);
    } catch {
      toast.error("Error al actualizar el sponsor");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const updated = await adminService.updateSponsor(id, {
        status: newStatus,
      });
      onSponsorsChange(sponsors.map((s) => (s.id === id ? updated : s)));
      toast.success("Estado actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el estado");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminService.deleteSponsor(id);
      onSponsorsChange(sponsors.filter((s) => s.id !== id));
      toast.success("Sponsor eliminado correctamente");
    } catch {
      toast.error("Error al eliminar el sponsor");
    }
  };

  const sponsorColumns = createSponsorColumns({
    onEdit: (s) => setEditingSponsor(s as AdminSponsor),
    onDelete: handleDelete,
    onToggleStatus: handleToggleStatus,
  });

  return (
    <div className="p-6 space-y-10 bg-white rounded-lg shadow dark:bg-gray-950">
      {/* SPONSORS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Sponsors</h2>
            <p className="text-muted-foreground">
              Administrá los sponsors del carrusel de TechParts
            </p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar sponsor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nuevo sponsor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input
                  placeholder="Nombre del sponsor"
                  value={newSponsor.name}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, name: e.target.value })
                  }
                />
                <Input
                  placeholder="URL del logo"
                  value={newSponsor.logo}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, logo: e.target.value })
                  }
                />
                <Input
                  placeholder="URL del sitio web"
                  value={newSponsor.link}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, link: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setAddOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAdd}>Guardar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          columns={sponsorColumns}
          data={sponsors as unknown as Sponsor[]}
        />
      </section>

      {/* PUBLICIDADES — placeholder */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Publicidades</h2>
          <p className="text-muted-foreground">
            Administrá las publicidades activas de TechParts
          </p>
        </div>
        <div className="flex items-center justify-center rounded-lg border border-dashed p-12">
          <p className="text-muted-foreground text-sm">Próximamente</p>
        </div>
      </section>

      {/* MODAL EDITAR SPONSOR */}
      <Dialog
        open={!!editingSponsor}
        onOpenChange={() => setEditingSponsor(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar sponsor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Nombre"
              value={editingSponsor?.name ?? ""}
              onChange={(e) =>
                setEditingSponsor((prev) =>
                  prev ? { ...prev, name: e.target.value } : null,
                )
              }
            />
            <Input
              placeholder="URL del logo"
              value={editingSponsor?.logo ?? ""}
              onChange={(e) =>
                setEditingSponsor((prev) =>
                  prev ? { ...prev, logo: e.target.value } : null,
                )
              }
            />
            <Input
              placeholder="URL del sitio web"
              value={editingSponsor?.link ?? ""}
              onChange={(e) =>
                setEditingSponsor((prev) =>
                  prev ? { ...prev, link: e.target.value } : null,
                )
              }
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingSponsor(null)}>
                Cancelar
              </Button>
              <Button onClick={handleEdit}>Guardar cambios</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
