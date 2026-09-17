import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCreateOrder } from "../hooks/useCreateOrder"; // اضبط المسار بحسب مشروعك
import { IoCloseOutline, IoBagCheckOutline } from "react-icons/io5";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { submitOrder, loading, error, setError } = useCreateOrder();

  if (!isOpen) return null;

  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.unitSellingPrice,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = await submitOrder(shopName, address);
    if (isSuccess) {
      setShopName("");
      setAddress("");
      onClose();
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-card w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200 dir-rtl text-right" dir="rtl">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
          <h2 className="text-lg font-bold text-brand-text flex items-center gap-2">
            <IoBagCheckOutline size={22} className="text-brand-primary" />
            تأكيد إنشاء الطلب
          </h2>
          <button onClick={onClose} className="text-brand-subtext hover:text-brand-text">
            <IoCloseOutline size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-text mb-1">
              اسم الزبون / المحل <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={shopName}
              onChange={(e) => {
                setShopName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="مثال: سوبرماركت الأمل"
              className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-text mb-1">
              العنوان <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (error) setError(null);
              }}
              placeholder="مثال: بغداد - شارع فلسطين"
              className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs text-brand-subtext">
            <div className="flex justify-between">
              <span>عدد المواد:</span>
              <span className="font-bold text-brand-text">{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-brand-text pt-1 border-t border-slate-200">
              <span>الإجمالي:</span>
              <span className="text-brand-primary">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-brand-text rounded-xl text-xs font-semibold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};