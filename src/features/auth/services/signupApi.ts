import api from "../../../shared/api/axiosInstance";
import { SignupPayload } from "../types/SignupPayload";

export const signup = async (data: SignupPayload) => {
  const res = await api.post("/api/createEmployee", data); // المسار الخاص بإنشاء الموظف
  return res.data;
};
