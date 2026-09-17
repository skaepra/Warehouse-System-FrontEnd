import { 
  IoPersonOutline, 
  IoShieldCheckmarkOutline, 
  IoMailOutline, 
  IoAddOutline, 
  IoRefreshOutline 
} from "react-icons/io5";
import { useEmployees } from "../hooks/useEmployees";

export default function EmployeeListScreen() {
  const { employees, loading, error, updatingId, handleToggleStatus, loadUsers } = useEmployees();

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text mt-12" dir="rtl">
      {/* الرأس: العنوان وأزرار التفاعل */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-text tracking-tight">إدارة الموظفين</h1>
          <p className="text-xs text-brand-subtext mt-1">عرض وتغيير صلاحيات وحالات حسابات مستخدمي المستودع</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={loadUsers}
            className="p-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            title="تحديث القائمة"
          >
            <IoRefreshOutline size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <a
            href="createEmployee"
            className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-brand-primary/20 transition-all active:scale-[0.98]"
          >
            <IoAddOutline size={20} />
            <span>إضافة موظف جديد</span>
          </a>
        </div>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="p-4 mb-6 text-sm text-status-danger bg-status-dangerBg border border-status-danger/20 rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-brand-subtext font-medium">
          جاري تحميل البيانات...
        </div>
      ) : employees.length === 0 ? (
        <div className="bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-brand-subtext font-medium">
          لا يوجد موظفون حالياً.
        </div>
      ) : (
        <>
          {/* ----------------- عرض السجلات للشاشات الصغيرة (بطاقات) ----------------- */}
          <div className="grid grid-cols-1 gap-4 md:hidden mb-6">
            {employees.map((emp) => (
              <div 
                key={emp.id} 
                className="bg-brand-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3"
              >
                {/* رأس البطاقة: الصورة، الاسم، والحالة */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base shrink-0">
                      {emp.userName?.charAt(0).toUpperCase() || <IoPersonOutline />}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-text text-base leading-tight">
                        {emp.userName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-brand-subtext mt-0.5">
                        <IoMailOutline size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{emp.email}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {emp.isActive ? (
                      <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-status-successBg text-status-success">
                        مُفعل
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-status-dangerBg text-status-danger">
                        معطل
                      </span>
                    )}
                  </div>
                </div>

                {/* الأدوار */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[11px] font-medium text-brand-subtext block mb-1.5">
                    الأدوار الصلاحية:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {emp.roles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        <IoShieldCheckmarkOutline size={13} className="text-brand-primary" />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* زر الإجراء */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex justify-end">
                  <button
                    onClick={() => handleToggleStatus(emp.id, emp.isActive)}
                    disabled={updatingId === emp.id}
                    className={`w-full py-2 rounded-xl font-bold text-xs transition-all disabled:opacity-50 cursor-pointer ${
                      emp.isActive
                        ? "bg-status-dangerBg hover:bg-red-200 dark:hover:bg-red-900/40 text-status-danger"
                        : "bg-status-successBg hover:bg-green-200 dark:hover:bg-green-900/40 text-status-success"
                    }`}
                  >
                    {updatingId === emp.id
                      ? "جاري المعالجة..."
                      : emp.isActive
                      ? "تعطيل الحساب"
                      : "تفعيل الحساب"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ----------------- عرض السجلات للشاشات الكبيرة (جدول) ----------------- */}
          <div className="hidden md:block bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs text-brand-subtext font-bold uppercase tracking-wider">
                    <th className="p-4">الموظف</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">الدور (Role)</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      {/* الاسم */}
                      <td className="p-4 font-semibold text-brand-text">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                            {emp.userName?.charAt(0).toUpperCase() || <IoPersonOutline />}
                          </div>
                          <span>{emp.userName}</span>
                        </div>
                      </td>

                      {/* الإيميل */}
                      <td className="p-4 text-brand-subtext">
                        <div className="flex items-center gap-2">
                          <IoMailOutline className="text-slate-400" />
                          <span>{emp.email}</span>
                        </div>
                      </td>

                      {/* الأدوار */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {emp.roles.map((role) => (
                            <span
                              key={role}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              <IoShieldCheckmarkOutline size={13} className="text-brand-primary" />
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* الحالة */}
                      <td className="p-4">
                        {emp.isActive ? (
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-status-successBg text-status-success">
                            مُفعل
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-status-dangerBg text-status-danger">
                            معطل
                          </span>
                        )}
                      </td>

                      {/* زر التغيير */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(emp.id, emp.isActive)}
                          disabled={updatingId === emp.id}
                          className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all disabled:opacity-50 cursor-pointer ${
                            emp.isActive
                              ? "bg-status-dangerBg hover:bg-red-200 dark:hover:bg-red-900/40 text-status-danger"
                              : "bg-status-successBg hover:bg-green-200 dark:hover:bg-green-900/40 text-status-success"
                          }`}
                        >
                          {updatingId === emp.id
                            ? "جاري المعالجة..."
                            : emp.isActive
                            ? "تعطيل الحساب"
                            : "تفعيل الحساب"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}