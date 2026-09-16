import { useState, useEffect, useMemo, useCallback } from "react";
import { auditService, AuditDto } from "../services/AuditApi";

export const useManagerAudit = () => {
  const [audits, setAudits] = useState<AuditDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // معالجة النافذة المنبثقة والتفاصيل والإجراءات
  const [selectedAudit, setSelectedAudit] = useState<AuditDto | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // جلب البيانات
  const fetchAudits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await auditService.getAllAudits(selectedStatus);
      setAudits(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || err.message || "فشل تحميل طلبات الجرد.",
      );
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  // فتح التفاصيل لعنصر محدد
  const handleOpenDetails = async (id: string) => {
    try {
      setLoadingDetails(true);
      setActionError(null);
      const data = await auditService.getAuditById(id);
      setSelectedAudit(data);
    } catch (err: any) {
      alert(err?.response?.data?.detail || "تعذر جلب تفاصيل هذا الطلب.");
    } finally {
      setLoadingDetails(false);
    }
  };

  // موافقة على الطلب
  const handleApprove = async (id: string) => {
    try {
      setActionLoading(true);
      setActionError(null);
      await auditService.approveAudit(id);

      setAudits((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "1" } : item)),
      );
      setSelectedAudit(null);
    } catch (err: any) {
      setActionError(
        err?.response?.data?.detail || "فشلت عملية الموافقة على الطلب.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // رفض الطلب
  const handleReject = async (id: string) => {
    try {
      setActionLoading(true);
      setActionError(null);
      await auditService.rejectAudit(id);

      setAudits((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "2" } : item)),
      );
      setSelectedAudit(null);
    } catch (err: any) {
      setActionError(err?.response?.data?.detail || "فشلت عملية رفض الطلب.");
    } finally {
      setActionLoading(false);
    }
  };

  // تصفية النتائج
  const filteredAudits = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return audits.filter(
      (audit) =>
        audit.productId.toLowerCase().includes(term) ||
        (audit.productName && audit.productName.toLowerCase().includes(term)),
    );
  }, [audits, searchTerm]);

  // حساب الإحصائيات (KPIs)
  const stats = useMemo(() => {
    const pendingCount = audits.filter(
      (a) => a.status === "0" || a.status === "Pending",
    ).length;
    const approvedCount = audits.filter(
      (a) => a.status === "1" || a.status === "Approved",
    ).length;
    const rejectedCount = audits.filter(
      (a) => a.status === "2" || a.status === "Rejected",
    ).length;

    return { pendingCount, approvedCount, rejectedCount };
  }, [audits]);

  return {
    audits: filteredAudits,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedAudit,
    setSelectedAudit,
    loadingDetails,
    actionLoading,
    actionError,
    fetchAudits,
    handleOpenDetails,
    handleApprove,
    handleReject,
    stats,
  };
};