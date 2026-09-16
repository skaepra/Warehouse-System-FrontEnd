import React from "react";

import {
  IoAdd,
  IoSearch,
  IoPencil,
  IoTrash,
  IoFolderOpenOutline,
  IoWarningOutline,
  IoRefresh,
  IoClose,
  IoCubeOutline,
} from "react-icons/io5";
import { useCategoryManagement } from "./useCategoryManagement";


export const CategoryManagement: React.FC = () => {
  const {
    categories,
    totalCategoriesCount,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refetch,

    isAddModalOpen,
    setIsAddModalOpen,
    editingCategory,
    deletingCategory,
    setDeletingCategory,
    closeModal,
    openEditModal,

    categoryName,
    setCategoryName,
    formError,
    submitting,

    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategoryManagement();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 dir-rtl mt-12" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <IoFolderOpenOutline className="text-blue-600 w-8 h-8" />
            إدارة تصنيفات المستودع
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            إضافة، تعديل، وحذف التصنيفات الخاصة بالمنتجات في المخزن
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition duration-200 shadow-sm hover:shadow"
        >
          <IoAdd className="w-5 h-5" />
          إضافة تصنيف جديد
        </button>
      </div>

      {/* Bar Search & Stats */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative w-full sm:w-80">
          <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث عن تصنيف..."
            className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
          <span>إجمالي التصنيفات:</span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
            {totalCategoriesCount}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={refetch}
            className="flex items-center gap-1 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg transition"
          >
            <IoRefresh className="w-4 h-4" /> إعادة المحاولة
          </button>
        </div>
      )}

      {/* Table Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <IoRefresh className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p>جاري تحميل التصنيفات...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <IoFolderOpenOutline className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-base font-medium">لا توجد تصنيفات حالياً</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">اسم التصنيف</th>
                  <th className="p-4">عدد المنتجات المرتبطة</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-medium text-slate-900">{category.name}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        <IoCubeOutline className="w-3.5 h-3.5 text-slate-500" />
                        {category.productsCount} منتج
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="تعديل"
                        >
                          <IoPencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingCategory(category)}
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="حذف"
                        >
                          <IoTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingCategory) && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">
                {editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <IoWarningOutline className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  اسم التصنيف
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="مثال: الإلكترونيات، المواد الغذائية..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <IoRefresh className="w-4 h-4 animate-spin" />}
                  {editingCategory ? "حفظ التعديلات" : "إضافة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCategory && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <IoWarningOutline className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800">تأكيد حذف التصنيف</h3>
              <p className="text-sm text-slate-500 mt-1">
                هل أنت تأكد من رغبتك في حذف التصنيف{" "}
                <span className="font-semibold text-slate-800">"{deletingCategory.name}"</span>؟
              </p>
            </div>

            {deletingCategory.productsCount > 0 && (
              <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 text-xs rounded-xl text-right">
                ⚠️ تنبيه: يحتوي هذا التصنيف على {deletingCategory.productsCount} منتج. يجب إعادة توجيه المنتجات أو حذفها أولاً قبل تمكنك من حذف التصنيف.
              </div>
            )}

            {formError && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl text-right">
                {formError}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                disabled={submitting || deletingCategory.productsCount > 0}
                className="px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting && <IoRefresh className="w-4 h-4 animate-spin" />}
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};