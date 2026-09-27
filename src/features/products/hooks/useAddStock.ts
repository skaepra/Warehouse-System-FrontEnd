import { useState, useEffect } from "react";
import { AddStockDto, Product, productService } from "../services/productService";
import { SupplierResponseDto, supplierService } from "../../Supplier/services/supplierService";

interface UseAddStockProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const useAddStock = ({ product, onClose, onSuccess }: UseAddStockProps) => {
  const [formData, setFormData] = useState<AddStockDto>({
    quantity: 1,
    unitCostPrice: 0,
    supplierId: "",
  });

  const [suppliers, setSuppliers] = useState<SupplierResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSuppliers, setFetchingSuppliers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductSuppliers = async (productId: string) => {
    try {
      setFetchingSuppliers(true);
      setError(null);

      const data = await supplierService.getProductSuppliers(productId);
      setSuppliers(data);

      if (data.length > 0) {
        const firstSupplier = data[0];
        setFormData((prev) => ({
          ...prev,
          supplierId: firstSupplier.id,
          // تعيين سعر التكلفة المعتمد للمورد الأول تلقائياً
          unitCostPrice: firstSupplier.supplierUnitPrice || 0,
        }));
      }
    } catch (err: any) {
      console.error("Error fetching product suppliers:", err?.response || err);
      setError("فشل في جلب الموردين المرتبطين بهذا المنتج.");
    } finally {
      setFetchingSuppliers(false);
    }
  };

  useEffect(() => {
    if (product) {
      setFormData({
        quantity: 1,
        unitCostPrice: 0,
        supplierId: "",
      });
      setError(null);
      fetchProductSuppliers(product.id);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "supplierId") {
      const selectedSupplier = suppliers.find((s) => s.id === value);
      setFormData((prev) => ({
        ...prev,
        supplierId: value,
        // تحديث سعر التكلفة تلقائياً بغير إمكانية للتعديل اليدوي
        unitCostPrice: selectedSupplier?.supplierUnitPrice || 0,
      }));
    } else if (name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        quantity: parseInt(value) || 0,
      }));
    }
  };

  const totalCost = (formData.quantity * formData.unitCostPrice).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    if (!formData.supplierId) {
      setError("يرجى اختيار المورد.");
      return;
    }

    if (formData.quantity <= 0) {
      setError("يرجى إدخال كمية أكبر من الصفر.");
      return;
    }

    if (formData.unitCostPrice <= 0) {
      setError("سعر شراء المورد غير محدد لهذا المنتج.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await productService.addStock(product.id, formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "حدث خطأ أثناء إضافة المخزون."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    suppliers,
    fetchingSuppliers,
    totalCost,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};