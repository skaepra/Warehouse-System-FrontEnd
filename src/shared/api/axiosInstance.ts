import axios from 'axios';

// 1. إنشاء نسخة Axios الرئيسية
const api = axios.create({
  baseURL: 'https://localhost:7156', // رابط الباك إند
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: إرفاق Bearer Token مع كل طلب
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// متغيرات لمنع الدخول في دوامة طلبات تجديد مكررة إذا فشل التحديث
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

// دالة لتنفيذ الطلبات المعلقة في الطابور بعد نجاح تجديد التوكن
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 3. Response Interceptor: التقاط 401 والتجديد التلقائي
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // إذا كان الخطأ 401 ولم يتم محاولة إعادة الطلب سابقاً
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // تجنب محاولة تجديد التوكن إذا كان طلب تسجيل الدخول نفسه هو من أرجع 401
      if (originalRequest.url?.includes('/api/login')) {
        return Promise.reject(error);
      }

      // إذا كان هناك طلب تجديد جاري حالياً، ضع هذا الطلب في الطابور لينتظر التوكن الجديد
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      const token = localStorage.getItem('token');

      // إذا لم يكن هناك Refresh Token أعد الموظف لشاشة تسجيل الدخول
      if (!refreshToken || !token) {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // إرسال طلب تجديد التوكن للباك إند
        const response = await axios.post('https://localhost:7156/api/refresh-token', {
          token: token,
          refreshToken: refreshToken,
        });

        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        // حفظ التوكنات الجديدة
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // تحديث الهيدر الافتراضي والتأكيد على الطلب الحالي
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // تشغيل كل الطلبات التي كانت تنتظر التوكن في الطابور
        processQueue(null, newToken);

        isRefreshing = false;

        // إعادة إرسال الطلب الأصلي الذي فشل أول مرة
        return api(originalRequest);
      } catch (refreshError) {
        // إذا فشل التحديث (مثلاً انتهت مدة الـ 30 يوم الخاصة بالـ Refresh Token)
        processQueue(refreshError, null);
        isRefreshing = false;

        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;