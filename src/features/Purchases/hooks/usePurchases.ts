import { useState, useEffect, useMemo, useCallback } from "react";
import {
  purchaseService,
  PurchaseResponseDto,
} from "../services/purchaseService"; 

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<PurchaseResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchaseResponseDto | null>(null);

  // جلب كافة عمليات الشراء
  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await purchaseService.getAllPurchases();
      setPurchases(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء جلب بيانات المشتريات."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  // التصفية والبحث في المشتريات
  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.id.toLowerCase().includes(term) ||
        item.productName.toLowerCase().includes(term) ||
        item.createdByUserName.toLowerCase().includes(term)
      );
    });
  }, [purchases, searchTerm]);

  return {
    purchases,
    filteredPurchases,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedPurchase,
    setSelectedPurchase,
    fetchPurchases,
  };
};