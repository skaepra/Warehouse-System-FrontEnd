import {
  IoRefreshOutline,
  IoLinkOutline,
  IoPricetagOutline,
  IoCubeOutline,
  IoBusinessOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useAssignSupplierProduct } from "../hook/useAssignSupplierProduct";


export default function AssignSupplierProductScreen() {
  const {
    suppliers,
    products,
    loading,
    submitting,
    error,
    successMsg,
    selectedSupplierId,
    setSelectedSupplierId,
    selectedProductId,
    setSelectedProductId,
    supplierUnitPrice,
    setSupplierUnitPrice,
    fetchData,
    handleAssign,
  } = useAssignSupplierProduct();

  const selectedSupplier = suppliers.find((s) => s.id === selectedSupplierId);
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12" dir="rtl">
      {/* الرأس: العنوان وأزرار التفاعل */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-text tracking-tight">
            ربط المورد بالمنتجات
          </h1>
          <p className="text-xs text-brand-subtext mt-1">
            إسناد منتج متاح لمورد محدد وتحديد سعر الشراء الخاص به
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={fetchData}
            className="p-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="تحديث القائمة"
          >
            <IoRefreshOutline size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* رسائل التنبيه والخطأ */}
      {error && (
        <div className="p-4 mb-6 text-sm text-status-danger bg-status-dangerBg border border-status-danger/20 rounded-xl flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 mb-6 text-sm text-status-success bg-status-successBg border border-status-success/20 rounded-xl flex items-center gap-2">
          <IoCheckmarkCircleOutline size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-brand-subtext font-medium">
          جاري تحميل البيانات...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* نموذج الربط */}
          <div className="lg:col-span-2 bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <form onSubmit={handleAssign} className="space-y-5">
              <h2 className="text-base font-bold text-brand-text flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <IoLinkOutline className="text-brand-primary" size={20} />
                <span>بيانات عملية الربط</span>
              </h2>

              {/* اختيار المورد */}
              <div>
                <label className="block text-xs font-bold text-brand-subtext mb-2">
                  المورد <span className="text-status-danger">*</span>
                </label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-brand-text text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                >
                  <option value="">-- اختر المورد --</option>
                  {suppliers.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name} {sup.phone ? `(${sup.phone})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* اختيار المنتج */}
              <div>
                <label className="block text-xs font-bold text-brand-subtext mb-2">
                  المنتج <span className="text-status-danger">*</span>
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-brand-text text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                >
                  <option value="">-- اختر المنتج --</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} - SKU: {prod.sku} ({prod.categoryName})
                    </option>
                  ))}
                </select>
              </div>

              {/* سعر توريد المنتج للمورد */}
              <div>
                <label className="block text-xs font-bold text-brand-subtext mb-2">
                  سعر توريد القطعة الواحدة<span className="text-status-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={supplierUnitPrice}
                    onChange={(e) => setSupplierUnitPrice(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-brand-text text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-brand-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <IoLinkOutline size={18} />
                <span>{submitting ? "جاري الحفظ..." : "إسناد المنتج للمورد"}</span>
              </button>
            </form>
          </div>

          {/* المعاينة المباشرة */}
          <div className="bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-brand-text border-b border-slate-100 dark:border-slate-800 pb-2">
              ملخص التحديد
            </h3>

            {/* بطاقة المورد */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-brand-subtext mb-1 font-semibold">
                <IoBusinessOutline className="text-brand-primary" />
                <span>المورد المحدد:</span>
              </div>
              <p className="font-bold text-brand-text text-sm">
                {selectedSupplier ? selectedSupplier.name : "لم يتم الاختيار"}
              </p>
              {selectedSupplier?.phone && (
                <p className="text-xs text-brand-subtext mt-1">{selectedSupplier.phone}</p>
              )}
            </div>

            {/* بطاقة المنتج */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-brand-subtext mb-1 font-semibold">
                <IoCubeOutline className="text-brand-primary" />
                <span>المنتج المحدد:</span>
              </div>
              <p className="font-bold text-brand-text text-sm">
                {selectedProduct ? selectedProduct.name : "لم يتم الاختيار"}
              </p>
              {selectedProduct && (
                <div className="text-xs text-brand-subtext mt-1 space-y-0.5">
                  <p>SKU: {selectedProduct.sku}</p>
                  <p>التصنيف: {selectedProduct.categoryName}</p>
                </div>
              )}
            </div>

            {/* السعر المدخل */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-brand-subtext mb-1 font-semibold">
                <IoPricetagOutline className="text-brand-primary" />
                <span>سعر التوريد المحدد:</span>
              </div>
              <p className="font-black text-brand-primary text-base">
                {supplierUnitPrice ? `${supplierUnitPrice}` : "---"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}