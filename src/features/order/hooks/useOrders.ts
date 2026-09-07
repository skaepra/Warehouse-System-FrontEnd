import { useState, useEffect } from "react";
import { orderType } from "../types/orderType";
import { getOrders } from "../services/orderService";

export function useOrders() {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        if (isMounted) {
          setOrders(data || []);
        }
      } catch (error) {
        console.error("فشل في جلب الطلبات:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleExpand = (id: string | number) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return {
    orders,
    loading,
    expandedOrderId,
    toggleExpand,
  };
}