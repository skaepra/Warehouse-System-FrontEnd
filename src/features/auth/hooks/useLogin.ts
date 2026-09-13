import { useState } from "react";

import { login, LoginResponse } from "../services/loginApi";
import { LoginPayload } from "../types/LoginPayload";
import { useForm } from "../../../shared/useForm";
import { loginSchema } from "../schemas/loginSchema";
import { initialLoginState } from "../constants/initialLoginState";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const form = useForm(initialLoginState, loginSchema);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<LoginResponse | null> => {
    // 1. التحقق من المدخلات باستخدام Zod
    const validData = form.validate();
    if (!validData) return null;

    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      // 2. إرسال الطلب للسيرفر
      const result = await login(validData as LoginPayload);

      setIsSuccess(true);
      setLoading(false);

      // 🧹 إعادة تعيين قيم النموذج عند نجاح العملية
      if (form.reset) {
        form.reset();
      }
      navigate("/");

      return result;
    } catch (error: any) {
      // 💥 التقاط واستخراج خطأ السيرفر التفصيلي
      setIsError(true);

      const responseData = error?.response?.data;
      const mainMessage =
        responseData?.message ||
        "فشل تسجيل الدخول، يرجى التحقق من البيانات المدخلة";
      const errorList = responseData?.errors;

      // قراءة مصفوفة الأخطاء أو الأخطاء القادمة من Identity/ModelState
      if (Array.isArray(errorList) && errorList.length > 0) {
        setErrorMessage(`${mainMessage}: ${errorList.join(" | ")}`);
      } else if (typeof errorList === "object" && errorList !== null) {
        // في حال كانت الأخطاء قادمة كـ ValidationProblemDetails object
        const nestedErrors = Object.values(errorList).flat().join(" | ");
        setErrorMessage(nestedErrors || mainMessage);
      } else {
        setErrorMessage(mainMessage);
      }

      setLoading(false);
      return null;
    }
  };

  const resetLoadingState = () => {
    setLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
  };

  return {
    ...form,
    loading,
    isSuccess,
    isError,
    errorMessage,
    resetLoadingState,
    submit,
  };
}
