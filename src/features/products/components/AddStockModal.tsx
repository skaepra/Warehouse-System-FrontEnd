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

export const AddStockModal: React.FC<Props> = ({ isOpen, product, onClose, onSuccess }) => {
  const { formData, loading, error, handleChange, handleSubmit } = useAddStock({
    product,
    onClose,
    onSuccess,
  });

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 dir-rtl" dir="rtl">
      <div className="bg-brand-card w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <IoCubeOutline className="text-brand-primary text-xl" />
            <h3 className="text-lg font-bold text-brand-text">تزويد مخزون جديد</h3>
          </div>
          <button onClick={onClose} className="text-brand-subtext hover:text-brand-text p-1 rounded-lg">
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
            <span className="text-xs text-brand-subtext font-medium block">المنتج المحدد</span>
            <span className="font-bold text-brand-text text-base">{product.name}</span>
            <div className="flex justify-between items-center mt-4 text-xs text-brand-subtext">
              <span className="text-zinc-600">الكمية الحالية: <strong className="text-brand-text">{product.quantityInStock}</strong></span>
              <span className="text-zinc-600">رمز <strong className="text-brand-text">{product.sku || "N/A"}</strong> :SKU</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">الكمية المضافة *</label>
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
              <label className="block text-xs font-semibold text-brand-subtext mb-1">سعر التكلفة الجديد ($)</label>
              <input
                type="number"
                step="0.01"
                name="unitCostPrice"
                min="0"
                required
                value={formData.unitCostPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
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
              disabled={loading}
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