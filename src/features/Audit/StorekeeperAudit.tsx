import React, { useState, useEffect } from "react";
import {
  IoSearchOutline,
  IoRefreshOutline,
  IoClipboardOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoTimeOutline,
  IoSendOutline,
  IoFilterOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { auditService, AuditDto, CreateAuditPayload } from "./AuditApi";
import { productService } from "../products/services/productService";

export const StorekeeperAudit: React.FC = () => {
  const [audits, setAudits] = useState<AuditDto[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formAlert, setFormAlert] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // حالة نموذج الإدخال
  const [productIdInput, setProductIdInput] = useState<string>("");
  const [physicalQtyInput, setPhysicalQtyInput] = useState<number | "">("");

  // حالات الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // جلب السجلات عبر auditService
  const fetchAudits = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await auditService.getAllAudits(selectedStatus);
      setAudits(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "حدث خطأ غير متوقع أثناء تحميل البيانات.",
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. جلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(); // API جلب المنتجات
        setProducts(data);
      } catch (err) {
        console.error("فشل جلب المنتجات", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchAudits();
  }, [selectedStatus]);

  // إرسال جرد جديد
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

  // حذف الجرد (إذا كانت الحالة معلقة)
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

      // تحديث الواجهة بحذف العنصر مباشرة
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

  // تصفية نتائج البحث
  const filteredAudits = audits.filter((audit) => {
    const term = searchTerm.toLowerCase();
    return (
      audit.productId.toLowerCase().includes(term) ||
      (audit.productName && audit.productName.toLowerCase().includes(term))
    );
  });

  // شارة (Badge) الحالة
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "0":
      case "Pending":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            <IoTimeOutline size={14} /> معلق
          </span>
        );
      case "1":
      case "Approved":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <IoCheckmarkCircleOutline size={14} /> مقبول
          </span>
        );
      case "2":
      case "Rejected":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            <IoCloseCircleOutline size={14} /> مرفوض
          </span>
        );
      default:
        return (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-brand-subtext">
            {status}
          </span>
        );
    }
  };

  if (loading && audits.length === 0) {
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
      {/* Header & Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1 flex items-center gap-2">
            <IoClipboardOutline className="text-brand-primary" /> إدارة جرد
            المستودع
          </h1>
          <p className="text-brand-subtext text-sm">
            إدخال الكميات الفعلية ومتابعة مطابقة المخزون مع النظام.
          </p>
        </div>
        <button
          onClick={fetchAudits}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-card border border-slate-200 text-brand-text text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <IoRefreshOutline
            size={18}
            className={loading ? "animate-spin" : ""}
          />
          تحديث السجلات
        </button>
      </div>

      {/* نموذج إنشاء جرد جديد */}
      <div className="bg-brand-card p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <h2 className="text-base font-bold text-brand-text mb-4 flex items-center gap-2">
          إجراء جرد جديد
        </h2>

        <form
          onSubmit={handleCreateAudit}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
        >
          <div>
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1.5">
                اختر المنتج
              </label>
              <select
                required
                value={productIdInput}
                onChange={(e) => setProductIdInput(e.target.value)}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              >
                <option value="">-- اختر المنتج من القائمة --</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} 
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-subtext mb-1.5">
              الكمية الفعلية (Physical Qty)
            </label>
            <input
              type="number"
              required
              min="0"
              placeholder="0"
              value={physicalQtyInput}
              onChange={(e) =>
                setPhysicalQtyInput(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <IoSendOutline size={16} />
            {submitting ? "جاري الإرسال..." : "إرسال الجرد"}
          </button>
        </form>

        {formAlert && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs font-semibold ${
              formAlert.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {formAlert.msg}
          </div>
        )}
      </div>

      {/* البحث والفلترة */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
          <input
            type="text"
            placeholder="بحث باسم أو معرف المنتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-brand-subtext flex items-center gap-1">
            <IoFilterOutline size={14} /> الحالة:
          </span>
          {[
            { label: "الكل", value: "ALL" },
            { label: "معلق (0)", value: "0" },
            { label: "مقبول (1)", value: "1" },
            { label: "مرفوض (2)", value: "2" },
          ].map((statusTab) => (
            <button
              key={statusTab.value}
              onClick={() => setSelectedStatus(statusTab.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStatus === statusTab.value
                  ? "bg-brand-primary text-white"
                  : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
              }`}
            >
              {statusTab.label}
            </button>
          ))}
        </div>
      </div>

      {/* جدول عرض السجلات */}
      {error ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6 bg-brand-card rounded-2xl border border-slate-200">
          <p className="text-rose-500 font-semibold mb-4">{error}</p>
          <button
            onClick={fetchAudits}
            className="px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-xl"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <div className="bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-brand-bg border-b border-slate-200 text-brand-subtext text-xs font-bold">
                <tr>
                  <th className="p-3.5">المنتج</th>
                  <th className="p-3.5">كمية النظام</th>
                  <th className="p-3.5">الكمية الفعلية</th>
                  <th className="p-3.5">الفرق</th>
                  <th className="p-3.5">الحالة</th>
                  <th className="p-3.5">تاريخ الإرسال</th>
                  <th className="p-3.5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAudits.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-brand-subtext text-sm"
                    >
                      لا توجد سجلات جرد تطابق خيارات البحث الحالية.
                    </td>
                  </tr>
                ) : (
                  filteredAudits.map((item) => {
                    const diffFormatted =
                      item.difference > 0
                        ? `+${item.difference}`
                        : item.difference;
                    const isPending =
                      item.status === "0" || item.status === "Pending";

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-3.5 font-bold text-brand-text">
                          {item.productName || item.productId}
                          <span className="block text-[10px] font-normal text-brand-subtext">
                            ID: {item.productId}
                          </span>
                        </td>
                        <td className="p-3.5 text-brand-text font-semibold">
                          {item.systemQuantity}
                        </td>
                        <td className="p-3.5 text-brand-text font-semibold">
                          {item.physicalQuantity}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`font-extrabold text-xs px-2 py-0.5 rounded-md ${
                              item.difference < 0
                                ? "bg-rose-50 text-rose-600"
                                : item.difference > 0
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-brand-subtext"
                            }`}
                          >
                            {diffFormatted}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {renderStatusBadge(item.status)}
                        </td>
                        <td className="p-3.5 text-xs text-brand-subtext">
                          {new Date(item.submittedAt).toLocaleString("ar-EG", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="p-3.5 text-center">
                          {isPending ? (
                            <button
                              onClick={() => handleDeleteAudit(item)}
                              disabled={deletingId === item.id}
                              title="حذف طلب الجرد"
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40"
                            >
                              {deletingId === item.id ? (
                                <IoRefreshOutline className="animate-spin text-base" />
                              ) : (
                                <IoTrashOutline size={18} />
                              )}
                            </button>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
