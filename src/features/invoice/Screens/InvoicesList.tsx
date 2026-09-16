import React from "react";
import { useInvoices } from "../hooks/useInvoices"; // مسار الـ Hook حسب مشروعك
import {
  IoSearchOutline,
  IoRefreshOutline,
  IoEyeOutline,
  IoReceiptOutline,
  IoCalendarOutline,
  IoWalletOutline,
  IoCloseOutline,
} from "react-icons/io5";

export const InvoicesList: React.FC = () => {
  const {
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
  } = useInvoices();

  if (loading) {
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
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            فواتير المستودع
          </h1>
          <p className="text-brand-subtext text-sm">
            متابعة واستعراض الفواتير الصادرة وتفاصيل المواد المرفقة بها.
          </p>
        </div>
        <button
          onClick={fetchInvoices}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-card border border-slate-200 text-brand-text text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          <IoRefreshOutline size={18} />
          تحديث البيانات
        </button>
      </div>

      {/* بطاقات الملخص والإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">
              إجمالي الفواتير
            </span>
            <span className="text-2xl font-extrabold text-brand-text">
              {invoices.length}
            </span>
          </div>
          <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl">
            <IoReceiptOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">
              المجموع المالي العام
            </span>
            <span className="text-2xl font-extrabold text-emerald-600">
              ${totalInvoicesAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <IoWalletOutline size={24} />
          </div>
        </div>

        <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-subtext block mb-1">
              تاريخ آخر تحديث
            </span>
            <span className="text-sm font-bold text-brand-text">
              {new Date().toLocaleDateString("ar-EG", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
            <IoCalendarOutline size={24} />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* أدوات البحث */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
          <input
            type="text"
            placeholder="بحث باسم العميل، رقم الفاتورة، أو رقم الطلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* جدول عرض الفواتير */}
      <div className="bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-brand-subtext font-semibold text-xs">
              <tr>
                <th className="p-4">رقم الفاتورة</th>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">اسم العميل</th>
                <th className="p-4">تاريخ الإصدار</th>
                <th className="p-4">الإجمالي</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-brand-text">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.invoiceId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs text-brand-primary font-bold">
                      #{invoice.invoiceId ? `${invoice.invoiceId.substring(0, 8)}...` : "---"}
                    </td>
                    <td className="p-4 font-mono text-xs text-brand-subtext">
                      #{invoice.orderId ? `${invoice.orderId.substring(0, 8)}...` : "---"}
                    </td>
                    <td className="p-4 font-semibold">
                      {invoice.customerName || "غير محدد"}
                    </td>
                    <td className="p-4 text-xs text-brand-subtext">
                      {invoice.issuedAt
                        ? new Date(invoice.issuedAt).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "---"}
                    </td>
                    <td className="p-4 font-bold text-emerald-600">
                      ${(invoice.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="p-4 text-center flex items-center justify-center">
                      <button
                        onClick={() => handleViewDetails(invoice.invoiceId)}
                        disabled={detailsLoading}
                        className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                        title="عرض التفاصيل"
                      >
                        <IoEyeOutline size={18} />
                        <span>التفاصيل</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-brand-subtext"
                  >
                    لا توجد فواتير مطابقة للبحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال تفاصيل الفاتورة */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-brand-text">
                  تفاصيل الفاتورة
                </h3>
                <p className="text-xs font-mono text-brand-subtext">
                  رقم الفاتورة: #{selectedInvoice.invoiceId}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-brand-subtext hover:text-brand-text p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <IoCloseOutline size={22} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-brand-subtext block">اسم العميل:</span>
                <span className="font-semibold text-brand-text">
                  {selectedInvoice.customerName}
                </span>
              </div>
              <div>
                <span className="text-brand-subtext block">رقم الطلب المرتبط:</span>
                <span className="font-mono font-semibold text-brand-text">
                  #{selectedInvoice.orderId ? `${selectedInvoice.orderId.substring(0, 8)}...` : "---"}
                </span>
              </div>
              <div>
                <span className="text-brand-subtext block">مُصدر الفاتورة (المستخدم):</span>
                <span className="font-semibold text-brand-text">
                  {selectedInvoice.issuedById || "غير محدد"}
                </span>
              </div>
              <div>
                <span className="text-brand-subtext block">تاريخ الإصدار:</span>
                <span className="font-semibold text-brand-text">
                  {selectedInvoice.issuedAt
                    ? new Date(selectedInvoice.issuedAt).toLocaleDateString("ar-EG")
                    : "---"}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-brand-subtext mb-2">
                عناصر الفاتورة:
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(selectedInvoice.items || []).length > 0 ? (
                  selectedInvoice.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2.5 bg-brand-bg rounded-lg border border-slate-100 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-brand-text">
                          {item.productName || `منتج (${item.productId?.substring(0, 6)})`}
                        </p>
                        <p className="text-brand-subtext">
                          {item.quantity} × ${(item.unitSellingPrice || 0).toFixed(2)}
                        </p>
                      </div>
                      <span className="font-bold text-brand-text">
                        ${(item.totalPrice || item.quantity * item.unitSellingPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center py-4 text-brand-subtext">
                    لا توجد تفاصيل عناصر مسجلة لهذا الطلب.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-brand-subtext">
                المجموع الكلي:
              </span>
              <span className="text-xl font-extrabold text-emerald-600">
                ${(selectedInvoice.totalAmount || 0).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full py-2 bg-slate-100 text-brand-text rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};