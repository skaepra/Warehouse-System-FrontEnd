import api from "../../../shared/api/axiosInstance";



export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
  unitSellingPrice: number;
}

export interface CreateOrderDto {
  customerName: string;
  items: CreateOrderItemDto[];
}

export interface OrderItemResponseDto {
  productId: string;
  productName?: string;
  quantity: number;
  unitSellingPrice: number;
}

export interface OrderResponseDto {
  id: string;
  customerName: string;
  status: string;
  createdAt: string;
  orderItems: OrderItemResponseDto[];
  totalAmount?: number;
}

export const orderService = {
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
};