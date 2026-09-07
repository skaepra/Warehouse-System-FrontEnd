import { Api } from "../../../shared/api/api-delivery";

export interface RefreshTokenPayload {
  userId: string;
  refreshToken: string;
  deviceID: string;
  clientType: 1;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshSession = async (payload: RefreshTokenPayload): Promise<RefreshTokenResponse> => {
  // نرسل الطلب إلى الـ Endpoint المحددة
  const res = await Api.post("/api/identity/refresh-token", payload);
  return res.data;
};