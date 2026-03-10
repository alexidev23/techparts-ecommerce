import { useState } from "react";
import type { Category, Subcategory } from "@/types/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createCategoryColumns } from "./category-columns";
import { createSubcategoryColumns } from "./subcategory-columns";
import { DataTable } from "../data-table";

// --- DATOS MOCK ---
const mockCategories: Category[] = [
  {
    id: "c1",
    name: "Procesadores",
    subcategoryCount: 3,
    totalProducts: 24,
    status: "activo",
  },
  {
    id: "c2",
    name: "Tarjetas de video",
    subcategoryCount: 2,
    totalProducts: 18,
    status: "activo",
  },
  {
    id: "c3",
    name: "Memorias",
    subcategoryCount: 4,
    totalProducts: 32,
    status: "activo",
  },
  {
    id: "c4",
    name: "Almacenamiento",
    subcategoryCount: 3,
    totalProducts: 15,
    status: "inactivo",
  },
];

const mockSubcategories: Subcategory[] = [
  {
    id: "sc1",
    name: "Intel Core i9",
    parentCategory: "Procesadores",
    totalProducts: 8,
    status: "activo",
  },
  {
    id: "sc2",
    name: "AMD Ryzen 9",
    parentCategory: "Procesadores",
    totalProducts: 6,
    status: "activo",
  },
  {
    id: "sc3",
    name: "RTX Serie 40",
    parentCategory: "Tarjetas de video",
    totalProducts: 10,
    status: "activo",
  },
  {
    id: "sc4",
    name: "DDR5",
    parentCategory: "Memorias",
    totalProducts: 12,
    status: "activo",
  },
  {
    id: "sc5",
    name: "NVMe M.2",
    parentCategory: "Almacenamiento",
    totalProducts: 9,
    status: "inactivo",
  },
];

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [subcategories, setSubcategories] =
    useState<Subcategory[]>(mockSubcategories);

  // --- Estados para modales de edición ---
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);

  // --- Estados para AlertDialog de eliminación ---
  // Guardamos el id del item a eliminar — null = cerrado
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const [deletingSubcategoryId, setDeletingSubcategoryId] = useState<
    string | null
  >(null);

  // --- Handlers de categorías ---
  const handleDeleteCategory = (id: string) => {
    // Primero el AlertDialog pide confirmación, recién acá eliminamos
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeletingCategoryId(null); // cerramos el AlertDialog
  };

  // --- Handlers de subcategorías ---
  const handleDeleteSubcategory = (id: string) => {
    setSubcategories((prev) => prev.filter((s) => s.id !== id));
    setDeletingSubcategoryId(null);
  };

  // --- Columnas ---
  const categoryColumns = createCategoryColumns({
    onEdit: setEditingCategory,
    // onDelete solo abre el AlertDialog, NO elimina todavía
    onDelete: setDeletingCategoryId,
  });

  const subcategoryColumns = createSubcategoryColumns({
    onEdit: setEditingSubcategory,
    onDelete: setDeletingSubcategoryId,
  });

  return (
    <div className="p-6 space-y-10 bg-white rounded-lg shadow dark:bg-gray-950">
      {/* ===== SECCIÓN CATEGORÍAS ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
            <p className="text-muted-foreground">
              Administrá las categorías de productos de TechParts
            </p>
          </div>

          {/* Agregar categoría — DialogTrigger sin estado */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar categoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nueva categoría</DialogTitle>
                <DialogDescription>
                  Completá los datos de la nueva categoría
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input placeholder="Nombre de la categoría" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar categoría</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={categoryColumns} data={categories} />
      </section>

      {/* ===== SECCIÓN SUBCATEGORÍAS ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Subcategorías</h1>
            <p className="text-muted-foreground">
              Administrá las subcategorías de productos de TechParts
            </p>
          </div>

          {/* Agregar subcategoría — DialogTrigger sin estado */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar subcategoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nueva subcategoría</DialogTitle>
                <DialogDescription>
                  Completá los datos de la nueva subcategoría
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input placeholder="Nombre de la subcategoría" />
                <Input placeholder="Categoría principal" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar subcategoría</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={subcategoryColumns} data={subcategories} />
      </section>

      {/* ===== MODAL EDITAR CATEGORÍA ===== */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar categoría</DialogTitle>
            <DialogDescription>
              Modificá los datos de {editingCategory?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Nombre" defaultValue={editingCategory?.name} />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setEditingCategory(null)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setEditingCategory(null)}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== MODAL EDITAR SUBCATEGORÍA ===== */}
      <Dialog
        open={!!editingSubcategory}
        onOpenChange={() => setEditingSubcategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar subcategoría</DialogTitle>
            <DialogDescription>
              Modificá los datos de {editingSubcategory?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Nombre"
              defaultValue={editingSubcategory?.name}
            />
            <Input
              placeholder="Categoría principal"
              defaultValue={editingSubcategory?.parentCategory}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setEditingSubcategory(null)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setEditingSubcategory(null)}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== ALERTDIALOG ELIMINAR CATEGORÍA ===== */}
      <AlertDialog
        open={!!deletingCategoryId}
        onOpenChange={() => setDeletingCategoryId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán{" "}
              <span className="font-semibold text-red-600">
                todos los productos
              </span>{" "}
              que estén dentro de esta categoría.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingCategoryId(null)}>
              Cancelar
            </AlertDialogCancel>
            {/* Recién acá ejecutamos la eliminación real */}
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleDeleteCategory(deletingCategoryId!)}
            >
              Sí, eliminar categoría
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ===== ALERTDIALOG ELIMINAR SUBCATEGORÍA ===== */}
      <AlertDialog
        open={!!deletingSubcategoryId}
        onOpenChange={() => setDeletingSubcategoryId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán{" "}
              <span className="font-semibold text-red-600">
                todos los productos
              </span>{" "}
              que estén dentro de esta subcategoría.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingSubcategoryId(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleDeleteSubcategory(deletingSubcategoryId!)}
            >
              Sí, eliminar subcategoría
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
