import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "../data-table";
import { createCategoryColumns } from "./category-columns";
import { createSubcategoryColumns } from "./subcategory-columns";
import { CategoryProductsModal } from "./CategoryProductsModal";
import {
  adminService,
  type AdminCategory,
  type AdminSubcategory,
} from "@/services/adminService";
import type { Category, Subcategory } from "@/types/category";

interface CategoriesTabProps {
  categories: AdminCategory[];
  subcategories: AdminSubcategory[];
  onCategoriesChange: (categories: AdminCategory[]) => void;
  onSubcategoriesChange: (subcategories: AdminSubcategory[]) => void;
}

export default function CategoriesTab({
  categories,
  subcategories,
  onCategoriesChange,
  onSubcategoriesChange,
}: CategoriesTabProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const [deletingSubcategoryId, setDeletingSubcategoryId] = useState<
    string | null
  >(null);
  const [viewProductsCategory, setViewProductsCategory] =
    useState<AdminCategory | null>(null);

  // Agregar categoría
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  // Agregar subcategoría
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryCategoryId, setNewSubcategoryCategoryId] = useState("");
  const [addSubcategoryOpen, setAddSubcategoryOpen] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const newCat = await adminService.createCategory(newCategoryName);
      onCategoriesChange([...categories, newCat]);
      toast.success("Categoría agregada correctamente");
      setNewCategoryName("");
      setAddCategoryOpen(false);
    } catch {
      toast.error("Error al agregar la categoría");
    }
  };

  const handleAddSubcategory = async () => {
    if (!newSubcategoryName.trim() || !newSubcategoryCategoryId) return;
    try {
      const newSub = await adminService.createSubcategory(
        newSubcategoryName,
        newSubcategoryCategoryId,
      );
      onSubcategoriesChange([...subcategories, newSub]);

      // Actualizamos el count de subcategorías en la categoría padre
      onCategoriesChange(
        categories.map((c) =>
          c.id === newSubcategoryCategoryId
            ? { ...c, subcategories: [...(c.subcategories ?? []), newSub] }
            : c,
        ),
      );

      toast.success("Subcategoría agregada correctamente");
      setNewSubcategoryName("");
      setNewSubcategoryCategoryId("");
      setAddSubcategoryOpen(false);
    } catch {
      toast.error("Error al agregar la subcategoría");
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;
    try {
      const updated = await adminService.updateCategory(editingCategory.id, {
        name: editingCategory.name,
      });
      onCategoriesChange(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...updated } : c,
        ),
      );
      toast.success("Categoría actualizada correctamente");
      setEditingCategory(null);
    } catch {
      toast.error("Error al actualizar la categoría");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const category = categories.find((c) => c.id === id);

    if (category && category.subcategories.length > 0) {
      toast.error(
        "Esta categoría tiene subcategorías. Eliminá primero las subcategorías.",
      );
      setDeletingCategoryId(null);
      return;
    }

    try {
      await adminService.deleteCategory(id);
      onCategoriesChange(categories.filter((c) => c.id !== id));
      toast.success("Categoría eliminada correctamente");
    } catch {
      toast.error("Error al eliminar la categoría");
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const handleDeleteSubcategory = async (id: string) => {
    try {
      const subToDelete = subcategories.find((s) => s.id === id);
      await adminService.deleteSubcategory(id);
      onSubcategoriesChange(subcategories.filter((s) => s.id !== id));

      // Actualizamos la categoría padre sacando la subcategoría eliminada
      if (subToDelete) {
        onCategoriesChange(
          categories.map((c) =>
            c.id === subToDelete.categoryId
              ? {
                  ...c,
                  subcategories: c.subcategories.filter((s) => s.id !== id),
                }
              : c,
          ),
        );
      }

      toast.success("Subcategoría eliminada correctamente");
    } catch {
      toast.error("Error al eliminar la subcategoría");
    } finally {
      setDeletingSubcategoryId(null);
    }
  };

  const categoryColumns = createCategoryColumns({
    onEdit: (cat) => setEditingCategory(cat as unknown as Category),
    onDelete: setDeletingCategoryId,
    onViewProducts: (cat) => setViewProductsCategory(cat as AdminCategory),
  });

  const subcategoryColumns = createSubcategoryColumns({
    onEdit: (sub) => setEditingSubcategory(sub as unknown as Subcategory),
    onDelete: setDeletingSubcategoryId,
    onViewProducts: () => {},
  });

  return (
    <div className="p-6 space-y-10 bg-white rounded-lg shadow dark:bg-gray-950">
      {/* CATEGORÍAS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Categorías</h2>
            <p className="text-muted-foreground">
              Administrá las categorías de productos de TechParts
            </p>
          </div>
          <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar categoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nueva categoría</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input
                  placeholder="Nombre de la categoría"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setAddCategoryOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddCategory}>Guardar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <DataTable
          columns={categoryColumns}
          data={categories as unknown as Category[]}
        />
      </section>

      {/* SUBCATEGORÍAS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Subcategorías</h2>
            <p className="text-muted-foreground">
              Administrá las subcategorías de productos de TechParts
            </p>
          </div>
          <Dialog
            open={addSubcategoryOpen}
            onOpenChange={setAddSubcategoryOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar subcategoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nueva subcategoría</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input
                  placeholder="Nombre de la subcategoría"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                />
                <Select
                  value={newSubcategoryCategoryId}
                  onValueChange={setNewSubcategoryCategoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setAddSubcategoryOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddSubcategory}>Guardar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <DataTable
          columns={subcategoryColumns}
          data={subcategories as unknown as Subcategory[]}
        />
      </section>

      {/* MODAL VER PRODUCTOS */}
      <CategoryProductsModal
        categoryId={viewProductsCategory?.id ?? null}
        categoryName={viewProductsCategory?.name ?? ""}
        open={!!viewProductsCategory}
        onClose={() => setViewProductsCategory(null)}
      />

      {/* MODAL EDITAR CATEGORÍA */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar categoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              value={editingCategory?.name ?? ""}
              onChange={(e) =>
                setEditingCategory((prev) =>
                  prev ? { ...prev, name: e.target.value } : null,
                )
              }
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingCategory(null)}
              >
                Cancelar
              </Button>
              <Button onClick={handleEditCategory}>Guardar cambios</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL EDITAR SUBCATEGORÍA */}
      <Dialog
        open={!!editingSubcategory}
        onOpenChange={() => setEditingSubcategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar subcategoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              value={editingSubcategory?.name ?? ""}
              onChange={(e) =>
                setEditingSubcategory((prev) =>
                  prev ? { ...prev, name: e.target.value } : null,
                )
              }
            />
            <div className="flex justify-end gap-2">
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

      {/* ALERTDIALOG ELIMINAR CATEGORÍA */}
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
              de esta categoría.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleDeleteCategory(deletingCategoryId!)}
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ALERTDIALOG ELIMINAR SUBCATEGORÍA */}
      <AlertDialog
        open={!!deletingSubcategoryId}
        onOpenChange={() => setDeletingSubcategoryId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleDeleteSubcategory(deletingSubcategoryId!)}
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
