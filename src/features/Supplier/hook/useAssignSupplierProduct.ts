import { useState, useEffect, FormEvent } from "react";
import { SupplierResponseDto, supplierService } from "../services/supplierService";
import { Product, productService } from "../../products/services/productService";


export function useAssignSupplierProduct() {
  const [suppliers, setSuppliers] = useState<SupplierResponseDto[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [supplierUnitPrice, setSupplierUnitPrice] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [suppliersData, productsData] = await Promise.all([
        supplierService.getAllSuppliers(),
        productService.getAllProducts(),
      ]);

      setSuppliers(suppliersData);
      setProducts(productsData.filter((p) => p.isActive));
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "حدث خطأ أثناء تحميل البيانات."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSupplierId || !selectedProductId || !supplierUnitPrice) {
      setError("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await supplierService.assignProductToSupplier({
        supplierId: selectedSupplierId,
        productId: selectedProductId,
        supplierUnitPrice: parseFloat(supplierUnitPrice),
      });

      setSuccessMsg(res.message || "تم إسناد المنتج للمورد وتحديث السعر بنجاح.");
      setSelectedProductId("");
      setSupplierUnitPrice("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "حدث خطأ أثناء ربط المنتج بالمورد."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}