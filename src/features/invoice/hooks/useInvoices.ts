import { useState, useEffect, useMemo, useCallback } from "react";
import { InvoiceResponseDto, invoiceService } from "../services/invoiceService";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // التصفية والبحث
  const [searchTerm, setSearchTerm] = useState<string>("");

  // الفاتورة المحددة للعرض التفصيلي
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceResponseDto | null>(null);

  // جلب قائمة الفواتير
  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await invoiceService.getAllInvoices();
      setInvoices(data || []);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء جلب قائمة الفواتير."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // جلب تفاصيل الفاتورة
  const handleViewDetails = async (invoiceId: string) => {
    try {
      setDetailsLoading(true);
      const details = await invoiceService.getInvoiceDetails(invoiceId);
      setSelectedInvoice(details);
    } catch (err: any) {
      alert(
        err.response?.data?.message || "حدث خطأ أثناء جلب تفاصيل الفاتورة."
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  // تصفية الفواتير بحسب البحث (باستخدام useMemo لتحسين الأداء)
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const customer = inv.customerName?.toLowerCase() || "";
      const invoiceId = inv.invoiceId?.toLowerCase() || "";
      const orderId = inv.orderId?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return (
        customer.includes(search) ||
        invoiceId.includes(search) ||
        orderId.includes(search)
      );
    });
  }, [invoices, searchTerm]);

  // المجموع الكلي لكافة الفواتير
  const totalInvoicesAmount = useMemo(() => {
    return invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  }, [invoices]);

  return {
    invoices,
    filteredInvoices,
    loading,
    detailsLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedInvoice,
    setSelectedInvoice,
    fetchInvoices,
    handleViewDetails,
    totalInvoicesAmount,
  };
};