import React, { useEffect, useState } from "react";
import {
  OrderResponseDto,
  orderService,
} from "../services/orderService";
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
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // التصفية والبحث
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // الطلب المحدد للعرض التفصيلي (Modal)
  const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(
    null
  );

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء جلب قائمة الطلبات."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // دالة حساب مجموع الطلب إذا لم يكن محسوباً من Backend
  const calculateTotal = (order: OrderResponseDto) => {
    if (order.totalAmount !== undefined && order.totalAmount !== null) {
      return order.totalAmount;
    }
    const orderItemsList = order.orderItems || order.orderItems || [];
    return orderItemsList.reduce(
      (sum, item) => sum + item.quantity * item.unitSellingPrice,
      0
    );
  };

  // شارة الحالة (Badge) - تعتمد على string
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <IoTimeOutline size={14} />
            قيد الانتظار (Pending)
          </span>
        );
      case "Approved":
      case "Prepared":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <IoCheckmarkCircleOutline size={14} />
            مقبول (Approved)
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

  // تصفية الطلبات
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // الإحصائيات السريعة
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const preparedCount = orders.filter(
    (o) => o.status === "Approved" || o.status === "Prepared"
  ).length;

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في إلغاء هذا الطلب؟")) return;

    try {
      setLoading(true);
      await orderService.cancelOrder(orderId);

      // تحديث الحالة محلياً كـ string
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, status: "Cancelled" } : o
        )
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }

      alert("تم إلغاء الطلب بنجاح.");
    } catch (err: any) {
      alert(err.response?.data?.message || "حدث خطأ أثناء إلغاء الطلب.");
    } finally {
      setLoading(false);
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
    <div
      className="p-6 bg-brand-bg min-h-screen text-brand-text dir-rtl mt-12"
      dir="rtl"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            طلباتي السابقة
          </h1>
          <p className="text-brand-subtext text-sm">
            متابعة حالة الطلبات المُدخلة وقائمته تفاصيلها.
          </p>
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
            <span className="text-xs text-brand-subtext block mb-1">
              إجمالي الطلبات
            </span>
            <span className="text-2xl font-extrabold text-brand-text">
              {orders.length}
            </span>
          </div>
          <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl">
            <IoReceiptOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">
              طلبات قيد الانتظار
            </span>
            <span className="text-2xl font-extrabold text-amber-600">
              {pendingCount}
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <IoTimeOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">
              الطلبات المقبولة
            </span>
            <span className="text-2xl font-extrabold text-emerald-600">
              {preparedCount}
            </span>
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
            placeholder="بحث باسم الزبون أو رقم الطلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedStatus("ALL")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === "ALL"
                ? "bg-brand-primary text-white"
                : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedStatus("Pending")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === "Pending"
                ? "bg-amber-600 text-white"
                : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
            }`}
          >
            قيد الانتظار
          </button>
          <button
            onClick={() => setSelectedStatus("Approved")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedStatus === "Approved" || selectedStatus === "Prepared"
                ? "bg-emerald-600 text-white"
                : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
            }`}
          >
            المقبولة
          </button>
        </div>
      </div>

      {/* جدول عرض الطلبات */}
      <div className="bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-brand-subtext font-semibold text-xs">
              <tr>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">اسم الزبون</th>
                <th className="p-4">تاريخ الطلب</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">الإجمالي</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-brand-text">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs text-brand-subtext">
                      #{order.id.substring(0, 8)}...
                    </td>
                    <td className="p-4 font-semibold">{order.customerName}</td>
                    <td className="p-4 text-xs text-brand-subtext">
                      {new Date(order.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4">{renderStatusBadge(order.status)}</td>
                    <td className="p-4 font-bold text-brand-primary">
                      ${calculateTotal(order).toFixed(2)}
                    </td>
                    <td className="p-4 text-center flex items-center justify-center gap-1">
                      {/* زر عرض التفاصيل */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <IoEyeOutline size={18} />
                      </button>

                      {/* يظهر زر الإلغاء فقط إذا كانت حالة الطلب Pending */}
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
                  <td
                    colSpan={6}
                    className="p-8 text-center text-brand-subtext"
                  >
                    لا توجد طلبات مطابقة للبحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال التفاصيل (Order Details Modal) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-brand-text">
                  تفاصيل الطلب
                </h3>
                <p className="text-xs font-mono text-brand-subtext">
                  #{selectedOrder.id}
                </p>
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
                <span className="text-brand-subtext block">اسم الزبون:</span>
                <span className="font-semibold text-brand-text">
                  {selectedOrder.customerName}
                </span>
              </div>
              <div>
                <span className="text-brand-subtext block">الحالة:</span>
                <div className="mt-1">
                  {renderStatusBadge(selectedOrder.status)}
                </div>
              </div>
            </div>

            {/* عناصر الطلب */}
            <div>
              <h4 className="text-xs font-bold text-brand-subtext mb-2">
                المنتجات المطلوبة:
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(selectedOrder.orderItems || selectedOrder.orderItems || []).map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2.5 bg-brand-bg rounded-lg border border-slate-100 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-brand-text">
                          {item.productName ||
                            `منتج رقم (${item.productId.substring(0, 6)})`}
                        </p>
                        <p className="text-brand-subtext">
                          {item.quantity} × ${item.unitSellingPrice.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-bold text-brand-text">
                        ${(item.quantity * item.unitSellingPrice).toFixed(2)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-brand-subtext">
                المجموع الكلي:
              </span>
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