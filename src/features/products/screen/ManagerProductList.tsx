import React, { useEffect, useState } from "react";
import { Product, productService } from "../services/productService";

import {
  IoSearchOutline,
  IoAlertCircleOutline,
  IoCubeOutline,
  IoPricetagOutline,
  IoCheckmarkOutline,
  IoPencilOutline,
  IoRefreshOutline,
  IoAddOutline,
  IoAddCircleOutline,
  IoFunnelOutline,
  IoFolderOutline,
} from "react-icons/io5";
import { CreateProductModal } from "../components/CreateProductModal";
import { AddStockModal } from "../components/AddStockModal";
import {
  CategoryDto,
  categoryService,
} from "../../category/services/categoryService";

type StockFilterType = "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export const ManagerProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // فلاتر البحث والتصفية
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stockFilter, setStockFilter] = useState<StockFilterType>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProductForStock, setSelectedProductForStock] =
    useState<Product | null>(null);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  // حالات لتعديل سعر البيع السريع
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [updating, setUpdating] = useState<boolean>(false);

  // جلب المنتجات والتصنيفات بالتوازي
  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  // حفظ سعر البيع الجديد [PATCH]
  const handleSavePrice = async (id: string) => {
    try {
      setUpdating(true);
      await productService.updateSellingPrice(id, newPrice);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, sellingPrice: newPrice } : p)),
      );
      setEditingId(null);
    } catch (err: any) {
      alert("فشل تحديث السعر، يرجى المحاولة لاحقاً.");
    } finally {
      setUpdating(false);
    }
  };

  // إضافة كمية جديدة للمنتج
  const handleOpenAddStock = (product: Product) => {
    setSelectedProductForStock(product);
    setIsAddStockModalOpen(true);
  };

  // منطق تصفية المنتجات حسب البحث، حالة المخزون، والتصنيف
  const filteredProducts = products.filter((p) => {
    // 1. بحث بالاسم أو الـ SKU أو اسم التصنيف
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.categoryName &&
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. فلتر التصنيف
    const matchesCategory =
      selectedCategory === "ALL" || p.categoryId === selectedCategory;

    // 3. فلتر حالة المخزون
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

  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (p) => p.quantityInStock <= p.minQuantityAlert && p.quantityInStock > 0,
  ).length;
  const outOfStockCount = products.filter(
    (p) => p.quantityInStock === 0,
  ).length;
  const totalInventoryValue = products.reduce(
    (acc, p) => acc + p.quantityInStock * p.costPrice,
    0,
  );

  const getStockBadge = (quantity: number, minAlert: number) => {
    if (quantity === 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-status-dangerBg text-status-danger border border-status-danger/20 ">
          نفد المخزون
        </span>
      );
    }
    if (quantity <= minAlert) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-status-warningBg text-status-warning border border-status-warning/20">
          منخفض ({quantity})
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-status-successBg text-status-success border border-status-success/20">
        متوفر ({quantity})
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg text-brand-primary">
        <IoRefreshOutline className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div
      className="p-6 bg-brand-bg min-h-screen text-brand-text dir-rtl mt-12"
      dir="rtl"
    >
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            إدارة المنتجات والمخزون
          </h1>
          <p className="text-brand-subtext text-sm">
            نظرة شاملة للمدير على التكاليف، أسعار البيع، والكميات المتاحة.
          </p>
        </div>
        <div className="flex">
          <button
            onClick={fetchData}
            className="p-2.5 bg-brand-card border border-slate-200 rounded-lg text-brand-subtext hover:text-brand-primary transition-colors ml-5"
            title="تحديث البيانات"
          >
            <IoRefreshOutline size={20} />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm"
          >
            <IoAddOutline size={20} />
            إضافة منتج جديد
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div
          onClick={() => {
            setStockFilter("ALL");
            setSelectedCategory("ALL");
          }}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${stockFilter === "ALL" && selectedCategory === "ALL" ? "border-brand-primary ring-1 ring-brand-primary" : "border-slate-200 hover:border-slate-300"}`}
        >
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <IoCubeOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              إجمالي المنتجات
            </span>
            <span className="text-xl font-bold text-brand-text">
              {totalProducts}
            </span>
          </div>
        </div>

        <div className="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-status-infoBg rounded-lg text-status-info">
            <IoPricetagOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              قيمة المخزون (التكلفة)
            </span>
            <span className="text-xl font-bold text-brand-text">
              ${totalInventoryValue.toLocaleString()}
            </span>
          </div>
        </div>

        <div
          onClick={() => setStockFilter("LOW_STOCK")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${stockFilter === "LOW_STOCK" ? "border-status-warning ring-1 ring-status-warning" : "border-slate-200 hover:border-slate-300"}`}
        >
          <div className="p-3 bg-status-warningBg rounded-lg text-status-warning">
            <IoAlertCircleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              مخزون منخفض
            </span>
            <span className="text-xl font-bold text-status-warning">
              {lowStockCount}
            </span>
          </div>
        </div>

        <div
          onClick={() => setStockFilter("OUT_OF_STOCK")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${stockFilter === "OUT_OF_STOCK" ? "border-status-danger ring-1 ring-status-danger" : "border-slate-200 hover:border-slate-300"}`}
        >
          <div className="p-3 bg-status-dangerBg rounded-lg text-status-danger">
            <IoAlertCircleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              منتهي من المخزون
            </span>
            <span className="text-xl font-bold text-status-danger">
              {outOfStockCount}
            </span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Bar: Search + Category Filter + Stock Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext text-lg" />
            <input
              type="text"
              placeholder="البحث باسم المنتج، SKU أو التصنيف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text placeholder:text-brand-subtext focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* فلتر التصنيفات */}
            <div className="flex items-center gap-2">
              <IoFolderOutline className="text-brand-subtext text-lg" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                <option value="ALL">جميع التصنيفات</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* فلتر حالة المخزون */}
            <div className="flex items-center gap-2">
              <IoFunnelOutline className="text-brand-subtext text-lg" />
              <select
                value={stockFilter}
                onChange={(e) =>
                  setStockFilter(e.target.value as StockFilterType)
                }
                className="px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                <option value="ALL">جميع الحالات</option>
                <option value="IN_STOCK">متوفر فقط</option>
                <option value="LOW_STOCK">مخزون منخفض</option>
                <option value="OUT_OF_STOCK">نفد المخزون</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-brand-subtext text-xs uppercase font-semibold">
                <th className="p-4">اسم المنتج</th>
                <th className="p-4">التصنيف</th>
                <th className="p-4">رمز SKU</th>
                <th className="p-4">حالة المخزون</th>
                <th className="p-4">سعر التكلفة</th>
                <th className="p-4">سعر البيع</th>
                <th className="p-4">هامش الربح / قطعة</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const profit = product.sellingPrice - product.costPrice;
                  const profitMargin =
                    product.costPrice > 0
                      ? ((profit / product.costPrice) * 100).toFixed(1)
                      : "0.0";

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-4 font-semibold text-brand-text">
                        {product.name}
                      </td>
                      {/* عرض اسم التصنيف */}
                      <td className="p-4 text-xs font-medium">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                          {product.categoryName || "غير محدد"}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs text-brand-subtext">
                        {product.sku || "N/A"}
                      </td>
                      <td className="p-4">
                        {getStockBadge(
                          product.quantityInStock,
                          product.minQuantityAlert,
                        )}
                      </td>
                      <td className="p-4 font-medium text-brand-text">
                        ${product.costPrice.toFixed(2)}
                      </td>

                      {/* تعديل سعر البيع التفاعلي */}
                      <td className="p-4 font-medium text-brand-primary">
                        {editingId === product.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={newPrice}
                              onChange={(e) =>
                                setNewPrice(parseFloat(e.target.value))
                              }
                              className="w-20 px-2 py-1 border border-brand-primary rounded bg-white text-brand-text text-sm focus:outline-none"
                            />
                            <button
                              disabled={updating}
                              onClick={() => handleSavePrice(product.id)}
                              className="p-1 text-status-success hover:bg-status-successBg rounded"
                            >
                              <IoCheckmarkOutline size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <span>${product.sellingPrice.toFixed(2)}</span>
                            <button
                              onClick={() => {
                                setEditingId(product.id);
                                setNewPrice(product.sellingPrice);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-brand-subtext hover:text-brand-primary transition-opacity"
                            >
                              <IoPencilOutline size={15} />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-semibold ${profit >= 0 ? "text-status-success" : "text-status-danger"}`}
                          >
                            ${profit.toFixed(2)}
                          </span>
                          <span className="text-xs text-brand-subtext">
                            ({profitMargin}%)
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${product.isActive ? "bg-status-success" : "bg-slate-300"}`}
                          title={product.isActive ? "نشط" : "غير نشط"}
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleOpenAddStock(product)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors"
                          title="تزويد الشحنة والمخزون"
                        >
                          <IoAddCircleOutline size={16} />
                          تزويد
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center p-8 text-brand-subtext"
                  >
                    لا توجد منتجات متطابقة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modals */}
          <CreateProductModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={fetchData}
          />
          <AddStockModal
            isOpen={isAddStockModalOpen}
            product={selectedProductForStock}
            onClose={() => {
              setIsAddStockModalOpen(false);
              setSelectedProductForStock(null);
            }}
            onSuccess={fetchData}
          />
        </div>
      </div>
    </div>
  );
};
