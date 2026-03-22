import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "../data-table";
import { createProductColumns } from "./columns";
import { ProductViewModal } from "./ProductViewModal";
import { ProductEditModal } from "./ProductEditModal";
import { ProductAddModal } from "./ProductAddModal";
import { adminService, type AdminProduct } from "@/services/adminService";
import { categoryService, type Category } from "@/services/categoryService";

interface ProductsTabsProps {
  products: AdminProduct[];
  onProductsChange: (products: AdminProduct[]) => void;
}

export default function ProductsTabs({
  products,
  onProductsChange,
}: ProductsTabsProps) {
  const [viewProduct, setViewProduct] = useState<AdminProduct | null>(null);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch {
        // silencioso
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = async (id: string, data: Partial<AdminProduct>) => {
    try {
      const updated = await adminService.updateProduct(id, data);
      onProductsChange(products.map((p) => (p.id === id ? updated : p)));
      toast.success("Producto actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el producto");
    }
  };

  const handleAdd = async (data: {
    name: string;
    description: string;
    price: number;
    brand: string;
    stock: number;
    imgPrincipal: string;
    categoryId: string;
    discountPercent?: number;
  }) => {
    try {
      const newProduct = await adminService.createProduct(data);
      onProductsChange([newProduct, ...products]);
      toast.success("Producto agregado correctamente");
    } catch {
      toast.error("Error al agregar el producto");
    }
  };

  const columns = createProductColumns({
    onView: (product) => setViewProduct(product),
    onEdit: (product) => setEditProduct(product),
  });

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Productos</h2>
          <p className="text-muted-foreground">
            Administrá todos los productos de TechParts
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Agregar producto
        </Button>
      </div>

      <DataTable columns={columns} data={products} />

      <ProductViewModal
        product={viewProduct}
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
      />

      <ProductEditModal
        product={editProduct}
        open={!!editProduct}
        onClose={() => setEditProduct(null)}
        onSave={handleEdit}
        categories={categories}
      />

      <ProductAddModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
        categories={categories}
      />
    </div>
  );
}
