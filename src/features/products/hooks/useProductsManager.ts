import { useState, useEffect, useMemo, useCallback } from "react";
import { Product, productService } from "../services/productService";
import {
  CategoryDto,
  categoryService,
} from "../../category/services/categoryService";

export type StockFilterType = "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export const useProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلاتر
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stockFilter, setStockFilter] = useState<StockFilterType>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProductForStock, setSelectedProductForStock] =
    useState<Product | null>(null);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  // السعر السريع
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [updating, setUpdating] = useState<boolean>(false);

  // جلب البيانات
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ أثناء جلب البيانات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // تحديث سعر البيع
  const handleSavePrice = async (id: string) => {
    try {
      setUpdating(true);
      await productService.updateSellingPrice(id, newPrice);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, sellingPrice: newPrice } : p))
      );
      setEditingId(null);
    } catch (err: any) {
      alert("فشل تحديث السعر، يرجى المحاولة لاحقاً.");
    } finally {
      setUpdating(false);
    }
  };

  // فتح مودال إضافة المخزون
  const handleOpenAddStock = (product: Product) => {
    setSelectedProductForStock(product);
    setIsAddStockModalOpen(true);
  };

  // إغلاق مودال إضافة المخزون
  const handleCloseAddStock = () => {
    setIsAddStockModalOpen(false);
    setSelectedProductForStock(null);
  };

  // تصفية المنتجات (مع استخدام useMemo لتحسين الأداء)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.categoryName &&
          p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" || p.categoryId === selectedCategory;

      let matchesStock = true;
      if (stockFilter === "OUT_OF_STOCK") {
        matchesStock = p.quantityInStock === 0;
      } else if (stockFilter === "LOW_STOCK") {
        matchesStock =
          p.quantityInStock > 0 && p.quantityInStock <= p.minQuantityAlert;
      } else if (stockFilter === "IN_STOCK") {
        matchesStock = p.quantityInStock > p.minQuantityAlert;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, selectedCategory, stockFilter]);

  // الإحصائيات (KPIs)
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const lowStockCount = products.filter(
      (p) => p.quantityInStock <= p.minQuantityAlert && p.quantityInStock > 0
    ).length;
    const outOfStockCount = products.filter(
      (p) => p.quantityInStock === 0
    ).length;
    const totalInventoryValue = products.reduce(
      (acc, p) => acc + p.quantityInStock * p.costPrice,
      0
    );

    return {
      totalProducts,
      lowStockCount,
      outOfStockCount,
      totalInventoryValue,
    };
  }, [products]);

  return {
    // البيانات
    categories,
    loading,
    error,
    filteredProducts,
    stats,

    // الفلاتر
    searchTerm,
    setSearchTerm,
    stockFilter,
    setStockFilter,
    selectedCategory,
    setSelectedCategory,

    // حالات وحركات Modals
    isCreateModalOpen,
    setIsCreateModalOpen,
    isAddStockModalOpen,
    selectedProductForStock,
    handleOpenAddStock,
    handleCloseAddStock,

    // تعديل السعر
    editingId,
    setEditingId,
    newPrice,
    setNewPrice,
    updating,
    handleSavePrice,

    // إعادة جلب البيانات
    fetchData,
  };
};