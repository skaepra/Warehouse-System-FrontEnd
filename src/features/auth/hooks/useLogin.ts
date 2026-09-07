// hooks/useLogin.ts
import { useState } from "react";

import { login } from "../services/loginApi";
import { LoginPayload } from "../types/LoginPayload";
import { useForm } from "../../../shared/useForm";
import { loginSchema } from "../schemas/loginSchema";
import { initialLoginState } from "../constants/initialLoginState";

export function useLogin() {
  const form = useForm(initialLoginState, loginSchema);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<LoginPayload | null> => {
    // 1. التحقق من المدخلات باستخدام Zod
    const validData = form.validate();
    if (!validData) return null;


    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      // 2. إرسال الطلب للسيرفر
      const result = await login(validData);

      setIsSuccess(true);
      setLoading(false);
      return result;
    } catch (error: any) {
      // 3. التقاط خطأ الاتصال أو الخطأ القادم من السيرفر
      setIsError(true);
      setErrorMessage(
        error?.response?.data?.message || "فشل تسجيل الدخول، تحقق من البيانات"
      );
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