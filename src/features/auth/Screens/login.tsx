import { FormEvent, ChangeEvent } from "react";
import { IoMailOutline } from "react-icons/io5";

import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../../../shared/components/PasswordInput";
import BaseInput from "../../../shared/components/BaseInput";

export default function LoginScreen() {
  const { formData, errors, updateField, submit, loading, errorMessage } =
    useLogin();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <div className={styles.screenWrapper}>
      <form onSubmit={onSubmit} className={styles.card}>
       
        {/* هيدر الهوية اللوجستية واللوغو */}
        <div className={styles.headerContainer}>
          <div className={styles.logoBadge}>EN</div>
          <h1 className={styles.title}>ENOUGH</h1>
          <p className={styles.subtitle}>Warehouse Management System</p>
        </div>

        {/* عرض رسالة الخطأ القادمة من السيرفر */}
        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

        <div className={styles.inputsContainer}>
          {/* الإيميل */}
          <BaseInput
            type="email"
            name="Email"
            value={formData.Email || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("Email", e.target.value)
            }
            placeholder="Your Email"
            error={errors?.Email}
            icon={<IoMailOutline size={20} />}
            
          />

          {/* كلمة السر */}
          <PasswordInput
            name="password"
            value={formData.password || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("password", e.target.value)
            }
            placeholder="Password"
            error={errors?.password}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || !formData.Email || !formData.password}
            className={styles.submitBtn}
          >
            {loading ? "Logging in..." : "Login to System"}
          </button>
        </div>

      </form>
    </div>
  );
}

const styles = {
  // خلفية مستودع مع Overlay داكن كحلي
  screenWrapper:
    "fixed inset-0 h-screen w-full flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop')] bg-center bg-cover bg-no-repeat relative before:absolute before:inset-0 before:bg-brand-sidebar/80",

  // الكارت الزجاجي الداكن
  card: "relative z-10 space-y-4 border border-slate-700/60 p-6 sm:w-[360px] backdrop-blur-md bg-brand-sidebar/90 rounded-2xl shadow-2xl text-white w-[300px]",

  // زر العودة
  backLink:
    "absolute top-4 left-4 p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-slate-300 hover:text-white",

  // الهيدر واللوغو EN
  headerContainer: "flex flex-col items-center pt-2 pb-1",
  logoBadge:
    "w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center font-black text-xl text-white shadow-lg shadow-brand-primary/30 mb-2 border border-blue-400/30",
  title: "font-black text-2xl tracking-wider text-white uppercase",
  subtitle: "text-xs font-medium text-brand-subtext tracking-wide mt-0.5",

  // رسالة الخطأ
  errorMessage:
    "p-2.5 text-xs text-center font-medium text-status-danger bg-status-dangerBg/90 border border-status-danger/30 rounded-lg",

  // المدخلات
  inputsContainer: "space-y-3",

  // الخيارات (Remember me)
  checkboxContainer: "flex items-center my-2",
  checkbox:
    "border-slate-600 bg-slate-800 rounded cursor-pointer accent-brand-primary w-4 h-4",
  checkboxLabel: "ml-2 text-sm select-none cursor-pointer text-slate-300 hover:text-white transition-colors",

  // زر تسجيل الدخول
  submitBtn:
    "bg-brand-primary hover:bg-blue-600 disabled:opacity-50 font-bold w-full py-2.5 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20 border border-blue-400/20 active:scale-[0.99]",

  // روابط إنشاء الحساب
  signupContainer: "flex justify-center text-sm pt-2 border-t border-slate-700/50",
  signupText: "text-slate-400",
  signupLink: "ml-1 font-semibold hover:underline text-brand-primary",
};