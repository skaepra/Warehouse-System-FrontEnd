import React, { useState, useEffect } from "react";
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoTimeOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoEyeOutline,
  IoWarningOutline,
  IoFilterOutline,
  IoTrendingDownOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { auditService, AuditDto } from "./AuditApi";

export const ManagerAudit: React.FC = () => {
  const [audits, setAudits] = useState<AuditDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // معالجة النافذة المنبثقة (Modal) والتفاصيل
  const [selectedAudit, setSelectedAudit] = useState<AuditDto | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // جلب البيانات
  const fetchAudits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await auditService.getAllAudits(selectedStatus);
      setAudits(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || "فشل تحميل طلبات الجرد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, [selectedStatus]);

  // فتح التفاصيل لعنصر محدد عبر GET /api/audit/{id}
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

  // موافقة على الطلب PATCH /api/audit/{id}/approve
  const handleApprove = async (id: string) => {
    try {
      setActionLoading(true);
      setActionError(null);
      await auditService.approveAudit(id);
      
      // تحديث الحالة محلياً وإغلاق النافذة
      setAudits((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "1" } : item))
      );
      setSelectedAudit(null);
    } catch (err: any) {
      setActionError(err?.response?.data?.detail || "فشلت عملية الموافقة على الطلب.");
    } finally {
      setActionLoading(false);
    }
  };

  // رفض الطلب PATCH /api/audit/{id}/reject
  const handleReject = async (id: string) => {
    try {
      setActionLoading(true);
      setActionError(null);
      await auditService.rejectAudit(id);

      // تحديث الحالة محلياً وإغلاق النافذة
      setAudits((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "2" } : item))
      );
      setSelectedAudit(null);
    } catch (err: any) {
      setActionError(err?.response?.data?.detail || "فشلت عملية رفض الطلب.");
    } finally {
      setActionLoading(false);
    }
  };

  // تصفية النتائج
  const filteredAudits = audits.filter((audit) => {
    const term = searchTerm.toLowerCase();
    return (
      audit.productId.toLowerCase().includes(term) ||
      (audit.productName && audit.productName.toLowerCase().includes(term))
    );
  });

  // حساب الإحصائيات (KPIs)
  const pendingCount = audits.filter((a) => a.status === "0" || a.status === "Pending").length;
  const approvedCount = audits.filter((a) => a.status === "1" || a.status === "Approved").length;
  const rejectedCount = audits.filter((a) => a.status === "2" || a.status === "Rejected").length;

  const renderBadge = (status: string) => {
    switch (status) {
      case "0":
      case "Pending":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            <IoTimeOutline size={14} /> بانتظار المراجعة
          </span>
        );
      case "1":
      case "Approved":
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <IoCheckmarkCircleOutline size={14} /> تمت الموافقة
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
        return <span className="text-xs px-2.5 py-1 bg-slate-100 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text dir-rtl mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1 flex items-center gap-2">
            <IoShieldCheckmarkOutline className="text-brand-primary" /> لوحة تدقيق واعتماد الجرد
          </h1>
          <p className="text-brand-subtext text-sm">
            صلاحيات مدير المستودع لمراجعة الفروقات والموافقة أو الرفض على تسوية المخزون.
          </p>
        </div>
        <button
          onClick={fetchAudits}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-card border border-slate-200 text-brand-text text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <IoRefreshOutline size={18} className={loading ? "animate-spin" : ""} />
          تحديث البيانات
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-subtext mb-1">طلبات معلقة</p>
            <p className="text-2xl font-extrabold text-amber-600">{pendingCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <IoTimeOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-subtext mb-1">طلبات معتمدة</p>
            <p className="text-2xl font-extrabold text-emerald-600">{approvedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <IoCheckmarkCircleOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-subtext mb-1">طلبات مرفوضة</p>
            <p className="text-2xl font-extrabold text-rose-600">{rejectedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
            <IoCloseCircleOutline size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
          <input
            type="text"
            placeholder="بحث باسم المنتج أو ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-brand-subtext flex items-center gap-1">
            <IoFilterOutline size={14} /> تصفية بالحالة:
          </span>
          {[
            { label: "الكل", value: "ALL" },
            { label: "معلق", value: "0" },
            { label: "مقبول", value: "1" },
            { label: "مرفوض", value: "2" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStatus === tab.value
                  ? "bg-brand-primary text-white"
                  : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {error ? (
        <div className="p-8 text-center bg-brand-card rounded-xl border border-slate-200 text-rose-500 font-semibold">
          {error}
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
                  <th className="p-3.5">الفارق</th>
                  <th className="p-3.5">الحالة</th>
                  <th className="p-3.5">تاريخ الإرسال</th>
                  <th className="p-3.5 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAudits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-brand-subtext">
                      لا توجد سجلات جرد مطابقة.
                    </td>
                  </tr>
                ) : (
                  filteredAudits.map((item) => {
                    const isPending = item.status === "0" || item.status === "Pending";
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 font-bold text-brand-text">
                          {item.productName || item.productId}
                          <span className="block text-[10px] font-normal text-brand-subtext">
                            ID: {item.productId}
                          </span>
                        </td>
                        <td className="p-3.5 font-semibold">{item.systemQuantity}</td>
                        <td className="p-3.5 font-semibold">{item.physicalQuantity}</td>
                        <td className="p-3.5">
                          <span
                            className={`font-extrabold text-xs px-2 py-0.5 rounded-md flex items-center gap-1 w-fit ${
                              item.difference < 0
                                ? "bg-rose-50 text-rose-600"
                                : item.difference > 0
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-brand-subtext"
                            }`}
                          >
                            {item.difference < 0 && <IoTrendingDownOutline />}
                            {item.difference > 0 && <IoTrendingUpOutline />}
                            {item.difference > 0 ? `+${item.difference}` : item.difference}
                          </span>
                        </td>
                        <td className="p-3.5">{renderBadge(item.status)}</td>
                        <td className="p-3.5 text-xs text-brand-subtext">
                          {new Date(item.submittedAt).toLocaleString("ar-EG", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleOpenDetails(item.id)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1 mx-auto transition-colors ${
                              isPending
                                ? "bg-brand-primary text-white hover:opacity-90"
                                : "bg-slate-100 text-brand-text hover:bg-slate-200"
                            }`}
                          >
                            <IoEyeOutline size={15} />
                            {isPending ? "مراجعة واتخاذ قرار" : "معاينة"}
                          </button>
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

      {/* Modal تفاصيل الجرد والموافقة / الرفض */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-brand-card w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-brand-text flex items-center gap-2">
                تفاصيل طلب الجرد
              </h3>
              <button
                onClick={() => setSelectedAudit(null)}
                className="text-brand-subtext hover:text-brand-text p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              {actionError && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold flex items-center gap-2">
                  <IoWarningOutline size={16} /> {actionError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 bg-brand-bg p-4 rounded-xl text-xs">
                <div>
                  <span className="text-brand-subtext block">اسم المنتج:</span>
                  <span className="font-bold text-sm text-brand-text">
                    {selectedAudit.productName || "غير محدد"}
                  </span>
                </div>
                <div>
                  <span className="text-brand-subtext block">معرف المنتج (ID):</span>
                  <span className="font-mono text-brand-text">{selectedAudit.productId}</span>
                </div>
                <div>
                  <span className="text-brand-subtext block">أمين المستودع:</span>
                  <span className="font-semibold text-brand-text">
                    {selectedAudit.storekeeperId || "غير معروف"}
                  </span>
                </div>
                <div>
                  <span className="text-brand-subtext block">تاريخ الإرسال:</span>
                  <span className="font-semibold text-brand-text">
                    {new Date(selectedAudit.submittedAt).toLocaleString("ar-EG")}
                  </span>
                </div>
              </div>

              {/* المقارنة */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[11px] text-brand-subtext block mb-1">الكمية بالمخزون</span>
                  <span className="text-base font-bold text-brand-text">{selectedAudit.systemQuantity}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[11px] text-brand-subtext block mb-1">الكمية المرفوعة</span>
                  <span className="text-base font-bold text-brand-text">{selectedAudit.physicalQuantity}</span>
                </div>
                <div
                  className={`p-3 border rounded-xl ${
                    selectedAudit.difference !== 0
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                  }`}
                >
                  <span className="text-[11px] block mb-1">مقدار العجز / الزيادة</span>
                  <span className="text-base font-extrabold">
                    {selectedAudit.difference > 0 ? `+${selectedAudit.difference}` : selectedAudit.difference}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-brand-subtext">الحالة الحالية:</span>
                <div>{renderBadge(selectedAudit.status)}</div>
              </div>
            </div>

            {/* الأزرار والإجراءات */}
            <div className="p-4 bg-brand-bg border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedAudit(null)}
                className="px-4 py-2 text-xs font-bold text-brand-subtext hover:bg-slate-200 rounded-xl"
              >
                إغلاق
              </button>

              {(selectedAudit.status === "0" || selectedAudit.status === "Pending") && (
                <>
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleReject(selectedAudit.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 disabled:opacity-50 transition-colors"
                  >
                    <IoCloseCircleOutline size={16} />
                    رفض الجرد
                  </button>

                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleApprove(selectedAudit.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                  >
                    <IoCheckmarkCircleOutline size={16} />
                    اعتماد الجرد وتسوية المخزون
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};