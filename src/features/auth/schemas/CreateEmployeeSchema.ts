import { z } from "zod";

export const createEmployeeSchema = z.object({
  FullName: z
    .string()
    // حذف الفراغات من البداية والنهاية
    .trim()
    // الحقل مطلوب
    .min(1, {
      message: "Full name is required",
    })
    .max(32, {
      message: "Full name must be less than 32 characters",
    })
    .regex(
      /^[a-zA-Z]+$/,
      "الاسم يجب أن يحتوي على أحرف إنكليزية فقط بدون مسافات، أرقام أو رموز"
    ),
  Email: z
    .string()
    .min(1, "Email is required")
    .trim() // بيمسح أي مسافات إضافية في البداية أو النهاية تلقائياً
    .toLowerCase() // بيحول الإيميل لحروف صغيرة (Best Practice)
    .email("Invalid email address"),
  Password: z
    .string()
    .trim()

    .min(8, {
      message: "Password must be at least 8 characters",
    })

    .max(64, {
      message: "Password must be less than 64 characters",
    })

    // حرف كبير
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })

    // حرف صغير
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })

    // رقم
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })

    // رمز خاص واحد على الأقل
    .regex(/[!@#$%^&*()]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*())",
    })

    // السماح فقط بالمحارف المحددة
    .regex(/^[A-Za-z0-9!@#$%^&*()]+$/, {
      message:
        "Password can contain only uppercase letters, lowercase letters, numbers and !@#$%^&*() symbols",
    }),

  Role: z.enum(["Storekeeper", "Sales", "Manager"], {
    required_error: "دور الموظف مطلوب",
    invalid_type_error: "يرجى اختيار دور صحيح",
  }),
});

// استخراج نوع الـ State تلقائياً من المخطط
export type SignupFormData = z.infer<typeof createEmployeeSchema>;
