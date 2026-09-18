import React, { useState, useMemo } from "react";
import {
  IoSearchOutline,
  IoCartOutline,
  IoPricetagOutline,
  IoRefreshOutline,
  IoEyeOutline,
  IoCloseCircleOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { usePurchases } from "../hooks/usePurchases"; 

export const PurchasesList: React.FC = () => {
  const {
    filteredPurchases,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedPurchase,
    setSelectedPurchase,
    fetchPurchases,
  } = usePurchases();

  const [filterType, setFilterType] = useState<string>("ALL");

  // تصفية إضافية إن لزم الأمر
  const displayedPurchases = useMemo(() => {
    return filteredPurchases.filter(() => {
      if (filterType === "ALL") return true;
      return true;
    });
  }, [filteredPurchases, filterType]);

  // حساب الإحصائيات
  const stats = useMemo(() => {
    const totalCount = filteredPurchases.length;
    const totalCostAmount = filteredPurchases.reduce(
      (sum, item) => sum + (item.totalCost || item.quantity * item.unitCostPrice || 0),
      0
    );
    const totalItemsQuantity = filteredPurchases.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    return { totalCount, totalCostAmount, totalItemsQuantity };
  }, [filteredPurchases]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg text-brand-primary">
        <IoRefreshOutline className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div
      className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12"
      dir="rtl"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            إدارة المشتريات
          </h1>
          <p className="text-brand-subtext text-sm">
            عرض وتتبع إيصالات المشتريات، الواردات، وتكاليف المنتجات.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPurchases}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm"
          >       
           <IoRefreshOutline size={20} />
           تحديد اصول الشراء
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div
          onClick={() => setFilterType("ALL")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            filterType === "ALL"
              ? "border-brand-primary ring-1 ring-brand-primary"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <IoCartOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              إجمالي عمليات الشراء
            </span>
            <span className="text-xl font-bold text-brand-text">
              {stats.totalCount}
            </span>
          </div>
        </div>

        <div className="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-status-infoBg rounded-lg text-status-info">
            <IoCubeOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              إجمالي القطع الواردة
            </span>
            <span className="text-xl font-bold text-brand-text">
              {stats.totalItemsQuantity} قطعة
            </span>
          </div>
        </div>

        <div className="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-600">
            <IoPricetagOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              إجمالي التكلفة
            </span>
            <span className="text-xl font-bold text-brand-text">
              ${stats.totalCostAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext text-lg" />
          <input
            type="text"
            placeholder="البحث برقم الإيصال، اسم المنتج، أو الموظف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text placeholder:text-brand-subtext focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* ----------------- عرض المشتريات للشاشات الصغيرة (بطاقات) ----------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden mb-6">
        {displayedPurchases.length > 0 ? (
          displayedPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-primary block">
                    #{purchase.id.substring(0, 8)}
                  </span>
                  <p className="text-sm font-semibold text-brand-text mt-1">
                    المنتج: {purchase.productName || "غير محدد"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3">
                <span className="text-brand-subtext">تاريخ الشراء:</span>
                <span className="font-medium text-brand-text">
                  {purchase.purchaseDate
                    ? new Date(purchase.purchaseDate).toLocaleDateString("ar-EG")
                    : "-"}
                </span>
              </div>

              <div className="flex items-center justify-between bg-brand-bg p-3 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-brand-subtext block mb-0.5">
                    الكمية / التكلفة الفردية
                  </span>
                  <span className="font-semibold text-brand-text">
                    {purchase.quantity} × ${purchase.unitCostPrice}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-brand-subtext block mb-0.5">
                    الإجمالي
                  </span>
                  <span className="font-bold text-brand-primary text-sm">
                    $
                    {(
                      purchase.totalCost ||
                      purchase.quantity * purchase.unitCostPrice
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPurchase(purchase)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors"
              >
                <IoEyeOutline size={16} />
                عرض التفاصيل
              </button>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-brand-subtext bg-brand-card rounded-xl border border-slate-200">
            لا توجد سجلات شراء متطابقة.
          </div>
        )}
      </div>

      {/* ----------------- عرض المشتريات للشاشات الكبيرة (جدول) ----------------- */}
      <div className="hidden md:block bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-brand-subtext text-xs uppercase font-semibold">
                <th className="p-4">رقم العملية</th>
                <th className="p-4">اسم المنتج</th>
                <th className="p-4">الكمية</th>
                <th className="p-4">سعر التكلفة للقطعة</th>
                <th className="p-4">الإجمالي</th>
                <th className="p-4">تاريخ الشراء</th>
                <th className="p-4">المسؤول</th>
                <th className="p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {displayedPurchases.length > 0 ? (
                displayedPurchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-4 font-bold font-mono text-brand-primary">
                      #{purchase.id.substring(0, 8)}
                    </td>
                    <td className="p-4 font-medium text-brand-text">
                      {purchase.productName || "غير محدد"}
                    </td>
                    <td className="p-4 text-brand-text font-semibold">
                      {purchase.quantity}
                    </td>
                    <td className="p-4 font-mono text-brand-subtext">
                      ${purchase.unitCostPrice?.toFixed(2)}
                    </td>
                    <td className="p-4 font-bold text-brand-text">
                      $
                      {(
                        purchase.totalCost ||
                        purchase.quantity * purchase.unitCostPrice
                      ).toFixed(2)}
                    </td>
                    <td className="p-4 text-xs font-mono text-brand-subtext">
                      {purchase.purchaseDate
                        ? new Date(purchase.purchaseDate).toLocaleDateString(
                            "ar-EG"
                          )
                        : "-"}
                    </td>
                    <td className="p-4 text-brand-subtext text-xs">
                      {purchase.createdByUserName || "غير محدد"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedPurchase(purchase)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <IoEyeOutline size={16} />
                        عرض
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center p-8 text-brand-subtext"
                  >
                    لا توجد سجلات شراء متطابقة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal لعرض تفاصيل عملية الشراء */}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-card rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-bold text-lg text-brand-text">
                تفاصيل عملية الشراء
              </h3>
              <button
                onClick={() => setSelectedPurchase(null)}
                className="text-brand-subtext hover:text-brand-text"
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-brand-text">
              <p>
                <strong>المعرف كامل:</strong>{" "}
                <span className="font-mono text-xs text-brand-subtext">
                  {selectedPurchase.id}
                </span>
              </p>
              <p>
                <strong>اسم المنتج:</strong> {selectedPurchase.productName}
              </p>
              <p>
                <strong>الكمية المشكّلة:</strong> {selectedPurchase.quantity}{" "}
                قطع
              </p>
              <p>
                <strong>تكلفة القطعة الواحدة:</strong> $
                {selectedPurchase.unitCostPrice}
              </p>
              <p>
                <strong>تمت الإضافة بواسطة:</strong>{" "}
                {selectedPurchase.createdByUserName}
              </p>
              <p>
                <strong>تاريخ الشراء:</strong>{" "}
                {selectedPurchase.purchaseDate
                  ? new Date(selectedPurchase.purchaseDate).toLocaleString("ar-EG")
                  : "-"}
              </p>

              <div className="border-t pt-3 mt-4 text-left font-bold text-base text-brand-primary">
                الإجمالي الكلي: $
                {(
                  selectedPurchase.totalCost ||
                  selectedPurchase.quantity * selectedPurchase.unitCostPrice
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};