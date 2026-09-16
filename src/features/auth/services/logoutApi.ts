import api from "../../../shared/api/axiosInstance";

// دالة تسجيل الخروج
export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      // إرسال طلب إلغاء التوكن للباك إند
      await api.post('/api/logout', { refreshToken });
    }
  } catch (error) {
    console.error("خطأ أثناء تسجيل الخروج من السيرفر:", error);
  } finally {
    // مسح البيانات وإعادة التوجيه بغض النظر عن النتيجة
    localStorage.clear();
    window.location.href = '/login';
  }
};