// hooks/useForm.ts
import { useState } from "react";
import { ZodSchema } from "zod";

export function useForm<T extends Record<string, any>>(
  initialState: T,
  schema: ZodSchema<T>
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field as string]: "" }));
    }
  };

  const validate = (): T | null => {
    const result = schema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      const fieldErrors = result.error.flatten().fieldErrors;

      // 💡 استخدام Object.entries يضمن التعرف الصحيح على الأنواع في TypeScript
      Object.entries(fieldErrors).forEach(([key, messages]) => {
        if (Array.isArray(messages) && messages[0]) {
          formattedErrors[key] = messages[0];
        }
      });

      setErrors(formattedErrors);
      return null;
    }

    setErrors({});
    return result.data;
  };

  return {
    formData,
    errors,
    updateField,
    validate,
  };
}