import React, { useEffect, useState } from "react";
import { CreateProductDto, productService } from "../services/productService";
import { CategoryDto, categoryService } from "../../category/categoryService";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories?: CategoryDto[]; // تمرير خياري لتصنيفات مأخوذة من المكون الأب
}

export const CreateProductModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  categories: initialCategories,
}) => {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    sku: "",
    categoryId: "",
    initialQuantity: 0,
    unitCostPrice: 0,
    sellingPrice: 0,
    minQuantityAlert: 10,
  });

  const [categories, setCategories] = useState<CategoryDto[]>(initialCategories || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // جلب التصنيفات إذا لم تتم تمريرها عبر Props
  useEffect(() => {
    if (isOpen && !initialCategories?.length) {
      categoryService
        .getAllCategories()
        .then((data) => setCategories(data))
        .catch(() => setError("فشل جلب قائمة التصنيفات."));
    }
  }, [isOpen, initialCategories]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("يرجى إدخال اسم المنتج.");
      return;
    }
    if (!formData.categoryId) {
      setError("يرجى اختيار التصنيف.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await productService.createProduct(formData);
      onSuccess();
      onClose();
      setFormData({
        name: "",
        sku: "",
        categoryId: "",
        initialQuantity: 0,
        unitCostPrice: 0,
        sellingPrice: 0,
        minQuantityAlert: 10,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 dir-rtl"
      dir="rtl"
    >
      <div className="bg-brand-card w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-brand-text">إضافة منتج جديد</h3>
          <button
            onClick={onClose}
            className="text-brand-subtext hover:text-brand-text p-1 rounded-lg"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-status-dangerBg text-status-danger text-sm rounded-lg border border-status-danger/20">
              {error}
            </div>
          )}

          {/* اسم المنتج والتصنيف */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                اسم المنتج *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
                placeholder="مثال: آيفون 15"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                التصنيف *
              </label>
              <select
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                <option value="">اختر التصنيف...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                رمز SKU (اختياري)
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
                placeholder="PROD-001"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                تنبيه الحد أدنى للمخزون
              </label>
              <input
                type="number"
                name="minQuantityAlert"
                min="1"
                value={formData.minQuantityAlert}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                الكمية الأولية
              </label>
              <input
                type="number"
                name="initialQuantity"
                min="0"
                value={formData.initialQuantity}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                سعر التكلفة ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="unitCostPrice"
                min="0"
                value={formData.unitCostPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                سعر البيع ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="sellingPrice"
                min="0"
                value={formData.sellingPrice}
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
              {loading ? "جاري الإضافة..." : "حفظ المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};