import { useState } from "react";

import { signup } from "../services/signupApi";
import { SignupPayload } from "../types/SignupPayload";
import { createEmployeeSchema } from "../schemas/CreateEmployeeSchema";
import { useForm } from "../../../shared/useForm";
import { initialSignupState } from "../constants/initialSignupState";

export function useCreateEmployee() {
  const form = useForm(initialSignupState, createEmployeeSchema);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (): Promise<SignupPayload | null> => {
    // 🔍 1. فحص Zod Validation
    const validData = form.validate();

    if (!validData) {
      console.log(
        "❌ فشل التحقق من البيانات (Zod Validation Failed):",
        form.errors,
      );
      return null;
    }

    setLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      const result = await signup(validData as SignupPayload);
      console.log(result);
      setIsSuccess(true);
      setLoading(false);

      // 🧹 إعادة إعادة تعيين الحقول عند نجاح العملية لإنشاء موظف جديد
      if (form.reset) {
        form.reset();
      }

      return result;
    } catch (error: any) {
      console.error("❌ خطأ أثناء حفظ المستخدم:", error);

      const responseData = error?.response?.data;
      const mainMessage =
        responseData?.message || "فشل إنشاء الحساب، يرجى المحاولة لاحقاً";
      const errorList = responseData?.errors;

      if (Array.isArray(errorList) && errorList.length > 0) {
        setErrorMessage(`${mainMessage}: ${errorList.join(" | ")}`);
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
