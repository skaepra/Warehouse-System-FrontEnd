import React, { useState } from "react";
import { useProfitAnalytics } from "../hooks/useProfitAnalytics";
import {
  IoTrendingUpOutline,
  IoTrendingDownOutline,
  IoReceiptOutline,
  IoCartOutline,
  IoSearchOutline,
  IoRefreshOutline,
  IoPieChartOutline,
  IoCubeOutline,
} from "react-icons/io5";

export const ProfitAnalyticsScreen: React.FC = () => {
  const { analytics, loading, error, refetch } = useProfitAnalytics();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-[400px] text-brand-text"
      >
        <IoRefreshOutline className="w-10 h-10 animate-spin text-brand-primary mb-3" />
        <p className="font-semibold text-lg">جاري تحميل التحليلات المالية...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-200 text-center my-6"
      >
        <p className="font-bold text-lg">خطأ في تحميل البيانات</p>
        <p className="mt-1">{error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const isProfitable = analytics.netProfit >= 0;

  // فلترة أداء المنتجات حسب البحث
  const filteredProducts = analytics.allProductPerformance.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      dir="rtl"
      className="p-6 space-y-6 bg-brand-bg min-h-screen text-right mt-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text flex items-center gap-2">
            <IoPieChartOutline className="text-brand-primary" />
            تحليلات الأرباح والمبيعات
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            متابعة دقيقة للإيرادات، التكاليف، وصافي الأرباح بناءً على الفواتير
            والمخزون.
          </p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 bg-brand-surface border border-brand-border rounded-lg text-brand-text hover:bg-gray-100 transition shadow-sm self-start md:self-auto"
        >
          <IoRefreshOutline />
          تحديث البيانات
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* قيمة المخزون بسعر التكلفة */}
        <div className="p-5 bg-brand-surface rounded-2xl border border-brand-border shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-sm font-medium">قيمة المخزون الحالي</span>
            <IoCubeOutline className="text-purple-500 w-6 h-6" />
          </div>
          <div className="text-2xl font-extrabold text-brand-text">
            $
            {analytics.totalStockCostValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            القيمة المتوقعة للبيع:{" "}
            <span className="font-bold">
              ${analytics.totalStockSellingValue.toLocaleString()}
            </span>
          </div>
        </div>

        {/* تكلفة المباع */}
        <div className="p-5 bg-brand-surface rounded-2xl border border-brand-border shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-sm font-medium">تكلفة البضاعة المباعة</span>
            <IoCartOutline className="text-amber-500 w-6 h-6" />
          </div>
          <div className="text-2xl font-extrabold text-brand-text">
            $
            {analytics.totalCostOfGoodsSold.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            عمليات الشراء:{" "}
            <span className="font-bold">{analytics.totalPurchasesCount}</span>
          </div>
        </div>

        {/* إجمالي المبيعات */}
        <div className="p-5 bg-brand-surface rounded-2xl border border-brand-border shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-sm font-medium">إجمالي المبيعات</span>
            <IoReceiptOutline className="text-blue-500 w-6 h-6" />
          </div>
          <div className="text-2xl font-extrabold text-brand-text">
            $
            {analytics.totalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            عدد الفواتير:{" "}
            <span className="font-bold">{analytics.totalInvoicesCount}</span>
          </div>
        </div>

        {/* صافي الربح */}
        <div className="p-5 bg-brand-surface rounded-2xl border border-brand-border shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-sm font-medium">صافي الربح</span>
            {isProfitable ? (
              <IoTrendingUpOutline className="text-emerald-500 w-6 h-6" />
            ) : (
              <IoTrendingDownOutline className="text-rose-500 w-6 h-6" />
            )}
          </div>
          <div
            className={`text-2xl font-extrabold ${
              isProfitable ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            $
            {analytics.netProfit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            هامش الربح الإجمالي:{" "}
            <span className="font-bold">{analytics.profitMargin}</span>
          </div>
        </div>
      </div>

      {/* Top Profitable Products & Performance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة الأفضل أداءً */}
        <div className="lg:col-span-1 bg-brand-surface p-5 rounded-2xl border border-brand-border shadow-sm">
          <h2 className="text-lg font-bold text-brand-text mb-4">
            أعلى 5 منتجات ربحية
          </h2>
          <div className="space-y-3">
            {analytics.topProfitableProducts.length > 0 ? (
              analytics.topProfitableProducts.map((prod, index) => (
                <div
                  key={prod.productId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-brand-text">
                        {prod.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {prod.unitsSold} قطعة مباعة
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      +${prod.profit.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{prod.profitMargin}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">
                لا توجد مبيعات مسجلة بعد.
              </p>
            )}
          </div>
        </div>

        {/* جدول تفاصيل أداء المنتجات */}
        <div className="lg:col-span-2 bg-brand-surface p-5 rounded-2xl border border-brand-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-bold text-brand-text">
              تحليل أداء المنتجات المبيعة
            </h2>
            <div className="relative w-full sm:w-64">
              <IoSearchOutline className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-9 pl-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3 text-right">المنتج</th>
                  <th className="py-2.5 px-3 text-right">الكمية المباعة</th>
                  <th className="py-2.5 px-3 text-right">الإيراد</th>
                  <th className="py-2.5 px-3 text-right">التكلفة</th>
                  <th className="py-2.5 px-3 text-right">الربح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr
                      key={item.productId}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-3 font-medium text-brand-text">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {item.unitsSold}
                      </td>
                      <td className="py-3 px-3 font-semibold text-brand-text">
                        ${item.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-gray-500">
                        ${item.cost.toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-3 font-bold ${
                          item.profit >= 0
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        ${item.profit.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">
                      لا توجد منتجات مطابقة للبحث.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
