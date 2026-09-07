import apiClient from "../../../shared/api/api-Client";

export const login = async (data: any) => {
  const res = await apiClient.post('/verifyUser',data);
  return res.data;
};
