// loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
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

// استخراج نوع الـ Values من مخطط Zod تلقائياً
export type LoginFormData  = z.infer<typeof loginSchema>;




