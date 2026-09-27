import React, { useState, useEffect } from "react";
import { IoCloseOutline, IoPersonOutline, IoCallOutline } from "react-icons/io5";
import { SupplierResponseDto, CreateOrUpdateSupplierDto } from "../services/supplierService";

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier?: SupplierResponseDto | null;
  onSave: (data: CreateOrUpdateSupplierDto) => Promise<void>;
}

export const SupplierModal: React.FC<SupplierModalProps> = ({
  isOpen,
  onClose,
  supplier,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (supplier) {
      setName(supplier.name || "");
      setPhone(supplier.phone || "");
    } else {
      setName("");
      setPhone("");
    }
    setErrorMsg("");
  }, [supplier, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("يرجى إدخال اسم المورد.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      await onSave({ name: name.trim(), phone: phone.trim() });
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء حفظ البيانات.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-brand-card w-full max-w-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-brand-text">
            {supplier ? "تعديل بيانات المورد" : "إضافة مورد جديد"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-brand-subtext hover:text-brand-text hover:bg-slate-100 transition-colors"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-lg text-xs">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-brand-subtext mb-1">
              اسم المورد <span className="text-status-danger">*</span>
            </label>
            <div className="relative">
              <IoPersonOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
              <input
                type="text"
                placeholder="أدخل اسم المورد..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-subtext mb-1">
              رقم الهاتف
            </label>
            <div className="relative">
              <IoCallOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
              <input
                type="text"
                placeholder="05XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? "جاري الحفظ..." : supplier ? "تحديث البيانات" : "إضافة المورد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};