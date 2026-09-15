import { useState, useEffect, useCallback } from "react";
import { fetchUsers, toggleUserStatus, UserDetails } from "../services/employeeService";

export function useEmployees() {
  const [employees, setEmployees] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUsers();
      setEmployees(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "فشل جلب قائمة الموظفين");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    setUpdatingId(userId);
    try {
      const newStatus = !currentStatus;
      await toggleUserStatus({ userId, isActive: newStatus });
      // التحديث في الـمصفوفة المحلي فور النجاح
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === userId ? { ...emp, isActive: newStatus } : emp,
        ),
      );
    } catch (err: any) {
      alert(err?.response?.data?.message || "فشل تغيير حالة الحساب");
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    employees,
    loading,
    error,
    updatingId,
    loadUsers,
    handleToggleStatus,
  };
}
