import api from "../../../shared/api/axiosInstance";



// الأنواع المضافة للربط مع Backend
export interface CategoryDto {
  id: string;
  name: string;
  productsCount: number;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export const categoryService = {
  // 1. جلب كل التصنيفات
  getAllCategories: async (): Promise<CategoryDto[]> => {
    const response = await api.get<CategoryDto[]>('/api/Categories');
    return response.data;
  },

  // 2. إنشاء تصنيف جديد (Manager)
  createCategory: async (dto: CreateCategoryDto): Promise<CategoryDto> => {
    const response = await api.post<CategoryDto>('/api/createCategory', dto);
    return response.data;
  },

  // 3. تعديل تصنيف (Manager)
  updateCategory: async (id: string, dto: UpdateCategoryDto): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>(`/api/updateCategory/${id}`, dto);
    return response.data;
  },

  // 4. حذف تصنيف (Manager)
  deleteCategory: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/api/deleteCategory/${id}`);
    return response.data;
  }
};