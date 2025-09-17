import { useEffect, useState } from "react";
import type CategoryType from "../models/Categories";
import CategoryServices from "../services/CategoryServices";

export function useCategories(endpoint: string) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = new CategoryServices();

  const fetchCategories = async (endpoint: string) => {
    try {
      setLoading(true);
      const response = await api.getCategories(endpoint);
      setCategories(response);
    } catch (error) {
      setError("Error: Cannot get categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(endpoint);
  }, [endpoint]);

  return { categories, fetchCategories, loading, error };
}
