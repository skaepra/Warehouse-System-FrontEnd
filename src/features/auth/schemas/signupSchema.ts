import { z } from "zod";

export const signUpSchema = z.object({
 fullName: z
      .string()
      // حذف الفراغات من البداية والنهاية
      .trim()
      // الحقل مطلوب
      .min(1, {
        message: "Full name is required",
      })
      // الطول
      .min(6, {
        message: "Full name must be at least 6 characters",
      })
      .max(32, {
        message: "Full name must be less than 32 characters",
      })
      // يجب أن يبدأ بحرف (إنجليزي أو عربي)
      .regex(/^[A-Za-z\u0600-\u06FF]/, {
        message: "Full name must start with a letter",
      })
      // الأحرف المسموحة فقط (إنجليزي، عربي، أرقام، فراغات، شرطات)
      .regex(/^[A-Za-z0-9\s_\-\u0600-\u06FF]+$/, {
        message: "Full name can contain only letters, numbers, spaces, - and _",
      })
      // منع الفراغات المتتالية
      .refine((value) => !/\s{2,}/.test(value), {
        message: "Full name cannot contain consecutive spaces",
      })
      // منع تكرار -- __ -_ _-
      .refine((value) => !/[-_]{2,}/.test(value), {
        message: "Full name cannot contain consecutive dashes or underscores",
      })
      // منع انتهاء الاسم بـ - أو _
      .refine((value) => !/[-_]$/.test(value), {
        message: "Full name cannot end with a dash or underscore",
      })
      // منع الاسم المؤلف فقط من أرقام
      .refine((value) => !/^\d+$/.test(value), {
        message: "Full name cannot contain only numbers",
      }),
  Email: z
  .string()
  .min(1, "Email is required")
  .trim() // بيمسح أي مسافات إضافية في البداية أو النهاية تلقائياً
  .toLowerCase() // بيحول الإيميل لحروف صغيرة (Best Practice)
  .email("Invalid email address"),
  password: z
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
  Remember: z.boolean().default(false),
});

// استخراج نوع الـ State تلقائياً من المخطط
export type SignupFormData = z.infer<typeof signUpSchema>;