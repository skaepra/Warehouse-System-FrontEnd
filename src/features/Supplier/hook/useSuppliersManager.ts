import { useState, useEffect, useCallback, useMemo } from "react";
import {
  supplierService,
  SupplierResponseDto,
  CreateOrUpdateSupplierDto,
} from "../services/supplierService";

export type StatusFilterType = "ALL" | "ACTIVE" | "INACTIVE";

export const useSuppliersManager = () => {
  const [suppliers, setSuppliers] = useState<SupplierResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("ALL");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierResponseDto | null>(null);

  // جلب كافة الموردين باستخدام Service
  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "حدث خطأ أثناء جلب بيانات الموردين.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  // تغيير حالة المورد
  const handleToggleStatus = async (id: string) => {
    try {
      const result = await supplierService.toggleSupplierStatus(id);
      
      setSuppliers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isActive: result.isActive } : s))
      );
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "فشل في تغيير حالة المورد.";
      alert(message);
    }
  };

  // حفظ أو تعديل بيانات المورد
  const handleSaveSupplier = async (data: CreateOrUpdateSupplierDto) => {
    try {
      if (editingSupplier) {
        await supplierService.updateSupplier(editingSupplier.id, data);
      } else {
        await supplierService.createSupplier(data);
      }

      await fetchSuppliers();
      setIsModalOpen(false);
      setEditingSupplier(null);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "فشل في حفظ بيانات المورد.";
      throw new Error(message);
    }
  };

  // تصفية البيانات (تطبيق الفلترة والبحث)
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.phone && s.phone.includes(searchTerm));

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : statusFilter === "ACTIVE"
          ? s.isActive
          : !s.isActive;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, searchTerm, statusFilter]);

  // إحصائيات الموردين
  const stats = useMemo(() => {
    const total = suppliers.length;
    const active = suppliers.filter((s) => s.isActive).length;
    const inactive = total - active;

    return { total, active, inactive };
  }, [suppliers]);

  return {
    suppliers,
    filteredSuppliers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    editingSupplier,
    setEditingSupplier,
    stats,
    fetchSuppliers,
    handleToggleStatus,
    handleSaveSupplier,
  };
};