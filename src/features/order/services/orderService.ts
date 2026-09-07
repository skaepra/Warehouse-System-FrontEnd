import apiClient from "../../../shared/api/api-Client";
import { orderType } from "../types/orderType";

export const getOrders  = async () => {
  const res = await apiClient.get<orderType[]>("orders");
  return res.data;
};


