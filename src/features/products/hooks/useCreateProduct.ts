import { useState, useEffect } from "react";
import { CreateProductDto, productService } from "../services/productService";
import { CategoryDto, categoryService } from "../../category/services/categoryService";

interface UseCreateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories?: CategoryDto[];
}

const initialFormState: CreateProductDto = {
  name: "",
  sku: "",
  categoryId: "",
  initialQuantity: 0,
  unitCostPrice: 0,
  sellingPrice: 0,
  minQuantityAlert: 10,
};

export const useCreateProduct = ({
  isOpen,
  onClose,
  onSuccess,
  categories: initialCategories,
}: UseCreateProductProps) => {
  const [formData, setFormData] = useState<CreateProductDto>(initialFormState);
  const [categories, setCategories] = useState<CategoryDto[]>(initialCategories || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // جلب التصنيفات إذا لم يتم تمريرها عبر Props وتحديث الحالة عند الفتح
  useEffect(() => {
    if (isOpen) {
      if (initialCategories?.length) {
        setCategories(initialCategories);
      } else {
        categoryService
          .getAllCategories()
          .then((data) => setCategories(data))
          .catch(() => setError("فشل جلب قائمة التصنيفات."));
      }
    }
  }, [isOpen, initialCategories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("يرجى إدخال اسم المنتج.");
      return;
    }
    if (!formData.categoryId) {
      setError("يرجى اختيار التصنيف.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await productService.createProduct(formData);
      onSuccess();
      onClose();
      setFormData(initialFormState);
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    categories,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};