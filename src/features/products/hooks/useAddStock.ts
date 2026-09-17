import { useState, useEffect } from "react";
import { AddStockDto, Product, productService } from "../services/productService";

interface UseAddStockProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const useAddStock = ({ product, onClose, onSuccess }: UseAddStockProps) => {
  const [formData, setFormData] = useState<AddStockDto>({
    quantity: 1,
    unitCostPrice: product ? product.costPrice : 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // إعادة تعيين البيانات عند اختيار منتج جديد
  useEffect(() => {
    if (product) {
      setFormData({
        quantity: 1,
        unitCostPrice: product.costPrice,
      });
      setError(null);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    if (formData.quantity <= 0) {
      setError("يرجى إدخال كمية أكبر من الصفر.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await productService.addStock(product.id, formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إضافة المخزون.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};