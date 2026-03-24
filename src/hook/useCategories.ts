import { useEffect, useState } from "react";
import { categoryService } from "@/services/categoryService";
import type { Category } from "@/types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoryService
      .getAll()
      .then(setCategories)
      .catch(() => setError("No se pudieron cargar las categorías"))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
