import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: '480px',
      sm: '600px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        brand: {
          sidebar: '#1E293B',   // الأزرق الداكن للشريط الجانبي
          primary: '#2563EB',   // الأزرق التفاعلي للأزرار والعناصر النشطة
          bg: '#F8FAFC',        // خلفية الصفحة الأساسية
          card: '#FFFFFF',      // خلفية البطاقات والجداول
          text: '#0F172A',      // لون النصوص الرئيسي
          subtext: '#64748B',   // لون النصوص الفرعية
        },
        status: {
          success: '#16A34A',     // نص/أيقونة الكميات المتوفرة
          successBg: '#DCFCE7',   // خلفية الشارة (Badge) للمتوفر
          warning: '#D97706',     // نص/أيقونة المخزون المنخفض
          warningBg: '#FEF3C7',   // خلفية الشارة للمنخفض
          danger: '#DC2626',      // نص/أيقونة المنتهي
          dangerBg: '#FEE2E2',    // خلفية الشارة للمنتهي
          info: '#0284C7',        // نص الشحنات القادمة/المعلومات
          infoBg: '#E0F2FE',      // خلفية شارة المعلومات
        }
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config