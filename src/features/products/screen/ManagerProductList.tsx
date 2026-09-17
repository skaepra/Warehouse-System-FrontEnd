import React from "react";
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
import { useProductsManager, StockFilterType } from "../hooks/useProductsManager";

export const ManagerProductList: React.FC = () => {
  const {
    categories,
    loading,
    error,
    filteredProducts,
    stats,
    searchTerm,
    setSearchTerm,
    stockFilter,
    setStockFilter,
    selectedCategory,
    setSelectedCategory,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isAddStockModalOpen,
    selectedProductForStock,
    handleOpenAddStock,
    handleCloseAddStock,
    editingId,
    setEditingId,
    newPrice,
    setNewPrice,
    updating,
    handleSavePrice,
    fetchData,
  } = useProductsManager();

  const getStockBadge = (quantity: number, minAlert: number) => {
    if (quantity === 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-status-dangerBg text-status-danger border border-status-danger/20">
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
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">إدارة المنتجات والمخزون</h1>
          <p className="text-brand-subtext text-sm">
            نظرة شاملة للمدير على التكاليف، أسعار البيع، والكميات المتاحة.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 bg-brand-card border border-slate-200 rounded-lg text-brand-subtext hover:text-brand-primary transition-colors"
            title="تحديث البيانات"
          >
            <IoRefreshOutline size={20} />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          onClick={() => {
            setStockFilter("ALL");
            setSelectedCategory("ALL");
          }}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            stockFilter === "ALL" && selectedCategory === "ALL"
              ? "border-brand-primary ring-1 ring-brand-primary"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <IoCubeOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">إجمالي المنتجات</span>
            <span className="text-xl font-bold text-brand-text">{stats.totalProducts}</span>
          </div>
        </div>

        <div className="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-status-infoBg rounded-lg text-status-info">
            <IoPricetagOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">قيمة المخزون (التكلفة)</span>
            <span className="text-xl font-bold text-brand-text">
              ${stats.totalInventoryValue.toLocaleString()}
            </span>
          </div>
        </div>

        <div
          onClick={() => setStockFilter("LOW_STOCK")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            stockFilter === "LOW_STOCK"
              ? "border-status-warning ring-1 ring-status-warning"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-status-warningBg rounded-lg text-status-warning">
            <IoAlertCircleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">مخزون منخفض</span>
            <span className="text-xl font-bold text-status-warning">{stats.lowStockCount}</span>
          </div>
        </div>

        <div
          onClick={() => setStockFilter("OUT_OF_STOCK")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            stockFilter === "OUT_OF_STOCK"
              ? "border-status-danger ring-1 ring-status-danger"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-status-dangerBg rounded-lg text-status-danger">
            <IoAlertCircleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">منتهي من المخزون</span>
            <span className="text-xl font-bold text-status-danger">{stats.outOfStockCount}</span>
          </div>
        </div>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext text-lg" />
          <input
            type="text"
            placeholder="البحث باسم المنتج، SKU أو التصنيف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text placeholder:text-brand-subtext focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <IoFolderOutline className="text-brand-subtext text-lg" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-1 sm:px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">كل التصنيفات</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <IoFunnelOutline className="text-brand-subtext text-lg" />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as StockFilterType)}
              className="w-full sm:w-auto px-1 sm:px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">كل الحالات</option>
              <option value="IN_STOCK">متوفر فقط</option>
              <option value="LOW_STOCK">مخزون منخفض</option>
              <option value="OUT_OF_STOCK">نفد المخزون</option>
            </select>
          </div>
        </div>
      </div>

      {/* ----------------- عرض المنتجات للشاشات الصغيرة (بطاقات) ----------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden mb-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const profit = product.sellingPrice - product.costPrice;
            const profitMargin =
              product.costPrice > 0
                ? ((profit / product.costPrice) * 100).toFixed(1)
                : "0.0";

            return (
              <div key={product.id} className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          product.isActive ? "bg-status-success" : "bg-slate-300"
                        }`}
                        title={product.isActive ? "نشط" : "غير نشط"}
                      />
                      <h3 className="font-bold text-brand-text text-base">{product.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-brand-subtext">
                      SKU: {product.sku || "N/A"}
                    </span>
                  </div>
                  <div>{getStockBadge(product.quantityInStock, product.minQuantityAlert)}</div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                    {product.categoryName || "غير محدد"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-brand-subtext">هامش الربح:</span>
                    <span className={`font-semibold ${profit >= 0 ? "text-status-success" : "text-status-danger"}`}>
                      ${profit.toFixed(2)} ({profitMargin}%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-brand-bg p-3 rounded-lg border border-slate-100 text-xs my-1">
                  <div>
                    <span className="text-brand-subtext block mb-0.5">سعر التكلفة</span>
                    <span className="font-semibold text-brand-text">${product.costPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-brand-subtext block mb-0.5">سعر البيع</span>
                    {editingId === product.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                          className="w-16 px-1.5 py-0.5 border border-brand-primary rounded bg-white text-brand-text text-xs focus:outline-none"
                        />
                        <button
                          disabled={updating}
                          onClick={() => handleSavePrice(product.id)}
                          className="p-1 text-status-success hover:bg-status-successBg rounded"
                        >
                          <IoCheckmarkOutline size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-brand-primary">${product.sellingPrice.toFixed(2)}</span>
                        <button
                          onClick={() => {
                            setEditingId(product.id);
                            setNewPrice(product.sellingPrice);
                          }}
                          className="text-brand-subtext hover:text-brand-primary transition-colors"
                        >
                          <IoPencilOutline size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddStock(product)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors mt-1"
                >
                  <IoAddCircleOutline size={16} />
                  تزويد الشحنة والمخزون
                </button>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-brand-subtext bg-brand-card rounded-xl border border-slate-200">
            لا توجد منتجات متطابقة.
          </div>
        )}
      </div>

      {/* ----------------- عرض المنتجات للشاشات الكبيرة (جدول) ----------------- */}
      <div className="hidden md:block bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
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
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-semibold text-brand-text">{product.name}</td>
                      <td className="p-4 text-xs font-medium">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                          {product.categoryName || "غير محدد"}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs text-brand-subtext">
                        {product.sku || "N/A"}
                      </td>
                      <td className="p-4">
                        {getStockBadge(product.quantityInStock, product.minQuantityAlert)}
                      </td>
                      <td className="p-4 font-medium text-brand-text">
                        ${product.costPrice.toFixed(2)}
                      </td>

                      <td className="p-4 font-medium text-brand-primary">
                        {editingId === product.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(parseFloat(e.target.value))}
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
                            className={`font-semibold ${
                              profit >= 0 ? "text-status-success" : "text-status-danger"
                            }`}
                          >
                            ${profit.toFixed(2)}
                          </span>
                          <span className="text-xs text-brand-subtext">({profitMargin}%)</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${
                            product.isActive ? "bg-status-success" : "bg-slate-300"
                          }`}
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
                  <td colSpan={9} className="text-center p-8 text-brand-subtext">
                    لا توجد منتجات متطابقة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchData}
      />
      <AddStockModal
        isOpen={isAddStockModalOpen}
        product={selectedProductForStock}
        onClose={handleCloseAddStock}
        onSuccess={fetchData}
      />
    </div>
  );
};