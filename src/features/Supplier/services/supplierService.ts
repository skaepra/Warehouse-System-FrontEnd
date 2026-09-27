import api from "../../../shared/api/axiosInstance";

// DTO الموردين كما هو مسترجع من الباك إند
export interface SupplierResponseDto {
  id: string;
  name: string;
  phone?: string;
  isActive: boolean;
  supplierUnitPrice?: number;
}

// DTO لطلب الإنشاء والتعديل
export interface CreateOrUpdateSupplierDto {
  name: string;
  phone?: string;
}

export interface AssignProductToSupplierDto {
  supplierId: string;
  productId: string;
  supplierUnitPrice: number;
}

export interface APIActionResponse {
  message?: string;
  isSuccess?: boolean;
}

export const supplierService = {
  // جلب جميع الموردين
  getAllSuppliers: async (): Promise<SupplierResponseDto[]> => {
    const response = await api.get<SupplierResponseDto[]>("/api/suppliers");
    return response.data;
  },

  // جلب الموردين المرتبطين بمنتج معين (ترجع مصفوفة array)
  getProductSuppliers: async (productId: string): Promise<SupplierResponseDto[]> => {
    const response = await api.get<SupplierResponseDto[]>(`/api/productSupplier/${productId}`);
    return response.data;
  },

  // إضافة مورد جديد
  createSupplier: async (data: CreateOrUpdateSupplierDto): Promise<SupplierResponseDto> => {
    const response = await api.post<SupplierResponseDto>("/api/createSupplier", data);
    return response.data;
  },

  // تعديل بيانات مورد
  updateSupplier: async (id: string, data: CreateOrUpdateSupplierDto): Promise<SupplierResponseDto> => {
    const response = await api.put<SupplierResponseDto>(`/api/updateSupplier/${id}`, data);
    return response.data;
  },

  // تغيير حالة المورد (تفعيل / تعطيل)
  toggleSupplierStatus: async (id: string): Promise<{ isActive: boolean }> => {
    const response = await api.patch<{ isActive: boolean }>(`/api/supplier/${id}/toggle-status`);
    return response.data;
  },

  // إسناد منتج لمورد وتحديد سعر التوريد
  assignProductToSupplier: async (data: AssignProductToSupplierDto): Promise<APIActionResponse> => {
    const response = await api.post<APIActionResponse>("/api/supplier/assign-product", data);
    return response.data;
  },
};