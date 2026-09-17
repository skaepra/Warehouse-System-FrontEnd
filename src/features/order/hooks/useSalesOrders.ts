import { useState, useEffect, useMemo, useCallback } from "react";
import { OrderResponseDto, orderService } from "../services/orderService";

export const useSalesOrders = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // حالات التصفية والبحث
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // الطلب المحدد للعرض في Modal التفاصيل
  const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null);

  // دالة جلب الطلبات من API
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getMyOrders();
      setOrders(data || []);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء جلب قائمة الطلبات."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // دالة حساب المجموع الكلي للطلب
  const calculateTotal = useCallback((order: OrderResponseDto): number => {
    if (order.totalAmount !== undefined && order.totalAmount !== null && order.totalAmount > 0) {
      return order.totalAmount;
    }
    const itemList = order.items || [];
    return itemList.reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.unitSellingPrice || 0),
      0
    );
  }, []);

  // دالة إلغاء الطلب
  const handleCancelOrder = useCallback(async (orderId: string) => {
    if (!window.confirm("هل أنت تأكد من رغبتك في إلغاء هذا الطلب؟")) return;

    try {
      setLoading(true);
      await orderService.cancelOrder(orderId);

      // تحديث القائمة محلياً
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, status: "Cancelled" } : o
        )
      );

      // تحديث الطلب المحدد إذا كان مفتوحاً في المودال
      setSelectedOrder((prev) =>
        prev?.id === orderId ? { ...prev, status: "Cancelled" } : prev
      );

      alert("تم إلغاء الطلب بنجاح.");
    } catch (err: any) {
      alert(err.response?.data?.message || "حدث خطأ أثناء إلغاء الطلب.");
    } finally {
      setLoading(false);
    }
  }, []);

  // فلترة الطلبات بناءً على نص البحث والحالة المختارة
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const shop = order.shopName?.toLowerCase() || "";
      const orderId = order.id?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch = shop.includes(search) || orderId.includes(search);

      const matchesStatus =
        selectedStatus === "ALL" ||
        order.status === selectedStatus ||
        (selectedStatus === "Approved" && order.status === "Prepared");

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  // حساب الإحصائيات السريعة للبطاقات أعلى الصفحة
  const stats = useMemo(() => {
    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const preparedCount = orders.filter(
      (o) => o.status === "Approved" || o.status === "Prepared"
    ).length;

    return {
      totalCount: orders.length,
      pendingCount,
      preparedCount,
    };
  }, [orders]);

  return {
    orders,
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
  };
};