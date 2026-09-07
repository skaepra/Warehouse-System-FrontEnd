import apiClient from "../../../shared/api/api-Client";
import { orderType } from "../../order/types/orderType";

export const AddOrders = async (orderData: Omit<orderType, "id">) => {
  const res = await apiClient.post<orderType>("orders", orderData);
  return res.data;
};