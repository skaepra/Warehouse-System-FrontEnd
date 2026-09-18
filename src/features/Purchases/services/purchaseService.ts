import api from "../../../shared/api/axiosInstance";

// Interface لنوع البيانات القادمة من الباك إند
export interface PurchaseResponseDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitCostPrice: number;
  totalCost: number;
  purchaseDate: string;
  createdByUserId: string;
  createdByUserName: string;
}

export const purchaseService = {
  // جلب كافة عمليات الشراء
  getAllPurchases: async (): Promise<PurchaseResponseDto[]> => {
    const response = await api.get<PurchaseResponseDto[]>("/api/Purchases");
    return response.data;
  },

  // جلب تفاصيل عملية شراء محددة
  getPurchaseById: async (id: string): Promise<PurchaseResponseDto> => {
    const response = await api.get<PurchaseResponseDto>(`/api/Purchase/${id}`);
    return response.data;
  },
};