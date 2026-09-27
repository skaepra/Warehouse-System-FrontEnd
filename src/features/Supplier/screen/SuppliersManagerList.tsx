import React from "react";
import {
  IoSearchOutline,
  IoRefreshOutline,
  IoAddOutline,
  IoFunnelOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoPencilOutline,
  IoCallOutline,
  IoToggleOutline,
} from "react-icons/io5";


import { SupplierModal } from "../components/SupplierModal";
import { StatusFilterType, useSuppliersManager } from "../hook/useSuppliersManager";

export const SuppliersManagerList: React.FC = () => {
  const {
    loading,
    error,
    filteredSuppliers,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    editingSupplier,
    setEditingSupplier,
    fetchSuppliers,
    handleToggleStatus,
    handleSaveSupplier,
  } = useSuppliersManager();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg text-brand-primary">
        <IoRefreshOutline className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">إدارة الموردين</h1>
          <p className="text-brand-subtext text-sm">
            عرض وتحديث بيانات الموردين وإدارة حالتهم التشغيلية بالنظام.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSuppliers}
            className="p-2.5 bg-brand-card border border-slate-200 rounded-lg text-brand-subtext hover:text-brand-primary transition-colors"
            title="تحديث البيانات"
          >
            <IoRefreshOutline size={20} />
          </button>
          <button
            onClick={() => {
              setEditingSupplier(null);
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm"
          >
            <IoAddOutline size={20} />
            إضافة مورد جديد
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            statusFilter === "ALL"
              ? "border-brand-primary ring-1 ring-brand-primary"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <IoPeopleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">إجمالي الموردين</span>
            <span className="text-xl font-bold text-brand-text">{stats.total}</span>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("ACTIVE")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            statusFilter === "ACTIVE"
              ? "border-status-success ring-1 ring-status-success"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-status-successBg rounded-lg text-status-success">
            <IoCheckmarkCircleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">الموردين النشطين</span>
            <span className="text-xl font-bold text-brand-text">{stats.active}</span>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("INACTIVE")}
          className={`bg-brand-card p-5 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
            statusFilter === "INACTIVE"
              ? "border-status-danger ring-1 ring-status-danger"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="p-3 bg-status-dangerBg rounded-lg text-status-danger">
            <IoCloseCircleOutline size={24} />
          </div>
          <div>
            <span className="text-xs text-brand-subtext font-medium block">غير النشطين</span>
            <span className="text-xl font-bold text-brand-text">{stats.inactive}</span>
          </div>
        </div>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext text-lg" />
          <input
            type="text"
            placeholder="البحث باسم المورد أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text placeholder:text-brand-subtext focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <IoFunnelOutline className="text-brand-subtext text-lg" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
              className="w-full sm:w-auto px-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="ALL">كل الحالات</option>
              <option value="ACTIVE">النشطين فقط</option>
              <option value="INACTIVE">غير النشطين</option>
            </select>
          </div>
        </div>
      </div>

      {/* ----------------- عرض الموردين للشاشات الصغيرة (بطاقات) ----------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden mb-6">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      supplier.isActive ? "bg-status-success" : "bg-slate-300"
                    }`}
                  />
                  <h3 className="font-bold text-brand-text text-base">{supplier.name}</h3>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    supplier.isActive
                      ? "bg-status-successBg text-status-success border-status-success/20"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {supplier.isActive ? "نشط" : "غير نشط"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-subtext bg-brand-bg p-2.5 rounded-lg border border-slate-100">
                <IoCallOutline size={16} className="text-brand-primary" />
                <span>{supplier.phone || "غير متوفر"}</span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setEditingSupplier(supplier);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <IoPencilOutline size={15} />
                  تعديل
                </button>
                <button
                  onClick={() => handleToggleStatus(supplier.id)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    supplier.isActive
                      ? "bg-status-dangerBg text-status-danger hover:bg-status-danger/20"
                      : "bg-status-successBg text-status-success hover:bg-status-success/20"
                  }`}
                >
                  <IoToggleOutline size={15} />
                  {supplier.isActive ? "تعطيل" : "تفعيل"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-brand-subtext bg-brand-card rounded-xl border border-slate-200">
            لا يوجد موردون متطابقون.
          </div>
        )}
      </div>

      {/* ----------------- عرض الموردين للشاشات الكبيرة (جدول) ----------------- */}
      <div className="hidden md:block bg-brand-card rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-brand-subtext text-xs uppercase font-semibold">
                <th className="p-4">اسم المورد</th>
                <th className="p-4">رقم الهاتف</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-brand-text">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${
                            supplier.isActive ? "bg-status-success" : "bg-slate-300"
                          }`}
                        />
                        {supplier.name}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-brand-subtext">
                      {supplier.phone ? (
                        <div className="flex items-center gap-1.5">
                          <IoCallOutline className="text-slate-400" />
                          <span>{supplier.phone}</span>
                        </div>
                      ) : (
                        "غير مسجل"
                      )}

                    </td>
                     <td className="p-4">
                        {supplier.isActive ? (
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-status-successBg text-status-success">
                            مُفعل
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-status-dangerBg text-status-danger">
                            معطل
                          </span>
                        )}
                      </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingSupplier(supplier);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-slate-600 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-colors flex"
                          title="تعديل المورد"
                        >
                          <span>تعديل</span>
                          <IoPencilOutline size={18} className="mt-0.5 mr-1"/>
                        </button>                   
                         {/* زر التغيير */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(supplier.id)}
                          className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all disabled:opacity-50 cursor-pointer ${
                            supplier.isActive
                              ? "bg-status-dangerBg hover:bg-red-200 dark:hover:bg-red-900/40 text-status-danger"
                              : "bg-status-successBg hover:bg-green-200 dark:hover:bg-green-900/40 text-status-success"
                          }`}
                        >
                          { supplier.isActive
                            ? "تعطيل المورد"
                            : "تفعيل المورد"}                                                    
                        </button>
                      </td>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-brand-subtext">
                    لا يوجد موردون متطابقون.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplier={editingSupplier}
        onSave={handleSaveSupplier}
      />
    </div>
  );
};