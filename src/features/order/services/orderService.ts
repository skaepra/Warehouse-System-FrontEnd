import api from "../../../shared/api/axiosInstance";

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
  unitSellingPrice: number;
}

export interface CreateOrderDto {
  shopName: string;
  address: string;
  items: CreateOrderItemDto[];
}

export interface OrderItemResponseDto {
  id?: string;
  productId: string;
  productName?: string;
  quantity: number;
  unitSellingPrice: number;
  totalItemPrice?: number;
}

export interface OrderResponseDto {
  id: string;
  shopName: string;
  address: string;
  status: string;
  createdAt: string;
  items: OrderItemResponseDto[];
  totalAmount?: number;
}

export enum OrderStatus {
  Pending = "Pending",
  Prepared = "Prepared",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Rejected = "Rejected",
}

export interface UpdateOrderStatusDto {
  status: OrderStatus | string;
}



export const orderService = {
  getAllOrders: async (): Promise<OrderResponseDto[]> => {
    const response = await api.get("/api/orders");
    return response.data;
  },

  createOrder: async (dto: CreateOrderDto) => {
    const response = await api.post("/api/createOrder", dto);
    return response.data;
  },

  getMyOrders: async (): Promise<OrderResponseDto[]> => {
    const response = await api.get("/api/myOrders");
    return response.data;
  },

  cancelOrder: async (orderId: string) => {
    const response = await api.put(`/api/cancelOrder/${orderId}`);
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.patch(`/api/order/${orderId}/status`, { status });
    return response.data;
  },
};