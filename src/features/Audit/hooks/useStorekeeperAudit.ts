import { useState, useEffect, useCallback, useMemo } from "react";
import {
  auditService,
  AuditDto,
  CreateAuditPayload,
} from "../services/AuditApi";
import { productService } from "../../products/services/productService";

export interface ProductOption {
  id: string;
  name: string;
}

export interface FormAlert {
  type: "success" | "error";
  msg: string;
}

export const useStorekeeperAudit = () => {
  const [audits, setAudits] = useState<AuditDto[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formAlert, setFormAlert] = useState<FormAlert | null>(null);

  // حالات الإدخال والفلترة
  const [productIdInput, setProductIdInput] = useState<string>("");
  const [physicalQtyInput, setPhysicalQtyInput] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // جلب السجلات
  const fetchAudits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await auditService.getAllAudits(selectedStatus);
      setAudits(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "حدث خطأ غير متوقع أثناء تحميل البيانات."
      );
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  // جلب المنتجات عند التحميل الأول
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("فشل جلب المنتجات", err);
      }
    };
    fetchProducts();
  }, []);

  // تحديث السجلات عند تغيير الفلتر
  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  // إنشاء جرد جديد
  const handleCreateAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productIdInput || physicalQtyInput === "") return;

    try {
      setSubmitting(true);
      setFormAlert(null);

      const payload: CreateAuditPayload = {
        productId: productIdInput.trim(),
        physicalQuantity: Number(physicalQtyInput),
      };

      const result = await auditService.createAudit(payload);

      setFormAlert({
        type: "success",
        msg: `تم إرسال الجرد بنجاح للمنتج: ${result.productName || result.productId}`,
      });

      setProductIdInput("");
      setPhysicalQtyInput("");
      fetchAudits();
    } catch (err: any) {
      setFormAlert({
        type: "error",
        msg:
          err?.response?.data?.message ||
          err.message ||
          "فشلت عملية الإرسال، يرجى المحاولة لاحقاً.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // حذف طلب جرد معلق
  const handleDeleteAudit = async (audit: AuditDto) => {
    const isPending = audit.status === "0" || audit.status === "Pending";

    if (!isPending) {
      alert("يمكنك فقط حذف الجرد الذي حالته معلقة.");
      return;
    }

    if (!window.confirm("هل أنت تأكد من رغبتك في حذف هذا الجرد المعلق؟")) {
      return;
    }

    try {
      setDeletingId(audit.id);
      await auditService.deleteAudit(audit.id);

      setAudits((prev) => prev.filter((item) => item.id !== audit.id));
      setFormAlert({
        type: "success",
        msg: "تم حذف طلب الجرد بنجاح.",
      });
    } catch (err: any) {
      setFormAlert({
        type: "error",
        msg:
          err?.response?.data?.message || err.message || "فشل حذف طلب الجرد.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // تصفية نتائج البحث مفلترة ذكياً بـ useMemo
  const filteredAudits = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return audits.filter((audit) => {
      return (
        audit.productId.toLowerCase().includes(term) ||
        (audit.productName && audit.productName.toLowerCase().includes(term))
      );
    });
  }, [audits, searchTerm]);

  return {
    // States
    audits: filteredAudits,
    products,
    loading,
    submitting,
    deletingId,
    error,
    formAlert,
    productIdInput,
    physicalQtyInput,
    searchTerm,
    selectedStatus,

    // Setters
    setProductIdInput,
    setPhysicalQtyInput,
    setSearchTerm,
    setSelectedStatus,

    // Actions
    fetchAudits,
    handleCreateAudit,
    handleDeleteAudit,
  };
};