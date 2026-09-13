import { FormEvent, ChangeEvent } from "react";
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoBriefcaseOutline, 
  IoArrowBack,
  IoShieldCheckmarkOutline 
} from "react-icons/io5";

import BaseInput from "../../../shared/components/BaseInput";
import PasswordInput from "../../../shared/components/PasswordInput";
import { useCreateEmployee } from "../hooks/useCreateEmployeeScreen";
import { useNavigate } from "react-router-dom";

type RoleType = "Storekeeper" | "Sales" | "Manager";

export default function CreateEmployeeScreen() {
  const { formData, errors, updateField, submit, loading, errorMessage } =
    useCreateEmployee();

     const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <div className={styles.screenWrapper}>
      <form onSubmit={onSubmit} className={styles.card}>
        {/* العودة للوحة التحكم */}
        <button
          onClick={()=> navigate("/")}
          className={styles.backLink}
          aria-label="Back to employee list"
        >
          <IoArrowBack size={20} className="text-slate-300 hover:text-white" />
        </button>

        {/* الهيدر */}
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>Create Employee</h1>
          <p className={styles.subtitle}>Add a new staff member to Enough WMS</p>
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

        <div className={styles.inputsContainer}>
          {/* اسم الموظف */}
          <BaseInput
            type="text"
            name="FullName"
            value={formData.FullName || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("FullName", e.target.value)
            }
            placeholder="Employee Full Name"
            error={errors?.FullName}
            icon={<IoPersonOutline size={20} />}
          />

          {/* البريد الإلكتروني */}
          <BaseInput
            type="email"
            name="Email"
            value={formData.Email || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("Email", e.target.value)
            }
            placeholder="Employee Email"
            error={errors?.Email}
            icon={<IoMailOutline size={20} />}
          />

          {/* كلمة السر */}
          <PasswordInput
            name="password"
            value={formData.Password || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("Password", e.target.value)
            }
            placeholder="Password"
            error={errors?.Password}
          />

          {/* قائمة اختيار الدور (Role Select) */}
          <div className="relative flex items-center">
            <span className="absolute left-3 text-brand-primary z-10 pointer-events-none">
              <IoShieldCheckmarkOutline size={20} />
            </span>
            <select
              name="Role"
              value={formData.Role || ""}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                updateField("Role", e.target.value as RoleType)
              }
              className={styles.selectInput}
            >
              <option value="" disabled className="bg-brand-sidebar text-slate-400">
                Select Employee Role
              </option>
              <option value="Storekeeper" className="bg-brand-sidebar text-white">
                Storekeeper (أمينات مستودع)
              </option>
              <option value="Sales" className="bg-brand-sidebar text-white">
                Sales (مبيعات)
              </option>
              <option value="Manager" className="bg-brand-sidebar text-white">
                Manager (مدير)
              </option>
            </select>
          </div>
          {errors?.role && (
            <p className="text-xs text-status-danger px-1">{errors.role}</p>
          )}
        </div>

        {/* زر الإنشاء */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={
              loading || 
              !formData.FullName || 
              !formData.Email || 
              !formData.Password ||
              !formData.Role
            }
            className={styles.submitBtn}
          >
            {loading ? "Creating Account..." : "Create Employee Account"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  screenWrapper:
    " h-screen w-full flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop')] bg-center bg-cover bg-no-repeat relative before:absolute before:inset-0 before:bg-brand-sidebar/80",

  card: "relative z-10 space-y-4 border border-slate-700/50 p-6 w-[380px] bg-brand-sidebar rounded-2xl shadow-2xl text-white my-2",

  backLink:
    "absolute top-4 left-4 p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center",

  headerContainer: "flex flex-col items-center pb-1 ",
  iconBadge:
    "w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/30 mb-2 border border-blue-400/30",
  title: "font-bold text-xl text-white tracking-wide",
  subtitle: "text-xs font-medium text-brand-subtext tracking-wide mt-0.5 text-center",

  errorMessage:
    "p-2.5 text-xs text-center font-medium text-status-danger bg-status-dangerBg/90 border border-status-danger/30 rounded-lg",

  inputsContainer: "space-y-3",

  // قائمة الاختيار المخصصة لتناسب التصميم
  selectInput:
    "w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none cursor-pointer",

  submitBtn:
    "bg-brand-primary hover:bg-blue-600 disabled:opacity-50 font-bold w-full py-2.5 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20 border border-blue-400/20 active:scale-[0.99]",
};