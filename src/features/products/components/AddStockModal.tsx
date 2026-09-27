import React from "react";
import { Product } from "../services/productService";
import { IoCloseOutline, IoCubeOutline } from "react-icons/io5";
import { useAddStock } from "../hooks/useAddStock";

interface Props {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddStockModal: React.FC<Props> = ({
  isOpen,
  product,
  onClose,
  onSuccess,
}) => {
  const {
    formData,
    suppliers,
    fetchingSuppliers,
    totalCost,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useAddStock({
    product,
    onClose,
    onSuccess,
  });

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 dir-rtl"
      dir="rtl"
    >
      <div className="bg-brand-card w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <IoCubeOutline className="text-brand-primary text-xl" />
            <h3 className="text-lg font-bold text-brand-text">
              تزويد مخزون جديد
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-brand-subtext hover:text-brand-text p-1 rounded-lg"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-status-dangerBg text-status-danger text-sm rounded-lg border border-status-danger/20">
              {error}
            </div>
          )}

          {/* تفاصيل المنتج المحدد */}
          <div className="p-3 bg-brand-bg rounded-xl border border-slate-100">
            <span className="text-xs text-brand-subtext font-medium block">
              المنتج المحدد
            </span>
            <span className="font-bold text-brand-text text-base">
              {product.name}
            </span>
            <div className="flex justify-between items-center mt-2 text-xs text-brand-subtext">
              <span className="text-zinc-600">
                الكمية الحالية:{" "}
                <strong className="text-brand-text">
                  {product.quantityInStock}
                </strong>
              </span>
              <span className="text-zinc-600">
                رمز SKU:{" "}
                <strong className="text-brand-text">
                  {product.sku || "N/A"}
                </strong>
              </span>
            </div>
          </div>

          {/* اختيار المورد */}
          <div>
            <label className="block text-xs font-semibold text-brand-subtext mb-1">
              المورد *
            </label>
            <select
              name="supplierId"
              required
              value={formData.supplierId}
              onChange={handleChange}
              disabled={fetchingSuppliers}
              className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
            >
              <option value="">-- اختر المورد --</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            {suppliers.length === 0 && !fetchingSuppliers && (
              <span className="text-[11px] text-amber-600 mt-1 block">
                تنبيه: يجب ربط المنتج بمورد أولاً قبل إضافة المخزون.
              </span>
            )}
          </div>

          {/* الكمية وسعر الشراء */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                الكمية المضافة *
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <div>
                <label className="block text-xs font-semibold text-brand-subtext mb-1">
                  سعر شراء المورد ($)
                </label>
                <input
                  type="number"
                  readOnly
                  disabled
                  value={formData.unitCostPrice}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-brand-text font-bold cursor-not-allowed opacity-80"
                />
                <span className="text-[10px] text-brand-subtext mt-1 block">
                  * يُحدد سعر الشراء تلقائياً بناءً على المورد المختار.
                </span>
              </div>
            </div>
          </div>

          {/* عرض تفاصيل السعار والإجمالي */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-xs text-brand-subtext block font-medium">
                سعر شراء القطعة
              </span>
              <span className="text-base font-bold text-brand-text">
                ${formData.unitCostPrice.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="text-xs text-brand-subtext block font-medium">
                إجمالي التكلفة الشاملة
              </span>
              <span className="text-base font-bold text-brand-primary">
                ${totalCost}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-brand-subtext bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading || !formData.supplierId}
              className="px-5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "جاري الإضافة..." : "حفظ الشحنة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
