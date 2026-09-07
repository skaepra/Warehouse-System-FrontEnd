import { FormEvent, ChangeEvent } from "react";
import { IoPersonOutline, IoMailOutline, IoArrowBack } from "react-icons/io5";

// استدعاء الهوك والمكونات المصممة
import { useSignup } from "../hooks/useSignup"; // اضبط المسار حسب مشروعك
import BaseInput from "../../../shared/components/BaseInput";
import PasswordInput from "../../../shared/components/PasswordInput";

export default function SignUpScreen() {
  const { formData, errors, updateField, submit, loading, errorMessage } =
    useSignup();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <div className={styles.screenWrapper}>
      <form onSubmit={onSubmit} className={styles.card}>
        <div>
          <a
            href="/login"
            className={styles.backLink}
            aria-label="Back to login"
          >
            <IoArrowBack size={20} className="text-white" />
          </a>

          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Sign up</h1>
          </div>
        </div>

        {/* عرض رسالة الخطأ القادمة من السيرفر إن وجدت */}
        {errorMessage && (
          <div className="p-2 text-xs text-center text-white bg-dangerRose/80 rounded-lg">
            {errorMessage}
          </div>
        )}

        <div className={styles.inputsContainer}>
          {/* اسم المستخدم */}
          <BaseInput
            type="text"
            name="FullName"
            value={formData.fullName || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("fullName", e.target.value)
            }
            placeholder="User Name"
            error={errors?.fullName}
            icon={<IoPersonOutline size={20} />}
          />

          {/* البريد الإلكتروني - مطابقة الاسم Email بالـ Schema */}
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

          {/* كلمة السر - مطابقة الاسم password بالـ Schema */}
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

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="remember-signup"
            name="Remember"
            checked={!!formData.Remember}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("Remember", e.target.checked)
            }
            className={styles.checkbox}
          />
          <label htmlFor="remember-signup" className={styles.checkboxLabel}>
            Remember me
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={
              loading || !formData.fullName || !formData.Email || !formData.password
            }
            className={styles.submitBtn}
          >
            {loading ? "Creating Account..." : "Sign up"}
          </button>
        </div>

        <div className={styles.signinContainer}>
          <a href="/login" className="flex items-center">
            <span className={styles.signinText}>Already have an account?</span>
            <span className={styles.signinLink}>Sign in</span>
          </a>
        </div>
      </form>
    </div>
  );
}

// كلاسات Tailwind
const styles = {
  screenWrapper:
    "fixed top-0 left-0 right-0 h-screen text-white w-full flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1920&auto=format&fit=crop')] bg-center bg-cover bg-no-repeat",
  card: "relative space-y-3.5 border-2 border-[#9e9e9e] p-5 w-[340px] backdrop-blur-sm bg-black/40 rounded-2xl shadow-xl",

  // Header section
  backLink:
    "absolute top-4 left-4 p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center",
  titleContainer: "flex justify-center",
  title: "font-bold text-2xl text-white mb-2",

  // Form inputs
  inputsContainer: "space-y-1",

  // Checkbox
  checkboxContainer: "flex items-center my-2",
  checkbox:
    "border bg-transparent rounded cursor-pointer accent-blue-500 w-4 h-4",
  checkboxLabel: "ml-2 text-sm select-none cursor-pointer text-gray-200",

  // Submit button
  submitBtn:
    "border-none bg-white hover:bg-[#e6e4e4] disabled:opacity-50 disabled:hover:bg-white font-bold w-full py-2.5 text-black rounded-2xl transition-all cursor-pointer disabled:cursor-not-allowed mt-2",

  // Footer signin link
  signinContainer: "flex justify-center text-sm pt-2",
  signinText: "text-[#ececec]",
  signinLink: "ml-1 font-semibold hover:underline text-blue-400",
};
