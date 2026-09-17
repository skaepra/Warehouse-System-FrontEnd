import React from "react";
import { OrderStatus } from "../services/orderService";
import { useStorekeeperOrders } from "../hooks/useStorekeeperOrders";
import {
  IoSearchOutline,
  IoRefreshOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoCubeOutline,
  IoCarSportOutline,
} from "react-icons/io5";

export const StorekeeperOrdersList: React.FC = () => {
  const {
    filteredOrders,
    loading,
    updatingId,
    error,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedOrder,
    setSelectedOrder,
    fetchOrders,
    handleStatusChange,
  } = useStorekeeperOrders();

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case OrderStatus.Pending:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <IoTimeOutline size={14} /> قيد الانتظار
          </span>
        );
      case OrderStatus.Prepared:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <IoCubeOutline size={14} /> تم التجهيز
          </span>
        );
      case OrderStatus.Delivered:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <IoCheckmarkCircleOutline size={14} /> تم التسليم
          </span>
        );
      case OrderStatus.Cancelled:
      case OrderStatus.Rejected:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <IoCloseCircleOutline size={14} /> ملغى / مرفوض
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
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
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            إدارة طلبات المستودع
          </h1>
          <p className="text-brand-subtext text-sm">
            متابعة تجهيز الطلبات، خصم المنتجات، وتحويلها للتسليم.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-card border border-slate-200 text-brand-text text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          <IoRefreshOutline size={18} /> تحديث البيانات
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* البحث والفلترة */}
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
          {["ALL", OrderStatus.Pending, OrderStatus.Prepared, OrderStatus.Delivered, OrderStatus.Cancelled].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStatus === st
                  ? "bg-brand-primary text-white"
                  : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
              }`}
            >
              {st === "ALL" ? "الكل" : st}
            </button>
          ))}
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

              <div className="text-xs text-brand-subtext border-t border-slate-100 pt-3 flex justify-between items-center">
                <span>تاريخ الطلب:</span>
                <span className="font-semibold text-brand-text">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })
                    : "---"}
                </span>
              </div>

              {/* أزرار الإجراءات للبطاقة */}
              <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
                {updatingId === order.id ? (
                  <span className="text-center text-xs text-brand-subtext animate-pulse py-2">جاري التحديث...</span>
                ) : (
                  <div className="flex items-center gap-2">
                    {order.status === OrderStatus.Pending && (
                      <button
                        onClick={() => handleStatusChange(order.id, OrderStatus.Prepared)}
                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                        title="تجهيز الطلب وخصم الكميات"
                      >
                        <IoCubeOutline size={16} /> تجهيز
                      </button>
                    )}

                    {order.status === OrderStatus.Prepared && (
                      <button
                        onClick={() => handleStatusChange(order.id, OrderStatus.Delivered)}
                        className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1"
                        title="تسليم الطلب وإنشاء الفاتورة"
                      >
                        <IoCarSportOutline size={16} /> تسليم
                      </button>
                    )}

                    {order.status !== OrderStatus.Cancelled && order.status !== OrderStatus.Delivered && (
                      <button
                        onClick={() => handleStatusChange(order.id, OrderStatus.Cancelled)}
                        className="px-3 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors"
                        title="إلغاء الطلب"
                      >
                        إلغاء
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-brand-primary bg-brand-primary/10 rounded-lg hover:bg-brand-primary/20 transition-colors"
                      title="عرض التفاصيل"
                    >
                      <IoEyeOutline size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-brand-subtext bg-brand-card rounded-xl border border-slate-200">
            لا توجد طلبات مطابقة.
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
                <th className="p-4 text-center">تحديث الحالة</th>
                <th className="p-4 text-center">التفاصيل</th>
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
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "---"}
                    </td>
                    <td className="p-4">{renderStatusBadge(order.status)}</td>

                    {/* أزرار الإجراءات */}
                    <td className="p-4 text-center">
                      {updatingId === order.id ? (
                        <span className="text-xs text-brand-subtext animate-pulse">جاري التحديث...</span>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          {order.status === OrderStatus.Pending && (
                            <button
                              onClick={() => handleStatusChange(order.id, OrderStatus.Prepared)}
                              className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                              title="تجهيز الطلب وخصم الكميات"
                            >
                              <IoCubeOutline size={14} /> تجهيز
                            </button>
                          )}

                          {order.status === OrderStatus.Prepared && (
                            <button
                              onClick={() => handleStatusChange(order.id, OrderStatus.Delivered)}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1"
                              title="تسليم الطلب وإنشاء الفاتورة"
                            >
                              <IoCarSportOutline size={14} /> تسليم
                            </button>
                          )}

                          {order.status !== OrderStatus.Cancelled && order.status !== OrderStatus.Delivered && (
                            <button
                              onClick={() => handleStatusChange(order.id, OrderStatus.Cancelled)}
                              className="px-2 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors"
                              title="إلغاء الطلب"
                            >
                              إلغاء
                            </button>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <IoEyeOutline size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brand-subtext">
                    لا توجد طلبات مطابقة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal تفاصيل الطلب */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-brand-text">تفاصيل تجهيز الطلب</h3>
                <p className="text-xs font-mono text-brand-subtext">#{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-brand-subtext text-xl hover:text-brand-text">
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              <h4 className="text-xs font-bold text-brand-subtext">المنتجات الواجب تجهيزها:</h4>
              {(selectedOrder.items || []).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-brand-bg rounded-lg border border-slate-100 text-xs">
                  <div>
                    <p className="font-semibold text-brand-text">{item.productName || item.productId}</p>
                    <p className="text-brand-subtext">الكمية المطلوب تجهيزها: <b className="text-brand-primary">{item.quantity}</b></p>
                  </div>
                </div>
              ))}
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