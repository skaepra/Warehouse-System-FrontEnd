import React, { useState, useMemo } from "react";
import {
  IoSearchOutline,
  IoReceiptOutline,
  IoPricetagOutline,
  IoRefreshOutline,
  IoEyeOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { useInvoices } from "../hooks/useInvoices"; // عدل المسار بحسب مجلد المشروع لديك

export const InvoicesList: React.FC = () => {
  const {
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
  } = useInvoices();

  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // تصفية الفواتير بناءً على حالة الفلتر وحالة البحث
  const displayedInvoices = useMemo(() => {
    return filteredInvoices.filter(() => {
      if (statusFilter === "ALL") return true;
      // ملاحظة: يمكنك تعديل الشرط إذا كان الـ API يرجع حالة الفاتورة مستقبلاً
      return true; 
    });
  }, [filteredInvoices, statusFilter]);

  // حساب الإحصائيات بناءً على البيانات القادمة من الـ API
  const stats = useMemo(() => {
    const totalInvoices = filteredInvoices.length;
    const totalAmount = filteredInvoices.reduce(
      (sum, inv) => sum + (inv.totalAmount || 0),
      0
    );
    return { totalInvoices, totalAmount };
  }, [filteredInvoices]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg text-brand-primary">
        <IoRefreshOutline className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            إدارة الفواتير
          </h1>
          <p className="text-brand-subtext text-sm">
            عرض وتتبع الفواتير وإجماليات المبيعات.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchInvoices}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm"
          >
            <IoRefreshOutline size={20} />
            تحديث الفوتير
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-8">
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            statusFilter === "ALL"
              ? "border-brand-primary ring-1 ring-brand-primary"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <IoReceiptOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              إجمالي الفواتير
            </span>
            <span className="text-xl font-bold text-brand-text">
              {stats.totalInvoices}
            </span>
          </div>
        </div>

        <div className="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-status-infoBg rounded-lg text-status-info">
            <IoPricetagOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">
              إجمالي المبالغ
            </span>
            <span className="text-xl font-bold text-brand-text">
              ${stats.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext text-lg" />
          <input
            type="text"
            placeholder="البحث برقم الفاتورة أو اسم العميل أو الطلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text placeholder:text-brand-subtext focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* ----------------- عرض الفواتير للشاشات الصغيرة (بطاقات) ----------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden mb-6">
        {displayedInvoices.length > 0 ? (
          displayedInvoices.map((inv) => (
            <div
              key={inv.invoiceId}
              className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                 
                  <p className="text-xs text-brand-subtext mt-0.5">
                    العميل: {inv.customerName || "غير محدد"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3">
                <span className="text-brand-subtext">تاريخ الإصدار:</span>
                <span className="font-medium text-brand-text">
                  {inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString("ar-EG") : "-"}
                </span>
              </div>

              <div className="flex items-center justify-between bg-brand-bg p-3 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-brand-subtext block mb-0.5">
                    رقم الطلب
                  </span>
                  <span className="font-semibold text-brand-text">
                    {inv.orderId}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-brand-subtext block mb-0.5">
                    المبلغ الإجمالي
                  </span>
                  <span className="font-bold text-brand-primary text-sm">
                    ${inv.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(inv.invoiceId)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors"
              >
                <IoEyeOutline size={16} />
                عرض التفاصيل
              </button>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-brand-subtext bg-brand-card rounded-xl border border-slate-200">
            لا توجد فواتير متطابقة.
          </div>
        )}
      </div>

      {/* ----------------- عرض الفواتير للشاشات الكبيرة (جدول) ----------------- */}
      <div className="hidden md:block bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-brand-subtext text-xs uppercase font-semibold">
                <th className="p-4">رقم الفاتورة</th>
                <th className="p-4">اسم العميل</th>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">تاريخ الإصدار</th>
                <th className="p-4">المبلغ الإجمالي</th>
                <th className="p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {displayedInvoices.length > 0 ? (
                displayedInvoices.map((inv) => (
                  <tr
                    key={inv.invoiceId}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-4 font-bold font-mono text-brand-primary">
                      {inv.invoiceId}
                    </td>
                    <td className="p-4 font-medium text-brand-text">
                      {inv.customerName || "غير محدد"}
                    </td>
                    <td className="p-4 text-brand-subtext font-mono">
                      {inv.orderId}
                    </td>
                    <td className="p-4 text-xs font-mono text-brand-subtext">
                      {inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString("ar-EG") : "-"}
                    </td>
                    <td className="p-4 font-semibold text-brand-text">
                      ${inv.totalAmount?.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewDetails(inv.invoiceId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <IoEyeOutline size={16} />
                        عرض
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-8 text-brand-subtext"
                  >
                    لا توجد فواتير متطابقة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal لعرض تفاصيل الفاتورة عند النقر على "عرض" */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-card rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-bold text-lg">تفاصيل الفاتورة </h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-brand-subtext hover:text-brand-text"
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>
            
            {detailsLoading ? (
              <div className="py-8 flex justify-center">
                <IoRefreshOutline className="animate-spin text-2xl text-brand-primary" />
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p><strong>اسم العميل:</strong> {selectedInvoice.customerName}</p>
                <p><strong>رقم الطلب:</strong> {selectedInvoice.orderId}</p>
                <p><strong>تاريخ الإصدار:</strong>
                {selectedInvoice.issuedAt ? new Date(selectedInvoice.issuedAt).toLocaleDateString("ar-EG") : "-"}</p>
                
                <h4 className="font-bold mt-4 mb-2 border-t pt-3">العناصر:</h4>
                <div className="space-y-2">
                  {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                    selectedInvoice.items.map((item, index) => (
                      <div key={index} className="flex justify-between bg-brand-bg p-2 rounded">
                        <span>{item.productName} (x{item.quantity})</span>
                        <span className="font-semibold">${item.totalPrice}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-brand-subtext text-xs">لا توجد عناصر مرافقة.</p>
                  )}
                </div>

                <div className="border-t pt-3 mt-4 text-left font-bold text-base text-brand-primary">
                  الإجمالي: ${selectedInvoice.totalAmount}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};