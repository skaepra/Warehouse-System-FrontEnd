import { useState, useEffect, useMemo, useCallback } from "react";
import { OrderResponseDto, orderService } from "../services/orderService";

export const useStorekeeperOrders = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // حالات البحث والفلترة
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // حالة النافذة المنبثقة (Modal)
  const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null);

  // دالة جلب كل الطلبات الخاصة بالمستودع
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getAllOrders();
      setOrders(data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ أثناء جلب الطلبات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // دالة تحديث حالة الطلب (تجهيز / تسليم / إلغاء)
  const handleStatusChange = useCallback(
    async (orderId: string, newStatus: string) => {
      if (!window.confirm(`هل أنت تأكد من تغيير حالة الطلب إلى '${newStatus}'؟`)) return;

      try {
        setUpdatingId(orderId);
        await orderService.updateOrderStatus(orderId, newStatus);

        // تحديث القائمة محلياً لتجنب إعادة التحميل الكامل
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );

        // تحديث حالة الطلب المعروض في الـ Modal إذا كان مفتوحاً
        setSelectedOrder((prev) =>
          prev?.id === orderId ? { ...prev, status: newStatus } : prev
        );
      } catch (err: any) {
        alert(err.response?.data?.message || "حدث خطأ أثناء تغيير حالة الطلب.");
      } finally {
        setUpdatingId(null);
      }
    },
    []
  );

  // فلترة الطلبات حسَب البحث والحالة مع تحسين الأداء عبر useMemo
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const shop = order.shopName?.toLowerCase() || "";
      const id = order.id?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch = shop.includes(search) || id.includes(search);
      const matchesStatus =
        selectedStatus === "ALL" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  return {
    orders,
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
  };
};