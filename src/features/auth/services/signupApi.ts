// services/signupApi.ts
import apiClient from "../../../shared/api/api-Client";

export const signup = async (data: any) => {
  // 💡 التغيير هنا: استخدام /users بدلاً من /User
  const res = await apiClient.post('/users', data);
  return res.data;
};