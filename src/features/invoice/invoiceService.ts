import api from "../../shared/api/axiosInstance";


export interface InvoiceItemDto {
  productId: string;
  productName: string;
  quantity: number;
  unitSellingPrice: number;
  totalPrice: number;
}

export interface InvoiceResponseDto {
  invoiceId: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  issuedAt: string;
  issuedById: string;
  items?: InvoiceItemDto[];
}

export const invoiceService = {
  // جلب كافة الفواتير
  getAllInvoices: async (): Promise<InvoiceResponseDto[]> => {
    const response = await api.get<InvoiceResponseDto[]>("/api/Invoices");
    return response.data;
  },

  // جلب تفاصيل فاتورة محددة
  getInvoiceDetails: async (id: string): Promise<InvoiceResponseDto> => {
    const response = await api.get<InvoiceResponseDto>(`/api/Invoices/${id}/details`);
    return response.data;
  },
};