import api from "../../../shared/api/axiosInstance";
import { LoginPayload } from "../types/LoginPayload";

// تعريف واجهة الاستجابة المتوقعة من الباك إند
export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  expiration: string;
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/api/login", data);

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  if (res.data?.refreshToken) {
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
};
