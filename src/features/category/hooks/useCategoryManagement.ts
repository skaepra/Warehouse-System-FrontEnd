import { useState, useEffect, useMemo } from "react";
import { CategoryDto, categoryService } from "../services/categoryService";


export const useCategoryManagement = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // حالات النوافذ المنبثقة (Modals)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryDto | null>(null);

  // حالات النماذج (Forms)
  const [categoryName, setCategoryName] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // جلب التصنيفات
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "فشل جلب قائمة التصنيفات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // تصفية القائمة حسب البحث
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // إغلاق جميع النوافذ وإعادة ضبط النماذج
  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingCategory(null);
    setDeletingCategory(null);
    setCategoryName("");
    setFormError(null);
  };

  // فتح نافذة التعديل
  const openEditModal = (category: CategoryDto) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setFormError(null);
  };

  // إنشاء تصنيف جديد
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setFormError("اسم التصنيف مطلوب");
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);
      await categoryService.createCategory({ name: categoryName.trim() });
      await fetchCategories();
      closeModal();
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.response?.data || "حدث خطأ أثناء إضافة التصنيف");
    } finally {
      setSubmitting(false);
    }
  };

  // تعديل تصنيف
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    if (!categoryName.trim()) {
      setFormError("اسم التصنيف مطلوب");
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);
      await categoryService.updateCategory(editingCategory.id, { name: categoryName.trim() });
      await fetchCategories();
      closeModal();
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.response?.data || "حدث خطأ أثناء تعديل التصنيف");
    } finally {
      setSubmitting(false);
    }
  };

  // حذف تصنيف
  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;

    if (deletingCategory.productsCount > 0) {
      setFormError("لا يمكن حذف التصنيف لأنه يحتوي على منتجات مرتبطة");
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);
      await categoryService.deleteCategory(deletingCategory.id);
      await fetchCategories();
      closeModal();
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.response?.data || "حدث خطأ أثناء الحذف");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // Data & Search
    categories: filteredCategories,
    totalCategoriesCount: categories.length,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refetch: fetchCategories,

    // Modal States
    isAddModalOpen,
    setIsAddModalOpen,
    editingCategory,
    deletingCategory,
    setDeletingCategory,
    closeModal,
    openEditModal,

    // Form States
    categoryName,
    setCategoryName,
    formError,
    submitting,

    // Actions
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};