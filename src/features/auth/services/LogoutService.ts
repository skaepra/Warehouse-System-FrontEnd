import { Api } from "../../../shared/api/api-delivery";

export const postLogout = async (data: {deviceID: string;clientType: number }) => {
  const res = await Api.post("/api/identity/logout", data);
  return res.data;
};