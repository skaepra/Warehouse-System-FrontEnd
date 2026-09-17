import React from "react";
import { useSalesOrders } from "../hooks/useSalesOrders";
import {
  IoSearchOutline,
  IoRefreshOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoReceiptOutline,
} from "react-icons/io5";

export const SalesOrdersList: React.FC = () => {
  const {
    filteredOrders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedOrder,
    setSelectedOrder,
    fetchOrders,
    calculateTotal,
    handleCancelOrder,
    stats,
  } = useSalesOrders();

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <IoTimeOutline size={14} />
            قيد الانتظار
          </span>
        );
      case "Approved":
      case "Prepared":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <IoCheckmarkCircleOutline size={14} />
            مقبول
          </span>
        );
      case "Rejected":
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <IoCloseCircleOutline size={14} />
            مرفوض / ملغى
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status || "غير محدد"}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg">
        <IoRefreshOutline className="animate-spin text-4xl text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text dir-rtl mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">طلباتي السابقة</h1>
          <p className="text-brand-subtext text-sm">متابعة حالة الطلبات المُدخلة وقائمة تفاصيلها.</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-card border border-slate-200 text-brand-text text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          <IoRefreshOutline size={18} />
          تحديث البيانات
        </button>
      </div>

      {/* بطاقات الملخص */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">إجمالي الطلبات</span>
            <span className="text-2xl font-extrabold text-brand-text">{stats.totalCount}</span>
          </div>
          <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl">
            <IoReceiptOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">طلبات قيد الانتظار</span>
            <span className="text-2xl font-extrabold text-amber-600">{stats.pendingCount}</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <IoTimeOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">الطلبات المقبولة</span>
            <span className="text-2xl font-extrabold text-emerald-600">{stats.preparedCount}</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <IoCheckmarkCircleOutline size={24} />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* أدوات البحث والتصفية */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
          <input
            type="text"
            placeholder="بحث باسم المحل أو رقم الطلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedStatus("ALL")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === "ALL" ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedStatus("Pending")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === "Pending" ? "bg-amber-600 text-white" : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
            }`}
          >
            قيد الانتظار
          </button>
          <button
            onClick={() => setSelectedStatus("Approved")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === "Approved" ? "bg-emerald-600 text-white" : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
            }`}
          >
            المقبولة
          </button>
        </div>
      </div>

      {/* ----------------- عرض الطلبات للشاشات الصغيرة (بطاقات) ----------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono text-brand-subtext block mb-1">
                    #{order.id ? `${order.id.substring(0, 8)}...` : "---"}
                  </span>
                  <span className="font-semibold text-brand-text">{order.shopName || "غير محدد"}</span>
                </div>
                <div>{renderStatusBadge(order.status)}</div>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                <span className="text-xs text-brand-subtext">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric", month: "short", day: "numeric",
                      })
                    : "---"}
                </span>
                <span className="font-bold text-brand-primary">
                  ${calculateTotal(order).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 flex justify-center items-center gap-2 p-2 bg-brand-primary/10 text-brand-primary rounded-lg text-sm font-semibold hover:bg-brand-primary/20 transition-colors"
                >
                  <IoEyeOutline size={18} /> التفاصيل
                </button>
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="flex-1 flex justify-center items-center gap-2 p-2 bg-status-dangerBg text-status-danger rounded-lg text-sm font-semibold hover:bg-status-dangerBg/80 transition-colors"
                  >
                    <IoCloseCircleOutline size={18} /> إلغاء
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-brand-subtext bg-brand-card rounded-xl border border-slate-200">
            لا توجد طلبات مطابقة للبحث.
          </div>
        )}
      </div>

      {/* ----------------- عرض الطلبات للشاشات الكبيرة (جدول) ----------------- */}
      <div className="hidden md:block bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-brand-subtext font-semibold text-xs">
              <tr>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">اسم المحل</th>
                <th className="p-4">تاريخ الطلب</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">الإجمالي</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-brand-text">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-brand-subtext">
                      #{order.id ? `${order.id.substring(0, 8)}...` : "---"}
                    </td>
                    <td className="p-4 font-semibold">{order.shopName || "غير محدد"}</td>
                    <td className="p-4 text-xs text-brand-subtext">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("ar-EG", {
                            year: "numeric", month: "short", day: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })
                        : "---"}
                    </td>
                    <td className="p-4">{renderStatusBadge(order.status)}</td>
                    <td className="p-4 font-bold text-brand-primary">
                      ${calculateTotal(order).toFixed(2)}
                    </td>
                    <td className="p-4 text-center flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <IoEyeOutline size={18} />
                      </button>

                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="p-2 text-status-danger hover:bg-status-dangerBg rounded-lg transition-colors"
                          title="إلغاء الطلب"
                        >
                          <IoCloseCircleOutline size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brand-subtext">
                    لا توجد طلبات مطابقة للبحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال التفاصيل */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 ">
          <div className="bg-brand-card rounded-[26px] border border-slate-200 shadow-xl w-full max-w-lg p-3 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-brand-text">تفاصيل الطلب</h3>
                <p className="text-xs font-mono text-brand-subtext">#{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-brand-subtext hover:text-brand-text text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-brand-subtext block">اسم المحل:</span>
                <span className="font-semibold text-brand-text">{selectedOrder.shopName}</span>
              </div>
              <div>
                <span className="text-brand-subtext block">الحالة:</span>
                <div className="mt-1">{renderStatusBadge(selectedOrder.status)}</div>
              </div>
            </div>

            {/* عناصر الطلب */}
            <div>
              <h4 className="text-xs font-bold text-brand-subtext mb-2">المنتجات المطلوبة:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-brand-bg rounded-lg border border-slate-100 text-xs">
                    <div>
                      <p className="font-semibold text-brand-text">
                        {item.productName || `منتج رقم (${item.productId ? item.productId.substring(0, 6) : "---"})`}
                      </p>
                      <p className="text-brand-subtext">
                        {item.quantity} × ${(item.unitSellingPrice || 0).toFixed(2)}
                      </p>
                    </div>
                    <span className="font-bold text-brand-text">
                      ${(item.totalItemPrice || (item.quantity * item.unitSellingPrice) || 0).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-brand-subtext">المجموع الكلي:</span>
              <span className="text-xl font-extrabold text-brand-primary">
                ${calculateTotal(selectedOrder).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2 bg-slate-100 text-brand-text rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};